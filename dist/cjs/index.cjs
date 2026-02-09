var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __moduleCache = /* @__PURE__ */ new WeakMap;
var __toCommonJS = (from) => {
  var entry = __moduleCache.get(from), desc;
  if (entry)
    return entry;
  entry = __defProp({}, "__esModule", { value: true });
  if (from && typeof from === "object" || typeof from === "function")
    __getOwnPropNames(from).map((key) => !__hasOwnProp.call(entry, key) && __defProp(entry, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    }));
  __moduleCache.set(from, entry);
  return entry;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// src/index.ts
var exports_src = {};
__export(exports_src, {
  truncate: () => truncate,
  safeToString: () => safeToString,
  formatUSD: () => formatUSD,
  formatTokenPrice: () => formatTokenPrice,
  formatPureNumber: () => formatPureNumber,
  formatPrecisePrice: () => formatPrecisePrice,
  formatPercentage: () => formatPercentage,
  formatCryptoPrice: () => formatCryptoPrice,
  buildNativeSymbol: () => buildNativeSymbol,
  buildExplorerUrl: () => buildExplorerUrl,
  PoolType: () => PoolType,
  MobulaError: () => MobulaError,
  MobulaClient: () => MobulaClient
});
module.exports = __toCommonJS(exports_src);

// src/rest/client.ts
var import_axios = __toESM(require("axios"));

// src/auth.ts
var getAuthHeaders = (apiKey) => ({
  ...apiKey && { Authorization: apiKey },
  "Content-Type": "application/json"
});

// src/rest/client.ts
class MobulaError extends Error {
  status;
  data;
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
    Object.setPrototypeOf(this, MobulaError.prototype);
  }
}

