import { z } from 'zod';
declare const SwapQuotingBatchResultSchema: z.ZodObject<{
    data: z.ZodUnion<[z.ZodObject<{
        amountOutTokens: z.ZodOptional<z.ZodString>;
        slippagePercentage: z.ZodOptional<z.ZodNumber>;
        amountInUSD: z.ZodOptional<z.ZodNumber>;
        amountOutUSD: z.ZodOptional<z.ZodNumber>;
        marketImpactPercentage: z.ZodOptional<z.ZodNumber>;
        poolFeesPercentage: z.ZodOptional<z.ZodNumber>;
        tokenIn: z.ZodOptional<z.ZodObject<{
            address: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodOptional<z.ZodString>;
            decimals: z.ZodNumber;
            logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        }, {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        }>>;
        tokenOut: z.ZodOptional<z.ZodObject<{
            address: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodOptional<z.ZodString>;
            decimals: z.ZodNumber;
            logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        }, {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        }>>;
        requestId: z.ZodString;
        details: z.ZodOptional<z.ZodObject<{
            route: z.ZodOptional<z.ZodObject<{
                hops: z.ZodArray<z.ZodObject<{
                    poolAddress: z.ZodString;
                    tokenIn: z.ZodObject<{
                        address: z.ZodString;
                        name: z.ZodOptional<z.ZodString>;
                        symbol: z.ZodOptional<z.ZodString>;
                        decimals: z.ZodNumber;
                        logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                    }, "strip", z.ZodTypeAny, {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    }, {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    }>;
                    tokenOut: z.ZodObject<{
                        address: z.ZodString;
                        name: z.ZodOptional<z.ZodString>;
                        symbol: z.ZodOptional<z.ZodString>;
                        decimals: z.ZodNumber;
                        logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                    }, "strip", z.ZodTypeAny, {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    }, {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    }>;
                    amountInTokens: z.ZodString;
                    amountOutTokens: z.ZodString;
                    exchange: z.ZodOptional<z.ZodString>;
                    poolType: z.ZodOptional<z.ZodString>;
                    feePercentage: z.ZodOptional<z.ZodNumber>;
                    feeBps: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }, {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }>, "many">;
                totalFeePercentage: z.ZodOptional<z.ZodNumber>;
                aggregator: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                hops: {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }[];
                totalFeePercentage?: number | undefined;
                aggregator?: string | undefined;
            }, {
                hops: {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }[];
                totalFeePercentage?: number | undefined;
                aggregator?: string | undefined;
            }>>;
            aggregator: z.ZodOptional<z.ZodString>;
            raw: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            raw?: Record<string, unknown> | undefined;
            aggregator?: string | undefined;
            route?: {
                hops: {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }[];
                totalFeePercentage?: number | undefined;
                aggregator?: string | undefined;
            } | undefined;
        }, {
            raw?: Record<string, unknown> | undefined;
            aggregator?: string | undefined;
            route?: {
                hops: {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }[];
                totalFeePercentage?: number | undefined;
                aggregator?: string | undefined;
            } | undefined;
        }>>;
        fee: z.ZodOptional<z.ZodObject<{
            amount: z.ZodString;
            percentage: z.ZodNumber;
            wallet: z.ZodString;
            deductedFrom: z.ZodEnum<["input", "output"]>;
        }, "strip", z.ZodTypeAny, {
            amount: string;
            percentage: number;
            wallet: string;
            deductedFrom: "input" | "output";
        }, {
            amount: string;
            percentage: number;
            wallet: string;
            deductedFrom: "input" | "output";
        }>>;
    } & {
        solana: z.ZodObject<{
            transaction: z.ZodObject<{
                serialized: z.ZodString;
                variant: z.ZodEnum<["legacy", "versioned"]>;
            }, "strip", z.ZodTypeAny, {
                serialized: string;
                variant: "legacy" | "versioned";
            }, {
                serialized: string;
                variant: "legacy" | "versioned";
            }>;
            lastValidBlockHeight: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            transaction: {
                serialized: string;
                variant: "legacy" | "versioned";
            };
            lastValidBlockHeight: number;
        }, {
            transaction: {
                serialized: string;
                variant: "legacy" | "versioned";
            };
            lastValidBlockHeight: number;
        }>;
        evm: z.ZodOptional<z.ZodNever>;
    }, "strip", z.ZodTypeAny, {
        requestId: string;
        solana: {
            transaction: {
                serialized: string;
                variant: "legacy" | "versioned";
            };
            lastValidBlockHeight: number;
        };
        fee?: {
            amount: string;
            percentage: number;
            wallet: string;
            deductedFrom: "input" | "output";
        } | undefined;
        details?: {
            raw?: Record<string, unknown> | undefined;
            aggregator?: string | undefined;
            route?: {
                hops: {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }[];
                totalFeePercentage?: number | undefined;
                aggregator?: string | undefined;
            } | undefined;
        } | undefined;
        tokenIn?: {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        } | undefined;
        tokenOut?: {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        } | undefined;
        amountOutTokens?: string | undefined;
        slippagePercentage?: number | undefined;
        amountInUSD?: number | undefined;
        amountOutUSD?: number | undefined;
        marketImpactPercentage?: number | undefined;
        poolFeesPercentage?: number | undefined;
        evm?: undefined;
    }, {
        requestId: string;
        solana: {
            transaction: {
                serialized: string;
                variant: "legacy" | "versioned";
            };
            lastValidBlockHeight: number;
        };
        fee?: {
            amount: string;
            percentage: number;
            wallet: string;
            deductedFrom: "input" | "output";
        } | undefined;
        details?: {
            raw?: Record<string, unknown> | undefined;
            aggregator?: string | undefined;
            route?: {
                hops: {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }[];
                totalFeePercentage?: number | undefined;
                aggregator?: string | undefined;
            } | undefined;
        } | undefined;
        tokenIn?: {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        } | undefined;
        tokenOut?: {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        } | undefined;
        amountOutTokens?: string | undefined;
        slippagePercentage?: number | undefined;
        amountInUSD?: number | undefined;
        amountOutUSD?: number | undefined;
        marketImpactPercentage?: number | undefined;
        poolFeesPercentage?: number | undefined;
        evm?: undefined;
    }>, z.ZodObject<{
        amountOutTokens: z.ZodOptional<z.ZodString>;
        slippagePercentage: z.ZodOptional<z.ZodNumber>;
        amountInUSD: z.ZodOptional<z.ZodNumber>;
        amountOutUSD: z.ZodOptional<z.ZodNumber>;
        marketImpactPercentage: z.ZodOptional<z.ZodNumber>;
        poolFeesPercentage: z.ZodOptional<z.ZodNumber>;
        tokenIn: z.ZodOptional<z.ZodObject<{
            address: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodOptional<z.ZodString>;
            decimals: z.ZodNumber;
            logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        }, {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        }>>;
        tokenOut: z.ZodOptional<z.ZodObject<{
            address: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodOptional<z.ZodString>;
            decimals: z.ZodNumber;
            logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        }, {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        }>>;
        requestId: z.ZodString;
        details: z.ZodOptional<z.ZodObject<{
            route: z.ZodOptional<z.ZodObject<{
                hops: z.ZodArray<z.ZodObject<{
                    poolAddress: z.ZodString;
                    tokenIn: z.ZodObject<{
                        address: z.ZodString;
                        name: z.ZodOptional<z.ZodString>;
                        symbol: z.ZodOptional<z.ZodString>;
                        decimals: z.ZodNumber;
                        logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                    }, "strip", z.ZodTypeAny, {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    }, {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    }>;
                    tokenOut: z.ZodObject<{
                        address: z.ZodString;
                        name: z.ZodOptional<z.ZodString>;
                        symbol: z.ZodOptional<z.ZodString>;
                        decimals: z.ZodNumber;
                        logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                    }, "strip", z.ZodTypeAny, {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    }, {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    }>;
                    amountInTokens: z.ZodString;
                    amountOutTokens: z.ZodString;
                    exchange: z.ZodOptional<z.ZodString>;
                    poolType: z.ZodOptional<z.ZodString>;
                    feePercentage: z.ZodOptional<z.ZodNumber>;
                    feeBps: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }, {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }>, "many">;
                totalFeePercentage: z.ZodOptional<z.ZodNumber>;
                aggregator: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                hops: {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }[];
                totalFeePercentage?: number | undefined;
                aggregator?: string | undefined;
            }, {
                hops: {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }[];
                totalFeePercentage?: number | undefined;
                aggregator?: string | undefined;
            }>>;
            aggregator: z.ZodOptional<z.ZodString>;
            raw: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            raw?: Record<string, unknown> | undefined;
            aggregator?: string | undefined;
            route?: {
                hops: {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }[];
                totalFeePercentage?: number | undefined;
                aggregator?: string | undefined;
            } | undefined;
        }, {
            raw?: Record<string, unknown> | undefined;
            aggregator?: string | undefined;
            route?: {
                hops: {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }[];
                totalFeePercentage?: number | undefined;
                aggregator?: string | undefined;
            } | undefined;
        }>>;
        fee: z.ZodOptional<z.ZodObject<{
            amount: z.ZodString;
            percentage: z.ZodNumber;
            wallet: z.ZodString;
            deductedFrom: z.ZodEnum<["input", "output"]>;
        }, "strip", z.ZodTypeAny, {
            amount: string;
            percentage: number;
            wallet: string;
            deductedFrom: "input" | "output";
        }, {
            amount: string;
            percentage: number;
            wallet: string;
            deductedFrom: "input" | "output";
        }>>;
    } & {
        evm: z.ZodObject<{
            transaction: z.ZodObject<{
                to: z.ZodString;
                from: z.ZodString;
                data: z.ZodString;
                value: z.ZodString;
                gasLimit: z.ZodOptional<z.ZodString>;
                gasPrice: z.ZodOptional<z.ZodString>;
                maxFeePerGas: z.ZodOptional<z.ZodString>;
                maxPriorityFeePerGas: z.ZodOptional<z.ZodString>;
                nonce: z.ZodOptional<z.ZodNumber>;
                chainId: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                value: string;
                chainId: number;
                data: string;
                from: string;
                to: string;
                gasLimit?: string | undefined;
                gasPrice?: string | undefined;
                maxFeePerGas?: string | undefined;
                maxPriorityFeePerGas?: string | undefined;
                nonce?: number | undefined;
            }, {
                value: string;
                chainId: number;
                data: string;
                from: string;
                to: string;
                gasLimit?: string | undefined;
                gasPrice?: string | undefined;
                maxFeePerGas?: string | undefined;
                maxPriorityFeePerGas?: string | undefined;
                nonce?: number | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            transaction: {
                value: string;
                chainId: number;
                data: string;
                from: string;
                to: string;
                gasLimit?: string | undefined;
                gasPrice?: string | undefined;
                maxFeePerGas?: string | undefined;
                maxPriorityFeePerGas?: string | undefined;
                nonce?: number | undefined;
            };
        }, {
            transaction: {
                value: string;
                chainId: number;
                data: string;
                from: string;
                to: string;
                gasLimit?: string | undefined;
                gasPrice?: string | undefined;
                maxFeePerGas?: string | undefined;
                maxPriorityFeePerGas?: string | undefined;
                nonce?: number | undefined;
            };
        }>;
        solana: z.ZodOptional<z.ZodNever>;
    }, "strip", z.ZodTypeAny, {
        requestId: string;
        evm: {
            transaction: {
                value: string;
                chainId: number;
                data: string;
                from: string;
                to: string;
                gasLimit?: string | undefined;
                gasPrice?: string | undefined;
                maxFeePerGas?: string | undefined;
                maxPriorityFeePerGas?: string | undefined;
                nonce?: number | undefined;
            };
        };
        fee?: {
            amount: string;
            percentage: number;
            wallet: string;
            deductedFrom: "input" | "output";
        } | undefined;
        details?: {
            raw?: Record<string, unknown> | undefined;
            aggregator?: string | undefined;
            route?: {
                hops: {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }[];
                totalFeePercentage?: number | undefined;
                aggregator?: string | undefined;
            } | undefined;
        } | undefined;
        tokenIn?: {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        } | undefined;
        tokenOut?: {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        } | undefined;
        amountOutTokens?: string | undefined;
        slippagePercentage?: number | undefined;
        amountInUSD?: number | undefined;
        amountOutUSD?: number | undefined;
        marketImpactPercentage?: number | undefined;
        poolFeesPercentage?: number | undefined;
        solana?: undefined;
    }, {
        requestId: string;
        evm: {
            transaction: {
                value: string;
                chainId: number;
                data: string;
                from: string;
                to: string;
                gasLimit?: string | undefined;
                gasPrice?: string | undefined;
                maxFeePerGas?: string | undefined;
                maxPriorityFeePerGas?: string | undefined;
                nonce?: number | undefined;
            };
        };
        fee?: {
            amount: string;
            percentage: number;
            wallet: string;
            deductedFrom: "input" | "output";
        } | undefined;
        details?: {
            raw?: Record<string, unknown> | undefined;
            aggregator?: string | undefined;
            route?: {
                hops: {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }[];
                totalFeePercentage?: number | undefined;
                aggregator?: string | undefined;
            } | undefined;
        } | undefined;
        tokenIn?: {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        } | undefined;
        tokenOut?: {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        } | undefined;
        amountOutTokens?: string | undefined;
        slippagePercentage?: number | undefined;
        amountInUSD?: number | undefined;
        amountOutUSD?: number | undefined;
        marketImpactPercentage?: number | undefined;
        poolFeesPercentage?: number | undefined;
        solana?: undefined;
    }>, z.ZodObject<{
        amountOutTokens: z.ZodOptional<z.ZodString>;
        slippagePercentage: z.ZodOptional<z.ZodNumber>;
        amountInUSD: z.ZodOptional<z.ZodNumber>;
        amountOutUSD: z.ZodOptional<z.ZodNumber>;
        marketImpactPercentage: z.ZodOptional<z.ZodNumber>;
        poolFeesPercentage: z.ZodOptional<z.ZodNumber>;
        tokenIn: z.ZodOptional<z.ZodObject<{
            address: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodOptional<z.ZodString>;
            decimals: z.ZodNumber;
            logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        }, {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        }>>;
        tokenOut: z.ZodOptional<z.ZodObject<{
            address: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodOptional<z.ZodString>;
            decimals: z.ZodNumber;
            logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        }, {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        }>>;
        requestId: z.ZodString;
        details: z.ZodOptional<z.ZodObject<{
            route: z.ZodOptional<z.ZodObject<{
                hops: z.ZodArray<z.ZodObject<{
                    poolAddress: z.ZodString;
                    tokenIn: z.ZodObject<{
                        address: z.ZodString;
                        name: z.ZodOptional<z.ZodString>;
                        symbol: z.ZodOptional<z.ZodString>;
                        decimals: z.ZodNumber;
                        logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                    }, "strip", z.ZodTypeAny, {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    }, {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    }>;
                    tokenOut: z.ZodObject<{
                        address: z.ZodString;
                        name: z.ZodOptional<z.ZodString>;
                        symbol: z.ZodOptional<z.ZodString>;
                        decimals: z.ZodNumber;
                        logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                    }, "strip", z.ZodTypeAny, {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    }, {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    }>;
                    amountInTokens: z.ZodString;
                    amountOutTokens: z.ZodString;
                    exchange: z.ZodOptional<z.ZodString>;
                    poolType: z.ZodOptional<z.ZodString>;
                    feePercentage: z.ZodOptional<z.ZodNumber>;
                    feeBps: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }, {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }>, "many">;
                totalFeePercentage: z.ZodOptional<z.ZodNumber>;
                aggregator: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                hops: {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }[];
                totalFeePercentage?: number | undefined;
                aggregator?: string | undefined;
            }, {
                hops: {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }[];
                totalFeePercentage?: number | undefined;
                aggregator?: string | undefined;
            }>>;
            aggregator: z.ZodOptional<z.ZodString>;
            raw: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            raw?: Record<string, unknown> | undefined;
            aggregator?: string | undefined;
            route?: {
                hops: {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }[];
                totalFeePercentage?: number | undefined;
                aggregator?: string | undefined;
            } | undefined;
        }, {
            raw?: Record<string, unknown> | undefined;
            aggregator?: string | undefined;
            route?: {
                hops: {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }[];
                totalFeePercentage?: number | undefined;
                aggregator?: string | undefined;
            } | undefined;
        }>>;
        fee: z.ZodOptional<z.ZodObject<{
            amount: z.ZodString;
            percentage: z.ZodNumber;
            wallet: z.ZodString;
            deductedFrom: z.ZodEnum<["input", "output"]>;
        }, "strip", z.ZodTypeAny, {
            amount: string;
            percentage: number;
            wallet: string;
            deductedFrom: "input" | "output";
        }, {
            amount: string;
            percentage: number;
            wallet: string;
            deductedFrom: "input" | "output";
        }>>;
    } & {
        solana: z.ZodOptional<z.ZodNever>;
        evm: z.ZodOptional<z.ZodNever>;
    }, "strip", z.ZodTypeAny, {
        requestId: string;
        fee?: {
            amount: string;
            percentage: number;
            wallet: string;
            deductedFrom: "input" | "output";
        } | undefined;
        details?: {
            raw?: Record<string, unknown> | undefined;
            aggregator?: string | undefined;
            route?: {
                hops: {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }[];
                totalFeePercentage?: number | undefined;
                aggregator?: string | undefined;
            } | undefined;
        } | undefined;
        tokenIn?: {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        } | undefined;
        tokenOut?: {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        } | undefined;
        amountOutTokens?: string | undefined;
        slippagePercentage?: number | undefined;
        amountInUSD?: number | undefined;
        amountOutUSD?: number | undefined;
        marketImpactPercentage?: number | undefined;
        poolFeesPercentage?: number | undefined;
        solana?: undefined;
        evm?: undefined;
    }, {
        requestId: string;
        fee?: {
            amount: string;
            percentage: number;
            wallet: string;
            deductedFrom: "input" | "output";
        } | undefined;
        details?: {
            raw?: Record<string, unknown> | undefined;
            aggregator?: string | undefined;
            route?: {
                hops: {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }[];
                totalFeePercentage?: number | undefined;
                aggregator?: string | undefined;
            } | undefined;
        } | undefined;
        tokenIn?: {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        } | undefined;
        tokenOut?: {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        } | undefined;
        amountOutTokens?: string | undefined;
        slippagePercentage?: number | undefined;
        amountInUSD?: number | undefined;
        amountOutUSD?: number | undefined;
        marketImpactPercentage?: number | undefined;
        poolFeesPercentage?: number | undefined;
        solana?: undefined;
        evm?: undefined;
    }>]>;
    error: z.ZodOptional<z.ZodString>;
    index: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    data: {
        requestId: string;
        solana: {
            transaction: {
                serialized: string;
                variant: "legacy" | "versioned";
            };
            lastValidBlockHeight: number;
        };
        fee?: {
            amount: string;
            percentage: number;
            wallet: string;
            deductedFrom: "input" | "output";
        } | undefined;
        details?: {
            raw?: Record<string, unknown> | undefined;
            aggregator?: string | undefined;
            route?: {
                hops: {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }[];
                totalFeePercentage?: number | undefined;
                aggregator?: string | undefined;
            } | undefined;
        } | undefined;
        tokenIn?: {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        } | undefined;
        tokenOut?: {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        } | undefined;
        amountOutTokens?: string | undefined;
        slippagePercentage?: number | undefined;
        amountInUSD?: number | undefined;
        amountOutUSD?: number | undefined;
        marketImpactPercentage?: number | undefined;
        poolFeesPercentage?: number | undefined;
        evm?: undefined;
    } | {
        requestId: string;
        evm: {
            transaction: {
                value: string;
                chainId: number;
                data: string;
                from: string;
                to: string;
                gasLimit?: string | undefined;
                gasPrice?: string | undefined;
                maxFeePerGas?: string | undefined;
                maxPriorityFeePerGas?: string | undefined;
                nonce?: number | undefined;
            };
        };
        fee?: {
            amount: string;
            percentage: number;
            wallet: string;
            deductedFrom: "input" | "output";
        } | undefined;
        details?: {
            raw?: Record<string, unknown> | undefined;
            aggregator?: string | undefined;
            route?: {
                hops: {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }[];
                totalFeePercentage?: number | undefined;
                aggregator?: string | undefined;
            } | undefined;
        } | undefined;
        tokenIn?: {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        } | undefined;
        tokenOut?: {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        } | undefined;
        amountOutTokens?: string | undefined;
        slippagePercentage?: number | undefined;
        amountInUSD?: number | undefined;
        amountOutUSD?: number | undefined;
        marketImpactPercentage?: number | undefined;
        poolFeesPercentage?: number | undefined;
        solana?: undefined;
    } | {
        requestId: string;
        fee?: {
            amount: string;
            percentage: number;
            wallet: string;
            deductedFrom: "input" | "output";
        } | undefined;
        details?: {
            raw?: Record<string, unknown> | undefined;
            aggregator?: string | undefined;
            route?: {
                hops: {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }[];
                totalFeePercentage?: number | undefined;
                aggregator?: string | undefined;
            } | undefined;
        } | undefined;
        tokenIn?: {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        } | undefined;
        tokenOut?: {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        } | undefined;
        amountOutTokens?: string | undefined;
        slippagePercentage?: number | undefined;
        amountInUSD?: number | undefined;
        amountOutUSD?: number | undefined;
        marketImpactPercentage?: number | undefined;
        poolFeesPercentage?: number | undefined;
        solana?: undefined;
        evm?: undefined;
    };
    index: number;
    error?: string | undefined;
}, {
    data: {
        requestId: string;
        solana: {
            transaction: {
                serialized: string;
                variant: "legacy" | "versioned";
            };
            lastValidBlockHeight: number;
        };
        fee?: {
            amount: string;
            percentage: number;
            wallet: string;
            deductedFrom: "input" | "output";
        } | undefined;
        details?: {
            raw?: Record<string, unknown> | undefined;
            aggregator?: string | undefined;
            route?: {
                hops: {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }[];
                totalFeePercentage?: number | undefined;
                aggregator?: string | undefined;
            } | undefined;
        } | undefined;
        tokenIn?: {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        } | undefined;
        tokenOut?: {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        } | undefined;
        amountOutTokens?: string | undefined;
        slippagePercentage?: number | undefined;
        amountInUSD?: number | undefined;
        amountOutUSD?: number | undefined;
        marketImpactPercentage?: number | undefined;
        poolFeesPercentage?: number | undefined;
        evm?: undefined;
    } | {
        requestId: string;
        evm: {
            transaction: {
                value: string;
                chainId: number;
                data: string;
                from: string;
                to: string;
                gasLimit?: string | undefined;
                gasPrice?: string | undefined;
                maxFeePerGas?: string | undefined;
                maxPriorityFeePerGas?: string | undefined;
                nonce?: number | undefined;
            };
        };
        fee?: {
            amount: string;
            percentage: number;
            wallet: string;
            deductedFrom: "input" | "output";
        } | undefined;
        details?: {
            raw?: Record<string, unknown> | undefined;
            aggregator?: string | undefined;
            route?: {
                hops: {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }[];
                totalFeePercentage?: number | undefined;
                aggregator?: string | undefined;
            } | undefined;
        } | undefined;
        tokenIn?: {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        } | undefined;
        tokenOut?: {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        } | undefined;
        amountOutTokens?: string | undefined;
        slippagePercentage?: number | undefined;
        amountInUSD?: number | undefined;
        amountOutUSD?: number | undefined;
        marketImpactPercentage?: number | undefined;
        poolFeesPercentage?: number | undefined;
        solana?: undefined;
    } | {
        requestId: string;
        fee?: {
            amount: string;
            percentage: number;
            wallet: string;
            deductedFrom: "input" | "output";
        } | undefined;
        details?: {
            raw?: Record<string, unknown> | undefined;
            aggregator?: string | undefined;
            route?: {
                hops: {
                    poolAddress: string;
                    tokenIn: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    tokenOut: {
                        address: string;
                        decimals: number;
                        symbol?: string | undefined;
                        name?: string | undefined;
                        logo?: string | null | undefined;
                    };
                    amountInTokens: string;
                    amountOutTokens: string;
                    exchange?: string | undefined;
                    poolType?: string | undefined;
                    feePercentage?: number | undefined;
                    feeBps?: number | undefined;
                }[];
                totalFeePercentage?: number | undefined;
                aggregator?: string | undefined;
            } | undefined;
        } | undefined;
        tokenIn?: {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        } | undefined;
        tokenOut?: {
            address: string;
            decimals: number;
            symbol?: string | undefined;
            name?: string | undefined;
            logo?: string | null | undefined;
        } | undefined;
        amountOutTokens?: string | undefined;
        slippagePercentage?: number | undefined;
        amountInUSD?: number | undefined;
        amountOutUSD?: number | undefined;
        marketImpactPercentage?: number | undefined;
        poolFeesPercentage?: number | undefined;
        solana?: undefined;
        evm?: undefined;
    };
    index: number;
    error?: string | undefined;
}>;
export declare const SwapQuotingBatchOutputSchema: z.ZodObject<{
    results: z.ZodArray<z.ZodObject<{
        data: z.ZodUnion<[z.ZodObject<{
            amountOutTokens: z.ZodOptional<z.ZodString>;
            slippagePercentage: z.ZodOptional<z.ZodNumber>;
            amountInUSD: z.ZodOptional<z.ZodNumber>;
            amountOutUSD: z.ZodOptional<z.ZodNumber>;
            marketImpactPercentage: z.ZodOptional<z.ZodNumber>;
            poolFeesPercentage: z.ZodOptional<z.ZodNumber>;
            tokenIn: z.ZodOptional<z.ZodObject<{
                address: z.ZodString;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodOptional<z.ZodString>;
                decimals: z.ZodNumber;
                logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            }, {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            }>>;
            tokenOut: z.ZodOptional<z.ZodObject<{
                address: z.ZodString;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodOptional<z.ZodString>;
                decimals: z.ZodNumber;
                logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            }, {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            }>>;
            requestId: z.ZodString;
            details: z.ZodOptional<z.ZodObject<{
                route: z.ZodOptional<z.ZodObject<{
                    hops: z.ZodArray<z.ZodObject<{
                        poolAddress: z.ZodString;
                        tokenIn: z.ZodObject<{
                            address: z.ZodString;
                            name: z.ZodOptional<z.ZodString>;
                            symbol: z.ZodOptional<z.ZodString>;
                            decimals: z.ZodNumber;
                            logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        }, "strip", z.ZodTypeAny, {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        }, {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        }>;
                        tokenOut: z.ZodObject<{
                            address: z.ZodString;
                            name: z.ZodOptional<z.ZodString>;
                            symbol: z.ZodOptional<z.ZodString>;
                            decimals: z.ZodNumber;
                            logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        }, "strip", z.ZodTypeAny, {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        }, {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        }>;
                        amountInTokens: z.ZodString;
                        amountOutTokens: z.ZodString;
                        exchange: z.ZodOptional<z.ZodString>;
                        poolType: z.ZodOptional<z.ZodString>;
                        feePercentage: z.ZodOptional<z.ZodNumber>;
                        feeBps: z.ZodOptional<z.ZodNumber>;
                    }, "strip", z.ZodTypeAny, {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }, {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }>, "many">;
                    totalFeePercentage: z.ZodOptional<z.ZodNumber>;
                    aggregator: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                }, {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                }>>;
                aggregator: z.ZodOptional<z.ZodString>;
                raw: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                raw?: Record<string, unknown> | undefined;
                aggregator?: string | undefined;
                route?: {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                } | undefined;
            }, {
                raw?: Record<string, unknown> | undefined;
                aggregator?: string | undefined;
                route?: {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                } | undefined;
            }>>;
            fee: z.ZodOptional<z.ZodObject<{
                amount: z.ZodString;
                percentage: z.ZodNumber;
                wallet: z.ZodString;
                deductedFrom: z.ZodEnum<["input", "output"]>;
            }, "strip", z.ZodTypeAny, {
                amount: string;
                percentage: number;
                wallet: string;
                deductedFrom: "input" | "output";
            }, {
                amount: string;
                percentage: number;
                wallet: string;
                deductedFrom: "input" | "output";
            }>>;
        } & {
            solana: z.ZodObject<{
                transaction: z.ZodObject<{
                    serialized: z.ZodString;
                    variant: z.ZodEnum<["legacy", "versioned"]>;
                }, "strip", z.ZodTypeAny, {
                    serialized: string;
                    variant: "legacy" | "versioned";
                }, {
                    serialized: string;
                    variant: "legacy" | "versioned";
                }>;
                lastValidBlockHeight: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                transaction: {
                    serialized: string;
                    variant: "legacy" | "versioned";
                };
                lastValidBlockHeight: number;
            }, {
                transaction: {
                    serialized: string;
                    variant: "legacy" | "versioned";
                };
                lastValidBlockHeight: number;
            }>;
            evm: z.ZodOptional<z.ZodNever>;
        }, "strip", z.ZodTypeAny, {
            requestId: string;
            solana: {
                transaction: {
                    serialized: string;
                    variant: "legacy" | "versioned";
                };
                lastValidBlockHeight: number;
            };
            fee?: {
                amount: string;
                percentage: number;
                wallet: string;
                deductedFrom: "input" | "output";
            } | undefined;
            details?: {
                raw?: Record<string, unknown> | undefined;
                aggregator?: string | undefined;
                route?: {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                } | undefined;
            } | undefined;
            tokenIn?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            tokenOut?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            amountOutTokens?: string | undefined;
            slippagePercentage?: number | undefined;
            amountInUSD?: number | undefined;
            amountOutUSD?: number | undefined;
            marketImpactPercentage?: number | undefined;
            poolFeesPercentage?: number | undefined;
            evm?: undefined;
        }, {
            requestId: string;
            solana: {
                transaction: {
                    serialized: string;
                    variant: "legacy" | "versioned";
                };
                lastValidBlockHeight: number;
            };
            fee?: {
                amount: string;
                percentage: number;
                wallet: string;
                deductedFrom: "input" | "output";
            } | undefined;
            details?: {
                raw?: Record<string, unknown> | undefined;
                aggregator?: string | undefined;
                route?: {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                } | undefined;
            } | undefined;
            tokenIn?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            tokenOut?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            amountOutTokens?: string | undefined;
            slippagePercentage?: number | undefined;
            amountInUSD?: number | undefined;
            amountOutUSD?: number | undefined;
            marketImpactPercentage?: number | undefined;
            poolFeesPercentage?: number | undefined;
            evm?: undefined;
        }>, z.ZodObject<{
            amountOutTokens: z.ZodOptional<z.ZodString>;
            slippagePercentage: z.ZodOptional<z.ZodNumber>;
            amountInUSD: z.ZodOptional<z.ZodNumber>;
            amountOutUSD: z.ZodOptional<z.ZodNumber>;
            marketImpactPercentage: z.ZodOptional<z.ZodNumber>;
            poolFeesPercentage: z.ZodOptional<z.ZodNumber>;
            tokenIn: z.ZodOptional<z.ZodObject<{
                address: z.ZodString;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodOptional<z.ZodString>;
                decimals: z.ZodNumber;
                logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            }, {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            }>>;
            tokenOut: z.ZodOptional<z.ZodObject<{
                address: z.ZodString;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodOptional<z.ZodString>;
                decimals: z.ZodNumber;
                logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            }, {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            }>>;
            requestId: z.ZodString;
            details: z.ZodOptional<z.ZodObject<{
                route: z.ZodOptional<z.ZodObject<{
                    hops: z.ZodArray<z.ZodObject<{
                        poolAddress: z.ZodString;
                        tokenIn: z.ZodObject<{
                            address: z.ZodString;
                            name: z.ZodOptional<z.ZodString>;
                            symbol: z.ZodOptional<z.ZodString>;
                            decimals: z.ZodNumber;
                            logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        }, "strip", z.ZodTypeAny, {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        }, {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        }>;
                        tokenOut: z.ZodObject<{
                            address: z.ZodString;
                            name: z.ZodOptional<z.ZodString>;
                            symbol: z.ZodOptional<z.ZodString>;
                            decimals: z.ZodNumber;
                            logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        }, "strip", z.ZodTypeAny, {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        }, {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        }>;
                        amountInTokens: z.ZodString;
                        amountOutTokens: z.ZodString;
                        exchange: z.ZodOptional<z.ZodString>;
                        poolType: z.ZodOptional<z.ZodString>;
                        feePercentage: z.ZodOptional<z.ZodNumber>;
                        feeBps: z.ZodOptional<z.ZodNumber>;
                    }, "strip", z.ZodTypeAny, {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }, {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }>, "many">;
                    totalFeePercentage: z.ZodOptional<z.ZodNumber>;
                    aggregator: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                }, {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                }>>;
                aggregator: z.ZodOptional<z.ZodString>;
                raw: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                raw?: Record<string, unknown> | undefined;
                aggregator?: string | undefined;
                route?: {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                } | undefined;
            }, {
                raw?: Record<string, unknown> | undefined;
                aggregator?: string | undefined;
                route?: {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                } | undefined;
            }>>;
            fee: z.ZodOptional<z.ZodObject<{
                amount: z.ZodString;
                percentage: z.ZodNumber;
                wallet: z.ZodString;
                deductedFrom: z.ZodEnum<["input", "output"]>;
            }, "strip", z.ZodTypeAny, {
                amount: string;
                percentage: number;
                wallet: string;
                deductedFrom: "input" | "output";
            }, {
                amount: string;
                percentage: number;
                wallet: string;
                deductedFrom: "input" | "output";
            }>>;
        } & {
            evm: z.ZodObject<{
                transaction: z.ZodObject<{
                    to: z.ZodString;
                    from: z.ZodString;
                    data: z.ZodString;
                    value: z.ZodString;
                    gasLimit: z.ZodOptional<z.ZodString>;
                    gasPrice: z.ZodOptional<z.ZodString>;
                    maxFeePerGas: z.ZodOptional<z.ZodString>;
                    maxPriorityFeePerGas: z.ZodOptional<z.ZodString>;
                    nonce: z.ZodOptional<z.ZodNumber>;
                    chainId: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    value: string;
                    chainId: number;
                    data: string;
                    from: string;
                    to: string;
                    gasLimit?: string | undefined;
                    gasPrice?: string | undefined;
                    maxFeePerGas?: string | undefined;
                    maxPriorityFeePerGas?: string | undefined;
                    nonce?: number | undefined;
                }, {
                    value: string;
                    chainId: number;
                    data: string;
                    from: string;
                    to: string;
                    gasLimit?: string | undefined;
                    gasPrice?: string | undefined;
                    maxFeePerGas?: string | undefined;
                    maxPriorityFeePerGas?: string | undefined;
                    nonce?: number | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                transaction: {
                    value: string;
                    chainId: number;
                    data: string;
                    from: string;
                    to: string;
                    gasLimit?: string | undefined;
                    gasPrice?: string | undefined;
                    maxFeePerGas?: string | undefined;
                    maxPriorityFeePerGas?: string | undefined;
                    nonce?: number | undefined;
                };
            }, {
                transaction: {
                    value: string;
                    chainId: number;
                    data: string;
                    from: string;
                    to: string;
                    gasLimit?: string | undefined;
                    gasPrice?: string | undefined;
                    maxFeePerGas?: string | undefined;
                    maxPriorityFeePerGas?: string | undefined;
                    nonce?: number | undefined;
                };
            }>;
            solana: z.ZodOptional<z.ZodNever>;
        }, "strip", z.ZodTypeAny, {
            requestId: string;
            evm: {
                transaction: {
                    value: string;
                    chainId: number;
                    data: string;
                    from: string;
                    to: string;
                    gasLimit?: string | undefined;
                    gasPrice?: string | undefined;
                    maxFeePerGas?: string | undefined;
                    maxPriorityFeePerGas?: string | undefined;
                    nonce?: number | undefined;
                };
            };
            fee?: {
                amount: string;
                percentage: number;
                wallet: string;
                deductedFrom: "input" | "output";
            } | undefined;
            details?: {
                raw?: Record<string, unknown> | undefined;
                aggregator?: string | undefined;
                route?: {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                } | undefined;
            } | undefined;
            tokenIn?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            tokenOut?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            amountOutTokens?: string | undefined;
            slippagePercentage?: number | undefined;
            amountInUSD?: number | undefined;
            amountOutUSD?: number | undefined;
            marketImpactPercentage?: number | undefined;
            poolFeesPercentage?: number | undefined;
            solana?: undefined;
        }, {
            requestId: string;
            evm: {
                transaction: {
                    value: string;
                    chainId: number;
                    data: string;
                    from: string;
                    to: string;
                    gasLimit?: string | undefined;
                    gasPrice?: string | undefined;
                    maxFeePerGas?: string | undefined;
                    maxPriorityFeePerGas?: string | undefined;
                    nonce?: number | undefined;
                };
            };
            fee?: {
                amount: string;
                percentage: number;
                wallet: string;
                deductedFrom: "input" | "output";
            } | undefined;
            details?: {
                raw?: Record<string, unknown> | undefined;
                aggregator?: string | undefined;
                route?: {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                } | undefined;
            } | undefined;
            tokenIn?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            tokenOut?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            amountOutTokens?: string | undefined;
            slippagePercentage?: number | undefined;
            amountInUSD?: number | undefined;
            amountOutUSD?: number | undefined;
            marketImpactPercentage?: number | undefined;
            poolFeesPercentage?: number | undefined;
            solana?: undefined;
        }>, z.ZodObject<{
            amountOutTokens: z.ZodOptional<z.ZodString>;
            slippagePercentage: z.ZodOptional<z.ZodNumber>;
            amountInUSD: z.ZodOptional<z.ZodNumber>;
            amountOutUSD: z.ZodOptional<z.ZodNumber>;
            marketImpactPercentage: z.ZodOptional<z.ZodNumber>;
            poolFeesPercentage: z.ZodOptional<z.ZodNumber>;
            tokenIn: z.ZodOptional<z.ZodObject<{
                address: z.ZodString;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodOptional<z.ZodString>;
                decimals: z.ZodNumber;
                logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            }, {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            }>>;
            tokenOut: z.ZodOptional<z.ZodObject<{
                address: z.ZodString;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodOptional<z.ZodString>;
                decimals: z.ZodNumber;
                logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            }, {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            }>>;
            requestId: z.ZodString;
            details: z.ZodOptional<z.ZodObject<{
                route: z.ZodOptional<z.ZodObject<{
                    hops: z.ZodArray<z.ZodObject<{
                        poolAddress: z.ZodString;
                        tokenIn: z.ZodObject<{
                            address: z.ZodString;
                            name: z.ZodOptional<z.ZodString>;
                            symbol: z.ZodOptional<z.ZodString>;
                            decimals: z.ZodNumber;
                            logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        }, "strip", z.ZodTypeAny, {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        }, {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        }>;
                        tokenOut: z.ZodObject<{
                            address: z.ZodString;
                            name: z.ZodOptional<z.ZodString>;
                            symbol: z.ZodOptional<z.ZodString>;
                            decimals: z.ZodNumber;
                            logo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        }, "strip", z.ZodTypeAny, {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        }, {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        }>;
                        amountInTokens: z.ZodString;
                        amountOutTokens: z.ZodString;
                        exchange: z.ZodOptional<z.ZodString>;
                        poolType: z.ZodOptional<z.ZodString>;
                        feePercentage: z.ZodOptional<z.ZodNumber>;
                        feeBps: z.ZodOptional<z.ZodNumber>;
                    }, "strip", z.ZodTypeAny, {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }, {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }>, "many">;
                    totalFeePercentage: z.ZodOptional<z.ZodNumber>;
                    aggregator: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                }, {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                }>>;
                aggregator: z.ZodOptional<z.ZodString>;
                raw: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                raw?: Record<string, unknown> | undefined;
                aggregator?: string | undefined;
                route?: {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                } | undefined;
            }, {
                raw?: Record<string, unknown> | undefined;
                aggregator?: string | undefined;
                route?: {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                } | undefined;
            }>>;
            fee: z.ZodOptional<z.ZodObject<{
                amount: z.ZodString;
                percentage: z.ZodNumber;
                wallet: z.ZodString;
                deductedFrom: z.ZodEnum<["input", "output"]>;
            }, "strip", z.ZodTypeAny, {
                amount: string;
                percentage: number;
                wallet: string;
                deductedFrom: "input" | "output";
            }, {
                amount: string;
                percentage: number;
                wallet: string;
                deductedFrom: "input" | "output";
            }>>;
        } & {
            solana: z.ZodOptional<z.ZodNever>;
            evm: z.ZodOptional<z.ZodNever>;
        }, "strip", z.ZodTypeAny, {
            requestId: string;
            fee?: {
                amount: string;
                percentage: number;
                wallet: string;
                deductedFrom: "input" | "output";
            } | undefined;
            details?: {
                raw?: Record<string, unknown> | undefined;
                aggregator?: string | undefined;
                route?: {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                } | undefined;
            } | undefined;
            tokenIn?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            tokenOut?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            amountOutTokens?: string | undefined;
            slippagePercentage?: number | undefined;
            amountInUSD?: number | undefined;
            amountOutUSD?: number | undefined;
            marketImpactPercentage?: number | undefined;
            poolFeesPercentage?: number | undefined;
            solana?: undefined;
            evm?: undefined;
        }, {
            requestId: string;
            fee?: {
                amount: string;
                percentage: number;
                wallet: string;
                deductedFrom: "input" | "output";
            } | undefined;
            details?: {
                raw?: Record<string, unknown> | undefined;
                aggregator?: string | undefined;
                route?: {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                } | undefined;
            } | undefined;
            tokenIn?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            tokenOut?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            amountOutTokens?: string | undefined;
            slippagePercentage?: number | undefined;
            amountInUSD?: number | undefined;
            amountOutUSD?: number | undefined;
            marketImpactPercentage?: number | undefined;
            poolFeesPercentage?: number | undefined;
            solana?: undefined;
            evm?: undefined;
        }>]>;
        error: z.ZodOptional<z.ZodString>;
        index: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        data: {
            requestId: string;
            solana: {
                transaction: {
                    serialized: string;
                    variant: "legacy" | "versioned";
                };
                lastValidBlockHeight: number;
            };
            fee?: {
                amount: string;
                percentage: number;
                wallet: string;
                deductedFrom: "input" | "output";
            } | undefined;
            details?: {
                raw?: Record<string, unknown> | undefined;
                aggregator?: string | undefined;
                route?: {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                } | undefined;
            } | undefined;
            tokenIn?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            tokenOut?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            amountOutTokens?: string | undefined;
            slippagePercentage?: number | undefined;
            amountInUSD?: number | undefined;
            amountOutUSD?: number | undefined;
            marketImpactPercentage?: number | undefined;
            poolFeesPercentage?: number | undefined;
            evm?: undefined;
        } | {
            requestId: string;
            evm: {
                transaction: {
                    value: string;
                    chainId: number;
                    data: string;
                    from: string;
                    to: string;
                    gasLimit?: string | undefined;
                    gasPrice?: string | undefined;
                    maxFeePerGas?: string | undefined;
                    maxPriorityFeePerGas?: string | undefined;
                    nonce?: number | undefined;
                };
            };
            fee?: {
                amount: string;
                percentage: number;
                wallet: string;
                deductedFrom: "input" | "output";
            } | undefined;
            details?: {
                raw?: Record<string, unknown> | undefined;
                aggregator?: string | undefined;
                route?: {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                } | undefined;
            } | undefined;
            tokenIn?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            tokenOut?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            amountOutTokens?: string | undefined;
            slippagePercentage?: number | undefined;
            amountInUSD?: number | undefined;
            amountOutUSD?: number | undefined;
            marketImpactPercentage?: number | undefined;
            poolFeesPercentage?: number | undefined;
            solana?: undefined;
        } | {
            requestId: string;
            fee?: {
                amount: string;
                percentage: number;
                wallet: string;
                deductedFrom: "input" | "output";
            } | undefined;
            details?: {
                raw?: Record<string, unknown> | undefined;
                aggregator?: string | undefined;
                route?: {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                } | undefined;
            } | undefined;
            tokenIn?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            tokenOut?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            amountOutTokens?: string | undefined;
            slippagePercentage?: number | undefined;
            amountInUSD?: number | undefined;
            amountOutUSD?: number | undefined;
            marketImpactPercentage?: number | undefined;
            poolFeesPercentage?: number | undefined;
            solana?: undefined;
            evm?: undefined;
        };
        index: number;
        error?: string | undefined;
    }, {
        data: {
            requestId: string;
            solana: {
                transaction: {
                    serialized: string;
                    variant: "legacy" | "versioned";
                };
                lastValidBlockHeight: number;
            };
            fee?: {
                amount: string;
                percentage: number;
                wallet: string;
                deductedFrom: "input" | "output";
            } | undefined;
            details?: {
                raw?: Record<string, unknown> | undefined;
                aggregator?: string | undefined;
                route?: {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                } | undefined;
            } | undefined;
            tokenIn?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            tokenOut?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            amountOutTokens?: string | undefined;
            slippagePercentage?: number | undefined;
            amountInUSD?: number | undefined;
            amountOutUSD?: number | undefined;
            marketImpactPercentage?: number | undefined;
            poolFeesPercentage?: number | undefined;
            evm?: undefined;
        } | {
            requestId: string;
            evm: {
                transaction: {
                    value: string;
                    chainId: number;
                    data: string;
                    from: string;
                    to: string;
                    gasLimit?: string | undefined;
                    gasPrice?: string | undefined;
                    maxFeePerGas?: string | undefined;
                    maxPriorityFeePerGas?: string | undefined;
                    nonce?: number | undefined;
                };
            };
            fee?: {
                amount: string;
                percentage: number;
                wallet: string;
                deductedFrom: "input" | "output";
            } | undefined;
            details?: {
                raw?: Record<string, unknown> | undefined;
                aggregator?: string | undefined;
                route?: {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                } | undefined;
            } | undefined;
            tokenIn?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            tokenOut?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            amountOutTokens?: string | undefined;
            slippagePercentage?: number | undefined;
            amountInUSD?: number | undefined;
            amountOutUSD?: number | undefined;
            marketImpactPercentage?: number | undefined;
            poolFeesPercentage?: number | undefined;
            solana?: undefined;
        } | {
            requestId: string;
            fee?: {
                amount: string;
                percentage: number;
                wallet: string;
                deductedFrom: "input" | "output";
            } | undefined;
            details?: {
                raw?: Record<string, unknown> | undefined;
                aggregator?: string | undefined;
                route?: {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                } | undefined;
            } | undefined;
            tokenIn?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            tokenOut?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            amountOutTokens?: string | undefined;
            slippagePercentage?: number | undefined;
            amountInUSD?: number | undefined;
            amountOutUSD?: number | undefined;
            marketImpactPercentage?: number | undefined;
            poolFeesPercentage?: number | undefined;
            solana?: undefined;
            evm?: undefined;
        };
        index: number;
        error?: string | undefined;
    }>, "many">;
    totalRequests: z.ZodNumber;
    successCount: z.ZodNumber;
    errorCount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    results: {
        data: {
            requestId: string;
            solana: {
                transaction: {
                    serialized: string;
                    variant: "legacy" | "versioned";
                };
                lastValidBlockHeight: number;
            };
            fee?: {
                amount: string;
                percentage: number;
                wallet: string;
                deductedFrom: "input" | "output";
            } | undefined;
            details?: {
                raw?: Record<string, unknown> | undefined;
                aggregator?: string | undefined;
                route?: {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                } | undefined;
            } | undefined;
            tokenIn?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            tokenOut?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            amountOutTokens?: string | undefined;
            slippagePercentage?: number | undefined;
            amountInUSD?: number | undefined;
            amountOutUSD?: number | undefined;
            marketImpactPercentage?: number | undefined;
            poolFeesPercentage?: number | undefined;
            evm?: undefined;
        } | {
            requestId: string;
            evm: {
                transaction: {
                    value: string;
                    chainId: number;
                    data: string;
                    from: string;
                    to: string;
                    gasLimit?: string | undefined;
                    gasPrice?: string | undefined;
                    maxFeePerGas?: string | undefined;
                    maxPriorityFeePerGas?: string | undefined;
                    nonce?: number | undefined;
                };
            };
            fee?: {
                amount: string;
                percentage: number;
                wallet: string;
                deductedFrom: "input" | "output";
            } | undefined;
            details?: {
                raw?: Record<string, unknown> | undefined;
                aggregator?: string | undefined;
                route?: {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                } | undefined;
            } | undefined;
            tokenIn?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            tokenOut?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            amountOutTokens?: string | undefined;
            slippagePercentage?: number | undefined;
            amountInUSD?: number | undefined;
            amountOutUSD?: number | undefined;
            marketImpactPercentage?: number | undefined;
            poolFeesPercentage?: number | undefined;
            solana?: undefined;
        } | {
            requestId: string;
            fee?: {
                amount: string;
                percentage: number;
                wallet: string;
                deductedFrom: "input" | "output";
            } | undefined;
            details?: {
                raw?: Record<string, unknown> | undefined;
                aggregator?: string | undefined;
                route?: {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                } | undefined;
            } | undefined;
            tokenIn?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            tokenOut?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            amountOutTokens?: string | undefined;
            slippagePercentage?: number | undefined;
            amountInUSD?: number | undefined;
            amountOutUSD?: number | undefined;
            marketImpactPercentage?: number | undefined;
            poolFeesPercentage?: number | undefined;
            solana?: undefined;
            evm?: undefined;
        };
        index: number;
        error?: string | undefined;
    }[];
    totalRequests: number;
    successCount: number;
    errorCount: number;
}, {
    results: {
        data: {
            requestId: string;
            solana: {
                transaction: {
                    serialized: string;
                    variant: "legacy" | "versioned";
                };
                lastValidBlockHeight: number;
            };
            fee?: {
                amount: string;
                percentage: number;
                wallet: string;
                deductedFrom: "input" | "output";
            } | undefined;
            details?: {
                raw?: Record<string, unknown> | undefined;
                aggregator?: string | undefined;
                route?: {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                } | undefined;
            } | undefined;
            tokenIn?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            tokenOut?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            amountOutTokens?: string | undefined;
            slippagePercentage?: number | undefined;
            amountInUSD?: number | undefined;
            amountOutUSD?: number | undefined;
            marketImpactPercentage?: number | undefined;
            poolFeesPercentage?: number | undefined;
            evm?: undefined;
        } | {
            requestId: string;
            evm: {
                transaction: {
                    value: string;
                    chainId: number;
                    data: string;
                    from: string;
                    to: string;
                    gasLimit?: string | undefined;
                    gasPrice?: string | undefined;
                    maxFeePerGas?: string | undefined;
                    maxPriorityFeePerGas?: string | undefined;
                    nonce?: number | undefined;
                };
            };
            fee?: {
                amount: string;
                percentage: number;
                wallet: string;
                deductedFrom: "input" | "output";
            } | undefined;
            details?: {
                raw?: Record<string, unknown> | undefined;
                aggregator?: string | undefined;
                route?: {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                } | undefined;
            } | undefined;
            tokenIn?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            tokenOut?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            amountOutTokens?: string | undefined;
            slippagePercentage?: number | undefined;
            amountInUSD?: number | undefined;
            amountOutUSD?: number | undefined;
            marketImpactPercentage?: number | undefined;
            poolFeesPercentage?: number | undefined;
            solana?: undefined;
        } | {
            requestId: string;
            fee?: {
                amount: string;
                percentage: number;
                wallet: string;
                deductedFrom: "input" | "output";
            } | undefined;
            details?: {
                raw?: Record<string, unknown> | undefined;
                aggregator?: string | undefined;
                route?: {
                    hops: {
                        poolAddress: string;
                        tokenIn: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        tokenOut: {
                            address: string;
                            decimals: number;
                            symbol?: string | undefined;
                            name?: string | undefined;
                            logo?: string | null | undefined;
                        };
                        amountInTokens: string;
                        amountOutTokens: string;
                        exchange?: string | undefined;
                        poolType?: string | undefined;
                        feePercentage?: number | undefined;
                        feeBps?: number | undefined;
                    }[];
                    totalFeePercentage?: number | undefined;
                    aggregator?: string | undefined;
                } | undefined;
            } | undefined;
            tokenIn?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            tokenOut?: {
                address: string;
                decimals: number;
                symbol?: string | undefined;
                name?: string | undefined;
                logo?: string | null | undefined;
            } | undefined;
            amountOutTokens?: string | undefined;
            slippagePercentage?: number | undefined;
            amountInUSD?: number | undefined;
            amountOutUSD?: number | undefined;
            marketImpactPercentage?: number | undefined;
            poolFeesPercentage?: number | undefined;
            solana?: undefined;
            evm?: undefined;
        };
        index: number;
        error?: string | undefined;
    }[];
    totalRequests: number;
    successCount: number;
    errorCount: number;
}>;
export type SwapQuotingBatchResult = z.infer<typeof SwapQuotingBatchResultSchema>;
export type SwapQuotingBatchResponse = z.infer<typeof SwapQuotingBatchOutputSchema>;
export {};
