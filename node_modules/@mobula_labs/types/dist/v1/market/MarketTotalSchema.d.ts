import { z } from 'zod';
export declare const MarketTotalResponseSchema: z.ZodObject<{
    market_cap_history: z.ZodArray<z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>, "many">;
    market_cap_change_24h: z.ZodString;
    btc_dominance_history: z.ZodArray<z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>, "many">;
}, "strip", z.ZodTypeAny, {
    market_cap_history: [number, number][];
    market_cap_change_24h: string;
    btc_dominance_history: [number, number][];
}, {
    market_cap_history: [number, number][];
    market_cap_change_24h: string;
    btc_dominance_history: [number, number][];
}>;
export type MarketTotalResponse = z.infer<typeof MarketTotalResponseSchema>;