class RestClient {
  client;
  apiKey;
  debug;
  constructor(options) {
    this.apiKey = options?.apiKey;
    this.debug = options.debug || false;
    const timeout = options.timeout ?? 1e4;
    this.client = import_axios.default.create({
      baseURL: options.restUrl || "https://explorer-api.mobula.io",
      timeout
    });
  }
  async request(method, endpoint, params, schema) {
    const headers = getAuthHeaders(this.apiKey);
    const cleanParams = params ? JSON.parse(JSON.stringify(params, (_, value) => value === undefined ? undefined : value)) : undefined;
    const requestHeaders = method === "get" || method === "delete" ? { ...headers, "Content-Type": undefined } : headers;
    const config = {
      method,
      url: endpoint,
      params: method === "get" || method === "delete" ? cleanParams : undefined,
      data: method === "post" || method === "patch" ? cleanParams : undefined,
      headers: requestHeaders
    };
    if (this.debug)
      console.log(`[Mobula SDK] Request: ${method.toUpperCase()} ${endpoint}`, cleanParams);
    try {
      const { data } = await this.client(config);
      if (schema)
        return schema.parse(data);
      return data;
    } catch (error) {
      if (import_axios.default.isAxiosError(error)) {
        const axiosErr = error;
        throw new MobulaError(axiosErr.message, axiosErr.response?.status, axiosErr.response?.data);
      }
      if (error instanceof Error)
        throw new MobulaError(error.message);
      throw new MobulaError("Unknown error occurred");
    }
  }
  async fetchAllAssets(params) {
    return this.request("get", "/api/1/all", params);
  }
  async fetchAllBlockchains() {
    return this.request("get", "/api/1/blockchains");
  }
  async fetchMarketBlockchainPairs(params) {
    return this.request("get", "/api/1/market/blockchain/pairs", params);
  }
  async fetchMarketBlockchainStats(params) {
    return this.request("get", "/api/1/market/blockchain/stats", params);
  }
  async fetchFundingRate(params) {
    return this.request("get", "/api/1/market/cefi/funding-rate", params);
  }
  async fetchMarketData(params) {
    return this.request("get", "/api/1/market/data", params);
  }
  async fetchMarketHistory(params) {
    return this.request("get", "/api/1/market/history", params);
  }
  async fetchMarketHistoricalPairData(params) {
    return this.request("get", "/api/1/market/history/pair", params);
  }
  async fetchMarketMultiData(params) {
    return this.request("post", "/api/1/market/multi-data", params);
  }
  async fetchMarketMultiHistory(params) {
    return this.request("get", "/api/1/market/multi-history", params);
  }
  async fetchMarketMultiPrices(params) {
    return this.request("post", "/api/1/market/multi-prices", params);
  }
  async fetchMarketPair(params) {
    return this.request("get", "/api/1/market/pair", params);
  }
  async fetchMarketPairs(params) {
    return this.request("get", "/api/1/market/pairs", params);
  }
  async fetchMarketQuery(params) {
    return this.request("get", "/api/1/market/query", params);
  }
  async fetchMarketSparkline(params) {
    return this.request("get", "/api/1/market/sparkline", params);
  }
  async fetchMarketTokenHolders(params) {
    return this.request("get", "/api/1/market/token/holders", params);
  }
  async fetchMarketTotalVsMarket(params) {
    return this.request("get", "/api/1/market/token-vs-market", params);
  }
  async fetchMarketTotal() {
    return this.request("get", "/api/1/market/total");
  }
  async fetchMarketTradesPair(params) {
    return this.request("get", "/api/1/market/trades/pair", params);
  }
  async fetchMetadataCategories() {
    return this.request("get", "/api/1/metadata/categories");
  }
  async fetchMetadataTrendings(params) {
    return this.request("get", "/api/1/metadata/trendings", params);
  }
  async fetchMetadata(params) {
    return this.request("get", "/api/1/metadata", params);
  }
  async fetchMultiMetadata(params) {
    return this.request("post", "/api/1/multi-metadata", params);
  }
  async fetchSearch(params) {
    return this.request("get", "/api/1/search", params);
  }
  async fetchSearchFast(params) {
    return this.request("get", "/api/2/fast-search", params);
  }
  async fetchTokenFirstBuyers(params) {
    return this.request("get", "/api/1/token/first-buyers", params);
  }
  async fetchWalletBalanceUSD(params) {
    return this.request("get", "/api/1/wallet/balance-usd", params);
  }
  async fetchWalletV1Deployer(params) {
    return this.request("get", "/api/1/wallet/deployer", params);
  }
  async fetchWalletHistory(params) {
    return this.request("get", "/api/1/wallet/history", params);
  }
  async fetchWalletNFTS(params) {
    return this.request("get", "/api/1/wallet/nfts", params);
  }
  async fetchMetadataNFTS(params) {
    return this.request("get", "/api/1/metadata/nfts", params);
  }
  async fetchWalletPortfolio(params) {
    return this.request("get", "/api/1/wallet/portfolio", params);
  }
  async fetchMultiWalletPortfolio(params) {
    return this.request("get", "/api/1/wallet/multi-portfolio", params);
  }
  async fetchDefiPositions(params) {
    return this.request("get", "/api/1/wallet/defi-positions", params);
  }
  async fetchWalletSmartMoney() {
    return this.request("get", "/api/1/wallet/smart-money");
  }
  async fetchWalletTrades(params) {
    return this.request("post", "/api/1/wallet/trades", params);
  }
  async fetchWalletTransactions(params) {
    return this.request("get", "/api/1/wallet/transactions", params);
  }
  async fetchWalletRawTransactions(params) {
    return this.request("get", "/api/1/wallet/raw-transactions", params);
  }
  async fetchWalletNFTTransactions(params) {
    return this.request("get", "/api/1/wallet/nft-transfers", params);
  }
  async fetchWalletTokensTransactions(params) {
    return this.request("get", "/api/1/wallet/token-transfers", params);
  }
  async fetchWalletLabels(params) {
    return this.request("post", "/api/1/wallet/labels", params);
  }
  async postPulseV2Pagination(params) {
    return this.request("post", "/api/2/pulse/pagination", params);
  }
  async postPulseV2DebugViews(params) {
    return this.request("post", "/api/debug/pulse/views", params);
  }
  async fetchPulseV2(params) {
    return this.request("post", "/api/2/pulse", params);
  }
  async fetchMarketDetails(params) {
    return this.request("get", "/api/2/market/details", params);
  }
  async fetchMarketDetailsBatch(params) {
    return this.request("post", "/api/2/market/details", params);
  }
  async fetchAssetDetails(params) {
    return this.request("get", "/api/2/asset/details", params);
  }
  async fetchAssetDetailsBatch(params) {
    return this.request("post", "/api/2/asset/details", params);
  }
  async fetchAssetPriceHistory(params) {
    return this.request("get", "/api/2/asset/price-history", params);
  }
  async fetchAssetPriceHistoryBatch(params) {
    return this.request("post", "/api/2/asset/price-history", params);
  }
  async fetchMarketOHLCVHistory(params) {
    return this.request("get", "/api/2/market/ohlcv-history", params);
  }
  async fetchMarketOHLCVHistoryBatch(params) {
    return this.request("post", "/api/2/market/ohlcv-history", params);
  }
  async fetchTokenOHLCVHistory(params) {
    return this.request("get", "/api/2/token/ohlcv-history", params);
  }
  async fetchTokenOHLCVHistoryBatch(params) {
    return this.request("post", "/api/2/token/ohlcv-history", params);
  }
  async fetchTokenTraderPositions(params) {
    return this.request("get", "/api/2/token/trader-positions", params);
  }
  async fetchTokenHolderPositions(params) {
    return this.request("post", "/api/2/token/holder-positions", params);
  }
  async fetchTokenDetails(params) {
    return this.request("get", "/api/2/token/details", params);
  }
  async fetchTokenDetailsBatch(params) {
    return this.request("post", "/api/2/token/details", params);
  }
  async fetchMultiTokenTrades(params) {
    return this.request("post", "/api/2/token/trades", params);
  }
  async fetchTokenTrade(params) {
    return this.request("get", "/api/2/token/trade", params);
  }
  async fetchTokenTrades(params) {
    const { formatted = false, ...rest } = params;
    const response = await this.request("get", "/api/2/token/trades", rest);
    if (!Array.isArray(response.data)) {
      throw new Error("Invalid API response: expected array of trades");
    }
    if (!formatted) {
      return response;
    }
    const formattedData = response.data.map((trade) => ({
      labels: trade.labels,
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
      tokenAmountRawVs: trade.quoteTokenAmountRaw
    }));
    return { data: formattedData };
  }
  async fetchTokenMarkets(params) {
    return this.request("get", "/api/2/token/markets", params);
  }
  async fetchWalletActivity(params) {
    return this.request("get", "/api/2/wallet/activity", params);
  }
  async fetchWalletDeployer(params) {
    return this.request("get", "/api/2/wallet/deployer", params);
  }
  async fetchWalletAnalysis(params) {
    return this.request("get", "/api/2/wallet/analysis", params);
  }
  async fetchWalletPositions(params) {
    return this.request("get", "/api/2/wallet/positions", params);
  }
  async fetchWalletPosition(params) {
    return this.request("get", "/api/2/wallet/position", params);
  }
  async fetchWalletPositionBatch(params) {
    return this.request("post", "/api/2/wallet/position", params);
  }
  async fetchSystemMetadata() {
    return this.request("get", "/api/1/system-metadata");
  }
  async fetchSwapQuote(params) {
    return this.request("get", "/api/2/swap/quoting", params);
  }
  async fetchSwapTransaction(params) {
    return this.request("post", "/api/2/swap/send", params);
  }
  async fetchTokenSecurity(params) {
    return this.request("get", "/api/2/token/security", params);
  }
  async fetchTokenKlineBsPoint(params) {
    return this.request("get", "/api/2/token/kline-bs-point", params);
  }
  async fetchWalletFunding(params) {
    return this.request("get", "/api/2/wallet/funding", params);
  }
  async fetchWalletTokenBalances(params) {
    return this.request("get", "/api/2/wallet/token-balances", params);
  }
  async createWebhook(params) {
    return this.request("post", "/api/1/webhook", params);
  }
  async updateWebhook(params) {
    return this.request("patch", "/api/1/webhook", params);
  }
  async listWebhooks(params) {
    return this.request("get", "/api/1/webhook", params);
  }
  async deleteWebhook(params) {
    return this.request("delete", `/api/1/webhook/${params.id}`, undefined);
  }
  async fetchTokenPrice(params) {
    return this.request("get", "/api/2/token/price", params);
  }
  async fetchTokenPriceBatch(params) {
    return this.request("post", "/api/2/token/price", params);
  }
  async fetchWalletDefiPositionsV2(params) {
    return this.request("get", "/api/2/wallet/defi-positions", params);
  }
  async fetchSwapQuotingInstructions(params) {
    return this.request("get", "/api/2/swap/quoting-instructions", params);
  }
}

