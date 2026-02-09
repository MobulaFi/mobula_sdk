import { z } from 'zod';
export declare const MarketMultiPricesParamsSchema: z.ZodObject<{
    blockchains: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string[], string | string[]>>;
    assets: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["address", "name"]>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: "name" | "address";
    }, {
        value: string;
        type: "name" | "address";
    }>, "many">]>>;
}, "strip", z.ZodTypeAny, {
    blockchains?: string[] | undefined;
    assets?: string | {
        value: string;
        type: "name" | "address";
    }[] | undefined;
}, {
    blockchains?: string | string[] | undefined;
    assets?: string | {
        value: string;
        type: "name" | "address";
    }[] | undefined;
}>;
export type MarketMultiPricesParams = z.input<typeof MarketMultiPricesParamsSchema>;
export declare const MarketMultiPricesResponseSchema: z.ZodObject<{
    data: z.ZodRecord<z.ZodString, z.ZodObject<{
        price: z.ZodNullable<z.ZodNumber>;
        name: z.ZodNullable<z.ZodString>;
        symbol: z.ZodNullable<z.ZodString>;
        logo: z.ZodNullable<z.ZodString>;
        marketCap: z.ZodNullable<z.ZodNumber>;
        marketCapDiluted: z.ZodNullable<z.ZodNumber>;
        liquidity: z.ZodNullable<z.ZodNumber>;
        liquidityMax: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        symbol: string | null;
        name: string | null;
        logo: string | null;
        price: number | null;
        marketCap: number | null;
        marketCapDiluted: number | null;
        liquidity: number | null;
        liquidityMax: number | null;
    }, {
        symbol: string | null;
        name: string | null;
        logo: string | null;
        price: number | null;
        marketCap: number | null;
        marketCapDiluted: number | null;
        liquidity: number | null;
        liquidityMax: number | null;
    }>>;
}, "strip", z.ZodTypeAny, {
    data: Record<string, {
        symbol: string | null;
        name: string | null;
        logo: string | null;
        price: number | null;
        marketCap: number | null;
        marketCapDiluted: number | null;
        liquidity: number | null;
        liquidityMax: number | null;
    }>;
}, {
    data: Record<string, {
        symbol: string | null;
        name: string | null;
        logo: string | null;
        price: number | null;
        marketCap: number | null;
        marketCapDiluted: number | null;
        liquidity: number | null;
        liquidityMax: number | null;
    }>;
}>;
export type MarketMultiPricesResponse = z.infer<typeof MarketMultiPricesResponseSchema>;
