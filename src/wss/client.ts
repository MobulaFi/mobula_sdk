// @ts-nocheck - WebSocket and crypto-js type conflicts
// packages/sdk/src/wss/client.ts

import type {
  BalancePayloadType,
  FastTradesPayloadType,
  FeedPayloadType,
  FundingPayloadType,
  HoldersPayloadType,
  MarketDetailsPayloadType,
  MarketPayloadType,
  OhlcvPayloadType,
  PairsPayloadType,
  PausePulsePayloadType,
  PositionPayloadType,
  PositionsPayloadType,
  PulsePayloadType,
  StreamPayloadType,
  TokenDetailsPayloadType,
} from '@mobula/types';
import { SHA256 } from 'crypto-js';
import { EventEmitter } from 'eventemitter3';
import WebSocket, { type MessageEvent } from 'isomorphic-ws';
import type { MobulaOptions } from '../auth.ts';

export function generatePayloadHash(payload: unknown, clientApiKey: string) {
  const normalizedPayload = JSON.stringify({ payload, clientApiKey });
  return SHA256(normalizedPayload).toString();
}

export type SubscriptionPayload = {
  funding: FundingPayloadType;
  market: MarketPayloadType;
  pair: PairsPayloadType;
  'market-details': MarketDetailsPayloadType;
  'token-details': TokenDetailsPayloadType;
  trade: PairsPayloadType;
  'fast-trade': FastTradesPayloadType;
  ohlcv: OhlcvPayloadType;
  holders: HoldersPayloadType;
  'pulse-v2': PulsePayloadType;
  'pulse-v2-pause': PausePulsePayloadType;
  'stream-evm': StreamPayloadType;
  'stream-svm': StreamPayloadType;
  feed: FeedPayloadType;
  position: PositionPayloadType;
  positions: PositionsPayloadType;
  balance: BalancePayloadType;
};

export type StreamCallback<T> = (data: T) => void | Promise<void>;

const DEFAULT_URLS: Record<keyof SubscriptionPayload, string> = {
  funding: 'wss://api.mobula.io',
  market: 'wss://api.mobula.io',
  pair: 'wss://api.mobula.io',
  'market-details': 'wss://api.mobula.io',
  'token-details': 'wss://api.mobula.io',
  trade: 'wss://api.mobula.io',
  'fast-trade': 'wss://api.mobula.io',
  ohlcv: 'wss://production-api.mobula.io',
  holders: 'wss://api.mobula.io',
  'pulse-v2': 'wss://pulse-v2-api.mobula.io',
  'pulse-v2-pause': 'wss://pulse-v2-api.mobula.io',
  'stream-evm': 'wss://stream-evm-prod.mobula.io/',
  'stream-svm': 'wss://stream-sol-prod.mobula.io/',
  feed: 'wss://production-feed.mobula.io',
  position: 'wss://api.mobula.io',
  positions: 'wss://api.mobula.io',
  balance: 'wss://api.mobula.io',
};

const SERVER_TYPE_MAP: Record<keyof SubscriptionPayload, string> = {
  funding: 'funding',
  market: 'market',
  pair: 'pair',
  'market-details': 'market-details',
  'token-details': 'token-details',
  trade: 'trade',
  'fast-trade': 'fast-trade',
  ohlcv: 'ohlcv',
  holders: 'holders',
  'pulse-v2': 'pulse-v2',
  'pulse-v2-pause': 'pulse-v2-pause',
  'stream-evm': 'stream',
  'stream-svm': 'stream',
  feed: 'feed',
  position: 'position',
  positions: 'positions',
  balance: 'balance',
};

type WSState = {
  ws: WebSocket;
  heartbeatInterval?: ReturnType<typeof setTimeout>;
  shouldReconnect: boolean;
  messageCount: number;
  droppedCount: number;
};

export class StreamClient extends EventEmitter {
  private apiKey: string;
  private debug: boolean;
  private wsMap: Partial<Record<keyof SubscriptionPayload, WSState>> = {};
  private activeSubs: Map<string, StreamCallback<unknown>> = new Map();
  private pendingQueue: Map<keyof SubscriptionPayload, Set<string>> = new Map();
  private subscriptionPayloads: Map<
    string,
    { type: keyof SubscriptionPayload; payload: SubscriptionPayload[keyof SubscriptionPayload] }
  > = new Map();
  private reconnectAttempts: Map<keyof SubscriptionPayload, number> = new Map();
  private customUrls?: Partial<Record<keyof SubscriptionPayload, string>>;