// src/wss/client.ts
var import_crypto_js = require("crypto-js");
var import_eventemitter3 = require("eventemitter3");
var import_isomorphic_ws = __toESM(require("isomorphic-ws"));
function generatePayloadHash(payload, clientApiKey) {
  const normalizedPayload = JSON.stringify({ payload, clientApiKey });
  return import_crypto_js.SHA256(normalizedPayload).toString();
}
var DEFAULT_URLS = {
  funding: "wss://api.mobula.io",
  market: "wss://api.mobula.io",
  pair: "wss://api.mobula.io",
  "market-details": "wss://api.mobula.io",
  "token-details": "wss://api.mobula.io",
  trade: "wss://api.mobula.io",
  "fast-trade": "wss://api.mobula.io",
  ohlcv: "wss://production-api.mobula.io",
  holders: "wss://explorer-api.mobula.io",
  "pulse-v2": "wss://pulse-v2-api.mobula.io",
  "pulse-v2-pause": "wss://pulse-v2-api.mobula.io",
  "stream-evm": "wss://stream-evm-prod.mobula.io/",
  "stream-svm": "wss://stream-sol-prod.mobula.io/",
  feed: "wss://production-feed.mobula.io",
  position: "wss://api.mobula.io"
};
var SERVER_TYPE_MAP = {
  funding: "funding",
  market: "market",
  pair: "pair",
  "market-details": "market-details",
  "token-details": "token-details",
  trade: "trade",
  "fast-trade": "fast-trade",
  ohlcv: "ohlcv",
  holders: "holders",
  "pulse-v2": "pulse-v2",
  "pulse-v2-pause": "pulse-v2-pause",
  "stream-evm": "stream",
  "stream-svm": "stream",
  feed: "feed",
  position: "position"
};

