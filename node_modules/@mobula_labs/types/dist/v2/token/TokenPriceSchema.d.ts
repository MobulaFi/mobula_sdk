import { z } from 'zod';
export declare const TokenPriceParamsSchema: z.ZodObject<{
    blockchain: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    address?: string | undefined;
    blockchain?: string | undefined;
}, {
    address?: string | undefined;
    blockchain?: string | undefined;
}>;
export declare const TokenPriceBatchParamsSchema: z.ZodUnion<[z.ZodArray<z.ZodObject<{
    blockchain: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    address?: string | undefined;
    blockchain?: string | undefined;
}, {
    address?: string | undefined;
    blockchain?: string | undefined;
}>, "many">, z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        blockchain: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        address?: string | undefined;
        blockchain?: string | undefined;
    }, {
        address?: string | undefined;
        blockchain?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    items: {
        address?: string | undefined;
        blockchain?: string | undefined;
    }[];
}, {
    items: {
        address?: string | undefined;
        blockchain?: string | undefined;
    }[];
}>]>;
export type TokenPriceParams = z.input<typeof TokenPriceParamsSchema>;
export type TokenPriceBatchParams = z.input<typeof TokenPriceBatchParamsSchema>;
declare const TokenPriceItemResponseSchema: z.ZodObject<{
    name: z.ZodNullable<z.ZodString>;
    symbol: z.ZodNullable<z.ZodString>;
    logo: z.ZodNullable<z.ZodString>;
    priceUSD: z.ZodNullable<z.ZodNumber>;
    marketCapUSD: z.ZodNullable<z.ZodNumber>;
    marketCapDilutedUSD: z.ZodNullable<z.ZodNumber>;
    liquidityUSD: z.ZodNullable<z.ZodNumber>;
    liquidityMaxUSD: z.ZodNullable<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    symbol: string | null;
    name: string | null;
    priceUSD: number | null;
    marketCapUSD: number | null;
    marketCapDilutedUSD: number | null;
    logo: string | null;
    liquidityUSD: number | null;
    liquidityMaxUSD: number | null;
}, {
    symbol: string | null;
    name: string | null;
    priceUSD: number | null;
    marketCapUSD: number | null;
    marketCapDilutedUSD: number | null;
    logo: string | null;
    liquidityUSD: number | null;
    liquidityMaxUSD: number | null;
}>;
export declare const TokenPriceResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        name: z.ZodNullable<z.ZodString>;
        symbol: z.ZodNullable<z.ZodString>;
        logo: z.ZodNullable<z.ZodString>;
        priceUSD: z.ZodNullable<z.ZodNumber>;
        marketCapUSD: z.ZodNullable<z.ZodNumber>;
        marketCapDilutedUSD: z.ZodNullable<z.ZodNumber>;
        liquidityUSD: z.ZodNullable<z.ZodNumber>;
        liquidityMaxUSD: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        symbol: string | null;
        name: string | null;
        priceUSD: number | null;
        marketCapUSD: number | null;
        marketCapDilutedUSD: number | null;
        logo: string | null;
        liquidityUSD: number | null;
        liquidityMaxUSD: number | null;
    }, {
        symbol: string | null;
        name: string | null;
        priceUSD: number | null;
        marketCapUSD: number | null;
        marketCapDilutedUSD: number | null;
        logo: string | null;
        liquidityUSD: number | null;
        liquidityMaxUSD: number | null;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        symbol: string | null;
        name: string | null;
        priceUSD: number | null;
        marketCapUSD: number | null;
        marketCapDilutedUSD: number | null;
        logo: string | null;
        liquidityUSD: number | null;
        liquidityMaxUSD: number | null;
    };
}, {
    data: {
        symbol: string | null;
        name: string | null;
        priceUSD: number | null;
        marketCapUSD: number | null;
        marketCapDilutedUSD: number | null;
        logo: string | null;
        liquidityUSD: number | null;
        liquidityMaxUSD: number | null;
    };
}>;
export declare const TokenPriceBatchResponseSchema: z.ZodObject<{
    payload: z.ZodArray<z.ZodNullable<z.ZodUnion<[z.ZodObject<{
        name: z.ZodNullable<z.ZodString>;
        symbol: z.ZodNullable<z.ZodString>;
        logo: z.ZodNullable<z.ZodString>;
        priceUSD: z.ZodNullable<z.ZodNumber>;
        marketCapUSD: z.ZodNullable<z.ZodNumber>;
        marketCapDilutedUSD: z.ZodNullable<z.ZodNumber>;
        liquidityUSD: z.ZodNullable<z.ZodNumber>;
        liquidityMaxUSD: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        symbol: string | null;
        name: string | null;
        priceUSD: number | null;
        marketCapUSD: number | null;
        marketCapDilutedUSD: number | null;
        logo: string | null;
        liquidityUSD: number | null;
        liquidityMaxUSD: number | null;
    }, {
        symbol: string | null;
        name: string | null;
        priceUSD: number | null;
        marketCapUSD: number | null;
        marketCapDilutedUSD: number | null;
        logo: string | null;
        liquidityUSD: number | null;
        liquidityMaxUSD: number | null;
    }>, z.ZodObject<{
        error: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        error?: string | undefined;
    }, {
        error?: string | undefined;
    }>]>>, "many">;
}, "strip", z.ZodTypeAny, {
    payload: ({
        symbol: string | null;
        name: string | null;
        priceUSD: number | null;
        marketCapUSD: number | null;
        marketCapDilutedUSD: number | null;
        logo: string | null;
        liquidityUSD: number | null;
        liquidityMaxUSD: number | null;
    } | {
        error?: string | undefined;
    } | null)[];
}, {
    payload: ({
        symbol: string | null;
        name: string | null;
        priceUSD: number | null;
        marketCapUSD: number | null;
        marketCapDilutedUSD: number | null;
        logo: string | null;
        liquidityUSD: number | null;
        liquidityMaxUSD: number | null;
    } | {
        error?: string | undefined;
    } | null)[];
}>;
export type TokenPriceResponse = z.infer<typeof TokenPriceResponseSchema>;
export type TokenPriceBatchResponse = z.infer<typeof TokenPriceBatchResponseSchema>;
export type TokenPriceItem = z.infer<typeof TokenPriceItemResponseSchema>;
export {};
