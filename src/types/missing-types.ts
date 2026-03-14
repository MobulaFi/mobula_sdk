/**
 * Types that exist in @mobula/types (internal) but haven't been published
 * to @mobula_labs/types (npm) yet. Defined locally until the npm package is updated.
 */

// TokenPriceAt types (GET/POST /api/2/token/price-at)
export interface TokenPriceAtParams {
  blockchain?: string;
  address?: string;
  timestamp: number;
}

export type TokenPriceAtBatchParams = TokenPriceAtParams[] | { items: TokenPriceAtParams[] };

export interface TokenPriceAtResponse {
  data: {
    priceUSD: number;
    timestamp: number;
    swapTimestamp: number;
    poolAddress: string;
  };
}

export interface TokenPriceAtBatchResponse {
  payload: (
    | {
        priceUSD: number;
        timestamp: number;
        swapTimestamp: number;
        poolAddress: string;
      }
    | { error?: string }
    | null
  )[];
}

// WalletTradesV2 types (GET/POST /api/2/wallet/trades)
export interface WalletTradesV2Params {
  wallet: string;
  wallets?: string;
  tokenAddress?: string;
  blockchains?: string;
  limit?: number;
  offset?: number;
  order?: 'asc' | 'desc';
  from?: number;
  to?: number;
}

export interface WalletTradesV2Response {
  data: unknown[];
  pagination: {
    page: number;
    offset: number;
    limit: number;
    pageEntries: number;
  };
}