class StreamClient extends import_eventemitter3.EventEmitter {
  apiKey;
  debug;
  wsMap = {};
  activeSubs = new Map;
  pendingQueue = new Map;
  subscriptionPayloads = new Map;
  reconnectAttempts = new Map;
  customUrls;
  constructor(options) {
    super();
    this.apiKey = options.apiKey || "";
    this.debug = options.debug || false;
    this.customUrls = options.wsUrlMap;
  }
  subscribe(type, payload, callback) {
    const url = this.customUrls?.[type] || DEFAULT_URLS[type];
    const subId = payload.subscriptionId ?? this.generateDeterministicSubscriptionId(payload);
    payload.subscriptionId = subId;
    const subscriptionKey = this.buildSubscriptionKey(type, subId);
    if (callback)
      this.activeSubs.set(subscriptionKey, callback);
    this.subscriptionPayloads.set(subscriptionKey, { type, payload });
    if (!this.wsMap[type] || this.wsMap[type].ws.readyState !== import_isomorphic_ws.default.OPEN) {
      const queue = this.pendingQueue.get(type) ?? new Set;
      queue.add(subscriptionKey);
      this.pendingQueue.set(type, queue);
      this.initWebSocket(type, url).catch((err) => {
        if (this.debug)
          console.error(`[StreamClient] Failed to initialize WebSocket for ${type}:`, err);
      });
    } else {
      this.sendSubscriptionMessage(type, payload);
    }
    return subId;
  }
  async unsubscribe(type, subscriptionId, payload) {
    if (this.debug)
      console.log("[StreamClient] Unsubscribe called", { type, subscriptionId, payload });
    const safePayload = payload ?? {};
    const sendUnsubscribe = (t, extraPayload) => {
      const wsState = this.wsMap[t];
      const responsePayload = {
        event: "unsubscribed"
      };
      const rawSubscriptionId = typeof extraPayload["subscriptionId"] === "string" ? extraPayload["subscriptionId"] : undefined;
      if (rawSubscriptionId) {
        responsePayload.subscriptionId = rawSubscriptionId;
      }
      responsePayload.type = t;
      if (!wsState || wsState.ws.readyState !== import_isomorphic_ws.default.OPEN) {
        return Promise.resolve(responsePayload);
      }
      const extra = { ...extraPayload };
      delete extra["type"];
      delete extra["subscriptionId"];
      const message = {
        type: "unsubscribe",
        authorization: this.apiKey,
        payload: {
          type: SERVER_TYPE_MAP[t],
          ...rawSubscriptionId ? { subscriptionId: rawSubscriptionId } : {},
          ...extra,
          ...safePayload
        }
      };
      return new Promise((resolve, reject) => {
        const handler = (event) => {
          let parsed;
          try {
            const data = typeof event.data === "string" ? event.data : event.data.toString();
            parsed = JSON.parse(data);
          } catch {
            return;
          }
          if (parsed?.event === "unsubscribed" && (rawSubscriptionId ? parsed.subscriptionId === rawSubscriptionId : true) && (parsed?.type ? parsed.type === t : true)) {
            wsState.ws.removeEventListener("message", handler);
            clearTimeout(timeoutId);
            resolve(parsed);
          }
        };
        const timeoutId = setTimeout(() => {
          wsState.ws.removeEventListener("message", handler);
          reject(new Error(`Timeout waiting for unsubscribe confirmation for ${String(t)}`));
        }, 5000);
        wsState.ws.addEventListener("message", handler);
        wsState.ws.send(JSON.stringify(message));
        if (this.debug)
          console.log(`[StreamClient] Sent unsubscribe for ${t}:`, message);
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
    const targets = Object.keys(this.wsMap);
    await Promise.all(targets.map((t) => sendUnsubscribe(t, {})));
    this.activeSubs.clear();
    this.subscriptionPayloads.clear();
    this.pendingQueue.clear();
    this.reconnectAttempts.clear();
    return { event: "unsubscribed" };
  }
  close(type) {
    if (type) {
      const state = this.wsMap[type];
      if (state) {
        state.shouldReconnect = false;
        if (state.heartbeatInterval)
          clearTimeout(state.heartbeatInterval);
        state.ws.close();
        delete this.wsMap[type];
      }
      this.pendingQueue.delete(type);
      this.reconnectAttempts.delete(type);
      this.removeAllSubscriptionsForType(type);
      for (const key of Array.from(this.activeSubs.keys())) {
        if (key.startsWith(`${String(type)}:`))
          this.activeSubs.delete(key);
      }
    } else {
      for (const key of Object.keys(this.wsMap)) {
        const state = this.wsMap[key];
        if (state) {
          state.shouldReconnect = false;
          if (state.heartbeatInterval)
            clearTimeout(state.heartbeatInterval);
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
  async initWebSocket(type, url) {
    if (this.wsMap[type])
      return;
    const ws = new import_isomorphic_ws.default(url);
    const state = {
      ws,
      shouldReconnect: true,
      messageCount: 0,
      droppedCount: 0
    };
    this.wsMap[type] = state;
    const heartbeat = () => {
      if (ws.readyState === import_isomorphic_ws.default.OPEN) {
        if (typeof ws.ping === "function") {
          ws.ping();
        } else {
          ws.send(JSON.stringify({ event: "ping" }));
        }
      }
      state.heartbeatInterval = setTimeout(heartbeat, 30000);
    };
    ws.addEventListener("open", () => {
      if (this.debug)
        console.log(`[StreamClient] Connected to ${url} for ${type}`);
      this.reconnectAttempts.set(type, 0);
      this.flushSubscriptionsForType(type);
      heartbeat();
    });
    ws.addEventListener("message", (event) => {
      queueMicrotask(() => {
        let parsed;
        try {
          const data = typeof event.data === "string" ? event.data : event.data.toString();
          parsed = JSON.parse(data);
        } catch (err) {
          if (this.debug)
            console.error("[StreamClient] Failed to parse message:", event.data, err);
          return;
        }
        state.messageCount++;
        this.processMessageImmediately(type, parsed?.subscriptionId, parsed);
      });
    });
    ws.addEventListener("close", () => {
      if (this.debug) {
        console.log(`[StreamClient] Connection closed for ${type}`, {
          messageCount: state.messageCount,
          droppedCount: state.droppedCount
        });
      }
      if (state.heartbeatInterval)
        clearTimeout(state.heartbeatInterval);
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
          if (this.debug)
            console.error(`[StreamClient] Failed to reconnect WebSocket for ${type}:`, err);
        });
      }, delay);
    });
    ws.addEventListener("error", (err) => {
      if (this.debug)
        console.error(`[StreamClient] WebSocket error for ${type}:`, err);
    });
  }
  processMessageImmediately(type, subscriptionId, parsed) {
    const state = this.wsMap[type];
    if (!state)
      return;
    if (subscriptionId) {
      const cb = this.activeSubs.get(`${type}:${subscriptionId}`);
      if (cb) {
        try {
          const result = cb(parsed);
          if (result instanceof Promise) {
            result.catch((err) => {
              if (this.debug)
                console.error(`[StreamClient] Callback error for ${type}:`, err);
            });
          }
        } catch (err) {
          if (this.debug)
            console.error(`[StreamClient] Callback error for ${type}:`, err);
        }
      }
    }
    try {
      this.emit(type, parsed);
    } catch (err) {
      if (this.debug)
        console.error(`[StreamClient] Emit error for ${type}:`, err);
    }
  }
  generateDeterministicSubscriptionId(payload) {
    const hash = generatePayloadHash(payload, this.apiKey);
    return `sub_${hash.substring(0, 32)}`;
  }
  buildSubscriptionKey(type, subId) {
    return `${String(type)}:${subId}`;
  }
  sendSubscriptionMessage(type, payload) {
    const wsState = this.wsMap[type];
    if (!wsState || wsState.ws.readyState !== import_isomorphic_ws.default.OPEN)
      return;
    const message = {
      type: SERVER_TYPE_MAP[type] || type,
      authorization: this.apiKey,
      payload
    };
    wsState.ws.send(JSON.stringify(message));
    if (this.debug)
      console.log(`[StreamClient] Subscribed ${type}`, payload);
  }
  getSubscriptionKeysForType(type) {
    return Array.from(this.subscriptionPayloads.entries()).filter(([, entry]) => entry.type === type).map(([key]) => key);
  }
  flushSubscriptionsForType(type) {
    const wsState = this.wsMap[type];
    if (!wsState || wsState.ws.readyState !== import_isomorphic_ws.default.OPEN)
      return;
    const queueKeys = this.pendingQueue.get(type);
    const keysToSend = new Set(queueKeys ? Array.from(queueKeys) : []);
    for (const key of this.getSubscriptionKeysForType(type)) {
      keysToSend.add(key);
    }
    for (const key of keysToSend) {
      const entry = this.subscriptionPayloads.get(key);
      if (!entry)
        continue;
      this.sendSubscriptionMessage(entry.type, entry.payload);
    }
    this.pendingQueue.delete(type);
  }
  enqueueActiveSubscriptions(type) {
    const activeKeys = this.getSubscriptionKeysForType(type);
    if (!activeKeys.length)
      return;
    const queue = this.pendingQueue.get(type) ?? new Set;
    for (const key of activeKeys)
      queue.add(key);
    this.pendingQueue.set(type, queue);
  }
  removeSubscription(type, subscriptionId) {
    const key = this.buildSubscriptionKey(type, subscriptionId);
    this.activeSubs.delete(key);
    this.subscriptionPayloads.delete(key);
    const queue = this.pendingQueue.get(type);
    if (queue) {
      queue.delete(key);
      if (queue.size === 0)
        this.pendingQueue.delete(type);
    }
  }
  removeAllSubscriptionsForType(type) {
    for (const key of this.getSubscriptionKeysForType(type)) {
      this.subscriptionPayloads.delete(key);
      this.activeSubs.delete(key);
    }
    this.pendingQueue.delete(type);
  }
}

// src/client.ts
class MobulaClient extends RestClient {
  streams;
  constructor(options = {}) {
    super({
      apiKey: options.apiKey,
      restUrl: options.restUrl,
      timeout: options.timeout,
      debug: options.debug
    });
    this.streams = new StreamClient({
      apiKey: options.apiKey,
      wsUrl: options.wsUrl,
      wsUrlMap: options.wsUrlMap,
      debug: options.debug
    });
  }
}
// src/utils/buildExplorerUrl.ts
var buildExplorerUrl = (chain, type, hash) => {
  const chainKey = chain.trim().toLowerCase();
  const baseChainMap = {
    abstract: "https://abscan.org",
    monad: "https://mainnet-beta.monvision.io",
    "monad testnet": "https://explorer.monad-testnet.category.xyz",
    plume: "https://explorer.plumenetwork.xyz",
    alephium: "https://explorer.alephium.org",
    arbitrum: "https://arbiscan.io",
    "arbitrum nova": "https://nova.arbiscan.io",
    "arbitrum sepolia testnet": "https://sepolia.arbiscan.io",
    arthera: "https://explorer.arthera.net",
    "arthera testnet": "https://explorer-test.arthera.net",
    astar: "https://astar.subscan.io",
    aurora: "https://explorer.aurora.dev",
    "avalanche c-chain": "https://snowtrace.io",
    bahamut: "https://www.ftnscan.com",
    base: "https://basescan.org",
    "berachain bartio": "https://artio.beratrail.io",
    berachain: "https://beratrail.io",
    "bittorrent chain": "https://bttcscan.com",
    blast: "https://blastscan.io",
    "bnb smart chain (bep20)": "https://bscscan.com",
    boba: "https://bobascan.com",
    canto: "https://cantoscan.com",
    celestia: "https://celenium.io",
    "celo alfajores testnet": "https://alfajores.celoscan.io",
    celo: "https://explorer.celo.org/mainnet",
    conflux: "https://evm.confluxscan.net",
    cronos: "https://cronoscan.com",
    degen: "https://explorer.degen.tips",
    "dfk subnet": "https://subnets.avax.network/defi-kingdoms",
    ethereum: "https://etherscan.io",
    "ethereum sepolia testnet": "https://sepolia.etherscan.io",
    eos: "https://explorer.evm.eosnetwork.com",
    fantom: "https://ftmscan.com",
    graphlinq: "https://explorer.graphlinq.io",
    harmony: "https://explorer.harmony.one",
    heco: "https://www.hecoinfo.com",
    hedera: "https://hashscan.io/mainnet",
    ink: "https://explorer.inkonchain.com",
    "immutable zkevm": "https://explorer.immutable.com",
    klaytn: "https://scope.klaytn.com",
    kucoin: "https://explorer.kcc.io",
    linea: "https://lineascan.build",
    manta: "https://pacific-explorer.manta.network",
    mantle: "https://explorer.mantle.xyz",
    matchain: "https://www.matchscan.io",
    mode: "https://explorer.mode.network",
    metis: "https://andromeda-explorer.metis.io",
    moonbeam: "https://moonscan.io",
    "mega testnet": "https://megaexplorer.xyz",
    moonriver: "https://moonriver.moonscan.io",
    oasis: "https://explorer.emerald.oasis.dev",
    "oasis sapphire": "https://explorer.sapphire.oasis.io",
    okex: "https://www.oklink.com/xlayer",
    optimistic: "https://optimistic.etherscan.io",
    polygon: "https://polygonscan.com",
    "polygon zkevm": "https://zkevm.polygonscan.com",
    scroll: "https://blockscout.scroll.io",
    "secret network": "https://www.mintscan.io/secret",
    shibarium: "https://www.shibariumscan.io",
    "shimmer evm": "https://explorer.evm.shimmer.network",
    smartbch: "https://sonar.cash",
    solana: "https://solscan.io",
    starknet: "https://starkscan.co",
    sonic: "https://sonicscan.org",
    sui: "https://suiscan.xyz/mainnet",
    supra: "https://suprascan.io",
    "supra testnet": "https://testnet.suprascan.io",
    "vanar vanguard testnet": "https://explorer-vanguard.vanarchain.com",
    vanar: "https://explorer.vanarchain.com",
    velas: "https://evmexplorer.velas.com",
    wemix: "https://explorer.wemix.com",
    xdai: "https://gnosisscan.io",
    zetachain: "https://zetachain.blockscout.com",
    "zklink nova": "https://explorer.zklink.io",
    zksync: "https://zksync2-mainnet.zkscan.io",
    zora: "https://explorer.zora.energy",
    merlin: "https://scan.merlinchain.io",
    taiko: "\thttps://taikoscan.io",
    sei: "https://seistream.app",
    hyperevm: "https://purrsec.com",
    "hyperevm testnet": "https://testnet.purrsec.com",
    botanix: "https://botanixscan.io",
    "x layer": "https://web3.okx.com/explorer/x-layer",
    story: "https://www.storyscan.io",
    plasma: "https://plasmascan.to",
    bob: "https://explorer.gobob.xyz"
  };
  const baseChainIdMap = {
    "evm:2741": "https://abscan.org",
    "evm:143": "https://mainnet-beta.monvision.io",
    "evm:10143": "https://explorer.monad-testnet.category.xyz",
    "evm:98866": "https://explorer.plumenetwork.xyz",
    "alephium:0": "https://explorer.alephium.org",
    "evm:42161": "https://arbiscan.io",
    "evm:42170": "https://nova.arbiscan.io",
    "evm:421614": "https://sepolia.arbiscan.io",
    "evm:10242": "https://explorer.arthera.net",
    "evm:10243": "https://explorer-test.arthera.net",
    "evm:592": "https://astar.subscan.io",
    "evm:1313161554": "https://explorer.aurora.dev",
    "evm:43114": "https://snowtrace.io",
    "evm:5165": "https://www.ftnscan.com",
    "evm:8453": "https://basescan.org",
    "evm:80084": "https://artio.beratrail.io",
    "evm:80094": "https://beratrail.io",
    "evm:199": "https://bttcscan.com",
    "evm:81457": "https://blastscan.io",
    "evm:56": "https://bscscan.com",
    "evm:288": "https://bobascan.com",
    "evm:7700": "https://cantoscan.com",
    "cosmos:mocha-4": "https://celenium.io",
    "evm:44787": "https://alfajores.celoscan.io",
    "evm:42220": "https://explorer.celo.org/mainnet",
    "evm:1030": "https://evm.confluxscan.net",
    "evm:25": "https://cronoscan.com",
    "evm:666666666": "https://explorer.degen.tips",
    "evm:53935": "https://subnets.avax.network/defi-kingdoms",
    "evm:1": "https://etherscan.io",
    "evm:11155111": "https://sepolia.etherscan.io",
    "evm:17777": "https://explorer.evm.eosnetwork.com",
    "evm:250": "https://ftmscan.com",
    "evm:614": "https://explorer.graphlinq.io",
    "evm:1666600000": "https://explorer.harmony.one",
    "evm:128": "https://www.hecoinfo.com",
    "evm:295": "https://hashscan.io/mainnet",
    "evm:57073": "https://explorer.inkonchain.com",
    "evm:13371": "https://explorer.immutable.com",
    "evm:8217": "https://scope.klaytn.com",
    "evm:321": "https://explorer.kcc.io",
    "evm:59144": "https://lineascan.build",
    "evm:169": "https://pacific-explorer.manta.network",
    "evm:5000": "https://explorer.mantle.xyz",
    "evm:698": "https://www.matchscan.io",
    "evm:34443": "https://explorer.mode.network",
    "evm:1088": "https://andromeda-explorer.metis.io",
    "evm:1284": "https://moonscan.io",
    "evm:6342": "https://megaexplorer.xyz",
    "evm:1285": "https://moonriver.moonscan.io",
    "evm:42262": "https://explorer.emerald.oasis.dev",
    "evm:23294": "https://explorer.sapphire.oasis.io",
    "evm:66": "https://www.oklink.com/xlayer",
    "evm:10": "https://optimistic.etherscan.io",
    "evm:137": "https://polygonscan.com",
    "evm:1101": "https://zkevm.polygonscan.com",
    "evm:534352": "https://blockscout.scroll.io",
    "secret:4": "https://www.mintscan.io/secret",
    "evm:109": "https://www.shibariumscan.io",
    "evm:148": "https://explorer.evm.shimmer.network",
    "evm:10000": "https://sonar.cash",
    "solana:solana": "https://solscan.io",
    "starknet:starknet": "https://starkscan.co",
    "evm:146": "https://sonicscan.org",
    "sui:sui": "https://suiscan.xyz/mainnet",
    "supra:8": "https://suprascan.io",
    "supra:6": "https://testnet.suprascan.io",
    "evm:78600": "https://explorer-vanguard.vanarchain.com",
    "evm:2040": "https://explorer.vanarchain.com",
    "evm:106": "https://evmexplorer.velas.com",
    "evm:1111": "https://explorer.wemix.com",
    "evm:100": "https://gnosisscan.io",
    "evm:7000": "https://zetachain.blockscout.com",
    "evm:810180": "https://explorer.zklink.io",
    "evm:324": "https://zksync2-mainnet.zkscan.io",
    "evm:7777777": "https://explorer.zora.energy",
    "evm:4200": "https://scan.merlinchain.io",
    "evm:167000": "\thttps://taikoscan.io",
    "evm:1329": "https://seistream.app",
    "evm:999": "https://purrsec.com",
    "evm:998": "https://testnet.purrsec.com",
    "evm:3637": "https://botanixscan.io",
    "evm:196": "https://web3.okx.com/explorer/x-layer",
    "evm:1514": "https://www.storyscan.io",
    "evm:9745": "https://plasmascan.to",
    "evm:60808": "https://explorer.gobob.xyz"
  };
  let base = baseChainMap[chainKey] || baseChainIdMap[chainKey] || undefined;
  if (!base)
    return;
  base = base.replace(/\s+/g, "").replace(/\/+$/, "");
  const defaultPaths = {
    tx: `${base}/tx/${hash}`,
    address: `${base}/address/${hash}`,
    block: `${base}/block/${hash}`,
    token: `${base}/token/${hash}`
  };
  switch (chainKey) {
    case "solana":
      return {
        tx: `${base}/tx/${hash}`,
        address: `${base}/account/${hash}`,
        block: `${base}/block/${hash}`,
        token: `${base}/token/${hash}`
      }[type];
    case "aptos":
      return {
        tx: `${base}/txn/${hash}`,
        address: `${base}/account/${hash}`,
        block: `${base}/block/${hash}`,
        token: `${base}/token/${hash}`
      }[type];
    case "sui":
      return {
        tx: `${base}/txblock/${hash}`,
        address: `${base}/object/${hash}`,
        block: `${base}/checkpoint/${hash}`,
        token: `${base}/object/${hash}`
      }[type];
    case "ton":
      return {
        tx: `${base}/transaction/${hash}`,
        address: `${base}/address/${hash}`,
        block: `${base}/block/${hash}`,
        token: `${base}/jetton/${hash}`
      }[type];
    default:
      return defaultPaths[type];
  }
};
// src/utils/buildNativeSymbol.ts
var NATIVE_SYMBOL_MAP = {
  "evm:1": "ETH",
  "evm:2741": "ETH",
  "evm:143": "MON",
  "evm:10143": "MON",
  "evm:98866": "ETH",
  "evm:42161": "ETH",
  "evm:42170": "ETH",
  "evm:421614": "ETH",
  "evm:10242": "AA",
  "evm:10243": "AA",
  "evm:592": "ASTAR",
  "evm:1313161554": "AURORA",
  "evm:43114": "AVAX",
  "evm:5165": "FTN",
  "evm:8453": "ETH",
  "evm:80084": "BERA",
  "evm:80094": "BERA",
  "evm:199": "BTT",
  "evm:81457": "ETH",
  "evm:56": "BNB",
  "evm:288": "ETH",
  "evm:7700": "CANTO",
  "cosmos:mocha-4": "TIA",
  "evm:44787": "CELO",
  "evm:42220": "CELO",
  "evm:1030": "CFX",
  "evm:25": "CRO",
  "evm:666666666": "DEGEN",
  "evm:53935": "JEWEL",
  "evm:11155111": "ETH",
  "evm:17777": "EOS",
  "evm:250": "FTM",
  "evm:614": "GLQ",
  "evm:1666600000": "ONE",
  "evm:128": "HT",
  "evm:295": "HBAR",
  "evm:57073": "ETH",
  "evm:13371": "IMX",
  "evm:8217": "KLAY",
  "evm:321": "KCS",
  "evm:59144": "ETH",
  "evm:169": "ETH",
  "evm:5000": "MNT",
  "evm:698": "BNB",
  "evm:34443": "ETH",
  "evm:1088": "METIS",
  "evm:1284": "GLMR",
  "evm:6342": "ETH",
  "evm:1285": "MOVR",
  "evm:42262": "ROSE",
  "evm:23294": "ROSE",
  "evm:66": "OKT",
  "evm:10": "ETH",
  "evm:137": "MATIC",
  "evm:1101": "ETH",
  "evm:534352": "ETH",
  "secret:4": "SCRT",
  "evm:109": "BONE",
  "evm:148": "SMR",
  "evm:10000": "BCH",
  "solana:solana": "SOL",
  "starknet:starknet": "ETH",
  "evm:146": "S",
  "sui:sui": "SUI",
  "supra:8": "SUPRA",
  "supra:6": "SUPRA",
  "evm:78600": "VANRY",
  "evm:2040": "VANRY",
  "evm:106": "VLX",
  "evm:1111": "WEMIX",
  "evm:100": "XDAI",
  "evm:7000": "ZETA",
  "evm:810180": "ETH",
  "evm:324": "ETH",
  "evm:7777777": "ETH",
  "evm:4200": "BTC",
  "evm:167000": "ETH",
  "evm:1329": "SEI",
  "evm:999": "WHYPE",
  "evm:998": "WHYPE",
  "evm:3637": "pBTC",
  "evm:196": "OKB",
  "evm:1514": "IP",
  "evm:9745": "XPL",
  "evm:60808": "ETH"
};
function buildNativeSymbol(chainId) {
  return NATIVE_SYMBOL_MAP[chainId] ?? "";
}
// src/utils/formatter.ts
var formatCryptoPrice = (price, options = {}) => {
  const {
    currency = "USD",
    symbolPosition = "prefix",
    locale = "en-US",
    significantDigits = 3,
    showSymbol = true,
    minFractionDigits = 2,
    maxFractionDigits = 4
  } = options;
  if (price === null || price === undefined) {
    return showSymbol ? symbolPosition === "prefix" ? "$--" : `-- ${currency}` : "--";
  }
  let numPrice = price;
  if (typeof price === "string") {
    const cleanedPrice = price.replace(/[$,\s]/g, "");
    numPrice = Number.parseFloat(cleanedPrice);
  }
  if (Number.isNaN(numPrice) || !Number.isFinite(numPrice)) {
    return showSymbol ? symbolPosition === "prefix" ? "$--" : `-- ${currency}` : "--";
  }
  if (numPrice === 0) {
    const base = 0 .toLocaleString(locale, {
      minimumFractionDigits: minFractionDigits,
      maximumFractionDigits: maxFractionDigits
    });
    return showSymbol ? symbolPosition === "prefix" ? `$${base}` : `${base} ${currency}` : base;
  }
  const absPrice = Math.abs(numPrice);
  const sign = numPrice < 0 ? "-" : "";
  let formattedValue;
  if (absPrice >= 1000000000000) {
    const v = absPrice / 1000000000000;
    formattedValue = `${v.toFixed(2)}T`;
  } else if (absPrice >= 1e9) {
    const v = absPrice / 1e9;
    formattedValue = `${v.toFixed(2)}B`;
  } else if (absPrice >= 1e6) {
    const v = absPrice / 1e6;
    formattedValue = `${v.toFixed(2)}M`;
  } else if (absPrice >= 1000) {
    const v = absPrice / 1000;
    formattedValue = `${v.toFixed(2)}K`;
  } else if (absPrice < 0.01) {
    formattedValue = formatSmallNumberWithSubscript(absPrice, Math.min(significantDigits, maxFractionDigits));
  } else {
    formattedValue = absPrice.toLocaleString(locale, {
      minimumFractionDigits: minFractionDigits,
      maximumFractionDigits: maxFractionDigits
    });
  }
  if (!showSymbol)
    return `${sign}${formattedValue}`;
  const prefix = symbolPosition === "prefix" ? "$" : "";
  const suffix = symbolPosition === "suffix" ? ` ${currency}` : "";
  return `${sign}${prefix}${formattedValue}${suffix}`;
};
var formatSmallNumberWithSubscript = (price, sigFigs) => {
  if (price === 0)
    return "0.00";
  if (price < 0.00000000000000000001) {
    return price.toExponential(sigFigs - 1);
  }
  const priceStr = price.toFixed(30);
  const match = priceStr.match(/^0\.(0+)([1-9][\d]*)/);
  if (!match) {
    return price.toExponential(sigFigs - 1);
  }
  const zeros = match[1];
  const digits = match[2];
  const zeroCount = zeros.length;
  if (zeroCount > 15) {
    return price.toExponential(sigFigs - 1);
  }
  let significantPart = digits.slice(0, sigFigs);
  significantPart = significantPart.replace(/0+$/, "") || "0";
  return `0.0${toSubscript(zeroCount)}${significantPart}`;
};
var toSubscript = (num) => {
  const subscripts = ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"];
  return num.toString().split("").map((digit) => subscripts[Number.parseInt(digit, 10)] || digit).join("");
};
var formatUSD = (price) => {
  return formatCryptoPrice(price, { symbolPosition: "prefix" });
};
var formatTokenPrice = (price, symbol) => {
  return formatCryptoPrice(price, {
    currency: symbol,
    symbolPosition: "suffix"
  });
};
var formatPrecisePrice = (price, significantDigits = 5) => {
  return formatCryptoPrice(price, { significantDigits });
};
var formatPureNumber = (price, options = {}) => {
  return formatCryptoPrice(price, {
    ...options,
    showSymbol: false
  });
};
var formatPercentage = (value, options = {}) => {
  const { locale = "en-US", minFractionDigits = 2, maxFractionDigits = 2, fallback = "--%" } = options;
  const clampedMinFractionDigits = Math.max(0, Math.min(20, minFractionDigits));
  const clampedMaxFractionDigits = Math.max(0, Math.min(20, maxFractionDigits));
  const toLocaleStringOptions = {
    minimumFractionDigits: clampedMinFractionDigits,
    maximumFractionDigits: Math.max(clampedMinFractionDigits, clampedMaxFractionDigits)
  };
  if (value === null || value === undefined) {
    return fallback;
  }
  let numValue;
  if (typeof value === "string") {
    const cleanedValue = value.replace(/[$,%\s]/g, "");
    numValue = Number.parseFloat(cleanedValue);
  } else {
    numValue = value;
  }
  if (Number.isNaN(numValue) || !Number.isFinite(numValue)) {
    return fallback;
  }
  const absValue = Math.abs(numValue);
  const sign = numValue < 0 ? "-" : "";
  let formattedValue;
  if (absValue >= 1000000000000) {
    const v = absValue / 1000000000000;
    formattedValue = `${v.toLocaleString(locale, toLocaleStringOptions)}T`;
  } else if (absValue >= 1e9) {
    const v = absValue / 1e9;
    formattedValue = `${v.toLocaleString(locale, toLocaleStringOptions)}B`;
  } else if (absValue >= 1e6) {
    const v = absValue / 1e6;
    formattedValue = `${v.toLocaleString(locale, toLocaleStringOptions)}M`;
  } else if (absValue >= 1000) {
    const v = absValue / 1000;
    formattedValue = `${v.toLocaleString(locale, toLocaleStringOptions)}K`;
  } else {
    formattedValue = absValue.toLocaleString(locale, toLocaleStringOptions);
  }
  return `${sign}${formattedValue}%`;
};
// src/utils/poolTypes.ts
var PoolType;
((PoolType2) => {
  PoolType2["Aftermath"] = "Aftermath";
  PoolType2["Algebra"] = "Algebra";
  PoolType2["Atmos"] = "Atmos";
  PoolType2["Ayin"] = "ayin";
  PoolType2["Balancer"] = "balancer";
  PoolType2["CamelotV2"] = "camelot-v2";
  PoolType2["Cetus"] = "cetus";
  PoolType2["CLOB"] = "gte-spot-clob";
  PoolType2["Curve"] = "curve";
  PoolType2["Dexlyn"] = "dexlyn";
  PoolType2["Elexium"] = "elexium";
  PoolType2["Evo"] = "evo";
  PoolType2["Fourmeme"] = "fourmeme";
  PoolType2["Flap"] = "flap";
  PoolType2["Printr"] = "printr";
  PoolType2["iZiSwap"] = "iziswap";
  PoolType2["KriyaSwap"] = "kriyaswap";
  PoolType2["LiquidityBookV2_1"] = "lbv2.1";
  PoolType2["Meteora"] = "meteora";
  PoolType2["MoonshotEVM"] = "moonshot-evm";
  PoolType2["Orca"] = "orca";
  PoolType2["Pumpfun"] = "pumpfun";
  PoolType2["Pumpswap"] = "pumpswap";
  PoolType2["Raydium"] = "raydium";
  PoolType2["RaydiumCLMM"] = "raydium-clmm";
  PoolType2["RaydiumCPMM"] = "raydium-cpmm";
  PoolType2["SolidlyV3"] = "solidly-v3";
  PoolType2["StellaSwap"] = "univ3-stella";
  PoolType2["SuiSwap"] = "suiswap";
  PoolType2["Turbos"] = "turbos";
  PoolType2["UniswapV2"] = "uniswap-v2";
  PoolType2["UniswapV3"] = "uniswap-v3";
  PoolType2["UniswapV4"] = "uniswap-v4";
  PoolType2["MoonshotSOL"] = "moonshot-sol";
  PoolType2["GteBondingV1"] = "gte-bonding-v1";
  PoolType2["RaydiumLaunchlab"] = "raydium-launchlab";
  PoolType2["Boop"] = "boop";
  PoolType2["MeteoraDYN"] = "meteora-dyn";
  PoolType2["MeteoraDYN2"] = "meteora-dyn2";
  PoolType2["MeteoraDBC"] = "meteora-dbc";
  PoolType2["LiquidLaunch"] = "liquidlaunch";
  PoolType2["Mana"] = "mana";
  PoolType2["Heaven"] = "heaven";
  PoolType2["BaseMeme"] = "basememe";
  PoolType2["WenRich"] = "wenrich";
  PoolType2["GTE_PERP_CLOB"] = "gte-perp-clob";
  PoolType2["GAINS_PERP"] = "gains-perp";
})(PoolType ||= {});
// src/utils/stringUtils.ts
function safeToString(value) {
  if (value === null || value === undefined)
    return "";
  if (typeof value === "string")
    return value;
  if (typeof value === "number" || typeof value === "bigint" || typeof value === "boolean") {
    return String(value);
  }
  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
}
function truncate(input, options = {}) {
  const str = safeToString(input).trim();
  const fallback = options.fallback ?? "N/A";
  if (!str)
    return fallback;
  const { mode = "end", length, ellipsis = "..." } = options;
  const chars = Array.from(str);
  const total = chars.length;
  if (total === 0)
    return fallback;
  if (mode === "end" && total <= (length ?? 50))
    return str;
  if (mode === "middle" && total <= (length ?? 4) * 2 + ellipsis.length)
    return str;
  if (mode === "middle") {
    const visible2 = Math.max(1, length ?? 4);
    const start = chars.slice(0, visible2).join("");
    const end = chars.slice(-visible2).join("");
    return `${start}${ellipsis}${end}`;
  }
  const maxLength = Math.max(1, length ?? 50);
  const visible = chars.slice(0, maxLength).join("");
  return `${visible}${ellipsis}`;
}

//# debugId=1CD46DD754E12F3364756E2164756E21
