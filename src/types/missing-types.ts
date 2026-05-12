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

// ===== Bridge types (Alpha Preview) =====

export interface BridgeQuoteParams {
  originChainId: string;
  destinationChainId: string;
  originToken?: string;
  destinationToken?: string;
  amount: string;
  walletAddress: string;
  slippage?: string;
}

export interface BridgeQuoteResponse {
  data: {
    estimatedAmountOut: string;
    estimatedAmountOutUsd: string;
    fees: {
      bridgeFeeBps: number;
      gasFeeUsd: string;
      totalFeeUsd: string;
    };
    estimatedTimeMs: number;
    maxTradeUsd: number;
    steps?: Array<{
      type: string;
      description: string;
      tx: {
        to: string;
        data: string;
        value: string;
        chainId: number;
        approvalAddress?: string;
        approvalToken?: string;
        approvalAmount?: string;
      };
    }>;
    deposit: {
      evm?: {
        to: string;
        data: string;
        value: string;
        chainId: number;
        approvalAddress?: string;
        approvalToken?: string;
        approvalAmount?: string;
      };
      solana?: {
        to: string;
        amount: string;
        memo: string;
        mint?: string;
        decimals?: number;
        type?: string;
      };
    };
  };
}

export interface BridgeStatusParams {
  id: string;
}

export interface BridgeStatusResponse {
  data: {
    intentId?: string;
    status: 'pending' | 'deposited' | 'filling' | 'filled' | 'settled' | 'retrying' | 'refunded' | 'failed';
    originChainId?: string;
    destinationChainId?: string;
    sender?: string;
    recipient?: string;
    amountIn?: string;
    amountOut?: string | null;
    depositTxHash?: string | null;
    fillTxHash?: string | null;
    settleTxHash?: string | null;
    latencyMs?: number | null;
    timestamps?: {
      depositDetected?: string | null;
      fillSent?: string | null;
      fillConfirmed?: string | null;
      settled?: string | null;
    };
    createdAt?: string;
    message?: string;
  };
}

export interface BridgeRoutesResponse {
  data: {
    routes: Array<{
      originChainId: string;
      destinationChainId: string;
      estimatedTimeMs: number;
      maxTradeUsd: number;
      feeBps: number;
      supportedTokens: string;
    }>;
  };
}

// FastSearchPostBody (POST /api/2/fast-search) — pulse-v2 filter syntax.
// Mirrors `FastSearchPostBodySchema` in @mobula/types/v1/search/SearchSchema.ts.
export interface FastSearchPostBody {
  /** Search term (name / symbol / address). Wrap in double quotes for exact-symbol match. */
  input: string;
  /** Chain ID(s) to filter — same shorthand as pulse `view.chainId`. */
  chainId?: string | string[];
  /** Pool type(s) to filter — same shorthand as pulse `view.poolTypes`. */
  poolTypes?: string | string[];
  /**
   * Prisma-like `where` tree supporting `AND`/`OR`/`NOT` and leaf operators
   * (`equals`, `not`, `gte`, `gt`, `lte`, `lt`, `in`, `notIn`, `contains`,
   * `startsWith`, `endsWith`, `mode: 'insensitive'`). Same surface as
   * `view.filters` on `POST /api/2/pulse`.
   */
  filters?: Record<string, unknown>;
  sortBy?:
    | 'volume24h'
    | 'marketCap'
    | 'createdAt'
    | 'volume1h'
    | 'feesPaid5min'
    | 'feesPaid1h'
    | 'feesPaid24h'
    | 'volume5min'
    | 'holdersCount'
    | 'organicVolume1h'
    | 'totalFeesPaidUsd'
    | 'searchScore'
    | 'trendingScore24h'
    | 'volume_24h'
    | 'market_cap'
    | 'created_at'
    | 'volume_1h'
    | 'fees_paid_5min'
    | 'fees_paid_1h'
    | 'fees_paid_24h'
    | 'volume_5min'
    | 'holders_count'
    | 'organic_volume_1h'
    | 'total_fees_paid_usd'
    | 'search_score'
    | 'trending_score_24h';
  sortOrder?: 'asc' | 'desc';
  /** 1–20, default 5. */
  limit?: number;
  /** Default 0. */
  offset?: number;
}
