import { z } from 'zod';
export declare const AssetQuery: z.ZodEffects<z.ZodObject<{
    blockchain: z.ZodOptional<z.ZodString>;
    asset: z.ZodOptional<z.ZodString>;
    symbol: z.ZodOptional<z.ZodString>;
    id: z.ZodOptional<z.ZodNumber>;
    shouldFetchPriceChange: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"24h">, z.ZodBoolean]>>>;
}, "strip", z.ZodTypeAny, {
    shouldFetchPriceChange: boolean | "24h";
    symbol?: string | undefined;
    id?: number | undefined;
    blockchain?: string | undefined;
    asset?: string | undefined;
}, {
    symbol?: string | undefined;
    id?: number | undefined;
    blockchain?: string | undefined;
    asset?: string | undefined;
    shouldFetchPriceChange?: boolean | "24h" | undefined;
}>, {
    shouldFetchPriceChange: boolean | "24h";
    symbol?: string | undefined;
    id?: number | undefined;
    blockchain?: string | undefined;
    asset?: string | undefined;
}, {
    symbol?: string | undefined;
    id?: number | undefined;
    blockchain?: string | undefined;
    asset?: string | undefined;
    shouldFetchPriceChange?: boolean | "24h" | undefined;
}>;
export type AssetQuery = z.infer<typeof AssetQuery>;
export type AssetQueryParams = z.input<typeof AssetQuery>;
export declare const MarketDataResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodNullable<z.ZodNumber>;
        name: z.ZodString;
        symbol: z.ZodString;
        decimals: z.ZodNullable<z.ZodNumber>;
        logo: z.ZodNullable<z.ZodString>;
        rank: z.ZodNullable<z.ZodNumber>;
        price: z.ZodNullable<z.ZodNumber>;
        market_cap: z.ZodNumber;
        market_cap_diluted: z.ZodNumber;
        volume: z.ZodNullable<z.ZodNumber>;
        volume_change_24h: z.ZodNullable<z.ZodNumber>;
        volume_7d: z.ZodNullable<z.ZodNumber>;
        liquidity: z.ZodNumber;
        liquidityMax: z.ZodNumber;
        ath: z.ZodNullable<z.ZodNumber>;
        atl: z.ZodNullable<z.ZodNumber>;
        off_chain_volume: z.ZodNullable<z.ZodNumber>;
        is_listed: z.ZodBoolean;
        price_change_1h: z.ZodNumber;
        price_change_24h: z.ZodNumber;
        price_change_7d: z.ZodNumber;
        price_change_1m: z.ZodNumber;
        price_change_1y: z.ZodNumber;
        total_supply: z.ZodNumber;
        circulating_supply: z.ZodNumber;
        contracts: z.ZodArray<z.ZodObject<{
            address: z.ZodString;
            blockchainId: z.ZodString;
            blockchain: z.ZodString;
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
        native: z.ZodOptional<z.ZodObject<{
            name: z.ZodString;
            symbol: z.ZodString;
            address: z.ZodString;
            type: z.ZodString;
            decimals: z.ZodNumber;
            logo: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            symbol: string;
            type: string;
            name: string;
            address: string;
            decimals: number;
            logo: string;
        }, {
            symbol: string;
            type: string;
            name: string;
            address: string;
            decimals: number;
            logo: string;
        }>>;
        priceNative: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        name: string;
        decimals: number | null;
        id: number | null;
        logo: string | null;
        price: number | null;
        liquidity: number;
        liquidityMax: number;
        ath: number | null;
        atl: number | null;
        price_change_1h: number;
        price_change_24h: number;
        market_cap: number;
        rank: number | null;
        price_change_7d: number;
        price_change_1m: number;
        price_change_1y: number;
        volume: number | null;
        contracts: {
            address: string;
            decimals: number;
            blockchain: string;
            blockchainId: string;
        }[];
        volume_change_24h: number | null;
        market_cap_diluted: number;
        volume_7d: number | null;
        off_chain_volume: number | null;
        is_listed: boolean;
        total_supply: number;
        circulating_supply: number;
        native?: {
            symbol: string;
            type: string;
            name: string;
            address: string;
            decimals: number;
            logo: string;
        } | undefined;
        priceNative?: number | undefined;
    }, {
        symbol: string;
        name: string;
        decimals: number | null;
        id: number | null;
        logo: string | null;
        price: number | null;
        liquidity: number;
        liquidityMax: number;
        ath: number | null;
        atl: number | null;
        price_change_1h: number;
        price_change_24h: number;
        market_cap: number;
        rank: number | null;
        price_change_7d: number;
        price_change_1m: number;
        price_change_1y: number;
        volume: number | null;
        contracts: {
            address: string;
            decimals: number;
            blockchain: string;
            blockchainId: string;
        }[];
        volume_change_24h: number | null;
        market_cap_diluted: number;
        volume_7d: number | null;
        off_chain_volume: number | null;
        is_listed: boolean;
        total_supply: number;
        circulating_supply: number;
        native?: {
            symbol: string;
            type: string;
            name: string;
            address: string;
            decimals: number;
            logo: string;
        } | undefined;
        priceNative?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        symbol: string;
        name: string;
        decimals: number | null;
        id: number | null;
        logo: string | null;
        price: number | null;
        liquidity: number;
        liquidityMax: number;
        ath: number | null;
        atl: number | null;
        price_change_1h: number;
        price_change_24h: number;
        market_cap: number;
        rank: number | null;
        price_change_7d: number;
        price_change_1m: number;
        price_change_1y: number;
        volume: number | null;
        contracts: {
            address: string;
            decimals: number;
            blockchain: string;
            blockchainId: string;
        }[];
        volume_change_24h: number | null;
        market_cap_diluted: number;
        volume_7d: number | null;
        off_chain_volume: number | null;
        is_listed: boolean;
        total_supply: number;
        circulating_supply: number;
        native?: {
            symbol: string;
            type: string;
            name: string;
            address: string;
            decimals: number;
            logo: string;
        } | undefined;
        priceNative?: number | undefined;
    };
}, {
    data: {
        symbol: string;
        name: string;
        decimals: number | null;
        id: number | null;
        logo: string | null;
        price: number | null;
        liquidity: number;
        liquidityMax: number;
        ath: number | null;
        atl: number | null;
        price_change_1h: number;
        price_change_24h: number;
        market_cap: number;
        rank: number | null;
        price_change_7d: number;
        price_change_1m: number;
        price_change_1y: number;
        volume: number | null;
        contracts: {
            address: string;
            decimals: number;
            blockchain: string;
            blockchainId: string;
        }[];
        volume_change_24h: number | null;
        market_cap_diluted: number;
        volume_7d: number | null;
        off_chain_volume: number | null;
        is_listed: boolean;
        total_supply: number;
        circulating_supply: number;
        native?: {
            symbol: string;
            type: string;
            name: string;
            address: string;
            decimals: number;
            logo: string;
        } | undefined;
        priceNative?: number | undefined;
    };
}>;
export type MarketDataResponse = z.infer<typeof MarketDataResponseSchema>;
export interface AssetMarketDataOutput {
    id: number | null;
    name: string;
    symbol: string;
    decimals: number | null;
    logo: string | null;
    rank: number | null;
    price: number | null;
    market_cap: number;
    market_cap_diluted: number;
    volume: number;
    volume_change_24h: number | null;
    volume_7d: number | null;
    liquidity: number;
    liquidity_change_24h?: number;
    ath: number | null;
    atl: number | null;
    off_chain_volume: number | null;
    is_listed?: boolean;
    price_change_1h: number;
    price_change_24h: number;
    price_change_7d: number;
    price_change_1m: number;
    price_change_1y: number;
    total_supply: number;
    circulating_supply: number;
    priceNative?: number;
    native?: {
        name: string;
        symbol: string;
        address: string;
        type: 'eth' | 'stable' | 'other' | 'native';
        decimals: number;
        denom?: string;
        logo: string | null;
        id?: number;
    };
    contracts: {
        address: string;
        blockchainId: string;
        blockchain: string;
        decimals: number;
    }[];
}
