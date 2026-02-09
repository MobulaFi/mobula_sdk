import { z } from 'zod';
import { type SecurityFlags } from '../../utils/schemas/SecuritySchemas.ts';
declare const WalletTokenTypeValues: readonly ["2020", "2022", "erc20", "trc10", "trc20"];
export type WalletTokenType = (typeof WalletTokenTypeValues)[number];
export type CrossChainBalances = Record<string, {
    balance: number;
    balanceRaw: string;
    chainId?: string;
    address?: string;
}>;
export type CrossChainBalanceValues = {
    balance: number;
    balanceRaw: string;
    chainId?: string;
    address?: string;
};
export type ContractBalanceSecurity = (SecurityFlags & {
    frozen?: boolean;
}) | null | undefined;
export type ContractBalance = {
    balance: number;
    balanceRaw: string;
    decimals: number;
    address: string;
    chainId: string;
    tokenType?: WalletTokenType;
    security?: ContractBalanceSecurity;
    /** Rent lamports for Solana token accounts (returned when account is closed). Only present for Solana SPL tokens. */
    lamports?: string | null;
    /** SPL token account pubkey (needed for closing token accounts). Only present for Solana SPL tokens. */
    tokenAccount?: string | null;
};
export interface FormattedHolding {
    asset: {
        id: number | null;
        name: string;
        symbol: string;
        logo?: string;
        decimals: bigint[];
        contracts: string[];
        blockchains: string[];
    };
    price: number;
    liquidity: number;
    market_cap: number;
    price_change_24h: number;
    token_balance: number;
    estimated_balance: number;
    cross_chain_balances: CrossChainBalances;
    contracts_balances: ContractBalance[];
    allocation: number;
    wallets: string[];
}
export type FormattedHoldingWithPNL = FormattedHolding & {
    realized_pnl: number;
    unrealized_pnl: number;
    price_bought: number;
    total_invested: number;
    min_buy_price: number;
    max_buy_price: number;
};
export type PortfolioOutput = {
    total_wallet_balance: number;
    wallets: string[];
    total_realized_pnl?: number;
    total_unrealized_pnl?: number;
    total_pnl_history?: {
        '24h': {
            realized: number;
            unrealized: number;
        };
        '7d': {
            realized: number;
            unrealized: number;
        };
        '30d': {
            realized: number;
            unrealized: number;
        };
        '1y': {
            realized: number;
            unrealized: number;
        };
    };
    assets: FormattedHoldingWithPNL[] | FormattedHolding[];
};
export declare const PortfolioResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        total_wallet_balance: z.ZodNumber;
        wallets: z.ZodArray<z.ZodString, "many">;
        assets: z.ZodArray<z.ZodObject<{
            contracts_balances: z.ZodArray<z.ZodObject<{
                address: z.ZodString;
                balance: z.ZodNumber;
                balanceRaw: z.ZodString;
                chainId: z.ZodString;
                decimals: z.ZodNumber;
                tokenType: z.ZodOptional<z.ZodNullable<z.ZodEnum<["2020", "2022", "erc20", "trc10", "trc20"]>>>;
                security: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                    noMintAuthority: z.ZodOptional<z.ZodBoolean>;
                } & {
                    buyTax: z.ZodOptional<z.ZodString>;
                    sellTax: z.ZodOptional<z.ZodString>;
                    transferPausable: z.ZodOptional<z.ZodBoolean>;
                    top10Holders: z.ZodOptional<z.ZodString>;
                    isBlacklisted: z.ZodOptional<z.ZodBoolean>;
                    isHoneypot: z.ZodOptional<z.ZodBoolean>;
                    isNotOpenSource: z.ZodOptional<z.ZodBoolean>;
                    renounced: z.ZodOptional<z.ZodBoolean>;
                    locked: z.ZodOptional<z.ZodString>;
                    isWhitelisted: z.ZodOptional<z.ZodBoolean>;
                    balanceMutable: z.ZodOptional<z.ZodBoolean>;
                    lowLiquidity: z.ZodOptional<z.ZodString>;
                    burnRate: z.ZodOptional<z.ZodString>;
                    isMintable: z.ZodOptional<z.ZodBoolean>;
                    modifyableTax: z.ZodOptional<z.ZodBoolean>;
                    selfDestruct: z.ZodOptional<z.ZodBoolean>;
                } & {
                    frozen: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    buyTax?: string | undefined;
                    sellTax?: string | undefined;
                    transferPausable?: boolean | undefined;
                    top10Holders?: string | undefined;
                    isBlacklisted?: boolean | undefined;
                    isHoneypot?: boolean | undefined;
                    isNotOpenSource?: boolean | undefined;
                    renounced?: boolean | undefined;
                    locked?: string | undefined;
                    isWhitelisted?: boolean | undefined;
                    balanceMutable?: boolean | undefined;
                    lowLiquidity?: string | undefined;
                    burnRate?: string | undefined;
                    isMintable?: boolean | undefined;
                    modifyableTax?: boolean | undefined;
                    selfDestruct?: boolean | undefined;
                    noMintAuthority?: boolean | undefined;
                    frozen?: boolean | undefined;
                }, {
                    buyTax?: string | undefined;
                    sellTax?: string | undefined;
                    transferPausable?: boolean | undefined;
                    top10Holders?: string | undefined;
                    isBlacklisted?: boolean | undefined;
                    isHoneypot?: boolean | undefined;
                    isNotOpenSource?: boolean | undefined;
                    renounced?: boolean | undefined;
                    locked?: string | undefined;
                    isWhitelisted?: boolean | undefined;
                    balanceMutable?: boolean | undefined;
                    lowLiquidity?: string | undefined;
                    burnRate?: string | undefined;
                    isMintable?: boolean | undefined;
                    modifyableTax?: boolean | undefined;
                    selfDestruct?: boolean | undefined;
                    noMintAuthority?: boolean | undefined;
                    frozen?: boolean | undefined;
                }>>>;
                lamports: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                tokenAccount: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
                decimals: number;
                security?: {
                    buyTax?: string | undefined;
                    sellTax?: string | undefined;
                    transferPausable?: boolean | undefined;
                    top10Holders?: string | undefined;
                    isBlacklisted?: boolean | undefined;
                    isHoneypot?: boolean | undefined;
                    isNotOpenSource?: boolean | undefined;
                    renounced?: boolean | undefined;
                    locked?: string | undefined;
                    isWhitelisted?: boolean | undefined;
                    balanceMutable?: boolean | undefined;
                    lowLiquidity?: string | undefined;
                    burnRate?: string | undefined;
                    isMintable?: boolean | undefined;
                    modifyableTax?: boolean | undefined;
                    selfDestruct?: boolean | undefined;
                    noMintAuthority?: boolean | undefined;
                    frozen?: boolean | undefined;
                } | null | undefined;
                tokenType?: "2020" | "2022" | "erc20" | "trc10" | "trc20" | null | undefined;
                lamports?: string | null | undefined;
                tokenAccount?: string | null | undefined;
            }, {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
                decimals: number;
                security?: {
                    buyTax?: string | undefined;
                    sellTax?: string | undefined;
                    transferPausable?: boolean | undefined;
                    top10Holders?: string | undefined;
                    isBlacklisted?: boolean | undefined;
                    isHoneypot?: boolean | undefined;
                    isNotOpenSource?: boolean | undefined;
                    renounced?: boolean | undefined;
                    locked?: string | undefined;
                    isWhitelisted?: boolean | undefined;
                    balanceMutable?: boolean | undefined;
                    lowLiquidity?: string | undefined;
                    burnRate?: string | undefined;
                    isMintable?: boolean | undefined;
                    modifyableTax?: boolean | undefined;
                    selfDestruct?: boolean | undefined;
                    noMintAuthority?: boolean | undefined;
                    frozen?: boolean | undefined;
                } | null | undefined;
                tokenType?: "2020" | "2022" | "erc20" | "trc10" | "trc20" | null | undefined;
                lamports?: string | null | undefined;
                tokenAccount?: string | null | undefined;
            }>, "many">;
            cross_chain_balances: z.ZodRecord<z.ZodString, z.ZodObject<{
                balance: z.ZodNumber;
                balanceRaw: z.ZodString;
                chainId: z.ZodString;
                address: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
            }, {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
            }>>;
            price_change_24h: z.ZodNumber;
            estimated_balance: z.ZodNumber;
            price: z.ZodNumber;
            liquidity: z.ZodNumber;
            token_balance: z.ZodNumber;
            allocation: z.ZodNumber;
            asset: z.ZodObject<{
                id: z.ZodNullable<z.ZodNumber>;
                name: z.ZodString;
                symbol: z.ZodString;
                logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                decimals: z.ZodArray<z.ZodBigInt, "many">;
                contracts: z.ZodArray<z.ZodString, "many">;
                blockchains: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                symbol: string;
                name: string;
                decimals: bigint[];
                id: number | null;
                blockchains: string[];
                contracts: string[];
                logo?: string | null | undefined;
            }, {
                symbol: string;
                name: string;
                decimals: bigint[];
                id: number | null;
                blockchains: string[];
                contracts: string[];
                logo?: string | null | undefined;
            }>;
            wallets: z.ZodArray<z.ZodString, "many">;
            realized_pnl: z.ZodOptional<z.ZodNumber>;
            unrealized_pnl: z.ZodOptional<z.ZodNumber>;
            price_bought: z.ZodOptional<z.ZodNumber>;
            total_invested: z.ZodOptional<z.ZodNumber>;
            min_buy_price: z.ZodOptional<z.ZodNumber>;
            max_buy_price: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            price: number;
            liquidity: number;
            price_change_24h: number;
            asset: {
                symbol: string;
                name: string;
                decimals: bigint[];
                id: number | null;
                blockchains: string[];
                contracts: string[];
                logo?: string | null | undefined;
            };
            wallets: string[];
            contracts_balances: {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
                decimals: number;
                security?: {
                    buyTax?: string | undefined;
                    sellTax?: string | undefined;
                    transferPausable?: boolean | undefined;
                    top10Holders?: string | undefined;
                    isBlacklisted?: boolean | undefined;
                    isHoneypot?: boolean | undefined;
                    isNotOpenSource?: boolean | undefined;
                    renounced?: boolean | undefined;
                    locked?: string | undefined;
                    isWhitelisted?: boolean | undefined;
                    balanceMutable?: boolean | undefined;
                    lowLiquidity?: string | undefined;
                    burnRate?: string | undefined;
                    isMintable?: boolean | undefined;
                    modifyableTax?: boolean | undefined;
                    selfDestruct?: boolean | undefined;
                    noMintAuthority?: boolean | undefined;
                    frozen?: boolean | undefined;
                } | null | undefined;
                tokenType?: "2020" | "2022" | "erc20" | "trc10" | "trc20" | null | undefined;
                lamports?: string | null | undefined;
                tokenAccount?: string | null | undefined;
            }[];
            cross_chain_balances: Record<string, {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
            }>;
            estimated_balance: number;
            token_balance: number;
            allocation: number;
            realized_pnl?: number | undefined;
            unrealized_pnl?: number | undefined;
            price_bought?: number | undefined;
            total_invested?: number | undefined;
            min_buy_price?: number | undefined;
            max_buy_price?: number | undefined;
        }, {
            price: number;
            liquidity: number;
            price_change_24h: number;
            asset: {
                symbol: string;
                name: string;
                decimals: bigint[];
                id: number | null;
                blockchains: string[];
                contracts: string[];
                logo?: string | null | undefined;
            };
            wallets: string[];
            contracts_balances: {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
                decimals: number;
                security?: {
                    buyTax?: string | undefined;
                    sellTax?: string | undefined;
                    transferPausable?: boolean | undefined;
                    top10Holders?: string | undefined;
                    isBlacklisted?: boolean | undefined;
                    isHoneypot?: boolean | undefined;
                    isNotOpenSource?: boolean | undefined;
                    renounced?: boolean | undefined;
                    locked?: string | undefined;
                    isWhitelisted?: boolean | undefined;
                    balanceMutable?: boolean | undefined;
                    lowLiquidity?: string | undefined;
                    burnRate?: string | undefined;
                    isMintable?: boolean | undefined;
                    modifyableTax?: boolean | undefined;
                    selfDestruct?: boolean | undefined;
                    noMintAuthority?: boolean | undefined;
                    frozen?: boolean | undefined;
                } | null | undefined;
                tokenType?: "2020" | "2022" | "erc20" | "trc10" | "trc20" | null | undefined;
                lamports?: string | null | undefined;
                tokenAccount?: string | null | undefined;
            }[];
            cross_chain_balances: Record<string, {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
            }>;
            estimated_balance: number;
            token_balance: number;
            allocation: number;
            realized_pnl?: number | undefined;
            unrealized_pnl?: number | undefined;
            price_bought?: number | undefined;
            total_invested?: number | undefined;
            min_buy_price?: number | undefined;
            max_buy_price?: number | undefined;
        }>, "many">;
        win_rate: z.ZodOptional<z.ZodNumber>;
        tokens_distribution: z.ZodOptional<z.ZodObject<{
            '10x+': z.ZodNumber;
            '4x - 10x': z.ZodNumber;
            '2x - 4x': z.ZodNumber;
            '10% - 2x': z.ZodNumber;
            '-10% - 10%': z.ZodNumber;
            '-50% - -10%': z.ZodNumber;
            '-100% - -50%': z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            '10x+': number;
            '4x - 10x': number;
            '2x - 4x': number;
            '10% - 2x': number;
            '-10% - 10%': number;
            '-50% - -10%': number;
            '-100% - -50%': number;
        }, {
            '10x+': number;
            '4x - 10x': number;
            '2x - 4x': number;
            '10% - 2x': number;
            '-10% - 10%': number;
            '-50% - -10%': number;
            '-100% - -50%': number;
        }>>;
        pnl_history: z.ZodOptional<z.ZodObject<{
            '1y': z.ZodArray<z.ZodTuple<[z.ZodDate, z.ZodObject<{
                realized: z.ZodNumber;
                unrealized: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                realized: number;
                unrealized: number;
            }, {
                realized: number;
                unrealized: number;
            }>], null>, "many">;
            '7d': z.ZodArray<z.ZodTuple<[z.ZodDate, z.ZodObject<{
                realized: z.ZodNumber;
                unrealized: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                realized: number;
                unrealized: number;
            }, {
                realized: number;
                unrealized: number;
            }>], null>, "many">;
            '24h': z.ZodArray<z.ZodTuple<[z.ZodDate, z.ZodObject<{
                realized: z.ZodNumber;
                unrealized: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                realized: number;
                unrealized: number;
            }, {
                realized: number;
                unrealized: number;
            }>], null>, "many">;
            '30d': z.ZodArray<z.ZodTuple<[z.ZodDate, z.ZodObject<{
                realized: z.ZodNumber;
                unrealized: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                realized: number;
                unrealized: number;
            }, {
                realized: number;
                unrealized: number;
            }>], null>, "many">;
        }, "strip", z.ZodTypeAny, {
            '24h': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '1y': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '7d': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '30d': [Date, {
                realized: number;
                unrealized: number;
            }][];
        }, {
            '24h': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '1y': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '7d': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '30d': [Date, {
                realized: number;
                unrealized: number;
            }][];
        }>>;
        total_realized_pnl: z.ZodOptional<z.ZodNumber>;
        total_unrealized_pnl: z.ZodOptional<z.ZodNumber>;
        total_pnl_history: z.ZodOptional<z.ZodObject<{
            '24h': z.ZodObject<{
                realized: z.ZodNumber;
                unrealized: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                realized: number;
                unrealized: number;
            }, {
                realized: number;
                unrealized: number;
            }>;
            '7d': z.ZodObject<{
                realized: z.ZodNumber;
                unrealized: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                realized: number;
                unrealized: number;
            }, {
                realized: number;
                unrealized: number;
            }>;
            '30d': z.ZodObject<{
                realized: z.ZodNumber;
                unrealized: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                realized: number;
                unrealized: number;
            }, {
                realized: number;
                unrealized: number;
            }>;
            '1y': z.ZodObject<{
                realized: z.ZodNumber;
                unrealized: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                realized: number;
                unrealized: number;
            }, {
                realized: number;
                unrealized: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            '24h': {
                realized: number;
                unrealized: number;
            };
            '1y': {
                realized: number;
                unrealized: number;
            };
            '7d': {
                realized: number;
                unrealized: number;
            };
            '30d': {
                realized: number;
                unrealized: number;
            };
        }, {
            '24h': {
                realized: number;
                unrealized: number;
            };
            '1y': {
                realized: number;
                unrealized: number;
            };
            '7d': {
                realized: number;
                unrealized: number;
            };
            '30d': {
                realized: number;
                unrealized: number;
            };
        }>>;
        balances_length: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        assets: {
            price: number;
            liquidity: number;
            price_change_24h: number;
            asset: {
                symbol: string;
                name: string;
                decimals: bigint[];
                id: number | null;
                blockchains: string[];
                contracts: string[];
                logo?: string | null | undefined;
            };
            wallets: string[];
            contracts_balances: {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
                decimals: number;
                security?: {
                    buyTax?: string | undefined;
                    sellTax?: string | undefined;
                    transferPausable?: boolean | undefined;
                    top10Holders?: string | undefined;
                    isBlacklisted?: boolean | undefined;
                    isHoneypot?: boolean | undefined;
                    isNotOpenSource?: boolean | undefined;
                    renounced?: boolean | undefined;
                    locked?: string | undefined;
                    isWhitelisted?: boolean | undefined;
                    balanceMutable?: boolean | undefined;
                    lowLiquidity?: string | undefined;
                    burnRate?: string | undefined;
                    isMintable?: boolean | undefined;
                    modifyableTax?: boolean | undefined;
                    selfDestruct?: boolean | undefined;
                    noMintAuthority?: boolean | undefined;
                    frozen?: boolean | undefined;
                } | null | undefined;
                tokenType?: "2020" | "2022" | "erc20" | "trc10" | "trc20" | null | undefined;
                lamports?: string | null | undefined;
                tokenAccount?: string | null | undefined;
            }[];
            cross_chain_balances: Record<string, {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
            }>;
            estimated_balance: number;
            token_balance: number;
            allocation: number;
            realized_pnl?: number | undefined;
            unrealized_pnl?: number | undefined;
            price_bought?: number | undefined;
            total_invested?: number | undefined;
            min_buy_price?: number | undefined;
            max_buy_price?: number | undefined;
        }[];
        wallets: string[];
        total_wallet_balance: number;
        balances_length: number;
        win_rate?: number | undefined;
        tokens_distribution?: {
            '10x+': number;
            '4x - 10x': number;
            '2x - 4x': number;
            '10% - 2x': number;
            '-10% - 10%': number;
            '-50% - -10%': number;
            '-100% - -50%': number;
        } | undefined;
        pnl_history?: {
            '24h': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '1y': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '7d': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '30d': [Date, {
                realized: number;
                unrealized: number;
            }][];
        } | undefined;
        total_realized_pnl?: number | undefined;
        total_unrealized_pnl?: number | undefined;
        total_pnl_history?: {
            '24h': {
                realized: number;
                unrealized: number;
            };
            '1y': {
                realized: number;
                unrealized: number;
            };
            '7d': {
                realized: number;
                unrealized: number;
            };
            '30d': {
                realized: number;
                unrealized: number;
            };
        } | undefined;
    }, {
        assets: {
            price: number;
            liquidity: number;
            price_change_24h: number;
            asset: {
                symbol: string;
                name: string;
                decimals: bigint[];
                id: number | null;
                blockchains: string[];
                contracts: string[];
                logo?: string | null | undefined;
            };
            wallets: string[];
            contracts_balances: {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
                decimals: number;
                security?: {
                    buyTax?: string | undefined;
                    sellTax?: string | undefined;
                    transferPausable?: boolean | undefined;
                    top10Holders?: string | undefined;
                    isBlacklisted?: boolean | undefined;
                    isHoneypot?: boolean | undefined;
                    isNotOpenSource?: boolean | undefined;
                    renounced?: boolean | undefined;
                    locked?: string | undefined;
                    isWhitelisted?: boolean | undefined;
                    balanceMutable?: boolean | undefined;
                    lowLiquidity?: string | undefined;
                    burnRate?: string | undefined;
                    isMintable?: boolean | undefined;
                    modifyableTax?: boolean | undefined;
                    selfDestruct?: boolean | undefined;
                    noMintAuthority?: boolean | undefined;
                    frozen?: boolean | undefined;
                } | null | undefined;
                tokenType?: "2020" | "2022" | "erc20" | "trc10" | "trc20" | null | undefined;
                lamports?: string | null | undefined;
                tokenAccount?: string | null | undefined;
            }[];
            cross_chain_balances: Record<string, {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
            }>;
            estimated_balance: number;
            token_balance: number;
            allocation: number;
            realized_pnl?: number | undefined;
            unrealized_pnl?: number | undefined;
            price_bought?: number | undefined;
            total_invested?: number | undefined;
            min_buy_price?: number | undefined;
            max_buy_price?: number | undefined;
        }[];
        wallets: string[];
        total_wallet_balance: number;
        balances_length: number;
        win_rate?: number | undefined;
        tokens_distribution?: {
            '10x+': number;
            '4x - 10x': number;
            '2x - 4x': number;
            '10% - 2x': number;
            '-10% - 10%': number;
            '-50% - -10%': number;
            '-100% - -50%': number;
        } | undefined;
        pnl_history?: {
            '24h': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '1y': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '7d': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '30d': [Date, {
                realized: number;
                unrealized: number;
            }][];
        } | undefined;
        total_realized_pnl?: number | undefined;
        total_unrealized_pnl?: number | undefined;
        total_pnl_history?: {
            '24h': {
                realized: number;
                unrealized: number;
            };
            '1y': {
                realized: number;
                unrealized: number;
            };
            '7d': {
                realized: number;
                unrealized: number;
            };
            '30d': {
                realized: number;
                unrealized: number;
            };
        } | undefined;
    }>;
    backfill_status: z.ZodOptional<z.ZodEnum<["processed", "processing", "pending"]>>;
}, "strip", z.ZodTypeAny, {
    data: {
        assets: {
            price: number;
            liquidity: number;
            price_change_24h: number;
            asset: {
                symbol: string;
                name: string;
                decimals: bigint[];
                id: number | null;
                blockchains: string[];
                contracts: string[];
                logo?: string | null | undefined;
            };
            wallets: string[];
            contracts_balances: {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
                decimals: number;
                security?: {
                    buyTax?: string | undefined;
                    sellTax?: string | undefined;
                    transferPausable?: boolean | undefined;
                    top10Holders?: string | undefined;
                    isBlacklisted?: boolean | undefined;
                    isHoneypot?: boolean | undefined;
                    isNotOpenSource?: boolean | undefined;
                    renounced?: boolean | undefined;
                    locked?: string | undefined;
                    isWhitelisted?: boolean | undefined;
                    balanceMutable?: boolean | undefined;
                    lowLiquidity?: string | undefined;
                    burnRate?: string | undefined;
                    isMintable?: boolean | undefined;
                    modifyableTax?: boolean | undefined;
                    selfDestruct?: boolean | undefined;
                    noMintAuthority?: boolean | undefined;
                    frozen?: boolean | undefined;
                } | null | undefined;
                tokenType?: "2020" | "2022" | "erc20" | "trc10" | "trc20" | null | undefined;
                lamports?: string | null | undefined;
                tokenAccount?: string | null | undefined;
            }[];
            cross_chain_balances: Record<string, {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
            }>;
            estimated_balance: number;
            token_balance: number;
            allocation: number;
            realized_pnl?: number | undefined;
            unrealized_pnl?: number | undefined;
            price_bought?: number | undefined;
            total_invested?: number | undefined;
            min_buy_price?: number | undefined;
            max_buy_price?: number | undefined;
        }[];
        wallets: string[];
        total_wallet_balance: number;
        balances_length: number;
        win_rate?: number | undefined;
        tokens_distribution?: {
            '10x+': number;
            '4x - 10x': number;
            '2x - 4x': number;
            '10% - 2x': number;
            '-10% - 10%': number;
            '-50% - -10%': number;
            '-100% - -50%': number;
        } | undefined;
        pnl_history?: {
            '24h': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '1y': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '7d': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '30d': [Date, {
                realized: number;
                unrealized: number;
            }][];
        } | undefined;
        total_realized_pnl?: number | undefined;
        total_unrealized_pnl?: number | undefined;
        total_pnl_history?: {
            '24h': {
                realized: number;
                unrealized: number;
            };
            '1y': {
                realized: number;
                unrealized: number;
            };
            '7d': {
                realized: number;
                unrealized: number;
            };
            '30d': {
                realized: number;
                unrealized: number;
            };
        } | undefined;
    };
    backfill_status?: "processed" | "processing" | "pending" | undefined;
}, {
    data: {
        assets: {
            price: number;
            liquidity: number;
            price_change_24h: number;
            asset: {
                symbol: string;
                name: string;
                decimals: bigint[];
                id: number | null;
                blockchains: string[];
                contracts: string[];
                logo?: string | null | undefined;
            };
            wallets: string[];
            contracts_balances: {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
                decimals: number;
                security?: {
                    buyTax?: string | undefined;
                    sellTax?: string | undefined;
                    transferPausable?: boolean | undefined;
                    top10Holders?: string | undefined;
                    isBlacklisted?: boolean | undefined;
                    isHoneypot?: boolean | undefined;
                    isNotOpenSource?: boolean | undefined;
                    renounced?: boolean | undefined;
                    locked?: string | undefined;
                    isWhitelisted?: boolean | undefined;
                    balanceMutable?: boolean | undefined;
                    lowLiquidity?: string | undefined;
                    burnRate?: string | undefined;
                    isMintable?: boolean | undefined;
                    modifyableTax?: boolean | undefined;
                    selfDestruct?: boolean | undefined;
                    noMintAuthority?: boolean | undefined;
                    frozen?: boolean | undefined;
                } | null | undefined;
                tokenType?: "2020" | "2022" | "erc20" | "trc10" | "trc20" | null | undefined;
                lamports?: string | null | undefined;
                tokenAccount?: string | null | undefined;
            }[];
            cross_chain_balances: Record<string, {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
            }>;
            estimated_balance: number;
            token_balance: number;
            allocation: number;
            realized_pnl?: number | undefined;
            unrealized_pnl?: number | undefined;
            price_bought?: number | undefined;
            total_invested?: number | undefined;
            min_buy_price?: number | undefined;
            max_buy_price?: number | undefined;
        }[];
        wallets: string[];
        total_wallet_balance: number;
        balances_length: number;
        win_rate?: number | undefined;
        tokens_distribution?: {
            '10x+': number;
            '4x - 10x': number;
            '2x - 4x': number;
            '10% - 2x': number;
            '-10% - 10%': number;
            '-50% - -10%': number;
            '-100% - -50%': number;
        } | undefined;
        pnl_history?: {
            '24h': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '1y': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '7d': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '30d': [Date, {
                realized: number;
                unrealized: number;
            }][];
        } | undefined;
        total_realized_pnl?: number | undefined;
        total_unrealized_pnl?: number | undefined;
        total_pnl_history?: {
            '24h': {
                realized: number;
                unrealized: number;
            };
            '1y': {
                realized: number;
                unrealized: number;
            };
            '7d': {
                realized: number;
                unrealized: number;
            };
            '30d': {
                realized: number;
                unrealized: number;
            };
        } | undefined;
    };
    backfill_status?: "processed" | "processing" | "pending" | undefined;
}>;
export type PortfolioResponse = z.infer<typeof PortfolioResponseSchema>;
export declare const MultiPortfolioResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        total_wallet_balance: z.ZodNumber;
        wallets: z.ZodArray<z.ZodString, "many">;
        assets: z.ZodArray<z.ZodObject<{
            contracts_balances: z.ZodArray<z.ZodObject<{
                address: z.ZodString;
                balance: z.ZodNumber;
                balanceRaw: z.ZodString;
                chainId: z.ZodString;
                decimals: z.ZodNumber;
                tokenType: z.ZodOptional<z.ZodNullable<z.ZodEnum<["2020", "2022", "erc20", "trc10", "trc20"]>>>;
                security: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                    noMintAuthority: z.ZodOptional<z.ZodBoolean>;
                } & {
                    buyTax: z.ZodOptional<z.ZodString>;
                    sellTax: z.ZodOptional<z.ZodString>;
                    transferPausable: z.ZodOptional<z.ZodBoolean>;
                    top10Holders: z.ZodOptional<z.ZodString>;
                    isBlacklisted: z.ZodOptional<z.ZodBoolean>;
                    isHoneypot: z.ZodOptional<z.ZodBoolean>;
                    isNotOpenSource: z.ZodOptional<z.ZodBoolean>;
                    renounced: z.ZodOptional<z.ZodBoolean>;
                    locked: z.ZodOptional<z.ZodString>;
                    isWhitelisted: z.ZodOptional<z.ZodBoolean>;
                    balanceMutable: z.ZodOptional<z.ZodBoolean>;
                    lowLiquidity: z.ZodOptional<z.ZodString>;
                    burnRate: z.ZodOptional<z.ZodString>;
                    isMintable: z.ZodOptional<z.ZodBoolean>;
                    modifyableTax: z.ZodOptional<z.ZodBoolean>;
                    selfDestruct: z.ZodOptional<z.ZodBoolean>;
                } & {
                    frozen: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    buyTax?: string | undefined;
                    sellTax?: string | undefined;
                    transferPausable?: boolean | undefined;
                    top10Holders?: string | undefined;
                    isBlacklisted?: boolean | undefined;
                    isHoneypot?: boolean | undefined;
                    isNotOpenSource?: boolean | undefined;
                    renounced?: boolean | undefined;
                    locked?: string | undefined;
                    isWhitelisted?: boolean | undefined;
                    balanceMutable?: boolean | undefined;
                    lowLiquidity?: string | undefined;
                    burnRate?: string | undefined;
                    isMintable?: boolean | undefined;
                    modifyableTax?: boolean | undefined;
                    selfDestruct?: boolean | undefined;
                    noMintAuthority?: boolean | undefined;
                    frozen?: boolean | undefined;
                }, {
                    buyTax?: string | undefined;
                    sellTax?: string | undefined;
                    transferPausable?: boolean | undefined;
                    top10Holders?: string | undefined;
                    isBlacklisted?: boolean | undefined;
                    isHoneypot?: boolean | undefined;
                    isNotOpenSource?: boolean | undefined;
                    renounced?: boolean | undefined;
                    locked?: string | undefined;
                    isWhitelisted?: boolean | undefined;
                    balanceMutable?: boolean | undefined;
                    lowLiquidity?: string | undefined;
                    burnRate?: string | undefined;
                    isMintable?: boolean | undefined;
                    modifyableTax?: boolean | undefined;
                    selfDestruct?: boolean | undefined;
                    noMintAuthority?: boolean | undefined;
                    frozen?: boolean | undefined;
                }>>>;
                lamports: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                tokenAccount: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
                decimals: number;
                security?: {
                    buyTax?: string | undefined;
                    sellTax?: string | undefined;
                    transferPausable?: boolean | undefined;
                    top10Holders?: string | undefined;
                    isBlacklisted?: boolean | undefined;
                    isHoneypot?: boolean | undefined;
                    isNotOpenSource?: boolean | undefined;
                    renounced?: boolean | undefined;
                    locked?: string | undefined;
                    isWhitelisted?: boolean | undefined;
                    balanceMutable?: boolean | undefined;
                    lowLiquidity?: string | undefined;
                    burnRate?: string | undefined;
                    isMintable?: boolean | undefined;
                    modifyableTax?: boolean | undefined;
                    selfDestruct?: boolean | undefined;
                    noMintAuthority?: boolean | undefined;
                    frozen?: boolean | undefined;
                } | null | undefined;
                tokenType?: "2020" | "2022" | "erc20" | "trc10" | "trc20" | null | undefined;
                lamports?: string | null | undefined;
                tokenAccount?: string | null | undefined;
            }, {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
                decimals: number;
                security?: {
                    buyTax?: string | undefined;
                    sellTax?: string | undefined;
                    transferPausable?: boolean | undefined;
                    top10Holders?: string | undefined;
                    isBlacklisted?: boolean | undefined;
                    isHoneypot?: boolean | undefined;
                    isNotOpenSource?: boolean | undefined;
                    renounced?: boolean | undefined;
                    locked?: string | undefined;
                    isWhitelisted?: boolean | undefined;
                    balanceMutable?: boolean | undefined;
                    lowLiquidity?: string | undefined;
                    burnRate?: string | undefined;
                    isMintable?: boolean | undefined;
                    modifyableTax?: boolean | undefined;
                    selfDestruct?: boolean | undefined;
                    noMintAuthority?: boolean | undefined;
                    frozen?: boolean | undefined;
                } | null | undefined;
                tokenType?: "2020" | "2022" | "erc20" | "trc10" | "trc20" | null | undefined;
                lamports?: string | null | undefined;
                tokenAccount?: string | null | undefined;
            }>, "many">;
            cross_chain_balances: z.ZodRecord<z.ZodString, z.ZodObject<{
                balance: z.ZodNumber;
                balanceRaw: z.ZodString;
                chainId: z.ZodString;
                address: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
            }, {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
            }>>;
            price_change_24h: z.ZodNumber;
            estimated_balance: z.ZodNumber;
            price: z.ZodNumber;
            liquidity: z.ZodNumber;
            token_balance: z.ZodNumber;
            allocation: z.ZodNumber;
            asset: z.ZodObject<{
                id: z.ZodNullable<z.ZodNumber>;
                name: z.ZodString;
                symbol: z.ZodString;
                logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                decimals: z.ZodArray<z.ZodBigInt, "many">;
                contracts: z.ZodArray<z.ZodString, "many">;
                blockchains: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                symbol: string;
                name: string;
                decimals: bigint[];
                id: number | null;
                blockchains: string[];
                contracts: string[];
                logo?: string | null | undefined;
            }, {
                symbol: string;
                name: string;
                decimals: bigint[];
                id: number | null;
                blockchains: string[];
                contracts: string[];
                logo?: string | null | undefined;
            }>;
            wallets: z.ZodArray<z.ZodString, "many">;
            realized_pnl: z.ZodOptional<z.ZodNumber>;
            unrealized_pnl: z.ZodOptional<z.ZodNumber>;
            price_bought: z.ZodOptional<z.ZodNumber>;
            total_invested: z.ZodOptional<z.ZodNumber>;
            min_buy_price: z.ZodOptional<z.ZodNumber>;
            max_buy_price: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            price: number;
            liquidity: number;
            price_change_24h: number;
            asset: {
                symbol: string;
                name: string;
                decimals: bigint[];
                id: number | null;
                blockchains: string[];
                contracts: string[];
                logo?: string | null | undefined;
            };
            wallets: string[];
            contracts_balances: {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
                decimals: number;
                security?: {
                    buyTax?: string | undefined;
                    sellTax?: string | undefined;
                    transferPausable?: boolean | undefined;
                    top10Holders?: string | undefined;
                    isBlacklisted?: boolean | undefined;
                    isHoneypot?: boolean | undefined;
                    isNotOpenSource?: boolean | undefined;
                    renounced?: boolean | undefined;
                    locked?: string | undefined;
                    isWhitelisted?: boolean | undefined;
                    balanceMutable?: boolean | undefined;
                    lowLiquidity?: string | undefined;
                    burnRate?: string | undefined;
                    isMintable?: boolean | undefined;
                    modifyableTax?: boolean | undefined;
                    selfDestruct?: boolean | undefined;
                    noMintAuthority?: boolean | undefined;
                    frozen?: boolean | undefined;
                } | null | undefined;
                tokenType?: "2020" | "2022" | "erc20" | "trc10" | "trc20" | null | undefined;
                lamports?: string | null | undefined;
                tokenAccount?: string | null | undefined;
            }[];
            cross_chain_balances: Record<string, {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
            }>;
            estimated_balance: number;
            token_balance: number;
            allocation: number;
            realized_pnl?: number | undefined;
            unrealized_pnl?: number | undefined;
            price_bought?: number | undefined;
            total_invested?: number | undefined;
            min_buy_price?: number | undefined;
            max_buy_price?: number | undefined;
        }, {
            price: number;
            liquidity: number;
            price_change_24h: number;
            asset: {
                symbol: string;
                name: string;
                decimals: bigint[];
                id: number | null;
                blockchains: string[];
                contracts: string[];
                logo?: string | null | undefined;
            };
            wallets: string[];
            contracts_balances: {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
                decimals: number;
                security?: {
                    buyTax?: string | undefined;
                    sellTax?: string | undefined;
                    transferPausable?: boolean | undefined;
                    top10Holders?: string | undefined;
                    isBlacklisted?: boolean | undefined;
                    isHoneypot?: boolean | undefined;
                    isNotOpenSource?: boolean | undefined;
                    renounced?: boolean | undefined;
                    locked?: string | undefined;
                    isWhitelisted?: boolean | undefined;
                    balanceMutable?: boolean | undefined;
                    lowLiquidity?: string | undefined;
                    burnRate?: string | undefined;
                    isMintable?: boolean | undefined;
                    modifyableTax?: boolean | undefined;
                    selfDestruct?: boolean | undefined;
                    noMintAuthority?: boolean | undefined;
                    frozen?: boolean | undefined;
                } | null | undefined;
                tokenType?: "2020" | "2022" | "erc20" | "trc10" | "trc20" | null | undefined;
                lamports?: string | null | undefined;
                tokenAccount?: string | null | undefined;
            }[];
            cross_chain_balances: Record<string, {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
            }>;
            estimated_balance: number;
            token_balance: number;
            allocation: number;
            realized_pnl?: number | undefined;
            unrealized_pnl?: number | undefined;
            price_bought?: number | undefined;
            total_invested?: number | undefined;
            min_buy_price?: number | undefined;
            max_buy_price?: number | undefined;
        }>, "many">;
        win_rate: z.ZodOptional<z.ZodNumber>;
        tokens_distribution: z.ZodOptional<z.ZodObject<{
            '10x+': z.ZodNumber;
            '4x - 10x': z.ZodNumber;
            '2x - 4x': z.ZodNumber;
            '10% - 2x': z.ZodNumber;
            '-10% - 10%': z.ZodNumber;
            '-50% - -10%': z.ZodNumber;
            '-100% - -50%': z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            '10x+': number;
            '4x - 10x': number;
            '2x - 4x': number;
            '10% - 2x': number;
            '-10% - 10%': number;
            '-50% - -10%': number;
            '-100% - -50%': number;
        }, {
            '10x+': number;
            '4x - 10x': number;
            '2x - 4x': number;
            '10% - 2x': number;
            '-10% - 10%': number;
            '-50% - -10%': number;
            '-100% - -50%': number;
        }>>;
        pnl_history: z.ZodOptional<z.ZodObject<{
            '1y': z.ZodArray<z.ZodTuple<[z.ZodDate, z.ZodObject<{
                realized: z.ZodNumber;
                unrealized: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                realized: number;
                unrealized: number;
            }, {
                realized: number;
                unrealized: number;
            }>], null>, "many">;
            '7d': z.ZodArray<z.ZodTuple<[z.ZodDate, z.ZodObject<{
                realized: z.ZodNumber;
                unrealized: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                realized: number;
                unrealized: number;
            }, {
                realized: number;
                unrealized: number;
            }>], null>, "many">;
            '24h': z.ZodArray<z.ZodTuple<[z.ZodDate, z.ZodObject<{
                realized: z.ZodNumber;
                unrealized: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                realized: number;
                unrealized: number;
            }, {
                realized: number;
                unrealized: number;
            }>], null>, "many">;
            '30d': z.ZodArray<z.ZodTuple<[z.ZodDate, z.ZodObject<{
                realized: z.ZodNumber;
                unrealized: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                realized: number;
                unrealized: number;
            }, {
                realized: number;
                unrealized: number;
            }>], null>, "many">;
        }, "strip", z.ZodTypeAny, {
            '24h': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '1y': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '7d': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '30d': [Date, {
                realized: number;
                unrealized: number;
            }][];
        }, {
            '24h': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '1y': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '7d': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '30d': [Date, {
                realized: number;
                unrealized: number;
            }][];
        }>>;
        total_realized_pnl: z.ZodOptional<z.ZodNumber>;
        total_unrealized_pnl: z.ZodOptional<z.ZodNumber>;
        total_pnl_history: z.ZodOptional<z.ZodObject<{
            '24h': z.ZodObject<{
                realized: z.ZodNumber;
                unrealized: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                realized: number;
                unrealized: number;
            }, {
                realized: number;
                unrealized: number;
            }>;
            '7d': z.ZodObject<{
                realized: z.ZodNumber;
                unrealized: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                realized: number;
                unrealized: number;
            }, {
                realized: number;
                unrealized: number;
            }>;
            '30d': z.ZodObject<{
                realized: z.ZodNumber;
                unrealized: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                realized: number;
                unrealized: number;
            }, {
                realized: number;
                unrealized: number;
            }>;
            '1y': z.ZodObject<{
                realized: z.ZodNumber;
                unrealized: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                realized: number;
                unrealized: number;
            }, {
                realized: number;
                unrealized: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            '24h': {
                realized: number;
                unrealized: number;
            };
            '1y': {
                realized: number;
                unrealized: number;
            };
            '7d': {
                realized: number;
                unrealized: number;
            };
            '30d': {
                realized: number;
                unrealized: number;
            };
        }, {
            '24h': {
                realized: number;
                unrealized: number;
            };
            '1y': {
                realized: number;
                unrealized: number;
            };
            '7d': {
                realized: number;
                unrealized: number;
            };
            '30d': {
                realized: number;
                unrealized: number;
            };
        }>>;
        balances_length: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        assets: {
            price: number;
            liquidity: number;
            price_change_24h: number;
            asset: {
                symbol: string;
                name: string;
                decimals: bigint[];
                id: number | null;
                blockchains: string[];
                contracts: string[];
                logo?: string | null | undefined;
            };
            wallets: string[];
            contracts_balances: {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
                decimals: number;
                security?: {
                    buyTax?: string | undefined;
                    sellTax?: string | undefined;
                    transferPausable?: boolean | undefined;
                    top10Holders?: string | undefined;
                    isBlacklisted?: boolean | undefined;
                    isHoneypot?: boolean | undefined;
                    isNotOpenSource?: boolean | undefined;
                    renounced?: boolean | undefined;
                    locked?: string | undefined;
                    isWhitelisted?: boolean | undefined;
                    balanceMutable?: boolean | undefined;
                    lowLiquidity?: string | undefined;
                    burnRate?: string | undefined;
                    isMintable?: boolean | undefined;
                    modifyableTax?: boolean | undefined;
                    selfDestruct?: boolean | undefined;
                    noMintAuthority?: boolean | undefined;
                    frozen?: boolean | undefined;
                } | null | undefined;
                tokenType?: "2020" | "2022" | "erc20" | "trc10" | "trc20" | null | undefined;
                lamports?: string | null | undefined;
                tokenAccount?: string | null | undefined;
            }[];
            cross_chain_balances: Record<string, {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
            }>;
            estimated_balance: number;
            token_balance: number;
            allocation: number;
            realized_pnl?: number | undefined;
            unrealized_pnl?: number | undefined;
            price_bought?: number | undefined;
            total_invested?: number | undefined;
            min_buy_price?: number | undefined;
            max_buy_price?: number | undefined;
        }[];
        wallets: string[];
        total_wallet_balance: number;
        balances_length: number;
        win_rate?: number | undefined;
        tokens_distribution?: {
            '10x+': number;
            '4x - 10x': number;
            '2x - 4x': number;
            '10% - 2x': number;
            '-10% - 10%': number;
            '-50% - -10%': number;
            '-100% - -50%': number;
        } | undefined;
        pnl_history?: {
            '24h': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '1y': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '7d': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '30d': [Date, {
                realized: number;
                unrealized: number;
            }][];
        } | undefined;
        total_realized_pnl?: number | undefined;
        total_unrealized_pnl?: number | undefined;
        total_pnl_history?: {
            '24h': {
                realized: number;
                unrealized: number;
            };
            '1y': {
                realized: number;
                unrealized: number;
            };
            '7d': {
                realized: number;
                unrealized: number;
            };
            '30d': {
                realized: number;
                unrealized: number;
            };
        } | undefined;
    }, {
        assets: {
            price: number;
            liquidity: number;
            price_change_24h: number;
            asset: {
                symbol: string;
                name: string;
                decimals: bigint[];
                id: number | null;
                blockchains: string[];
                contracts: string[];
                logo?: string | null | undefined;
            };
            wallets: string[];
            contracts_balances: {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
                decimals: number;
                security?: {
                    buyTax?: string | undefined;
                    sellTax?: string | undefined;
                    transferPausable?: boolean | undefined;
                    top10Holders?: string | undefined;
                    isBlacklisted?: boolean | undefined;
                    isHoneypot?: boolean | undefined;
                    isNotOpenSource?: boolean | undefined;
                    renounced?: boolean | undefined;
                    locked?: string | undefined;
                    isWhitelisted?: boolean | undefined;
                    balanceMutable?: boolean | undefined;
                    lowLiquidity?: string | undefined;
                    burnRate?: string | undefined;
                    isMintable?: boolean | undefined;
                    modifyableTax?: boolean | undefined;
                    selfDestruct?: boolean | undefined;
                    noMintAuthority?: boolean | undefined;
                    frozen?: boolean | undefined;
                } | null | undefined;
                tokenType?: "2020" | "2022" | "erc20" | "trc10" | "trc20" | null | undefined;
                lamports?: string | null | undefined;
                tokenAccount?: string | null | undefined;
            }[];
            cross_chain_balances: Record<string, {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
            }>;
            estimated_balance: number;
            token_balance: number;
            allocation: number;
            realized_pnl?: number | undefined;
            unrealized_pnl?: number | undefined;
            price_bought?: number | undefined;
            total_invested?: number | undefined;
            min_buy_price?: number | undefined;
            max_buy_price?: number | undefined;
        }[];
        wallets: string[];
        total_wallet_balance: number;
        balances_length: number;
        win_rate?: number | undefined;
        tokens_distribution?: {
            '10x+': number;
            '4x - 10x': number;
            '2x - 4x': number;
            '10% - 2x': number;
            '-10% - 10%': number;
            '-50% - -10%': number;
            '-100% - -50%': number;
        } | undefined;
        pnl_history?: {
            '24h': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '1y': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '7d': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '30d': [Date, {
                realized: number;
                unrealized: number;
            }][];
        } | undefined;
        total_realized_pnl?: number | undefined;
        total_unrealized_pnl?: number | undefined;
        total_pnl_history?: {
            '24h': {
                realized: number;
                unrealized: number;
            };
            '1y': {
                realized: number;
                unrealized: number;
            };
            '7d': {
                realized: number;
                unrealized: number;
            };
            '30d': {
                realized: number;
                unrealized: number;
            };
        } | undefined;
    }>, "many">;
    backfill_status: z.ZodOptional<z.ZodEnum<["processed", "processing", "pending"]>>;
}, "strip", z.ZodTypeAny, {
    data: {
        assets: {
            price: number;
            liquidity: number;
            price_change_24h: number;
            asset: {
                symbol: string;
                name: string;
                decimals: bigint[];
                id: number | null;
                blockchains: string[];
                contracts: string[];
                logo?: string | null | undefined;
            };
            wallets: string[];
            contracts_balances: {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
                decimals: number;
                security?: {
                    buyTax?: string | undefined;
                    sellTax?: string | undefined;
                    transferPausable?: boolean | undefined;
                    top10Holders?: string | undefined;
                    isBlacklisted?: boolean | undefined;
                    isHoneypot?: boolean | undefined;
                    isNotOpenSource?: boolean | undefined;
                    renounced?: boolean | undefined;
                    locked?: string | undefined;
                    isWhitelisted?: boolean | undefined;
                    balanceMutable?: boolean | undefined;
                    lowLiquidity?: string | undefined;
                    burnRate?: string | undefined;
                    isMintable?: boolean | undefined;
                    modifyableTax?: boolean | undefined;
                    selfDestruct?: boolean | undefined;
                    noMintAuthority?: boolean | undefined;
                    frozen?: boolean | undefined;
                } | null | undefined;
                tokenType?: "2020" | "2022" | "erc20" | "trc10" | "trc20" | null | undefined;
                lamports?: string | null | undefined;
                tokenAccount?: string | null | undefined;
            }[];
            cross_chain_balances: Record<string, {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
            }>;
            estimated_balance: number;
            token_balance: number;
            allocation: number;
            realized_pnl?: number | undefined;
            unrealized_pnl?: number | undefined;
            price_bought?: number | undefined;
            total_invested?: number | undefined;
            min_buy_price?: number | undefined;
            max_buy_price?: number | undefined;
        }[];
        wallets: string[];
        total_wallet_balance: number;
        balances_length: number;
        win_rate?: number | undefined;
        tokens_distribution?: {
            '10x+': number;
            '4x - 10x': number;
            '2x - 4x': number;
            '10% - 2x': number;
            '-10% - 10%': number;
            '-50% - -10%': number;
            '-100% - -50%': number;
        } | undefined;
        pnl_history?: {
            '24h': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '1y': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '7d': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '30d': [Date, {
                realized: number;
                unrealized: number;
            }][];
        } | undefined;
        total_realized_pnl?: number | undefined;
        total_unrealized_pnl?: number | undefined;
        total_pnl_history?: {
            '24h': {
                realized: number;
                unrealized: number;
            };
            '1y': {
                realized: number;
                unrealized: number;
            };
            '7d': {
                realized: number;
                unrealized: number;
            };
            '30d': {
                realized: number;
                unrealized: number;
            };
        } | undefined;
    }[];
    backfill_status?: "processed" | "processing" | "pending" | undefined;
}, {
    data: {
        assets: {
            price: number;
            liquidity: number;
            price_change_24h: number;
            asset: {
                symbol: string;
                name: string;
                decimals: bigint[];
                id: number | null;
                blockchains: string[];
                contracts: string[];
                logo?: string | null | undefined;
            };
            wallets: string[];
            contracts_balances: {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
                decimals: number;
                security?: {
                    buyTax?: string | undefined;
                    sellTax?: string | undefined;
                    transferPausable?: boolean | undefined;
                    top10Holders?: string | undefined;
                    isBlacklisted?: boolean | undefined;
                    isHoneypot?: boolean | undefined;
                    isNotOpenSource?: boolean | undefined;
                    renounced?: boolean | undefined;
                    locked?: string | undefined;
                    isWhitelisted?: boolean | undefined;
                    balanceMutable?: boolean | undefined;
                    lowLiquidity?: string | undefined;
                    burnRate?: string | undefined;
                    isMintable?: boolean | undefined;
                    modifyableTax?: boolean | undefined;
                    selfDestruct?: boolean | undefined;
                    noMintAuthority?: boolean | undefined;
                    frozen?: boolean | undefined;
                } | null | undefined;
                tokenType?: "2020" | "2022" | "erc20" | "trc10" | "trc20" | null | undefined;
                lamports?: string | null | undefined;
                tokenAccount?: string | null | undefined;
            }[];
            cross_chain_balances: Record<string, {
                address: string;
                balanceRaw: string;
                balance: number;
                chainId: string;
            }>;
            estimated_balance: number;
            token_balance: number;
            allocation: number;
            realized_pnl?: number | undefined;
            unrealized_pnl?: number | undefined;
            price_bought?: number | undefined;
            total_invested?: number | undefined;
            min_buy_price?: number | undefined;
            max_buy_price?: number | undefined;
        }[];
        wallets: string[];
        total_wallet_balance: number;
        balances_length: number;
        win_rate?: number | undefined;
        tokens_distribution?: {
            '10x+': number;
            '4x - 10x': number;
            '2x - 4x': number;
            '10% - 2x': number;
            '-10% - 10%': number;
            '-50% - -10%': number;
            '-100% - -50%': number;
        } | undefined;
        pnl_history?: {
            '24h': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '1y': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '7d': [Date, {
                realized: number;
                unrealized: number;
            }][];
            '30d': [Date, {
                realized: number;
                unrealized: number;
            }][];
        } | undefined;
        total_realized_pnl?: number | undefined;
        total_unrealized_pnl?: number | undefined;
        total_pnl_history?: {
            '24h': {
                realized: number;
                unrealized: number;
            };
            '1y': {
                realized: number;
                unrealized: number;
            };
            '7d': {
                realized: number;
                unrealized: number;
            };
            '30d': {
                realized: number;
                unrealized: number;
            };
        } | undefined;
    }[];
    backfill_status?: "processed" | "processing" | "pending" | undefined;
}>;
export type MultiPortfolioResponse = z.infer<typeof MultiPortfolioResponseSchema>;
export declare const PositionSchema: z.ZodArray<z.ZodObject<{
    type: z.ZodString;
    name: z.ZodString;
    chain_id: z.ZodString;
    contract: z.ZodString;
    created_at: z.ZodNullable<z.ZodString>;
    tokens: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        symbol: z.ZodString;
        contract: z.ZodString;
        amount: z.ZodString;
        amountRaw: z.ZodString;
        decimals: z.ZodString;
        amount_usd: z.ZodString;
        logo: z.ZodNullable<z.ZodString>;
        price_usd: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        name: string;
        decimals: string;
        logo: string | null;
        amountRaw: string;
        amount: string;
        amount_usd: string;
        contract: string;
        price_usd: string | null;
    }, {
        symbol: string;
        name: string;
        decimals: string;
        logo: string | null;
        amountRaw: string;
        amount: string;
        amount_usd: string;
        contract: string;
        price_usd: string | null;
    }>, "many">;
    rewards: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        symbol: z.ZodString;
        contract: z.ZodString;
        amount: z.ZodString;
        amountRaw: z.ZodString;
        decimals: z.ZodString;
        amount_usd: z.ZodString;
        price_usd: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        name: string;
        decimals: string;
        amountRaw: string;
        amount: string;
        amount_usd: string;
        contract: string;
        price_usd: string;
    }, {
        symbol: string;
        name: string;
        decimals: string;
        amountRaw: string;
        amount: string;
        amount_usd: string;
        contract: string;
        price_usd: string;
    }>, "many">>;
    extra: z.ZodOptional<z.ZodObject<{
        lp_token_amount: z.ZodOptional<z.ZodString>;
        position_staked_amount: z.ZodOptional<z.ZodString>;
        factory: z.ZodOptional<z.ZodString>;
        share_of_pool: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodEnum<["supply", "borrow"]>>;
        health_factor: z.ZodOptional<z.ZodNumber>;
        reserve0: z.ZodOptional<z.ZodString>;
        reserve1: z.ZodOptional<z.ZodString>;
        reserve_usd: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type?: "supply" | "borrow" | undefined;
        factory?: string | undefined;
        lp_token_amount?: string | undefined;
        position_staked_amount?: string | undefined;
        share_of_pool?: string | undefined;
        health_factor?: number | undefined;
        reserve0?: string | undefined;
        reserve1?: string | undefined;
        reserve_usd?: number | undefined;
    }, {
        type?: "supply" | "borrow" | undefined;
        factory?: string | undefined;
        lp_token_amount?: string | undefined;
        position_staked_amount?: string | undefined;
        share_of_pool?: string | undefined;
        health_factor?: number | undefined;
        reserve0?: string | undefined;
        reserve1?: string | undefined;
        reserve_usd?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    type: string;
    name: string;
    created_at: string | null;
    tokens: {
        symbol: string;
        name: string;
        decimals: string;
        logo: string | null;
        amountRaw: string;
        amount: string;
        amount_usd: string;
        contract: string;
        price_usd: string | null;
    }[];
    chain_id: string;
    contract: string;
    rewards?: {
        symbol: string;
        name: string;
        decimals: string;
        amountRaw: string;
        amount: string;
        amount_usd: string;
        contract: string;
        price_usd: string;
    }[] | undefined;
    extra?: {
        type?: "supply" | "borrow" | undefined;
        factory?: string | undefined;
        lp_token_amount?: string | undefined;
        position_staked_amount?: string | undefined;
        share_of_pool?: string | undefined;
        health_factor?: number | undefined;
        reserve0?: string | undefined;
        reserve1?: string | undefined;
        reserve_usd?: number | undefined;
    } | undefined;
}, {
    type: string;
    name: string;
    created_at: string | null;
    tokens: {
        symbol: string;
        name: string;
        decimals: string;
        logo: string | null;
        amountRaw: string;
        amount: string;
        amount_usd: string;
        contract: string;
        price_usd: string | null;
    }[];
    chain_id: string;
    contract: string;
    rewards?: {
        symbol: string;
        name: string;
        decimals: string;
        amountRaw: string;
        amount: string;
        amount_usd: string;
        contract: string;
        price_usd: string;
    }[] | undefined;
    extra?: {
        type?: "supply" | "borrow" | undefined;
        factory?: string | undefined;
        lp_token_amount?: string | undefined;
        position_staked_amount?: string | undefined;
        share_of_pool?: string | undefined;
        health_factor?: number | undefined;
        reserve0?: string | undefined;
        reserve1?: string | undefined;
        reserve_usd?: number | undefined;
    } | undefined;
}>, "many">;
export type PositionOutputType = z.infer<typeof PositionSchema>;
export declare const DefiPositionsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        protocol: z.ZodObject<{
            name: z.ZodString;
            id: z.ZodString;
            logo: z.ZodString;
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            logo: string;
            url: string;
        }, {
            name: string;
            id: string;
            logo: string;
            url: string;
        }>;
        positions: z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            name: z.ZodString;
            chain_id: z.ZodString;
            contract: z.ZodString;
            created_at: z.ZodNullable<z.ZodString>;
            tokens: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                symbol: z.ZodString;
                contract: z.ZodString;
                amount: z.ZodString;
                amountRaw: z.ZodString;
                decimals: z.ZodString;
                amount_usd: z.ZodString;
                logo: z.ZodNullable<z.ZodString>;
                price_usd: z.ZodNullable<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                symbol: string;
                name: string;
                decimals: string;
                logo: string | null;
                amountRaw: string;
                amount: string;
                amount_usd: string;
                contract: string;
                price_usd: string | null;
            }, {
                symbol: string;
                name: string;
                decimals: string;
                logo: string | null;
                amountRaw: string;
                amount: string;
                amount_usd: string;
                contract: string;
                price_usd: string | null;
            }>, "many">;
            rewards: z.ZodOptional<z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                symbol: z.ZodString;
                contract: z.ZodString;
                amount: z.ZodString;
                amountRaw: z.ZodString;
                decimals: z.ZodString;
                amount_usd: z.ZodString;
                price_usd: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                symbol: string;
                name: string;
                decimals: string;
                amountRaw: string;
                amount: string;
                amount_usd: string;
                contract: string;
                price_usd: string;
            }, {
                symbol: string;
                name: string;
                decimals: string;
                amountRaw: string;
                amount: string;
                amount_usd: string;
                contract: string;
                price_usd: string;
            }>, "many">>;
            extra: z.ZodOptional<z.ZodObject<{
                lp_token_amount: z.ZodOptional<z.ZodString>;
                position_staked_amount: z.ZodOptional<z.ZodString>;
                factory: z.ZodOptional<z.ZodString>;
                share_of_pool: z.ZodOptional<z.ZodString>;
                type: z.ZodOptional<z.ZodEnum<["supply", "borrow"]>>;
                health_factor: z.ZodOptional<z.ZodNumber>;
                reserve0: z.ZodOptional<z.ZodString>;
                reserve1: z.ZodOptional<z.ZodString>;
                reserve_usd: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                type?: "supply" | "borrow" | undefined;
                factory?: string | undefined;
                lp_token_amount?: string | undefined;
                position_staked_amount?: string | undefined;
                share_of_pool?: string | undefined;
                health_factor?: number | undefined;
                reserve0?: string | undefined;
                reserve1?: string | undefined;
                reserve_usd?: number | undefined;
            }, {
                type?: "supply" | "borrow" | undefined;
                factory?: string | undefined;
                lp_token_amount?: string | undefined;
                position_staked_amount?: string | undefined;
                share_of_pool?: string | undefined;
                health_factor?: number | undefined;
                reserve0?: string | undefined;
                reserve1?: string | undefined;
                reserve_usd?: number | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: string;
            name: string;
            created_at: string | null;
            tokens: {
                symbol: string;
                name: string;
                decimals: string;
                logo: string | null;
                amountRaw: string;
                amount: string;
                amount_usd: string;
                contract: string;
                price_usd: string | null;
            }[];
            chain_id: string;
            contract: string;
            rewards?: {
                symbol: string;
                name: string;
                decimals: string;
                amountRaw: string;
                amount: string;
                amount_usd: string;
                contract: string;
                price_usd: string;
            }[] | undefined;
            extra?: {
                type?: "supply" | "borrow" | undefined;
                factory?: string | undefined;
                lp_token_amount?: string | undefined;
                position_staked_amount?: string | undefined;
                share_of_pool?: string | undefined;
                health_factor?: number | undefined;
                reserve0?: string | undefined;
                reserve1?: string | undefined;
                reserve_usd?: number | undefined;
            } | undefined;
        }, {
            type: string;
            name: string;
            created_at: string | null;
            tokens: {
                symbol: string;
                name: string;
                decimals: string;
                logo: string | null;
                amountRaw: string;
                amount: string;
                amount_usd: string;
                contract: string;
                price_usd: string | null;
            }[];
            chain_id: string;
            contract: string;
            rewards?: {
                symbol: string;
                name: string;
                decimals: string;
                amountRaw: string;
                amount: string;
                amount_usd: string;
                contract: string;
                price_usd: string;
            }[] | undefined;
            extra?: {
                type?: "supply" | "borrow" | undefined;
                factory?: string | undefined;
                lp_token_amount?: string | undefined;
                position_staked_amount?: string | undefined;
                share_of_pool?: string | undefined;
                health_factor?: number | undefined;
                reserve0?: string | undefined;
                reserve1?: string | undefined;
                reserve_usd?: number | undefined;
            } | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        protocol: {
            name: string;
            id: string;
            logo: string;
            url: string;
        };
        positions: {
            type: string;
            name: string;
            created_at: string | null;
            tokens: {
                symbol: string;
                name: string;
                decimals: string;
                logo: string | null;
                amountRaw: string;
                amount: string;
                amount_usd: string;
                contract: string;
                price_usd: string | null;
            }[];
            chain_id: string;
            contract: string;
            rewards?: {
                symbol: string;
                name: string;
                decimals: string;
                amountRaw: string;
                amount: string;
                amount_usd: string;
                contract: string;
                price_usd: string;
            }[] | undefined;
            extra?: {
                type?: "supply" | "borrow" | undefined;
                factory?: string | undefined;
                lp_token_amount?: string | undefined;
                position_staked_amount?: string | undefined;
                share_of_pool?: string | undefined;
                health_factor?: number | undefined;
                reserve0?: string | undefined;
                reserve1?: string | undefined;
                reserve_usd?: number | undefined;
            } | undefined;
        }[];
    }, {
        protocol: {
            name: string;
            id: string;
            logo: string;
            url: string;
        };
        positions: {
            type: string;
            name: string;
            created_at: string | null;
            tokens: {
                symbol: string;
                name: string;
                decimals: string;
                logo: string | null;
                amountRaw: string;
                amount: string;
                amount_usd: string;
                contract: string;
                price_usd: string | null;
            }[];
            chain_id: string;
            contract: string;
            rewards?: {
                symbol: string;
                name: string;
                decimals: string;
                amountRaw: string;
                amount: string;
                amount_usd: string;
                contract: string;
                price_usd: string;
            }[] | undefined;
            extra?: {
                type?: "supply" | "borrow" | undefined;
                factory?: string | undefined;
                lp_token_amount?: string | undefined;
                position_staked_amount?: string | undefined;
                share_of_pool?: string | undefined;
                health_factor?: number | undefined;
                reserve0?: string | undefined;
                reserve1?: string | undefined;
                reserve_usd?: number | undefined;
            } | undefined;
        }[];
    }>, "many">;
    wallets: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        protocol: {
            name: string;
            id: string;
            logo: string;
            url: string;
        };
        positions: {
            type: string;
            name: string;
            created_at: string | null;
            tokens: {
                symbol: string;
                name: string;
                decimals: string;
                logo: string | null;
                amountRaw: string;
                amount: string;
                amount_usd: string;
                contract: string;
                price_usd: string | null;
            }[];
            chain_id: string;
            contract: string;
            rewards?: {
                symbol: string;
                name: string;
                decimals: string;
                amountRaw: string;
                amount: string;
                amount_usd: string;
                contract: string;
                price_usd: string;
            }[] | undefined;
            extra?: {
                type?: "supply" | "borrow" | undefined;
                factory?: string | undefined;
                lp_token_amount?: string | undefined;
                position_staked_amount?: string | undefined;
                share_of_pool?: string | undefined;
                health_factor?: number | undefined;
                reserve0?: string | undefined;
                reserve1?: string | undefined;
                reserve_usd?: number | undefined;
            } | undefined;
        }[];
    }[];
    wallets: string[];
}, {
    data: {
        protocol: {
            name: string;
            id: string;
            logo: string;
            url: string;
        };
        positions: {
            type: string;
            name: string;
            created_at: string | null;
            tokens: {
                symbol: string;
                name: string;
                decimals: string;
                logo: string | null;
                amountRaw: string;
                amount: string;
                amount_usd: string;
                contract: string;
                price_usd: string | null;
            }[];
            chain_id: string;
            contract: string;
            rewards?: {
                symbol: string;
                name: string;
                decimals: string;
                amountRaw: string;
                amount: string;
                amount_usd: string;
                contract: string;
                price_usd: string;
            }[] | undefined;
            extra?: {
                type?: "supply" | "borrow" | undefined;
                factory?: string | undefined;
                lp_token_amount?: string | undefined;
                position_staked_amount?: string | undefined;
                share_of_pool?: string | undefined;
                health_factor?: number | undefined;
                reserve0?: string | undefined;
                reserve1?: string | undefined;
                reserve_usd?: number | undefined;
            } | undefined;
        }[];
    }[];
    wallets: string[];
}>;
export type DefiPositionsResponse = z.infer<typeof DefiPositionsResponseSchema>;
export interface DefiRewardFormat {
    name: string;
    symbol: string;
    decimals: string;
    contract: string;
    logo: string | null;
    amountRaw: string;
    amount: string;
    priceUSD: string | null;
    amountUSD: string;
}
export interface LPToken {
    rawBalance: string;
    formattedBalance: number;
    assetId: number | null;
    chainId: string;
    address: string;
    decimals: number;
    name: string;
    symbol: string;
}
export interface ProtocolMetadata {
    name: string;
    id: string;
    url: string;
    logo: string;
}
export declare const PortfolioParamsSchema: z.ZodObject<{
    wallet: z.ZodOptional<z.ZodString>;
    wallets: z.ZodOptional<z.ZodString>;
    portfolio: z.ZodOptional<z.ZodString>;
    blockchains: z.ZodOptional<z.ZodString>;
    asset: z.ZodOptional<z.ZodString>;
    cache: z.ZodOptional<z.ZodString>;
    stale: z.ZodOptional<z.ZodString>;
    recheck_contract: z.ZodOptional<z.ZodString>;
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
    portfolio_settings: z.ZodOptional<z.ZodString>;
    unlistedAssets: z.ZodOptional<z.ZodString>;
    period: z.ZodOptional<z.ZodString>;
    accuracy: z.ZodOptional<z.ZodString>;
    testnet: z.ZodOptional<z.ZodString>;
    minliq: z.ZodOptional<z.ZodString>;
    filterSpam: z.ZodOptional<z.ZodString>;
    fetchUntrackedHistory: z.ZodOptional<z.ZodString>;
    fetchAllChains: z.ZodOptional<z.ZodString>;
    shouldFetchPriceChange: z.ZodOptional<z.ZodString>;
    backfillTransfers: z.ZodOptional<z.ZodString>;
    fetchEmptyBalances: z.ZodOptional<z.ZodString>;
    pnl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    blockchains?: string | undefined;
    testnet?: string | undefined;
    asset?: string | undefined;
    shouldFetchPriceChange?: string | undefined;
    from?: string | undefined;
    to?: string | undefined;
    period?: string | undefined;
    wallet?: string | undefined;
    wallets?: string | undefined;
    unlistedAssets?: string | undefined;
    accuracy?: string | undefined;
    minliq?: string | undefined;
    filterSpam?: string | undefined;
    fetchUntrackedHistory?: string | undefined;
    fetchAllChains?: string | undefined;
    backfillTransfers?: string | undefined;
    portfolio?: string | undefined;
    cache?: string | undefined;
    stale?: string | undefined;
    recheck_contract?: string | undefined;
    portfolio_settings?: string | undefined;
    fetchEmptyBalances?: string | undefined;
    pnl?: string | undefined;
}, {
    blockchains?: string | undefined;
    testnet?: string | undefined;
    asset?: string | undefined;
    shouldFetchPriceChange?: string | undefined;
    from?: string | undefined;
    to?: string | undefined;
    period?: string | undefined;
    wallet?: string | undefined;
    wallets?: string | undefined;
    unlistedAssets?: string | undefined;
    accuracy?: string | undefined;
    minliq?: string | undefined;
    filterSpam?: string | undefined;
    fetchUntrackedHistory?: string | undefined;
    fetchAllChains?: string | undefined;
    backfillTransfers?: string | undefined;
    portfolio?: string | undefined;
    cache?: string | undefined;
    stale?: string | undefined;
    recheck_contract?: string | undefined;
    portfolio_settings?: string | undefined;
    fetchEmptyBalances?: string | undefined;
    pnl?: string | undefined;
}>;
export type PortfolioParams = z.input<typeof PortfolioParamsSchema>;
export declare const PortfolioDefiParamsSchema: z.ZodObject<{
    wallet: z.ZodOptional<z.ZodString>;
    wallets: z.ZodOptional<z.ZodString>;
    blockchains: z.ZodOptional<z.ZodString>;
    testnet: z.ZodOptional<z.ZodString>;
    unlistedAssets: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    blockchains?: string | undefined;
    testnet?: string | undefined;
    wallet?: string | undefined;
    wallets?: string | undefined;
    unlistedAssets?: string | undefined;
}, {
    blockchains?: string | undefined;
    testnet?: string | undefined;
    wallet?: string | undefined;
    wallets?: string | undefined;
    unlistedAssets?: string | undefined;
}>;
export type PortfolioDefiParams = z.input<typeof PortfolioDefiParamsSchema>;
export type WalletUnsafeParams = {
    wallet?: string;
    wallets?: string;
    portfolio?: string;
    blockchains?: string;
    asset?: string;
    pnl?: boolean | string;
    cache?: boolean | string;
    stale?: number | string;
    recheck_contract?: boolean | string;
    from?: string;
    to?: string;
    portfolio_settings?: string;
    unlistedAssets?: boolean | string;
    period?: string;
    accuracy?: string;
    testnet?: boolean | string;
    minliq?: number | string;
    filterSpam?: boolean | string;
    shouldFetchPriceChange?: boolean | string;
    fetchUntrackedHistory?: boolean | string;
    fetchAllChains?: boolean | string;
    backfillTransfers?: boolean | string;
    fetchEmptyBalances?: boolean | string;
};
export {};
