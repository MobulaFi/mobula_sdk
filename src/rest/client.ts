import type {
  AllAssetsParams,
  AllAssetsResponse,
  AssetDetailsBatchParams,
  AssetDetailsBatchResponse,
  AssetDetailsParams,
  AssetDetailsResponse,
  AssetPriceHistoryBatchParams,
  AssetPriceHistoryBatchResponse,
  AssetPriceHistoryParams,
  AssetPriceHistoryResponse,
  AssetQueryParams,
  BlockchainsResponse,
  CreateWebhookParams,
  CreateWebhookResponse,
  DebugPulseViewsResponse,
  DefiPositionsResponse,
  DeleteWebhookParams,
  DeleteWebhookResponse,
  FormattedTokenTradesResponse,
  FundingRateParams,
  FundingRateResponse,
  ListWebhooksParams,
  ListWebhooksResponse,
  MarketBlockchainPairsParams,
  MarketBlockchainPairsResponse,
  MarketBlockchainStatsParams,
  MarketBlockchainStatsResponse,
  MarketDataResponse,
  MarketDetailsBatchParams,
  MarketDetailsBatchResponse,
  MarketDetailsParams,
  MarketDetailsResponse,
  MarketHistoryPairParams,
  MarketHistoryPairResponse,
  MarketHistoryParams,
  MarketHistoryResponse,
  MarketMultiDataAssetParams,
  MarketMultiDataResponse,
  MarketMultiHistoryParams,
  MarketMultiHistoryResponse,
  MarketMultiPricesParams,
  MarketMultiPricesResponse,
  MarketOHLCVHistoryBatchParams,
  MarketOHLCVHistoryBatchResponse,
  MarketOHLCVHistoryParams,
  MarketOHLCVHistoryResponse,
  MarketPairParams,
  MarketPairResponse,
  MarketPairsParams,
  MarketPairsResponse,
  MarketQueryParams,
  MarketQueryResponse,
  MarketSparklineParams,
  MarketSparklineResponse,
  MarketTokenHoldersParams,
  MarketTokenHoldersResponse,
  MarketTokenVsMarketParams,
  MarketTokenVsMarketResponse,
  MarketTotalResponse,
  MarketTradesPairParams,
  MarketTradesPairResponse,
  MetadataCategoriesResponse,
  MetadataParams,
  MetadataResponse,
  MetadataTrendingsParams,
  MetadataTrendingsResponse,
  MultiMetadataParams,
  MultiMetadataResponse,
  MultiPortfolioResponse,
  NFTMetadataParams,
  NFTMetadataResponse,
  PortfolioParams,
  PortfolioResponse,
  PulsePaginationResponse,
  PulsePayloadParams,
  PulseResponse,
  SearchFastResponse,
  SearchParams,
  SearchResponse,
  SingleTokenTradeResponse,
  SwapQuotingInstructionsResponse,
  SwapQuotingQueryParams,
  SwapQuotingResponse,
  SwapSendParams,
  SwapSendResponse,
  SystemMetadataResponse,
  TokenDetailsBatchParams,
  TokenDetailsBatchResponse,
  TokenDetailsParams,
  TokenDetailsResponse,
  TokenFirstBuyersParams,
  TokenFirstBuyersResponse,
  TokenKlineBsPointParams,
  TokenKlineBsPointResponse,
  TokenMarketsParams,
  TokenMarketsResponse,
  TokenOHLCVHistoryBatchParams,
  TokenOHLCVHistoryBatchResponse,
  TokenOHLCVHistoryParams,
  TokenOHLCVHistoryResponse,
  TokenPositionsParams,
  TokenPositionsResponse,
  TokenPriceBatchParams,
  TokenPriceBatchResponse,
  TokenPriceParams,
  TokenPriceResponse,
  TokenSecurityParams,
  TokenSecurityResponse,
  TokenTradeParams,
  TokenTradesParams,
  TokenTradesResponse,
  TradesFiltersParams,
  TradesFiltersResponse,
  UpdateWebhookParams,
  UpdateWebhookResponse,
  WalletActivityV2Params,
  WalletActivityV2Response,
  WalletAnalysisParams,
  WalletAnalysisResponse,
  WalletBalanceUSDParams,
  WalletBalanceUSDResponse,
  WalletDefiPositionsParams,
  WalletDefiPositionsResponse,
  WalletFundingParams,
  WalletFundingResponse,
  WalletHistoryParams,
  WalletHistoryResponse,
  WalletHoldingsResponse,
  WalletLabelsParams,
  WalletLabelsResponse,
  WalletNFTParams,
  WalletNFTResponse,
  WalletNFTTransactionsResponse,
  WalletPositionBatchParams,
  WalletPositionBatchResponse,
  WalletPositionParams,
  WalletPositionResponse,
  WalletPositionsParams,
  WalletPositionsResponse,
  WalletRawTransactionsParams,
  WalletRawTransactionsResponse,
  WalletSmartMoneyResponse,
  WalletTradesParams,
  WalletTradesResponse,
  WalletTransactionsParams,
  WalletTransactionsResponse,
  WalletUnsafeParams,
  WalletV1DeployerParams,
  WalletV1DeployerResponse,
  WalletV2DeployerParams,
  WalletV2DeployerResponse,
} from '@mobula_labs/types';
import axios, { type AxiosError, type AxiosInstance } from 'axios';
import type { z } from 'zod';
import { getAuthHeaders, type MobulaOptions } from '../auth.ts';

