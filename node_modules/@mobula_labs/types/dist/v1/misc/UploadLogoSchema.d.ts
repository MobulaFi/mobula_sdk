import { z } from 'zod';
export declare const logoUrlSchema: z.ZodObject<{
    assetName: z.ZodString;
    logoUrl: z.ZodString;
}, "strip", z.ZodTypeAny, {
    assetName: string;
    logoUrl: string;
}, {
    assetName: string;
    logoUrl: string;
}>;
