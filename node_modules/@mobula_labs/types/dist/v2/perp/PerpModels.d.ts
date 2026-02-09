import { z } from 'zod';
export type ExchangeId = 'gte' | 'gains' | 'hyperliquid' | 'lighter';
/**
 * @DefaultMarketSymbol This is the default market symbol, it should be used nowhere except to define @MarketId
 */
type DefaultMarketSymbol<TExchangeId extends ExchangeId> = `${TExchangeId}-${Lowercase<string>}-${Lowercase<string>}`;
/**
 * @MarketId the universal MarketId for perps, with exchange ids specificities
 */
export type MarketId<TExchangeId extends ExchangeId> = TExchangeId extends 'gains' ? `${DefaultMarketSymbol<TExchangeId>}-${Lowercase<string>}` : DefaultMarketSymbol<TExchangeId>;
export type HoldingFeesTimeframes = '1h' | '8h' | '24h' | '1y';
export type FlattenedHoldingFees = {
    fundingFeeShort1hPercentage: number;
    totalFeeShort1hPercentage: number;
    fundingFeeLong1hPercentage: number;
    totalFeeLong1hPercentage: number;
    fundingFeeShort8hPercentage: number;
    totalFeeShort8hPercentage: number;
    fundingFeeLong8hPercentage: number;
    totalFeeLong8hPercentage: number;
    fundingFeeShort24hPercentage: number;
    totalFeeShort24hPercentage: number;
    fundingFeeLong24hPercentage: number;
    totalFeeLong24hPercentage: number;
    fundingFeeShort1yPercentage: number;
    totalFeeShort1yPercentage: number;
    fundingFeeLong1yPercentage: number;
    totalFeeLong1yPercentage: number;
};
export type AssetClasses = 'crypto' | 'forex' | 'stocks' | 'indices' | 'commodities';
export declare const PerpDataRedisSchemaFlatten: z.ZodObject<{
    markPriceUSD: z.ZodDefault<z.ZodNumber>;
    markPriceQuote: z.ZodDefault<z.ZodNumber>;
    oraclePriceUSD: z.ZodDefault<z.ZodNumber>;
    isDisabled: z.ZodBoolean;
    isOpen: z.ZodBoolean;
    assetClass: z.ZodType<AssetClasses>;
    spreadPercentage: z.ZodDefault<z.ZodNumber>;
    fundingFeeShort1hPercentage: z.ZodDefault<z.ZodNumber>;
    totalFeeShort1hPercentage: z.ZodDefault<z.ZodNumber>;
    fundingFeeLong1hPercentage: z.ZodDefault<z.ZodNumber>;
    totalFeeLong1hPercentage: z.ZodDefault<z.ZodNumber>;
    fundingFeeShort8hPercentage: z.ZodDefault<z.ZodNumber>;
    totalFeeShort8hPercentage: z.ZodDefault<z.ZodNumber>;
    fundingFeeLong8hPercentage: z.ZodDefault<z.ZodNumber>;
    totalFeeLong8hPercentage: z.ZodDefault<z.ZodNumber>;
    fundingFeeShort24hPercentage: z.ZodDefault<z.ZodNumber>;
    totalFeeShort24hPercentage: z.ZodDefault<z.ZodNumber>;
    fundingFeeLong24hPercentage: z.ZodDefault<z.ZodNumber>;
    totalFeeLong24hPercentage: z.ZodDefault<z.ZodNumber>;
    fundingFeeShort1yPercentage: z.ZodDefault<z.ZodNumber>;
    totalFeeShort1yPercentage: z.ZodDefault<z.ZodNumber>;
    fundingFeeLong1yPercentage: z.ZodDefault<z.ZodNumber>;
    totalFeeLong1yPercentage: z.ZodDefault<z.ZodNumber>;
    collateral: z.ZodOptional<z.ZodString>;
    marketId: z.ZodString;
} & {
    oiCollateral_oiLong: z.ZodDefault<z.ZodNumber>;
    oiCollateral_oiShort: z.ZodDefault<z.ZodNumber>;
    oiCollateral_max: z.ZodOptional<z.ZodNumber>;
    leverage_min: z.ZodDefault<z.ZodNumber>;
    leverage_max: z.ZodDefault<z.ZodNumber>;
    defaultTradingFees_makerFeeBps: z.ZodDefault<z.ZodNumber>;
    defaultTradingFees_takerFeeBps: z.ZodDefault<z.ZodNumber>;
    liquidationParams_maxLiqSpreadPercentage: z.ZodDefault<z.ZodNumber>;
    liquidationParams_startLiqThresholdPercentage: z.ZodDefault<z.ZodNumber>;
    liquidationParams_endLiqThresholdPercentage: z.ZodDefault<z.ZodNumber>;
    liquidationParams_startLeverage: z.ZodDefault<z.ZodNumber>;
    liquidationParams_endLeverage: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    markPriceUSD: number;
    markPriceQuote: number;
    oraclePriceUSD: number;
    isDisabled: boolean;
    isOpen: boolean;
    spreadPercentage: number;
    fundingFeeShort1hPercentage: number;
    totalFeeShort1hPercentage: number;
    fundingFeeLong1hPercentage: number;
    totalFeeLong1hPercentage: number;
    fundingFeeShort8hPercentage: number;
    totalFeeShort8hPercentage: number;
    fundingFeeLong8hPercentage: number;
    totalFeeLong8hPercentage: number;
    fundingFeeShort24hPercentage: number;
    totalFeeShort24hPercentage: number;
    fundingFeeLong24hPercentage: number;
    totalFeeLong24hPercentage: number;
    fundingFeeShort1yPercentage: number;
    totalFeeShort1yPercentage: number;
    fundingFeeLong1yPercentage: number;
    totalFeeLong1yPercentage: number;
    marketId: string;
    assetClass: AssetClasses;
    oiCollateral_oiLong: number;
    oiCollateral_oiShort: number;
    leverage_min: number;
    leverage_max: number;
    defaultTradingFees_makerFeeBps: number;
    defaultTradingFees_takerFeeBps: number;
    liquidationParams_maxLiqSpreadPercentage: number;
    liquidationParams_startLiqThresholdPercentage: number;
    liquidationParams_endLiqThresholdPercentage: number;
    liquidationParams_startLeverage: number;
    liquidationParams_endLeverage: number;
    collateral?: string | undefined;
    oiCollateral_max?: number | undefined;
}, {
    isDisabled: boolean;
    isOpen: boolean;
    marketId: string;
    assetClass: AssetClasses;
    markPriceUSD?: number | undefined;
    markPriceQuote?: number | undefined;
    oraclePriceUSD?: number | undefined;
    spreadPercentage?: number | undefined;
    fundingFeeShort1hPercentage?: number | undefined;
    totalFeeShort1hPercentage?: number | undefined;
    fundingFeeLong1hPercentage?: number | undefined;
    totalFeeLong1hPercentage?: number | undefined;
    fundingFeeShort8hPercentage?: number | undefined;
    totalFeeShort8hPercentage?: number | undefined;
    fundingFeeLong8hPercentage?: number | undefined;
    totalFeeLong8hPercentage?: number | undefined;
    fundingFeeShort24hPercentage?: number | undefined;
    totalFeeShort24hPercentage?: number | undefined;
    fundingFeeLong24hPercentage?: number | undefined;
    totalFeeLong24hPercentage?: number | undefined;
    fundingFeeShort1yPercentage?: number | undefined;
    totalFeeShort1yPercentage?: number | undefined;
    fundingFeeLong1yPercentage?: number | undefined;
    totalFeeLong1yPercentage?: number | undefined;
    collateral?: string | undefined;
    oiCollateral_oiLong?: number | undefined;
    oiCollateral_oiShort?: number | undefined;
    oiCollateral_max?: number | undefined;
    leverage_min?: number | undefined;
    leverage_max?: number | undefined;
    defaultTradingFees_makerFeeBps?: number | undefined;
    defaultTradingFees_takerFeeBps?: number | undefined;
    liquidationParams_maxLiqSpreadPercentage?: number | undefined;
    liquidationParams_startLiqThresholdPercentage?: number | undefined;
    liquidationParams_endLiqThresholdPercentage?: number | undefined;
    liquidationParams_startLeverage?: number | undefined;
    liquidationParams_endLeverage?: number | undefined;
}>;
export type PerpDataRedisFlatten = z.infer<typeof PerpDataRedisSchemaFlatten>;
export declare const PerpDataRedisSchemaNested: z.ZodObject<{
    markPriceUSD: z.ZodDefault<z.ZodNumber>;
    markPriceQuote: z.ZodDefault<z.ZodNumber>;
    oraclePriceUSD: z.ZodDefault<z.ZodNumber>;
    isDisabled: z.ZodBoolean;
    isOpen: z.ZodBoolean;
    assetClass: z.ZodType<AssetClasses>;
    spreadPercentage: z.ZodDefault<z.ZodNumber>;
    fundingFeeShort1hPercentage: z.ZodDefault<z.ZodNumber>;
    totalFeeShort1hPercentage: z.ZodDefault<z.ZodNumber>;
    fundingFeeLong1hPercentage: z.ZodDefault<z.ZodNumber>;
    totalFeeLong1hPercentage: z.ZodDefault<z.ZodNumber>;
    fundingFeeShort8hPercentage: z.ZodDefault<z.ZodNumber>;
    totalFeeShort8hPercentage: z.ZodDefault<z.ZodNumber>;
    fundingFeeLong8hPercentage: z.ZodDefault<z.ZodNumber>;
    totalFeeLong8hPercentage: z.ZodDefault<z.ZodNumber>;
    fundingFeeShort24hPercentage: z.ZodDefault<z.ZodNumber>;
    totalFeeShort24hPercentage: z.ZodDefault<z.ZodNumber>;
    fundingFeeLong24hPercentage: z.ZodDefault<z.ZodNumber>;
    totalFeeLong24hPercentage: z.ZodDefault<z.ZodNumber>;
    fundingFeeShort1yPercentage: z.ZodDefault<z.ZodNumber>;
    totalFeeShort1yPercentage: z.ZodDefault<z.ZodNumber>;
    fundingFeeLong1yPercentage: z.ZodDefault<z.ZodNumber>;
    totalFeeLong1yPercentage: z.ZodDefault<z.ZodNumber>;
    collateral: z.ZodOptional<z.ZodString>;
    marketId: z.ZodString;
} & {
    defaultTradingFees: z.ZodObject<{
        makerFeeBps: z.ZodDefault<z.ZodNumber>;
        takerFeeBps: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        makerFeeBps: number;
        takerFeeBps: number;
    }, {
        makerFeeBps?: number | undefined;
        takerFeeBps?: number | undefined;
    }>;
    oiCollateral: z.ZodObject<{
        oiLong: z.ZodDefault<z.ZodNumber>;
        oiShort: z.ZodDefault<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        oiLong: number;
        oiShort: number;
        max?: number | undefined;
    }, {
        oiLong?: number | undefined;
        oiShort?: number | undefined;
        max?: number | undefined;
    }>;
    leverage: z.ZodObject<{
        min: z.ZodDefault<z.ZodNumber>;
        max: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        max: number;
        min: number;
    }, {
        max?: number | undefined;
        min?: number | undefined;
    }>;
    liquidationParams: z.ZodObject<{
        maxLiqSpreadPercentage: z.ZodDefault<z.ZodNumber>;
        startLiqThresholdPercentage: z.ZodDefault<z.ZodNumber>;
        endLiqThresholdPercentage: z.ZodDefault<z.ZodNumber>;
        startLeverage: z.ZodDefault<z.ZodNumber>;
        endLeverage: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        maxLiqSpreadPercentage: number;
        startLiqThresholdPercentage: number;
        endLiqThresholdPercentage: number;
        startLeverage: number;
        endLeverage: number;
    }, {
        maxLiqSpreadPercentage?: number | undefined;
        startLiqThresholdPercentage?: number | undefined;
        endLiqThresholdPercentage?: number | undefined;
        startLeverage?: number | undefined;
        endLeverage?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    markPriceUSD: number;
    markPriceQuote: number;
    oraclePriceUSD: number;
    isDisabled: boolean;
    isOpen: boolean;
    spreadPercentage: number;
    fundingFeeShort1hPercentage: number;
    totalFeeShort1hPercentage: number;
    fundingFeeLong1hPercentage: number;
    totalFeeLong1hPercentage: number;
    fundingFeeShort8hPercentage: number;
    totalFeeShort8hPercentage: number;
    fundingFeeLong8hPercentage: number;
    totalFeeLong8hPercentage: number;
    fundingFeeShort24hPercentage: number;
    totalFeeShort24hPercentage: number;
    fundingFeeLong24hPercentage: number;
    totalFeeLong24hPercentage: number;
    fundingFeeShort1yPercentage: number;
    totalFeeShort1yPercentage: number;
    fundingFeeLong1yPercentage: number;
    totalFeeLong1yPercentage: number;
    marketId: string;
    assetClass: AssetClasses;
    defaultTradingFees: {
        makerFeeBps: number;
        takerFeeBps: number;
    };
    oiCollateral: {
        oiLong: number;
        oiShort: number;
        max?: number | undefined;
    };
    leverage: {
        max: number;
        min: number;
    };
    liquidationParams: {
        maxLiqSpreadPercentage: number;
        startLiqThresholdPercentage: number;
        endLiqThresholdPercentage: number;
        startLeverage: number;
        endLeverage: number;
    };
    collateral?: string | undefined;
}, {
    isDisabled: boolean;
    isOpen: boolean;
    marketId: string;
    assetClass: AssetClasses;
    defaultTradingFees: {
        makerFeeBps?: number | undefined;
        takerFeeBps?: number | undefined;
    };
    oiCollateral: {
        oiLong?: number | undefined;
        oiShort?: number | undefined;
        max?: number | undefined;
    };
    leverage: {
        max?: number | undefined;
        min?: number | undefined;
    };
    liquidationParams: {
        maxLiqSpreadPercentage?: number | undefined;
        startLiqThresholdPercentage?: number | undefined;
        endLiqThresholdPercentage?: number | undefined;
        startLeverage?: number | undefined;
        endLeverage?: number | undefined;
    };
    markPriceUSD?: number | undefined;
    markPriceQuote?: number | undefined;
    oraclePriceUSD?: number | undefined;
    spreadPercentage?: number | undefined;
    fundingFeeShort1hPercentage?: number | undefined;
    totalFeeShort1hPercentage?: number | undefined;
    fundingFeeLong1hPercentage?: number | undefined;
    totalFeeLong1hPercentage?: number | undefined;
    fundingFeeShort8hPercentage?: number | undefined;
    totalFeeShort8hPercentage?: number | undefined;
    fundingFeeLong8hPercentage?: number | undefined;
    totalFeeLong8hPercentage?: number | undefined;
    fundingFeeShort24hPercentage?: number | undefined;
    totalFeeShort24hPercentage?: number | undefined;
    fundingFeeLong24hPercentage?: number | undefined;
    totalFeeLong24hPercentage?: number | undefined;
    fundingFeeShort1yPercentage?: number | undefined;
    totalFeeShort1yPercentage?: number | undefined;
    fundingFeeLong1yPercentage?: number | undefined;
    totalFeeLong1yPercentage?: number | undefined;
    collateral?: string | undefined;
}>;
export type PerpDataRedisNested = z.infer<typeof PerpDataRedisSchemaNested>;
export declare const PerpDataMarketDetailsOutputSchema: z.ZodObject<Omit<{
    markPriceUSD: z.ZodDefault<z.ZodNumber>;
    markPriceQuote: z.ZodDefault<z.ZodNumber>;
    oraclePriceUSD: z.ZodDefault<z.ZodNumber>;
    isDisabled: z.ZodBoolean;
    isOpen: z.ZodBoolean;
    assetClass: z.ZodType<AssetClasses>;
    spreadPercentage: z.ZodDefault<z.ZodNumber>;
    fundingFeeShort1hPercentage: z.ZodDefault<z.ZodNumber>;
    totalFeeShort1hPercentage: z.ZodDefault<z.ZodNumber>;
    fundingFeeLong1hPercentage: z.ZodDefault<z.ZodNumber>;
    totalFeeLong1hPercentage: z.ZodDefault<z.ZodNumber>;
    fundingFeeShort8hPercentage: z.ZodDefault<z.ZodNumber>;
    totalFeeShort8hPercentage: z.ZodDefault<z.ZodNumber>;
    fundingFeeLong8hPercentage: z.ZodDefault<z.ZodNumber>;
    totalFeeLong8hPercentage: z.ZodDefault<z.ZodNumber>;
    fundingFeeShort24hPercentage: z.ZodDefault<z.ZodNumber>;
    totalFeeShort24hPercentage: z.ZodDefault<z.ZodNumber>;
    fundingFeeLong24hPercentage: z.ZodDefault<z.ZodNumber>;
    totalFeeLong24hPercentage: z.ZodDefault<z.ZodNumber>;
    fundingFeeShort1yPercentage: z.ZodDefault<z.ZodNumber>;
    totalFeeShort1yPercentage: z.ZodDefault<z.ZodNumber>;
    fundingFeeLong1yPercentage: z.ZodDefault<z.ZodNumber>;
    totalFeeLong1yPercentage: z.ZodDefault<z.ZodNumber>;
    collateral: z.ZodOptional<z.ZodString>;
    marketId: z.ZodString;
} & {
    defaultTradingFees: z.ZodObject<{
        makerFeeBps: z.ZodDefault<z.ZodNumber>;
        takerFeeBps: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        makerFeeBps: number;
        takerFeeBps: number;
    }, {
        makerFeeBps?: number | undefined;
        takerFeeBps?: number | undefined;
    }>;
    oiCollateral: z.ZodObject<{
        oiLong: z.ZodDefault<z.ZodNumber>;
        oiShort: z.ZodDefault<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        oiLong: number;
        oiShort: number;
        max?: number | undefined;
    }, {
        oiLong?: number | undefined;
        oiShort?: number | undefined;
        max?: number | undefined;
    }>;
    leverage: z.ZodObject<{
        min: z.ZodDefault<z.ZodNumber>;
        max: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        max: number;
        min: number;
    }, {
        max?: number | undefined;
        min?: number | undefined;
    }>;
    liquidationParams: z.ZodObject<{
        maxLiqSpreadPercentage: z.ZodDefault<z.ZodNumber>;
        startLiqThresholdPercentage: z.ZodDefault<z.ZodNumber>;
        endLiqThresholdPercentage: z.ZodDefault<z.ZodNumber>;
        startLeverage: z.ZodDefault<z.ZodNumber>;
        endLeverage: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        maxLiqSpreadPercentage: number;
        startLiqThresholdPercentage: number;
        endLiqThresholdPercentage: number;
        startLeverage: number;
        endLeverage: number;
    }, {
        maxLiqSpreadPercentage?: number | undefined;
        startLiqThresholdPercentage?: number | undefined;
        endLiqThresholdPercentage?: number | undefined;
        startLeverage?: number | undefined;
        endLeverage?: number | undefined;
    }>;
}, "oiCollateral"> & {
    openInterest: z.ZodObject<{
        longUSD: z.ZodDefault<z.ZodNumber>;
        longQuoteToken: z.ZodDefault<z.ZodNumber>;
        shortUSD: z.ZodDefault<z.ZodNumber>;
        shortQuoteToken: z.ZodDefault<z.ZodNumber>;
        maxUSD: z.ZodOptional<z.ZodNumber>;
        maxQuoteToken: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        longUSD: number;
        longQuoteToken: number;
        shortUSD: number;
        shortQuoteToken: number;
        maxUSD?: number | undefined;
        maxQuoteToken?: number | undefined;
    }, {
        longUSD?: number | undefined;
        longQuoteToken?: number | undefined;
        shortUSD?: number | undefined;
        shortQuoteToken?: number | undefined;
        maxUSD?: number | undefined;
        maxQuoteToken?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    markPriceUSD: number;
    markPriceQuote: number;
    oraclePriceUSD: number;
    isDisabled: boolean;
    isOpen: boolean;
    spreadPercentage: number;
    fundingFeeShort1hPercentage: number;
    totalFeeShort1hPercentage: number;
    fundingFeeLong1hPercentage: number;
    totalFeeLong1hPercentage: number;
    fundingFeeShort8hPercentage: number;
    totalFeeShort8hPercentage: number;
    fundingFeeLong8hPercentage: number;
    totalFeeLong8hPercentage: number;
    fundingFeeShort24hPercentage: number;
    totalFeeShort24hPercentage: number;
    fundingFeeLong24hPercentage: number;
    totalFeeLong24hPercentage: number;
    fundingFeeShort1yPercentage: number;
    totalFeeShort1yPercentage: number;
    fundingFeeLong1yPercentage: number;
    totalFeeLong1yPercentage: number;
    marketId: string;
    assetClass: AssetClasses;
    defaultTradingFees: {
        makerFeeBps: number;
        takerFeeBps: number;
    };
    leverage: {
        max: number;
        min: number;
    };
    liquidationParams: {
        maxLiqSpreadPercentage: number;
        startLiqThresholdPercentage: number;
        endLiqThresholdPercentage: number;
        startLeverage: number;
        endLeverage: number;
    };
    openInterest: {
        longUSD: number;
        longQuoteToken: number;
        shortUSD: number;
        shortQuoteToken: number;
        maxUSD?: number | undefined;
        maxQuoteToken?: number | undefined;
    };
    collateral?: string | undefined;
}, {
    isDisabled: boolean;
    isOpen: boolean;
    marketId: string;
    assetClass: AssetClasses;
    defaultTradingFees: {
        makerFeeBps?: number | undefined;
        takerFeeBps?: number | undefined;
    };
    leverage: {
        max?: number | undefined;
        min?: number | undefined;
    };
    liquidationParams: {
        maxLiqSpreadPercentage?: number | undefined;
        startLiqThresholdPercentage?: number | undefined;
        endLiqThresholdPercentage?: number | undefined;
        startLeverage?: number | undefined;
        endLeverage?: number | undefined;
    };
    openInterest: {
        longUSD?: number | undefined;
        longQuoteToken?: number | undefined;
        shortUSD?: number | undefined;
        shortQuoteToken?: number | undefined;
        maxUSD?: number | undefined;
        maxQuoteToken?: number | undefined;
    };
    markPriceUSD?: number | undefined;
    markPriceQuote?: number | undefined;
    oraclePriceUSD?: number | undefined;
    spreadPercentage?: number | undefined;
    fundingFeeShort1hPercentage?: number | undefined;
    totalFeeShort1hPercentage?: number | undefined;
    fundingFeeLong1hPercentage?: number | undefined;
    totalFeeLong1hPercentage?: number | undefined;
    fundingFeeShort8hPercentage?: number | undefined;
    totalFeeShort8hPercentage?: number | undefined;
    fundingFeeLong8hPercentage?: number | undefined;
    totalFeeLong8hPercentage?: number | undefined;
    fundingFeeShort24hPercentage?: number | undefined;
    totalFeeShort24hPercentage?: number | undefined;
    fundingFeeLong24hPercentage?: number | undefined;
    totalFeeLong24hPercentage?: number | undefined;
    fundingFeeShort1yPercentage?: number | undefined;
    totalFeeShort1yPercentage?: number | undefined;
    fundingFeeLong1yPercentage?: number | undefined;
    totalFeeLong1yPercentage?: number | undefined;
    collateral?: string | undefined;
}>;
export type PerpDataMarketDetailsOutput = z.infer<typeof PerpDataMarketDetailsOutputSchema>;
export {};
