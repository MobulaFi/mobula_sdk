import { z } from 'zod';
export declare const MetadataCategoriesResponseSchema: z.ZodArray<z.ZodObject<{
    name: z.ZodString;
    market_cap: z.ZodNumber;
    market_cap_change_24h: z.ZodNumber;
    market_cap_change_7d: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    market_cap: number;
    market_cap_change_24h: number;
    market_cap_change_7d: number;
}, {
    name: string;
    market_cap: number;
    market_cap_change_24h: number;
    market_cap_change_7d: number;
}>, "many">;
export type MetadataCategoriesResponse = z.infer<typeof MetadataCategoriesResponseSchema>;
