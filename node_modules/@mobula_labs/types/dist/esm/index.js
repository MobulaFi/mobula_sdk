// src/misc/ApiKeysQueries.ts
var API_KEYS_QUERIES = {
  SELECT_BY_NAME_AND_OWNER: `
    SELECT key FROM misc.api_keys
    WHERE name = $1
    AND (
      ($2::text IS NULL AND organization_id IS NULL AND customer_id = $3)
      OR
      (organization_id = $2)
    )
    LIMIT 1
  `,
  INSERT: `
    INSERT INTO misc.api_keys
      (key, customer_id, organization_id, name, total_calls, metrics)
    VALUES
      ($1, $2, $3, $4, 0, $5)
  `
};
// src/utils/constants/constants.ts
var Tags;
((Tags2) => {
  Tags2["SNIPER"] = "sniper";
  Tags2["INSIDER"] = "insider";
  Tags2["BUNDLER"] = "bundler";
  Tags2["PRO_TRADER"] = "proTrader";
  Tags2["SMART_TRADER"] = "smartTrader";
  Tags2["FRESH_TRADER"] = "freshTrader";
  Tags2["DEV"] = "dev";
  Tags2["LIQUIDITY_POOL"] = "liquidityPool";
})(Tags ||= {});
var SwapType;
((SwapType2) => {
  SwapType2["REGULAR"] = "REGULAR";
  SwapType2["MEV"] = "MEV";
  SwapType2["MEV_SANDWICHED"] = "MEV_SANDWICHED";
  SwapType2["WITHDRAWAL"] = "WITHDRAWAL";
  SwapType2["DEPOSIT"] = "DEPOSIT";
  SwapType2["BOND"] = "BOND";
})(SwapType ||= {});
// src/utils/functions/bigintAbs.ts
function bigintAbs(value) {
  return value < 0n ? -value : value;
}
// src/utils/functions/period.ts
function normalizePeriod(period, defaultPeriod = "1h") {
  switch (period.toLowerCase()) {
    case "1s":
      return "1s";
    case "5s":
      return "5s";
    case "15s":
      return "15s";
    case "30s":
      return "30s";
    case "1":
    case "1m":
    case "1min":
      return "1m";
    case "5":
    case "5m":
    case "5min":
      return "5m";
    case "15":
    case "15m":
    case "15min":
      return "15m";
    case "60":
    case "1h":
      return "1h";
    case "1d":
      return "1d";
    case "1w":
      return "1w";
    case "1month":
      return "1M";
    default:
      return defaultPeriod;
  }
}
function getPeriodSeconds(period) {
  switch (period) {
    case "1s":
      return 1;
    case "5s":
      return 5;
    case "15s":
      return 15;
    case "30s":
      return 30;
    case "1m":
      return 60;
    case "5m":
      return 5 * 60;
    case "15m":
      return 15 * 60;
    case "1h":
      return 60 * 60;
    case "1d":
      return 24 * 60 * 60;
    case "1w":
      return 7 * 24 * 60 * 60;
    case "1M":
      return 30 * 24 * 60 * 60;
    default:
      throw new Error("Invalid bar value");
  }
}
function getBucketExpression(period) {
  switch (period) {
    case "1s":
      return `date_trunc('second', date)`;
    case "5s":
      return `
        date_trunc('minute', date)
        + floor(extract(second from date)::int / 5) * interval '5 second'
      `;
    case "15s":
      return `
        date_trunc('minute', date)
        + floor(extract(second from date)::int / 15) * interval '15 second'
      `;
    case "30s":
      return `
        date_trunc('minute', date)
        + floor(extract(second from date)::int / 30) * interval '30 second'
      `;
    case "1m":
      return `date_trunc('minute', date)`;
    case "5m":
      return `
        date_trunc('hour', date)
        + floor(extract(minute from date)::int / 5) * interval '5 minute'
      `;
    case "15m":
      return `
        date_trunc('hour', date)
        + floor(extract(minute from date)::int / 15) * interval '15 minute'
      `;
    case "1h":
      return `date_trunc('hour', date)`;
    case "1d":
      return `date_trunc('day', date)`;
    case "1w":
      return `date_trunc('week', date)`;
    case "1M":
      return `date_trunc('month', date)`;
    default:
      throw new Error("Invalid period value");
  }
}
// src/utils/functions/zodUtils.ts
function extractZodSchemaKeys(schema) {
  const schemaDef = schema._def;
  if (!schemaDef || typeof schemaDef !== "object" || !("typeName" in schemaDef) || schemaDef.typeName !== "ZodObject" || !("shape" in schemaDef)) {
    throw new Error("Provided schema is not a valid ZodObject schema");
  }
  const shapeFn = schemaDef.shape;
  if (typeof shapeFn !== "function") {
    throw new Error("Schema shape is not a function");
  }
  const shape = shapeFn();
  if (!shape || typeof shape !== "object") {
    throw new Error("Schema shape function did not return a valid object");
  }
  const keys = Object.keys(shape);
  return keys;
}
function getZodKeysAdvanced(schema) {
  const schemaDef = schema._def;
  if (!schemaDef || typeof schemaDef !== "object" || !("typeName" in schemaDef) || schemaDef.typeName !== "ZodObject" || !("shape" in schemaDef)) {
    return [];
  }
  const shapeFn = schemaDef.shape;
  if (typeof shapeFn !== "function") {
    return [];
  }
  const shape = shapeFn();
  if (!shape || typeof shape !== "object") {
    return [];
  }
  return Object.keys(shape);
}
function extractAllZodKeys(schema, includeNested = false) {
  const schemaDef = schema._def;
  if (!schemaDef || typeof schemaDef !== "object" || !("typeName" in schemaDef) || schemaDef.typeName !== "ZodObject" || !("shape" in schemaDef)) {
    return [];
  }
  const shapeFn = schemaDef.shape;
  if (typeof shapeFn !== "function") {
    return [];
  }
  const shape = shapeFn();
  if (!shape || typeof shape !== "object") {
    return [];
  }
  const keys = [];
  function extractKeys(obj, prefix = "") {
    for (const [key, zodType] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      keys.push(fullKey);
      if (includeNested && zodType && typeof zodType === "object" && "_def" in zodType) {
        const def = zodType._def;
        if (def && typeof def === "object" && "typeName" in def && def.typeName === "ZodObject" && "shape" in def && typeof def.shape === "function") {
          const nestedShape = def.shape();
          if (nestedShape && typeof nestedShape === "object") {
            extractKeys(nestedShape, fullKey);
          }
        }
      }
    }
  }
  extractKeys(shape);
  return keys;
}
var getZodDefaultValue = (zodType) => {
  if (!zodType || typeof zodType !== "object" || !("_def" in zodType) || !zodType._def) {
    return 0;
  }
  const def = zodType._def;
  if (def["typeName"] === "ZodDefault") {
    const defaultValue = def["defaultValue"];
    return typeof defaultValue === "function" ? defaultValue() : defaultValue;
  }
  if (def["typeName"] === "ZodNullable") {
    return null;
  }
  if (def["typeName"] === "ZodOptional") {
    return getZodDefaultValue(def["innerType"]);
  }
  if (def["typeName"] === "ZodEffects") {
    return getZodDefaultValue(def["schema"]);
  }
  switch (def["typeName"]) {
    case "ZodString":
      return "";
    case "ZodNumber":
      return 0;
    case "ZodBoolean":
      return false;
    case "ZodDate":
      return null;
    case "ZodArray":
      return [];
    case "ZodObject":
      return {};
    default:
      return 0;
  }
};
var generateDefaultFromSchema = (schema) => {
  const result = {};
  if (schema && typeof schema === "object" && "_def" in schema && schema._def && typeof schema._def === "object" && "typeName" in schema._def && schema._def.typeName === "ZodObject" && "shape" in schema._def) {
    const shapeFn = schema._def.shape;
    const shape = shapeFn();
    for (const [key, zodType] of Object.entries(shape)) {
      result[key] = getZodDefaultValue(zodType);
    }
  }
  return result;
};
var getZodSchemaKeys = (schema) => {
  if (schema && typeof schema === "object" && "_def" in schema && schema._def && typeof schema._def === "object" && "typeName" in schema._def && schema._def.typeName === "ZodObject" && "shape" in schema._def) {
    const shapeFn = schema._def.shape;
    const shape = shapeFn();
    return Object.keys(shape);
  }
  return [];
};
var generateMinimalistMapping = (schema, data) => {
  const keys = getZodSchemaKeys(schema);
  const result = {};
  for (let i = 0;i < keys.length; i++) {
    const key = keys[i];
    if (key) {
      const value = data[i] ?? null;
      result[key] = value;
    }
  }
  return result;
};
var generateAutomaticMinimalistParser = (schema, data) => {
  const keys = getZodSchemaKeys(schema);
  const result = {};
  for (let i = 0;i < keys.length; i++) {
    const key = keys[i];
    if (key) {
      const value = data[i];
      if (value === null || value === undefined) {
        result[key] = null;
      } else if (typeof value === "string") {
        if (key.includes("date") || key.includes("created") || key.includes("bonded_at")) {
          result[key] = new Date(value);
        } else {
          result[key] = value;
        }
      } else if (typeof value === "number") {
        result[key] = value;
      } else if (typeof value === "boolean") {
        result[key] = value;
      } else if (Array.isArray(value)) {
        result[key] = value;
      } else {
        result[key] = value;
      }
    }
  }
  return result;
};
// src/utils/schemas/BigIntLax.ts
import { z } from "zod";
function scientificToInteger(value) {
  const match = value.match(/^(-?)(\d+)\.?(\d*)e([+-]?)(\d+)$/i);
  if (!match) {
    return value;
  }
  try {
    const [, sign, integerPart, decimalPart, expSign, exponentStr] = match;
    const exponent = Number.parseInt(exponentStr, 10);
    if (expSign === "-") {
      return sign === "-" ? "-0" : "0";
    }
    const digits = integerPart + (decimalPart || "");
    const decimalPosition = integerPart.length;
    const newLength = decimalPosition + exponent;
    if (newLength <= 0) {
      return sign === "-" ? "-0" : "0";
    }
    if (newLength >= digits.length) {
      const zerosToAdd = newLength - digits.length;
      return sign + digits + "0".repeat(zerosToAdd);
    }
    return sign + digits.slice(0, newLength);
  } catch {
    return value;
  }
}
var BigIntLax = z.union([
  z.string().transform((v, ctx) => {
    let value;
    try {
      const normalizedValue = scientificToInteger(v);
      value = BigInt(normalizedValue);
    } catch (_) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Cannot parse to BigInt"
      });
      return z.NEVER;
    }
    return value;
  }),
  z.number().transform((v, ctx) => {
    if (!Number.isSafeInteger(v)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Number is not a safe integer"
      });
      return z.NEVER;
    }
    return BigInt(v);
  }),
  z.bigint(),
  z.null().transform(() => 0n)
]);
var BigIntLax_default = BigIntLax;
// src/utils/schemas/CurrencySchema.ts
import { z as z2 } from "zod";
var SupportedCurrency = z2.enum(["USD", "EUR", "GBP", "JPY", "CHF", "CAD", "AUD", "CNY", "KRW", "INR", "BRL"]);
var DEFAULT_CURRENCY = "USD";
var CurrenciesParamSchema = z2.string().optional().default("USD").transform((val) => {
  const currencies = val.split(",").map((c) => c.trim().toUpperCase()).filter((c) => SupportedCurrency.safeParse(c).success);
  if (!currencies.includes("USD")) {
    currencies.unshift("USD");
  }
  return [...new Set(currencies)];
});
var NON_USD_CURRENCIES = SupportedCurrency.options.filter((c) => c !== "USD");
// src/utils/schemas/EnrichedHoldersData.ts
import { z as z3 } from "zod";
var HolderSchema = z3.object({
  address: z3.string(),
  balanceRaw: BigIntLax_default,
  nativeBalanceRaw: BigIntLax_default,
  balance: z3.coerce.number(),
  nativeBalance: z3.coerce.number(),
  balanceUSD: z3.coerce.number(),
  boughtAmountRaw: BigIntLax_default,
  boughtAmount: z3.coerce.number(),
  boughtAmountUSD: z3.coerce.number(),
  soldAmount: z3.coerce.number(),
  soldAmountRaw: BigIntLax_default,
  soldAmountUSD: z3.coerce.number(),
  realizedPnlUSD: z3.coerce.number(),
  unrealizedPnlUSD: z3.coerce.number(),
  tags: z3.string().array(),
  createdAt: z3.coerce.date().nullable(),
  updatedAt: z3.coerce.date().nullable()
});
var HoldersStatsSchema = z3.object({
  holdersCount: z3.coerce.number().nullable().optional(),
  top10HoldingsPercentage: z3.coerce.number().nullable().optional(),
  top50HoldingsPercentage: z3.coerce.number().nullable().optional(),
  top100HoldingsPercentage: z3.coerce.number().nullable().optional(),
  top200HoldingsPercentage: z3.coerce.number().nullable().optional(),
  devHoldingsPercentage: z3.coerce.number().nullable().optional(),
  insidersHoldingsPercentage: z3.coerce.number().nullable().optional(),
  bundlersHoldingsPercentage: z3.coerce.number().nullable().optional(),
  snipersHoldingsPercentage: z3.coerce.number().nullable().optional(),
  proTradersHoldingsPercentage: z3.coerce.number().nullable().optional(),
  freshTradersHoldingsPercentage: z3.coerce.number().nullable().optional(),
  smartTradersHoldingsPercentage: z3.coerce.number().nullable().optional(),
  insidersCount: z3.coerce.number().nullable().optional(),
  bundlersCount: z3.coerce.number().nullable().optional(),
  snipersCount: z3.coerce.number().nullable().optional(),
  freshTradersCount: z3.coerce.number().nullable().optional(),
  proTradersCount: z3.coerce.number().nullable().optional(),
  smartTradersCount: z3.coerce.number().nullable().optional(),
  freshTradersBuys: z3.coerce.number().nullable().optional(),
  proTradersBuys: z3.coerce.number().nullable().optional(),
  smartTradersBuys: z3.coerce.number().nullable().optional()
});
var HoldersStreamNewTokenPayload = HoldersStatsSchema.extend({
  holders: z3.array(HolderSchema)
});
// src/utils/schemas/EnrichedMarketData.ts
import { z as z5 } from "zod";

// src/utils/schemas/SecuritySchemas.ts
import { z as z4 } from "zod";
var EVMSecurityFlagsSchema = z4.object({
  buyTax: z4.string().optional(),
  sellTax: z4.string().optional(),
  transferPausable: z4.boolean().optional(),
  top10Holders: z4.string().optional(),
  isBlacklisted: z4.boolean().optional(),
  isHoneypot: z4.boolean().optional(),
  isNotOpenSource: z4.boolean().optional(),
  renounced: z4.boolean().optional(),
  locked: z4.string().optional(),
  isWhitelisted: z4.boolean().optional(),
  balanceMutable: z4.boolean().optional(),
  lowLiquidity: z4.string().optional(),
  burnRate: z4.string().optional(),
  isMintable: z4.boolean().optional(),
  modifyableTax: z4.boolean().optional(),
  selfDestruct: z4.boolean().optional()
});
var SolanaSecurityFlagsSchema = z4.object({
  buyTax: z4.string().optional(),
  sellTax: z4.string().optional(),
  transferPausable: z4.boolean().optional(),
  top10Holders: z4.string().optional(),
  isBlacklisted: z4.boolean().optional(),
  noMintAuthority: z4.boolean().optional(),
  balanceMutable: z4.boolean().optional(),
  lowLiquidity: z4.string().optional(),
  burnRate: z4.string().optional()
});
var SecurityFlagsSchema = SolanaSecurityFlagsSchema.merge(EVMSecurityFlagsSchema);