export type MobulaErrorData = Record<string, unknown> | string | null;

export class MobulaError extends Error {
  public status?: number;
  public data?: MobulaErrorData;

  constructor(message: string, status?: number, data?: MobulaErrorData) {
    super(message);
    this.status = status;
    this.data = data;
    Object.setPrototypeOf(this, MobulaError.prototype);
  }
}

export type Primitive = string | number | boolean | null | Date;

export interface RestClientOptions extends MobulaOptions {
  timeout?: number;
  debug?: boolean;
}

export class RestClient {
  private client: AxiosInstance;
  private readonly apiKey?: string;
  private debug: boolean;

  constructor(options: RestClientOptions) {
    this.apiKey = options?.apiKey;
    this.debug = options.debug || false;
    const timeout = options.timeout ?? 10000; // default 10s
    this.client = axios.create({
      baseURL: options.restUrl || 'https://api.mobula.io',
      timeout,
      paramsSerializer: {
        serialize: (params) => {
          const searchParams = new URLSearchParams();
          for (const [key, value] of Object.entries(params)) {
            if (value === null || value === undefined) continue;
            // Serialize arrays as comma-separated values (not bracket notation)
            if (Array.isArray(value)) {
              searchParams.append(key, value.join(','));
            } else {
              searchParams.append(key, String(value));
            }
          }
          return searchParams.toString();
        },
      },
    });
  }

