import { z } from 'zod';
export declare const MetadataTrendingsParamsSchema: z.ZodObject<{
    platform: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    blockchain: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
}, "strip", z.ZodTypeAny, {
    blockchain?: string | undefined;
    platform?: string | undefined;
}, {
    blockchain?: string | undefined;
    platform?: string | undefined;
}>;
export type MetadataTrendingsParams = z.input<typeof MetadataTrendingsParamsSchema>;
export declare const MetadataTrendingsResponseSchema: z.ZodArray<z.ZodObject<{
    name: z.ZodNullable<z.ZodString>;
    symbol: z.ZodNullable<z.ZodString>;
    contracts: z.ZodArray<z.ZodOptional<z.ZodObject<{
        address: z.ZodString;
        blockchain: z.ZodString;
        decimals: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        address: string;
        decimals: number;
        blockchain: string;
    }, {
        address: string;
        decimals: number;
        blockchain: string;
    }>>, "many">;
    price_change_24h: z.ZodNumber;
    price: z.ZodNumber;
    logo: z.ZodNullable<z.ZodString>;
    trending_score: z.ZodNumber;
    pair: z.ZodNullable<z.ZodString>;
    platforms: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        rank: z.ZodNumber;
        weigth: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        rank: number;
        weigth: number;
    }, {
        name: string;
        rank: number;
        weigth: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    symbol: string | null;
    name: string | null;
    logo: string | null;
    price: number;
    price_change_24h: number;
    contracts: ({
        address: string;
        decimals: number;
        blockchain: string;
    } | undefined)[];
    pair: string | null;
    trending_score: number;
    platforms: {
        name: string;
        rank: number;
        weigth: number;
    }[];
}, {
    symbol: string | null;
    name: string | null;
    logo: string | null;
    price: number;
    price_change_24h: number;
    contracts: ({
        address: string;
        decimals: number;
        blockchain: string;
    } | undefined)[];
    pair: string | null;
    trending_score: number;
    platforms: {
        name: string;
        rank: number;
        weigth: number;
    }[];
}>, "many">;
export type MetadataTrendingsResponse = z.infer<typeof MetadataTrendingsResponseSchema>;