  constructor(
    options: MobulaOptions & {
      debug?: boolean;
      wsUrlMap?: Partial<Record<keyof SubscriptionPayload, string>>;
    },
  ) {
    super();
    this.apiKey = options.apiKey || '';
    this.debug = options.debug || false;
    this.customUrls = options.wsUrlMap;
  }

  subscribe<K extends keyof SubscriptionPayload>(
    type: K,
    payload: SubscriptionPayload[K],
    callback?: StreamCallback<unknown>,
  ): string {
    const url = this.customUrls?.[type] || DEFAULT_URLS[type];
    const subId =
      (payload as { subscriptionId?: string }).subscriptionId ?? this.generateDeterministicSubscriptionId(payload);
    (payload as { subscriptionId?: string }).subscriptionId = subId;

    const subscriptionKey = this.buildSubscriptionKey(type, subId);

    if (callback) this.activeSubs.set(subscriptionKey, callback);
    this.subscriptionPayloads.set(subscriptionKey, { type, payload });

    if (!this.wsMap[type] || this.wsMap[type]!.ws.readyState !== WebSocket.OPEN) {
      const queue = this.pendingQueue.get(type) ?? new Set<string>();
      queue.add(subscriptionKey);
      this.pendingQueue.set(type, queue);
      this.initWebSocket(type, url).catch((err) => {
        if (this.debug) console.error(`[StreamClient] Failed to initialize WebSocket for ${type}:`, err);
      });
    } else {
      this.sendSubscriptionMessage(type, payload);
    }

    return subId;
  }

  async unsubscribe<K extends keyof SubscriptionPayload>(
    type?: K,
    subscriptionId?: string,
    payload?: Partial<{ type: K; [key: string]: unknown }>,
  ): Promise<{ event: 'unsubscribed'; subscriptionId?: string; type?: K }> {
    if (this.debug) console.log('[StreamClient] Unsubscribe called', { type, subscriptionId, payload });
    const safePayload = payload ?? {};

    const sendUnsubscribe = (t: K, extraPayload: Record<string, unknown>) => {
      const wsState = this.wsMap[t];
      const responsePayload: { event: 'unsubscribed'; subscriptionId?: string; type?: K } = {
        event: 'unsubscribed',
      };
      const rawSubscriptionId =
        typeof extraPayload['subscriptionId'] === 'string' ? (extraPayload['subscriptionId'] as string) : undefined;
      if (rawSubscriptionId) {
        responsePayload.subscriptionId = rawSubscriptionId;
      }
      responsePayload.type = t;

      if (!wsState || wsState.ws.readyState !== WebSocket.OPEN) {
        return Promise.resolve(responsePayload);
      }

      const extra = { ...extraPayload };
      delete (extra as Record<string, unknown>)['type'];
      delete (extra as Record<string, unknown>)['subscriptionId'];

      const message = {
        type: 'unsubscribe' as const,
        authorization: this.apiKey,
        payload: {
          type: SERVER_TYPE_MAP[t],
          ...(rawSubscriptionId ? { subscriptionId: rawSubscriptionId } : {}),
          ...extra,
          ...safePayload,
        },
      };

      return new Promise<{ event: 'unsubscribed'; subscriptionId?: string; type?: K }>((resolve, reject) => {
        const handler = (event: MessageEvent) => {
          let parsed: { event?: string; subscriptionId?: string; type?: K } | undefined;

          try {
            const data = typeof event.data === 'string' ? event.data : event.data.toString();
            parsed = JSON.parse(data) as { event?: string; subscriptionId?: string; type?: K };
          } catch {
            return;
          }

          if (
            parsed?.event === 'unsubscribed' &&
            (rawSubscriptionId ? parsed.subscriptionId === rawSubscriptionId : true) &&
            (parsed?.type ? parsed.type === t : true)
          ) {
            wsState.ws.removeEventListener('message', handler);
            clearTimeout(timeoutId);
            resolve(parsed as { event: 'unsubscribed'; subscriptionId?: string; type?: K });
          }
        };

        const timeoutId = setTimeout(() => {
          wsState.ws.removeEventListener('message', handler);
          reject(new Error(`Timeout waiting for unsubscribe confirmation for ${String(t)}`));
        }, 5000);

        wsState.ws.addEventListener('message', handler);
        wsState.ws.send(JSON.stringify(message));
        if (this.debug) console.log(`[StreamClient] Sent unsubscribe for ${t}:`, message);
      });
    };

    if (type && subscriptionId) {
      this.removeSubscription(type, subscriptionId);
      return sendUnsubscribe(type, { subscriptionId });
    }

    if (type) {
      this.removeAllSubscriptionsForType(type);
      return sendUnsubscribe(type, {});
    }

    const targets = Object.keys(this.wsMap) as K[];
    await Promise.all(targets.map((t) => sendUnsubscribe(t, {})));
    this.activeSubs.clear();
    this.subscriptionPayloads.clear();
    this.pendingQueue.clear();
    this.reconnectAttempts.clear();
    return { event: 'unsubscribed' };
  }

