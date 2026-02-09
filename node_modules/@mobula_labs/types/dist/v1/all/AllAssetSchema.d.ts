import { z } from 'zod';
export declare const AllAssetsParamsSchema: z.ZodObject<{
    fields: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    fields: string;
}, {
    fields?: string | undefined;
}>;
export type AllAssetsParams = z.input<typeof AllAssetsParamsSchema>;
export declare const AllAssetsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        symbol: z.ZodString;
        logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        price: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        price_change_1h: z.ZodOptional<z.ZodNumber>;
        price_change_24h: z.ZodOptional<z.ZodNumber>;
        price_change_7d: z.ZodOptional<z.ZodNumber>;
        price_change_1m: z.ZodOptional<z.ZodNumber>;
        price_change_1y: z.ZodOptional<z.ZodNumber>;
        market_cap: z.ZodOptional<z.ZodNumber>;
        liquidity: z.ZodOptional<z.ZodNumber>;
        volume: z.ZodOptional<z.ZodNumber>;
        blockchains: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        contracts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        decimals: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        website: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        twitter: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        chat: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        name: string;
        id: number;
        decimals?: number[] | undefined;
        logo?: string | null | undefined;
        twitter?: string | null | undefined;
        website?: string | null | undefined;
        price?: number | null | undefined;
        liquidity?: number | undefined;
        price_change_1h?: number | undefined;
        price_change_24h?: number | undefined;
        market_cap?: number | undefined;
        price_change_7d?: number | undefined;
        price_change_1m?: number | undefined;
        price_change_1y?: number | undefined;
        volume?: number | undefined;
        blockchains?: string[] | undefined;
        contracts?: string[] | undefined;
        chat?: string | null | undefined;
    }, {
        symbol: string;
        name: string;
        id: number;
        decimals?: number[] | undefined;
        logo?: string | null | undefined;
        twitter?: string | null | undefined;
        website?: string | null | undefined;
        price?: number | null | undefined;
        liquidity?: number | undefined;
        price_change_1h?: number | undefined;
        price_change_24h?: number | undefined;
        market_cap?: number | undefined;
        price_change_7d?: number | undefined;
        price_change_1m?: number | undefined;
        price_change_1y?: number | undefined;
        volume?: number | undefined;
        blockchains?: string[] | undefined;
        contracts?: string[] | undefined;
        chat?: string | null | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        symbol: string;
        name: string;
        id: number;
        decimals?: number[] | undefined;
        logo?: string | null | undefined;
        twitter?: string | null | undefined;
        website?: string | null | undefined;
        price?: number | null | undefined;
        liquidity?: number | undefined;
        price_change_1h?: number | undefined;
        price_change_24h?: number | undefined;
        market_cap?: number | undefined;
        price_change_7d?: number | undefined;
        price_change_1m?: number | undefined;
        price_change_1y?: number | undefined;
        volume?: number | undefined;
        blockchains?: string[] | undefined;
        contracts?: string[] | undefined;
        chat?: string | null | undefined;
    }[];
}, {
    data: {
        symbol: string;
        name: string;
        id: number;
        decimals?: number[] | undefined;
        logo?: string | null | undefined;
        twitter?: string | null | undefined;
        website?: string | null | undefined;
        price?: number | null | undefined;
        liquidity?: number | undefined;
        price_change_1h?: number | undefined;
        price_change_24h?: number | undefined;
        market_cap?: number | undefined;
        price_change_7d?: number | undefined;
        price_change_1m?: number | undefined;
        price_change_1y?: number | undefined;
        volume?: number | undefined;
        blockchains?: string[] | undefined;
        contracts?: string[] | undefined;
        chat?: string | null | undefined;
    }[];
}>;
export type AllAssetsResponse = z.infer<typeof AllAssetsResponseSchema>;