// src/utils/schemas/EnrichedMarketData.ts
var TokenTypeValues = ["2020", "2022"];
var TokenTypeSchema = z5.enum(TokenTypeValues).nullable().optional();
var keysToRemovePoolToPulse = {
  token0: true,
  token1: true,
  volume24h: true,
  blockchain: true,
  address: true,
  createdAt: true,
  type: true,
  baseToken: true,
  exchange: true,
  factory: true,
  quoteToken: true,
  priceToken: true,
  priceTokenString: true,
  athToken0: true,
  athToken1: true,
  atlToken0: true,
  atlToken1: true,
  athDateToken0: true,
  athDateToken1: true,
  atlDateToken0: true,
  atlDateToken1: true
};
var TOKEN_METADATA_KEYS = [
  "twitter",
  "telegram",
  "website",
  "others",
  "security",
  "logo",
  "twitterRenameCount",
  "twitterRenameHistory",
  "dexscreenerListed",
  "dexscreenerHeader",
  "dexscreenerAdPaid",
  "liveStatus",
  "liveThumbnail",
  "livestreamTitle",
  "liveReplyCount",
  "deployer",
  "bonded_at",
  "description"
];
var TokenData = z5.object({
  address: z5.string(),
  chainId: z5.string(),
  symbol: z5.string().nullable(),
  name: z5.string().nullable(),
  decimals: z5.coerce.number().default(0),
  id: z5.number().nullable().optional().default(null),
  price: z5.coerce.number().default(0),
  priceToken: z5.coerce.number().default(0),
  priceTokenString: z5.string(),
  approximateReserveUSD: z5.coerce.number().default(0),
  approximateReserveTokenRaw: z5.string(),
  approximateReserveToken: z5.coerce.number().default(0),
  totalSupply: z5.coerce.number().default(0),
  circulatingSupply: z5.coerce.number().default(0),
  marketCap: z5.coerce.number().optional().default(0),
  marketCapDiluted: z5.coerce.number().optional().default(0),
  logo: z5.string().nullable(),
  exchange: z5.object({
    name: z5.string(),
    logo: z5.string()
  }).optional(),
  factory: z5.string().nullable().optional(),
  source: z5.string().nullable().optional(),
  sourceFactory: z5.string().nullable().optional(),
  liquidity: z5.coerce.number().optional(),
  liquidityMax: z5.coerce.number().optional(),
  bonded: z5.boolean().optional(),
  bondingPercentage: z5.coerce.number().optional(),
  bondingCurveAddress: z5.string().nullable().optional(),
  preBondingFactory: z5.string().optional(),
  poolAddress: z5.string().optional(),
  blockchain: z5.string().optional(),
  type: z5.string().optional(),
  tokenType: TokenTypeSchema,
  deployer: z5.string().nullable().optional(),
  createdAt: z5.string().optional(),
  bonded_at: z5.coerce.date().nullable(),
  ath: z5.coerce.number().optional(),
  atl: z5.coerce.number().optional(),
  athDate: z5.coerce.date().optional(),
  atlDate: z5.coerce.date().optional()
}).merge(HoldersStatsSchema);
var keysToKeepInPulseToken = new Set([
  "bonded_at"
]);
var allTokenDataKeys = extractAllZodKeys(TokenData);
var keysToRemoveTokenToPulse = allTokenDataKeys.filter((key) => !keysToKeepInPulseToken.has(key)).reduce((acc, key) => {
  acc[key] = true;
  return acc;
}, {});
var PoolData = z5.object({
  token0: TokenData,
  token1: TokenData,
  volume24h: z5.coerce.number().default(0),
  liquidity: z5.coerce.number().default(0),
  blockchain: z5.string(),
  address: z5.string(),
  createdAt: z5.coerce.date().nullable(),
  type: z5.string(),
  baseToken: z5.string(),
  exchange: z5.object({
    name: z5.string(),
    logo: z5.string()
  }),
  factory: z5.string().nullable(),
  quoteToken: z5.string(),
  price: z5.coerce.number().optional(),
  priceToken: z5.coerce.number().optional(),
  priceTokenString: z5.string().optional(),
  athToken0: z5.coerce.number().default(0),
  athToken1: z5.coerce.number().default(0),
  atlToken0: z5.coerce.number().default(0),
  atlToken1: z5.coerce.number().default(0),
  athDateToken0: z5.coerce.date().optional(),
  athDateToken1: z5.coerce.date().optional(),
  atlDateToken0: z5.coerce.date().optional(),
  atlDateToken1: z5.coerce.date().optional(),
  bonded: z5.coerce.boolean(),
  bondingPercentage: z5.coerce.number().nullable(),
  bondingCurveAddress: z5.string().nullable(),
  sourceFactory: z5.string().nullable().optional(),
  totalFeesPaidUSD: z5.coerce.number().optional(),
  totalFeesPaidNativeRaw: z5.coerce.bigint().default(0n),
  extraData: z5.record(z5.any()).optional()
});
var poolDataKeys = extractAllZodKeys(PoolData);
var tokenDataKeys = extractAllZodKeys(TokenData);
var PoolStatsSchema = z5.object({
  price_change_1min: z5.coerce.number().default(0),
  price_change_5min: z5.coerce.number().default(0),
  price_change_1h: z5.coerce.number().default(0),
  price_change_4h: z5.coerce.number().default(0),
  price_change_6h: z5.coerce.number().default(0),
  price_change_12h: z5.coerce.number().default(0),
  price_change_24h: z5.coerce.number().default(0),
  price_1min_ago: z5.coerce.number().default(0),
  price_5min_ago: z5.coerce.number().default(0),
  price_1h_ago: z5.coerce.number().default(0),
  price_4h_ago: z5.coerce.number().default(0),
  price_6h_ago: z5.coerce.number().default(0),
  price_12h_ago: z5.coerce.number().default(0),
  price_24h_ago: z5.coerce.number().default(0),
  volume_1min: z5.coerce.number().default(0),
  volume_5min: z5.coerce.number().default(0),
  volume_15min: z5.coerce.number().default(0),
  volume_1h: z5.coerce.number().default(0),
  volume_4h: z5.coerce.number().default(0),
  volume_6h: z5.coerce.number().default(0),
  volume_12h: z5.coerce.number().default(0),
  volume_24h: z5.coerce.number().default(0),
  volume_buy_1min: z5.coerce.number().default(0),
  volume_buy_5min: z5.coerce.number().default(0),
  volume_buy_15min: z5.coerce.number().default(0),
  volume_buy_1h: z5.coerce.number().default(0),
  volume_buy_4h: z5.coerce.number().default(0),
  volume_buy_6h: z5.coerce.number().default(0),
  volume_buy_12h: z5.coerce.number().default(0),
  volume_buy_24h: z5.coerce.number().default(0),
  volume_sell_1min: z5.coerce.number().default(0),
  volume_sell_5min: z5.coerce.number().default(0),
  volume_sell_15min: z5.coerce.number().default(0),
  volume_sell_1h: z5.coerce.number().default(0),
  volume_sell_4h: z5.coerce.number().default(0),
  volume_sell_6h: z5.coerce.number().default(0),
  volume_sell_12h: z5.coerce.number().default(0),
  volume_sell_24h: z5.coerce.number().default(0),
  trades_1min: z5.coerce.number().default(0),
  trades_5min: z5.coerce.number().default(0),
  trades_15min: z5.coerce.number().default(0),
  trades_1h: z5.coerce.number().default(0),
  trades_4h: z5.coerce.number().default(0),
  trades_6h: z5.coerce.number().default(0),
  trades_12h: z5.coerce.number().default(0),
  trades_24h: z5.coerce.number().default(0),
  buys_1min: z5.coerce.number().default(0),
  buys_5min: z5.coerce.number().default(0),
  buys_15min: z5.coerce.number().default(0),
  buys_1h: z5.coerce.number().default(0),
  buys_4h: z5.coerce.number().default(0),
  buys_6h: z5.coerce.number().default(0),
  buys_12h: z5.coerce.number().default(0),
  buys_24h: z5.coerce.number().default(0),
  sells_1min: z5.coerce.number().default(0),
  sells_5min: z5.coerce.number().default(0),
  sells_15min: z5.coerce.number().default(0),
  sells_1h: z5.coerce.number().default(0),
  sells_4h: z5.coerce.number().default(0),
  sells_6h: z5.coerce.number().default(0),
  sells_12h: z5.coerce.number().default(0),
  sells_24h: z5.coerce.number().default(0),
  buyers_1min: z5.coerce.number().default(0),
  buyers_5min: z5.coerce.number().default(0),
  buyers_15min: z5.coerce.number().default(0),
  buyers_1h: z5.coerce.number().default(0),
  buyers_4h: z5.coerce.number().default(0),
  buyers_6h: z5.coerce.number().default(0),
  buyers_12h: z5.coerce.number().default(0),
  buyers_24h: z5.coerce.number().default(0),
  sellers_1min: z5.coerce.number().default(0),
  sellers_5min: z5.coerce.number().default(0),
  sellers_15min: z5.coerce.number().default(0),
  sellers_1h: z5.coerce.number().default(0),
  sellers_4h: z5.coerce.number().default(0),
  sellers_6h: z5.coerce.number().default(0),
  sellers_12h: z5.coerce.number().default(0),
  sellers_24h: z5.coerce.number().default(0),
  traders_1min: z5.coerce.number().default(0),
  traders_5min: z5.coerce.number().default(0),
  traders_15min: z5.coerce.number().default(0),
  traders_1h: z5.coerce.number().default(0),
  traders_4h: z5.coerce.number().default(0),
  traders_6h: z5.coerce.number().default(0),
  traders_12h: z5.coerce.number().default(0),
  traders_24h: z5.coerce.number().default(0),
  fees_paid_1min: z5.coerce.number().default(0),
  fees_paid_5min: z5.coerce.number().default(0),
  fees_paid_15min: z5.coerce.number().default(0),
  fees_paid_1h: z5.coerce.number().default(0),
  fees_paid_4h: z5.coerce.number().default(0),
  fees_paid_6h: z5.coerce.number().default(0),
  fees_paid_12h: z5.coerce.number().default(0),
  fees_paid_24h: z5.coerce.number().default(0)
});
var EnrichedPoolDataSchema = PoolData.merge(PoolStatsSchema.merge(z5.object({
  price: z5.coerce.number().default(0),
  market_cap: z5.coerce.number().default(0),
  created_at: z5.coerce.date().nullable(),
  holders_count: z5.coerce.number().default(0),
  latest_trade_date: z5.coerce.date().nullable().default(null),
  latest_price: z5.coerce.number().default(0),
  source: z5.string().nullable(),
  deployer: z5.string().nullable(),
  tokenSymbol: z5.string().nullable(),
  tokenName: z5.string().nullable(),
  dexscreenerListed: z5.coerce.boolean().nullable(),
  deployerMigrations: z5.coerce.number().default(0),
  socials: z5.object({
    twitter: z5.string().nullable(),
    website: z5.string().nullable(),
    telegram: z5.string().nullable(),
    others: z5.record(z5.unknown()).nullable(),
    uri: z5.string().optional()
  }),
  description: z5.string().nullable(),
  security: SecurityFlagsSchema.nullable(),
  twitterReusesCount: z5.coerce.number().default(0),
  twitterRenameCount: z5.coerce.number().default(0),
  twitterRenameHistory: z5.array(z5.object({
    username: z5.string(),
    last_checked: z5.string()
  })).optional(),
  holders_list: z5.array(HolderSchema),
  totalFeesPaidUSD: z5.coerce.number().default(0),
  totalFeesPaidNativeRaw: z5.coerce.bigint().default(0n)
})).merge(HoldersStatsSchema));
var PulseEnrichedPoolDataSchema = EnrichedPoolDataSchema;
var TokenStatsSchema = z5.object({
  latest_trade_date: z5.coerce.date().nullable(),
  price_change_1min: z5.coerce.number().default(0),
  price_change_5min: z5.coerce.number().default(0),
  price_change_1h: z5.coerce.number().default(0),
  price_change_4h: z5.coerce.number().default(0),
  price_change_6h: z5.coerce.number().default(0),
  price_change_12h: z5.coerce.number().default(0),
  price_change_24h: z5.coerce.number().default(0),
  price_1min_ago: z5.coerce.number().default(0),
  price_5min_ago: z5.coerce.number().default(0),
  price_1h_ago: z5.coerce.number().default(0),
  price_4h_ago: z5.coerce.number().default(0),
  price_6h_ago: z5.coerce.number().default(0),
  price_12h_ago: z5.coerce.number().default(0),
  price_24h_ago: z5.coerce.number().default(0),
  volume_1min: z5.coerce.number().default(0),
  volume_5min: z5.coerce.number().default(0),
  volume_15min: z5.coerce.number().default(0),
  volume_1h: z5.coerce.number().default(0),
  volume_4h: z5.coerce.number().default(0),
  volume_6h: z5.coerce.number().default(0),
  volume_12h: z5.coerce.number().default(0),
  volume_24h: z5.coerce.number().default(0),
  volume_buy_1min: z5.coerce.number().default(0),
  volume_buy_5min: z5.coerce.number().default(0),
  volume_buy_15min: z5.coerce.number().default(0),
  volume_buy_1h: z5.coerce.number().default(0),
  volume_buy_4h: z5.coerce.number().default(0),
  volume_buy_6h: z5.coerce.number().default(0),
  volume_buy_12h: z5.coerce.number().default(0),
  volume_buy_24h: z5.coerce.number().default(0),
  volume_sell_1min: z5.coerce.number().default(0),
  volume_sell_5min: z5.coerce.number().default(0),
  volume_sell_15min: z5.coerce.number().default(0),
  volume_sell_1h: z5.coerce.number().default(0),
  volume_sell_4h: z5.coerce.number().default(0),
  volume_sell_6h: z5.coerce.number().default(0),
  volume_sell_12h: z5.coerce.number().default(0),
  volume_sell_24h: z5.coerce.number().default(0),
  trades_1min: z5.coerce.number().default(0),
  trades_5min: z5.coerce.number().default(0),
  trades_15min: z5.coerce.number().default(0),
  trades_1h: z5.coerce.number().default(0),
  trades_4h: z5.coerce.number().default(0),
  trades_6h: z5.coerce.number().default(0),
  trades_12h: z5.coerce.number().default(0),
  trades_24h: z5.coerce.number().default(0),
  buys_1min: z5.coerce.number().default(0),
  buys_5min: z5.coerce.number().default(0),
  buys_15min: z5.coerce.number().default(0),
  buys_1h: z5.coerce.number().default(0),
  buys_4h: z5.coerce.number().default(0),
  buys_6h: z5.coerce.number().default(0),
  buys_12h: z5.coerce.number().default(0),
  buys_24h: z5.coerce.number().default(0),
  sells_1min: z5.coerce.number().default(0),
  sells_5min: z5.coerce.number().default(0),
  sells_15min: z5.coerce.number().default(0),
  sells_1h: z5.coerce.number().default(0),
  sells_4h: z5.coerce.number().default(0),
  sells_6h: z5.coerce.number().default(0),
  sells_12h: z5.coerce.number().default(0),
  sells_24h: z5.coerce.number().default(0),
  buyers_1min: z5.coerce.number().default(0),
  buyers_5min: z5.coerce.number().default(0),
  buyers_15min: z5.coerce.number().default(0),
  buyers_1h: z5.coerce.number().default(0),
  buyers_4h: z5.coerce.number().default(0),
  buyers_6h: z5.coerce.number().default(0),
  buyers_12h: z5.coerce.number().default(0),
  buyers_24h: z5.coerce.number().default(0),
  sellers_1min: z5.coerce.number().default(0),
  sellers_5min: z5.coerce.number().default(0),
  sellers_15min: z5.coerce.number().default(0),
  sellers_1h: z5.coerce.number().default(0),
  sellers_4h: z5.coerce.number().default(0),
  sellers_6h: z5.coerce.number().default(0),
  sellers_12h: z5.coerce.number().default(0),
  sellers_24h: z5.coerce.number().default(0),
  traders_1min: z5.coerce.number().default(0),
  traders_5min: z5.coerce.number().default(0),
  traders_15min: z5.coerce.number().default(0),
  traders_1h: z5.coerce.number().default(0),
  traders_4h: z5.coerce.number().default(0),
  traders_6h: z5.coerce.number().default(0),
  traders_12h: z5.coerce.number().default(0),
  traders_24h: z5.coerce.number().default(0),
  fees_paid_1min: z5.coerce.number().default(0),
  fees_paid_5min: z5.coerce.number().default(0),
  fees_paid_15min: z5.coerce.number().default(0),
  fees_paid_1h: z5.coerce.number().default(0),
  fees_paid_4h: z5.coerce.number().default(0),
  fees_paid_6h: z5.coerce.number().default(0),
  fees_paid_12h: z5.coerce.number().default(0),
  fees_paid_24h: z5.coerce.number().default(0),
  totalFeesPaidUSD: z5.coerce.number().default(0),
  totalFeesPaidNativeRaw: z5.coerce.bigint().default(0n),
  organic_trades_1min: z5.coerce.number().default(0),
  organic_trades_5min: z5.coerce.number().default(0),
  organic_trades_15min: z5.coerce.number().default(0),
  organic_trades_1h: z5.coerce.number().default(0),
  organic_trades_4h: z5.coerce.number().default(0),
  organic_trades_6h: z5.coerce.number().default(0),
  organic_trades_12h: z5.coerce.number().default(0),
  organic_trades_24h: z5.coerce.number().default(0),
  organic_traders_1min: z5.coerce.number().default(0),
  organic_traders_5min: z5.coerce.number().default(0),
  organic_traders_15min: z5.coerce.number().default(0),
  organic_traders_1h: z5.coerce.number().default(0),
  organic_traders_4h: z5.coerce.number().default(0),
  organic_traders_6h: z5.coerce.number().default(0),
  organic_traders_12h: z5.coerce.number().default(0),
  organic_traders_24h: z5.coerce.number().default(0),
  organic_volume_1min: z5.coerce.number().default(0),
  organic_volume_5min: z5.coerce.number().default(0),
  organic_volume_15min: z5.coerce.number().default(0),
  organic_volume_1h: z5.coerce.number().default(0),
  organic_volume_4h: z5.coerce.number().default(0),
  organic_volume_6h: z5.coerce.number().default(0),
  organic_volume_12h: z5.coerce.number().default(0),
  organic_volume_24h: z5.coerce.number().default(0),
  organic_volume_buy_1min: z5.coerce.number().default(0),
  organic_volume_buy_5min: z5.coerce.number().default(0),
  organic_volume_buy_15min: z5.coerce.number().default(0),
  organic_volume_buy_1h: z5.coerce.number().default(0),
  organic_volume_buy_4h: z5.coerce.number().default(0),
  organic_volume_buy_6h: z5.coerce.number().default(0),
  organic_volume_buy_12h: z5.coerce.number().default(0),
  organic_volume_buy_24h: z5.coerce.number().default(0),
  organic_volume_sell_1min: z5.coerce.number().default(0),
  organic_volume_sell_5min: z5.coerce.number().default(0),
  organic_volume_sell_15min: z5.coerce.number().default(0),
  organic_volume_sell_1h: z5.coerce.number().default(0),
  organic_volume_sell_4h: z5.coerce.number().default(0),
  organic_volume_sell_6h: z5.coerce.number().default(0),
  organic_volume_sell_12h: z5.coerce.number().default(0),
  organic_volume_sell_24h: z5.coerce.number().default(0),
  organic_buys_1min: z5.coerce.number().default(0),
  organic_buys_5min: z5.coerce.number().default(0),
  organic_buys_15min: z5.coerce.number().default(0),
  organic_buys_1h: z5.coerce.number().default(0),
  organic_buys_4h: z5.coerce.number().default(0),
  organic_buys_6h: z5.coerce.number().default(0),
  organic_buys_12h: z5.coerce.number().default(0),
  organic_buys_24h: z5.coerce.number().default(0),
  organic_sells_1min: z5.coerce.number().default(0),
  organic_sells_5min: z5.coerce.number().default(0),
  organic_sells_15min: z5.coerce.number().default(0),
  organic_sells_1h: z5.coerce.number().default(0),
  organic_sells_4h: z5.coerce.number().default(0),
  organic_sells_6h: z5.coerce.number().default(0),
  organic_sells_12h: z5.coerce.number().default(0),
  organic_sells_24h: z5.coerce.number().default(0),
  organic_buyers_1min: z5.coerce.number().default(0),
  organic_buyers_5min: z5.coerce.number().default(0),
  organic_buyers_15min: z5.coerce.number().default(0),
  organic_buyers_1h: z5.coerce.number().default(0),
  organic_buyers_4h: z5.coerce.number().default(0),
  organic_buyers_6h: z5.coerce.number().default(0),
  organic_buyers_12h: z5.coerce.number().default(0),
  organic_buyers_24h: z5.coerce.number().default(0),
  organic_sellers_1min: z5.coerce.number().default(0),
  organic_sellers_5min: z5.coerce.number().default(0),
  organic_sellers_15min: z5.coerce.number().default(0),
  organic_sellers_1h: z5.coerce.number().default(0),
  organic_sellers_4h: z5.coerce.number().default(0),
  organic_sellers_6h: z5.coerce.number().default(0),
  organic_sellers_12h: z5.coerce.number().default(0),
  organic_sellers_24h: z5.coerce.number().default(0)
});
var EnrichedTokenDataSchema = TokenData.merge(TokenStatsSchema.merge(z5.object({
  created_at: z5.coerce.date().nullable(),
  latest_price: z5.coerce.number().default(0),
  holders_count: z5.coerce.number().default(0),
  market_cap: z5.coerce.number().default(0),
  latest_market_cap: z5.coerce.number().default(0),
  description: z5.string().nullable(),
  socials: z5.object({
    twitter: z5.string().nullable(),
    website: z5.string().nullable(),
    telegram: z5.string().nullable(),
    others: z5.record(z5.unknown()).nullable(),
    uri: z5.string().optional()
  }),
  security: SecurityFlagsSchema.nullable(),
  twitterReusesCount: z5.coerce.number().nullable().default(0),
  twitterRenameCount: z5.coerce.number().default(0),
  twitterRenameHistory: z5.array(z5.object({
    username: z5.string(),
    last_checked: z5.string()
  })).optional(),
  deployerMigrationsCount: z5.coerce.number().default(0),
  dexscreenerListed: z5.boolean().nullable().default(false),
  dexscreenerHeader: z5.string().nullable().default(null),
  dexscreenerAdPaid: z5.boolean().nullable().default(false),
  liveStatus: z5.string().nullable(),
  liveThumbnail: z5.string().nullable(),
  livestreamTitle: z5.string().nullable(),
  liveReplyCount: z5.number().nullable(),
  holders_list: z5.array(HolderSchema)
}))).merge(HoldersStatsSchema);
var PulseEnrichedTokenDataSchema = EnrichedTokenDataSchema;
// src/utils/schemas/LLMSecuritySchemas.ts
import { z as z6 } from "zod";
var LLMSecurityFlagsSchema = z6.object({
  balanceMutable: z6.boolean().optional(),
  balanceMutableReason: z6.string().optional(),
  isMintable: z6.boolean().optional(),
  isMintableReason: z6.string().optional(),
  transferPausable: z6.boolean().optional(),
  transferPausableReason: z6.string().optional(),
  isBlacklisted: z6.boolean().optional(),
  isBlacklistedReason: z6.string().optional(),
  isWhitelisted: z6.boolean().optional(),
  isWhitelistedReason: z6.string().optional(),
  modifyableTax: z6.boolean().optional(),
  modifyableTaxReason: z6.string().optional(),
  hasHiddenOwner: z6.boolean().optional(),
  hasHiddenOwnerReason: z6.string().optional(),
  canTakeBackOwnership: z6.boolean().optional(),
  canTakeBackOwnershipReason: z6.string().optional(),
  selfDestruct: z6.boolean().optional(),
  selfDestructReason: z6.string().optional(),
  hasHoneypotMechanism: z6.boolean().optional(),
  honeypotReason: z6.string().optional(),
  hasExternalCallRisk: z6.boolean().optional(),
  externalCallRiskReason: z6.string().optional(),
  analyzedAt: z6.string(),
  contractVerified: z6.boolean(),
  analysisConfidence: z6.enum(["high", "medium", "low"]),
  rawAnalysis: z6.string().optional(),
  updatedAt: z6.string().optional()
});
var SecuritySourcesSchema = z6.object({
  goplus: z6.object({
    data: z6.record(z6.unknown()).optional(),
    updatedAt: z6.string().optional()
  }).optional(),
  llm_analysis: LLMSecurityFlagsSchema.optional()
});
// src/v1/all/AllAssetSchema.ts
import { z as z7 } from "zod";
var AllAssetsParamsSchema = z7.object({
  fields: z7.string().optional().default("")
});
var AllAssetsResponseSchema = z7.object({
  data: z7.array(z7.object({
    id: z7.number(),
    name: z7.string(),
    symbol: z7.string(),
    logo: z7.string().nullable().optional(),
    price: z7.number().nullable().optional(),
    price_change_1h: z7.number().optional(),
    price_change_24h: z7.number().optional(),
    price_change_7d: z7.number().optional(),
    price_change_1m: z7.number().optional(),
    price_change_1y: z7.number().optional(),
    market_cap: z7.number().optional(),
    liquidity: z7.number().optional(),
    volume: z7.number().optional(),
    blockchains: z7.array(z7.string()).optional(),
    contracts: z7.array(z7.string()).optional(),
    decimals: z7.array(z7.number()).optional(),
    website: z7.string().nullish().optional(),
    twitter: z7.string().nullish().optional(),
    chat: z7.string().nullish().optional()
  }))
});
// src/v1/all/BlockchainSchema.ts
import { z as z8 } from "zod";
var TokenSchema = z8.object({
  name: z8.string(),
  symbol: z8.string(),
  address: z8.string(),
  type: z8.enum(["eth", "stable", "other"]),
  decimals: z8.number(),
  denom: z8.string().optional()
});
var ExtendedTokenSchema = TokenSchema.extend({
  logo: z8.string(),
  blockchain: z8.string(),
  blockchains: z8.array(z8.string()),
  contracts: z8.array(z8.string())
});
var BlockchainsResponseSchema = z8.object({
  data: z8.array(z8.object({
    name: z8.string(),
    shortName: z8.string().optional(),
    explorer: z8.string(),
    color: z8.string(),
    chainId: z8.string(),
    evmChainId: z8.number().optional(),
    cosmosChainId: z8.string().optional(),
    testnet: z8.boolean().optional(),
    multicall_contract: z8.string().optional(),
    uniswapV3Factory: z8.array(z8.string()).optional(),
    eth: TokenSchema.extend({
      logo: z8.string(),
      id: z8.number().optional()
    }).optional(),
    stable: ExtendedTokenSchema.optional(),
    routers: z8.array(z8.object({
      address: z8.string(),
      name: z8.string(),
      factory: z8.string().optional(),
      fee: z8.number().optional()
    })),
    tokens: z8.array(z8.object({
      address: z8.string(),
      name: z8.string(),
      symbol: z8.string().optional(),
      decimals: z8.number().optional(),
      type: z8.string().optional()
    })),
    supportedProtocols: z8.array(z8.string()),
    logo: z8.string(),
    coingeckoChain: z8.string().optional(),
    dexscreenerChain: z8.string().optional(),
    isLayer2: z8.boolean().optional(),
    coverage: z8.array(z8.string().optional()).optional()
  }))
});
// src/v1/market/CreateFeedSchema.ts
import { z as z9 } from "zod";
var createFeedQuery = z9.object({
  quoteId: z9.coerce.number().optional(),
  assetId: z9.coerce.number()
});
// src/v1/market/FundingRateSchema.ts
import { z as z10 } from "zod";
var FundingRateParamsSchema = z10.object({
  symbol: z10.string(),
  quote: z10.string().optional(),
  exchange: z10.string().optional().refine((val) => !val || /^[a-zA-Z0-9,-]+$/.test(val), 'Exchange must be a comma-separated string (e.g., "binance,bybit")')
});
var FundingRateResponseSchema = z10.object({
  binanceFundingRate: z10.object({
    symbol: z10.string(),
    fundingTime: z10.number(),
    fundingRate: z10.number(),
    marketPrice: z10.string(),
    epochDurationMs: z10.number()
  }).optional(),
  deribitFundingRate: z10.object({
    symbol: z10.string(),
    fundingTime: z10.number(),
    fundingRate: z10.number(),
    marketPrice: z10.number(),
    epochDurationMs: z10.number()
  }).optional(),
  bybitFundingRate: z10.object({
    symbol: z10.string(),
    fundingTime: z10.number(),
    fundingRate: z10.number(),
    epochDurationMs: z10.number()
  }).optional(),
  okxFundingRate: z10.object({
    symbol: z10.string(),
    fundingTime: z10.number(),
    fundingRate: z10.number(),
    epochDurationMs: z10.number()
  }).optional(),
  hyperliquidFundingRate: z10.union([
    z10.object({
      symbol: z10.string(),
      fundingTime: z10.number(),
      fundingRate: z10.number(),
      epochDurationMs: z10.number()
    }),
    z10.array(z10.object({
      symbol: z10.string(),
      fundingTime: z10.number(),
      fundingRate: z10.number(),
      marketPrice: z10.number().nullable().optional(),
      epochDurationMs: z10.number()
    }))
  ]).optional(),
  gateFundingRate: z10.object({
    symbol: z10.string(),
    fundingTime: z10.number(),
    fundingRate: z10.number(),
    epochDurationMs: z10.number()
  }).optional(),
  queryDetails: z10.object({
    base: z10.string(),
    quote: z10.string().nullable()
  })
});
// src/v1/market/HoldersSchema.ts
import { z as z11 } from "zod";
var MarketTokenHoldersParamsSchema = z11.object({
  blockchain: z11.string().optional(),
  asset: z11.string().optional(),
  symbol: z11.string().optional(),
  limit: z11.coerce.number().max(100).optional().default(20),
  offset: z11.coerce.number().optional().default(0),
  backfill: z11.union([z11.boolean(), z11.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val),
  includeZeroBalance: z11.union([z11.boolean(), z11.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val)
}).transform(({ blockchain, asset, symbol, limit, offset, backfill, includeZeroBalance }) => ({
  blockchain,
  asset: asset || symbol ? { name: asset, symbol } : undefined,
  limit,
  offset,
  backfill,
  includeZeroBalance
}));
var MarketTokenHoldersResponseSchema = z11.object({
  data: z11.array(z11.object({
    address: z11.string(),
    tag: z11.string(),
    amountRaw: z11.string(),
    amount: z11.number(),
    chainId: z11.string(),
    totalSupplyShare: z11.number(),
    amountUSD: z11.number()
  })),
  total_count: z11.number()
});
// src/v1/market/MarketBlockchainPairsSchema.ts
import { z as z12 } from "zod";
var dateFields = ["latest_trade_date", "created_at"];
var nonNumericPoolValues = ["type", "explicit"];
var nonNumericValues = ["source", "deployer"];
var MarketBlockchainPairsParamsSchema = z12.object({
  blockchain: z12.string().optional(),
  blockchains: z12.string().optional(),
  sortBy: z12.string().optional().default("latest_trade_date"),
  sortOrder: z12.enum(["asc", "desc"]).optional().default("desc"),
  factory: z12.string().optional(),
  limit: z12.coerce.number().max(100).optional().default(100),
  offset: z12.coerce.number().optional().default(0),
  advancedFilters: z12.string().optional().transform((val) => {
    return JSON.parse(val ?? "{}");
  }),
  filters: z12.string().optional().transform((val) => {
    return val ? val.split(",") : [];
  }).transform((filters) => {
    const whereClause = {};
    for (const filter of filters) {
      if (filter.includes(":")) {
        const [field, filterMinValue, filterMaxValue] = filter.split(":");
        if (field && nonNumericPoolValues.includes(field)) {
          if (!whereClause.pools) {
            whereClause.pools = {};
          }
          whereClause.pools[field] = {
            equals: filterMinValue === "false" ? false : filterMinValue === "true" ? true : filterMinValue
          };
        } else if (field && nonNumericValues.includes(field)) {
          whereClause[field] = {
            equals: filterMinValue
          };
        } else if (field && dateFields.includes(field)) {
          whereClause[field] = {
            gte: filterMinValue ? new Date(Number.isNaN(Number(filterMinValue)) ? filterMinValue : Number(filterMinValue)) : undefined,
            lte: filterMaxValue ? new Date(Number.isNaN(Number(filterMaxValue)) ? filterMaxValue : Number(filterMaxValue)) : undefined
          };
        } else if (field) {
          whereClause[field] = {
            gte: filterMinValue ? Number(filterMinValue) : undefined,
            lte: filterMaxValue ? Number(filterMaxValue) : undefined
          };
        }
      }
    }
    return whereClause;
  }),
  excludeBonded: z12.coerce.boolean().optional().default(false)
});
var MarketBlockchainPairsResponseSchema = z12.object({
  data: z12.array(z12.object({
    price: z12.number(),
    price_change_5min: z12.number(),
    price_change_1h: z12.number(),
    price_change_4h: z12.number(),
    price_change_6h: z12.number(),
    price_change_12h: z12.number(),
    price_change_24h: z12.number(),
    last_trade: z12.date().nullable(),
    created_at: z12.date().nullable(),
    holders_count: z12.number(),
    volume_1min: z12.number(),
    volume_5min: z12.number(),
    volume_15min: z12.number(),
    volume_1h: z12.number(),
    volume_4h: z12.number(),
    volume_6h: z12.number(),
    volume_12h: z12.number(),
    volume_24h: z12.number(),
    trades_1min: z12.number(),
    trades_5min: z12.number(),
    trades_15min: z12.number(),
    trades_1h: z12.number(),
    trades_4h: z12.number(),
    trades_6h: z12.number(),
    trades_12h: z12.number(),
    trades_24h: z12.number(),
    liquidity: z12.number(),
    pair: PoolData,
    source: z12.string().nullable(),
    deployer: z12.string().nullable()
  })),
  factories: z12.record(z12.string(), z12.any())
});
// src/v1/market/MarketBlockchainStatsSchema.ts
import { z as z13 } from "zod";
var MarketBlockchainStatsParamsSchema = z13.object({
  blockchain: z13.string(),
  factory: z13.string().optional()
});
var MarketBlockchainStatsResponseSchema = z13.object({
  data: z13.object({
    volume_history: z13.array(z13.array(z13.number())),
    volume_change_24h: z13.number(),
    volume_change_total: z13.number().nullable(),
    liquidity_history: z13.array(z13.array(z13.number())),
    liquidity_change_24h: z13.number(),
    liquidity_change_total: z13.number().nullable(),
    tokens_history: z13.array(z13.array(z13.number())),
    tokens_change_24h: z13.number(),
    tokens_change_total: z13.number().nullable()
  })
});
// src/v1/market/MarketDataSchema.ts
import { z as z14 } from "zod";
var AssetQuery = z14.object({
  blockchain: z14.string().optional(),
  asset: z14.string().optional(),
  symbol: z14.string().optional(),
  id: z14.coerce.number().optional(),
  shouldFetchPriceChange: z14.union([z14.literal("24h"), z14.coerce.boolean()]).optional().default("24h")
}).refine((data) => {
  return !!(data.id || data.asset || data.symbol);
}, {
  message: "At least one of id, asset, or symbol must be provided."
});
var Asset = z14.object({
  id: z14.number().nullable(),
  name: z14.string(),
  symbol: z14.string(),
  decimals: z14.number().nullable(),
  logo: z14.string().nullable(),
  rank: z14.number().nullable(),
  price: z14.number().nullable(),
  market_cap: z14.number(),
  market_cap_diluted: z14.number(),
  volume: z14.number().nullable(),
  volume_change_24h: z14.number().nullable(),
  volume_7d: z14.number().nullable(),
  liquidity: z14.number(),
  liquidityMax: z14.number(),
  ath: z14.number().nullable(),
  atl: z14.number().nullable(),
  off_chain_volume: z14.number().nullable(),
  is_listed: z14.boolean(),
  price_change_1h: z14.number(),
  price_change_24h: z14.number(),
  price_change_7d: z14.number(),
  price_change_1m: z14.number(),
  price_change_1y: z14.number(),
  total_supply: z14.number(),
  circulating_supply: z14.number(),
  contracts: z14.array(z14.object({
    address: z14.string(),
    blockchainId: z14.string(),
    blockchain: z14.string(),
    decimals: z14.number()
  })),
  native: z14.object({
    name: z14.string(),
    symbol: z14.string(),
    address: z14.string(),
    type: z14.string(),
    decimals: z14.number(),
    logo: z14.string()
  }).optional(),
  priceNative: z14.number().optional()
});
var MarketDataResponseSchema = z14.object({
  data: Asset
});
// src/v1/market/MarketHistoryPairSchema.ts
import { z as z16 } from "zod";

// src/utils/schemas/DateQuery.ts
import { z as z15 } from "zod";
var DateQuery = z15.union([z15.coerce.number().int().optional(), z15.coerce.date().optional()]).transform((val) => {
  if (typeof val === "undefined") {
    return val;
  }
  if (typeof val === "number") {
    return new Date(val);
  }
  if (val instanceof Date) {
    return val;
  }
  throw new Error("Invalid date");
});
var DateQuery_default = DateQuery;

// src/v1/market/MarketHistoryPairSchema.ts
var MarketHistoryPairParamsSchema = z16.object({
  blockchain: z16.string().optional(),
  asset: z16.string().optional(),
  symbol: z16.string().optional(),
  address: z16.string().optional(),
  baseToken: z16.union([z16.string(), z16.array(z16.string())]).optional(),
  from: DateQuery_default.transform((val) => val ?? 0),
  to: DateQuery_default.transform((val) => val ?? new Date),
  period: z16.string().optional().transform((val) => {
    if (val) {
      return normalizePeriod(val);
    }
    return "5m";
  }),
  amount: z16.coerce.number().optional(),
  usd: z16.union([z16.boolean(), z16.string()]).optional().default(true).transform((val) => {
    if (typeof val === "boolean")
      return val;
    if (val === "false" || val === "0")
      return false;
    return true;
  }),
  mode: z16.enum(["asset", "pool"]).optional().default("pool")
});
var MarketHistoryPairResponseSchema = z16.object({
  data: z16.array(z16.object({
    volume: z16.number(),
    open: z16.number(),
    high: z16.number(),
    low: z16.number(),
    close: z16.number(),
    time: z16.number()
  }))
});
// src/v1/market/MarketHistorySchema.ts
import { z as z17 } from "zod";
var MarketHistoryParamsSchema = z17.object({
  blockchain: z17.string().optional(),
  asset: z17.string().optional(),
  symbol: z17.string().optional(),
  period: z17.string().optional().transform((val) => {
    if (val) {
      return normalizePeriod(val);
    }
    return;
  }),
  id: z17.coerce.number().optional(),
  from: z17.coerce.number().default(0),
  to: z17.coerce.number().default(Date.now)
});
var MarketHistoryResponseSchema = z17.object({
  data: z17.object({
    price_history: z17.array(z17.array(z17.number().nullable())),
    volume_history: z17.array(z17.array(z17.number().nullable())).optional(),
    market_cap_history: z17.array(z17.array(z17.number().nullable())).optional(),
    market_cap_diluted_history: z17.array(z17.array(z17.number().nullable())).optional(),
    name: z17.string().optional(),
    symbol: z17.string().optional(),
    blockchain: z17.string().optional(),
    address: z17.string().optional()
  })
});
// src/v1/market/MarketMultiDataSchema.ts
import { z as z19 } from "zod";

// src/utils/schemas/StringOrArray.ts
import { z as z18 } from "zod";
var stringOrArray = z18.union([z18.string(), z18.array(z18.string())]).transform((value) => {
  if (typeof value === "string") {
    return value.split(",").map((item) => item.trim());
  }
  return value;
});

// src/v1/market/MarketMultiDataSchema.ts
var assetEntry = z19.object({
  type: z19.enum(["address", "name"]),
  value: z19.string()
});
var MarketMultiDataAssetParamsSchema = z19.object({
  ids: stringOrArray.optional(),
  symbols: stringOrArray.optional(),
  blockchains: stringOrArray.optional(),
  assets: z19.union([
    z19.string(),
    z19.array(assetEntry)
  ]).optional(),
  shouldFetchPriceChange: z19.union([z19.literal("24h"), z19.coerce.boolean()]).optional().default(false)
});
var Asset2 = z19.object({
  key: z19.string(),
  id: z19.number().nullable(),
  name: z19.string(),
  symbol: z19.string(),
  decimals: z19.number().nullable(),
  logo: z19.string().nullable(),
  rank: z19.number().nullable(),
  price: z19.number().nullable(),
  market_cap: z19.number(),
  market_cap_diluted: z19.number(),
  volume: z19.number(),
  volume_change_24h: z19.number(),
  volume_7d: z19.number(),
  liquidity: z19.number(),
  ath: z19.number().nullable(),
  atl: z19.number().nullable(),
  off_chain_volume: z19.number(),
  is_listed: z19.boolean(),
  price_change_1h: z19.number(),
  price_change_24h: z19.number(),
  price_change_7d: z19.number(),
  price_change_1m: z19.number(),
  price_change_1y: z19.number(),
  total_supply: z19.number(),
  circulating_supply: z19.number(),
  contracts: z19.array(z19.object({
    address: z19.string(),
    blockchainId: z19.string(),
    blockchain: z19.string(),
    decimals: z19.number()
  }))
});
var MarketMultiDataResponseSchema = z19.object({
  data: z19.record(z19.string(), Asset2),
  dataArray: z19.array(Asset2.nullable())
});
// src/v1/market/MarketMultiHistorySchema.ts
import { z as z20 } from "zod";
var MarketMultiHistoryParamsSchema = z20.object({
  assets: z20.string().optional().transform((val) => {
    if (val) {
      return val.split(",");
    }
    return [];
  }),
  period: z20.string().optional().transform((val) => {
    if (val) {
      return normalizePeriod(val);
    }
    return;
  }),
  symbols: z20.string().optional().transform((val) => {
    if (val) {
      return val.split(",");
    }
    return [];
  }),
  blockchains: z20.string().optional().transform((val) => {
    if (val) {
      return val.split(",").map((b) => b.trim()).filter((b) => b.length > 0);
    }
    return [];
  }),
  ids: z20.string().optional().transform((val) => {
    if (val) {
      return val.split(",").map((i) => Number(i));
    }
    return [];
  }),
  from: z20.string().optional(),
  froms: z20.string().optional().transform((val) => {
    if (val) {
      return val.split(",").map((v) => Number(v));
    }
    return;
  }),
  to: z20.string().optional(),
  tos: z20.string().optional().transform((val) => {
    if (val) {
      return val.split(",").map((v) => Number(v));
    }
    return;
  })
});
var MarketMultiHistoryResponseSchema = z20.object({
  data: z20.array(z20.object({
    price_history: z20.array(z20.array(z20.number().nullable())).optional(),
    volume_history: z20.array(z20.array(z20.number().nullable())).optional(),
    market_cap_history: z20.array(z20.array(z20.number().nullable())).optional(),
    market_cap_diluted_history: z20.array(z20.array(z20.number().nullable())).optional(),
    name: z20.string(),
    symbol: z20.string(),
    address: z20.string(),
    id: z20.number().nullable().optional()
  }))
});
// src/v1/market/MarketMultiPricesSchema.ts
import { z as z21 } from "zod";
var assetEntry2 = z21.object({
  type: z21.enum(["address", "name"]),
  value: z21.string()
});
var MarketMultiPricesParamsSchema = z21.object({
  blockchains: stringOrArray.optional(),
  assets: z21.union([
    z21.string(),
    z21.array(assetEntry2)
  ]).optional()
});
var MarketMultiPricesResponseSchema = z21.object({
  data: z21.record(z21.string(), z21.object({
    price: z21.number().nullable(),
    name: z21.string().nullable(),
    symbol: z21.string().nullable(),
    logo: z21.string().nullable(),
    marketCap: z21.number().nullable(),
    marketCapDiluted: z21.number().nullable(),
    liquidity: z21.number().nullable(),
    liquidityMax: z21.number().nullable()
  }))
});
// src/v1/market/MarketNftSchema.ts
import { z as z22 } from "zod";
var MarketNftParamsSchema = z22.object({
  asset: z22.string(),
  chain: z22.string()
});
var MarketNftResponseSchema = z22.object({
  data: z22.object({
    price: z22.number(),
    priceETH: z22.number()
  })
});
// src/v1/market/MarketPairSchema.ts
import { z as z23 } from "zod";
var MarketPairParamsSchema = z23.object({
  blockchain: z23.string().optional(),
  asset: z23.string().optional(),
  symbol: z23.string().optional(),
  address: z23.string().optional(),
  baseToken: z23.string().optional(),
  stats: z23.union([z23.boolean(), z23.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val),
  force: z23.coerce.boolean().optional().default(false)
});
var MarketPairResponseSchema = z23.object({
  data: EnrichedPoolDataSchema
});
// src/v1/market/MarketPairsSchema.ts
import { z as z24 } from "zod";
var MarketPairsParamsSchema = z24.object({
  limit: z24.coerce.number().max(25).default(25),
  offset: z24.string().default("0"),
  id: z24.coerce.number().optional(),
  asset: z24.string().optional(),
  symbol: z24.string().optional(),
  blockchain: z24.string().optional(),
  tokens: z24.string().optional(),
  blockchains: z24.string().optional(),
  excludeBonded: z24.coerce.boolean().optional().default(false),
  poolType: z24.string().optional()
});
var MarketPairsResponseSchema = z24.object({
  data: z24.object({
    pairs: z24.array(EnrichedPoolDataSchema),
    total_count: z24.number()
  })
});
// src/v1/market/MarketQuerySchema.ts
import { z as z25 } from "zod";
var allowedFields = [
  "price",
  "price_change_1h",
  "price_change_7d",
  "liquidity",
  "market_cap",
  "volume",
  "price_change_24h",
  "off_chain_volume"
];
var allowedFieldsToNewFormat = {
  price: "priceUSD",
  price_change_1h: "priceChange1hPercent",
  price_change_7d: "priceChange7dPercent",
  liquidity: "liquidityUSD",
  market_cap: "marketCapUSD",
  volume: "volume24hUSD",
  price_change_24h: "priceChange24hPercent",
  off_chain_volume: "offChainVolumeUSD"
};
var allowedFieldsNewFormat = [
  "priceUSD",
  "priceChange1hPercent",
  "priceChange7dPercent",
  "liquidityUSD",
  "marketCapUSD",
  "volume24hUSD",
  "priceChange24hPercent",
  "offChainVolumeUSD"
];
var allowedFieldsEnum = z25.enum(allowedFields);
var allowedFieldsNewFormatEnum = z25.enum(allowedFieldsNewFormat);
var getNewFormatField = (input) => {
  return allowedFieldsToNewFormat[input];
};
var MarketQueryParamsSchema = z25.object({
  sortBy: z25.string().optional().transform((val) => {
    if (val) {
      return getNewFormatField(allowedFieldsEnum.parse(val));
    }
    return null;
  }),
  sortOrder: z25.string().default("desc"),
  filters: z25.string().optional().transform((values) => {
    const filters = values ? values.split(",") : [];
    if (filters.length > 0) {
      const tmpSubQuery = {};
      for (const filter of filters) {
        if (filter.includes(":")) {
          const orStatements = filter.split("||");
          for (const statement of orStatements) {
            const filterPart = statement.split(":");
            if (filterPart.length === 2) {
              filterPart.push("");
            }
            const [field, min, max] = z25.tuple([
              allowedFieldsEnum,
              z25.coerce.string().default("0"),
              z25.coerce.string().default("100000000000000000")
            ]).parse(filterPart);
            if (allowedFields.includes(field)) {
              tmpSubQuery[getNewFormatField(field)] = {
                gte: min ? z25.coerce.number().parse(min) : undefined,
                lte: max ? z25.coerce.number().parse(max) : undefined
              };
            }
          }
        }
      }
      return { AND: [tmpSubQuery] };
    }
    return {};
  }),
  blockchain: z25.string().optional(),
  blockchains: z25.string().optional().transform((blockchainsString) => {
    if (!blockchainsString) {
      return [];
    }
    return blockchainsString.split(",").map((blockchain) => blockchain.trim()).filter((b) => b.length > 0);
  }),
  categories: z25.string().optional().transform((val) => {
    if (val) {
      return val.split(",");
    }
    return [];
  }),
  limit: z25.coerce.number().default(20),
  offset: z25.coerce.number().default(0)
}).transform(({ filters, sortOrder, sortBy, ...data }) => ({
  where: filters,
  orderBy: sortBy ? { [sortBy]: sortOrder } : undefined,
  ...data
}));
var MarketQueryResponseSchema = z25.array(z25.object({
  name: z25.string(),
  logo: z25.string().nullable(),
  symbol: z25.string(),
  liquidity: z25.number(),
  market_cap: z25.number(),
  volume: z25.number(),
  off_chain_volume: z25.number(),
  price: z25.number(),
  price_change_1h: z25.number(),
  price_change_24h: z25.number(),
  price_change_7d: z25.number(),
  categories: z25.array(z25.string().optional()),
  contracts: z25.array(z25.object({
    address: z25.string(),
    blockchain: z25.string(),
    blockchainId: z25.string(),
    decimals: z25.number()
  })),
  id: z25.number(),
  rank: z25.number().nullable()
}));
// src/v1/market/MarketSparklineSchema.ts
import { z as z26 } from "zod";
var MarketSparklineResponseSchema = z26.object({
  url: z26.string()
});
var MarketSparklineParamsSchema = z26.object({
  asset: z26.string().optional(),
  blockchain: z26.string().optional(),
  symbol: z26.string().optional(),
  id: z26.string().optional(),
  timeFrame: z26.string().optional().default("24h"),
  png: z26.string().optional().default("false")
});
// src/v1/market/MarketTokenVsMarketSchema.ts
import { z as z27 } from "zod";
var MarketTokenVsMarketParamsSchema = z27.object({
  tag: z27.string()
});
var selectAssetTokenVsCategory = {
  marketCapUSD: true,
  priceUSD: true,
  priceChange1hPercent: true,
  priceChange24hPercent: true,
  priceChange7dPercent: true,
  priceChange1mPercent: true,
  name: true,
  symbol: true
};
var selectCategoryTokenVsCategory = {
  id: true,
  marketCapUSD: true,
  marketCapChange24hPercent: true,
  marketCapChange7dPercent: true,
  marketCapChange1mPercent: true,
  name: true,
  volumeUSD: true
};
var MarketTokenVsMarketResponseSchema = z27.object({
  data: z27.array(z27.union([
    z27.object({
      marketCapUSD: z27.number(),
      priceUSD: z27.number().nullable(),
      priceChange1hPercent: z27.number(),
      priceChange24hPercent: z27.number(),
      priceChange7dPercent: z27.number(),
      priceChange1mPercent: z27.number(),
      name: z27.string(),
      symbol: z27.string()
    }).nullable(),
    z27.object({
      id: z27.number(),
      marketCapUSD: z27.number(),
      marketCapChange24hPercent: z27.number(),
      marketCapChange7dPercent: z27.number(),
      marketCapChange1mPercent: z27.number(),
      name: z27.string(),
      volumeUSD: z27.number()
    }).nullable()
  ]))
});
// src/v1/market/MarketTotalSchema.ts
import { z as z28 } from "zod";
var MarketTotalResponseSchema = z28.object({
  market_cap_history: z28.array(z28.tuple([z28.number(), z28.number()])),
  market_cap_change_24h: z28.string(),
  btc_dominance_history: z28.array(z28.tuple([z28.number(), z28.number()]))
});
// src/v1/market/MarketTradesPairSchema.ts
import { z as z29 } from "zod";
var allowedFields2 = ["date", "amount_usd", "token_in_amount", "token_out_amount"];
var allowedFieldsToNewFormat2 = {
  date: "date",
  amount_usd: "volumeUSD",
  token_in_amount: "amount0",
  token_out_amount: "amount1"
};
var allowedFieldsNewFormat2 = ["date", "volumeUSD", "amount0", "amount1"];
var allowedFieldsEnum2 = z29.enum(allowedFields2);
var allowedFieldsNewFormatEnum2 = z29.enum(allowedFieldsNewFormat2);
var getNewFormatField2 = (input) => {
  return allowedFieldsToNewFormat2[input];
};
var MarketTradesPairParamsSchema = z29.object({
  blockchain: z29.string().optional(),
  asset: z29.string().transform((val) => val.trim()).optional(),
  address: z29.string().optional(),
  symbol: z29.string().optional(),
  limit: z29.coerce.number().optional(),
  amount: z29.coerce.number().optional(),
  sortBy: z29.string().optional().transform((val) => {
    if (val) {
      return getNewFormatField2(allowedFieldsEnum2.parse(val));
    }
    return "date";
  }),
  sortOrder: z29.enum(["asc", "desc"]).default("desc"),
  offset: z29.coerce.number().default(0),
  mode: z29.enum(["pair", "asset"]).default("pair"),
  transactionSenderAddress: z29.string().optional()
});
var MarketTradesPairResponseSchema = z29.object({
  data: z29.array(z29.object({
    blockchain: z29.string(),
    hash: z29.string(),
    pair: z29.string(),
    date: z29.number(),
    token_price_vs: z29.number(),
    token_price: z29.number(),
    token_amount: z29.number(),
    token_amount_vs: z29.number(),
    token_amount_usd: z29.number(),
    type: z29.string(),
    sender: z29.string().nullable(),
    transaction_sender_address: z29.string().nullable(),
    token_amount_raw: z29.string(),
    token_amount_raw_vs: z29.string(),
    operation: z29.string(),
    totalFeesUSD: z29.number().nullable().optional(),
    gasFeesUSD: z29.number().nullable().optional(),
    platformFeesUSD: z29.number().nullable().optional(),
    mevFeesUSD: z29.number().nullable().optional()
  }))
});
// src/v1/metadata/MetadataCategoriesSchema.ts
import { z as z30 } from "zod";
var MetadataCategoriesResponseSchema = z30.array(z30.object({
  name: z30.string(),
  market_cap: z30.number(),
  market_cap_change_24h: z30.number(),
  market_cap_change_7d: z30.number()
}));
// src/v1/metadata/MetadataNewsSchema.ts
import { z as z31 } from "zod";
var MetadataNewsParamsSchema = z31.object({
  symbols: z31.string().transform((val, ctx) => {
    const values = val.split(",");
    if (values.length > 5) {
      ctx.addIssue({
        code: z31.ZodIssueCode.custom,
        message: "Too many symbols"
      });
    }
    return values;
  })
});
var CryptoNewsDataSchema = z31.array(z31.object({
  news_url: z31.string(),
  image_url: z31.string(),
  title: z31.string(),
  text: z31.string(),
  source_name: z31.string(),
  date: z31.string(),
  topics: z31.array(z31.string()),
  sentiment: z31.string(),
  type: z31.string(),
  tickers: z31.array(z31.string())
}));
var MetadataNewsResponseSchema = z31.object({
  data: z31.array(z31.object({
    news_url: z31.string(),
    image_url: z31.string(),
    title: z31.string(),
    text: z31.string(),
    source_name: z31.string(),
    date: z31.string(),
    topics: z31.array(z31.string()),
    sentiment: z31.string(),
    type: z31.string(),
    tickers: z31.array(z31.string())
  }))
});
// ../../node_modules/@asteasolutions/zod-to-openapi/dist/index.cjs
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s);i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function isZodType(schema, typeName) {
  var _a;
  return ((_a = schema === null || schema === undefined ? undefined : schema._def) === null || _a === undefined ? undefined : _a.typeName) === typeName;
}
function preserveMetadataFromModifier(zod, modifier) {
  const zodModifier = zod.ZodType.prototype[modifier];
  zod.ZodType.prototype[modifier] = function(...args) {
    const result = zodModifier.apply(this, args);
    result._def.openapi = this._def.openapi;
    return result;
  };
}
function extendZodWithOpenApi(zod) {
  if (typeof zod.ZodType.prototype.openapi !== "undefined") {
    return;
  }
  zod.ZodType.prototype.openapi = function(refOrOpenapi, metadata) {
    var _a, _b, _c, _d, _e, _f;
    const openapi = typeof refOrOpenapi === "string" ? metadata : refOrOpenapi;
    const _g = openapi !== null && openapi !== undefined ? openapi : {}, { param } = _g, restOfOpenApi = __rest(_g, ["param"]);
    const _internal = Object.assign(Object.assign({}, (_a = this._def.openapi) === null || _a === undefined ? undefined : _a._internal), typeof refOrOpenapi === "string" ? { refId: refOrOpenapi } : undefined);
    const resultMetadata = Object.assign(Object.assign(Object.assign({}, (_b = this._def.openapi) === null || _b === undefined ? undefined : _b.metadata), restOfOpenApi), ((_d = (_c = this._def.openapi) === null || _c === undefined ? undefined : _c.metadata) === null || _d === undefined ? undefined : _d.param) || param ? {
      param: Object.assign(Object.assign({}, (_f = (_e = this._def.openapi) === null || _e === undefined ? undefined : _e.metadata) === null || _f === undefined ? undefined : _f.param), param)
    } : undefined);
    const result = new this.constructor(Object.assign(Object.assign({}, this._def), { openapi: Object.assign(Object.assign({}, Object.keys(_internal).length > 0 ? { _internal } : undefined), Object.keys(resultMetadata).length > 0 ? { metadata: resultMetadata } : undefined) }));
    if (isZodType(this, "ZodObject")) {
      const originalExtend = this.extend;
      result.extend = function(...args) {
        var _a2, _b2, _c2, _d2, _e2, _f2, _g2;
        const extendedResult = originalExtend.apply(this, args);
        extendedResult._def.openapi = {
          _internal: {
            extendedFrom: ((_b2 = (_a2 = this._def.openapi) === null || _a2 === undefined ? undefined : _a2._internal) === null || _b2 === undefined ? undefined : _b2.refId) ? { refId: (_d2 = (_c2 = this._def.openapi) === null || _c2 === undefined ? undefined : _c2._internal) === null || _d2 === undefined ? undefined : _d2.refId, schema: this } : (_f2 = (_e2 = this._def.openapi) === null || _e2 === undefined ? undefined : _e2._internal) === null || _f2 === undefined ? undefined : _f2.extendedFrom
          },
          metadata: (_g2 = extendedResult._def.openapi) === null || _g2 === undefined ? undefined : _g2.metadata
        };
        return extendedResult;
      };
    }
    return result;
  };
  preserveMetadataFromModifier(zod, "optional");
  preserveMetadataFromModifier(zod, "nullable");
  preserveMetadataFromModifier(zod, "default");
  preserveMetadataFromModifier(zod, "transform");
  preserveMetadataFromModifier(zod, "refine");
  const zodDeepPartial = zod.ZodObject.prototype.deepPartial;
  zod.ZodObject.prototype.deepPartial = function() {
    const initialShape = this._def.shape();
    const result = zodDeepPartial.apply(this);
    const resultShape = result._def.shape();
    Object.entries(resultShape).forEach(([key, value]) => {
      var _a, _b;
      value._def.openapi = (_b = (_a = initialShape[key]) === null || _a === undefined ? undefined : _a._def) === null || _b === undefined ? undefined : _b.openapi;
    });
    result._def.openapi = undefined;
    return result;
  };
  const zodPick = zod.ZodObject.prototype.pick;
  zod.ZodObject.prototype.pick = function(...args) {
    const result = zodPick.apply(this, args);
    result._def.openapi = undefined;
    return result;
  };
  const zodOmit = zod.ZodObject.prototype.omit;
  zod.ZodObject.prototype.omit = function(...args) {
    const result = zodOmit.apply(this, args);
    result._def.openapi = undefined;
    return result;
  };
}
var $extendZodWithOpenApi = extendZodWithOpenApi;

// src/v1/metadata/MetadataSchema.ts
import { z as z32 } from "zod";
$extendZodWithOpenApi(z32);
var MetadataParamsSchema = z32.object({
  symbol: z32.string().optional(),
  id: z32.string().optional(),
  asset: z32.string().optional(),
  blockchain: z32.string().optional(),
  force: z32.coerce.boolean().optional().default(false),
  full: z32.coerce.boolean().optional().default(true)
}).strict();
var MultiMetadataParamsSchema = z32.object({
  ids: z32.string().optional(),
  assets: z32.string().optional(),
  blockchains: z32.string().optional(),
  symbols: z32.string().optional()
}).strict().transform((data) => {
  return {
    ids: data.ids ? data.ids.split(",") : undefined,
    assets: data.assets ? data.assets.split(",") : undefined,
    blockchains: data.blockchains ? data.blockchains.split(",") : undefined,
    symbols: data.symbols ? data.symbols.split(",") : undefined
  };
});
var MetadataResponseSchema = z32.object({
  data: z32.object({
    id: z32.number().nullable(),
    name: z32.string(),
    symbol: z32.string(),
    rank: z32.number().nullable().optional(),
    contracts: z32.array(z32.string()),
    blockchains: z32.array(z32.string()),
    decimals: z32.array(z32.number()),
    twitter: z32.string().nullable(),
    website: z32.string().nullable(),
    logo: z32.string().nullable(),
    price: z32.number().nullable(),
    market_cap: z32.number(),
    liquidity: z32.number(),
    volume: z32.number(),
    description: z32.string().nullable(),
    kyc: z32.string().nullable(),
    audit: z32.string().nullable(),
    total_supply_contracts: z32.array(z32.string()),
    circulating_supply_addresses: z32.array(z32.string()),
    total_supply: z32.number(),
    circulating_supply: z32.number(),
    discord: z32.string().nullable(),
    max_supply: z32.number().nullable(),
    chat: z32.string().nullable(),
    tags: z32.array(z32.string()),
    investors: z32.array(z32.object({
      lead: z32.boolean(),
      name: z32.string(),
      type: z32.string(),
      image: z32.string(),
      country_name: z32.string(),
      description: z32.string()
    })),
    distribution: z32.array(z32.object({
      percentage: z32.number(),
      name: z32.string()
    })),
    release_schedule: z32.array(z32.object({
      allocation_details: z32.record(z32.string(), z32.number()),
      tokens_to_unlock: z32.number(),
      unlock_date: z32.number()
    })),
    cexs: z32.array(z32.object({
      logo: z32.string().nullable(),
      name: z32.string().nullable(),
      id: z32.string()
    })),
    listed_at: z32.date().nullable(),
    deployer: z32.string().nullable(),
    source: z32.string().nullable(),
    others: z32.record(z32.string(), z32.unknown()).nullable().optional(),
    dexscreener_listed: z32.boolean().nullable().optional(),
    dexscreener_header: z32.string().nullable().optional(),
    dexscreener_ad_paid: z32.boolean().nullable().optional(),
    live_status: z32.string().nullable().optional(),
    live_thumbnail: z32.string().nullable().optional(),
    livestream_title: z32.string().nullable().optional(),
    live_reply_count: z32.number().nullable().optional(),
    telegram: z32.string().nullable().optional(),
    twitterRenameCount: z32.number().nullable().optional(),
    twitterRenameHistory: z32.array(z32.object({
      username: z32.string(),
      last_checked: z32.string()
    })).nullable().optional()
  })
});
var MultiMetadataResponseSchema = z32.object({
  data: z32.array(MetadataResponseSchema.optional())
});
// src/v1/metadata/MetadataTrendingsSchema.ts
import { z as z33 } from "zod";
var MetadataTrendingsParamsSchema = z33.object({
  platform: z33.string().transform((x) => x !== undefined && x !== null ? x.toLocaleLowerCase() : x),
  blockchain: z33.string().transform((x) => x !== undefined && x !== null ? x.toLocaleLowerCase() : x)
}).partial();
var MetadataTrendingsResponseSchema = z33.array(z33.object({
  name: z33.string().nullable(),
  symbol: z33.string().nullable(),
  contracts: z33.array(z33.object({
    address: z33.string(),
    blockchain: z33.string(),
    decimals: z33.number()
  }).optional()),
  price_change_24h: z33.number(),
  price: z33.number(),
  logo: z33.string().nullable(),
  trending_score: z33.number(),
  pair: z33.string().nullable(),
  platforms: z33.array(z33.object({
    name: z33.string(),
    rank: z33.number(),
    weigth: z33.number()
  }))
}));
// src/v1/metadata/SystemMetadataSchema.ts
import { z as z34 } from "zod";
var SystemMetadataResponseSchema = z34.object({
  data: z34.object({
    poolTypes: z34.array(z34.string()),
    chains: z34.array(z34.object({
      id: z34.string(),
      name: z34.string(),
      blockExplorers: z34.object({
        default: z34.object({
          name: z34.string(),
          url: z34.string(),
          apiUrl: z34.string().optional()
        })
      }).optional()
    })),
    factories: z34.array(z34.object({
      chainId: z34.string(),
      address: z34.string(),
      name: z34.string().optional(),
      ui_name: z34.string().optional(),
      logo: z34.string().optional()
    }))
  })
});
// src/v1/misc/ListingStatusSchema.ts
import { z as z35 } from "zod";
var walletSchema = z35.object({
  wallet: z35.string()
});
// src/v1/misc/SubmitTokenSchema.ts
import { z as z36 } from "zod";
var formattedJSONSchema = z36.object({
  name: z36.string(),
  symbol: z36.string(),
  type: z36.string(),
  description: z36.string(),
  categories: z36.array(z36.string()),
  completed: z36.boolean(),
  links: z36.object({
    website: z36.string(),
    twitter: z36.string(),
    telegram: z36.string(),
    discord: z36.string(),
    github: z36.string(),
    audits: z36.array(z36.string()),
    kycs: z36.array(z36.string())
  }),
  contracts: z36.array(z36.object({
    address: z36.string(),
    blockchain: z36.string(),
    blockchain_id: z36.number()
  })),
  totalSupplyContracts: z36.array(z36.object({
    address: z36.string(),
    blockchain: z36.string(),
    blockchain_id: z36.number()
  })),
  excludedFromCirculationAddresses: z36.array(z36.string()),
  tokenomics: z36.object({
    distribution: z36.array(z36.string()),
    sales: z36.array(z36.string()),
    vestingSchedule: z36.array(z36.string()),
    fees: z36.array(z36.string())
  }),
  init: z36.boolean(),
  logo: z36.string()
});
// src/v1/misc/UploadLogoSchema.ts
import { z as z37 } from "zod";
var logoUrlSchema = z37.object({
  assetName: z37.string(),
  logoUrl: z37.string()
});
// src/v1/pulse/PulseSchema.ts
import { z as z38 } from "zod";
var PulsePayloadParamsSchema = z38.object({
  model: z38.enum(["default"]).optional(),
  subscriptionId: z38.string().optional(),
  compressed: z38.coerce.boolean().optional().default(false),
  assetMode: z38.coerce.boolean().optional().default(false),
  chainId: z38.union([z38.string(), z38.array(z38.string())]).optional(),
  poolTypes: z38.union([z38.string(), z38.array(z38.string())]).optional(),
  excludeDuplicates: z38.coerce.boolean().optional().default(true),
  instanceTracking: z38.coerce.boolean().optional().default(false),
  pagination: z38.coerce.boolean().optional(),
  views: z38.array(z38.object({
    name: z38.string(),
    model: z38.enum(["new", "bonding", "bonded"]).optional(),
    chainId: z38.union([z38.string(), z38.array(z38.string())]).optional(),
    poolTypes: z38.union([z38.string(), z38.array(z38.string())]).optional(),
    token: z38.union([z38.string(), z38.record(z38.unknown())]).optional().transform((val) => {
      if (typeof val === "object" && val !== null) {
        return val;
      }
      if (typeof val === "string") {
        try {
          const parsed = JSON.parse(val);
          if (typeof parsed === "object" && parsed !== null) {
            return parsed;
          }
        } catch {
          return { address: val };
        }
      }
      return;
    }),
    assets: z38.union([z38.string(), z38.array(z38.string())]).optional(),
    sortBy: z38.string().optional(),
    sortOrder: z38.enum(["asc", "desc"]).optional(),
    limit: z38.coerce.number().max(100).optional().default(30),
    offset: z38.coerce.number().optional().default(0),
    addressToExclude: z38.union([z38.string(), z38.array(z38.string())]).optional(),
    baseTokenToExclude: z38.union([z38.string(), z38.array(z38.string())]).optional(),
    filters: z38.union([z38.string(), z38.record(z38.unknown())]).optional().transform((val) => {
      if (typeof val === "object" && val !== null) {
        return val;
      }
      if (typeof val === "string") {
        try {
          const parsed = JSON.parse(val);
          if (typeof parsed === "object" && parsed !== null) {
            return parsed;
          }
        } catch {
          const filters = val.split(",");
          const whereClause = {};
          for (const filter of filters) {
            if (filter.includes(":")) {
              const [field, filterMinValue, filterMaxValue] = filter.split(":");
              if (field && ["source", "deployer"].includes(field)) {
                whereClause[field] = {
                  equals: filterMinValue
                };
              } else if (field && ["latest_trade_date", "created_at"].includes(field)) {
                const getDateValue = (value) => {
                  if (!value || value === "null" || value === "undefined")
                    return;
                  const numValue = Number(value);
                  const date = Number.isNaN(numValue) ? new Date(value) : new Date(numValue);
                  return Number.isNaN(date.getTime()) ? undefined : date;
                };
                const gteDate = getDateValue(filterMinValue);
                const lteDate = getDateValue(filterMaxValue);
                if (gteDate || lteDate) {
                  whereClause[field] = {
                    ...gteDate && { gte: gteDate },
                    ...lteDate && { lte: lteDate }
                  };
                }
              } else if (field === "market_cap") {
                whereClause[field] = {
                  not: filterMinValue === "null" ? null : undefined,
                  gte: filterMinValue && filterMinValue !== "null" ? Number(filterMinValue) : undefined,
                  lte: filterMaxValue ? Number(filterMaxValue) : undefined
                };
              } else if (field) {
                whereClause[field] = {
                  gte: filterMinValue ? Number(filterMinValue) : undefined,
                  lte: filterMaxValue ? Number(filterMaxValue) : undefined
                };
              }
            }
          }
          return whereClause;
        }
      }
      return {};
    }),
    min_socials: z38.union([
      z38.number().int().min(1).max(3),
      z38.string().transform((val) => {
        const num = Number(val);
        if (Number.isNaN(num))
          throw new Error("Invalid number");
        return num;
      }).pipe(z38.number().int().min(1).max(3))
    ]).optional(),
    pagination: z38.coerce.boolean().optional()
  })).max(10).optional().default([])
});
var PausePulsePayloadParamsSchema = z38.object({
  action: z38.enum(["pause", "unpause"]),
  views: z38.array(z38.string()).min(1)
});
var ViewPaginationSchema = z38.object({
  pagination: z38.number()
});
var PulsePaginationResponseSchema = z38.record(ViewPaginationSchema);
var DebugPulseViewsResponseSchema = z38.object({
  success: z38.boolean(),
  hostname: z38.string(),
  viewKeys: z38.record(z38.array(z38.string())).optional(),
  error: z38.string().optional(),
  redirectTo: z38.string().optional(),
  hint: z38.string().optional()
});
var PulseQuerySchema = z38.object({
  blockchains: z38.string().optional(),
  factories: z38.string().optional()
});
var poolDataSchema = EnrichedPoolDataSchema;
var tokenDataSchema = EnrichedTokenDataSchema;
var syncMessageSchema = z38.object({
  type: z38.literal("sync"),
  payload: z38.record(z38.string(), z38.object({
    data: z38.array(poolDataSchema)
  }))
});
var newPoolMessageSchema = z38.object({
  type: z38.literal("new-pool"),
  payload: z38.object({
    viewName: z38.string(),
    pool: poolDataSchema
  })
});
var updatePoolMessageSchema = z38.object({
  type: z38.literal("update-pool"),
  payload: z38.object({
    viewName: z38.string(),
    pool: poolDataSchema
  })
});
var removePoolMessageSchema = z38.object({
  type: z38.literal("remove-pool"),
  payload: z38.object({
    viewName: z38.string(),
    poolAddress: z38.string()
  })
});
var WebSocketMessageSchema = z38.discriminatedUnion("type", [
  syncMessageSchema,
  newPoolMessageSchema,
  updatePoolMessageSchema,
  removePoolMessageSchema
]);
var PulseOutputSchema = WebSocketMessageSchema;
// src/v1/search/SearchSchema.ts
import { z as z40 } from "zod";

// src/utils/schemas/TokenDetailsOutput.ts
import { z as z39 } from "zod";
var TokenDetailsOutput = z39.object({
  address: z39.string(),
  chainId: z39.string(),
  symbol: z39.string().nullable(),
  name: z39.string().nullable(),
  decimals: z39.coerce.number().default(0),
  id: z39.number().nullable().optional().default(null),
  priceUSD: z39.coerce.number().default(0),
  priceToken: z39.coerce.number().default(0),
  priceTokenString: z39.string(),
  approximateReserveUSD: z39.coerce.number().default(0),
  approximateReserveTokenRaw: z39.string(),
  approximateReserveToken: z39.coerce.number().default(0),
  totalSupply: z39.coerce.number().default(0),
  circulatingSupply: z39.coerce.number().default(0),
  marketCapUSD: z39.coerce.number().default(0),
  marketCapDilutedUSD: z39.coerce.number().optional().default(0),
  logo: z39.string().nullable(),
  originLogoUrl: z39.string().nullable().optional(),
  rank: z39.coerce.number().nullable().default(null),
  cexs: z39.array(z39.string()).default([]),
  exchange: z39.object({
    name: z39.string(),
    logo: z39.string()
  }).optional(),
  factory: z39.string().nullable().optional(),
  source: z39.string().nullable().optional(),
  sourceFactory: z39.string().nullable().optional(),
  liquidityUSD: z39.coerce.number().optional(),
  liquidityMaxUSD: z39.coerce.number().optional(),
  bonded: z39.boolean().optional(),
  bondingPercentage: z39.coerce.number().optional(),
  bondingCurveAddress: z39.string().nullable().optional(),
  preBondingFactory: z39.string().optional(),
  poolAddress: z39.string().optional(),
  blockchain: z39.string().optional(),
  type: z39.string().optional(),
  tokenType: TokenTypeSchema,
  deployer: z39.string().nullable().optional(),
  bondedAt: z39.coerce.date().nullable(),
  athUSD: z39.coerce.number().optional(),
  atlUSD: z39.coerce.number().optional(),
  athDate: z39.coerce.date().optional(),
  atlDate: z39.coerce.date().optional(),
  priceChange1minPercentage: z39.coerce.number().default(0),
  priceChange5minPercentage: z39.coerce.number().default(0),
  priceChange1hPercentage: z39.coerce.number().default(0),
  priceChange4hPercentage: z39.coerce.number().default(0),
  priceChange6hPercentage: z39.coerce.number().default(0),
  priceChange12hPercentage: z39.coerce.number().default(0),
  priceChange24hPercentage: z39.coerce.number().default(0),
  volume1minUSD: z39.coerce.number().default(0),
  volume5minUSD: z39.coerce.number().default(0),
  volume15minUSD: z39.coerce.number().default(0),
  volume1hUSD: z39.coerce.number().default(0),
  volume4hUSD: z39.coerce.number().default(0),
  volume6hUSD: z39.coerce.number().default(0),
  volume12hUSD: z39.coerce.number().default(0),
  volume24hUSD: z39.coerce.number().default(0),
  volumeBuy1minUSD: z39.coerce.number().default(0),
  volumeBuy5minUSD: z39.coerce.number().default(0),
  volumeBuy15minUSD: z39.coerce.number().default(0),
  volumeBuy1hUSD: z39.coerce.number().default(0),
  volumeBuy4hUSD: z39.coerce.number().default(0),
  volumeBuy6hUSD: z39.coerce.number().default(0),
  volumeBuy12hUSD: z39.coerce.number().default(0),
  volumeBuy24hUSD: z39.coerce.number().default(0),
  volumeSell1minUSD: z39.coerce.number().default(0),
  volumeSell5minUSD: z39.coerce.number().default(0),
  volumeSell15minUSD: z39.coerce.number().default(0),
  volumeSell1hUSD: z39.coerce.number().default(0),
  volumeSell4hUSD: z39.coerce.number().default(0),
  volumeSell6hUSD: z39.coerce.number().default(0),
  volumeSell12hUSD: z39.coerce.number().default(0),
  volumeSell24hUSD: z39.coerce.number().default(0),
  trades1min: z39.coerce.number().default(0),
  trades5min: z39.coerce.number().default(0),
  trades15min: z39.coerce.number().default(0),
  trades1h: z39.coerce.number().default(0),
  trades4h: z39.coerce.number().default(0),
  trades6h: z39.coerce.number().default(0),
  trades12h: z39.coerce.number().default(0),
  trades24h: z39.coerce.number().default(0),
  buys1min: z39.coerce.number().default(0),
  buys5min: z39.coerce.number().default(0),
  buys15min: z39.coerce.number().default(0),
  buys1h: z39.coerce.number().default(0),
  buys4h: z39.coerce.number().default(0),
  buys6h: z39.coerce.number().default(0),
  buys12h: z39.coerce.number().default(0),
  buys24h: z39.coerce.number().default(0),
  sells1min: z39.coerce.number().default(0),
  sells5min: z39.coerce.number().default(0),
  sells15min: z39.coerce.number().default(0),
  sells1h: z39.coerce.number().default(0),
  sells4h: z39.coerce.number().default(0),
  sells6h: z39.coerce.number().default(0),
  sells12h: z39.coerce.number().default(0),
  sells24h: z39.coerce.number().default(0),
  buyers1min: z39.coerce.number().default(0),
  buyers5min: z39.coerce.number().default(0),
  buyers15min: z39.coerce.number().default(0),
  buyers1h: z39.coerce.number().default(0),
  buyers4h: z39.coerce.number().default(0),
  buyers6h: z39.coerce.number().default(0),
  buyers12h: z39.coerce.number().default(0),
  buyers24h: z39.coerce.number().default(0),
  sellers1min: z39.coerce.number().default(0),
  sellers5min: z39.coerce.number().default(0),
  sellers15min: z39.coerce.number().default(0),
  sellers1h: z39.coerce.number().default(0),
  sellers4h: z39.coerce.number().default(0),
  sellers6h: z39.coerce.number().default(0),
  sellers12h: z39.coerce.number().default(0),
  sellers24h: z39.coerce.number().default(0),
  traders1min: z39.coerce.number().default(0),
  traders5min: z39.coerce.number().default(0),
  traders15min: z39.coerce.number().default(0),
  traders1h: z39.coerce.number().default(0),
  traders4h: z39.coerce.number().default(0),
  traders6h: z39.coerce.number().default(0),
  traders12h: z39.coerce.number().default(0),
  traders24h: z39.coerce.number().default(0),
  feesPaid1minUSD: z39.coerce.number().default(0),
  feesPaid5minUSD: z39.coerce.number().default(0),
  feesPaid15minUSD: z39.coerce.number().default(0),
  feesPaid1hUSD: z39.coerce.number().default(0),
  feesPaid4hUSD: z39.coerce.number().default(0),
  feesPaid6hUSD: z39.coerce.number().default(0),
  feesPaid12hUSD: z39.coerce.number().default(0),
  feesPaid24hUSD: z39.coerce.number().default(0),
  totalFeesPaidUSD: z39.coerce.number().default(0),
  totalFeesPaidNativeRaw: z39.coerce.string().default("0"),
  organicTrades1min: z39.coerce.number().default(0),
  organicTrades5min: z39.coerce.number().default(0),
  organicTrades15min: z39.coerce.number().default(0),
  organicTrades1h: z39.coerce.number().default(0),
  organicTrades4h: z39.coerce.number().default(0),
  organicTrades6h: z39.coerce.number().default(0),
  organicTrades12h: z39.coerce.number().default(0),
  organicTrades24h: z39.coerce.number().default(0),
  organicTraders1min: z39.coerce.number().default(0),
  organicTraders5min: z39.coerce.number().default(0),
  organicTraders15min: z39.coerce.number().default(0),
  organicTraders1h: z39.coerce.number().default(0),
  organicTraders4h: z39.coerce.number().default(0),
  organicTraders6h: z39.coerce.number().default(0),
  organicTraders12h: z39.coerce.number().default(0),
  organicTraders24h: z39.coerce.number().default(0),
  organicVolume1minUSD: z39.coerce.number().default(0),
  organicVolume5minUSD: z39.coerce.number().default(0),
  organicVolume15minUSD: z39.coerce.number().default(0),
  organicVolume1hUSD: z39.coerce.number().default(0),
  organicVolume4hUSD: z39.coerce.number().default(0),
  organicVolume6hUSD: z39.coerce.number().default(0),
  organicVolume12hUSD: z39.coerce.number().default(0),
  organicVolume24hUSD: z39.coerce.number().default(0),
  organicVolumeBuy1minUSD: z39.coerce.number().default(0),
  organicVolumeBuy5minUSD: z39.coerce.number().default(0),
  organicVolumeBuy15minUSD: z39.coerce.number().default(0),
  organicVolumeBuy1hUSD: z39.coerce.number().default(0),
  organicVolumeBuy4hUSD: z39.coerce.number().default(0),
  organicVolumeBuy6hUSD: z39.coerce.number().default(0),
  organicVolumeBuy12hUSD: z39.coerce.number().default(0),
  organicVolumeBuy24hUSD: z39.coerce.number().default(0),
  organicVolumeSell1minUSD: z39.coerce.number().default(0),
  organicVolumeSell5minUSD: z39.coerce.number().default(0),
  organicVolumeSell15minUSD: z39.coerce.number().default(0),
  organicVolumeSell1hUSD: z39.coerce.number().default(0),
  organicVolumeSell4hUSD: z39.coerce.number().default(0),
  organicVolumeSell6hUSD: z39.coerce.number().default(0),
  organicVolumeSell12hUSD: z39.coerce.number().default(0),
  organicVolumeSell24hUSD: z39.coerce.number().default(0),
  organicBuys1min: z39.coerce.number().default(0),
  organicBuys5min: z39.coerce.number().default(0),
  organicBuys15min: z39.coerce.number().default(0),
  organicBuys1h: z39.coerce.number().default(0),
  organicBuys4h: z39.coerce.number().default(0),
  organicBuys6h: z39.coerce.number().default(0),
  organicBuys12h: z39.coerce.number().default(0),
  organicBuys24h: z39.coerce.number().default(0),
  organicSells1min: z39.coerce.number().default(0),
  organicSells5min: z39.coerce.number().default(0),
  organicSells15min: z39.coerce.number().default(0),
  organicSells1h: z39.coerce.number().default(0),
  organicSells4h: z39.coerce.number().default(0),
  organicSells6h: z39.coerce.number().default(0),
  organicSells12h: z39.coerce.number().default(0),
  organicSells24h: z39.coerce.number().default(0),
  organicBuyers1min: z39.coerce.number().default(0),
  organicBuyers5min: z39.coerce.number().default(0),
  organicBuyers15min: z39.coerce.number().default(0),
  organicBuyers1h: z39.coerce.number().default(0),
  organicBuyers4h: z39.coerce.number().default(0),
  organicBuyers6h: z39.coerce.number().default(0),
  organicBuyers12h: z39.coerce.number().default(0),
  organicBuyers24h: z39.coerce.number().default(0),
  organicSellers1min: z39.coerce.number().default(0),
  organicSellers5min: z39.coerce.number().default(0),
  organicSellers15min: z39.coerce.number().default(0),
  organicSellers1h: z39.coerce.number().default(0),
  organicSellers4h: z39.coerce.number().default(0),
  organicSellers6h: z39.coerce.number().default(0),
  organicSellers12h: z39.coerce.number().default(0),
  organicSellers24h: z39.coerce.number().default(0),
  createdAt: z39.coerce.date().nullable(),
  latestTradeDate: z39.coerce.date().nullable(),
  holdersCount: z39.coerce.number().default(0),
  description: z39.string().nullable(),
  socials: z39.object({
    twitter: z39.string().nullable(),
    website: z39.string().nullable(),
    telegram: z39.string().nullable(),
    others: z39.record(z39.unknown()).nullable(),
    uri: z39.string().optional()
  }),
  security: SecurityFlagsSchema.nullable(),
  twitterReusesCount: z39.coerce.number().nullable().default(0),
  twitterRenameCount: z39.coerce.number().default(0),
  twitterRenameHistory: z39.array(z39.object({
    username: z39.string(),
    lastChecked: z39.string()
  })).default([]),
  deployerMigrationsCount: z39.coerce.number().default(0),
  deployerTokensCount: z39.coerce.number().default(0),
  dexscreenerListed: z39.boolean().nullable().default(false),
  dexscreenerHeader: z39.string().nullable().default(null),
  dexscreenerAdPaid: z39.boolean().nullable().default(false),
  dexscreenerAdPaidDate: z39.coerce.date().nullable().default(null),
  dexscreenerSocialPaid: z39.boolean().nullable().default(false),
  dexscreenerSocialPaidDate: z39.coerce.date().nullable().default(null),
  liveStatus: z39.string().nullable(),
  liveThumbnail: z39.string().nullable(),
  livestreamTitle: z39.string().nullable(),
  liveReplyCount: z39.number().nullable(),
  dexscreenerBoosted: z39.boolean().nullable().default(false),
  dexscreenerBoostedDate: z39.coerce.date().nullable().default(null),
  dexscreenerBoostedAmount: z39.number().nullable().default(0),
  trendingScore1min: z39.coerce.number().default(0),
  trendingScore5min: z39.coerce.number().default(0),
  trendingScore15min: z39.coerce.number().default(0),
  trendingScore1h: z39.coerce.number().default(0),
  trendingScore4h: z39.coerce.number().default(0),
  trendingScore6h: z39.coerce.number().default(0),
  trendingScore12h: z39.coerce.number().default(0),
  trendingScore24h: z39.coerce.number().default(0)
}).merge(HoldersStatsSchema);

// src/v1/search/SearchSchema.ts
var SearchParamsSchema = z40.object({
  input: z40.string(),
  type: z40.enum(["tokens", "assets", "pairs"]).optional(),
  filters: z40.string().optional().transform((filtersString) => {
    if (!filtersString)
      return {};
    try {
      const parsed = JSON.parse(filtersString.replace(/(^|[,{]\s*)([a-zA-Z0-9_]+)(\s*):/g, '$1"$2"$3:'));
      return {
        blockchains: parsed["blockchains"] || undefined,
        factory: parsed["factory"] || undefined,
        poolTypes: parsed["poolTypes"] || undefined,
        factoriesAddresses: parsed["factoriesAddresses"] || undefined,
        excludeBonded: parsed["excludeBonded"] || undefined,
        bondedOnly: parsed["bondedOnly"] || undefined
      };
    } catch {
      return {};
    }
  }).pipe(z40.object({
    blockchains: z40.union([z40.string(), z40.array(z40.string())]).optional().transform((blockchainsInput) => {
      if (!blockchainsInput) {
        return [];
      }
      const blockchainsString = Array.isArray(blockchainsInput) ? blockchainsInput.join(",") : blockchainsInput;
      return blockchainsString.split(",").map((chain) => chain.trim()).filter((chain) => chain.length > 0);
    }),
    type: z40.enum(["tokens", "assets", "pairs"]).optional(),
    factory: z40.string().optional(),
    poolTypes: z40.string().optional().transform((poolTypesString) => {
      if (poolTypesString) {
        return poolTypesString?.split(",").map((poolType) => poolType.trim());
      }
      return [];
    }),
    factoriesAddresses: z40.string().optional().transform((factoriesAddressesString) => {
      return factoriesAddressesString?.split(",").map((factoryAddress) => factoryAddress.trim());
    }),
    excludeBonded: z40.coerce.boolean().optional().default(false),
    bondedOnly: z40.coerce.boolean().optional().default(false)
  })),
  mode: z40.enum(["trendings", "og"]).optional().default("trendings"),
  sortBy: z40.enum([
    "volume_24h",
    "market_cap",
    "created_at",
    "volume_1h",
    "fees_paid_5min",
    "fees_paid_1h",
    "fees_paid_24h",
    "volume_5min",
    "holders_count",
    "organic_volume_1h",
    "total_fees_paid_usd",
    "search_score",
    "trending_score_24h"
  ]).optional().default("search_score"),
  excludeBonded: z40.coerce.boolean().optional(),
  limit: z40.coerce.number().min(1).max(20).optional().default(5)
});
var TokenSchema2 = z40.object({
  address: z40.string(),
  price: z40.number().nullable(),
  priceToken: z40.number(),
  priceTokenString: z40.string(),
  approximateReserveUSD: z40.number(),
  approximateReserveTokenRaw: z40.string(),
  approximateReserveToken: z40.number(),
  symbol: z40.string(),
  name: z40.string(),
  id: z40.number().nullable().optional(),
  decimals: z40.number(),
  totalSupply: z40.number(),
  circulatingSupply: z40.number(),
  chainId: z40.string(),
  logo: z40.string().nullable()
});
var PairSchema = z40.object({
  token0: TokenSchema2,
  token1: TokenSchema2,
  volume24h: z40.number(),
  liquidity: z40.number(),
  blockchain: z40.string(),
  address: z40.string(),
  createdAt: z40.date().nullable(),
  type: z40.string(),
  baseToken: z40.string(),
  exchange: z40.object({
    name: z40.string(),
    logo: z40.string()
  }),
  factory: z40.string().nullable(),
  quoteToken: z40.string(),
  price: z40.number().nullable(),
  priceToken: z40.number(),
  priceTokenString: z40.string(),
  extraData: z40.record(z40.any()).nullable()
}).optional();
var TokenDataSchema = z40.object({
  logo: z40.string().nullable(),
  name: z40.string(),
  symbol: z40.string(),
  decimals: z40.array(z40.number().optional()),
  volume_24h: z40.number().optional(),
  price_change_24h: z40.number().optional(),
  price_change_1h: z40.number().optional(),
  blockchains: z40.array(z40.string().optional()),
  contracts: z40.array(z40.string().optional()),
  price: z40.number().nullable(),
  total_supply: z40.number(),
  market_cap: z40.number(),
  pairs: z40.array(PairSchema),
  type: z40.literal("token")
});
var AssetDataSchema = z40.object({
  id: z40.number(),
  name: z40.string(),
  symbol: z40.string(),
  contracts: z40.array(z40.string().optional()),
  blockchains: z40.array(z40.string().optional()),
  decimals: z40.array(z40.number().optional()),
  twitter: z40.string().nullable().optional(),
  website: z40.string().nullable().optional(),
  logo: z40.string().nullable(),
  price: z40.number().nullable(),
  market_cap: z40.number(),
  total_supply: z40.number(),
  liquidity: z40.number(),
  volume: z40.number(),
  pairs: z40.array(PairSchema),
  type: z40.literal("asset"),
  price_change_24h: z40.number().nullable(),
  price_change_1h: z40.number().nullable()
});
var SearchResponseSchema = z40.object({
  data: z40.array(z40.union([TokenDataSchema, AssetDataSchema, PoolData]))
});
var SearchFastResponseSchema = z40.object({
  data: z40.array(TokenDetailsOutput)
});
// src/v1/token/FirstBuyerSchema.ts
import { z as z41 } from "zod";
var TokenFirstBuyersParamsSchema = z41.object({
  blockchain: z41.string().optional(),
  asset: z41.string(),
  limit: z41.coerce.number().max(100).min(1).optional().default(70)
});
var TokenFirstBuyersResponseSchema = z41.object({
  data: z41.array(z41.object({
    address: z41.string(),
    blockchain: z41.string(),
    initialAmount: z41.string(),
    currentBalance: z41.string(),
    firstHoldingDate: z41.date(),
    tags: z41.array(z41.string()),
    lastUpdate: z41.date().nullable().optional()
  }))
});
// src/v1/wallet/BalanceUSDSchema.ts
import { z as z42 } from "zod";
var WalletBalanceUSDParamsSchema = z42.object({
  portfolioId: z42.string().min(1, "portfolioId is required").regex(/^\d+$/, "portfolioId must be a valid number")
});
var WalletBalanceUSDResponseSchema = z42.object({
  success: z42.number()
});
// src/utils/schemas/WalletDeployerSchema.ts
import { z as z43 } from "zod";
var tokenPositionSchema = z43.object({
  token: TokenDetailsOutput,
  balance: z43.number(),
  rawBalance: z43.string(),
  amountUSD: z43.number(),
  buys: z43.number(),
  sells: z43.number(),
  volumeBuyToken: z43.number(),
  volumeSellToken: z43.number(),
  volumeBuy: z43.number(),
  volumeSell: z43.number(),
  avgBuyPriceUSD: z43.number(),
  avgSellPriceUSD: z43.number(),
  realizedPnlUSD: z43.number(),
  unrealizedPnlUSD: z43.number(),
  totalPnlUSD: z43.number(),
  firstDate: z43.date().nullable(),
  lastDate: z43.date().nullable()
});
var walletDeployerOutputSchema = z43.object({
  data: z43.array(tokenPositionSchema),
  pagination: z43.object({
    total: z43.number(),
    page: z43.number(),
    offset: z43.number(),
    limit: z43.number()
  }).nullable()
});
var WalletDeployerQuery = z43.object({
  wallet: z43.string(),
  blockchain: z43.string(),
  page: z43.string().default("1").transform((val) => {
    const parsed = Number.parseInt(val, 10);
    return parsed > 0 ? parsed : 1;
  }),
  limit: z43.string().default("20").transform((val) => {
    const parsed = Number.parseInt(val, 10);
    return parsed > 0 ? parsed : 20;
  })
});

// src/v1/wallet/DeployerSchema.ts
var WalletV1DeployerParamsSchema = WalletDeployerQuery;
var WalletV1DeployerResponseSchema = walletDeployerOutputSchema;
// src/v1/wallet/HistorySchema.ts
import { z as z44 } from "zod";
var WalletHistoryParamsSchema = z44.object({
  wallet: z44.string().optional(),
  wallets: z44.string().optional(),
  blockchains: z44.string().optional(),
  from: z44.string().optional(),
  to: z44.string().optional(),
  unlistedAssets: z44.string().optional(),
  period: z44.string().optional(),
  accuracy: z44.string().optional(),
  testnet: z44.string().optional(),
  minliq: z44.string().optional(),
  filterSpam: z44.string().optional(),
  fetchUntrackedHistory: z44.string().optional(),
  fetchAllChains: z44.string().optional(),
  shouldFetchPriceChange: z44.string().optional(),
  backfillTransfers: z44.string().optional()
});
var WalletHistoryResponseSchema = z44.object({
  data: z44.object({
    wallets: z44.array(z44.string()),
    balance_usd: z44.number(),
    balance_history: z44.array(z44.tuple([z44.number(), z44.number()])),
    backfill_status: z44.enum(["processed", "processing", "pending"]).optional()
  })
});
// src/v1/wallet/WalletLabelSchema.ts
import { z as z45 } from "zod";
var WalletLabelsParamsSchema = z45.object({
  walletAddresses: z45.union([z45.string(), z45.array(z45.string()).max(100)]).optional(),
  tokenAddress: z45.string().optional()
});
var WalletLabelsResponseSchema = z45.object({
  data: z45.array(z45.object({
    walletAddress: z45.string(),
    labels: z45.array(z45.string())
  }))
});
// src/v1/wallet/WalletNFTSchema.ts
import { z as z46 } from "zod";
var WalletNFTParamsSchema = z46.object({
  wallet: z46.string().min(1),
  blockchains: z46.string().optional(),
  page: z46.string().optional().default("1"),
  offset: z46.string().optional().default("0"),
  limit: z46.string().optional().default("100"),
  pagination: z46.string().optional().default("false")
});
var WalletNFTResponseSchema = z46.object({
  data: z46.array(z46.object({
    token_address: z46.string(),
    token_id: z46.string(),
    token_uri: z46.string(),
    amount: z46.string(),
    owner_of: z46.string(),
    name: z46.string(),
    symbol: z46.string(),
    blockchain: z46.string(),
    chain_id: z46.string()
  })),
  pagination: z46.object({
    total: z46.number(),
    page: z46.number(),
    offset: z46.number(),
    limit: z46.number()
  }).nullable()
});
var NFTMetadataParamsSchema = z46.object({
  address: z46.string(),
  blockchain: z46.string()
});
var NFTMetadataResponseSchema = z46.object({
  name: z46.string(),
  symbol: z46.string(),
  address: z46.string(),
  chain_id: z46.string(),
  logo: z46.string(),
  website: z46.string(),
  telegram: z46.string(),
  twitter: z46.string(),
  discord: z46.string(),
  totalSupply: z46.bigint(),
  URI: z46.string()
});
// src/v1/wallet/WalletPortfolioSchema.ts
import { z as z47 } from "zod";
var WalletTokenTypeValues = ["2020", "2022", "erc20", "trc10", "trc20"];
var WalletTokenTypeSchema = z47.enum(WalletTokenTypeValues).nullable().optional();
var ContractBalanceSecuritySchema = SecurityFlagsSchema.extend({
  frozen: z47.boolean().optional()
}).nullable().optional();
var PortfolioResponseSchema = z47.object({
  data: z47.object({
    total_wallet_balance: z47.number(),
    wallets: z47.array(z47.string()),
    assets: z47.array(z47.object({
      contracts_balances: z47.array(z47.object({
        address: z47.string(),
        balance: z47.number(),
        balanceRaw: z47.string(),
        chainId: z47.string(),
        decimals: z47.number(),
        tokenType: WalletTokenTypeSchema,
        security: ContractBalanceSecuritySchema,
        lamports: z47.string().nullable().optional(),
        tokenAccount: z47.string().nullable().optional()
      })),
      cross_chain_balances: z47.record(z47.string(), z47.object({
        balance: z47.number(),
        balanceRaw: z47.string(),
        chainId: z47.string(),
        address: z47.string()
      })),
      price_change_24h: z47.number(),
      estimated_balance: z47.number(),
      price: z47.number(),
      liquidity: z47.number(),
      token_balance: z47.number(),
      allocation: z47.number(),
      asset: z47.object({
        id: z47.number().nullable(),
        name: z47.string(),
        symbol: z47.string(),
        logo: z47.string().nullable().optional(),
        decimals: z47.array(z47.bigint()),
        contracts: z47.array(z47.string()),
        blockchains: z47.array(z47.string())
      }),
      wallets: z47.array(z47.string()),
      realized_pnl: z47.number().optional(),
      unrealized_pnl: z47.number().optional(),
      price_bought: z47.number().optional(),
      total_invested: z47.number().optional(),
      min_buy_price: z47.number().optional(),
      max_buy_price: z47.number().optional()
    })),
    win_rate: z47.number().optional(),
    tokens_distribution: z47.object({
      "10x+": z47.number(),
      "4x - 10x": z47.number(),
      "2x - 4x": z47.number(),
      "10% - 2x": z47.number(),
      "-10% - 10%": z47.number(),
      "-50% - -10%": z47.number(),
      "-100% - -50%": z47.number()
    }).optional(),
    pnl_history: z47.object({
      "1y": z47.array(z47.tuple([
        z47.date(),
        z47.object({
          realized: z47.number(),
          unrealized: z47.number()
        })
      ])),
      "7d": z47.array(z47.tuple([
        z47.date(),
        z47.object({
          realized: z47.number(),
          unrealized: z47.number()
        })
      ])),
      "24h": z47.array(z47.tuple([
        z47.date(),
        z47.object({
          realized: z47.number(),
          unrealized: z47.number()
        })
      ])),
      "30d": z47.array(z47.tuple([
        z47.date(),
        z47.object({
          realized: z47.number(),
          unrealized: z47.number()
        })
      ]))
    }).optional(),
    total_realized_pnl: z47.number().optional(),
    total_unrealized_pnl: z47.number().optional(),
    total_pnl_history: z47.object({
      "24h": z47.object({
        realized: z47.number(),
        unrealized: z47.number()
      }),
      "7d": z47.object({
        realized: z47.number(),
        unrealized: z47.number()
      }),
      "30d": z47.object({
        realized: z47.number(),
        unrealized: z47.number()
      }),
      "1y": z47.object({
        realized: z47.number(),
        unrealized: z47.number()
      })
    }).optional(),
    balances_length: z47.number()
  }),
  backfill_status: z47.enum(["processed", "processing", "pending"]).optional()
});
var MultiPortfolioResponseSchema = z47.object({
  data: z47.array(z47.object({
    total_wallet_balance: z47.number(),
    wallets: z47.array(z47.string()),
    assets: z47.array(z47.object({
      contracts_balances: z47.array(z47.object({
        address: z47.string(),
        balance: z47.number(),
        balanceRaw: z47.string(),
        chainId: z47.string(),
        decimals: z47.number(),
        tokenType: WalletTokenTypeSchema,
        security: ContractBalanceSecuritySchema,
        lamports: z47.string().nullable().optional(),
        tokenAccount: z47.string().nullable().optional()
      })),
      cross_chain_balances: z47.record(z47.string(), z47.object({
        balance: z47.number(),
        balanceRaw: z47.string(),
        chainId: z47.string(),
        address: z47.string()
      })),
      price_change_24h: z47.number(),
      estimated_balance: z47.number(),
      price: z47.number(),
      liquidity: z47.number(),
      token_balance: z47.number(),
      allocation: z47.number(),
      asset: z47.object({
        id: z47.number().nullable(),
        name: z47.string(),
        symbol: z47.string(),
        logo: z47.string().nullable().optional(),
        decimals: z47.array(z47.bigint()),
        contracts: z47.array(z47.string()),
        blockchains: z47.array(z47.string())
      }),
      wallets: z47.array(z47.string()),
      realized_pnl: z47.number().optional(),
      unrealized_pnl: z47.number().optional(),
      price_bought: z47.number().optional(),
      total_invested: z47.number().optional(),
      min_buy_price: z47.number().optional(),
      max_buy_price: z47.number().optional()
    })),
    win_rate: z47.number().optional(),
    tokens_distribution: z47.object({
      "10x+": z47.number(),
      "4x - 10x": z47.number(),
      "2x - 4x": z47.number(),
      "10% - 2x": z47.number(),
      "-10% - 10%": z47.number(),
      "-50% - -10%": z47.number(),
      "-100% - -50%": z47.number()
    }).optional(),
    pnl_history: z47.object({
      "1y": z47.array(z47.tuple([
        z47.date(),
        z47.object({
          realized: z47.number(),
          unrealized: z47.number()
        })
      ])),
      "7d": z47.array(z47.tuple([
        z47.date(),
        z47.object({
          realized: z47.number(),
          unrealized: z47.number()
        })
      ])),
      "24h": z47.array(z47.tuple([
        z47.date(),
        z47.object({
          realized: z47.number(),
          unrealized: z47.number()
        })
      ])),
      "30d": z47.array(z47.tuple([
        z47.date(),
        z47.object({
          realized: z47.number(),
          unrealized: z47.number()
        })
      ]))
    }).optional(),
    total_realized_pnl: z47.number().optional(),
    total_unrealized_pnl: z47.number().optional(),
    total_pnl_history: z47.object({
      "24h": z47.object({
        realized: z47.number(),
        unrealized: z47.number()
      }),
      "7d": z47.object({
        realized: z47.number(),
        unrealized: z47.number()
      }),
      "30d": z47.object({
        realized: z47.number(),
        unrealized: z47.number()
      }),
      "1y": z47.object({
        realized: z47.number(),
        unrealized: z47.number()
      })
    }).optional(),
    balances_length: z47.number()
  })),
  backfill_status: z47.enum(["processed", "processing", "pending"]).optional()
});
var PositionSchema = z47.array(z47.object({
  type: z47.string(),
  name: z47.string(),
  chain_id: z47.string(),
  contract: z47.string(),
  created_at: z47.string().nullable(),
  tokens: z47.array(z47.object({
    name: z47.string(),
    symbol: z47.string(),
    contract: z47.string(),
    amount: z47.string(),
    amountRaw: z47.string(),
    decimals: z47.string(),
    amount_usd: z47.string(),
    logo: z47.string().nullable(),
    price_usd: z47.string().nullable()
  })),
  rewards: z47.array(z47.object({
    name: z47.string(),
    symbol: z47.string(),
    contract: z47.string(),
    amount: z47.string(),
    amountRaw: z47.string(),
    decimals: z47.string(),
    amount_usd: z47.string(),
    price_usd: z47.string()
  })).optional(),
  extra: z47.object({
    lp_token_amount: z47.string().optional(),
    position_staked_amount: z47.string().optional(),
    factory: z47.string().optional(),
    share_of_pool: z47.string().optional(),
    type: z47.enum(["supply", "borrow"]).optional(),
    health_factor: z47.number().optional(),
    reserve0: z47.string().optional(),
    reserve1: z47.string().optional(),
    reserve_usd: z47.number().optional()
  }).optional()
}));
var DefiPositionsResponseSchema = z47.object({
  data: z47.array(z47.object({
    protocol: z47.object({
      name: z47.string(),
      id: z47.string(),
      logo: z47.string(),
      url: z47.string()
    }),
    positions: PositionSchema
  })),
  wallets: z47.array(z47.string())
});
var PortfolioParamsSchema = z47.object({
  wallet: z47.string().optional(),
  wallets: z47.string().optional(),
  portfolio: z47.string().optional(),
  blockchains: z47.string().optional(),
  asset: z47.string().optional(),
  cache: z47.string().optional(),
  stale: z47.string().optional(),
  recheck_contract: z47.string().optional(),
  from: z47.string().optional(),
  to: z47.string().optional(),
  portfolio_settings: z47.string().optional(),
  unlistedAssets: z47.string().optional(),
  period: z47.string().optional(),
  accuracy: z47.string().optional(),
  testnet: z47.string().optional(),
  minliq: z47.string().optional(),
  filterSpam: z47.string().optional(),
  fetchUntrackedHistory: z47.string().optional(),
  fetchAllChains: z47.string().optional(),
  shouldFetchPriceChange: z47.string().optional(),
  backfillTransfers: z47.string().optional(),
  fetchEmptyBalances: z47.string().optional(),
  pnl: z47.string().optional()
});
var PortfolioDefiParamsSchema = z47.object({
  wallet: z47.string().optional(),
  wallets: z47.string().optional(),
  blockchains: z47.string().optional(),
  testnet: z47.string().optional(),
  unlistedAssets: z47.string().optional()
});
// src/v1/wallet/WalletSmartMoneySchema.ts
import { z as z48 } from "zod";
var WalletSmartMoneyResponseSchema = z48.object({
  data: z48.array(z48.object({
    wallet_address: z48.string(),
    realized_pnl: z48.number(),
    unrealized_pnl: z48.number(),
    txns_count: z48.number(),
    volume: z48.number(),
    blockchains: z48.array(z48.string()),
    win_rate: z48.number(),
    tokens_distribution: z48.object({
      "10x+": z48.number(),
      "4x - 10x": z48.number(),
      "2x - 4x": z48.number(),
      "10% - 2x": z48.number(),
      "-10% - 10%": z48.number(),
      "-50% - -10%": z48.number(),
      "-100% - -50%": z48.number()
    }),
    top_3_tokens: z48.array(z48.record(z48.string(), z48.number()))
  }))
});
// src/v1/wallet/WalletTradesSchema.ts
import { z as z49 } from "zod";
var WalletTradesParamsSchema = z49.object({
  limit: z49.string().optional().default("100"),
  offset: z49.string().optional().default("0"),
  page: z49.string().optional().default("1"),
  order: z49.string().optional(),
  wallet: z49.string().optional(),
  wallets: z49.string().optional(),
  from: z49.string().optional(),
  to: z49.string().optional()
});
var WalletTradesResponseSchema = z49.object({
  data: z49.array(z49.object({
    chain_id: z49.string(),
    swap_type: z49.string(),
    raw_amount0: z49.string(),
    raw_amount1: z49.string(),
    raw_post_balance0: z49.string().optional().nullable(),
    raw_post_balance1: z49.string().optional().nullable(),
    raw_pre_balance0: z49.string().optional().nullable(),
    raw_pre_balance1: z49.string().optional().nullable(),
    amount0: z49.coerce.number(),
    amount1: z49.coerce.number(),
    ratio: z49.number(),
    price_usd_token0: z49.number(),
    price_usd_token1: z49.number(),
    date: z49.date(),
    amount_usd: z49.number(),
    pool_address: z49.string(),
    token0_address: z49.string(),
    token1_address: z49.string(),
    transaction_sender_address: z49.string(),
    transaction_hash: z49.string(),
    base: z49.string(),
    quote: z49.string(),
    side: z49.string(),
    amount_quote: z49.coerce.number(),
    amount_base: z49.coerce.number(),
    amount_quote_raw: z49.string(),
    amount_base_raw: z49.string(),
    base_token: TokenDetailsOutput.optional().nullable(),
    labels: z49.array(z49.string())
  }))
});
// src/v1/wallet/WalletTransactionSchema.ts
import { z as z50 } from "zod";
var WalletTransactionsParamsSchema = z50.object({
  limit: z50.string().optional(),
  offset: z50.string().optional(),
  page: z50.string().optional(),
  order: z50.string().optional(),
  cache: z50.string().optional(),
  stale: z50.string().optional(),
  wallet: z50.string().optional(),
  wallets: z50.string().optional(),
  recheckContract: z50.string().optional(),
  from: z50.string().optional(),
  to: z50.string().optional(),
  asset: z50.string().optional(),
  trades: z50.string().optional(),
  transactions: z50.string().optional(),
  blockchains: z50.string().optional(),
  unlistedAssets: z50.string().optional(),
  onlyAssets: z50.string().optional(),
  pagination: z50.string().optional(),
  filterSpam: z50.string().optional()
});
var WalletRawTransactionsParamsSchema = z50.object({
  limit: z50.string().optional().transform((val) => val !== undefined ? Number(val) : undefined),
  offset: z50.string().optional().transform((val) => val !== undefined ? Number(val) : undefined),
  page: z50.string().optional().transform((val) => val !== undefined ? Number(val) : undefined),
  order: z50.string().optional(),
  cache: z50.string().optional().transform((val) => val === "true"),
  stale: z50.string().optional().transform((val) => val !== undefined ? Number(val) : undefined),
  wallet: z50.string().optional(),
  wallets: z50.string().optional(),
  from: z50.string().optional().transform((val) => val !== undefined ? Number(val) : undefined),
  to: z50.string().optional().transform((val) => val !== undefined ? Number(val) : undefined),
  blockchains: z50.string().optional(),
  pagination: z50.string().optional().transform((val) => val === "true")
}).strict();
var WalletTransactionsResponseSchema = z50.object({
  data: z50.object({
    transactions: z50.array(z50.object({
      id: z50.string(),
      timestamp: z50.number(),
      from: z50.string().nullable(),
      to: z50.string().nullable(),
      contract: z50.string().nullable(),
      hash: z50.string(),
      amount_usd: z50.number(),
      amount: z50.number(),
      block_number: z50.number(),
      type: z50.string(),
      blockchain: z50.string(),
      tx_cost: z50.number(),
      transaction: z50.object({
        hash: z50.string(),
        chainId: z50.string(),
        fees: z50.string(),
        feesUSD: z50.number(),
        date: z50.date()
      }),
      asset: z50.object({
        id: z50.number().nullable(),
        name: z50.string(),
        symbol: z50.string(),
        decimals: z50.number(),
        totalSupply: z50.number(),
        circulatingSupply: z50.number(),
        price: z50.number(),
        liquidity: z50.number(),
        priceChange24hPercent: z50.number(),
        marketCapUSD: z50.number(),
        logo: z50.string().nullable(),
        nativeChainId: z50.string().nullable(),
        contract: z50.string().nullable()
      })
    })),
    wallets: z50.array(z50.string())
  }),
  details: z50.null(),
  pagination: z50.object({
    total: z50.number(),
    page: z50.number(),
    offset: z50.number(),
    limit: z50.number()
  }).nullable()
});
var RawTransactionSchema = z50.object({
  id: z50.bigint(),
  timestamp: z50.number(),
  from: z50.string().nullable(),
  to: z50.string().nullable(),
  contract: z50.string().nullable(),
  hash: z50.string(),
  amount_usd: z50.number(),
  amount: z50.number(),
  block_number: z50.number(),
  type: z50.string(),
  blockchain: z50.string(),
  tx_cost: z50.number(),
  transaction: z50.object({
    hash: z50.string(),
    chainId: z50.string(),
    fees: z50.string(),
    feesUSD: z50.number(),
    date: z50.date()
  }),
  asset: z50.object({
    id: z50.number().nullable(),
    name: z50.string(),
    symbol: z50.string(),
    totalSupply: z50.number(),
    circulatingSupply: z50.number(),
    price: z50.number(),
    liquidity: z50.number(),
    priceChange24hPercent: z50.number(),
    marketCapUSD: z50.number(),
    logo: z50.string().nullable(),
    nativeChainId: z50.string().nullable(),
    contract: z50.string().nullable()
  })
});
var UnifiedTransactionSchema = z50.object({
  chain_id: z50.string(),
  hash: z50.string().default(""),
  method: z50.string().optional(),
  from: z50.string().default(""),
  to: z50.string().default(""),
  native_amount: z50.string().default("0"),
  name: z50.string().default("Unknown"),
  logo: z50.string().optional(),
  amount: z50.string().default("0"),
  token: z50.string().default(""),
  symbol: z50.string().optional(),
  timestamp: z50.string().default(""),
  block_number: z50.number().optional(),
  txn_fees: z50.string().default("0"),
  status: z50.boolean()
});
var WalletRawTransactionsResponseSchema = z50.object({
  raw: z50.array(RawTransactionSchema),
  unified: z50.array(UnifiedTransactionSchema),
  wallets: z50.string().array(),
  pagination: z50.object({
    total: z50.number(),
    page: z50.number(),
    offset: z50.number(),
    limit: z50.number()
  }).nullable()
});
var RawNFTTransactionSchema = z50.object({
  combined_id: z50.string(),
  combined_date: z50.date().transform((d) => d.toISOString()),
  contract_address: z50.string().nullable(),
  from_address: z50.string().nullable(),
  to_address: z50.string().nullable(),
  chain_id: z50.string(),
  token_id: z50.string().nullable(),
  fees: z50.string().nullable(),
  fees_usd: z50.number().nullable(),
  block_height: z50.number().nullable(),
  transaction_hash: z50.string(),
  raw_type: z50.enum(["sell", "buy"])
});
var UnifiedNFTTransactionSchema = z50.object({
  chain_id: z50.string(),
  hash: z50.string(),
  method: z50.string().optional(),
  from: z50.string(),
  to: z50.string(),
  amount: z50.string().optional(),
  token: z50.string(),
  symbol: z50.string().optional(),
  tokenId: z50.string().nullable(),
  timestamp: z50.date().transform((d) => d.toISOString()),
  block_number: z50.number().nullable(),
  txn_fees: z50.string().nullable(),
  status: z50.boolean()
});
var WalletNFTTransactionsResponseSchema = z50.object({
  raw: z50.array(RawNFTTransactionSchema),
  unified: z50.array(UnifiedNFTTransactionSchema),
  wallets: z50.string().array(),
  pagination: z50.object({
    total: z50.number(),
    page: z50.number(),
    offset: z50.number(),
    limit: z50.number()
  }).nullable()
}).strict();
// src/v1/webhook/WebhookSchema.ts
import { z as z51 } from "zod";
var BaseFilter = z51.object({
  eq: z51.tuple([z51.string(), z51.union([z51.string(), z51.number(), z51.boolean(), z51.null()])]).optional(),
  neq: z51.tuple([z51.string(), z51.union([z51.string(), z51.number(), z51.boolean(), z51.null()])]).optional(),
  lt: z51.tuple([z51.string(), z51.coerce.number()]).optional(),
  lte: z51.tuple([z51.string(), z51.coerce.number()]).optional(),
  gt: z51.tuple([z51.string(), z51.coerce.number()]).optional(),
  gte: z51.tuple([z51.string(), z51.coerce.number()]).optional(),
  in: z51.tuple([z51.string(), z51.union([z51.string(), z51.number(), z51.boolean(), z51.null()])]).optional()
});
var Filter = BaseFilter.and(z51.union([
  BaseFilter.extend({ and: z51.undefined(), or: z51.undefined() }),
  BaseFilter.extend({ and: z51.array(z51.lazy(() => Filter)), or: z51.undefined() }),
  BaseFilter.extend({ and: z51.undefined(), or: z51.array(z51.lazy(() => Filter)) })
]));
function countOperations(filter) {
  if (!filter)
    return 0;
  let count = 0;
  for (const key of ["eq", "neq", "lt", "lte", "gt", "gte", "in"]) {
    if (filter[key])
      count += 1;
  }
  if ("and" in filter && Array.isArray(filter.and)) {
    for (const child of filter.and) {
      count += countOperations(child);
    }
  }
  if ("or" in filter && Array.isArray(filter.or)) {
    for (const child of filter.or) {
      count += countOperations(child);
    }
  }
  return count;
}
var FilterWithLimit = Filter.superRefine((val, ctx) => {
  const total = countOperations(val);
  const max = 1000;
  if (total > max) {
    ctx.addIssue({
      code: z51.ZodIssueCode.custom,
      message: `Your filter contains ${total} leaf operations, exceeding the maximum of ${max}. Only leaf conditions like "eq", "neq", "lt", "lte", "gt", "gte", "in" are counted; logical operators ("and", "or") are ignored.`
    });
  }
});
var UpdateWebhook = z51.object({
  streamId: z51.string(),
  apiKey: z51.string(),
  mode: z51.enum(["replace", "merge"]).default("replace"),
  filters: FilterWithLimit.optional()
});
var CreateWebhook = z51.object({
  name: z51.string(),
  chainIds: z51.array(z51.string()),
  events: z51.array(z51.string()),
  apiKey: z51.string(),
  filters: FilterWithLimit.optional(),
  url: z51.string().url()
}).strict();
var listWebhooksQueryParams = z51.object({
  apiKey: z51.string().trim().min(1, { message: "API key is required" })
});
var deleteWebhookParams = z51.object({
  id: z51.string().trim().min(1, { message: "Webhook ID is required" })
});
var WebhookResponseSchema = z51.object({
  id: z51.string(),
  name: z51.string(),
  chainIds: z51.array(z51.string()),
  events: z51.array(z51.string()),
  filters: z51.any().nullable().optional(),
  webhookUrl: z51.string().url(),
  apiKey: z51.string(),
  createdAt: z51.union([z51.string(), z51.date()]).transform((val) => val instanceof Date ? val.toISOString() : val)
});
var CreateWebhookResponseSchema = WebhookResponseSchema.extend({
  webhookSecret: z51.string()
});
var listWebhookResponseSchema = z51.object({
  success: z51.boolean(),
  count: z51.number(),
  data: z51.array(WebhookResponseSchema)
});
var updateWebhookResponseSchema = z51.object({
  success: z51.boolean(),
  message: z51.string(),
  data: WebhookResponseSchema
});
var deleteWebhookResponseSchema = z51.object({
  success: z51.boolean(),
  message: z51.string(),
  id: z51.string()
});
// src/v2/asset/AssetDetailsSchema.ts
import { z as z52 } from "zod";
var AssetTokenDetailsOutput = TokenDetailsOutput;
var AssetDataOutput = z52.object({
  id: z52.number(),
  name: z52.string(),
  symbol: z52.string(),
  logo: z52.string().nullable(),
  description: z52.string().nullable(),
  rank: z52.number().nullable(),
  nativeChainId: z52.string().nullable(),
  priceUSD: z52.number().nullable(),
  totalSupply: z52.number().default(0),
  circulatingSupply: z52.number().default(0),
  marketCapUSD: z52.number().default(0),
  marketCapDilutedUSD: z52.number().default(0),
  athPriceDate: z52.coerce.date().nullable(),
  athPriceUSD: z52.number().nullable(),
  atlPriceDate: z52.coerce.date().nullable(),
  atlPriceUSD: z52.number().nullable(),
  isStablecoin: z52.boolean().default(false),
  createdAt: z52.coerce.date(),
  listedAt: z52.coerce.date().nullable(),
  socials: z52.object({
    audit: z52.string().nullable(),
    github: z52.string().nullable(),
    twitter: z52.string().nullable(),
    website: z52.string().nullable(),
    kyc: z52.string().nullable(),
    chat: z52.string().nullable(),
    discord: z52.string().nullable()
  }).nullable()
});
var AssetDetailsDataOutput = z52.object({
  asset: AssetDataOutput,
  tokens: z52.array(TokenDetailsOutput.or(z52.object({ error: z52.string().optional() })).nullable()),
  tokensCount: z52.number()
});
var AssetDetailsParamsSchema = z52.object({
  id: z52.coerce.number().optional(),
  address: z52.string().optional(),
  blockchain: z52.string().optional(),
  tokensLimit: z52.coerce.number().min(1).max(50).default(10),
  instanceTracking: z52.preprocess((val) => {
    if (val === "true")
      return true;
    if (val === "false")
      return false;
    return val;
  }, z52.boolean().optional())
}).refine((data) => data.id !== undefined || data.address !== undefined && data.blockchain !== undefined, {
  message: "Either id OR (address AND blockchain) must be provided"
});
var AssetDetailsResponseSchema = z52.object({
  data: AssetDetailsDataOutput,
  hostname: z52.string().optional()
});
var AssetDetailsItemSchema = z52.object({
  id: z52.coerce.number().optional(),
  address: z52.string().optional(),
  blockchain: z52.string().optional(),
  tokensLimit: z52.coerce.number().min(1).max(50).default(10)
});
var AssetDetailsBatchParamsSchema = z52.array(AssetDetailsItemSchema).min(1, "At least one asset is required").max(10, "Maximum 10 assets per request");
var AssetDetailsBatchResponseSchema = z52.object({
  payload: z52.array(AssetDetailsDataOutput.or(z52.object({ error: z52.string().optional() })).nullable()),
  hostname: z52.string().optional()
});
// src/v2/asset/AssetPriceHistorySchema.ts
import { z as z53 } from "zod";
var AssetPriceHistoryItemSchema = z53.object({
  address: z53.string().optional(),
  chainId: z53.string().optional(),
  id: z53.coerce.number().optional(),
  period: z53.string().optional().transform((val) => {
    if (val) {
      return normalizePeriod(val);
    }
    return;
  }),
  from: z53.coerce.number().default(0),
  to: z53.coerce.number().default(Date.now)
});
var AssetPriceHistoryParamsSchema = AssetPriceHistoryItemSchema.refine((data) => {
  return data.id !== undefined || data.address !== undefined;
}, {
  message: "Either id or address must be provided"
}).refine((data) => {
  if (data.address !== undefined && data.chainId === undefined) {
    return false;
  }
  return true;
}, {
  message: "chainId is required when using address"
});
var AssetPriceHistoryArraySchema = z53.array(AssetPriceHistoryItemSchema).min(1, "At least one asset is required").max(10, "Maximum 10 assets per request").refine((assets) => {
  return assets.every((asset) => asset.id !== undefined || asset.address !== undefined);
}, {
  message: "Each asset must have either id or address"
}).refine((assets) => {
  return assets.every((asset) => {
    if (asset.address !== undefined && asset.chainId === undefined) {
      return false;
    }
    return true;
  });
}, {
  message: "chainId is required when using address"
});
var AssetPriceHistoryBatchParamsSchema = z53.union([
  AssetPriceHistoryArraySchema,
  z53.object({ assets: AssetPriceHistoryArraySchema })
]);
var AssetPriceHistoryDataSchema = z53.object({
  priceHistory: z53.array(z53.array(z53.number().nullable())),
  id: z53.number().optional(),
  name: z53.string().optional(),
  symbol: z53.string().optional(),
  chainId: z53.string().optional(),
  address: z53.string().optional(),
  error: z53.string().optional()
});
var AssetPriceHistoryResponseSchema = z53.object({
  data: AssetPriceHistoryDataSchema
});
var AssetPriceHistoryBatchResponseSchema = z53.object({
  data: z53.array(AssetPriceHistoryDataSchema)
});
// src/v2/explorer/BlockQuerySchema.ts
import { z as z54 } from "zod";
var BlockQueryParams = z54.object({
  address: z54.string(),
  blockchain: z54.string()
});
var BlockQueryParamsSchema = BlockQueryParams;
// src/v2/market/MarketDetailsSchema.ts
import { z as z57 } from "zod";

// src/utils/schemas/MarketDetailsOutput.ts
import { z as z56 } from "zod";

// src/v2/perp/PerpModels.ts
import { z as z55 } from "zod";
var PerpDataRedisSchemaBase = z55.object({
  markPriceUSD: z55.coerce.number().default(0),
  markPriceQuote: z55.coerce.number().default(0),
  oraclePriceUSD: z55.coerce.number().default(0),
  isDisabled: z55.coerce.boolean(),
  isOpen: z55.coerce.boolean(),
  assetClass: z55.string().transform((value) => !value ? "crypto" : value),
  spreadPercentage: z55.coerce.number().default(0),
  fundingFeeShort1hPercentage: z55.coerce.number().default(0),
  totalFeeShort1hPercentage: z55.coerce.number().default(0),
  fundingFeeLong1hPercentage: z55.coerce.number().default(0),
  totalFeeLong1hPercentage: z55.coerce.number().default(0),
  fundingFeeShort8hPercentage: z55.coerce.number().default(0),
  totalFeeShort8hPercentage: z55.coerce.number().default(0),
  fundingFeeLong8hPercentage: z55.coerce.number().default(0),
  totalFeeLong8hPercentage: z55.coerce.number().default(0),
  fundingFeeShort24hPercentage: z55.coerce.number().default(0),
  totalFeeShort24hPercentage: z55.coerce.number().default(0),
  fundingFeeLong24hPercentage: z55.coerce.number().default(0),
  totalFeeLong24hPercentage: z55.coerce.number().default(0),
  fundingFeeShort1yPercentage: z55.coerce.number().default(0),
  totalFeeShort1yPercentage: z55.coerce.number().default(0),
  fundingFeeLong1yPercentage: z55.coerce.number().default(0),
  totalFeeLong1yPercentage: z55.coerce.number().default(0),
  collateral: z55.string().optional(),
  marketId: z55.string()
});
var PerpDataRedisSchemaFlatten = PerpDataRedisSchemaBase.extend({
  oiCollateral_oiLong: z55.coerce.number().default(0),
  oiCollateral_oiShort: z55.coerce.number().default(0),
  oiCollateral_max: z55.coerce.number().optional(),
  leverage_min: z55.coerce.number().default(0),
  leverage_max: z55.coerce.number().default(0),
  defaultTradingFees_makerFeeBps: z55.coerce.number().default(0),
  defaultTradingFees_takerFeeBps: z55.coerce.number().default(0),
  liquidationParams_maxLiqSpreadPercentage: z55.coerce.number().default(0),
  liquidationParams_startLiqThresholdPercentage: z55.coerce.number().default(0),
  liquidationParams_endLiqThresholdPercentage: z55.coerce.number().default(0),
  liquidationParams_startLeverage: z55.coerce.number().default(0),
  liquidationParams_endLeverage: z55.coerce.number().default(0)
});
var PerpDataRedisSchemaNested = PerpDataRedisSchemaBase.extend({
  defaultTradingFees: z55.object({
    makerFeeBps: z55.number().default(0),
    takerFeeBps: z55.number().default(0)
  }),
  oiCollateral: z55.object({
    oiLong: z55.number().default(0),
    oiShort: z55.number().default(0),
    max: z55.number().optional()
  }),
  leverage: z55.object({
    min: z55.number().default(0),
    max: z55.number().default(0)
  }),
  liquidationParams: z55.object({
    maxLiqSpreadPercentage: z55.number().default(0),
    startLiqThresholdPercentage: z55.number().default(0),
    endLiqThresholdPercentage: z55.number().default(0),
    startLeverage: z55.number().default(0),
    endLeverage: z55.number().default(0)
  })
});
var PerpDataMarketDetailsOutputSchema = PerpDataRedisSchemaNested.omit({ oiCollateral: true }).extend({
  openInterest: z55.object({
    longUSD: z55.number().default(0),
    longQuoteToken: z55.number().default(0),
    shortUSD: z55.number().default(0),
    shortQuoteToken: z55.number().default(0),
    maxUSD: z55.number().optional(),
    maxQuoteToken: z55.number().optional()
  })
});

// src/utils/schemas/MarketDetailsOutput.ts
var TokenDetailsSchema = z56.object({
  address: z56.string(),
  chainId: z56.string(),
  symbol: z56.string().nullable(),
  name: z56.string().nullable(),
  decimals: z56.coerce.number().default(0),
  id: z56.number().nullable().optional().default(null),
  priceUSD: z56.coerce.number().default(0),
  priceToken: z56.coerce.number().default(0),
  priceTokenString: z56.string(),
  approximateReserveUSD: z56.coerce.number().default(0),
  approximateReserveTokenRaw: z56.string(),
  approximateReserveToken: z56.coerce.number().default(0),
  totalSupply: z56.coerce.number().default(0),
  circulatingSupply: z56.coerce.number().default(0),
  marketCapUSD: z56.coerce.number().optional().default(0),
  marketCapDilutedUSD: z56.coerce.number().optional().default(0),
  logo: z56.string().nullable(),
  exchange: z56.object({
    name: z56.string(),
    logo: z56.string()
  }).optional(),
  factory: z56.string().nullable().optional(),
  source: z56.string().nullable().optional(),
  sourceFactory: z56.string().nullable().optional(),
  liquidityUSD: z56.coerce.number().optional(),
  liquidityMaxUSD: z56.coerce.number().optional(),
  bonded: z56.boolean().optional(),
  bondingPercentage: z56.coerce.number().optional(),
  bondingCurveAddress: z56.string().nullable().optional(),
  preBondingFactory: z56.string().optional(),
  poolAddress: z56.string().optional(),
  blockchain: z56.string().optional(),
  type: z56.string().optional(),
  deployer: z56.string().nullable().optional(),
  createdAt: z56.coerce.string().optional(),
  bondedAt: z56.coerce.date().nullable(),
  athUSD: z56.coerce.number().optional(),
  atlUSD: z56.coerce.number().optional(),
  athDate: z56.coerce.date().optional(),
  atlDate: z56.coerce.date().optional()
}).merge(HoldersStatsSchema);
var MarketDetailsOutput = z56.object({
  token0: TokenDetailsSchema.optional(),
  token1: TokenDetailsSchema.optional(),
  base: TokenDetailsSchema,
  quote: TokenDetailsSchema,
  liquidityUSD: z56.coerce.number().default(0),
  latestTradeDate: z56.coerce.date().nullable(),
  blockchain: z56.string(),
  address: z56.string(),
  createdAt: z56.coerce.date().nullable(),
  type: z56.string(),
  exchange: z56.object({
    name: z56.string(),
    logo: z56.string()
  }),
  factory: z56.string().nullable(),
  priceUSD: z56.coerce.number().optional(),
  priceToken: z56.coerce.number().optional(),
  priceTokenString: z56.string().optional(),
  baseToken: z56.string(),
  quoteToken: z56.string(),
  bonded: z56.coerce.boolean(),
  bondingPercentage: z56.coerce.number().nullable(),
  preBondingPoolAddress: z56.string().nullable(),
  sourceFactory: z56.string().nullable().optional(),
  totalFeesPaidUSD: z56.coerce.number().nullable(),
  totalFeesPaidNativeRaw: z56.coerce.string().default("0"),
  priceChange1minPercentage: z56.coerce.number().default(0),
  priceChange5minPercentage: z56.coerce.number().default(0),
  priceChange1hPercentage: z56.coerce.number().default(0),
  priceChange4hPercentage: z56.coerce.number().default(0),
  priceChange6hPercentage: z56.coerce.number().default(0),
  priceChange12hPercentage: z56.coerce.number().default(0),
  priceChange24hPercentage: z56.coerce.number().default(0),
  volume1minUSD: z56.coerce.number().default(0),
  volume5minUSD: z56.coerce.number().default(0),
  volume15minUSD: z56.coerce.number().default(0),
  volume1hUSD: z56.coerce.number().default(0),
  volume4hUSD: z56.coerce.number().default(0),
  volume6hUSD: z56.coerce.number().default(0),
  volume12hUSD: z56.coerce.number().default(0),
  volume24hUSD: z56.coerce.number().default(0),
  volumeBuy1minUSD: z56.coerce.number().default(0),
  volumeBuy5minUSD: z56.coerce.number().default(0),
  volumeBuy15minUSD: z56.coerce.number().default(0),
  volumeBuy1hUSD: z56.coerce.number().default(0),
  volumeBuy4hUSD: z56.coerce.number().default(0),
  volumeBuy6hUSD: z56.coerce.number().default(0),
  volumeBuy12hUSD: z56.coerce.number().default(0),
  volumeBuy24hUSD: z56.coerce.number().default(0),
  volumeSell1minUSD: z56.coerce.number().default(0),
  volumeSell5minUSD: z56.coerce.number().default(0),
  volumeSell15minUSD: z56.coerce.number().default(0),
  volumeSell1hUSD: z56.coerce.number().default(0),
  volumeSell4hUSD: z56.coerce.number().default(0),
  volumeSell6hUSD: z56.coerce.number().default(0),
  volumeSell12hUSD: z56.coerce.number().default(0),
  volumeSell24hUSD: z56.coerce.number().default(0),
  trades1min: z56.coerce.number().default(0),
  trades5min: z56.coerce.number().default(0),
  trades15min: z56.coerce.number().default(0),
  trades1h: z56.coerce.number().default(0),
  trades4h: z56.coerce.number().default(0),
  trades6h: z56.coerce.number().default(0),
  trades12h: z56.coerce.number().default(0),
  trades24h: z56.coerce.number().default(0),
  buys1min: z56.coerce.number().default(0),
  buys5min: z56.coerce.number().default(0),
  buys15min: z56.coerce.number().default(0),
  buys1h: z56.coerce.number().default(0),
  buys4h: z56.coerce.number().default(0),
  buys6h: z56.coerce.number().default(0),
  buys12h: z56.coerce.number().default(0),
  buys24h: z56.coerce.number().default(0),
  sells1min: z56.coerce.number().default(0),
  sells5min: z56.coerce.number().default(0),
  sells15min: z56.coerce.number().default(0),
  sells1h: z56.coerce.number().default(0),
  sells4h: z56.coerce.number().default(0),
  sells6h: z56.coerce.number().default(0),
  sells12h: z56.coerce.number().default(0),
  sells24h: z56.coerce.number().default(0),
  buyers1min: z56.coerce.number().default(0),
  buyers5min: z56.coerce.number().default(0),
  buyers15min: z56.coerce.number().default(0),
  buyers1h: z56.coerce.number().default(0),
  buyers4h: z56.coerce.number().default(0),
  buyers6h: z56.coerce.number().default(0),
  buyers12h: z56.coerce.number().default(0),
  buyers24h: z56.coerce.number().default(0),
  sellers1min: z56.coerce.number().default(0),
  sellers5min: z56.coerce.number().default(0),
  sellers15min: z56.coerce.number().default(0),
  sellers1h: z56.coerce.number().default(0),
  sellers4h: z56.coerce.number().default(0),
  sellers6h: z56.coerce.number().default(0),
  sellers12h: z56.coerce.number().default(0),
  sellers24h: z56.coerce.number().default(0),
  traders1min: z56.coerce.number().default(0),
  traders5min: z56.coerce.number().default(0),
  traders15min: z56.coerce.number().default(0),
  traders1h: z56.coerce.number().default(0),
  traders4h: z56.coerce.number().default(0),
  traders6h: z56.coerce.number().default(0),
  traders12h: z56.coerce.number().default(0),
  traders24h: z56.coerce.number().default(0),
  feesPaid1minUSD: z56.coerce.number().default(0),
  feesPaid5minUSD: z56.coerce.number().default(0),
  feesPaid15minUSD: z56.coerce.number().default(0),
  feesPaid1hUSD: z56.coerce.number().default(0),
  feesPaid4hUSD: z56.coerce.number().default(0),
  feesPaid6hUSD: z56.coerce.number().default(0),
  feesPaid12hUSD: z56.coerce.number().default(0),
  feesPaid24hUSD: z56.coerce.number().default(0),
  holdersCount: z56.coerce.number().default(0),
  source: z56.string().nullable(),
  deployer: z56.string().nullable(),
  tokenSymbol: z56.string().nullable(),
  tokenName: z56.string().nullable(),
  dexscreenerListed: z56.coerce.boolean().nullable(),
  deployerMigrations: z56.coerce.number().default(0),
  socials: z56.object({
    twitter: z56.string().nullable(),
    website: z56.string().nullable(),
    telegram: z56.string().nullable(),
    others: z56.record(z56.unknown()).nullable(),
    uri: z56.string().optional()
  }),
  description: z56.string().nullable(),
  security: SecurityFlagsSchema.nullable(),
  twitterReusesCount: z56.coerce.number().default(0),
  twitterRenameCount: z56.coerce.number().default(0),
  twitterRenameHistory: z56.array(z56.object({
    username: z56.string(),
    lastChecked: z56.string()
  })).default([]),
  perpetuals: PerpDataMarketDetailsOutputSchema.optional(),
  extraData: z56.record(z56.unknown()).optional()
}).merge(HoldersStatsSchema);

// src/v2/market/MarketDetailsSchema.ts
var MarketDetailsItemParams = z57.object({
  blockchain: z57.string().optional(),
  address: z57.string().optional(),
  baseToken: z57.string().optional(),
  currencies: z57.string().optional()
}).transform(({ blockchain, address, baseToken, currencies }) => ({
  blockchain,
  address,
  baseToken,
  currencies: CurrenciesParamSchema.parse(currencies),
  asset: address ? address : undefined
}));
var MarketDetailsParamsSchema = MarketDetailsItemParams;
var MarketDetailsBatchParamsSchema = z57.union([
  z57.array(MarketDetailsItemParams),
  z57.object({
    items: z57.array(MarketDetailsItemParams)
  })
]);
var MarketDetailsResponseSchema = z57.object({
  data: MarketDetailsOutput,
  hostname: z57.string().optional()
});
var MarketDetailsBatchResponseSchema = z57.object({
  payload: z57.array(MarketDetailsOutput.or(z57.object({ error: z57.string().optional() })).nullable()),
  hostname: z57.string().optional()
});
// src/v2/market/MarketOHLCVHistorySchema.ts
import { z as z58 } from "zod";
var booleanFromString = z58.union([z58.boolean(), z58.string()]).optional().default(true).transform((val) => {
  if (typeof val === "boolean")
    return val;
  if (val === "false" || val === "0")
    return false;
  return true;
});
var MarketOHLCVHistoryItemSchema = z58.object({
  address: z58.string(),
  chainId: z58.string(),
  from: DateQuery_default.transform((val) => val ?? 0),
  to: DateQuery_default.transform((val) => val ?? new Date),
  period: z58.string().optional().transform((val) => val ? normalizePeriod(val) : "5m"),
  amount: z58.coerce.number().optional(),
  usd: booleanFromString
});
var MarketOHLCVHistoryParamsSchema = MarketOHLCVHistoryItemSchema.refine((data) => data.address && data.chainId, { message: "address and chainId are required" });
var MarketOHLCVHistoryArraySchema = z58.array(MarketOHLCVHistoryItemSchema).min(1, "At least one market is required").max(10, "Maximum 10 markets per request");
var MarketOHLCVHistoryBatchParamsSchema = z58.union([
  MarketOHLCVHistoryArraySchema,
  z58.object({ markets: MarketOHLCVHistoryArraySchema })
]);
var OHLCVCandleSchema = z58.object({
  v: z58.number(),
  o: z58.number(),
  h: z58.number(),
  l: z58.number(),
  c: z58.number(),
  t: z58.number()
});
var MarketOHLCVHistoryResponseSchema = z58.object({
  data: z58.array(OHLCVCandleSchema)
});
var MarketOHLCVHistoryDataSchema = z58.object({
  ohlcv: z58.array(OHLCVCandleSchema),
  address: z58.string(),
  chainId: z58.string(),
  error: z58.string().optional()
});
var MarketOHLCVHistoryBatchResponseSchema = z58.object({
  data: z58.array(MarketOHLCVHistoryDataSchema)
});
// src/v2/perp/PerpBlocksSchema.ts
import { z as z59 } from "zod";
var PerpBlocksQueryParamsSchema = z59.object({
  exchange: z59.string().optional(),
  chain_id: z59.string().optional(),
  block_number: z59.coerce.number().optional(),
  batch_number: z59.coerce.number().optional(),
  block_status: z59.string().optional(),
  from_block_time: z59.string().optional(),
  to_block_time: z59.string().optional(),
  page: z59.coerce.number().min(1).default(1),
  limit: z59.coerce.number().min(1).max(100).default(25)
});
var PerpBlockSchema = z59.object({
  exchange: z59.string().nullable(),
  chain_id: z59.string().nullable(),
  block_number: z59.number(),
  batch_number: z59.number(),
  block_status: z59.string().nullable(),
  block_time: z59.string(),
  total_transactions: z59.number(),
  logs_count: z59.number(),
  trades_count: z59.number(),
  commit_tx_hash: z59.string().nullable(),
  verify_tx_hash: z59.string().nullable(),
  execute_tx_hash: z59.string().nullable(),
  scraped_at: z59.string()
});
var PerpBlocksResponseSchema = z59.object({
  data: z59.array(PerpBlockSchema),
  pagination: z59.object({
    page: z59.number(),
    totalPages: z59.number(),
    totalItems: z59.number(),
    limit: z59.number()
  })
});
// src/v2/perp/PerpOrderQuotingSchema.ts
import { z as z60 } from "zod";
var SupportedDexSchema = z60.enum(["gains"]);
var TradeTypeSchema = z60.enum(["market", "limit", "stop_limit"]);
var PerpOrderQuotingParamsSchema = z60.object({
  user: z60.string(),
  baseToken: z60.string(),
  quote: z60.string(),
  leverage: z60.coerce.number(),
  long: z60.union([z60.boolean(), z60.string()]).transform((val) => typeof val === "string" ? val === "true" : val),
  collateralAmount: z60.coerce.number(),
  openPrice: z60.coerce.number().optional(),
  tp: z60.coerce.number().optional(),
  sl: z60.coerce.number().optional(),
  tradeType: TradeTypeSchema.optional().default("market"),
  amountRaw: z60.coerce.number().optional(),
  maxSlippageP: z60.coerce.number().optional(),
  chainId: z60.string().optional(),
  dex: SupportedDexSchema.optional(),
  referrer: z60.string().optional()
});
// src/v2/swap/SwapQuotingBatchOutput.ts
import { z as z62 } from "zod";

// src/v2/swap/SwapQuotingOutput.ts
import { z as z61 } from "zod";
$extendZodWithOpenApi(z61);
var SolanaTransactionSchema = z61.object({
  serialized: z61.string(),
  variant: z61.enum(["legacy", "versioned"])
});
var EVMTransactionSchema = z61.object({
  to: z61.string(),
  from: z61.string(),
  data: z61.string(),
  value: z61.string(),
  gasLimit: z61.string().optional(),
  gasPrice: z61.string().optional(),
  maxFeePerGas: z61.string().optional(),
  maxPriorityFeePerGas: z61.string().optional(),
  nonce: z61.number().optional(),
  chainId: z61.number()
});
var TokenInfoSchema = z61.object({
  address: z61.string(),
  name: z61.string().optional(),
  symbol: z61.string().optional(),
  decimals: z61.number(),
  logo: z61.string().nullable().optional()
});
var RouteHopSchema = z61.object({
  poolAddress: z61.string(),
  tokenIn: TokenInfoSchema,
  tokenOut: TokenInfoSchema,
  amountInTokens: z61.string(),
  amountOutTokens: z61.string(),
  exchange: z61.string().optional(),
  poolType: z61.string().optional(),
  feePercentage: z61.number().optional(),
  feeBps: z61.number().optional()
});
var RouteDetailsSchema = z61.object({
  hops: z61.array(RouteHopSchema),
  totalFeePercentage: z61.number().optional(),
  aggregator: z61.string().optional()
});
var IntegrationFeeSchema = z61.object({
  amount: z61.string(),
  percentage: z61.number(),
  wallet: z61.string(),
  deductedFrom: z61.enum(["input", "output"])
});
var BaseDataSchema = z61.object({
  amountOutTokens: z61.string().optional(),
  slippagePercentage: z61.number().optional(),
  amountInUSD: z61.number().optional(),
  amountOutUSD: z61.number().optional(),
  marketImpactPercentage: z61.number().optional(),
  poolFeesPercentage: z61.number().optional(),
  tokenIn: TokenInfoSchema.optional(),
  tokenOut: TokenInfoSchema.optional(),
  requestId: z61.string(),
  details: z61.object({
    route: RouteDetailsSchema.optional(),
    aggregator: z61.string().optional(),
    raw: z61.record(z61.unknown()).optional()
  }).optional(),
  fee: IntegrationFeeSchema.optional()
});
var DataWithSolanaSchema = BaseDataSchema.extend({
  solana: z61.object({
    transaction: SolanaTransactionSchema,
    lastValidBlockHeight: z61.number()
  }),
  evm: z61.never().optional().openapi({ type: "null" })
});
var DataWithEVMSchema = BaseDataSchema.extend({
  evm: z61.object({
    transaction: EVMTransactionSchema
  }),
  solana: z61.never().optional().openapi({ type: "null" })
});
var DataWithErrorSchema = BaseDataSchema.extend({
  solana: z61.never().optional().openapi({ type: "null" }),
  evm: z61.never().optional().openapi({ type: "null" })
});
var SwapQuotingDataSchema = z61.union([DataWithSolanaSchema, DataWithEVMSchema, DataWithErrorSchema]);
var SwapQuotingOutputSchema = z61.object({
  data: SwapQuotingDataSchema,
  error: z61.string().optional()
});

// src/v2/swap/SwapQuotingBatchOutput.ts
var SwapQuotingBatchResultSchema = z62.object({
  data: SwapQuotingDataSchema,
  error: z62.string().optional(),
  index: z62.number()
});
var SwapQuotingBatchOutputSchema = z62.object({
  results: z62.array(SwapQuotingBatchResultSchema),
  totalRequests: z62.number(),
  successCount: z62.number(),
  errorCount: z62.number()
});
// src/v2/swap/SwapQuotingBatchSchema.ts
import { z as z63 } from "zod";
var SwapQuotingBatchItemSchema = z63.object({
  chainId: z63.string(),
  tokenIn: z63.string().min(1, "tokenIn is required"),
  tokenOut: z63.string().min(1, "tokenOut is required"),
  amount: z63.number().positive("Amount must be a positive number").optional(),
  amountRaw: z63.string().regex(/^\d+$/, "amountRaw must be a positive integer string").refine((val) => BigInt(val) > 0n, "amountRaw must be positive").transform((val) => BigInt(val)).optional(),
  slippage: z63.number().min(0).max(100, "Slippage must be between 0 and 100").default(1),
  walletAddress: z63.string().min(1, "walletAddress is required"),
  excludedProtocols: z63.array(z63.string()).optional(),
  onlyProtocols: z63.array(z63.string()).optional(),
  poolAddress: z63.string().optional(),
  onlyRouters: z63.array(z63.enum(["jupiter", "kyberswap", "lifi"])).optional().transform((val) => val?.length ? val : undefined),
  priorityFee: z63.union([
    z63.literal("auto"),
    z63.number().positive(),
    z63.object({
      preset: z63.enum(["low", "medium", "high", "veryHigh"])
    })
  ]).optional(),
  computeUnitLimit: z63.union([z63.literal(true), z63.number().positive()]).optional(),
  jitoTipLamports: z63.number().positive().optional(),
  feePercentage: z63.number().min(0.01).max(99).optional(),
  feeWallet: z63.string().optional(),
  payerAddress: z63.string().optional()
}).refine((data) => data.amount !== undefined !== (data.amountRaw !== undefined), {
  message: "Either amount or amountRaw must be provided (but not both)",
  path: ["amount"]
});
var SwapQuotingBatchBodySchema = z63.object({
  requests: z63.array(SwapQuotingBatchItemSchema).min(1, "At least one request is required").max(30, "Maximum 30 requests allowed per batch")
});
// src/v2/swap/SwapQuotingInstructionsOutput.ts
import { z as z64 } from "zod";
var SolanaInstructionSchema = z64.object({
  programId: z64.string(),
  accounts: z64.array(z64.object({
    pubkey: z64.string(),
    isSigner: z64.boolean(),
    isWritable: z64.boolean()
  })),
  data: z64.string()
});
var SolanaInstructionsSchema = z64.object({
  computeBudgetInstructions: z64.array(SolanaInstructionSchema).optional(),
  setupInstructions: z64.array(SolanaInstructionSchema).optional(),
  swapInstructions: z64.array(SolanaInstructionSchema),
  cleanupInstructions: z64.array(SolanaInstructionSchema).optional(),
  addressLookupTableAddresses: z64.array(z64.string()).optional()
});
var TokenInfoSchema2 = z64.object({
  address: z64.string(),
  name: z64.string().optional(),
  symbol: z64.string().optional(),
  decimals: z64.number(),
  logo: z64.string().nullable().optional()
});
var RouteHopSchema2 = z64.object({
  poolAddress: z64.string(),
  tokenIn: TokenInfoSchema2,
  tokenOut: TokenInfoSchema2,
  amountInTokens: z64.string(),
  amountOutTokens: z64.string(),
  exchange: z64.string().optional(),
  poolType: z64.string().optional(),
  feePercentage: z64.number().optional(),
  feeBps: z64.number().optional()
});
var RouteDetailsSchema2 = z64.object({
  hops: z64.array(RouteHopSchema2),
  totalFeePercentage: z64.number().optional(),
  aggregator: z64.string().optional()
});
var IntegrationFeeSchema2 = z64.object({
  amount: z64.string(),
  percentage: z64.number(),
  wallet: z64.string(),
  deductedFrom: z64.enum(["input", "output"])
});
var SwapQuotingInstructionsDataSchema = z64.object({
  amountOutTokens: z64.string().optional(),
  slippagePercentage: z64.number().optional(),
  amountInUSD: z64.number().optional(),
  amountOutUSD: z64.number().optional(),
  marketImpactPercentage: z64.number().optional(),
  poolFeesPercentage: z64.number().optional(),
  tokenIn: TokenInfoSchema2.optional(),
  tokenOut: TokenInfoSchema2.optional(),
  requestId: z64.string(),
  details: z64.object({
    route: RouteDetailsSchema2.optional(),
    aggregator: z64.string().optional(),
    raw: z64.record(z64.unknown()).optional()
  }).optional(),
  solana: z64.object({
    instructions: SolanaInstructionsSchema,
    lastValidBlockHeight: z64.number(),
    recentBlockhash: z64.string()
  }),
  fee: IntegrationFeeSchema2.optional()
});
var SwapQuotingInstructionsOutputSchema = z64.object({
  data: SwapQuotingInstructionsDataSchema,
  error: z64.string().optional()
});
// src/v2/swap/SwapQuotingSchema.ts
import { z as z65 } from "zod";
var SwapQuotingQuerySchema = z65.object({
  chainId: z65.string(),
  tokenIn: z65.string().min(1, "tokenIn is required"),
  tokenOut: z65.string().min(1, "tokenOut is required"),
  amount: z65.string().optional().transform((val) => {
    if (!val)
      return;
    const parsed = Number.parseFloat(val);
    if (Number.isNaN(parsed) || parsed <= 0) {
      throw new Error("Amount must be a positive number");
    }
    return parsed;
  }),
  amountRaw: z65.string().optional().transform((val) => {
    if (!val)
      return;
    if (!/^\d+$/.test(val)) {
      throw new Error("amountRaw must be a positive integer string");
    }
    const parsed = BigInt(val);
    if (parsed <= 0n) {
      throw new Error("amountRaw must be a positive integer");
    }
    return parsed;
  }),
  slippage: z65.string().optional().default("1").transform((val) => {
    const parsed = Number.parseFloat(val);
    if (Number.isNaN(parsed) || parsed < 0 || parsed > 100) {
      throw new Error("Slippage must be between 0 and 100");
    }
    return parsed;
  }),
  walletAddress: z65.string().min(1, "walletAddress is required"),
  excludedProtocols: z65.string().optional().transform((val) => {
    if (!val)
      return;
    return val.split(",").map((f) => f.trim()).filter((f) => f.length > 0);
  }),
  onlyProtocols: z65.string().optional().transform((val) => {
    if (!val)
      return;
    return val.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
  }),
  poolAddress: z65.string().optional(),
  onlyRouters: z65.string().optional().transform((val) => {
    if (!val)
      return;
    const supportedRouters = ["jupiter", "kyberswap", "lifi"];
    const routers = val.split(",").map((r) => r.trim().toLowerCase()).filter((r) => r.length > 0);
    for (const router of routers) {
      if (!supportedRouters.includes(router)) {
        throw new Error(`Invalid router "${router}". Supported routers: ${supportedRouters.join(", ")}`);
      }
    }
    if (routers.length === 0)
      return;
    return routers;
  }),
  priorityFee: z65.string().optional().transform((val) => {
    if (!val)
      return;
    if (val === "auto")
      return "auto";
    const presets = ["low", "medium", "high", "veryHigh"];
    if (presets.includes(val)) {
      return { preset: val };
    }
    const numValue = Number.parseInt(val, 10);
    if (!Number.isNaN(numValue) && numValue > 0) {
      return numValue;
    }
    throw new Error(`Invalid priorityFee "${val}". Must be 'auto', a preset (low, medium, high, veryHigh), or a positive number`);
  }),
  computeUnitLimit: z65.string().optional().transform((val) => {
    if (!val)
      return;
    if (val === "true")
      return true;
    const numValue = Number.parseInt(val, 10);
    if (!Number.isNaN(numValue) && numValue > 0) {
      return numValue;
    }
    throw new Error(`Invalid computeUnitLimit "${val}". Must be 'true' or a positive number`);
  }),
  jitoTipLamports: z65.string().optional().transform((val) => {
    if (!val)
      return;
    const numValue = Number.parseInt(val, 10);
    if (!Number.isNaN(numValue) && numValue > 0) {
      return numValue;
    }
    throw new Error(`Invalid jitoTipLamports "${val}". Must be a positive number`);
  }),
  feePercentage: z65.string().optional().transform((val) => {
    if (!val)
      return;
    const numValue = Number.parseFloat(val);
    if (Number.isNaN(numValue) || numValue < 0.01 || numValue > 99) {
      throw new Error("feePercentage must be between 0.01 and 99");
    }
    return numValue;
  }),
  feeWallet: z65.string().optional(),
  payerAddress: z65.string().optional()
}).refine((data) => {
  const hasAmount = data.amount !== undefined;
  const hasAmountRaw = data.amountRaw !== undefined;
  return hasAmount !== hasAmountRaw;
}, {
  message: "Either amount or amountRaw must be provided (but not both)",
  path: ["amount"]
});
// src/v2/swap/SwapSendOutput.ts
import { z as z66 } from "zod";
var SwapSendResponseSchema = z66.object({
  data: z66.object({
    success: z66.boolean(),
    transactionHash: z66.string().optional(),
    requestId: z66.string()
  }),
  error: z66.string().optional()
});
// src/v2/swap/SwapSendSchema.ts
import { z as z67 } from "zod";
var SwapSendSchema = z67.object({
  chainId: z67.string(),
  signedTransaction: z67.string().min(1, "signedTransaction is required").transform((val) => {
    try {
      return Buffer.from(val, "base64");
    } catch {
      throw new Error("signedTransaction must be a valid base64 string");
    }
  })
});
// src/v2/token/TokenDetailsSchema.ts
import { z as z68 } from "zod";
var TokenDetailsItemParams = z68.object({
  blockchain: z68.string().optional(),
  address: z68.string().optional(),
  currencies: CurrenciesParamSchema,
  instanceTracking: z68.preprocess((val) => {
    if (val === "true")
      return true;
    if (val === "false")
      return false;
    return val;
  }, z68.boolean().optional())
});
var TokenDetailsParamsSchema = TokenDetailsItemParams;
var TokenDetailsBatchParamsSchema = z68.union([
  z68.array(TokenDetailsItemParams),
  z68.object({
    items: z68.array(TokenDetailsItemParams),
    instanceTracking: z68.preprocess((val) => {
      if (val === "true")
        return true;
      if (val === "false")
        return false;
      return val;
    }, z68.boolean().optional())
  })
]);
var TokenDetailsResponseSchema = z68.object({
  data: TokenDetailsOutput,
  hostname: z68.string().optional()
});
var TokenDetailsBatchResponseSchema = z68.object({
  payload: z68.array(TokenDetailsOutput.or(z68.object({ error: z68.string().optional() })).nullable()),
  hostname: z68.string().optional()
});
// src/v2/token/TokenKlineBsPointSchema.ts
import { z as z69 } from "zod";
var TokenKlineBsPointParamsSchema = z69.object({
  blockchain: z69.string(),
  address: z69.string(),
  bar: z69.string().transform((val) => normalizePeriod(val ?? "5m", "5m")),
  fromDate: DateQuery_default.transform((val) => val ?? undefined),
  toDate: DateQuery_default.transform((val) => val ?? undefined),
  transactionSenderAddresses: stringOrArray.default([]),
  labels: stringOrArray.optional().transform((val) => val?.map((label) => String(label).trim()).filter((label) => label.length > 0) ?? [])
});
var TokenKlineBsBubblePoint = z69.object({
  volumeBuyToken: z69.string(),
  buys: z69.string(),
  avgBuyPriceUSD: z69.string(),
  volumeBuy: z69.string(),
  volumeSellToken: z69.string(),
  sells: z69.string(),
  avgSellPriceUSD: z69.string(),
  volumeSell: z69.string(),
  fromAddress: z69.string(),
  fromAddressTag: z69.string(),
  time: z69.string()
});
var TokenKlineBsPointResponseSchema = z69.object({
  data: z69.array(TokenKlineBsBubblePoint)
});
// src/v2/token/TokenMarketsSchema.ts
import { z as z70 } from "zod";
var DEFAULT_MARKETS_RES_LIMIT = 10;
var MARKETS_MAX__RES_LIMIT = 25;
var TokenMarketsParamsSchema = z70.object({
  blockchain: z70.string().optional(),
  address: z70.string(),
  limit: z70.coerce.number().min(1).max(MARKETS_MAX__RES_LIMIT).default(DEFAULT_MARKETS_RES_LIMIT)
});
var TokenMarketsOutput = z70.array(MarketDetailsOutput);
var TokenMarketsResponseSchema = z70.object({
  data: TokenMarketsOutput,
  totalCount: z70.number()
});
// src/v2/token/TokenOHLCVHistorySchema.ts
import { z as z71 } from "zod";
var booleanFromString2 = z71.union([z71.boolean(), z71.string()]).optional().default(true).transform((val) => {
  if (typeof val === "boolean")
    return val;
  if (val === "false" || val === "0")
    return false;
  return true;
});
var TokenOHLCVHistoryItemSchema = z71.object({
  address: z71.string(),
  chainId: z71.string(),
  from: DateQuery_default.transform((val) => val ?? 0),
  to: DateQuery_default.transform((val) => val ?? new Date),
  period: z71.string().optional().transform((val) => val ? normalizePeriod(val) : "5m"),
  amount: z71.coerce.number().optional(),
  usd: booleanFromString2
});
var TokenOHLCVHistoryParamsSchema = TokenOHLCVHistoryItemSchema.refine((data) => data.address && data.chainId, { message: "address and chainId are required" });
var TokenOHLCVHistoryArraySchema = z71.array(TokenOHLCVHistoryItemSchema).min(1, "At least one token is required").max(10, "Maximum 10 tokens per request");
var TokenOHLCVHistoryBatchParamsSchema = z71.union([
  TokenOHLCVHistoryArraySchema,
  z71.object({ tokens: TokenOHLCVHistoryArraySchema })
]);
var OHLCVCandleSchema2 = z71.object({
  v: z71.number(),
  o: z71.number(),
  h: z71.number(),
  l: z71.number(),
  c: z71.number(),
  t: z71.number()
});
var TokenOHLCVHistoryResponseSchema = z71.object({
  data: z71.array(OHLCVCandleSchema2)
});
var TokenOHLCVHistoryDataSchema = z71.object({
  ohlcv: z71.array(OHLCVCandleSchema2),
  address: z71.string(),
  chainId: z71.string(),
  error: z71.string().optional()
});
var TokenOHLCVHistoryBatchResponseSchema = z71.object({
  data: z71.array(TokenOHLCVHistoryDataSchema)
});
// src/v2/token/TokenPositionsSchema.ts
import { z as z72 } from "zod";
var TokenPositionsParamsSchema = z72.object({
  blockchain: z72.string().optional(),
  address: z72.string().optional(),
  force: z72.coerce.boolean().optional().default(false),
  label: z72.nativeEnum(Tags).optional(),
  limit: z72.coerce.number().optional().default(100),
  offset: z72.coerce.number().optional().default(0),
  walletAddresses: stringOrArray.optional()
});
var TokenPositionOutput = z72.object({
  chainId: z72.string(),
  walletAddress: z72.string(),
  tokenAddress: z72.string(),
  tokenAmount: z72.string(),
  tokenAmountRaw: z72.string(),
  tokenAmountUSD: z72.string(),
  percentageOfTotalSupply: z72.string(),
  pnlUSD: z72.string(),
  realizedPnlUSD: z72.string(),
  unrealizedPnlUSD: z72.string(),
  totalPnlUSD: z72.string(),
  buys: z72.number(),
  sells: z72.number(),
  volumeBuyToken: z72.string(),
  volumeSellToken: z72.string(),
  volumeBuyUSD: z72.string(),
  volumeSellUSD: z72.string(),
  avgBuyPriceUSD: z72.string(),
  avgSellPriceUSD: z72.string(),
  walletFundAt: z72.date().nullable(),
  lastActivityAt: z72.date().nullable(),
  firstTradeAt: z72.date().nullable(),
  lastTradeAt: z72.date().nullable(),
  labels: z72.array(z72.string()).nullable().optional().default([]),
  fundingInfo: z72.object({
    from: z72.string().nullable(),
    date: z72.date().nullable(),
    chainId: z72.string().nullable(),
    txHash: z72.string().nullable(),
    amount: z72.string().nullable(),
    fromWalletLogo: z72.string().nullable(),
    fromWalletTag: z72.string().nullable()
  })
});
var TokenPositionsResponseSchema = z72.object({
  data: z72.array(TokenPositionOutput)
});
// src/v2/token/TokenPriceSchema.ts
import { z as z73 } from "zod";
var TokenPriceItemParams = z73.object({
  blockchain: z73.string().optional(),
  address: z73.string().optional()
});
var TokenPriceParamsSchema = TokenPriceItemParams;
var TokenPriceBatchParamsSchema = z73.union([
  z73.array(TokenPriceItemParams),
  z73.object({
    items: z73.array(TokenPriceItemParams)
  })
]);
var TokenPriceItemResponseSchema = z73.object({
  name: z73.string().nullable(),
  symbol: z73.string().nullable(),
  logo: z73.string().nullable(),
  priceUSD: z73.number().nullable(),
  marketCapUSD: z73.number().nullable(),
  marketCapDilutedUSD: z73.number().nullable(),
  liquidityUSD: z73.number().nullable(),
  liquidityMaxUSD: z73.number().nullable()
});
var TokenPriceResponseSchema = z73.object({
  data: TokenPriceItemResponseSchema
});
var TokenPriceBatchResponseSchema = z73.object({
  payload: z73.array(TokenPriceItemResponseSchema.or(z73.object({ error: z73.string().optional() })).nullable())
});
// src/v2/token/TokenSecurityOutput.ts
import { z as z74 } from "zod";
var StaticAnalysisStatusEnum = z74.enum([
  "completed",
  "pending",
  "not_available",
  "insufficient_liquidity",
  "not_evm"
]);
var TokenSecurityOutput = z74.object({
  address: z74.string(),
  chainId: z74.string(),
  contractHoldingsPercentage: z74.number().nullable(),
  contractBalanceRaw: z74.string().nullable(),
  burnedHoldingsPercentage: z74.number().nullable(),
  totalBurnedBalanceRaw: z74.string().nullable(),
  buyFeePercentage: z74.number(),
  sellFeePercentage: z74.number(),
  maxWalletAmountRaw: z74.string().nullable(),
  maxSellAmountRaw: z74.string().nullable(),
  maxBuyAmountRaw: z74.string().nullable(),
  maxTransferAmountRaw: z74.string().nullable(),
  isLaunchpadToken: z74.boolean().nullable(),
  top10HoldingsPercentage: z74.number().nullable(),
  top50HoldingsPercentage: z74.number().nullable(),
  top100HoldingsPercentage: z74.number().nullable(),
  top200HoldingsPercentage: z74.number().nullable(),
  isMintable: z74.boolean().nullable(),
  isFreezable: z74.boolean().nullable(),
  proTraderVolume24hPercentage: z74.number().nullable(),
  transferPausable: z74.boolean().nullable(),
  isBlacklisted: z74.boolean().nullable(),
  isHoneypot: z74.boolean().nullable(),
  isNotOpenSource: z74.boolean().nullable(),
  renounced: z74.boolean().nullable(),
  locked: z74.string().nullable(),
  isWhitelisted: z74.boolean().nullable(),
  balanceMutable: z74.boolean().nullable(),
  lowLiquidity: z74.string().nullable(),
  burnRate: z74.string().nullable(),
  modifyableTax: z74.boolean().nullable(),
  selfDestruct: z74.boolean().nullable(),
  staticAnalysisStatus: StaticAnalysisStatusEnum.nullable(),
  staticAnalysisDate: z74.string().nullable()
});
var TokenSecurityResponseSchema = z74.object({
  data: TokenSecurityOutput,
  hostname: z74.string().optional()
});
// src/v2/token/TokenSecurityQuery.ts
import { z as z75 } from "zod";
var TokenSecurityQuery = z75.object({
  blockchain: z75.string().optional(),
  address: z75.string(),
  instanceTracking: z75.preprocess((val) => {
    if (val === "true")
      return true;
    if (val === "false")
      return false;
    return val;
  }, z75.boolean().optional()),
  _forceAnalysis: z75.preprocess((val) => {
    if (val === "true")
      return true;
    if (val === "false")
      return false;
    return val;
  }, z75.boolean().optional())
});
// src/v2/token/TokenTradesSchema.ts
import { z as z76 } from "zod";
var TokenTradesParamsSchema = z76.object({
  blockchain: z76.string().optional(),
  address: z76.string().optional(),
  offset: z76.coerce.number().default(0),
  limit: z76.coerce.number().optional().default(10),
  sortOrder: z76.enum(["asc", "desc"]).default("desc"),
  mode: z76.enum(["pair", "asset"]).default("pair"),
  label: z76.nativeEnum(Tags).optional(),
  swapTypes: stringOrArray.optional().transform((val) => val?.filter((v) => Object.values(SwapType).includes(v))),
  swapSenderAddresses: stringOrArray.optional().refine((arr) => !arr || arr.length <= 25, {
    message: "Maximum 25 swap sender addresses allowed"
  }),
  transactionSenderAddresses: stringOrArray.optional().refine((arr) => !arr || arr.length <= 25, {
    message: "Maximum 25 transaction sender addresses allowed"
  }),
  maxAmountUSD: z76.coerce.number().optional(),
  minAmountUSD: z76.coerce.number().optional(),
  fromDate: DateQuery_default.transform((val) => val ?? undefined),
  toDate: DateQuery_default.transform((val) => val ?? undefined)
});
var TokenTradeOutput = z76.object({
  id: z76.string(),
  operation: z76.string(),
  type: z76.string(),
  baseTokenAmount: z76.number(),
  baseTokenAmountRaw: z76.string(),
  baseTokenAmountUSD: z76.number(),
  quoteTokenAmount: z76.number(),
  quoteTokenAmountRaw: z76.string(),
  quoteTokenAmountUSD: z76.number(),
  preBalanceBaseToken: z76.string().nullable().optional(),
  preBalanceQuoteToken: z76.string().nullable().optional(),
  postBalanceBaseToken: z76.string().nullable().optional(),
  postBalanceQuoteToken: z76.string().nullable().optional(),
  date: z76.number(),
  swapSenderAddress: z76.string(),
  transactionSenderAddress: z76.string(),
  blockchain: z76.string(),
  transactionHash: z76.string(),
  marketAddress: z76.string(),
  marketAddresses: z76.array(z76.string()).optional(),
  baseTokenPriceUSD: z76.number(),
  quoteTokenPriceUSD: z76.number(),
  labels: z76.array(z76.string()).nullable().optional().default([]),
  baseToken: TokenDetailsOutput.optional(),
  quoteToken: TokenDetailsOutput.optional(),
  totalFeesUSD: z76.number().nullable().optional(),
  gasFeesUSD: z76.number().nullable().optional(),
  platformFeesUSD: z76.number().nullable().optional(),
  mevFeesUSD: z76.number().nullable().optional()
});
var TokenTradeResponseSchema = z76.object({
  data: z76.array(TokenTradeOutput)
});
var SingleTokenTradeResponseSchema = z76.object({
  data: TokenTradeOutput
});
var FormattedTokenTradeOutput = z76.object({
  labels: z76.array(z76.string()).nullable().optional().default([]),
  pair: z76.string(),
  date: z76.number(),
  tokenPrice: z76.number(),
  tokenPriceVs: z76.number(),
  tokenAmount: z76.number(),
  tokenAmountVs: z76.number(),
  tokenAmountUsd: z76.number(),
  tokenAmountVsUsd: z76.number(),
  type: z76.string(),
  operation: z76.string(),
  blockchain: z76.string(),
  hash: z76.string(),
  sender: z76.string(),
  tokenAmountRaw: z76.string(),
  tokenAmountRawVs: z76.string(),
  totalFeesUSD: z76.number().nullable().optional(),
  gasFeesUSD: z76.number().nullable().optional(),
  platformFeesUSD: z76.number().nullable().optional(),
  mevFeesUSD: z76.number().nullable().optional()
});
var FormattedTokenTradeResponseSchema = z76.object({
  data: z76.array(FormattedTokenTradeOutput)
});
var TokenTradeParamsSchema = z76.object({
  blockchain: z76.string().optional(),
  transactionHash: z76.string().min(1, "Transaction hash is required")
});
var TokenTradeParamsSchemaOpenAPI = z76.object({
  blockchain: z76.string().describe("Blockchain name or chain ID"),
  transactionHash: z76.string().min(1).describe("Transaction hash")
});
var TokenTradeOutputOpenAPI = z76.object({
  id: z76.string(),
  operation: z76.string(),
  type: z76.string(),
  baseTokenAmount: z76.number(),
  baseTokenAmountRaw: z76.string(),
  baseTokenAmountUSD: z76.number(),
  quoteTokenAmount: z76.number(),
  quoteTokenAmountRaw: z76.string(),
  quoteTokenAmountUSD: z76.number(),
  date: z76.number(),
  swapSenderAddress: z76.string(),
  transactionSenderAddress: z76.string(),
  blockchain: z76.string(),
  transactionHash: z76.string(),
  marketAddress: z76.string(),
  marketAddresses: z76.array(z76.string()).optional(),
  baseTokenPriceUSD: z76.number(),
  quoteTokenPriceUSD: z76.number(),
  labels: z76.array(z76.string()).nullable().optional().default([]),
  baseToken: TokenDetailsOutput.optional(),
  quoteToken: TokenDetailsOutput.optional(),
  totalFeesUSD: z76.number().nullable().optional(),
  gasFeesUSD: z76.number().nullable().optional(),
  platformFeesUSD: z76.number().nullable().optional(),
  mevFeesUSD: z76.number().nullable().optional()
});
var SingleTokenTradeResponseSchemaOpenAPI = z76.object({
  data: TokenTradeOutputOpenAPI
});
// src/v2/wallet/WalleAnalysisQuerySchema.ts
import { z as z77 } from "zod";
var WalletAnalysisParamsSchema = z77.object({
  wallet: z77.string().min(1, "Wallet address is required"),
  blockchain: z77.string().optional(),
  period: z77.string().optional().default("7d").transform((val) => val?.toLowerCase()).refine((val) => ["1d", "7d", "30d", "90d"].includes(val), {
    message: "Period must be one of: 1d, 7d, 30d, 90d"
  })
});
var WalletAnalysisParamsSchemaOpenAPI = z77.object({
  wallet: z77.string().min(1).describe("Wallet address to analyze"),
  blockchain: z77.string().optional().describe("Blockchain ID (e.g., ethereum, base, solana:solana)"),
  period: z77.string().optional().default("7d").describe("Analysis period: 1d, 7d, 30d, or 90d")
});
var WalletAnalysisResponseSchema = z77.object({
  data: z77.object({
    winRateDistribution: z77.object({
      ">500%": z77.number(),
      "200%-500%": z77.number(),
      "50%-200%": z77.number(),
      "0%-50%": z77.number(),
      "-50%-0%": z77.number(),
      "<-50%": z77.number()
    }),
    marketCapDistribution: z77.object({
      ">1000M": z77.number(),
      ">100M": z77.number(),
      "10M-100M": z77.number(),
      "1M-10M": z77.number(),
      "100k-1M": z77.number(),
      "<100k": z77.number()
    }),
    periodTimeframes: z77.array(z77.object({
      date: z77.date(),
      realized: z77.number()
    })),
    stat: z77.object({
      totalValue: z77.number(),
      periodTotalPnlUSD: z77.number(),
      periodRealizedPnlUSD: z77.number(),
      periodRealizedRate: z77.number(),
      periodActiveTokensCount: z77.number(),
      periodWinCount: z77.number(),
      fundingInfo: z77.object({
        from: z77.string().nullable(),
        date: z77.date().nullable(),
        chainId: z77.string().nullable(),
        txHash: z77.string().nullable(),
        amount: z77.string().nullable(),
        fromWalletLogo: z77.string().nullable(),
        fromWalletTag: z77.string().nullable()
      }),
      periodVolumeBuy: z77.number(),
      periodVolumeSell: z77.number(),
      periodBuys: z77.number(),
      periodSells: z77.number(),
      nativeBalance: z77.object({
        rawBalance: z77.string(),
        formattedBalance: z77.number(),
        assetId: z77.number().nullable(),
        chainId: z77.string(),
        address: z77.string(),
        decimals: z77.number(),
        name: z77.string(),
        symbol: z77.string(),
        logo: z77.string().nullable(),
        price: z77.number(),
        balanceUSD: z77.number()
      }).nullable(),
      periodBuyTokens: z77.number(),
      periodSellTokens: z77.number(),
      periodTradingTokens: z77.number(),
      holdingTokensCount: z77.number(),
      holdingDuration: z77.number(),
      tradingTimeFrames: z77.number(),
      winRealizedPnl: z77.number(),
      winRealizedPnlRate: z77.number(),
      winToken: z77.object({
        address: z77.string(),
        chainId: z77.string(),
        name: z77.string(),
        symbol: z77.string(),
        logo: z77.string().nullable(),
        decimals: z77.number()
      }).nullable()
    }),
    labels: z77.array(z77.string())
  })
});
var WalletAnalysisResponseSchemaOpenAPI = z77.object({
  data: z77.object({
    winRateDistribution: z77.object({
      ">500%": z77.number(),
      "200%-500%": z77.number(),
      "50%-200%": z77.number(),
      "0%-50%": z77.number(),
      "-50%-0%": z77.number(),
      "<-50%": z77.number()
    }),
    marketCapDistribution: z77.object({
      ">1000M": z77.number(),
      ">100M": z77.number(),
      "10M-100M": z77.number(),
      "1M-10M": z77.number(),
      "100k-1M": z77.number(),
      "<100k": z77.number()
    }),
    periodTimeframes: z77.array(z77.object({
      date: z77.string(),
      realized: z77.number()
    })),
    stat: z77.object({
      totalValue: z77.number(),
      periodTotalPnlUSD: z77.number(),
      periodRealizedPnlUSD: z77.number(),
      periodRealizedRate: z77.number(),
      periodActiveTokensCount: z77.number(),
      periodWinCount: z77.number(),
      fundingInfo: z77.object({
        from: z77.string().nullable(),
        date: z77.string().nullable(),
        chainId: z77.string().nullable(),
        txHash: z77.string().nullable(),
        amount: z77.string().nullable(),
        fromWalletLogo: z77.string().nullable(),
        fromWalletTag: z77.string().nullable()
      }),
      periodVolumeBuy: z77.number(),
      periodVolumeSell: z77.number(),
      periodBuys: z77.number(),
      periodSells: z77.number(),
      nativeBalance: z77.object({
        rawBalance: z77.string(),
        formattedBalance: z77.number(),
        assetId: z77.number().nullable(),
        chainId: z77.string(),
        address: z77.string(),
        decimals: z77.number(),
        name: z77.string(),
        symbol: z77.string(),
        logo: z77.string().nullable(),
        price: z77.number(),
        balanceUSD: z77.number()
      }).nullable(),
      periodBuyTokens: z77.number(),
      periodSellTokens: z77.number(),
      periodTradingTokens: z77.number(),
      holdingTokensCount: z77.number(),
      holdingDuration: z77.number(),
      tradingTimeFrames: z77.number(),
      winRealizedPnl: z77.number(),
      winRealizedPnlRate: z77.number(),
      winToken: z77.object({
        address: z77.string(),
        chainId: z77.string(),
        name: z77.string(),
        symbol: z77.string(),
        logo: z77.string().nullable(),
        decimals: z77.number()
      }).nullable()
    }),
    labels: z77.array(z77.string())
  })
});
// src/v2/wallet/WalleFundingQuerySchema.ts
import { z as z78 } from "zod";
var WalletFundingParamsSchema = z78.object({
  wallet: z78.string().min(1, "Wallet address is required")
});
var WalletFundingResponseSchema = z78.object({
  data: z78.object({
    from: z78.string().nullable(),
    chainId: z78.string().nullable(),
    date: z78.date().nullable(),
    txHash: z78.string().nullable(),
    amount: z78.string().nullable(),
    fromWalletLogo: z78.string().nullable(),
    fromWalletTag: z78.string().nullable()
  })
});
// src/v2/wallet/WalletActivityV2Schema.ts
import { z as z79 } from "zod";
var WalletActivityV2ParamsSchema = z79.object({
  wallet: z79.string(),
  blockchains: z79.string().optional().transform((val) => {
    if (val) {
      return val.split(",").map((b) => b.trim()).filter((b) => b.length > 0);
    }
    return [];
  }),
  blacklist: z79.string().optional().transform((val) => val ? val.split(",").map((addr) => addr.trim().toLowerCase()) : []),
  offset: z79.coerce.number().optional().default(0),
  limit: z79.coerce.number().optional().default(100),
  order: z79.enum(["asc", "desc"]).optional().default("desc"),
  pagination: z79.union([z79.boolean(), z79.string()]).optional().transform((val) => val === true || val === "true").default(false),
  unlistedAssets: z79.union([z79.boolean(), z79.string()]).optional().transform((val) => val === true || val === "true").default(true),
  filterSpam: z79.union([z79.boolean(), z79.string()]).optional().transform((val) => val === true || val === "true").default(true),
  backfillTransfers: z79.union([z79.boolean(), z79.string()]).optional().transform((val) => val === true || val === "true").default(false),
  backfillBalances: z79.union([z79.boolean(), z79.string()]).optional().transform((val) => val === true || val === "true").default(false),
  cursor_hash: z79.string().optional(),
  cursor_direction: z79.enum(["before", "after"]).optional().default("before"),
  withTokens: z79.union([z79.boolean(), z79.string()]).optional().transform((val) => val === true || val === "true").default(false)
});
var ActivityAssetSchema = z79.object({
  id: z79.number().nullable(),
  name: z79.string(),
  symbol: z79.string(),
  decimals: z79.number(),
  totalSupply: z79.number(),
  circulatingSupply: z79.number(),
  price: z79.number(),
  liquidity: z79.number(),
  priceChange24hPercent: z79.number(),
  marketCapUsd: z79.number(),
  logo: z79.string().nullable(),
  contract: z79.string()
});
var WalletActivityV2TransactionActivitySchema = z79.object({
  model: z79.enum(["swap", "transfer"]),
  swapType: z79.enum(["REGULAR", "MEV", "SANDWICHED_MEV", "DEPOSIT", "WITHDRAW"]).optional(),
  swapRawAmountOut: z79.number().optional(),
  swapRawAmountIn: z79.number().optional(),
  swapAmountOut: z79.number().optional(),
  swapAmountIn: z79.number().optional(),
  swapPriceUsdTokenOut: z79.number().optional(),
  swapPriceUsdTokenIn: z79.number().optional(),
  swapAmountUsd: z79.number().optional(),
  swapTransactionSenderAddress: z79.string().optional(),
  swapBaseAddress: z79.string().optional(),
  swapQuoteAddress: z79.string().optional(),
  swapAmountQuote: z79.number().optional(),
  swapAmountBase: z79.number().optional(),
  swapAssetIn: ActivityAssetSchema.optional(),
  swapAssetOut: ActivityAssetSchema.optional(),
  transferRawAmount: z79.string().optional(),
  transferAmount: z79.number().optional(),
  transferAmountUsd: z79.number().optional(),
  transferType: z79.enum(["VAULT_DEPOSIT", "VAULT_WITHDRAW", "VAULT_UNSTAKE", "TOKEN_IN", "TOKEN_OUT", "NATIVE_IN", "NATIVE_OUT"]).optional(),
  transferFromAddress: z79.string().optional().nullable(),
  transferToAddress: z79.string().optional().nullable(),
  transferAsset: ActivityAssetSchema.optional()
});
var WalletActivityV2TransactionSchema = z79.object({
  chainId: z79.string(),
  txDateMs: z79.number(),
  txDateIso: z79.string(),
  txHash: z79.string(),
  txRawFeesNative: z79.string(),
  txFeesNativeUsd: z79.number(),
  txBlockNumber: z79.number(),
  txIndex: z79.number(),
  txAction: z79.string().optional().nullable(),
  actions: z79.array(WalletActivityV2TransactionActivitySchema)
});
var WalletActivityV2OutputDataSchema = z79.array(WalletActivityV2TransactionSchema);
var WalletActivityV2OutputPaginationSchema = z79.object({
  page: z79.number(),
  offset: z79.number(),
  limit: z79.number(),
  pageEntries: z79.number()
});
var WalletActivityV2ResponseSchema = z79.object({
  data: WalletActivityV2OutputDataSchema,
  pagination: WalletActivityV2OutputPaginationSchema,
  backfillStatus: z79.enum(["processed", "processing", "pending"]).optional(),
  tokens: z79.array(TokenDetailsOutput).optional()
});
// src/v2/wallet/WalletDefiPositionsSchema.ts
import { z as z80 } from "zod";
var walletAddressSchema = z80.string().min(32, "Invalid wallet address").max(44, "Invalid wallet address").or(z80.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid EVM wallet address"));
var WalletDefiPositionsParamsSchema = z80.object({
  wallet: walletAddressSchema.describe("Wallet address (EVM or Solana)"),
  blockchains: z80.string().describe('Blockchain to fetch positions from (e.g., "solana", "ethereum")')
});
// src/v2/wallet/WalletDeployerSchema.ts
var WalletV2DeployerParamsSchema = WalletDeployerQuery;
var WalletV2DeployerResponseSchema = walletDeployerOutputSchema;
// src/v2/wallet/WalletPerpsPositionsSchema.ts
import { z as z81 } from "zod";
var ExchangesIds = z81.enum(["gains", "hyperliquid", "gte", "lighter", "drift"]);
var tpSlSchema = z81.object({ size: z81.bigint(), price: z81.number(), id: z81.number() });
var PerpsPositionSchema = z81.object({
  id: z81.string(),
  entryPriceQuote: z81.number(),
  currentLeverage: z81.number(),
  amountUSD: z81.number(),
  amountRaw: z81.bigint(),
  side: z81.enum(["BUY", "SELL"]),
  liquidationPriceQuote: z81.number(),
  currentPriceQuote: z81.number(),
  realizedPnlUSD: z81.number(),
  unrealizedPnlUSD: z81.number(),
  realizedPnlPercent: z81.number(),
  unrealizedPnlPercent: z81.number(),
  tp: z81.array(tpSlSchema),
  sl: z81.array(tpSlSchema),
  marketId: z81.string(),
  exchange: ExchangesIds,
  feesOpeningUSD: z81.number(),
  feesClosingUSD: z81.number(),
  feesFundingUSD: z81.number(),
  openDate: z81.date(),
  lastUpdate: z81.date(),
  address: z81.string(),
  chainId: z81.string(),
  collateralAsset: z81.string()
});
var PerpsPositionNonExecutedSchema = PerpsPositionSchema.extend({
  type: z81.enum(["STOP", "LIMIT"])
});
var WalletPerpsPositionsResponseSchema = z81.object({
  data: z81.array(PerpsPositionSchema)
});
var WalletPerpsPositionsNonExecutedResponseSchema = z81.object({
  data: z81.array(PerpsPositionNonExecutedSchema)
});
// src/v2/wallet/WalletPositionsSchema.ts
import { z as z82 } from "zod";
var WalletPositionsParamsSchema = z82.object({
  wallet: z82.string(),
  blockchain: z82.string().optional(),
  backfillPositions: z82.union([z82.boolean(), z82.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val),
  backfillSwapsAndPositions: z82.union([z82.boolean(), z82.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val)
});
var SinglePositionQuery = z82.object({
  wallet: z82.string(),
  asset: z82.string(),
  blockchain: z82.string()
});
var SinglePositionItemSchema = z82.object({
  wallet: z82.string(),
  asset: z82.string(),
  blockchain: z82.string()
});
var SinglePositionBatchParamsSchema = z82.union([
  z82.array(SinglePositionItemSchema),
  z82.object({
    items: z82.array(SinglePositionItemSchema),
    instanceTracking: z82.preprocess((val) => {
      if (val === "true")
        return true;
      if (val === "false")
        return false;
      return val;
    }, z82.boolean().optional())
  })
]);
var WalletPositionsResponseSchema = z82.object({
  data: z82.array(tokenPositionSchema)
});
var singlePositionOutputSchema = z82.object({
  data: tokenPositionSchema
});
var batchPositionItemSchema = tokenPositionSchema.extend({
  wallet: z82.string()
});
var SinglePositionBatchResponseSchema = z82.object({
  payload: z82.array(batchPositionItemSchema.or(z82.object({ error: z82.string().optional(), wallet: z82.string().optional() })).nullable()),
  hostname: z82.string().optional()
});
// src/v2/wallet/WalletTokenBalancesSchema.ts
import { z as z83 } from "zod";
var tokenHoldingSchema = z83.object({
  token: z83.object({
    address: z83.string(),
    chainId: z83.string(),
    name: z83.string().nullable(),
    symbol: z83.string().nullable(),
    logo: z83.string().nullable(),
    decimals: z83.coerce.number().default(0),
    holdersCount: z83.coerce.number().default(0),
    deployer: z83.string().nullable(),
    website: z83.string().nullable(),
    x: z83.string().nullable(),
    telegram: z83.string().nullable(),
    description: z83.string().nullable(),
    security: SecurityFlagsSchema.nullable()
  }),
  balance: z83.number(),
  rawBalance: z83.string(),
  lamports: z83.string().nullable().optional()
});
var WalletHoldingsResponseSchema = z83.object({
  data: z83.array(tokenHoldingSchema)
});
// src/wss/aggregated-feed/FeedSchema.ts
import { z as z84 } from "zod";
var FeedPayloadSchema = z84.discriminatedUnion("kind", [
  z84.object({
    kind: z84.literal("asset_ids"),
    asset_ids: z84.array(z84.number()).optional(),
    quote_id: z84.number().optional().nullable()
  }),
  z84.object({
    kind: z84.literal("address"),
    tokens: z84.array(z84.object({
      blockchain: z84.string(),
      address: z84.string()
    })),
    quote: z84.object({
      address: z84.string(),
      blockchain: z84.string()
    }).optional()
  }),
  z84.object({
    kind: z84.literal("all")
  })
]);
var FeedAssetIdSchema = z84.object({
  asset_ids: z84.array(z84.number()).optional(),
  quote_id: z84.number().optional().nullable()
});
var FeedTokenSchema = z84.object({
  tokens: z84.array(z84.object({
    blockchain: z84.string(),
    address: z84.string()
  })),
  quote: z84.object({
    address: z84.string(),
    blockchain: z84.string()
  }).optional()
});
// src/wss/BalancePayloadSchema.ts
import { z as z85 } from "zod";
var BalanceItemSchema = z85.object({
  wallet: z85.string(),
  token: z85.string(),
  blockchain: z85.string()
});
var BalancePayloadSchema = z85.object({
  items: z85.array(BalanceItemSchema),
  subscriptionId: z85.string().optional(),
  subscriptionTracking: z85.union([z85.boolean(), z85.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val)
});
// src/wss/FastTradePayloadSchema.ts
import { z as z86 } from "zod";
var FastTradesPayloadSchema = z86.object({
  assetMode: z86.coerce.boolean().default(false),
  items: z86.array(z86.object({
    address: z86.string(),
    blockchain: z86.string()
  })),
  subscriptionId: z86.string().optional(),
  subscriptionTracking: z86.union([z86.boolean(), z86.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val)
});
// src/wss/FundingPayloadSchema.ts
import { z as z87 } from "zod";
var FundingPayloadSchema = z87.object({
  symbol: z87.string(),
  quote: z87.string().optional(),
  exchange: z87.string().optional().transform((val) => {
    const validExchanges = ["binance", "bybit", "hyperliquid", "deribit", "okx", "gate"];
    if (!val)
      return validExchanges;
    const requestedExchanges = val.split(",").map((ex) => ex.trim().toLowerCase()).filter((ex) => validExchanges.includes(ex));
    return requestedExchanges.length > 0 ? requestedExchanges : validExchanges;
  }),
  interval: z87.number().optional().default(5),
  subscriptionId: z87.string().optional(),
  subscriptionTracking: z87.string().optional()
});
// src/wss/HoldersPayloadSchema.ts
import { z as z88 } from "zod";
var HoldersPayloadSchema = z88.object({
  tokens: z88.array(z88.object({
    address: z88.string(),
    blockchain: z88.string()
  })),
  subscriptionId: z88.string().optional(),
  subscriptionTracking: z88.union([z88.boolean(), z88.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val)
});
// src/wss/MarketDetailsPayloadSchema.ts
import { z as z89 } from "zod";
var MarketDetailsPayloadSchema = z89.object({
  pools: z89.array(z89.object({
    address: z89.string(),
    blockchain: z89.string()
  })),
  subscriptionId: z89.string().optional(),
  subscriptionTracking: z89.union([z89.boolean(), z89.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val)
});
// src/wss/MarketPayloadSchema.ts
import { z as z90 } from "zod";
var MarketPayloadSchema = z90.object({
  interval: z90.number().default(30),
  subscriptionId: z90.string().optional(),
  assets: z90.array(z90.union([
    z90.object({ name: z90.string() }),
    z90.object({ symbol: z90.string() }),
    z90.object({
      address: z90.string(),
      blockchain: z90.string()
    })
  ])).max(100),
  subscriptionTracking: z90.union([z90.boolean(), z90.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val)
});
// src/wss/OhlcvPayloadSchema.ts
import { z as z91 } from "zod";
var OhlcvPayloadSchema = z91.object({
  address: z91.string().optional(),
  subscriptionId: z91.string().optional(),
  blockchain: z91.string().optional(),
  chainId: z91.string().optional(),
  period: z91.string().optional().transform((val) => {
    if (val) {
      return normalizePeriod(val);
    }
    return "5m";
  }),
  asset: z91.string().optional(),
  currentPrice: z91.string().optional(),
  mode: z91.enum(["asset", "pair"]).optional(),
  subscriptionTracking: z91.union([z91.boolean(), z91.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val)
});
// src/wss/PairsPayloadSchema.ts
import { z as z92 } from "zod";
var PairsPayloadSchema = z92.object({
  mode: z92.enum(["asset", "pair"]).optional().default("pair"),
  subscriptionId: z92.string().optional(),
  blockchain: z92.string().optional(),
  factory: z92.string().optional(),
  interval: z92.number().default(30),
  address: z92.string().optional(),
  asset: z92.string().optional(),
  subscriptionTracking: z92.union([z92.boolean(), z92.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val)
});
// src/wss/PositionPayloadSchema.ts
import { z as z93 } from "zod";
var PositionPayloadSchema = z93.object({
  wallet: z93.string(),
  token: z93.string(),
  blockchain: z93.string(),
  subscriptionId: z93.string().optional(),
  subscriptionTracking: z93.union([z93.boolean(), z93.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val)
});
var PositionsPayloadSchema = z93.object({
  wallet: z93.string(),
  blockchain: z93.string(),
  subscriptionId: z93.string().optional(),
  subscriptionTracking: z93.union([z93.boolean(), z93.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val)
});
// src/wss/pulse/PausePulsePayloadSchema.ts
import { z as z94 } from "zod";
var PausePulsePayloadSchema = z94.object({
  action: z94.enum(["pause", "unpause"]),
  views: z94.array(z94.string()).min(1)
});
// src/wss/stream/StreamPayloadSchema.ts
import { z as z96 } from "zod";

// src/utils/schemas/Filter.ts
import { z as z95 } from "zod";
var BaseFilter2 = z95.object({
  eq: z95.tuple([z95.string(), z95.union([z95.string(), z95.number(), z95.boolean(), z95.null()])]).optional(),
  neq: z95.tuple([z95.string(), z95.union([z95.string(), z95.number(), z95.boolean(), z95.null()])]).optional(),
  lt: z95.tuple([z95.string(), z95.coerce.number()]).optional(),
  lte: z95.tuple([z95.string(), z95.coerce.number()]).optional(),
  gt: z95.tuple([z95.string(), z95.coerce.number()]).optional(),
  gte: z95.tuple([z95.string(), z95.coerce.number()]).optional(),
  in: z95.tuple([
    z95.string(),
    z95.union([
      z95.string(),
      z95.number(),
      z95.boolean(),
      z95.null(),
      z95.array(z95.union([z95.string(), z95.number(), z95.boolean(), z95.null()]))
    ])
  ]).optional()
});
var Filter2 = BaseFilter2.and(z95.union([
  BaseFilter2.extend({ and: z95.undefined(), or: z95.undefined() }),
  BaseFilter2.extend({ and: z95.array(z95.lazy(() => Filter2)), or: z95.undefined() }),
  BaseFilter2.extend({ and: z95.undefined(), or: z95.array(z95.lazy(() => Filter2)) })
]));
function countOperations2(filter) {
  if (!filter)
    return 0;
  let count = 0;
  for (const key of ["eq", "neq", "lt", "lte", "gt", "gte", "in"]) {
    if (filter[key])
      count += 1;
  }
  if ("and" in filter && Array.isArray(filter.and)) {
    for (const child of filter.and) {
      count += countOperations2(child);
    }
  }
  if ("or" in filter && Array.isArray(filter.or)) {
    for (const child of filter.or) {
      count += countOperations2(child);
    }
  }
  return count;
}
var FilterWithLimit2 = Filter2.superRefine((val, ctx) => {
  const total = countOperations2(val);
  const max = 1000;
  if (total > max) {
    ctx.addIssue({
      code: z95.ZodIssueCode.custom,
      message: `Your filter contains ${total} leaf operations, exceeding the maximum of ${max}. Only leaf conditions like "eq", "neq", "lt", "lte", "gt", "gte", "in" are counted; logical operators ("and", "or") are ignored.`
    });
  }
});
var Filter_default = FilterWithLimit2;

// src/wss/stream/StreamPayloadSchema.ts
var StreamPayloadSchema = z96.object({
  filters: Filter_default.optional(),
  chainIds: z96.array(z96.string()).nonempty(),
  name: z96.string().optional(),
  events: z96.array(z96.enum(["swap", "transfer", "swap-enriched", "block", "order"])).nonempty(),
  authorization: z96.string(),
  subscriptionId: z96.string().optional(),
  subscriptionTracking: z96.string().optional(),
  debugSubscriptionId: z96.string().optional()
});
var UnsubscribeStreamPayloadSchema = z96.object({
  type: z96.enum(["stream"]).optional(),
  subscriptionId: z96.string().optional(),
  personalizedId: z96.string().optional(),
  viewName: z96.string().optional()
}).transform((data) => {
  if (data.personalizedId && !data.subscriptionId) {
    return {
      ...data,
      subscriptionId: data.personalizedId
    };
  }
  return data;
}).optional();
var UpdateStreamPayloadSchema = z96.object({
  subscriptionId: z96.string(),
  authorization: z96.string(),
  mode: z96.enum(["merge", "replace"]).default("replace"),
  filters: Filter_default.optional(),
  chainIds: z96.array(z96.string()).optional(),
  events: z96.array(z96.string()).optional(),
  subscriptionTracking: z96.string().optional()
});
// src/wss/TokenDetailsPayloadSchema.ts
import { z as z97 } from "zod";
var TokenDetailsPayloadSchema = z97.object({
  tokens: z97.array(z97.object({
    address: z97.string(),
    blockchain: z97.string()
  })),
  subscriptionId: z97.string().optional(),
  subscriptionTracking: z97.union([z97.boolean(), z97.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val)
});
export {
  walletSchema,
  updateWebhookResponseSchema,
  updatePoolMessageSchema,
  tokenHoldingSchema,
  tokenDataSchema,
  tokenDataKeys,
  syncMessageSchema,
  singlePositionOutputSchema,
  selectCategoryTokenVsCategory,
  selectAssetTokenVsCategory,
  removePoolMessageSchema,
  poolDataSchema,
  poolDataKeys,
  nonNumericValues,
  nonNumericPoolValues,
  newPoolMessageSchema,
  logoUrlSchema,
  listWebhooksQueryParams,
  listWebhookResponseSchema,
  keysToRemoveTokenToPulse,
  keysToRemovePoolToPulse,
  getZodSchemaKeys,
  getZodKeysAdvanced,
  getZodDefaultValue,
  getPeriodSeconds,
  getBucketExpression,
  generateMinimalistMapping,
  generateDefaultFromSchema,
  generateAutomaticMinimalistParser,
  formattedJSONSchema,
  extractZodSchemaKeys,
  extractAllZodKeys,
  deleteWebhookResponseSchema,
  deleteWebhookParams,
  dateFields,
  createFeedQuery,
  countOperations,
  bigintAbs,
  batchPositionItemSchema,
  WebhookResponseSchema,
  WebSocketMessageSchema,
  WalletV2DeployerResponseSchema,
  WalletV2DeployerParamsSchema,
  WalletV1DeployerResponseSchema,
  WalletV1DeployerParamsSchema,
  WalletTransactionsResponseSchema,
  WalletTransactionsParamsSchema,
  WalletTradesResponseSchema,
  WalletTradesParamsSchema,
  WalletSmartMoneyResponseSchema,
  WalletRawTransactionsResponseSchema,
  WalletRawTransactionsParamsSchema,
  WalletPositionsResponseSchema,
  WalletPositionsParamsSchema,
  WalletPerpsPositionsResponseSchema,
  WalletPerpsPositionsNonExecutedResponseSchema,
  WalletNFTTransactionsResponseSchema,
  WalletNFTResponseSchema,
  WalletNFTParamsSchema,
  WalletLabelsResponseSchema,
  WalletLabelsParamsSchema,
  WalletHoldingsResponseSchema,
  WalletHistoryResponseSchema,
  WalletHistoryParamsSchema,
  WalletFundingResponseSchema,
  WalletFundingParamsSchema,
  WalletDefiPositionsParamsSchema,
  WalletBalanceUSDResponseSchema,
  WalletBalanceUSDParamsSchema,
  WalletAnalysisResponseSchemaOpenAPI,
  WalletAnalysisResponseSchema,
  WalletAnalysisParamsSchemaOpenAPI,
  WalletAnalysisParamsSchema,
  WalletActivityV2TransactionSchema,
  WalletActivityV2TransactionActivitySchema,
  WalletActivityV2ResponseSchema,
  WalletActivityV2ParamsSchema,
  WalletActivityV2OutputPaginationSchema,
  WalletActivityV2OutputDataSchema,
  UpdateWebhook,
  UpdateStreamPayloadSchema,
  UnsubscribeStreamPayloadSchema,
  TokenTypeValues,
  TokenTypeSchema,
  TokenTradesParamsSchema,
  TokenTradeResponseSchema,
  TokenTradeParamsSchemaOpenAPI,
  TokenTradeParamsSchema,
  TokenTradeOutputOpenAPI,
  TokenTradeOutput,
  TokenStatsSchema,
  TokenSecurityResponseSchema,
  TokenSecurityQuery,
  TokenSecurityQuery as TokenSecurityParamsSchema,
  TokenSecurityOutput,
  TokenPriceResponseSchema,
  TokenPriceParamsSchema,
  TokenPriceBatchResponseSchema,
  TokenPriceBatchParamsSchema,
  TokenPositionsResponseSchema,
  TokenPositionsParamsSchema,
  TokenPositionOutput,
  TokenOHLCVHistoryResponseSchema,
  TokenOHLCVHistoryParamsSchema,
  TokenOHLCVHistoryBatchResponseSchema,
  TokenOHLCVHistoryBatchParamsSchema,
  TokenMarketsResponseSchema,
  TokenMarketsParamsSchema,
  TokenMarketsOutput,
  TokenKlineBsPointResponseSchema,
  TokenKlineBsPointParamsSchema,
  TokenKlineBsBubblePoint,
  TokenFirstBuyersResponseSchema,
  TokenFirstBuyersParamsSchema,
  TokenDetailsResponseSchema,
  TokenDetailsPayloadSchema,
  TokenDetailsParamsSchema,
  TokenDetailsBatchResponseSchema,
  TokenDetailsBatchParamsSchema,
  TokenData,
  Tags,
  TOKEN_METADATA_KEYS,
  SystemMetadataResponseSchema,
  SwapType,
  SwapSendSchema,
  SwapSendResponseSchema,
  SwapQuotingQuerySchema,
  SwapQuotingOutputSchema,
  SwapQuotingInstructionsOutputSchema,
  SwapQuotingInstructionsDataSchema,
  SwapQuotingDataSchema,
  SwapQuotingBatchOutputSchema,
  SwapQuotingBatchBodySchema,
  SupportedCurrency,
  StreamPayloadSchema,
  StaticAnalysisStatusEnum,
  SolanaInstructionsSchema,
  SolanaInstructionSchema,
  SingleTokenTradeResponseSchemaOpenAPI,
  SingleTokenTradeResponseSchema,
  SinglePositionQuery,
  SinglePositionBatchResponseSchema,
  SinglePositionBatchParamsSchema,
  SecuritySourcesSchema,
  SearchResponseSchema,
  SearchParamsSchema,
  SearchFastResponseSchema,
  PulseQuerySchema,
  PulsePayloadParamsSchema,
  PulsePaginationResponseSchema,
  PulseOutputSchema,
  PulseEnrichedTokenDataSchema,
  PulseEnrichedPoolDataSchema,
  PositionsPayloadSchema,
  PositionSchema,
  PositionPayloadSchema,
  PortfolioResponseSchema,
  PortfolioParamsSchema,
  PortfolioDefiParamsSchema,
  PoolStatsSchema,
  PoolData,
  PerpsPositionSchema,
  PerpsPositionNonExecutedSchema,
  PerpOrderQuotingParamsSchema,
  PerpBlocksResponseSchema,
  PerpBlocksQueryParamsSchema,
  PerpBlockSchema,
  PausePulsePayloadSchema,
  PausePulsePayloadParamsSchema,
  PairsPayloadSchema,
  OhlcvPayloadSchema,
  NON_USD_CURRENCIES,
  NFTMetadataResponseSchema,
  NFTMetadataParamsSchema,
  MultiPortfolioResponseSchema,
  MultiMetadataResponseSchema,
  MultiMetadataParamsSchema,
  MetadataTrendingsResponseSchema,
  MetadataTrendingsParamsSchema,
  MetadataResponseSchema,
  MetadataParamsSchema,
  MetadataNewsResponseSchema,
  MetadataNewsParamsSchema,
  MetadataCategoriesResponseSchema,
  MarketTradesPairResponseSchema,
  MarketTradesPairParamsSchema,
  MarketTotalResponseSchema,
  MarketTokenVsMarketResponseSchema,
  MarketTokenVsMarketParamsSchema,
  MarketTokenHoldersResponseSchema,
  MarketTokenHoldersParamsSchema,
  MarketSparklineResponseSchema,
  MarketSparklineParamsSchema,
  MarketQueryResponseSchema,
  MarketQueryParamsSchema,
  MarketPayloadSchema,
  MarketPairsResponseSchema,
  MarketPairsParamsSchema,
  MarketPairResponseSchema,
  MarketPairParamsSchema,
  MarketOHLCVHistoryResponseSchema,
  MarketOHLCVHistoryParamsSchema,
  MarketOHLCVHistoryBatchResponseSchema,
  MarketOHLCVHistoryBatchParamsSchema,
  MarketNftResponseSchema,
  MarketNftParamsSchema,
  MarketMultiPricesResponseSchema,
  MarketMultiPricesParamsSchema,
  MarketMultiHistoryResponseSchema,
  MarketMultiHistoryParamsSchema,
  MarketMultiDataResponseSchema,
  MarketMultiDataAssetParamsSchema,
  MarketHistoryResponseSchema,
  MarketHistoryParamsSchema,
  MarketHistoryPairResponseSchema,
  MarketHistoryPairParamsSchema,
  MarketDetailsResponseSchema,
  MarketDetailsPayloadSchema,
  MarketDetailsParamsSchema,
  MarketDetailsBatchResponseSchema,
  MarketDetailsBatchParamsSchema,
  MarketDataResponseSchema,
  MarketBlockchainStatsResponseSchema,
  MarketBlockchainStatsParamsSchema,
  MarketBlockchainPairsResponseSchema,
  MarketBlockchainPairsParamsSchema,
  LLMSecurityFlagsSchema,
  HoldersStreamNewTokenPayload,
  HoldersStatsSchema,
  HoldersPayloadSchema,
  HolderSchema,
  FundingRateResponseSchema,
  FundingRateParamsSchema,
  FundingPayloadSchema,
  FormattedTokenTradeResponseSchema,
  FormattedTokenTradeOutput,
  FeedTokenSchema,
  FeedPayloadSchema,
  FeedAssetIdSchema,
  FastTradesPayloadSchema,
  ExchangesIds,
  EnrichedTokenDataSchema,
  EnrichedPoolDataSchema,
  DefiPositionsResponseSchema,
  DebugPulseViewsResponseSchema,
  DEFAULT_CURRENCY,
  CurrenciesParamSchema,
  CryptoNewsDataSchema,
  CreateWebhookResponseSchema,
  CreateWebhook,
  BlockchainsResponseSchema,
  BlockQueryParamsSchema,
  BalancePayloadSchema,
  AssetTokenDetailsOutput,
  AssetQuery,
  AssetPriceHistoryResponseSchema,
  AssetPriceHistoryParamsSchema,
  AssetPriceHistoryBatchResponseSchema,
  AssetPriceHistoryBatchParamsSchema,
  AssetDetailsResponseSchema,
  AssetDetailsParamsSchema,
  AssetDetailsDataOutput,
  AssetDetailsBatchResponseSchema,
  AssetDetailsBatchParamsSchema,
  AssetDataOutput,
  AllAssetsResponseSchema,
  AllAssetsParamsSchema,
  API_KEYS_QUERIES
};

//# debugId=1AE7677457CFDC5664756E2164756E21