  close(type?: keyof SubscriptionPayload) {
    if (type) {
      const state = this.wsMap[type];
      if (state) {
        state.shouldReconnect = false;
        if (state.heartbeatInterval) clearTimeout(state.heartbeatInterval);
        state.ws.close();
        delete this.wsMap[type];
      }
      this.pendingQueue.delete(type);
      this.reconnectAttempts.delete(type);
      this.removeAllSubscriptionsForType(type);
      for (const key of Array.from(this.activeSubs.keys())) {
        if (key.startsWith(`${String(type)}:`)) this.activeSubs.delete(key);
      }
    } else {
      for (const key of Object.keys(this.wsMap)) {
        const state = this.wsMap[key as keyof SubscriptionPayload];
        if (state) {
          state.shouldReconnect = false;
          if (state.heartbeatInterval) clearTimeout(state.heartbeatInterval);
          state.ws.close();
        }
      }
      this.wsMap = {};
      this.activeSubs.clear();
      this.subscriptionPayloads.clear();
      this.pendingQueue.clear();
      this.reconnectAttempts.clear();
    }
  }

  private async initWebSocket<T extends keyof SubscriptionPayload>(type: T, url: string) {
    // Prevent reinitializing
    if (this.wsMap[type]) return;

    const ws = new WebSocket(url);

    const state: WSState = {
      ws,
      shouldReconnect: true,
      messageCount: 0,
      droppedCount: 0,
    };
    this.wsMap[type] = state;

    const heartbeat = () => {
      if (ws.readyState === WebSocket.OPEN) {
        if (typeof (ws as { ping?: () => void }).ping === 'function') {
          (ws as { ping: () => void }).ping();
        } else {
          ws.send(JSON.stringify({ event: 'ping' }));
        }
      }
      state.heartbeatInterval = setTimeout(heartbeat, 30000);
    };

    ws.addEventListener('open', () => {
      if (this.debug) console.log(`[StreamClient] Connected to ${url} for ${type}`);
      this.reconnectAttempts.set(type, 0);
      this.flushSubscriptionsForType(type);
      heartbeat();
    });

    ws.addEventListener('message', (event: MessageEvent) => {
      // Parse JSON in microtask to avoid blocking main thread
      queueMicrotask(() => {
        let parsed: { subscriptionId?: string } | undefined;

        try {
          const data = typeof event.data === 'string' ? event.data : event.data.toString();
          parsed = JSON.parse(data) as { subscriptionId?: string };
        } catch (err) {
          if (this.debug) console.error('[StreamClient] Failed to parse message:', event.data, err);
          return;
        }

        state.messageCount++;
        this.processMessageImmediately(type, parsed?.subscriptionId, parsed);
      });
    });

    ws.addEventListener('close', () => {
      if (this.debug) {
        console.log(`[StreamClient] Connection closed for ${type}`, {
          messageCount: state.messageCount,
          droppedCount: state.droppedCount,
        });
      }
      if (state.heartbeatInterval) clearTimeout(state.heartbeatInterval);
      delete this.wsMap[type];
      if (!state.shouldReconnect) {
        this.pendingQueue.delete(type);
        this.reconnectAttempts.delete(type);
        return;
      }
      this.enqueueActiveSubscriptions(type);
      const attempts = (this.reconnectAttempts.get(type) ?? 0) + 1;
      this.reconnectAttempts.set(type, attempts);

      const delay = Math.min(30000, 1000 * 2 ** attempts);
      setTimeout(() => {
        this.initWebSocket(type, url).catch((err) => {
          if (this.debug) console.error(`[StreamClient] Failed to reconnect WebSocket for ${type}:`, err);
        });
      }, delay);
    });

    ws.addEventListener('error', (err) => {
      if (this.debug) console.error(`[StreamClient] WebSocket error for ${type}:`, err);
    });
  }

