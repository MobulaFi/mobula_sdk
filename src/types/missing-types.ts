/**
 * Types that exist in @mobula/types (internal) but haven't been published
 * to @mobula_labs/types (npm) yet. Defined locally until the npm package is updated.
 */

// WalletPositionsBatch types (POST /api/2/wallet/positions - batch)
export interface WalletPositionsBatchItemParams {
  wallet: string;
  blockchains?: string[];
  limit?: number;
  offset?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  useSwapRecipient?: boolean;
  includeAllBalances?: boolean;
}

export type WalletPositionsBatchParams = WalletPositionsBatchItemParams[] | { items: WalletPositionsBatchItemParams[] };

export interface WalletPositionsBatchResponse {
  payload: (
    | {
        wallet: string;
        data: unknown[];
        walletMetadata?: unknown;
        pagination?: unknown;
      }
    | { wallet: string; error: string }
    | null
  )[];
  hostname?: string;
}

// TokenPositionsBatch types (POST /api/2/token/holder-positions/batch & trader-positions/batch)
export interface TokenPositionsBatchItemParams {
  blockchain?: string;
  address?: string;
  label?: string;
  limit?: number;
  offset?: number;
  walletAddresses?: string | string[];
  useSwapRecipient?: boolean;
  includeFees?: boolean;
}

export type TokenPositionsBatchParams = TokenPositionsBatchItemParams[] | { items: TokenPositionsBatchItemParams[] };

export interface TokenPositionsBatchResponse {
  payload: (
    | {
        address?: string;
        blockchain?: string;
        data: unknown[];
        totalCount: number;
      }
    | { error?: string }
  )[];
  hostname?: string;
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
