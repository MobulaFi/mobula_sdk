# @mobula_labs/types

Centralized TypeScript types and Zod schemas for Mobula SDK and applications.

## Overview

This package provides a comprehensive set of TypeScript types and Zod schemas for the Mobula API ecosystem. It serves as the single source of truth for type definitions across all Mobula packages and applications, ensuring type safety and consistency.

## Features

- ✅ **Type Safety**: Full TypeScript support with strict typing
- ✅ **Runtime Validation**: Zod schemas for runtime type validation
- ✅ **Dual Format Support**: Available in both ESM and CommonJS formats
- ✅ **API Versioning**: Supports both v1 and v2 API schemas
- ✅ **WebSocket Types**: Complete type definitions for WebSocket payloads
- ✅ **Utility Functions**: Helper functions and constants for common operations
- ✅ **Tree-shakeable**: Only bundle what you use
- ✅ **Zero Runtime Dependencies**: Only peer dependency is Zod

## Installation

```bash
npm install @mobula_labs/types zod
# or
bun add @mobula_labs/types zod
# or
pnpm add @mobula_labs/types zod
```

> **Note:** `zod` (^3.0.0) is a required peer dependency for runtime validation.

## Quick Start

```typescript
import { MarketDataResponseSchema, TokenDetailsResponseSchema } from '@mobula_labs/types';
import type { z } from 'zod';

// Fetch and validate market data
const response = await fetch('https://api.mobula.io/api/1/market/data?asset=bitcoin');
const data = await response.json();

// Runtime validation
const validated = MarketDataResponseSchema.parse(data);
console.log(validated.data.price);

// Type inference
type MarketData = z.infer<typeof MarketDataResponseSchema>;
```

## Usage

### Basic Import

```typescript
import { 
  AssetDetailsSchema, 
  MarketDataResponseSchema,
  TokenDetailsResponseSchema 
} from '@mobula_labs/types';
```

### Type Inference from Schemas

```typescript
import { AssetDetailsSchema } from '@mobula_labs/types';
import type { z } from 'zod';

// Infer TypeScript type from Zod schema
type AssetDetails = z.infer<typeof AssetDetailsSchema>;

// Use for validation
const result = AssetDetailsSchema.parse(apiResponse);

// Safe parsing (doesn't throw)
const safeResult = AssetDetailsSchema.safeParse(apiResponse);
if (safeResult.success) {
  console.log(safeResult.data);
} else {
  console.error(safeResult.error);
}
```

### API Version Schemas

The package exports schemas organized by API version:

#### V1 API Schemas

```typescript
import {
  // Market data
  MarketDataSchema,
  MarketHistorySchema,
  MarketPairsSchema,
  MarketSparklineSchema,
  
  // Wallet data
  WalletPortfolioSchema,
  WalletTransactionSchema,
  WalletBalanceUSDParamsSchema,
  WalletBalanceUSDResponseSchema,
  
  // Metadata
  MetadataSchema,
  MetadataTrendingsSchema,
  MetadataNewsSchema,
} from '@mobula_labs/types';
```

#### V2 API Schemas

```typescript
import {
  // Assets
  AssetDetailsSchema,
  AssetPriceHistorySchema,
  
  // Markets
  MarketDetailsSchema,
  MarketOHLCVHistorySchema,
  
  // Tokens
  TokenDetailsSchema,
  TokenSecuritySchema,
  TokenTradesSchema,
  
  // Swaps
  SwapQuotingSchema,
  SwapSendSchema,
  
  // Wallets
  WalletPositionsSchema,
  WalletTokenBalancesSchema,
} from '@mobula_labs/types';
```

### WebSocket Types

```typescript
import {
  MarketPayloadSchema,
  TokenDetailsPayloadSchema,
  BalancePayloadSchema,
  OhlcvPayloadSchema,
  PositionPayloadSchema,
  FeedSchema,
} from '@mobula_labs/types';

// Example: Validate WebSocket message
const message = await ws.receive();
const validated = MarketPayloadSchema.parse(message);
```

### Utility Functions & Constants

```typescript
import {
  bigintAbs,
  period,
  BigIntLax,
  zodUtils,
  extractZodSchemaKeys,
  extractAllZodKeys,
} from '@mobula_labs/types';

// Use bigint utilities
const absoluteValue = bigintAbs(-100n); // 100n

// Use period helpers
const timeframe = period('1d');

// Use Zod utilities
const keys = extractZodSchemaKeys(MySchema);
```

## Available Schema Categories

### Market Schemas
- `MarketDataSchema` - Current market data
- `MarketHistorySchema` - Historical market data
- `MarketPairsSchema` - Trading pairs
- `MarketSparklineSchema` - Price sparklines
- `MarketOHLCVHistorySchema` - OHLCV candle data
- `FundingRateSchema` - Perpetual funding rates

### Token Schemas
- `TokenDetailsSchema` - Token metadata and details
- `TokenSecuritySchema` - Token security analysis
- `TokenTradesSchema` - Recent trades
- `TokenMarketsSchema` - Markets listing the token
- `TokenPositionsSchema` - Token holder positions

