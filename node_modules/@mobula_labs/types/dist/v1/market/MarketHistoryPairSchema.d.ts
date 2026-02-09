import { z } from 'zod';
export declare const MarketHistoryPairParamsSchema: z.ZodObject<{
    blockchain: z.ZodOptional<z.ZodString>;
    asset: z.ZodOptional<z.ZodString>;
    symbol: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    baseToken: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    from: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodOptional<z.ZodNumber>, z.ZodOptional<z.ZodDate>]>, Date | undefined, number | Date | undefined>, Date | 0, number | Date | undefined>;
    to: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodOptional<z.ZodNumber>, z.ZodOptional<z.ZodDate>]>, Date | undefined, number | Date | undefined>, Date, number | Date | undefined>;
    period: z.ZodEffects<z.ZodOptional<z.ZodString>, string, string | undefined>;
    amount: z.ZodOptional<z.ZodNumber>;
    usd: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>>, boolean, string | boolean | undefined>;
    mode: z.ZodDefault<z.ZodOptional<z.ZodEnum<["asset", "pool"]>>>;
}, "strip", z.ZodTypeAny, {
    from: 0 | Date;
    to: Date;
    period: string;
    usd: boolean;
    mode: "asset" | "pool";
    symbol?: string | undefined;
    address?: string | undefined;
    blockchain?: string | undefined;
    baseToken?: string | string[] | undefined;
    asset?: string | undefined;
    amount?: number | undefined;
}, {
    symbol?: string | undefined;
    address?: string | undefined;
    blockchain?: string | undefined;
    baseToken?: string | string[] | undefined;
    asset?: string | undefined;
    amount?: number | undefined;
    from?: number | Date | undefined;
    to?: number | Date | undefined;
    period?: string | undefined;
    usd?: string | boolean | undefined;
    mode?: "asset" | "pool" | undefined;
}>;
export type MarketHistoryPairParams = z.input<typeof MarketHistoryPairParamsSchema>;
export type MarketHistoryPairInferType = z.infer<typeof MarketHistoryPairParamsSchema>;
export declare const MarketHistoryPairResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        volume: z.ZodNumber;
        open: z.ZodNumber;
        high: z.ZodNumber;
        low: z.ZodNumber;
        close: z.ZodNumber;
        time: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        high: number;
        low: number;
        volume: number;
        open: number;
        close: number;
        time: number;
    }, {
        high: number;
        low: number;
        volume: number;
        open: number;
        close: number;
        time: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        high: number;
        low: number;
        volume: number;
        open: number;
        close: number;
        time: number;
    }[];
}, {
    data: {
        high: number;
        low: number;
        volume: number;
        open: number;
        close: number;
        time: number;
    }[];
}>;
export type MarketHistoryPairResponse = z.infer<typeof MarketHistoryPairResponseSchema>;
