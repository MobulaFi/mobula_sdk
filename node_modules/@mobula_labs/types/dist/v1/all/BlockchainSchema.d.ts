import { z } from 'zod';
export declare const BlockchainsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        shortName: z.ZodOptional<z.ZodString>;
        explorer: z.ZodString;
        color: z.ZodString;
        chainId: z.ZodString;
        evmChainId: z.ZodOptional<z.ZodNumber>;
        cosmosChainId: z.ZodOptional<z.ZodString>;
        testnet: z.ZodOptional<z.ZodBoolean>;
        multicall_contract: z.ZodOptional<z.ZodString>;
        uniswapV3Factory: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        eth: z.ZodOptional<z.ZodObject<{
            name: z.ZodString;
            symbol: z.ZodString;
            address: z.ZodString;
            type: z.ZodEnum<["eth", "stable", "other"]>;
            decimals: z.ZodNumber;
            denom: z.ZodOptional<z.ZodString>;
        } & {
            logo: z.ZodString;
            id: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            symbol: string;
            type: "eth" | "stable" | "other";
            name: string;
            address: string;
            decimals: number;
            logo: string;
            id?: number | undefined;
            denom?: string | undefined;
        }, {
            symbol: string;
            type: "eth" | "stable" | "other";
            name: string;
            address: string;
            decimals: number;
            logo: string;
            id?: number | undefined;
            denom?: string | undefined;
        }>>;
        stable: z.ZodOptional<z.ZodObject<{
            name: z.ZodString;
            symbol: z.ZodString;
            address: z.ZodString;
            type: z.ZodEnum<["eth", "stable", "other"]>;
            decimals: z.ZodNumber;
            denom: z.ZodOptional<z.ZodString>;
        } & {
            logo: z.ZodString;
            blockchain: z.ZodString;
            blockchains: z.ZodArray<z.ZodString, "many">;
            contracts: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            symbol: string;
            type: "eth" | "stable" | "other";
            name: string;
            address: string;
            decimals: number;
            logo: string;
            blockchain: string;
            blockchains: string[];
            contracts: string[];
            denom?: string | undefined;
        }, {
            symbol: string;
            type: "eth" | "stable" | "other";
            name: string;
            address: string;
            decimals: number;
            logo: string;
            blockchain: string;
            blockchains: string[];
            contracts: string[];
            denom?: string | undefined;
        }>>;
        routers: z.ZodArray<z.ZodObject<{
            address: z.ZodString;
            name: z.ZodString;
            factory: z.ZodOptional<z.ZodString>;
            fee: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            address: string;
            factory?: string | undefined;
            fee?: number | undefined;
        }, {
            name: string;
            address: string;
            factory?: string | undefined;
            fee?: number | undefined;
        }>, "many">;
        tokens: z.ZodArray<z.ZodObject<{
            address: z.ZodString;
            name: z.ZodString;
            symbol: z.ZodOptional<z.ZodString>;
            decimals: z.ZodOptional<z.ZodNumber>;
            type: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            address: string;
            symbol?: string | undefined;
            type?: string | undefined;
            decimals?: number | undefined;
        }, {
            name: string;
            address: string;
            symbol?: string | undefined;
            type?: string | undefined;
            decimals?: number | undefined;
        }>, "many">;
        supportedProtocols: z.ZodArray<z.ZodString, "many">;
        logo: z.ZodString;
        coingeckoChain: z.ZodOptional<z.ZodString>;
        dexscreenerChain: z.ZodOptional<z.ZodString>;
        isLayer2: z.ZodOptional<z.ZodBoolean>;
        coverage: z.ZodOptional<z.ZodArray<z.ZodOptional<z.ZodString>, "many">>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        chainId: string;
        logo: string;
        explorer: string;
        color: string;
        routers: {
            name: string;
            address: string;
            factory?: string | undefined;
            fee?: number | undefined;
        }[];
        tokens: {
            name: string;
            address: string;
            symbol?: string | undefined;
            type?: string | undefined;
            decimals?: number | undefined;
        }[];
        supportedProtocols: string[];
        eth?: {
            symbol: string;
            type: "eth" | "stable" | "other";
            name: string;
            address: string;
            decimals: number;
            logo: string;
            id?: number | undefined;
            denom?: string | undefined;
        } | undefined;
        stable?: {
            symbol: string;
            type: "eth" | "stable" | "other";
            name: string;
            address: string;
            decimals: number;
            logo: string;
            blockchain: string;
            blockchains: string[];
            contracts: string[];
            denom?: string | undefined;
        } | undefined;
        shortName?: string | undefined;
        evmChainId?: number | undefined;
        cosmosChainId?: string | undefined;
        testnet?: boolean | undefined;
        multicall_contract?: string | undefined;
        uniswapV3Factory?: string[] | undefined;
        coingeckoChain?: string | undefined;
        dexscreenerChain?: string | undefined;
        isLayer2?: boolean | undefined;
        coverage?: (string | undefined)[] | undefined;
    }, {
        name: string;
        chainId: string;
        logo: string;
        explorer: string;
        color: string;
        routers: {
            name: string;
            address: string;
            factory?: string | undefined;
            fee?: number | undefined;
        }[];
        tokens: {
            name: string;
            address: string;
            symbol?: string | undefined;
            type?: string | undefined;
            decimals?: number | undefined;
        }[];
        supportedProtocols: string[];
        eth?: {
            symbol: string;
            type: "eth" | "stable" | "other";
            name: string;
            address: string;
            decimals: number;
            logo: string;
            id?: number | undefined;
            denom?: string | undefined;
        } | undefined;
        stable?: {
            symbol: string;
            type: "eth" | "stable" | "other";
            name: string;
            address: string;
            decimals: number;
            logo: string;
            blockchain: string;
            blockchains: string[];
            contracts: string[];
            denom?: string | undefined;
        } | undefined;
        shortName?: string | undefined;
        evmChainId?: number | undefined;
        cosmosChainId?: string | undefined;
        testnet?: boolean | undefined;
        multicall_contract?: string | undefined;
        uniswapV3Factory?: string[] | undefined;
        coingeckoChain?: string | undefined;
        dexscreenerChain?: string | undefined;
        isLayer2?: boolean | undefined;
        coverage?: (string | undefined)[] | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        name: string;
        chainId: string;
        logo: string;
        explorer: string;
        color: string;
        routers: {
            name: string;
            address: string;
            factory?: string | undefined;
            fee?: number | undefined;
        }[];
        tokens: {
            name: string;
            address: string;
            symbol?: string | undefined;
            type?: string | undefined;
            decimals?: number | undefined;
        }[];
        supportedProtocols: string[];
        eth?: {
            symbol: string;
            type: "eth" | "stable" | "other";
            name: string;
            address: string;
            decimals: number;
            logo: string;
            id?: number | undefined;
            denom?: string | undefined;
        } | undefined;
        stable?: {
            symbol: string;
            type: "eth" | "stable" | "other";
            name: string;
            address: string;
            decimals: number;
            logo: string;
            blockchain: string;
            blockchains: string[];
            contracts: string[];
            denom?: string | undefined;
        } | undefined;
        shortName?: string | undefined;
        evmChainId?: number | undefined;
        cosmosChainId?: string | undefined;
        testnet?: boolean | undefined;
        multicall_contract?: string | undefined;
        uniswapV3Factory?: string[] | undefined;
        coingeckoChain?: string | undefined;
        dexscreenerChain?: string | undefined;
        isLayer2?: boolean | undefined;
        coverage?: (string | undefined)[] | undefined;
    }[];
}, {
    data: {
        name: string;
        chainId: string;
        logo: string;
        explorer: string;
        color: string;
        routers: {
            name: string;
            address: string;
            factory?: string | undefined;
            fee?: number | undefined;
        }[];
        tokens: {
            name: string;
            address: string;
            symbol?: string | undefined;
            type?: string | undefined;
            decimals?: number | undefined;
        }[];
        supportedProtocols: string[];
        eth?: {
            symbol: string;
            type: "eth" | "stable" | "other";
            name: string;
            address: string;
            decimals: number;
            logo: string;
            id?: number | undefined;
            denom?: string | undefined;
        } | undefined;
        stable?: {
            symbol: string;
            type: "eth" | "stable" | "other";
            name: string;
            address: string;
            decimals: number;
            logo: string;
            blockchain: string;
            blockchains: string[];
            contracts: string[];
            denom?: string | undefined;
        } | undefined;
        shortName?: string | undefined;
        evmChainId?: number | undefined;
        cosmosChainId?: string | undefined;
        testnet?: boolean | undefined;
        multicall_contract?: string | undefined;
        uniswapV3Factory?: string[] | undefined;
        coingeckoChain?: string | undefined;
        dexscreenerChain?: string | undefined;
        isLayer2?: boolean | undefined;
        coverage?: (string | undefined)[] | undefined;
    }[];
}>;
export type BlockchainsResponse = z.infer<typeof BlockchainsResponseSchema>;