### Wallet Schemas
- `WalletPortfolioSchema` - Portfolio overview
- `WalletBalanceUSDParamsSchema` - USD balance query parameters
- `WalletBalanceUSDResponseSchema` - USD balance response
- `WalletTransactionSchema` - Transaction history
- `WalletPositionsSchema` - Open positions
- `WalletTokenBalancesSchema` - Token balances

### Swap Schemas
- `SwapQuotingSchema` - Get swap quotes
- `SwapQuotingBatchSchema` - Batch quote requests
- `SwapSendSchema` - Execute swaps

### Metadata Schemas
- `MetadataSchema` - Asset metadata
- `MetadataCategoriesSchema` - Token categories
- `MetadataNewsSchema` - Latest news
- `MetadataTrendingsSchema` - Trending tokens

## Package Structure

```
packages/types/
├── src/
│   ├── v1/          # V1 API schemas
│   │   ├── market/
│   │   ├── metadata/
│   │   ├── wallet/
│   │   ├── token/
│   │   └── ...
│   ├── v2/          # V2 API schemas
│   │   ├── asset/
│   │   ├── market/
│   │   ├── swap/
│   │   ├── token/
│   │   └── wallet/
│   ├── wss/         # WebSocket schemas
│   │   ├── aggregated-feed/
│   │   ├── pulse/
│   │   └── stream/
│   └── utils/       # Utility functions and constants
│       ├── functions/
│       └── schemas/
├── dist/            # Built output
│   ├── esm/        # ES modules
│   ├── cjs/        # CommonJS
│   └── *.d.ts      # TypeScript declarations
└── package.json
```

## Module Formats

The package supports multiple module formats with proper exports configuration:

```typescript
// ESM (Recommended)
import { MarketDataSchema } from '@mobula_labs/types';

// CommonJS
const { MarketDataSchema } = require('@mobula_labs/types');

// TypeScript
import type { z } from 'zod';
type MarketData = z.infer<typeof MarketDataSchema>;
```

## Real-World Example

```typescript
import { 
  MarketDataResponseSchema, 
  TokenDetailsResponseSchema,
  WalletPortfolioSchema 
} from '@mobula_labs/types';
import type { z } from 'zod';

// Define types
type MarketData = z.infer<typeof MarketDataResponseSchema>;
type TokenDetails = z.infer<typeof TokenDetailsResponseSchema>;

async function getTokenInfo(address: string): Promise<TokenDetails> {
  const response = await fetch(
    `https://api.mobula.io/api/v2/token/details?address=${address}`
  );
  
  const data = await response.json();
  
  // Validate response with Zod - throws if invalid
  return TokenDetailsResponseSchema.parse(data);
}

async function getMarketPrice(asset: string): Promise<number | null> {
  const response = await fetch(
    `https://api.mobula.io/api/1/market/data?asset=${asset}`
  );
  
  const data = await response.json();
  const validated = MarketDataResponseSchema.parse(data);
  
  return validated.data.price;
}

// Error handling example
async function safeGetMarketData(asset: string) {
  try {
    const response = await fetch(
      `https://api.mobula.io/api/1/market/data?asset=${asset}`
    );
    const data = await response.json();
    
    const result = MarketDataResponseSchema.safeParse(data);
    
    if (result.success) {
      return { data: result.data, error: null };
    } else {
      return { data: null, error: result.error.errors };
    }
  } catch (error) {
    return { data: null, error: String(error) };
  }
}
```

## Development

### Build

```bash
bun run build
```

This will:
1. Clean the `dist` folder
2. Build ESM format to `dist/esm/`
3. Build CommonJS format to `dist/cjs/`
4. Generate TypeScript declaration files to `dist/`

### Type Checking

```bash
bun run typecheck
```

### Testing Exports

```bash
# Quick verification
bun -e "import('./dist/esm/index.js').then(m => console.log('Exports:', Object.keys(m).length))"
```

## Contributing

When adding new schemas:

1. Place them in the appropriate version directory (`v1/` or `v2/`)
2. Follow existing naming conventions (e.g., `*Schema.ts`)
3. Export them from `src/index.ts`
4. Ensure they use Zod for validation
5. Add JSDoc comments for better IDE support
6. Run `bun run build` and `bun run typecheck` before committing

### Schema Naming Convention

- **Schemas**: `*Schema.ts` (e.g., `MarketDataSchema.ts`)
- **Outputs**: `*Output.ts` (e.g., `SwapQuotingOutput.ts`)
- **Queries**: `*Query.ts` (e.g., `TokenSecurityQuery.ts`)
- **Payloads**: `*PayloadSchema.ts` (e.g., `MarketPayloadSchema.ts`)

## Version History

See [CHANGELOG.md](./CHANGELOG.md) for release notes and migration guides.

## Links

- **Mobula API Documentation**: https://docs.mobula.io
- **Mobula Website**: https://mobula.io
- **Repository**: https://github.com/MobulaFi/mobula-api
- **Issues**: https://github.com/MobulaFi/mobula-api/issues

## License

MIT © Mobula

---

<div align="center">
  <strong>Built with ❤️ by the Mobula team</strong>
</div>
