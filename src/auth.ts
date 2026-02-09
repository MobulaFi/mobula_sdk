export interface MobulaOptions {
  apiKey?: string;
  restUrl?: string;
  wsUrl?: string;
  wsUrlMap?: Partial<Record<string, string>>;
}

export const getAuthHeaders = (apiKey?: string): Record<string, string> => ({
  ...(apiKey && { Authorization: apiKey }),
  'Content-Type': 'application/json',
});

export const defaultWsUrlMap: Record<string, string> = {
  market: 'wss://stream.mobula.io/market',
  wallet: 'wss://stream.mobula.io/wallet',
  trade: 'wss://stream.mobula.io/trade',
  default: 'wss://api.mobula.io',
};

export const getWsUrl = (topic: string, options: MobulaOptions): string => {
  if (options.wsUrl) return options.wsUrl;

  const url = options.wsUrlMap?.[topic] ?? defaultWsUrlMap[topic] ?? defaultWsUrlMap['default'];
  return url as string;
};