  async request<P = undefined, R = unknown>(
    method: 'get' | 'post' | 'patch' | 'delete',
    endpoint: string,
    params?: P,
    schema?: z.ZodType<R>,
  ): Promise<R> {
    const headers = getAuthHeaders(this.apiKey);

    // Automatically remove undefined fields
    const cleanParams = params
      ? JSON.parse(JSON.stringify(params, (_, value) => (value === undefined ? undefined : value)))
      : undefined;

    // Don't send Content-Type for requests without body (GET/DELETE)
    const requestHeaders =
      method === 'get' || method === 'delete' ? { ...headers, 'Content-Type': undefined } : headers;

    const config = {
      method,
      url: endpoint,
      params: method === 'get' || method === 'delete' ? cleanParams : undefined,
      data: method === 'post' || method === 'patch' ? cleanParams : undefined,
      headers: requestHeaders,
    };

    if (this.debug) console.log(`[Mobula SDK] Request: ${method.toUpperCase()} ${endpoint}`, cleanParams);

    try {
      const { data } = await this.client(config);
      if (schema) return schema.parse(data) as R;
      return data as R;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosErr = error as AxiosError;
        throw new MobulaError(axiosErr.message, axiosErr.response?.status, axiosErr.response?.data as MobulaErrorData);
      }
      if (error instanceof Error) throw new MobulaError(error.message);
      throw new MobulaError('Unknown error occurred');
    }
  }

  // === SDK Methods ===

  async fetchAllAssets(params: AllAssetsParams): Promise<AllAssetsResponse> {
    return this.request<AllAssetsParams, AllAssetsResponse>('get', '/api/1/all', params);
  }

  async fetchAllBlockchains(): Promise<BlockchainsResponse> {
    return this.request<undefined, BlockchainsResponse>('get', '/api/1/blockchains');
  }

  async fetchMarketBlockchainPairs(params: MarketBlockchainPairsParams): Promise<MarketBlockchainPairsResponse> {
    return this.request<MarketBlockchainPairsParams, MarketBlockchainPairsResponse>(
      'get',
      '/api/1/market/blockchain/pairs',
      params,
    );
  }

  async fetchMarketBlockchainStats(params: MarketBlockchainStatsParams): Promise<MarketBlockchainStatsResponse> {
    return this.request<MarketBlockchainStatsParams, MarketBlockchainStatsResponse>(
      'get',
      '/api/1/market/blockchain/stats',
      params,
    );
  }

  async fetchFundingRate(params: FundingRateParams): Promise<FundingRateResponse> {
    return this.request<FundingRateParams, FundingRateResponse>('get', '/api/1/market/cefi/funding-rate', params);
  }

  async fetchMarketData(params: AssetQueryParams): Promise<MarketDataResponse> {
    return this.request<AssetQueryParams, MarketDataResponse>('get', '/api/1/market/data', params);
  }

  async fetchMarketHistory(params: MarketHistoryParams): Promise<MarketHistoryResponse> {
    return this.request<MarketHistoryParams, MarketHistoryResponse>('get', '/api/1/market/history', params);
  }

  async fetchMarketHistoricalPairData(params: MarketHistoryPairParams): Promise<MarketHistoryPairResponse> {
    return this.request<MarketHistoryPairParams, MarketHistoryPairResponse>(
      'get',
      '/api/1/market/history/pair',
      params,
    );
  }

  async fetchMarketMultiData(params: MarketMultiDataAssetParams): Promise<MarketMultiDataResponse> {
    return this.request<MarketMultiDataAssetParams, MarketMultiDataResponse>(
      'post',
      '/api/1/market/multi-data',
      params,
    );
  }

  async fetchMarketMultiHistory(params: MarketMultiHistoryParams): Promise<MarketMultiHistoryResponse> {
    return this.request<MarketMultiHistoryParams, MarketMultiHistoryResponse>(
      'get',
      '/api/1/market/multi-history',
      params,
    );
  }

  async fetchMarketMultiPrices(params: MarketMultiPricesParams): Promise<MarketMultiPricesResponse> {
    return this.request<MarketMultiPricesParams, MarketMultiPricesResponse>(
      'post',
      '/api/1/market/multi-prices',
      params,
    );
  }

  async fetchMarketPair(params: MarketPairParams): Promise<MarketPairResponse> {
    return this.request<MarketPairParams, MarketPairResponse>('get', '/api/1/market/pair', params);
  }

  async fetchMarketPairs(params: MarketPairsParams): Promise<MarketPairsResponse> {
    return this.request<MarketPairsParams, MarketPairsResponse>('get', '/api/1/market/pairs', params);
  }

  async fetchMarketQuery(params: MarketQueryParams): Promise<MarketQueryResponse> {
    return this.request<MarketQueryParams, MarketQueryResponse>('get', '/api/1/market/query', params);
  }

  async fetchMarketSparkline(params: MarketSparklineParams): Promise<MarketSparklineResponse> {
    return this.request<MarketSparklineParams, MarketSparklineResponse>('get', '/api/1/market/sparkline', params);
  }

  async fetchMarketTokenHolders(params: MarketTokenHoldersParams): Promise<MarketTokenHoldersResponse> {
    return this.request<MarketTokenHoldersParams, MarketTokenHoldersResponse>(
      'get',
      '/api/1/market/token/holders',
      params,
    );
  }

  async fetchMarketTotalVsMarket(params: MarketTokenVsMarketParams): Promise<MarketTokenVsMarketResponse> {
    return this.request<MarketTokenVsMarketParams, MarketTokenVsMarketResponse>(
      'get',
      '/api/1/market/token-vs-market',
      params,
    );
  }

  async fetchMarketTotal(): Promise<MarketTotalResponse> {
    return this.request<undefined, MarketTotalResponse>('get', '/api/1/market/total');
  }

  async fetchMarketTradesPair(params: MarketTradesPairParams): Promise<MarketTradesPairResponse> {
    return this.request<MarketTradesPairParams, MarketTradesPairResponse>('get', '/api/1/market/trades/pair', params);
  }

  //// Metadata

  async fetchMetadataCategories(): Promise<MetadataCategoriesResponse> {
    return this.request<undefined, MetadataCategoriesResponse>('get', '/api/1/metadata/categories');
  }

  async fetchMetadataTrendings(params: MetadataTrendingsParams): Promise<MetadataTrendingsResponse> {
    return this.request<MetadataTrendingsParams, MetadataTrendingsResponse>('get', '/api/1/metadata/trendings', params);
  }

  async fetchMetadata(params: MetadataParams): Promise<MetadataResponse> {
    return this.request<MetadataParams, MetadataResponse>('get', '/api/1/metadata', params);
  }

  async fetchMultiMetadata(params: MultiMetadataParams): Promise<MultiMetadataResponse> {
    return this.request<MultiMetadataParams, MultiMetadataResponse>('post', '/api/1/multi-metadata', params);
  }

  ///// search

  async fetchSearch(params: SearchParams): Promise<SearchResponse> {
    return this.request<SearchParams, SearchResponse>('get', '/api/1/search', params);
  }

  async fetchSearchFast(params: SearchParams): Promise<SearchFastResponse> {
    return this.request<SearchParams, SearchFastResponse>('get', '/api/2/fast-search', params);
  }

  async fetchTokenFirstBuyers(params: TokenFirstBuyersParams): Promise<TokenFirstBuyersResponse> {
    return this.request<TokenFirstBuyersParams, TokenFirstBuyersResponse>('get', '/api/1/token/first-buyers', params);
  }

  async fetchWalletBalanceUSD(params: WalletBalanceUSDParams): Promise<WalletBalanceUSDResponse> {
    return this.request<WalletBalanceUSDParams, WalletBalanceUSDResponse>('get', '/api/1/wallet/balance-usd', params);
  }

  async fetchWalletV1Deployer(params: WalletV1DeployerParams): Promise<WalletV1DeployerResponse> {
    return this.request<WalletV1DeployerParams, WalletV1DeployerResponse>('get', '/api/1/wallet/deployer', params);
  }

  async fetchWalletHistory(params: WalletHistoryParams): Promise<WalletHistoryResponse> {
    return this.request<WalletHistoryParams, WalletHistoryResponse>('get', '/api/1/wallet/history', params);
  }

  async fetchWalletNFTS(params: WalletNFTParams): Promise<WalletNFTResponse> {
    return this.request<WalletNFTParams, WalletNFTResponse>('get', '/api/1/wallet/nfts', params);
  }

  async fetchMetadataNFTS(params: NFTMetadataParams): Promise<NFTMetadataResponse> {
    return this.request<NFTMetadataParams, NFTMetadataResponse>('get', '/api/1/metadata/nfts', params);
  }

  async fetchWalletPortfolio(params: PortfolioParams): Promise<PortfolioResponse> {
    return this.request<PortfolioParams, PortfolioResponse>('get', '/api/1/wallet/portfolio', params);
  }

  async fetchMultiWalletPortfolio(params: WalletUnsafeParams): Promise<MultiPortfolioResponse> {
    return this.request<WalletUnsafeParams, MultiPortfolioResponse>('get', '/api/1/wallet/multi-portfolio', params);
  }

  async fetchDefiPositions(params: WalletUnsafeParams): Promise<DefiPositionsResponse> {
    return this.request<WalletUnsafeParams, DefiPositionsResponse>('get', '/api/1/wallet/defi-positions', params);
  }

  async fetchWalletSmartMoney(): Promise<WalletSmartMoneyResponse> {
    return this.request<undefined, WalletSmartMoneyResponse>('get', '/api/1/wallet/smart-money');
  }

  async fetchWalletTrades(params: WalletTradesParams): Promise<WalletTradesResponse> {
    return this.request<WalletTradesParams, WalletTradesResponse>('post', '/api/1/wallet/trades', params);
  }

  async fetchWalletTransactions(params: WalletTransactionsParams): Promise<WalletTransactionsResponse> {
    return this.request<WalletTransactionsParams, WalletTransactionsResponse>(
      'get',
      '/api/1/wallet/transactions',
      params,
    );
  }

  async fetchWalletRawTransactions(params: WalletRawTransactionsParams): Promise<WalletRawTransactionsResponse> {
    return this.request<WalletRawTransactionsParams, WalletRawTransactionsResponse>(
      'get',
      '/api/1/wallet/raw-transactions',
      params,
    );
  }

  async fetchWalletNFTTransactions(params: WalletRawTransactionsParams): Promise<WalletNFTTransactionsResponse> {
    return this.request<WalletRawTransactionsParams, WalletNFTTransactionsResponse>(
      'get',
      '/api/1/wallet/nft-transfers',
      params,
    );
  }

  async fetchWalletTokensTransactions(params: WalletRawTransactionsParams): Promise<WalletRawTransactionsResponse> {
    return this.request<WalletRawTransactionsParams, WalletRawTransactionsResponse>(
      'get',
      '/api/1/wallet/token-transfers',
      params,
    );
  }

  async fetchWalletLabels(params: WalletLabelsParams): Promise<WalletLabelsResponse> {
    return this.request<WalletLabelsParams, WalletLabelsResponse>('post', '/api/1/wallet/labels', params);
  }

  async postPulseV2Pagination(params: PulsePayloadParams): Promise<PulsePaginationResponse> {
    return this.request<PulsePayloadParams, PulsePaginationResponse>('post', '/api/2/pulse/pagination', params);
  }

  async postPulseV2DebugViews(params: PulsePayloadParams): Promise<DebugPulseViewsResponse> {
    return this.request<PulsePayloadParams, DebugPulseViewsResponse>('post', '/api/debug/pulse/views', params);
  }

  async fetchPulseV2(params: PulsePayloadParams): Promise<PulseResponse> {
    return this.request<PulsePayloadParams, PulseResponse>('post', '/api/2/pulse', params);
  }

  async fetchMarketDetails(params: MarketDetailsParams): Promise<MarketDetailsResponse> {
    return this.request<MarketDetailsParams, MarketDetailsResponse>('get', '/api/2/market/details', params);
  }

  async fetchMarketDetailsBatch(params: MarketDetailsBatchParams): Promise<MarketDetailsBatchResponse> {
    return this.request<MarketDetailsBatchParams, MarketDetailsBatchResponse>('post', '/api/2/market/details', params);
  }

  async fetchAssetDetails(params: AssetDetailsParams): Promise<AssetDetailsResponse> {
    return this.request<AssetDetailsParams, AssetDetailsResponse>('get', '/api/2/asset/details', params);
  }

  async fetchAssetDetailsBatch(params: AssetDetailsBatchParams): Promise<AssetDetailsBatchResponse> {
    return this.request<AssetDetailsBatchParams, AssetDetailsBatchResponse>('post', '/api/2/asset/details', params);
  }

  async fetchAssetPriceHistory(params: AssetPriceHistoryParams): Promise<AssetPriceHistoryResponse> {
    return this.request<AssetPriceHistoryParams, AssetPriceHistoryResponse>(
      'get',
      '/api/2/asset/price-history',
      params,
    );
  }

  async fetchAssetPriceHistoryBatch(params: AssetPriceHistoryBatchParams): Promise<AssetPriceHistoryBatchResponse> {
    return this.request<AssetPriceHistoryBatchParams, AssetPriceHistoryBatchResponse>(
      'post',
      '/api/2/asset/price-history',
      params,
    );
  }

  async fetchMarketOHLCVHistory(params: MarketOHLCVHistoryParams): Promise<MarketOHLCVHistoryResponse> {
    return this.request<MarketOHLCVHistoryParams, MarketOHLCVHistoryResponse>(
      'get',
      '/api/2/market/ohlcv-history',
      params,
    );
  }

  async fetchMarketOHLCVHistoryBatch(params: MarketOHLCVHistoryBatchParams): Promise<MarketOHLCVHistoryBatchResponse> {
    return this.request<MarketOHLCVHistoryBatchParams, MarketOHLCVHistoryBatchResponse>(
      'post',
      '/api/2/market/ohlcv-history',
      params,
    );
  }

  async fetchTokenOHLCVHistory(params: TokenOHLCVHistoryParams): Promise<TokenOHLCVHistoryResponse> {
    return this.request<TokenOHLCVHistoryParams, TokenOHLCVHistoryResponse>(
      'get',
      '/api/2/token/ohlcv-history',
      params,
    );
  }

  async fetchTokenOHLCVHistoryBatch(params: TokenOHLCVHistoryBatchParams): Promise<TokenOHLCVHistoryBatchResponse> {
    return this.request<TokenOHLCVHistoryBatchParams, TokenOHLCVHistoryBatchResponse>(
      'post',
      '/api/2/token/ohlcv-history',
      params,
    );
  }

  async fetchTokenTraderPositions(params: TokenPositionsParams): Promise<TokenPositionsResponse> {
    return this.request<TokenPositionsParams, TokenPositionsResponse>('get', '/api/2/token/trader-positions', params);
  }

  async fetchTokenHolderPositions(params: TokenPositionsParams): Promise<TokenPositionsResponse> {
    return this.request<TokenPositionsParams, TokenPositionsResponse>('post', '/api/2/token/holder-positions', params);
  }

  async fetchTokenDetails(params: TokenDetailsParams): Promise<TokenDetailsResponse> {
    return this.request<TokenDetailsParams, TokenDetailsResponse>('get', '/api/2/token/details', params);
  }

  async fetchTokenDetailsBatch(params: TokenDetailsBatchParams): Promise<TokenDetailsBatchResponse> {
    return this.request<TokenDetailsBatchParams, TokenDetailsBatchResponse>('post', '/api/2/token/details', params);
  }

  async fetchMultiTokenTrades(params: TokenTradesParams): Promise<TokenTradesResponse> {
    return this.request<TokenTradesParams, TokenTradesResponse>('post', '/api/2/token/trades', params);
  }

  async fetchTokenTrade(params: TokenTradeParams): Promise<SingleTokenTradeResponse> {
    return this.request<TokenTradeParams, SingleTokenTradeResponse>('get', '/api/2/token/trade', params);
  }

  async fetchTokenTrades(
    params: TokenTradesParams & { formatted?: boolean },
  ): Promise<TokenTradesResponse | FormattedTokenTradesResponse> {
    const { formatted = false, ...rest } = params;

    const response = await this.request<TokenTradesParams, TokenTradesResponse>('get', '/api/2/token/trades', rest);

    if (!Array.isArray(response.data)) {
      throw new Error('Invalid API response: expected array of trades');
    }

    if (!formatted) {
      return response;
    }

    const formattedData = response.data.map((trade) => ({
      labels: trade.labels,
      walletMetadata: trade.walletMetadata,
      pair: trade.marketAddress,
      date: trade.date,
      tokenPrice: Number(trade.baseTokenPriceUSD),
      tokenPriceVs: Number(trade.quoteTokenPriceUSD),
      tokenAmount: Number(trade.baseTokenAmount),
      tokenAmountVs: Number(trade.quoteTokenAmount),
      tokenAmountUsd: Number(trade.baseTokenAmountUSD),
      tokenAmountVsUsd: Number(trade.quoteTokenAmountUSD),
      type: trade.type,
      operation: trade.operation,
      blockchain: trade.blockchain,
      hash: trade.transactionHash,
      sender: trade.transactionSenderAddress,
      tokenAmountRaw: trade.baseTokenAmountRaw,
      tokenAmountRawVs: trade.quoteTokenAmountRaw,
      // Platform metadata (id, name, logo) where the trade was executed
      platform: trade.platform ?? null,
      // Fees breakdown
      totalFeesUSD: trade.totalFeesUSD ?? null,
      gasFeesUSD: trade.gasFeesUSD ?? null,
      platformFeesUSD: trade.platformFeesUSD ?? null,
      mevFeesUSD: trade.mevFeesUSD ?? null,
    }));

    return { data: formattedData };
  }

  async fetchTokenMarkets(params: TokenMarketsParams): Promise<TokenMarketsResponse> {
    return this.request<TokenMarketsParams, TokenMarketsResponse>('get', '/api/2/token/markets', params);
  }

  async fetchWalletActivity(params: WalletActivityV2Params): Promise<WalletActivityV2Response> {
    return this.request<WalletActivityV2Params, WalletActivityV2Response>('get', '/api/2/wallet/activity', params);
  }

  async fetchWalletDeployer(params: WalletV2DeployerParams): Promise<WalletV2DeployerResponse> {
    return this.request<WalletV2DeployerParams, WalletV2DeployerResponse>('get', '/api/2/wallet/deployer', params);
  }

  async fetchWalletAnalysis(params: WalletAnalysisParams): Promise<WalletAnalysisResponse> {
    return this.request<WalletAnalysisParams, WalletAnalysisResponse>('get', '/api/2/wallet/analysis', params);
  }

  async fetchWalletPositions(params: WalletPositionsParams): Promise<WalletPositionsResponse> {
    return this.request<WalletPositionsParams, WalletPositionsResponse>('get', '/api/2/wallet/positions', params);
  }

  async fetchWalletPosition(params: WalletPositionParams): Promise<WalletPositionResponse> {
    return this.request<WalletPositionParams, WalletPositionResponse>('get', '/api/2/wallet/position', params);
  }

  async fetchWalletPositionBatch(params: WalletPositionBatchParams): Promise<WalletPositionBatchResponse> {
    return this.request<WalletPositionBatchParams, WalletPositionBatchResponse>(
      'post',
      '/api/2/wallet/position',
      params,
    );
  }

  async fetchSystemMetadata(): Promise<SystemMetadataResponse> {
    return this.request<undefined, SystemMetadataResponse>('get', '/api/1/system-metadata');
  }

  async fetchSwapQuote(params: SwapQuotingQueryParams): Promise<SwapQuotingResponse> {
    return this.request<SwapQuotingQueryParams, SwapQuotingResponse>('get', '/api/2/swap/quoting', params);
  }

  async fetchSwapTransaction(params: SwapSendParams): Promise<SwapSendResponse> {
    return this.request<SwapSendParams, SwapSendResponse>('post', '/api/2/swap/send', params);
  }

  async fetchTokenSecurity(params: TokenSecurityParams): Promise<TokenSecurityResponse> {
    return this.request<TokenSecurityParams, TokenSecurityResponse>('get', '/api/2/token/security', params);
  }

  async fetchTokenKlineBsPoint(params: TokenKlineBsPointParams): Promise<TokenKlineBsPointResponse> {
    return this.request<TokenKlineBsPointParams, TokenKlineBsPointResponse>(
      'get',
      '/api/2/token/kline-bs-point',
      params,
    );
  }

  async fetchWalletFunding(params: WalletFundingParams): Promise<WalletFundingResponse> {
    return this.request<WalletFundingParams, WalletFundingResponse>('get', '/api/2/wallet/funding', params);
  }

  async fetchWalletTokenBalances(params: WalletUnsafeParams): Promise<WalletHoldingsResponse> {
    return this.request<WalletUnsafeParams, WalletHoldingsResponse>('get', '/api/2/wallet/token-balances', params);
  }

  async createWebhook(params: CreateWebhookParams): Promise<CreateWebhookResponse> {
    return this.request<CreateWebhookParams, CreateWebhookResponse>('post', '/api/1/webhook', params);
  }

  async updateWebhook(params: UpdateWebhookParams): Promise<UpdateWebhookResponse> {
    return this.request<UpdateWebhookParams, UpdateWebhookResponse>('patch', '/api/1/webhook', params);
  }

  async listWebhooks(params: ListWebhooksParams): Promise<ListWebhooksResponse> {
    return this.request<ListWebhooksParams, ListWebhooksResponse>('get', '/api/1/webhook', params);
  }

  async deleteWebhook(params: DeleteWebhookParams): Promise<DeleteWebhookResponse> {
    return this.request<undefined, DeleteWebhookResponse>('delete', `/api/1/webhook/${params.id}`, undefined);
  }

  async fetchTokenPrice(params: TokenPriceParams): Promise<TokenPriceResponse> {
    return this.request<TokenPriceParams, TokenPriceResponse>('get', '/api/2/token/price', params);
  }

  async fetchTokenPriceBatch(params: TokenPriceBatchParams): Promise<TokenPriceBatchResponse> {
    return this.request<TokenPriceBatchParams, TokenPriceBatchResponse>('post', '/api/2/token/price', params);
  }

  async fetchWalletDefiPositionsV2(params: WalletDefiPositionsParams): Promise<WalletDefiPositionsResponse> {
    return this.request<WalletDefiPositionsParams, WalletDefiPositionsResponse>(
      'get',
      '/api/2/wallet/defi-positions',
      params,
    );
  }

  async fetchSwapQuotingInstructions(params: SwapQuotingQueryParams): Promise<SwapQuotingInstructionsResponse> {
    return this.request<SwapQuotingQueryParams, SwapQuotingInstructionsResponse>(
      'get',
      '/api/2/swap/quoting-instructions',
      params,
    );
  }

  async fetchTradesFilters(params: TradesFiltersParams): Promise<TradesFiltersResponse> {
    return this.request<TradesFiltersParams, TradesFiltersResponse>('get', '/api/2/trades/filters', params);
  }
}
