import { z } from 'zod';
export declare const FundingRateParamsSchema: z.ZodObject<{
    symbol: z.ZodString;
    quote: z.ZodOptional<z.ZodString>;
    exchange: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
}, "strip", z.ZodTypeAny, {
    symbol: string;
    exchange?: string | undefined;
    quote?: string | undefined;
}, {
    symbol: string;
    exchange?: string | undefined;
    quote?: string | undefined;
}>;
export type FundingRateParams = z.input<typeof FundingRateParamsSchema>;
export declare const FundingRateResponseSchema: z.ZodObject<{
    binanceFundingRate: z.ZodOptional<z.ZodObject<{
        symbol: z.ZodString;
        fundingTime: z.ZodNumber;
        fundingRate: z.ZodNumber;
        marketPrice: z.ZodString;
        epochDurationMs: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        marketPrice: string;
        epochDurationMs: number;
    }, {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        marketPrice: string;
        epochDurationMs: number;
    }>>;
    deribitFundingRate: z.ZodOptional<z.ZodObject<{
        symbol: z.ZodString;
        fundingTime: z.ZodNumber;
        fundingRate: z.ZodNumber;
        marketPrice: z.ZodNumber;
        epochDurationMs: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        marketPrice: number;
        epochDurationMs: number;
    }, {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        marketPrice: number;
        epochDurationMs: number;
    }>>;
    bybitFundingRate: z.ZodOptional<z.ZodObject<{
        symbol: z.ZodString;
        fundingTime: z.ZodNumber;
        fundingRate: z.ZodNumber;
        epochDurationMs: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        epochDurationMs: number;
    }, {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        epochDurationMs: number;
    }>>;
    okxFundingRate: z.ZodOptional<z.ZodObject<{
        symbol: z.ZodString;
        fundingTime: z.ZodNumber;
        fundingRate: z.ZodNumber;
        epochDurationMs: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        epochDurationMs: number;
    }, {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        epochDurationMs: number;
    }>>;
    hyperliquidFundingRate: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        symbol: z.ZodString;
        fundingTime: z.ZodNumber;
        fundingRate: z.ZodNumber;
        epochDurationMs: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        epochDurationMs: number;
    }, {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        epochDurationMs: number;
    }>, z.ZodArray<z.ZodObject<{
        symbol: z.ZodString;
        fundingTime: z.ZodNumber;
        fundingRate: z.ZodNumber;
        marketPrice: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        epochDurationMs: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        epochDurationMs: number;
        marketPrice?: number | null | undefined;
    }, {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        epochDurationMs: number;
        marketPrice?: number | null | undefined;
    }>, "many">]>>;
    gateFundingRate: z.ZodOptional<z.ZodObject<{
        symbol: z.ZodString;
        fundingTime: z.ZodNumber;
        fundingRate: z.ZodNumber;
        epochDurationMs: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        epochDurationMs: number;
    }, {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        epochDurationMs: number;
    }>>;
    queryDetails: z.ZodObject<{
        base: z.ZodString;
        quote: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        base: string;
        quote: string | null;
    }, {
        base: string;
        quote: string | null;
    }>;
}, "strip", z.ZodTypeAny, {
    queryDetails: {
        base: string;
        quote: string | null;
    };
    binanceFundingRate?: {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        marketPrice: string;
        epochDurationMs: number;
    } | undefined;
    deribitFundingRate?: {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        marketPrice: number;
        epochDurationMs: number;
    } | undefined;
    bybitFundingRate?: {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        epochDurationMs: number;
    } | undefined;
    okxFundingRate?: {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        epochDurationMs: number;
    } | undefined;
    hyperliquidFundingRate?: {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        epochDurationMs: number;
    } | {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        epochDurationMs: number;
        marketPrice?: number | null | undefined;
    }[] | undefined;
    gateFundingRate?: {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        epochDurationMs: number;
    } | undefined;
}, {
    queryDetails: {
        base: string;
        quote: string | null;
    };
    binanceFundingRate?: {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        marketPrice: string;
        epochDurationMs: number;
    } | undefined;
    deribitFundingRate?: {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        marketPrice: number;
        epochDurationMs: number;
    } | undefined;
    bybitFundingRate?: {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        epochDurationMs: number;
    } | undefined;
    okxFundingRate?: {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        epochDurationMs: number;
    } | undefined;
    hyperliquidFundingRate?: {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        epochDurationMs: number;
    } | {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        epochDurationMs: number;
        marketPrice?: number | null | undefined;
    }[] | undefined;
    gateFundingRate?: {
        symbol: string;
        fundingTime: number;
        fundingRate: number;
        epochDurationMs: number;
    } | undefined;
}>;
export type FundingRateResponse = z.infer<typeof FundingRateResponseSchema>;
