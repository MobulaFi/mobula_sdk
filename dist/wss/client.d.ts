import type { FastTradesPayloadType, FeedPayloadType, FundingPayloadType, HoldersPayloadType, MarketDetailsPayloadType, MarketPayloadType, OhlcvPayloadType, PairsPayloadType, PausePulsePayloadType, PositionPayloadType, PulsePayloadType, StreamPayloadType, TokenDetailsPayloadType } from '@mobula_labs/types';
import { EventEmitter } from 'eventemitter3';
import type { MobulaOptions } from '../auth.ts';
export declare function generatePayloadHash(payload: unknown, clientApiKey: string): string;
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
};
export type StreamCallback<T> = (data: T) => void | Promise<void>;
export declare class StreamClient extends EventEmitter {
    private apiKey;
    private debug;
    private wsMap;
    private activeSubs;
    private pendingQueue;
    private subscriptionPayloads;
    private reconnectAttempts;
    private customUrls?;
    constructor(options: MobulaOptions & {
        debug?: boolean;
        wsUrlMap?: Partial<Record<keyof SubscriptionPayload, string>>;
    });
    subscribe<K extends keyof SubscriptionPayload>(type: K, payload: SubscriptionPayload[K], callback?: StreamCallback<unknown>): string;
    unsubscribe<K extends keyof SubscriptionPayload>(type?: K, subscriptionId?: string, payload?: Partial<{
        type: K;
        [key: string]: unknown;
    }>): Promise<{
        event: 'unsubscribed';
        subscriptionId?: string;
        type?: K;
    }>;
    close(type?: keyof SubscriptionPayload): void;
    private initWebSocket;
    private processMessageImmediately;
    private generateDeterministicSubscriptionId;
    private buildSubscriptionKey;
    private sendSubscriptionMessage;
    private getSubscriptionKeysForType;
    private flushSubscriptionsForType;
    private enqueueActiveSubscriptions;
    private removeSubscription;
    private removeAllSubscriptionsForType;
}
