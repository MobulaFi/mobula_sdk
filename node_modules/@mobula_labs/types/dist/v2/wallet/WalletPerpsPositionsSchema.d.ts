import { z } from 'zod';
export declare const ExchangesIds: z.ZodEnum<["gains", "hyperliquid", "gte", "lighter", "drift"]>;
export declare const PerpsPositionSchema: z.ZodObject<{
    id: z.ZodString;
    entryPriceQuote: z.ZodNumber;
    currentLeverage: z.ZodNumber;
    amountUSD: z.ZodNumber;
    amountRaw: z.ZodBigInt;
    side: z.ZodEnum<["BUY", "SELL"]>;
    liquidationPriceQuote: z.ZodNumber;
    currentPriceQuote: z.ZodNumber;
    realizedPnlUSD: z.ZodNumber;
    unrealizedPnlUSD: z.ZodNumber;
    realizedPnlPercent: z.ZodNumber;
    unrealizedPnlPercent: z.ZodNumber;
    tp: z.ZodArray<z.ZodObject<{
        size: z.ZodBigInt;
        price: z.ZodNumber;
        id: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: number;
        price: number;
        size: bigint;
    }, {
        id: number;
        price: number;
        size: bigint;
    }>, "many">;
    sl: z.ZodArray<z.ZodObject<{
        size: z.ZodBigInt;
        price: z.ZodNumber;
        id: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: number;
        price: number;
        size: bigint;
    }, {
        id: number;
        price: number;
        size: bigint;
    }>, "many">;
    marketId: z.ZodString;
    exchange: z.ZodEnum<["gains", "hyperliquid", "gte", "lighter", "drift"]>;
    feesOpeningUSD: z.ZodNumber;
    feesClosingUSD: z.ZodNumber;
    feesFundingUSD: z.ZodNumber;
    openDate: z.ZodDate;
    lastUpdate: z.ZodDate;
    address: z.ZodString;
    chainId: z.ZodString;
    collateralAsset: z.ZodString;
}, "strip", z.ZodTypeAny, {
    marketId: string;
    address: string;
    realizedPnlUSD: number;
    unrealizedPnlUSD: number;
    chainId: string;
    id: string;
    exchange: "gte" | "gains" | "hyperliquid" | "lighter" | "drift";
    amountRaw: bigint;
    amountUSD: number;
    lastUpdate: Date;
    side: "BUY" | "SELL";
    tp: {
        id: number;
        price: number;
        size: bigint;
    }[];
    sl: {
        id: number;
        price: number;
        size: bigint;
    }[];
    entryPriceQuote: number;
    currentLeverage: number;
    liquidationPriceQuote: number;
    currentPriceQuote: number;
    realizedPnlPercent: number;
    unrealizedPnlPercent: number;
    feesOpeningUSD: number;
    feesClosingUSD: number;
    feesFundingUSD: number;
    openDate: Date;
    collateralAsset: string;
}, {
    marketId: string;
    address: string;
    realizedPnlUSD: number;
    unrealizedPnlUSD: number;
    chainId: string;
    id: string;
    exchange: "gte" | "gains" | "hyperliquid" | "lighter" | "drift";
    amountRaw: bigint;
    amountUSD: number;
    lastUpdate: Date;
    side: "BUY" | "SELL";
    tp: {
        id: number;
        price: number;
        size: bigint;
    }[];
    sl: {
        id: number;
        price: number;
        size: bigint;
    }[];
    entryPriceQuote: number;
    currentLeverage: number;
    liquidationPriceQuote: number;
    currentPriceQuote: number;
    realizedPnlPercent: number;
    unrealizedPnlPercent: number;
    feesOpeningUSD: number;
    feesClosingUSD: number;
    feesFundingUSD: number;
    openDate: Date;
    collateralAsset: string;
}>;
export type PerpsPosition = z.infer<typeof PerpsPositionSchema>;
export declare const PerpsPositionNonExecutedSchema: z.ZodObject<{
    id: z.ZodString;
    entryPriceQuote: z.ZodNumber;
    currentLeverage: z.ZodNumber;
    amountUSD: z.ZodNumber;
    amountRaw: z.ZodBigInt;
    side: z.ZodEnum<["BUY", "SELL"]>;
    liquidationPriceQuote: z.ZodNumber;
    currentPriceQuote: z.ZodNumber;
    realizedPnlUSD: z.ZodNumber;
    unrealizedPnlUSD: z.ZodNumber;
    realizedPnlPercent: z.ZodNumber;
    unrealizedPnlPercent: z.ZodNumber;
    tp: z.ZodArray<z.ZodObject<{
        size: z.ZodBigInt;
        price: z.ZodNumber;
        id: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: number;
        price: number;
        size: bigint;
    }, {
        id: number;
        price: number;
        size: bigint;
    }>, "many">;
    sl: z.ZodArray<z.ZodObject<{
        size: z.ZodBigInt;
        price: z.ZodNumber;
        id: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: number;
        price: number;
        size: bigint;
    }, {
        id: number;
        price: number;
        size: bigint;
    }>, "many">;
    marketId: z.ZodString;
    exchange: z.ZodEnum<["gains", "hyperliquid", "gte", "lighter", "drift"]>;
    feesOpeningUSD: z.ZodNumber;
    feesClosingUSD: z.ZodNumber;
    feesFundingUSD: z.ZodNumber;
    openDate: z.ZodDate;
    lastUpdate: z.ZodDate;
    address: z.ZodString;
    chainId: z.ZodString;
    collateralAsset: z.ZodString;
} & {
    type: z.ZodEnum<["STOP", "LIMIT"]>;
}, "strip", z.ZodTypeAny, {
    type: "STOP" | "LIMIT";
    marketId: string;
    address: string;
    realizedPnlUSD: number;
    unrealizedPnlUSD: number;
    chainId: string;
    id: string;
    exchange: "gte" | "gains" | "hyperliquid" | "lighter" | "drift";
    amountRaw: bigint;
    amountUSD: number;
    lastUpdate: Date;
    side: "BUY" | "SELL";
    tp: {
        id: number;
        price: number;
        size: bigint;
    }[];
    sl: {
        id: number;
        price: number;
        size: bigint;
    }[];
    entryPriceQuote: number;
    currentLeverage: number;
    liquidationPriceQuote: number;
    currentPriceQuote: number;
    realizedPnlPercent: number;
    unrealizedPnlPercent: number;
    feesOpeningUSD: number;
    feesClosingUSD: number;
    feesFundingUSD: number;
    openDate: Date;
    collateralAsset: string;
}, {
    type: "STOP" | "LIMIT";
    marketId: string;
    address: string;
    realizedPnlUSD: number;
    unrealizedPnlUSD: number;
    chainId: string;
    id: string;
    exchange: "gte" | "gains" | "hyperliquid" | "lighter" | "drift";
    amountRaw: bigint;
    amountUSD: number;
    lastUpdate: Date;
    side: "BUY" | "SELL";
    tp: {
        id: number;
        price: number;
        size: bigint;
    }[];
    sl: {
        id: number;
        price: number;
        size: bigint;
    }[];
    entryPriceQuote: number;
    currentLeverage: number;
    liquidationPriceQuote: number;
    currentPriceQuote: number;
    realizedPnlPercent: number;
    unrealizedPnlPercent: number;
    feesOpeningUSD: number;
    feesClosingUSD: number;
    feesFundingUSD: number;
    openDate: Date;
    collateralAsset: string;
}>;
export type PerpsPositionNonExecuted = z.infer<typeof PerpsPositionNonExecutedSchema>;
export declare const WalletPerpsPositionsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        entryPriceQuote: z.ZodNumber;
        currentLeverage: z.ZodNumber;
        amountUSD: z.ZodNumber;
        amountRaw: z.ZodBigInt;
        side: z.ZodEnum<["BUY", "SELL"]>;
        liquidationPriceQuote: z.ZodNumber;
        currentPriceQuote: z.ZodNumber;
        realizedPnlUSD: z.ZodNumber;
        unrealizedPnlUSD: z.ZodNumber;
        realizedPnlPercent: z.ZodNumber;
        unrealizedPnlPercent: z.ZodNumber;
        tp: z.ZodArray<z.ZodObject<{
            size: z.ZodBigInt;
            price: z.ZodNumber;
            id: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: number;
            price: number;
            size: bigint;
        }, {
            id: number;
            price: number;
            size: bigint;
        }>, "many">;
        sl: z.ZodArray<z.ZodObject<{
            size: z.ZodBigInt;
            price: z.ZodNumber;
            id: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: number;
            price: number;
            size: bigint;
        }, {
            id: number;
            price: number;
            size: bigint;
        }>, "many">;
        marketId: z.ZodString;
        exchange: z.ZodEnum<["gains", "hyperliquid", "gte", "lighter", "drift"]>;
        feesOpeningUSD: z.ZodNumber;
        feesClosingUSD: z.ZodNumber;
        feesFundingUSD: z.ZodNumber;
        openDate: z.ZodDate;
        lastUpdate: z.ZodDate;
        address: z.ZodString;
        chainId: z.ZodString;
        collateralAsset: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        marketId: string;
        address: string;
        realizedPnlUSD: number;
        unrealizedPnlUSD: number;
        chainId: string;
        id: string;
        exchange: "gte" | "gains" | "hyperliquid" | "lighter" | "drift";
        amountRaw: bigint;
        amountUSD: number;
        lastUpdate: Date;
        side: "BUY" | "SELL";
        tp: {
            id: number;
            price: number;
            size: bigint;
        }[];
        sl: {
            id: number;
            price: number;
            size: bigint;
        }[];
        entryPriceQuote: number;
        currentLeverage: number;
        liquidationPriceQuote: number;
        currentPriceQuote: number;
        realizedPnlPercent: number;
        unrealizedPnlPercent: number;
        feesOpeningUSD: number;
        feesClosingUSD: number;
        feesFundingUSD: number;
        openDate: Date;
        collateralAsset: string;
    }, {
        marketId: string;
        address: string;
        realizedPnlUSD: number;
        unrealizedPnlUSD: number;
        chainId: string;
        id: string;
        exchange: "gte" | "gains" | "hyperliquid" | "lighter" | "drift";
        amountRaw: bigint;
        amountUSD: number;
        lastUpdate: Date;
        side: "BUY" | "SELL";
        tp: {
            id: number;
            price: number;
            size: bigint;
        }[];
        sl: {
            id: number;
            price: number;
            size: bigint;
        }[];
        entryPriceQuote: number;
        currentLeverage: number;
        liquidationPriceQuote: number;
        currentPriceQuote: number;
        realizedPnlPercent: number;
        unrealizedPnlPercent: number;
        feesOpeningUSD: number;
        feesClosingUSD: number;
        feesFundingUSD: number;
        openDate: Date;
        collateralAsset: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        marketId: string;
        address: string;
        realizedPnlUSD: number;
        unrealizedPnlUSD: number;
        chainId: string;
        id: string;
        exchange: "gte" | "gains" | "hyperliquid" | "lighter" | "drift";
        amountRaw: bigint;
        amountUSD: number;
        lastUpdate: Date;
        side: "BUY" | "SELL";
        tp: {
            id: number;
            price: number;
            size: bigint;
        }[];
        sl: {
            id: number;
            price: number;
            size: bigint;
        }[];
        entryPriceQuote: number;
        currentLeverage: number;
        liquidationPriceQuote: number;
        currentPriceQuote: number;
        realizedPnlPercent: number;
        unrealizedPnlPercent: number;
        feesOpeningUSD: number;
        feesClosingUSD: number;
        feesFundingUSD: number;
        openDate: Date;
        collateralAsset: string;
    }[];
}, {
    data: {
        marketId: string;
        address: string;
        realizedPnlUSD: number;
        unrealizedPnlUSD: number;
        chainId: string;
        id: string;
        exchange: "gte" | "gains" | "hyperliquid" | "lighter" | "drift";
        amountRaw: bigint;
        amountUSD: number;
        lastUpdate: Date;
        side: "BUY" | "SELL";
        tp: {
            id: number;
            price: number;
            size: bigint;
        }[];
        sl: {
            id: number;
            price: number;
            size: bigint;
        }[];
        entryPriceQuote: number;
        currentLeverage: number;
        liquidationPriceQuote: number;
        currentPriceQuote: number;
        realizedPnlPercent: number;
        unrealizedPnlPercent: number;
        feesOpeningUSD: number;
        feesClosingUSD: number;
        feesFundingUSD: number;
        openDate: Date;
        collateralAsset: string;
    }[];
}>;
export declare const WalletPerpsPositionsNonExecutedResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        entryPriceQuote: z.ZodNumber;
        currentLeverage: z.ZodNumber;
        amountUSD: z.ZodNumber;
        amountRaw: z.ZodBigInt;
        side: z.ZodEnum<["BUY", "SELL"]>;
        liquidationPriceQuote: z.ZodNumber;
        currentPriceQuote: z.ZodNumber;
        realizedPnlUSD: z.ZodNumber;
        unrealizedPnlUSD: z.ZodNumber;
        realizedPnlPercent: z.ZodNumber;
        unrealizedPnlPercent: z.ZodNumber;
        tp: z.ZodArray<z.ZodObject<{
            size: z.ZodBigInt;
            price: z.ZodNumber;
            id: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: number;
            price: number;
            size: bigint;
        }, {
            id: number;
            price: number;
            size: bigint;
        }>, "many">;
        sl: z.ZodArray<z.ZodObject<{
            size: z.ZodBigInt;
            price: z.ZodNumber;
            id: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: number;
            price: number;
            size: bigint;
        }, {
            id: number;
            price: number;
            size: bigint;
        }>, "many">;
        marketId: z.ZodString;
        exchange: z.ZodEnum<["gains", "hyperliquid", "gte", "lighter", "drift"]>;
        feesOpeningUSD: z.ZodNumber;
        feesClosingUSD: z.ZodNumber;
        feesFundingUSD: z.ZodNumber;
        openDate: z.ZodDate;
        lastUpdate: z.ZodDate;
        address: z.ZodString;
        chainId: z.ZodString;
        collateralAsset: z.ZodString;
    } & {
        type: z.ZodEnum<["STOP", "LIMIT"]>;
    }, "strip", z.ZodTypeAny, {
        type: "STOP" | "LIMIT";
        marketId: string;
        address: string;
        realizedPnlUSD: number;
        unrealizedPnlUSD: number;
        chainId: string;
        id: string;
        exchange: "gte" | "gains" | "hyperliquid" | "lighter" | "drift";
        amountRaw: bigint;
        amountUSD: number;
        lastUpdate: Date;
        side: "BUY" | "SELL";
        tp: {
            id: number;
            price: number;
            size: bigint;
        }[];
        sl: {
            id: number;
            price: number;
            size: bigint;
        }[];
        entryPriceQuote: number;
        currentLeverage: number;
        liquidationPriceQuote: number;
        currentPriceQuote: number;
        realizedPnlPercent: number;
        unrealizedPnlPercent: number;
        feesOpeningUSD: number;
        feesClosingUSD: number;
        feesFundingUSD: number;
        openDate: Date;
        collateralAsset: string;
    }, {
        type: "STOP" | "LIMIT";
        marketId: string;
        address: string;
        realizedPnlUSD: number;
        unrealizedPnlUSD: number;
        chainId: string;
        id: string;
        exchange: "gte" | "gains" | "hyperliquid" | "lighter" | "drift";
        amountRaw: bigint;
        amountUSD: number;
        lastUpdate: Date;
        side: "BUY" | "SELL";
        tp: {
            id: number;
            price: number;
            size: bigint;
        }[];
        sl: {
            id: number;
            price: number;
            size: bigint;
        }[];
        entryPriceQuote: number;
        currentLeverage: number;
        liquidationPriceQuote: number;
        currentPriceQuote: number;
        realizedPnlPercent: number;
        unrealizedPnlPercent: number;
        feesOpeningUSD: number;
        feesClosingUSD: number;
        feesFundingUSD: number;
        openDate: Date;
        collateralAsset: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        type: "STOP" | "LIMIT";
        marketId: string;
        address: string;
        realizedPnlUSD: number;
        unrealizedPnlUSD: number;
        chainId: string;
        id: string;
        exchange: "gte" | "gains" | "hyperliquid" | "lighter" | "drift";
        amountRaw: bigint;
        amountUSD: number;
        lastUpdate: Date;
        side: "BUY" | "SELL";
        tp: {
            id: number;
            price: number;
            size: bigint;
        }[];
        sl: {
            id: number;
            price: number;
            size: bigint;
        }[];
        entryPriceQuote: number;
        currentLeverage: number;
        liquidationPriceQuote: number;
        currentPriceQuote: number;
        realizedPnlPercent: number;
        unrealizedPnlPercent: number;
        feesOpeningUSD: number;
        feesClosingUSD: number;
        feesFundingUSD: number;
        openDate: Date;
        collateralAsset: string;
    }[];
}, {
    data: {
        type: "STOP" | "LIMIT";
        marketId: string;
        address: string;
        realizedPnlUSD: number;
        unrealizedPnlUSD: number;
        chainId: string;
        id: string;
        exchange: "gte" | "gains" | "hyperliquid" | "lighter" | "drift";
        amountRaw: bigint;
        amountUSD: number;
        lastUpdate: Date;
        side: "BUY" | "SELL";
        tp: {
            id: number;
            price: number;
            size: bigint;
        }[];
        sl: {
            id: number;
            price: number;
            size: bigint;
        }[];
        entryPriceQuote: number;
        currentLeverage: number;
        liquidationPriceQuote: number;
        currentPriceQuote: number;
        realizedPnlPercent: number;
        unrealizedPnlPercent: number;
        feesOpeningUSD: number;
        feesClosingUSD: number;
        feesFundingUSD: number;
        openDate: Date;
        collateralAsset: string;
    }[];
}>;
