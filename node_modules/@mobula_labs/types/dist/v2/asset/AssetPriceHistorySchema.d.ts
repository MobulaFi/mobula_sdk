import { z } from 'zod';
export declare const AssetPriceHistoryParamsSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    address: z.ZodOptional<z.ZodString>;
    chainId: z.ZodOptional<z.ZodString>;
    id: z.ZodOptional<z.ZodNumber>;
    period: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    from: z.ZodDefault<z.ZodNumber>;
    to: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    from: number;
    to: number;
    address?: string | undefined;
    chainId?: string | undefined;
    id?: number | undefined;
    period?: string | undefined;
}, {
    address?: string | undefined;
    chainId?: string | undefined;
    id?: number | undefined;
    from?: number | undefined;
    to?: number | undefined;
    period?: string | undefined;
}>, {
    from: number;
    to: number;
    address?: string | undefined;
    chainId?: string | undefined;
    id?: number | undefined;
    period?: string | undefined;
}, {
    address?: string | undefined;
    chainId?: string | undefined;
    id?: number | undefined;
    from?: number | undefined;
    to?: number | undefined;
    period?: string | undefined;
}>, {
    from: number;
    to: number;
    address?: string | undefined;
    chainId?: string | undefined;
    id?: number | undefined;
    period?: string | undefined;
}, {
    address?: string | undefined;
    chainId?: string | undefined;
    id?: number | undefined;
    from?: number | undefined;
    to?: number | undefined;
    period?: string | undefined;
}>;
export type AssetPriceHistoryParams = z.input<typeof AssetPriceHistoryParamsSchema>;
export declare const AssetPriceHistoryBatchParamsSchema: z.ZodUnion<[z.ZodEffects<z.ZodEffects<z.ZodArray<z.ZodObject<{
    address: z.ZodOptional<z.ZodString>;
    chainId: z.ZodOptional<z.ZodString>;
    id: z.ZodOptional<z.ZodNumber>;
    period: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    from: z.ZodDefault<z.ZodNumber>;
    to: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    from: number;
    to: number;
    address?: string | undefined;
    chainId?: string | undefined;
    id?: number | undefined;
    period?: string | undefined;
}, {
    address?: string | undefined;
    chainId?: string | undefined;
    id?: number | undefined;
    from?: number | undefined;
    to?: number | undefined;
    period?: string | undefined;
}>, "many">, {
    from: number;
    to: number;
    address?: string | undefined;
    chainId?: string | undefined;
    id?: number | undefined;
    period?: string | undefined;
}[], {
    address?: string | undefined;
    chainId?: string | undefined;
    id?: number | undefined;
    from?: number | undefined;
    to?: number | undefined;
    period?: string | undefined;
}[]>, {
    from: number;
    to: number;
    address?: string | undefined;
    chainId?: string | undefined;
    id?: number | undefined;
    period?: string | undefined;
}[], {
    address?: string | undefined;
    chainId?: string | undefined;
    id?: number | undefined;
    from?: number | undefined;
    to?: number | undefined;
    period?: string | undefined;
}[]>, z.ZodObject<{
    assets: z.ZodEffects<z.ZodEffects<z.ZodArray<z.ZodObject<{
        address: z.ZodOptional<z.ZodString>;
        chainId: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodNumber>;
        period: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
        from: z.ZodDefault<z.ZodNumber>;
        to: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        from: number;
        to: number;
        address?: string | undefined;
        chainId?: string | undefined;
        id?: number | undefined;
        period?: string | undefined;
    }, {
        address?: string | undefined;
        chainId?: string | undefined;
        id?: number | undefined;
        from?: number | undefined;
        to?: number | undefined;
        period?: string | undefined;
    }>, "many">, {
        from: number;
        to: number;
        address?: string | undefined;
        chainId?: string | undefined;
        id?: number | undefined;
        period?: string | undefined;
    }[], {
        address?: string | undefined;
        chainId?: string | undefined;
        id?: number | undefined;
        from?: number | undefined;
        to?: number | undefined;
        period?: string | undefined;
    }[]>, {
        from: number;
        to: number;
        address?: string | undefined;
        chainId?: string | undefined;
        id?: number | undefined;
        period?: string | undefined;
    }[], {
        address?: string | undefined;
        chainId?: string | undefined;
        id?: number | undefined;
        from?: number | undefined;
        to?: number | undefined;
        period?: string | undefined;
    }[]>;
}, "strip", z.ZodTypeAny, {
    assets: {
        from: number;
        to: number;
        address?: string | undefined;
        chainId?: string | undefined;
        id?: number | undefined;
        period?: string | undefined;
    }[];
}, {
    assets: {
        address?: string | undefined;
        chainId?: string | undefined;
        id?: number | undefined;
        from?: number | undefined;
        to?: number | undefined;
        period?: string | undefined;
    }[];
}>]>;
export type AssetPriceHistoryBatchParams = z.input<typeof AssetPriceHistoryBatchParamsSchema>;
export declare const AssetPriceHistoryResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        priceHistory: z.ZodArray<z.ZodArray<z.ZodNullable<z.ZodNumber>, "many">, "many">;
        id: z.ZodOptional<z.ZodNumber>;
        name: z.ZodOptional<z.ZodString>;
        symbol: z.ZodOptional<z.ZodString>;
        chainId: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
        error: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        priceHistory: (number | null)[][];
        symbol?: string | undefined;
        name?: string | undefined;
        address?: string | undefined;
        chainId?: string | undefined;
        id?: number | undefined;
        error?: string | undefined;
    }, {
        priceHistory: (number | null)[][];
        symbol?: string | undefined;
        name?: string | undefined;
        address?: string | undefined;
        chainId?: string | undefined;
        id?: number | undefined;
        error?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        priceHistory: (number | null)[][];
        symbol?: string | undefined;
        name?: string | undefined;
        address?: string | undefined;
        chainId?: string | undefined;
        id?: number | undefined;
        error?: string | undefined;
    };
}, {
    data: {
        priceHistory: (number | null)[][];
        symbol?: string | undefined;
        name?: string | undefined;
        address?: string | undefined;
        chainId?: string | undefined;
        id?: number | undefined;
        error?: string | undefined;
    };
}>;
export type AssetPriceHistoryResponse = z.infer<typeof AssetPriceHistoryResponseSchema>;
export declare const AssetPriceHistoryBatchResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        priceHistory: z.ZodArray<z.ZodArray<z.ZodNullable<z.ZodNumber>, "many">, "many">;
        id: z.ZodOptional<z.ZodNumber>;
        name: z.ZodOptional<z.ZodString>;
        symbol: z.ZodOptional<z.ZodString>;
        chainId: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
        error: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        priceHistory: (number | null)[][];
        symbol?: string | undefined;
        name?: string | undefined;
        address?: string | undefined;
        chainId?: string | undefined;
        id?: number | undefined;
        error?: string | undefined;
    }, {
        priceHistory: (number | null)[][];
        symbol?: string | undefined;
        name?: string | undefined;
        address?: string | undefined;
        chainId?: string | undefined;
        id?: number | undefined;
        error?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        priceHistory: (number | null)[][];
        symbol?: string | undefined;
        name?: string | undefined;
        address?: string | undefined;
        chainId?: string | undefined;
        id?: number | undefined;
        error?: string | undefined;
    }[];
}, {
    data: {
        priceHistory: (number | null)[][];
        symbol?: string | undefined;
        name?: string | undefined;
        address?: string | undefined;
        chainId?: string | undefined;
        id?: number | undefined;
        error?: string | undefined;
    }[];
}>;
export type AssetPriceHistoryBatchResponse = z.infer<typeof AssetPriceHistoryBatchResponseSchema>;
