# @mobula_labs/sdk

Unified TypeScript SDK to access all Mobula REST and WebSocket endpoints with full type safety and real-time support.

## Features

- **Full Type Safety**: Complete TypeScript types for all endpoints and responses
- **REST API Client**: Access to all Mobula REST endpoints
- **WebSocket Support**: Real-time data streaming with automatic reconnection
- **Utility Functions**: Formatters, URL builders, and helper functions
- **Error Handling**: Custom error types with detailed error information
- **API Key Support**: Secure authentication with API keys

## Installation

This package is part of the Mobula monorepo and uses workspace dependencies. For external usage, install it via:

```bash
npm install @mobula_labs/sdk
# or
yarn add @mobula_labs/sdk
# or
pnpm add @mobula_labs/sdk
# or
bun add @mobula_labs/sdk
```

## Quick Start

### Basic Usage

```typescript
import { MobulaClient } from '@mobula_labs/sdk';

// Initialize the client
const client = new MobulaClient({
  apiKey: 'your-api-key', // Optional: Get one at https://admin.mobula.io
  debug: true, // Optional: Enable debug logging
});

// Fetch market data
const marketData = await client.fetchMarketData({
  asset: 'bitcoin',
});

console.log(marketData);
```

### Configuration Options

```typescript
interface MobulaClientOptions {
  apiKey?: string; // Your Mobula API key
  restUrl?: string; // Custom REST API URL (default: 'https://explorer-api.mobula.io')
  wsUrl?: string; // Custom WebSocket URL
  wsUrlMap?: Partial<Record<keyof SubscriptionPayload, string>>; // Custom WebSocket URLs per stream type
  timeout?: number; // Request timeout in milliseconds (default: 10000)
  debug?: boolean; // Enable debug logging (default: false)
}
```

## REST API

The SDK provides typed methods for all Mobula REST endpoints. All methods return fully typed responses.

### Market Data

```typescript
// Fetch market data for a single asset
const marketData = await client.fetchMarketData({
  asset: 'bitcoin',
});

// Fetch multiple assets
const multiData = await client.fetchMarketMultiData({
  assets: ['bitcoin', 'ethereum', 'solana'],
});

// Fetch market history
const history = await client.fetchMarketHistory({
  asset: 'bitcoin',
  interval: '1d',
  from: Math.floor(Date.now() / 1000) - 86400 * 30, // Last 30 days
  to: Math.floor(Date.now() / 1000),
});

// Fetch market pairs
const pairs = await client.fetchMarketPairs({
  asset: 'bitcoin',
});

// Fetch OHLCV data
const ohlcv = await client.fetchMarketOHLCVHistory({
  asset: 'bitcoin',
  blockchain: 'ethereum',
  pair: 'WETH/USDC',
  interval: '1h',
  from: Math.floor(Date.now() / 1000) - 86400,
  to: Math.floor(Date.now() / 1000),
});
```

### Asset Metadata

```typescript
// Fetch single asset metadata
const metadata = await client.fetchMetadata({
  asset: 'bitcoin',
});

// Fetch multiple assets metadata
const multiMetadata = await client.fetchMultiMetadata({
  assets: 'bitcoin,ethereum',
});

// Fetch system metadata
const systemMetadata = await client.fetchSystemMetadata();
```

### Token Details

```typescript
// Fetch token details
const tokenDetails = await client.fetchTokenDetails({
  asset: 'bitcoin',
  blockchain: 'ethereum',
});

// Fetch batch token details
const batchTokenDetails = await client.fetchTokenDetailsBatch({
  assets: ['bitcoin', 'ethereum'],
  blockchain: 'ethereum',
});
```

### Portfolio & Wallet

```typescript
// Fetch wallet portfolio
const portfolio = await client.fetchWalletPortfolio({
  wallet: '0xc1e42f862d202b4a0ed552c1145735ee088f6ccf',
});

// Fetch multi-portfolio
const multiPortfolio = await client.fetchMultiPortfolio({
  wallets: ['0x...', '0x...'],
});
```

### Search

```typescript
// Search for assets
const searchResults = await client.search({
  query: 'bitcoin',
});

// Universal Search
const fastSearch = await client.searchFast({
  query: 'btc',
});
```

### Swap

```typescript
// Get swap quote
const quote = await client.fetchSwapQuoting({
  chainId: 1,
  tokenIn: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
  tokenOut: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
  amount: '1000000', // 1 USDC (6 decimals)
  walletAddress: '0x...',
  slippage: 0.5, // 0.5%
});

// Execute swap
const swapResult = await client.sendSwap({
  chainId: 1,
  tokenIn: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  tokenOut: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  amount: '1000000',
  walletAddress: '0x...',
  slippage: 0.5,
  privateKey: '0x...', // Your private key
});
```

### Pulse V2

```typescript
// Fetch Pulse V2 data
const pulse = await client.fetchPulseV2({
  model: 'default',
  assetMode: true,
  chainId: ['solana:solana'],
  compressed: false,
});
```

## WebSocket / Real-time Streaming

The SDK provides a `StreamClient` accessible via `client.streams` for real-time data subscriptions.

