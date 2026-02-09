import { z } from 'zod';
export declare const MarketOHLCVHistoryParamsSchema: z.ZodEffects<z.ZodObject<{
    address: z.ZodString;
    chainId: z.ZodString;
    from: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodOptional<z.ZodNumber>, z.ZodOptional<z.ZodDate>]>, Date | undefined, number | Date | undefined>, Date | 0, number | Date | undefined>;
    to: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodOptional<z.ZodNumber>, z.ZodOptional<z.ZodDate>]>, Date | undefined, number | Date | undefined>, Date, number | Date | undefined>;
    period: z.ZodEffects<z.ZodOptional<z.ZodString>, string, string | undefined>;
    amount: z.ZodOptional<z.ZodNumber>;
    usd: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>>, boolean, string | boolean | undefined>;
}, "strip", z.ZodTypeAny, {
    address: string;
    chainId: string;
    from: 0 | Date;
    to: Date;
    period: string;
    usd: boolean;
    amount?: number | undefined;
}, {
    address: string;
    chainId: string;
    amount?: number | undefined;
    from?: number | Date | undefined;
    to?: number | Date | undefined;
    period?: string | undefined;
    usd?: string | boolean | undefined;
}>, {
    address: string;
    chainId: string;
    from: 0 | Date;
    to: Date;
    period: string;
    usd: boolean;
    amount?: number | undefined;
}, {
    address: string;
    chainId: string;
    amount?: number | undefined;
    from?: number | Date | undefined;
    to?: number | Date | undefined;
    period?: string | undefined;
    usd?: string | boolean | undefined;
}>;
export type MarketOHLCVHistoryParams = z.input<typeof MarketOHLCVHistoryParamsSchema>;
export type MarketOHLCVHistoryInferType = z.infer<typeof MarketOHLCVHistoryParamsSchema>;
export declare const MarketOHLCVHistoryBatchParamsSchema: z.ZodUnion<[z.ZodArray<z.ZodObject<{
    address: z.ZodString;
    chainId: z.ZodString;
    from: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodOptional<z.ZodNumber>, z.ZodOptional<z.ZodDate>]>, Date | undefined, number | Date | undefined>, Date | 0, number | Date | undefined>;
    to: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodOptional<z.ZodNumber>, z.ZodOptional<z.ZodDate>]>, Date | undefined, number | Date | undefined>, Date, number | Date | undefined>;
    period: z.ZodEffects<z.ZodOptional<z.ZodString>, string, string | undefined>;
    amount: z.ZodOptional<z.ZodNumber>;
    usd: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>>, boolean, string | boolean | undefined>;
}, "strip", z.ZodTypeAny, {
    address: string;
    chainId: string;
    from: 0 | Date;
    to: Date;
    period: string;
    usd: boolean;
    amount?: number | undefined;
}, {
    address: string;
    chainId: string;
    amount?: number | undefined;
    from?: number | Date | undefined;
    to?: number | Date | undefined;
    period?: string | undefined;
    usd?: string | boolean | undefined;
}>, "many">, z.ZodObject<{
    markets: z.ZodArray<z.ZodObject<{
        address: z.ZodString;
        chainId: z.ZodString;
        from: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodOptional<z.ZodNumber>, z.ZodOptional<z.ZodDate>]>, Date | undefined, number | Date | undefined>, Date | 0, number | Date | undefined>;
        to: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodOptional<z.ZodNumber>, z.ZodOptional<z.ZodDate>]>, Date | undefined, number | Date | undefined>, Date, number | Date | undefined>;
        period: z.ZodEffects<z.ZodOptional<z.ZodString>, string, string | undefined>;
        amount: z.ZodOptional<z.ZodNumber>;
        usd: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>>, boolean, string | boolean | undefined>;
    }, "strip", z.ZodTypeAny, {
        address: string;
        chainId: string;
        from: 0 | Date;
        to: Date;
        period: string;
        usd: boolean;
        amount?: number | undefined;
    }, {
        address: string;
        chainId: string;
        amount?: number | undefined;
        from?: number | Date | undefined;
        to?: number | Date | undefined;
        period?: string | undefined;
        usd?: string | boolean | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    markets: {
        address: string;
        chainId: string;
        from: 0 | Date;
        to: Date;
        period: string;
        usd: boolean;
        amount?: number | undefined;
    }[];
}, {
    markets: {
        address: string;
        chainId: string;
        amount?: number | undefined;
        from?: number | Date | undefined;
        to?: number | Date | undefined;
        period?: string | undefined;
        usd?: string | boolean | undefined;
    }[];
}>]>;
export type MarketOHLCVHistoryBatchParams = z.input<typeof MarketOHLCVHistoryBatchParamsSchema>;
export declare const MarketOHLCVHistoryResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        v: z.ZodNumber;
        o: z.ZodNumber;
        h: z.ZodNumber;
        l: z.ZodNumber;
        c: z.ZodNumber;
        t: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        v: number;
        o: number;
        h: number;
        l: number;
        c: number;
        t: number;
    }, {
        v: number;
        o: number;
        h: number;
        l: number;
        c: number;
        t: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        v: number;
        o: number;
        h: number;
        l: number;
        c: number;
        t: number;
    }[];
}, {
    data: {
        v: number;
        o: number;
        h: number;
        l: number;
        c: number;
        t: number;
    }[];
}>;
export type MarketOHLCVHistoryResponse = z.infer<typeof MarketOHLCVHistoryResponseSchema>;
export declare const MarketOHLCVHistoryBatchResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        ohlcv: z.ZodArray<z.ZodObject<{
            v: z.ZodNumber;
            o: z.ZodNumber;
            h: z.ZodNumber;
            l: z.ZodNumber;
            c: z.ZodNumber;
            t: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            v: number;
            o: number;
            h: number;
            l: number;
            c: number;
            t: number;
        }, {
            v: number;
            o: number;
            h: number;
            l: number;
            c: number;
            t: number;
        }>, "many">;
        address: z.ZodString;
        chainId: z.ZodString;
        error: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        address: string;
        chainId: string;
        ohlcv: {
            v: number;
            o: number;
            h: number;
            l: number;
            c: number;
            t: number;
        }[];
        error?: string | undefined;
    }, {
        address: string;
        chainId: string;
        ohlcv: {
            v: number;
            o: number;
            h: number;
            l: number;
            c: number;
            t: number;
        }[];
        error?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        address: string;
        chainId: string;
        ohlcv: {
            v: number;
            o: number;
            h: number;
            l: number;
            c: number;
            t: number;
        }[];
        error?: string | undefined;
    }[];
}, {
    data: {
        address: string;
        chainId: string;
        ohlcv: {
            v: number;
            o: number;
            h: number;
            l: number;
            c: number;
            t: number;
        }[];
        error?: string | undefined;
    }[];
}>;
export type MarketOHLCVHistoryBatchResponse = z.infer<typeof MarketOHLCVHistoryBatchResponseSchema>;
