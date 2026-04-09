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
