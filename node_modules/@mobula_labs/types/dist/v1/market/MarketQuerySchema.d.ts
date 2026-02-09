import { z } from 'zod';
import type { GenericWhere } from '../../utils/functions/queryFilters.ts';
export declare const MarketQueryParamsSchema: z.ZodEffects<z.ZodObject<{
    sortBy: z.ZodEffects<z.ZodOptional<z.ZodString>, "priceUSD" | "marketCapUSD" | "liquidityUSD" | "volume24hUSD" | "priceChange1hPercent" | "priceChange7dPercent" | "priceChange24hPercent" | "offChainVolumeUSD" | null, string | undefined>;
    sortOrder: z.ZodDefault<z.ZodString>;
    filters: z.ZodEffects<z.ZodOptional<z.ZodString>, {
        AND: GenericWhere[];
    } | {
        AND?: undefined;
    }, string | undefined>;
    blockchain: z.ZodOptional<z.ZodString>;
    blockchains: z.ZodEffects<z.ZodOptional<z.ZodString>, string[], string | undefined>;
    categories: z.ZodEffects<z.ZodOptional<z.ZodString>, string[], string | undefined>;
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    blockchains: string[];
    limit: number;
    offset: number;
    sortBy: "priceUSD" | "marketCapUSD" | "liquidityUSD" | "volume24hUSD" | "priceChange1hPercent" | "priceChange7dPercent" | "priceChange24hPercent" | "offChainVolumeUSD" | null;
    sortOrder: string;
    filters: {
        AND: GenericWhere[];
    } | {
        AND?: undefined;
    };
    categories: string[];
    blockchain?: string | undefined;
}, {
    blockchain?: string | undefined;
    blockchains?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: string | undefined;
    filters?: string | undefined;
    categories?: string | undefined;
}>, {
    blockchains: string[];
    limit: number;
    offset: number;
    categories: string[];
    blockchain?: string | undefined;
    where: {
        AND: GenericWhere[];
    } | {
        AND?: undefined;
    };
    orderBy: {
        [x: string]: string;
    } | undefined;
}, {
    blockchain?: string | undefined;
    blockchains?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: string | undefined;
    filters?: string | undefined;
    categories?: string | undefined;
}>;
export type MarketQueryParams = z.input<typeof MarketQueryParamsSchema>;
export type MarketQueryInferType = z.infer<typeof MarketQueryParamsSchema>;
export declare const MarketQueryResponseSchema: z.ZodArray<z.ZodObject<{
    name: z.ZodString;
    logo: z.ZodNullable<z.ZodString>;
    symbol: z.ZodString;
    liquidity: z.ZodNumber;
    market_cap: z.ZodNumber;
    volume: z.ZodNumber;
    off_chain_volume: z.ZodNumber;
    price: z.ZodNumber;
    price_change_1h: z.ZodNumber;
    price_change_24h: z.ZodNumber;
    price_change_7d: z.ZodNumber;
    categories: z.ZodArray<z.ZodOptional<z.ZodString>, "many">;
    contracts: z.ZodArray<z.ZodObject<{
        address: z.ZodString;
        blockchain: z.ZodString;
        blockchainId: z.ZodString;
        decimals: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        address: string;
        decimals: number;
        blockchain: string;
        blockchainId: string;
    }, {
        address: string;
        decimals: number;
        blockchain: string;
        blockchainId: string;
    }>, "many">;
    id: z.ZodNumber;
    rank: z.ZodNullable<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    symbol: string;
    name: string;
    id: number;
    logo: string | null;
    price: number;
    liquidity: number;
    price_change_1h: number;
    price_change_24h: number;
    market_cap: number;
    rank: number | null;
    price_change_7d: number;
    volume: number;
    contracts: {
        address: string;
        decimals: number;
        blockchain: string;
        blockchainId: string;
    }[];
    off_chain_volume: number;
    categories: (string | undefined)[];
}, {
    symbol: string;
    name: string;
    id: number;
    logo: string | null;
    price: number;
    liquidity: number;
    price_change_1h: number;
    price_change_24h: number;
    market_cap: number;
    rank: number | null;
    price_change_7d: number;
    volume: number;
    contracts: {
        address: string;
        decimals: number;
        blockchain: string;
        blockchainId: string;
    }[];
    off_chain_volume: number;
    categories: (string | undefined)[];
}>, "many">;
export type MarketQueryResponse = z.infer<typeof MarketQueryResponseSchema>;
