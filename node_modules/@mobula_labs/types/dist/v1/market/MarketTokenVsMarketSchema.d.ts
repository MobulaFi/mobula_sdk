import { z } from 'zod';
export declare const MarketTokenVsMarketParamsSchema: z.ZodObject<{
    tag: z.ZodString;
}, "strip", z.ZodTypeAny, {
    tag: string;
}, {
    tag: string;
}>;
export type MarketTokenVsMarketParams = z.input<typeof MarketTokenVsMarketParamsSchema>;
export declare const selectAssetTokenVsCategory: {
    readonly marketCapUSD: true;
    readonly priceUSD: true;
    readonly priceChange1hPercent: true;
    readonly priceChange24hPercent: true;
    readonly priceChange7dPercent: true;
    readonly priceChange1mPercent: true;
    readonly name: true;
    readonly symbol: true;
};
export declare const selectCategoryTokenVsCategory: {
    readonly id: true;
    readonly marketCapUSD: true;
    readonly marketCapChange24hPercent: true;
    readonly marketCapChange7dPercent: true;
    readonly marketCapChange1mPercent: true;
    readonly name: true;
    readonly volumeUSD: true;
};
export declare const MarketTokenVsMarketResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodUnion<[z.ZodNullable<z.ZodObject<{
        marketCapUSD: z.ZodNumber;
        priceUSD: z.ZodNullable<z.ZodNumber>;
        priceChange1hPercent: z.ZodNumber;
        priceChange24hPercent: z.ZodNumber;
        priceChange7dPercent: z.ZodNumber;
        priceChange1mPercent: z.ZodNumber;
        name: z.ZodString;
        symbol: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        name: string;
        priceUSD: number | null;
        marketCapUSD: number;
        priceChange1hPercent: number;
        priceChange7dPercent: number;
        priceChange24hPercent: number;
        priceChange1mPercent: number;
    }, {
        symbol: string;
        name: string;
        priceUSD: number | null;
        marketCapUSD: number;
        priceChange1hPercent: number;
        priceChange7dPercent: number;
        priceChange24hPercent: number;
        priceChange1mPercent: number;
    }>>, z.ZodNullable<z.ZodObject<{
        id: z.ZodNumber;
        marketCapUSD: z.ZodNumber;
        marketCapChange24hPercent: z.ZodNumber;
        marketCapChange7dPercent: z.ZodNumber;
        marketCapChange1mPercent: z.ZodNumber;
        name: z.ZodString;
        volumeUSD: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
        marketCapUSD: number;
        marketCapChange24hPercent: number;
        marketCapChange7dPercent: number;
        marketCapChange1mPercent: number;
        volumeUSD: number;
    }, {
        name: string;
        id: number;
        marketCapUSD: number;
        marketCapChange24hPercent: number;
        marketCapChange7dPercent: number;
        marketCapChange1mPercent: number;
        volumeUSD: number;
    }>>]>, "many">;
}, "strip", z.ZodTypeAny, {
    data: ({
        symbol: string;
        name: string;
        priceUSD: number | null;
        marketCapUSD: number;
        priceChange1hPercent: number;
        priceChange7dPercent: number;
        priceChange24hPercent: number;
        priceChange1mPercent: number;
    } | {
        name: string;
        id: number;
        marketCapUSD: number;
        marketCapChange24hPercent: number;
        marketCapChange7dPercent: number;
        marketCapChange1mPercent: number;
        volumeUSD: number;
    } | null)[];
}, {
    data: ({
        symbol: string;
        name: string;
        priceUSD: number | null;
        marketCapUSD: number;
        priceChange1hPercent: number;
        priceChange7dPercent: number;
        priceChange24hPercent: number;
        priceChange1mPercent: number;
    } | {
        name: string;
        id: number;
        marketCapUSD: number;
        marketCapChange24hPercent: number;
        marketCapChange7dPercent: number;
        marketCapChange1mPercent: number;
        volumeUSD: number;
    } | null)[];
}>;
export type MarketTokenVsMarketResponse = z.infer<typeof MarketTokenVsMarketResponseSchema>;
