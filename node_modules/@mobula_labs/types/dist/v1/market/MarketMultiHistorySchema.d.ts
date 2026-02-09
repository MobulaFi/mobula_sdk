import { z } from 'zod';
export declare const MarketMultiHistoryParamsSchema: z.ZodObject<{
    assets: z.ZodEffects<z.ZodOptional<z.ZodString>, string[], string | undefined>;
    period: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    symbols: z.ZodEffects<z.ZodOptional<z.ZodString>, string[], string | undefined>;
    blockchains: z.ZodEffects<z.ZodOptional<z.ZodString>, string[], string | undefined>;
    ids: z.ZodEffects<z.ZodOptional<z.ZodString>, number[], string | undefined>;
    from: z.ZodOptional<z.ZodString>;
    froms: z.ZodEffects<z.ZodOptional<z.ZodString>, number[] | undefined, string | undefined>;
    to: z.ZodOptional<z.ZodString>;
    tos: z.ZodEffects<z.ZodOptional<z.ZodString>, number[] | undefined, string | undefined>;
}, "strip", z.ZodTypeAny, {
    blockchains: string[];
    ids: number[];
    symbols: string[];
    assets: string[];
    from?: string | undefined;
    to?: string | undefined;
    period?: string | undefined;
    froms?: number[] | undefined;
    tos?: number[] | undefined;
}, {
    blockchains?: string | undefined;
    from?: string | undefined;
    to?: string | undefined;
    period?: string | undefined;
    ids?: string | undefined;
    symbols?: string | undefined;
    assets?: string | undefined;
    froms?: string | undefined;
    tos?: string | undefined;
}>;
export type MarketMultiHistoryParams = z.input<typeof MarketMultiHistoryParamsSchema>;
export declare const MarketMultiHistoryResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        price_history: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodNullable<z.ZodNumber>, "many">, "many">>;
        volume_history: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodNullable<z.ZodNumber>, "many">, "many">>;
        market_cap_history: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodNullable<z.ZodNumber>, "many">, "many">>;
        market_cap_diluted_history: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodNullable<z.ZodNumber>, "many">, "many">>;
        name: z.ZodString;
        symbol: z.ZodString;
        address: z.ZodString;
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        name: string;
        address: string;
        id?: number | null | undefined;
        volume_history?: (number | null)[][] | undefined;
        price_history?: (number | null)[][] | undefined;
        market_cap_history?: (number | null)[][] | undefined;
        market_cap_diluted_history?: (number | null)[][] | undefined;
    }, {
        symbol: string;
        name: string;
        address: string;
        id?: number | null | undefined;
        volume_history?: (number | null)[][] | undefined;
        price_history?: (number | null)[][] | undefined;
        market_cap_history?: (number | null)[][] | undefined;
        market_cap_diluted_history?: (number | null)[][] | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        symbol: string;
        name: string;
        address: string;
        id?: number | null | undefined;
        volume_history?: (number | null)[][] | undefined;
        price_history?: (number | null)[][] | undefined;
        market_cap_history?: (number | null)[][] | undefined;
        market_cap_diluted_history?: (number | null)[][] | undefined;
    }[];
}, {
    data: {
        symbol: string;
        name: string;
        address: string;
        id?: number | null | undefined;
        volume_history?: (number | null)[][] | undefined;
        price_history?: (number | null)[][] | undefined;
        market_cap_history?: (number | null)[][] | undefined;
        market_cap_diluted_history?: (number | null)[][] | undefined;
    }[];
}>;
export type MarketMultiHistoryResponse = z.infer<typeof MarketMultiHistoryResponseSchema>;
