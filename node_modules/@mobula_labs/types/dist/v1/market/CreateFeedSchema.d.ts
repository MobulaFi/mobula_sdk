import { z } from 'zod';
export declare const createFeedQuery: z.ZodObject<{
    quoteId: z.ZodOptional<z.ZodNumber>;
    assetId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    assetId: number;
    quoteId?: number | undefined;
}, {
    assetId: number;
    quoteId?: number | undefined;
}>;
