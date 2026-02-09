import { z } from 'zod';
export declare const WalletAnalysisParamsSchema: z.ZodObject<{
    wallet: z.ZodString;
    blockchain: z.ZodOptional<z.ZodString>;
    period: z.ZodEffects<z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, string, string | undefined>, string, string | undefined>;
}, "strip", z.ZodTypeAny, {
    period: string;
    wallet: string;
    blockchain?: string | undefined;
}, {
    wallet: string;
    blockchain?: string | undefined;
    period?: string | undefined;
}>;
export type WalletAnalysisParams = z.input<typeof WalletAnalysisParamsSchema>;
export declare const WalletAnalysisParamsSchemaOpenAPI: z.ZodObject<{
    wallet: z.ZodString;
    blockchain: z.ZodOptional<z.ZodString>;
    period: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    period: string;
    wallet: string;
    blockchain?: string | undefined;
}, {
    wallet: string;
    blockchain?: string | undefined;
    period?: string | undefined;
}>;
export declare const WalletAnalysisResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        winRateDistribution: z.ZodObject<{
            '>500%': z.ZodNumber;
            '200%-500%': z.ZodNumber;
            '50%-200%': z.ZodNumber;
            '0%-50%': z.ZodNumber;
            '-50%-0%': z.ZodNumber;
            '<-50%': z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            '>500%': number;
            '200%-500%': number;
            '50%-200%': number;
            '0%-50%': number;
            '-50%-0%': number;
            '<-50%': number;
        }, {
            '>500%': number;
            '200%-500%': number;
            '50%-200%': number;
            '0%-50%': number;
            '-50%-0%': number;
            '<-50%': number;
        }>;
        marketCapDistribution: z.ZodObject<{
            '>1000M': z.ZodNumber;
            '>100M': z.ZodNumber;
            '10M-100M': z.ZodNumber;
            '1M-10M': z.ZodNumber;
            '100k-1M': z.ZodNumber;
            '<100k': z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            '>1000M': number;
            '>100M': number;
            '10M-100M': number;
            '1M-10M': number;
            '100k-1M': number;
            '<100k': number;
        }, {
            '>1000M': number;
            '>100M': number;
            '10M-100M': number;
            '1M-10M': number;
            '100k-1M': number;
            '<100k': number;
        }>;
        periodTimeframes: z.ZodArray<z.ZodObject<{
            date: z.ZodDate;
            realized: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            date: Date;
            realized: number;
        }, {
            date: Date;
            realized: number;
        }>, "many">;
        stat: z.ZodObject<{
            totalValue: z.ZodNumber;
            periodTotalPnlUSD: z.ZodNumber;
            periodRealizedPnlUSD: z.ZodNumber;
            periodRealizedRate: z.ZodNumber;
            periodActiveTokensCount: z.ZodNumber;
            periodWinCount: z.ZodNumber;
            fundingInfo: z.ZodObject<{
                from: z.ZodNullable<z.ZodString>;
                date: z.ZodNullable<z.ZodDate>;
                chainId: z.ZodNullable<z.ZodString>;
                txHash: z.ZodNullable<z.ZodString>;
                amount: z.ZodNullable<z.ZodString>;
                fromWalletLogo: z.ZodNullable<z.ZodString>;
                fromWalletTag: z.ZodNullable<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                date: Date | null;
                chainId: string | null;
                amount: string | null;
                from: string | null;
                txHash: string | null;
                fromWalletLogo: string | null;
                fromWalletTag: string | null;
            }, {
                date: Date | null;
                chainId: string | null;
                amount: string | null;
                from: string | null;
                txHash: string | null;
                fromWalletLogo: string | null;
                fromWalletTag: string | null;
            }>;
            periodVolumeBuy: z.ZodNumber;
            periodVolumeSell: z.ZodNumber;
            periodBuys: z.ZodNumber;
            periodSells: z.ZodNumber;
            nativeBalance: z.ZodNullable<z.ZodObject<{
                rawBalance: z.ZodString;
                formattedBalance: z.ZodNumber;
                assetId: z.ZodNullable<z.ZodNumber>;
                chainId: z.ZodString;
                address: z.ZodString;
                decimals: z.ZodNumber;
                name: z.ZodString;
                symbol: z.ZodString;
                logo: z.ZodNullable<z.ZodString>;
                price: z.ZodNumber;
                balanceUSD: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                symbol: string;
                name: string;
                address: string;
                balanceUSD: number;
                chainId: string;
                decimals: number;
                logo: string | null;
                price: number;
                assetId: number | null;
                rawBalance: string;
                formattedBalance: number;
            }, {
                symbol: string;
                name: string;
                address: string;
                balanceUSD: number;
                chainId: string;
                decimals: number;
                logo: string | null;
                price: number;
                assetId: number | null;
                rawBalance: string;
                formattedBalance: number;
            }>>;
            periodBuyTokens: z.ZodNumber;
            periodSellTokens: z.ZodNumber;
            periodTradingTokens: z.ZodNumber;
            holdingTokensCount: z.ZodNumber;
            holdingDuration: z.ZodNumber;
            tradingTimeFrames: z.ZodNumber;
            winRealizedPnl: z.ZodNumber;
            winRealizedPnlRate: z.ZodNumber;
            winToken: z.ZodNullable<z.ZodObject<{
                address: z.ZodString;
                chainId: z.ZodString;
                name: z.ZodString;
                symbol: z.ZodString;
                logo: z.ZodNullable<z.ZodString>;
                decimals: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                symbol: string;
                name: string;
                address: string;
                chainId: string;
                decimals: number;
                logo: string | null;
            }, {
                symbol: string;
                name: string;
                address: string;
                chainId: string;
                decimals: number;
                logo: string | null;
            }>>;
        }, "strip", z.ZodTypeAny, {
            nativeBalance: {
                symbol: string;
                name: string;
                address: string;
                balanceUSD: number;
                chainId: string;
                decimals: number;
                logo: string | null;
                price: number;
                assetId: number | null;
                rawBalance: string;
                formattedBalance: number;
            } | null;
            fundingInfo: {
                date: Date | null;
                chainId: string | null;
                amount: string | null;
                from: string | null;
                txHash: string | null;
                fromWalletLogo: string | null;
                fromWalletTag: string | null;
            };
            totalValue: number;
            periodTotalPnlUSD: number;
            periodRealizedPnlUSD: number;
            periodRealizedRate: number;
            periodActiveTokensCount: number;
            periodWinCount: number;
            periodVolumeBuy: number;
            periodVolumeSell: number;
            periodBuys: number;
            periodSells: number;
            periodBuyTokens: number;
            periodSellTokens: number;
            periodTradingTokens: number;
            holdingTokensCount: number;
            holdingDuration: number;
            tradingTimeFrames: number;
            winRealizedPnl: number;
            winRealizedPnlRate: number;
            winToken: {
                symbol: string;
                name: string;
                address: string;
                chainId: string;
                decimals: number;
                logo: string | null;
            } | null;
        }, {
            nativeBalance: {
                symbol: string;
                name: string;
                address: string;
                balanceUSD: number;
                chainId: string;
                decimals: number;
                logo: string | null;
                price: number;
                assetId: number | null;
                rawBalance: string;
                formattedBalance: number;
            } | null;
            fundingInfo: {
                date: Date | null;
                chainId: string | null;
                amount: string | null;
                from: string | null;
                txHash: string | null;
                fromWalletLogo: string | null;
                fromWalletTag: string | null;
            };
            totalValue: number;
            periodTotalPnlUSD: number;
            periodRealizedPnlUSD: number;
            periodRealizedRate: number;
            periodActiveTokensCount: number;
            periodWinCount: number;
            periodVolumeBuy: number;
            periodVolumeSell: number;
            periodBuys: number;
            periodSells: number;
            periodBuyTokens: number;
            periodSellTokens: number;
            periodTradingTokens: number;
            holdingTokensCount: number;
            holdingDuration: number;
            tradingTimeFrames: number;
            winRealizedPnl: number;
            winRealizedPnlRate: number;
            winToken: {
                symbol: string;
                name: string;
                address: string;
                chainId: string;
                decimals: number;
                logo: string | null;
            } | null;
        }>;
        labels: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        labels: string[];
        winRateDistribution: {
            '>500%': number;
            '200%-500%': number;
            '50%-200%': number;
            '0%-50%': number;
            '-50%-0%': number;
            '<-50%': number;
        };
        marketCapDistribution: {
            '>1000M': number;
            '>100M': number;
            '10M-100M': number;
            '1M-10M': number;
            '100k-1M': number;
            '<100k': number;
        };
        periodTimeframes: {
            date: Date;
            realized: number;
        }[];
        stat: {
            nativeBalance: {
                symbol: string;
                name: string;
                address: string;
                balanceUSD: number;
                chainId: string;
                decimals: number;
                logo: string | null;
                price: number;
                assetId: number | null;
                rawBalance: string;
                formattedBalance: number;
            } | null;
            fundingInfo: {
                date: Date | null;
                chainId: string | null;
                amount: string | null;
                from: string | null;
                txHash: string | null;
                fromWalletLogo: string | null;
                fromWalletTag: string | null;
            };
            totalValue: number;
            periodTotalPnlUSD: number;
            periodRealizedPnlUSD: number;
            periodRealizedRate: number;
            periodActiveTokensCount: number;
            periodWinCount: number;
            periodVolumeBuy: number;
            periodVolumeSell: number;
            periodBuys: number;
            periodSells: number;
            periodBuyTokens: number;
            periodSellTokens: number;
            periodTradingTokens: number;
            holdingTokensCount: number;
            holdingDuration: number;
            tradingTimeFrames: number;
            winRealizedPnl: number;
            winRealizedPnlRate: number;
            winToken: {
                symbol: string;
                name: string;
                address: string;
                chainId: string;
                decimals: number;
                logo: string | null;
            } | null;
        };
    }, {
        labels: string[];
        winRateDistribution: {
            '>500%': number;
            '200%-500%': number;
            '50%-200%': number;
            '0%-50%': number;
            '-50%-0%': number;
            '<-50%': number;
        };
        marketCapDistribution: {
            '>1000M': number;
            '>100M': number;
            '10M-100M': number;
            '1M-10M': number;
            '100k-1M': number;
            '<100k': number;
        };
        periodTimeframes: {
            date: Date;
            realized: number;
        }[];
        stat: {
            nativeBalance: {
                symbol: string;
                name: string;
                address: string;
                balanceUSD: number;
                chainId: string;
                decimals: number;
                logo: string | null;
                price: number;
                assetId: number | null;
                rawBalance: string;
                formattedBalance: number;
            } | null;
            fundingInfo: {
                date: Date | null;
                chainId: string | null;
                amount: string | null;
                from: string | null;
                txHash: string | null;
                fromWalletLogo: string | null;
                fromWalletTag: string | null;
            };
            totalValue: number;
            periodTotalPnlUSD: number;
            periodRealizedPnlUSD: number;
            periodRealizedRate: number;
            periodActiveTokensCount: number;
            periodWinCount: number;
            periodVolumeBuy: number;
            periodVolumeSell: number;
            periodBuys: number;
            periodSells: number;
            periodBuyTokens: number;
            periodSellTokens: number;
            periodTradingTokens: number;
            holdingTokensCount: number;
            holdingDuration: number;
            tradingTimeFrames: number;
            winRealizedPnl: number;
            winRealizedPnlRate: number;
            winToken: {
                symbol: string;
                name: string;
                address: string;
                chainId: string;
                decimals: number;
                logo: string | null;
            } | null;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        labels: string[];
        winRateDistribution: {
            '>500%': number;
            '200%-500%': number;
            '50%-200%': number;
            '0%-50%': number;
            '-50%-0%': number;
            '<-50%': number;
        };
        marketCapDistribution: {
            '>1000M': number;
            '>100M': number;
            '10M-100M': number;
            '1M-10M': number;
            '100k-1M': number;
            '<100k': number;
        };
        periodTimeframes: {
            date: Date;
            realized: number;
        }[];
        stat: {
            nativeBalance: {
                symbol: string;
                name: string;
                address: string;
                balanceUSD: number;
                chainId: string;
                decimals: number;
                logo: string | null;
                price: number;
                assetId: number | null;
                rawBalance: string;
                formattedBalance: number;
            } | null;
            fundingInfo: {
                date: Date | null;
                chainId: string | null;
                amount: string | null;
                from: string | null;
                txHash: string | null;
                fromWalletLogo: string | null;
                fromWalletTag: string | null;
            };
            totalValue: number;
            periodTotalPnlUSD: number;
            periodRealizedPnlUSD: number;
            periodRealizedRate: number;
            periodActiveTokensCount: number;
            periodWinCount: number;
            periodVolumeBuy: number;
            periodVolumeSell: number;
            periodBuys: number;
            periodSells: number;
            periodBuyTokens: number;
            periodSellTokens: number;
            periodTradingTokens: number;
            holdingTokensCount: number;
            holdingDuration: number;
            tradingTimeFrames: number;
            winRealizedPnl: number;
            winRealizedPnlRate: number;
            winToken: {
                symbol: string;
                name: string;
                address: string;
                chainId: string;
                decimals: number;
                logo: string | null;
            } | null;
        };
    };
}, {
    data: {
        labels: string[];
        winRateDistribution: {
            '>500%': number;
            '200%-500%': number;
            '50%-200%': number;
            '0%-50%': number;
            '-50%-0%': number;
            '<-50%': number;
        };
        marketCapDistribution: {
            '>1000M': number;
            '>100M': number;
            '10M-100M': number;
            '1M-10M': number;
            '100k-1M': number;
            '<100k': number;
        };
        periodTimeframes: {
            date: Date;
            realized: number;
        }[];
        stat: {
            nativeBalance: {
                symbol: string;
                name: string;
                address: string;
                balanceUSD: number;
                chainId: string;
                decimals: number;
                logo: string | null;
                price: number;
                assetId: number | null;
                rawBalance: string;
                formattedBalance: number;
            } | null;
            fundingInfo: {
                date: Date | null;
                chainId: string | null;
                amount: string | null;
                from: string | null;
                txHash: string | null;
                fromWalletLogo: string | null;
                fromWalletTag: string | null;
            };
            totalValue: number;
            periodTotalPnlUSD: number;
            periodRealizedPnlUSD: number;
            periodRealizedRate: number;
            periodActiveTokensCount: number;
            periodWinCount: number;
            periodVolumeBuy: number;
            periodVolumeSell: number;
            periodBuys: number;
            periodSells: number;
            periodBuyTokens: number;
            periodSellTokens: number;
            periodTradingTokens: number;
            holdingTokensCount: number;
            holdingDuration: number;
            tradingTimeFrames: number;
            winRealizedPnl: number;
            winRealizedPnlRate: number;
            winToken: {
                symbol: string;
                name: string;
                address: string;
                chainId: string;
                decimals: number;
                logo: string | null;
            } | null;
        };
    };
}>;
export type WalletAnalysisResponse = z.infer<typeof WalletAnalysisResponseSchema>;
export declare const WalletAnalysisResponseSchemaOpenAPI: z.ZodObject<{
    data: z.ZodObject<{
        winRateDistribution: z.ZodObject<{
            '>500%': z.ZodNumber;
            '200%-500%': z.ZodNumber;
            '50%-200%': z.ZodNumber;
            '0%-50%': z.ZodNumber;
            '-50%-0%': z.ZodNumber;
            '<-50%': z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            '>500%': number;
            '200%-500%': number;
            '50%-200%': number;
            '0%-50%': number;
            '-50%-0%': number;
            '<-50%': number;
        }, {
            '>500%': number;
            '200%-500%': number;
            '50%-200%': number;
            '0%-50%': number;
            '-50%-0%': number;
            '<-50%': number;
        }>;
        marketCapDistribution: z.ZodObject<{
            '>1000M': z.ZodNumber;
            '>100M': z.ZodNumber;
            '10M-100M': z.ZodNumber;
            '1M-10M': z.ZodNumber;
            '100k-1M': z.ZodNumber;
            '<100k': z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            '>1000M': number;
            '>100M': number;
            '10M-100M': number;
            '1M-10M': number;
            '100k-1M': number;
            '<100k': number;
        }, {
            '>1000M': number;
            '>100M': number;
            '10M-100M': number;
            '1M-10M': number;
            '100k-1M': number;
            '<100k': number;
        }>;
        periodTimeframes: z.ZodArray<z.ZodObject<{
            date: z.ZodString;
            realized: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            date: string;
            realized: number;
        }, {
            date: string;
            realized: number;
        }>, "many">;
        stat: z.ZodObject<{
            totalValue: z.ZodNumber;
            periodTotalPnlUSD: z.ZodNumber;
            periodRealizedPnlUSD: z.ZodNumber;
            periodRealizedRate: z.ZodNumber;
            periodActiveTokensCount: z.ZodNumber;
            periodWinCount: z.ZodNumber;
            fundingInfo: z.ZodObject<{
                from: z.ZodNullable<z.ZodString>;
                date: z.ZodNullable<z.ZodString>;
                chainId: z.ZodNullable<z.ZodString>;
                txHash: z.ZodNullable<z.ZodString>;
                amount: z.ZodNullable<z.ZodString>;
                fromWalletLogo: z.ZodNullable<z.ZodString>;
                fromWalletTag: z.ZodNullable<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                date: string | null;
                chainId: string | null;
                amount: string | null;
                from: string | null;
                txHash: string | null;
                fromWalletLogo: string | null;
                fromWalletTag: string | null;
            }, {
                date: string | null;
                chainId: string | null;
                amount: string | null;
                from: string | null;
                txHash: string | null;
                fromWalletLogo: string | null;
                fromWalletTag: string | null;
            }>;
            periodVolumeBuy: z.ZodNumber;
            periodVolumeSell: z.ZodNumber;
            periodBuys: z.ZodNumber;
            periodSells: z.ZodNumber;
            nativeBalance: z.ZodNullable<z.ZodObject<{
                rawBalance: z.ZodString;
                formattedBalance: z.ZodNumber;
                assetId: z.ZodNullable<z.ZodNumber>;
                chainId: z.ZodString;
                address: z.ZodString;
                decimals: z.ZodNumber;
                name: z.ZodString;
                symbol: z.ZodString;
                logo: z.ZodNullable<z.ZodString>;
                price: z.ZodNumber;
                balanceUSD: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                symbol: string;
                name: string;
                address: string;
                balanceUSD: number;
                chainId: string;
                decimals: number;
                logo: string | null;
                price: number;
                assetId: number | null;
                rawBalance: string;
                formattedBalance: number;
            }, {
                symbol: string;
                name: string;
                address: string;
                balanceUSD: number;
                chainId: string;
                decimals: number;
                logo: string | null;
                price: number;
                assetId: number | null;
                rawBalance: string;
                formattedBalance: number;
            }>>;
            periodBuyTokens: z.ZodNumber;
            periodSellTokens: z.ZodNumber;
            periodTradingTokens: z.ZodNumber;
            holdingTokensCount: z.ZodNumber;
            holdingDuration: z.ZodNumber;
            tradingTimeFrames: z.ZodNumber;
            winRealizedPnl: z.ZodNumber;
            winRealizedPnlRate: z.ZodNumber;
            winToken: z.ZodNullable<z.ZodObject<{
                address: z.ZodString;
                chainId: z.ZodString;
                name: z.ZodString;
                symbol: z.ZodString;
                logo: z.ZodNullable<z.ZodString>;
                decimals: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                symbol: string;
                name: string;
                address: string;
                chainId: string;
                decimals: number;
                logo: string | null;
            }, {
                symbol: string;
                name: string;
                address: string;
                chainId: string;
                decimals: number;
                logo: string | null;
            }>>;
        }, "strip", z.ZodTypeAny, {
            nativeBalance: {
                symbol: string;
                name: string;
                address: string;
                balanceUSD: number;
                chainId: string;
                decimals: number;
                logo: string | null;
                price: number;
                assetId: number | null;
                rawBalance: string;
                formattedBalance: number;
            } | null;
            fundingInfo: {
                date: string | null;
                chainId: string | null;
                amount: string | null;
                from: string | null;
                txHash: string | null;
                fromWalletLogo: string | null;
                fromWalletTag: string | null;
            };
            totalValue: number;
            periodTotalPnlUSD: number;
            periodRealizedPnlUSD: number;
            periodRealizedRate: number;
            periodActiveTokensCount: number;
            periodWinCount: number;
            periodVolumeBuy: number;
            periodVolumeSell: number;
            periodBuys: number;
            periodSells: number;
            periodBuyTokens: number;
            periodSellTokens: number;
            periodTradingTokens: number;
            holdingTokensCount: number;
            holdingDuration: number;
            tradingTimeFrames: number;
            winRealizedPnl: number;
            winRealizedPnlRate: number;
            winToken: {
                symbol: string;
                name: string;
                address: string;
                chainId: string;
                decimals: number;
                logo: string | null;
            } | null;
        }, {
            nativeBalance: {
                symbol: string;
                name: string;
                address: string;
                balanceUSD: number;
                chainId: string;
                decimals: number;
                logo: string | null;
                price: number;
                assetId: number | null;
                rawBalance: string;
                formattedBalance: number;
            } | null;
            fundingInfo: {
                date: string | null;
                chainId: string | null;
                amount: string | null;
                from: string | null;
                txHash: string | null;
                fromWalletLogo: string | null;
                fromWalletTag: string | null;
            };
            totalValue: number;
            periodTotalPnlUSD: number;
            periodRealizedPnlUSD: number;
            periodRealizedRate: number;
            periodActiveTokensCount: number;
            periodWinCount: number;
            periodVolumeBuy: number;
            periodVolumeSell: number;
            periodBuys: number;
            periodSells: number;
            periodBuyTokens: number;
            periodSellTokens: number;
            periodTradingTokens: number;
            holdingTokensCount: number;
            holdingDuration: number;
            tradingTimeFrames: number;
            winRealizedPnl: number;
            winRealizedPnlRate: number;
            winToken: {
                symbol: string;
                name: string;
                address: string;
                chainId: string;
                decimals: number;
                logo: string | null;
            } | null;
        }>;
        labels: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        labels: string[];
        winRateDistribution: {
            '>500%': number;
            '200%-500%': number;
            '50%-200%': number;
            '0%-50%': number;
            '-50%-0%': number;
            '<-50%': number;
        };
        marketCapDistribution: {
            '>1000M': number;
            '>100M': number;
            '10M-100M': number;
            '1M-10M': number;
            '100k-1M': number;
            '<100k': number;
        };
        periodTimeframes: {
            date: string;
            realized: number;
        }[];
        stat: {
            nativeBalance: {
                symbol: string;
                name: string;
                address: string;
                balanceUSD: number;
                chainId: string;
                decimals: number;
                logo: string | null;
                price: number;
                assetId: number | null;
                rawBalance: string;
                formattedBalance: number;
            } | null;
            fundingInfo: {
                date: string | null;
                chainId: string | null;
                amount: string | null;
                from: string | null;
                txHash: string | null;
                fromWalletLogo: string | null;
                fromWalletTag: string | null;
            };
            totalValue: number;
            periodTotalPnlUSD: number;
            periodRealizedPnlUSD: number;
            periodRealizedRate: number;
            periodActiveTokensCount: number;
            periodWinCount: number;
            periodVolumeBuy: number;
            periodVolumeSell: number;
            periodBuys: number;
            periodSells: number;
            periodBuyTokens: number;
            periodSellTokens: number;
            periodTradingTokens: number;
            holdingTokensCount: number;
            holdingDuration: number;
            tradingTimeFrames: number;
            winRealizedPnl: number;
            winRealizedPnlRate: number;
            winToken: {
                symbol: string;
                name: string;
                address: string;
                chainId: string;
                decimals: number;
                logo: string | null;
            } | null;
        };
    }, {
        labels: string[];
        winRateDistribution: {
            '>500%': number;
            '200%-500%': number;
            '50%-200%': number;
            '0%-50%': number;
            '-50%-0%': number;
            '<-50%': number;
        };
        marketCapDistribution: {
            '>1000M': number;
            '>100M': number;
            '10M-100M': number;
            '1M-10M': number;
            '100k-1M': number;
            '<100k': number;
        };
        periodTimeframes: {
            date: string;
            realized: number;
        }[];
        stat: {
            nativeBalance: {
                symbol: string;
                name: string;
                address: string;
                balanceUSD: number;
                chainId: string;
                decimals: number;
                logo: string | null;
                price: number;
                assetId: number | null;
                rawBalance: string;
                formattedBalance: number;
            } | null;
            fundingInfo: {
                date: string | null;
                chainId: string | null;
                amount: string | null;
                from: string | null;
                txHash: string | null;
                fromWalletLogo: string | null;
                fromWalletTag: string | null;
            };
            totalValue: number;
            periodTotalPnlUSD: number;
            periodRealizedPnlUSD: number;
            periodRealizedRate: number;
            periodActiveTokensCount: number;
            periodWinCount: number;
            periodVolumeBuy: number;
            periodVolumeSell: number;
            periodBuys: number;
            periodSells: number;
            periodBuyTokens: number;
            periodSellTokens: number;
            periodTradingTokens: number;
            holdingTokensCount: number;
            holdingDuration: number;
            tradingTimeFrames: number;
            winRealizedPnl: number;
            winRealizedPnlRate: number;
            winToken: {
                symbol: string;
                name: string;
                address: string;
                chainId: string;
                decimals: number;
                logo: string | null;
            } | null;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        labels: string[];
        winRateDistribution: {
            '>500%': number;
            '200%-500%': number;
            '50%-200%': number;
            '0%-50%': number;
            '-50%-0%': number;
            '<-50%': number;
        };
        marketCapDistribution: {
            '>1000M': number;
            '>100M': number;
            '10M-100M': number;
            '1M-10M': number;
            '100k-1M': number;
            '<100k': number;
        };
        periodTimeframes: {
            date: string;
            realized: number;
        }[];
        stat: {
            nativeBalance: {
                symbol: string;
                name: string;
                address: string;
                balanceUSD: number;
                chainId: string;
                decimals: number;
                logo: string | null;
                price: number;
                assetId: number | null;
                rawBalance: string;
                formattedBalance: number;
            } | null;
            fundingInfo: {
                date: string | null;
                chainId: string | null;
                amount: string | null;
                from: string | null;
                txHash: string | null;
                fromWalletLogo: string | null;
                fromWalletTag: string | null;
            };
            totalValue: number;
            periodTotalPnlUSD: number;
            periodRealizedPnlUSD: number;
            periodRealizedRate: number;
            periodActiveTokensCount: number;
            periodWinCount: number;
            periodVolumeBuy: number;
            periodVolumeSell: number;
            periodBuys: number;
            periodSells: number;
            periodBuyTokens: number;
            periodSellTokens: number;
            periodTradingTokens: number;
            holdingTokensCount: number;
            holdingDuration: number;
            tradingTimeFrames: number;
            winRealizedPnl: number;
            winRealizedPnlRate: number;
            winToken: {
                symbol: string;
                name: string;
                address: string;
                chainId: string;
                decimals: number;
                logo: string | null;
            } | null;
        };
    };
}, {
    data: {
        labels: string[];
        winRateDistribution: {
            '>500%': number;
            '200%-500%': number;
            '50%-200%': number;
            '0%-50%': number;
            '-50%-0%': number;
            '<-50%': number;
        };
        marketCapDistribution: {
            '>1000M': number;
            '>100M': number;
            '10M-100M': number;
            '1M-10M': number;
            '100k-1M': number;
            '<100k': number;
        };
        periodTimeframes: {
            date: string;
            realized: number;
        }[];
        stat: {
            nativeBalance: {
                symbol: string;
                name: string;
                address: string;
                balanceUSD: number;
                chainId: string;
                decimals: number;
                logo: string | null;
                price: number;
                assetId: number | null;
                rawBalance: string;
                formattedBalance: number;
            } | null;
            fundingInfo: {
                date: string | null;
                chainId: string | null;
                amount: string | null;
                from: string | null;
                txHash: string | null;
                fromWalletLogo: string | null;
                fromWalletTag: string | null;
            };
            totalValue: number;
            periodTotalPnlUSD: number;
            periodRealizedPnlUSD: number;
            periodRealizedRate: number;
            periodActiveTokensCount: number;
            periodWinCount: number;
            periodVolumeBuy: number;
            periodVolumeSell: number;
            periodBuys: number;
            periodSells: number;
            periodBuyTokens: number;
            periodSellTokens: number;
            periodTradingTokens: number;
            holdingTokensCount: number;
            holdingDuration: number;
            tradingTimeFrames: number;
            winRealizedPnl: number;
            winRealizedPnlRate: number;
            winToken: {
                symbol: string;
                name: string;
                address: string;
                chainId: string;
                decimals: number;
                logo: string | null;
            } | null;
        };
    };
}>;