  private processMessageImmediately<T extends keyof SubscriptionPayload>(
    type: T,
    subscriptionId: string | undefined,
    parsed: unknown,
  ) {
    const state = this.wsMap[type];
    if (!state) return;

    // Process message immediately (server already handles deduplication)
    if (subscriptionId) {
      const cb = this.activeSubs.get(`${type}:${subscriptionId}`);
      if (cb) {
        try {
          const result = cb(parsed);
          // Support async callbacks without blocking
          if (result instanceof Promise) {
            result.catch((err) => {
              if (this.debug) console.error(`[StreamClient] Callback error for ${type}:`, err);
            });
          }
        } catch (err) {
          if (this.debug) console.error(`[StreamClient] Callback error for ${type}:`, err);
        }
      }
    }

    // Also emit for type-level listeners
    try {
      this.emit(type, parsed);
    } catch (err) {
      if (this.debug) console.error(`[StreamClient] Emit error for ${type}:`, err);
    }
  }

  private generateDeterministicSubscriptionId(payload: unknown): string {
    const hash = generatePayloadHash(payload, this.apiKey);
    return `sub_${hash.substring(0, 32)}`;
  }

  private buildSubscriptionKey<K extends keyof SubscriptionPayload>(type: K, subId: string): string {
    return `${String(type)}:${subId}`;
  }

  private sendSubscriptionMessage<K extends keyof SubscriptionPayload>(type: K, payload: SubscriptionPayload[K]) {
    const wsState = this.wsMap[type];
    if (!wsState || wsState.ws.readyState !== WebSocket.OPEN) return;

    const message = {
      type: SERVER_TYPE_MAP[type] || type,
      authorization: this.apiKey,
      payload,
    };

    wsState.ws.send(JSON.stringify(message));
    if (this.debug) console.log(`[StreamClient] Subscribed ${type}`, payload);
  }

  private getSubscriptionKeysForType(type: keyof SubscriptionPayload): string[] {
    return Array.from(this.subscriptionPayloads.entries())
      .filter(([, entry]) => entry.type === type)
      .map(([key]) => key);
  }

  private flushSubscriptionsForType<K extends keyof SubscriptionPayload>(type: K) {
    const wsState = this.wsMap[type];
    if (!wsState || wsState.ws.readyState !== WebSocket.OPEN) return;

    const queueKeys = this.pendingQueue.get(type);
    const keysToSend = new Set<string>(queueKeys ? Array.from(queueKeys) : []);
    for (const key of this.getSubscriptionKeysForType(type)) {
      keysToSend.add(key);
    }

    for (const key of keysToSend) {
      const entry = this.subscriptionPayloads.get(key);
      if (!entry) continue;
      this.sendSubscriptionMessage(entry.type as K, entry.payload as SubscriptionPayload[K]);
    }

    this.pendingQueue.delete(type);
  }

  private enqueueActiveSubscriptions<K extends keyof SubscriptionPayload>(type: K) {
    const activeKeys = this.getSubscriptionKeysForType(type);
    if (!activeKeys.length) return;
    const queue = this.pendingQueue.get(type) ?? new Set<string>();
    for (const key of activeKeys) queue.add(key);
    this.pendingQueue.set(type, queue);
  }

  private removeSubscription<K extends keyof SubscriptionPayload>(type: K, subscriptionId: string) {
    const key = this.buildSubscriptionKey(type, subscriptionId);
    this.activeSubs.delete(key);
    this.subscriptionPayloads.delete(key);
    const queue = this.pendingQueue.get(type);
    if (queue) {
      queue.delete(key);
      if (queue.size === 0) this.pendingQueue.delete(type);
    }
  }

  private removeAllSubscriptionsForType<K extends keyof SubscriptionPayload>(type: K) {
    for (const key of this.getSubscriptionKeysForType(type)) {
      this.subscriptionPayloads.delete(key);
      this.activeSubs.delete(key);
    }
    this.pendingQueue.delete(type);
  }
}
