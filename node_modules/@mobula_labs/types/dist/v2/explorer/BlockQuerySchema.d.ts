import { z } from 'zod';
declare const BlockQueryParams: z.ZodObject<{
    address: z.ZodString;
    blockchain: z.ZodString;
}, "strip", z.ZodTypeAny, {
    address: string;
    blockchain: string;
}, {
    address: string;
    blockchain: string;
}>;
export type BlockQueryParams = z.infer<typeof BlockQueryParams>;
export declare const BlockQueryParamsSchema: z.ZodObject<{
    address: z.ZodString;
    blockchain: z.ZodString;
}, "strip", z.ZodTypeAny, {
    address: string;
    blockchain: string;
}, {
    address: string;
    blockchain: string;
}>;
export {};
