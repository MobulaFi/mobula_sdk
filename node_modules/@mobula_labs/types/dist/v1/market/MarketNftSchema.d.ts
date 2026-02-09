import { z } from 'zod';
export declare const MarketNftParamsSchema: z.ZodObject<{
    asset: z.ZodString;
    chain: z.ZodString;
}, "strip", z.ZodTypeAny, {
    asset: string;
    chain: string;
}, {
    asset: string;
    chain: string;
}>;
export type MarketNftParams = z.input<typeof MarketNftParamsSchema>;
export declare const MarketNftResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        price: z.ZodNumber;
        priceETH: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        price: number;
        priceETH: number;
    }, {
        price: number;
        priceETH: number;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        price: number;
        priceETH: number;
    };
}, {
    data: {
        price: number;
        priceETH: number;
    };
}>;
export type MarketNftResponse = z.infer<typeof MarketNftResponseSchema>;
