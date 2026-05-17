import { beforeEach, describe, expect, it, vi } from 'vitest';

const webSocketUrls = vi.hoisted(() => [] as string[]);

vi.mock('isomorphic-ws', () => {
  class MockWebSocket {
    static OPEN = 1;
    readyState = 0;

    constructor(url: string) {
      webSocketUrls.push(url);
    }

    addEventListener() {}
    send() {}
    close() {}
  }

  return { default: MockWebSocket };
});

import { StreamClient } from './client.ts';

describe('StreamClient URL overrides', () => {
  beforeEach(() => {
    webSocketUrls.length = 0;
  });

  it('uses wsUrl as the global WebSocket URL override', () => {
    const client = new StreamClient({
      wsUrl: 'https://byrrgis-api.mobula.io',
    });

    client.subscribe('trade', { address: '0x123' } as never);

    expect(webSocketUrls).toEqual(['wss://byrrgis-api.mobula.io']);
  });

  it('keeps wsUrl above topic-specific wsUrlMap overrides', () => {
    const client = new StreamClient({
      wsUrl: 'wss://global.mobula.io',
      wsUrlMap: {
        trade: 'wss://trade.mobula.io',
      },
    });

    client.subscribe('trade', { address: '0x123' } as never);

    expect(webSocketUrls).toEqual(['wss://global.mobula.io']);
  });

  it('uses wsUrlMap when no global wsUrl is provided', () => {
    const client = new StreamClient({
      wsUrlMap: {
        trade: 'wss://trade.mobula.io',
      },
    });

    client.subscribe('trade', { address: '0x123' } as never);

    expect(webSocketUrls).toEqual(['wss://trade.mobula.io']);
  });
});