### Available Stream Types

- `market` - Market data updates
- `pair` - Trading pair updates
- `market-details` - Detailed market information
- `token-details` - Token information updates
- `trade` - Trade updates
- `fast-trade` - Fast trade updates
- `ohlcv` - OHLCV candle updates
- `holders` - Token holder updates
- `pulse-v2` - Pulse V2 data stream
- `pulse-v2-pause` - Pause Pulse V2 stream
- `stream-evm` - EVM blockchain stream
- `stream-svm` - Solana blockchain stream
- `feed` - Feed updates
- `position` - Position updates
- `funding` - Funding rate updates

### WebSocket Examples

```typescript
// Subscribe to market data
const unsubscribe = client.streams.subscribe('market', {
  asset: 'bitcoin',
}, (data) => {
  console.log('Market update:', data);
});

// Subscribe to trades
const unsubscribeTrades = client.streams.subscribe('trade', {
  asset: 'bitcoin',
  blockchain: 'ethereum',
  pair: 'WETH/USDC',
}, (data) => {
  console.log('Trade update:', data);
});

// Subscribe to OHLCV
const unsubscribeOhlcv = client.streams.subscribe('ohlcv', {
  asset: 'bitcoin',
  blockchain: 'ethereum',
  pair: 'WETH/USDC',
  interval: '1h',
}, (data) => {
  console.log('OHLCV update:', data);
});

// Unsubscribe when done
unsubscribe();
unsubscribeTrades();
unsubscribeOhlcv();
```

### WebSocket Connection Management

The SDK automatically manages WebSocket connections:
- Automatic reconnection on connection loss
- Heartbeat mechanism to keep connections alive
- Connection pooling for multiple subscriptions
- Automatic cleanup on unsubscribe

## Error Handling

The SDK provides a custom `MobulaError` class for better error handling:

```typescript
import { MobulaClient, MobulaError } from '@mobula_labs/sdk';

try {
  const data = await client.fetchMarketData({ asset: 'bitcoin' });
} catch (err: unknown) {
  if (err instanceof MobulaError) {
    console.error('MobulaError status:', err.status);
    console.error('MobulaError data:', err.data);
    console.error('MobulaError message:', err.message);
  } else if (err instanceof Error) {
    console.error('Generic error:', err.message);
  }
}
```

## Utility Functions

The SDK exports several utility functions:

### Formatters

```typescript
import {
  formatCryptoPrice,
  formatTokenPrice,
  formatUSD,
  formatPercentage,
  formatPrecisePrice,
  formatPureNumber,
} from '@mobula_labs/sdk';

// Format crypto prices
formatCryptoPrice(1234.5678); // "$1,234.57"
formatTokenPrice(0.00012345); // "$0.000123"
formatUSD(1234.5678); // "$1,234.57"

// Format percentages
formatPercentage(0.1234); // "+12.34%"

// Format precise prices
formatPrecisePrice(1234.567890123); // "1,234.567890123"

// Format pure numbers
formatPureNumber(1234.5678); // "1,234.57"
```

### URL Builders

```typescript
import { buildExplorerUrl, buildNativeSymbol } from '@mobula_labs/sdk';

// Build explorer URL
const explorerUrl = buildExplorerUrl({
  blockchain: 'ethereum',
  address: '0x...',
});

// Build native symbol
const nativeSymbol = buildNativeSymbol('ethereum'); // "ETH"
```

### String Utils

```typescript
import { safeToString, truncate } from '@mobula_labs/sdk';

// Safe string conversion
safeToString(null); // ""
safeToString(undefined); // ""
safeToString(123); // "123"

// Truncate strings
truncate('Hello World', 5); // "Hello..."
```

### Pool Types

```typescript
import { PoolType } from '@mobula_labs/sdk';

// Use pool types in your code
const poolType = PoolType.UNISWAP_V3;
```

## Type Safety

All methods and responses are fully typed using TypeScript. The SDK uses types from `@mobula_labs/types` package, ensuring type safety across your application.

```typescript
import type { MarketDataResponse, AssetQueryParams } from '@mobula_labs/types';

// TypeScript will enforce correct parameter types
const params: AssetQueryParams = {
  asset: 'bitcoin',
};

// Response is fully typed
const response: MarketDataResponse = await client.fetchMarketData(params);
```

## Examples

Check the `examples/` directory for more detailed examples:

- `connectDefault.ts` - Basic portfolio fetching
- `connectMarket.ts` - Market data subscriptions
- `connectPosition.ts` - Position tracking
- `connectFunding.ts` - Funding rate subscriptions
- `connectSwap.ts` - Swap operations
- `connectTokenMarket.ts` - Token market data
- `connectTokenTrades.ts` - Token trade streams
- `connectPulseV2.ts` - Pulse V2 data
- `fetchMetadata.ts` - Metadata fetching
- `fetchMarketDetails.ts` - Market details
- `fetchTraderPositions.ts` - Trader positions

## Development

### Type Checking

```bash
bun run typecheck
```

### Running Examples

```bash
# Run a specific example
bun run examples/connectDefault.ts
```

## License

UNLICENSED

