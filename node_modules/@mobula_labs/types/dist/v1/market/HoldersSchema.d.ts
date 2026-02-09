import { z } from 'zod';
export declare const MarketTokenHoldersParamsSchema: z.ZodEffects<z.ZodObject<{
    blockchain: z.ZodOptional<z.ZodString>;
    asset: z.ZodOptional<z.ZodString>;
    symbol: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    offset: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    backfill: z.ZodEffects<z.ZodDefault<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>, boolean, string | boolean | undefined>;
    includeZeroBalance: z.ZodEffects<z.ZodDefault<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>, boolean, string | boolean | undefined>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    offset: number;
    backfill: boolean;
    includeZeroBalance: boolean;
    symbol?: string | undefined;
    blockchain?: string | undefined;
    asset?: string | undefined;
}, {
    symbol?: string | undefined;
    blockchain?: string | undefined;
    asset?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    backfill?: string | boolean | undefined;
    includeZeroBalance?: string | boolean | undefined;
}>, {
    blockchain: string | undefined;
    asset: {
        name: string | undefined;
        symbol: string | undefined;
    } | undefined;
    limit: number;
    offset: number;
    backfill: boolean;
    includeZeroBalance: boolean;
}, {
    symbol?: string | undefined;
    blockchain?: string | undefined;
    asset?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    backfill?: string | boolean | undefined;
    includeZeroBalance?: string | boolean | undefined;
}>;
export type MarketTokenHoldersParams = z.input<typeof MarketTokenHoldersParamsSchema>;
export declare const MarketTokenHoldersResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        address: z.ZodString;
        tag: z.ZodString;
        amountRaw: z.ZodString;
        amount: z.ZodNumber;
        chainId: z.ZodString;
        totalSupplyShare: z.ZodNumber;
        amountUSD: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        address: string;
        chainId: string;
        tag: string;
        amountRaw: string;
        amount: number;
        totalSupplyShare: number;
        amountUSD: number;
    }, {
        address: string;
        chainId: string;
        tag: string;
        amountRaw: string;
        amount: number;
        totalSupplyShare: number;
        amountUSD: number;
    }>, "many">;
    total_count: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    data: {
        address: string;
        chainId: string;
        tag: string;
        amountRaw: string;
        amount: number;
        totalSupplyShare: number;
        amountUSD: number;
    }[];
    total_count: number;
}, {
    data: {
        address: string;
        chainId: string;
        tag: string;
        amountRaw: string;
        amount: number;
        totalSupplyShare: number;
        amountUSD: number;
    }[];
    total_count: number;
}>;
export type MarketTokenHoldersResponse = z.infer<typeof MarketTokenHoldersResponseSchema>;
