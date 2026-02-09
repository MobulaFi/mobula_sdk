import { z } from 'zod';
export declare const MarketBlockchainStatsParamsSchema: z.ZodObject<{
    blockchain: z.ZodString;
    factory: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    blockchain: string;
    factory?: string | undefined;
}, {
    blockchain: string;
    factory?: string | undefined;
}>;
export type MarketBlockchainStatsParams = z.input<typeof MarketBlockchainStatsParamsSchema>;
export declare const MarketBlockchainStatsResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        volume_history: z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">;
        volume_change_24h: z.ZodNumber;
        volume_change_total: z.ZodNullable<z.ZodNumber>;
        liquidity_history: z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">;
        liquidity_change_24h: z.ZodNumber;
        liquidity_change_total: z.ZodNullable<z.ZodNumber>;
        tokens_history: z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">;
        tokens_change_24h: z.ZodNumber;
        tokens_change_total: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        volume_history: number[][];
        volume_change_24h: number;
        volume_change_total: number | null;
        liquidity_history: number[][];
        liquidity_change_24h: number;
        liquidity_change_total: number | null;
        tokens_history: number[][];
        tokens_change_24h: number;
        tokens_change_total: number | null;
    }, {
        volume_history: number[][];
        volume_change_24h: number;
        volume_change_total: number | null;
        liquidity_history: number[][];
        liquidity_change_24h: number;
        liquidity_change_total: number | null;
        tokens_history: number[][];
        tokens_change_24h: number;
        tokens_change_total: number | null;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        volume_history: number[][];
        volume_change_24h: number;
        volume_change_total: number | null;
        liquidity_history: number[][];
        liquidity_change_24h: number;
        liquidity_change_total: number | null;
        tokens_history: number[][];
        tokens_change_24h: number;
        tokens_change_total: number | null;
    };
}, {
    data: {
        volume_history: number[][];
        volume_change_24h: number;
        volume_change_total: number | null;
        liquidity_history: number[][];
        liquidity_change_24h: number;
        liquidity_change_total: number | null;
        tokens_history: number[][];
        tokens_change_24h: number;
        tokens_change_total: number | null;
    };
}>;
export type MarketBlockchainStatsResponse = z.infer<typeof MarketBlockchainStatsResponseSchema>;
