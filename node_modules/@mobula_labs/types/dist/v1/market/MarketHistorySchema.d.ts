import { z } from 'zod';
export declare const MarketHistoryParamsSchema: z.ZodObject<{
    blockchain: z.ZodOptional<z.ZodString>;
    asset: z.ZodOptional<z.ZodString>;
    symbol: z.ZodOptional<z.ZodString>;
    period: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    id: z.ZodOptional<z.ZodNumber>;
    from: z.ZodDefault<z.ZodNumber>;
    to: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    from: number;
    to: number;
    symbol?: string | undefined;
    id?: number | undefined;
    blockchain?: string | undefined;
    asset?: string | undefined;
    period?: string | undefined;
}, {
    symbol?: string | undefined;
    id?: number | undefined;
    blockchain?: string | undefined;
    asset?: string | undefined;
    from?: number | undefined;
    to?: number | undefined;
    period?: string | undefined;
}>;
export type MarketHistoryParams = z.input<typeof MarketHistoryParamsSchema>;
export declare const MarketHistoryResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        price_history: z.ZodArray<z.ZodArray<z.ZodNullable<z.ZodNumber>, "many">, "many">;
        volume_history: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodNullable<z.ZodNumber>, "many">, "many">>;
        market_cap_history: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodNullable<z.ZodNumber>, "many">, "many">>;
        market_cap_diluted_history: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodNullable<z.ZodNumber>, "many">, "many">>;
        name: z.ZodOptional<z.ZodString>;
        symbol: z.ZodOptional<z.ZodString>;
        blockchain: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        price_history: (number | null)[][];
        symbol?: string | undefined;
        name?: string | undefined;
        address?: string | undefined;
        blockchain?: string | undefined;
        volume_history?: (number | null)[][] | undefined;
        market_cap_history?: (number | null)[][] | undefined;
        market_cap_diluted_history?: (number | null)[][] | undefined;
    }, {
        price_history: (number | null)[][];
        symbol?: string | undefined;
        name?: string | undefined;
        address?: string | undefined;
        blockchain?: string | undefined;
        volume_history?: (number | null)[][] | undefined;
        market_cap_history?: (number | null)[][] | undefined;
        market_cap_diluted_history?: (number | null)[][] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        price_history: (number | null)[][];
        symbol?: string | undefined;
        name?: string | undefined;
        address?: string | undefined;
        blockchain?: string | undefined;
        volume_history?: (number | null)[][] | undefined;
        market_cap_history?: (number | null)[][] | undefined;
        market_cap_diluted_history?: (number | null)[][] | undefined;
    };
}, {
    data: {
        price_history: (number | null)[][];
        symbol?: string | undefined;
        name?: string | undefined;
        address?: string | undefined;
        blockchain?: string | undefined;
        volume_history?: (number | null)[][] | undefined;
        market_cap_history?: (number | null)[][] | undefined;
        market_cap_diluted_history?: (number | null)[][] | undefined;
    };
}>;
export type MarketHistoryResponse = z.infer<typeof MarketHistoryResponseSchema>;
