import { z } from 'zod';
/**
 * Solana instruction schema - represents a single instruction that can be
 * added to a transaction. This allows clients to add their own instructions
 * (e.g., fee transfers, Jito tips) before building the transaction.
 */
export declare const SolanaInstructionSchema: z.ZodObject<{
    /** Program ID that will process this instruction */
    programId: z.ZodString;
    /** Account keys involved in the instruction */
    accounts: z.ZodArray<z.ZodObject<{
        pubkey: z.ZodString;
        isSigner: z.ZodBoolean;
        isWritable: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        pubkey: string;
        isSigner: boolean;
        isWritable: boolean;
    }, {
        pubkey: string;
        isSigner: boolean;
        isWritable: boolean;
    }>, "many">;
    /** Instruction data as base64 encoded string */
    data: z.ZodString;
}, "strip", z.ZodTypeAny, {
    data: string;
    programId: string;
    accounts: {
        pubkey: string;
        isSigner: boolean;
        isWritable: boolean;
    }[];
}, {
    data: string;
    programId: string;
    accounts: {
        pubkey: string;
        isSigner: boolean;
        isWritable: boolean;
    }[];
}>;
/**
 * Solana instructions response schema
 * Contains all the instructions needed to execute a swap, which the client
 * can combine with their own instructions before building and signing.
 */
export declare const SolanaInstructionsSchema: z.ZodObject<{
    /** Instructions to set compute budget (priority fees, compute limits) */
    computeBudgetInstructions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        /** Program ID that will process this instruction */
        programId: z.ZodString;
        /** Account keys involved in the instruction */
        accounts: z.ZodArray<z.ZodObject<{
            pubkey: z.ZodString;
            isSigner: z.ZodBoolean;
            isWritable: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            pubkey: string;
            isSigner: boolean;
            isWritable: boolean;
        }, {
            pubkey: string;
            isSigner: boolean;
            isWritable: boolean;
        }>, "many">;
        /** Instruction data as base64 encoded string */
        data: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        data: string;
        programId: string;
        accounts: {
            pubkey: string;
            isSigner: boolean;
            isWritable: boolean;
        }[];
    }, {
        data: string;
        programId: string;
        accounts: {
            pubkey: string;
            isSigner: boolean;
            isWritable: boolean;
        }[];
    }>, "many">>;
    /** Setup instructions (e.g., create token accounts) */
    setupInstructions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        /** Program ID that will process this instruction */
        programId: z.ZodString;
        /** Account keys involved in the instruction */
        accounts: z.ZodArray<z.ZodObject<{
            pubkey: z.ZodString;
            isSigner: z.ZodBoolean;
            isWritable: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            pubkey: string;
            isSigner: boolean;
            isWritable: boolean;
        }, {
            pubkey: string;
            isSigner: boolean;
            isWritable: boolean;
        }>, "many">;
        /** Instruction data as base64 encoded string */
        data: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        data: string;
        programId: string;
        accounts: {
            pubkey: string;
            isSigner: boolean;
            isWritable: boolean;
        }[];
    }, {
        data: string;
        programId: string;
        accounts: {
            pubkey: string;
            isSigner: boolean;
            isWritable: boolean;
        }[];
    }>, "many">>;
    /** Swap instructions (can be multiple for multi-hop routes) */
    swapInstructions: z.ZodArray<z.ZodObject<{
        /** Program ID that will process this instruction */
        programId: z.ZodString;
        /** Account keys involved in the instruction */
        accounts: z.ZodArray<z.ZodObject<{
            pubkey: z.ZodString;
            isSigner: z.ZodBoolean;
            isWritable: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            pubkey: string;
            isSigner: boolean;
            isWritable: boolean;
        }, {
            pubkey: string;
            isSigner: boolean;
            isWritable: boolean;
        }>, "many">;
        /** Instruction data as base64 encoded string */
        data: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        data: string;
        programId: string;
        accounts: {
            pubkey: string;
            isSigner: boolean;
            isWritable: boolean;
        }[];
    }, {
        data: string;
        programId: string;
        accounts: {
            pubkey: string;
            isSigner: boolean;
            isWritable: boolean;
        }[];
    }>, "many">;
    /** Cleanup instructions (e.g., close token accounts) */
    cleanupInstructions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        /** Program ID that will process this instruction */
        programId: z.ZodString;
        /** Account keys involved in the instruction */
        accounts: z.ZodArray<z.ZodObject<{
            pubkey: z.ZodString;
            isSigner: z.ZodBoolean;
            isWritable: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            pubkey: string;
            isSigner: boolean;
            isWritable: boolean;
        }, {
            pubkey: string;
            isSigner: boolean;
            isWritable: boolean;
        }>, "many">;
        /** Instruction data as base64 encoded string */
        data: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        data: string;
        programId: string;
        accounts: {
            pubkey: string;
            isSigner: boolean;
            isWritable: boolean;
        }[];
    }, {
        data: string;
        programId: string;
        accounts: {
            pubkey: string;
            isSigner: boolean;
            isWritable: boolean;
        }[];
    }>, "many">>;
    /** Address lookup table addresses for versioned transactions */
    addressLookupTableAddresses: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    swapInstructions: {
        data: string;
        programId: string;
        accounts: {
            pubkey: string;
            isSigner: boolean;
            isWritable: boolean;
        }[];
    }[];
    computeBudgetInstructions?: {
        data: string;
        programId: string;
        accounts: {
            pubkey: string;
            isSigner: boolean;
            isWritable: boolean;
        }[];
    }[] | undefined;
    setupInstructions?: {
        data: string;
        programId: string;
        accounts: {
            pubkey: string;
            isSigner: boolean;
            isWritable: boolean;
        }[];
    }[] | undefined;
    cleanupInstructions?: {
        data: string;
        programId: string;
        accounts: {
            pubkey: string;
            isSigner: boolean;
            isWritable: boolean;
        }[];
    }[] | undefined;
    addressLookupTableAddresses?: string[] | undefined;
}, {
    swapInstructions: {
        data: string;
        programId: string;
        accounts: {
            pubkey: string;
            isSigner: boolean;
            isWritable: boolean;
        }[];
    }[];
    computeBudgetInstructions?: {
        data: string;
        programId: string;
        accounts: {
            pubkey: string;
            isSigner: boolean;
            isWritable: boolean;
        }[];
    }[] | undefined;
    setupInstructions?: {
        data: string;
        programId: string;
        accounts: {
            pubkey: string;
            isSigner: boolean;
            isWritable: boolean;
        }[];
    }[] | undefined;
    cleanupInstructions?: {
        data: string;
        programId: string;
        accounts: {
            pubkey: string;
            isSigner: boolean;
            isWritable: boolean;
        }[];
    }[] | undefined;
    addressLookupTableAddresses?: string[] | undefined;
}>;
/**
 * Data schema for swap quoting instructions endpoint
 * Returns instructions instead of a serialized transaction
 */
export declare const SwapQuotingInstructionsDataSchema: z.ZodObject<{
    /** Estimated output amount in tokens */
    amountOutTokens: z.ZodOptional<z.ZodString>;
    /** Slippage percentage */
    slippagePercentage: z.ZodOptional<z.ZodNumber>;
    /** Input amount in USD */
    amountInUSD: z.ZodOptional<z.ZodNumber>;
    /** Output amount in USD */
    amountOutUSD: z.ZodOptional<z.ZodNumber>;
    /** Market impact percentage */
    marketImpactPercentage: z.ZodOptional<z.ZodNumber>;
    /** Pool fees percentage */
    poolFeesPercentage: z.ZodOptional<z.ZodNumber>;
    /** Token input metadata */
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
    /** Token output metadata */
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
    /** Unique request ID */
    requestId: z.ZodString;
    /** Route details */
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
    /** Solana instructions data */
    solana: z.ZodObject<{
        /** All instructions needed to execute the swap */
        instructions: z.ZodObject<{
            /** Instructions to set compute budget (priority fees, compute limits) */
            computeBudgetInstructions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                /** Program ID that will process this instruction */
                programId: z.ZodString;
                /** Account keys involved in the instruction */
                accounts: z.ZodArray<z.ZodObject<{
                    pubkey: z.ZodString;
                    isSigner: z.ZodBoolean;
                    isWritable: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }, {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }>, "many">;
                /** Instruction data as base64 encoded string */
                data: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }, {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }>, "many">>;
            /** Setup instructions (e.g., create token accounts) */
            setupInstructions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                /** Program ID that will process this instruction */
                programId: z.ZodString;
                /** Account keys involved in the instruction */
                accounts: z.ZodArray<z.ZodObject<{
                    pubkey: z.ZodString;
                    isSigner: z.ZodBoolean;
                    isWritable: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }, {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }>, "many">;
                /** Instruction data as base64 encoded string */
                data: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }, {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }>, "many">>;
            /** Swap instructions (can be multiple for multi-hop routes) */
            swapInstructions: z.ZodArray<z.ZodObject<{
                /** Program ID that will process this instruction */
                programId: z.ZodString;
                /** Account keys involved in the instruction */
                accounts: z.ZodArray<z.ZodObject<{
                    pubkey: z.ZodString;
                    isSigner: z.ZodBoolean;
                    isWritable: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }, {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }>, "many">;
                /** Instruction data as base64 encoded string */
                data: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }, {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }>, "many">;
            /** Cleanup instructions (e.g., close token accounts) */
            cleanupInstructions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                /** Program ID that will process this instruction */
                programId: z.ZodString;
                /** Account keys involved in the instruction */
                accounts: z.ZodArray<z.ZodObject<{
                    pubkey: z.ZodString;
                    isSigner: z.ZodBoolean;
                    isWritable: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }, {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }>, "many">;
                /** Instruction data as base64 encoded string */
                data: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }, {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }>, "many">>;
            /** Address lookup table addresses for versioned transactions */
            addressLookupTableAddresses: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            swapInstructions: {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }[];
            computeBudgetInstructions?: {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }[] | undefined;
            setupInstructions?: {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }[] | undefined;
            cleanupInstructions?: {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }[] | undefined;
            addressLookupTableAddresses?: string[] | undefined;
        }, {
            swapInstructions: {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }[];
            computeBudgetInstructions?: {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }[] | undefined;
            setupInstructions?: {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }[] | undefined;
            cleanupInstructions?: {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }[] | undefined;
            addressLookupTableAddresses?: string[] | undefined;
        }>;
        /** The last block height at which the blockhash will be valid */
        lastValidBlockHeight: z.ZodNumber;
        /** Recent blockhash to use when building the transaction */
        recentBlockhash: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        lastValidBlockHeight: number;
        instructions: {
            swapInstructions: {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }[];
            computeBudgetInstructions?: {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }[] | undefined;
            setupInstructions?: {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }[] | undefined;
            cleanupInstructions?: {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }[] | undefined;
            addressLookupTableAddresses?: string[] | undefined;
        };
        recentBlockhash: string;
    }, {
        lastValidBlockHeight: number;
        instructions: {
            swapInstructions: {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }[];
            computeBudgetInstructions?: {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }[] | undefined;
            setupInstructions?: {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }[] | undefined;
            cleanupInstructions?: {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }[] | undefined;
            addressLookupTableAddresses?: string[] | undefined;
        };
        recentBlockhash: string;
    }>;
    /** Integration fee details (if feePercentage and feeWallet were provided) */
    fee: z.ZodOptional<z.ZodObject<{
        /** Fee amount in human-readable format (e.g., "0.01" for 0.01 SOL) */
        amount: z.ZodString;
        /** Fee percentage applied (0.01 to 99) */
        percentage: z.ZodNumber;
        /** Wallet address receiving the fee */
        wallet: z.ZodString;
        /** Whether fee is deducted from input (SOL→token) or output (token→SOL) */
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
}, "strip", z.ZodTypeAny, {
    requestId: string;
    solana: {
        lastValidBlockHeight: number;
        instructions: {
            swapInstructions: {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }[];
            computeBudgetInstructions?: {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }[] | undefined;
            setupInstructions?: {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }[] | undefined;
            cleanupInstructions?: {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }[] | undefined;
            addressLookupTableAddresses?: string[] | undefined;
        };
        recentBlockhash: string;
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
}, {
    requestId: string;
    solana: {
        lastValidBlockHeight: number;
        instructions: {
            swapInstructions: {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }[];
            computeBudgetInstructions?: {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }[] | undefined;
            setupInstructions?: {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }[] | undefined;
            cleanupInstructions?: {
                data: string;
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
            }[] | undefined;
            addressLookupTableAddresses?: string[] | undefined;
        };
        recentBlockhash: string;
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
}>;
export declare const SwapQuotingInstructionsOutputSchema: z.ZodObject<{
    data: z.ZodObject<{
        /** Estimated output amount in tokens */
        amountOutTokens: z.ZodOptional<z.ZodString>;
        /** Slippage percentage */
        slippagePercentage: z.ZodOptional<z.ZodNumber>;
        /** Input amount in USD */
        amountInUSD: z.ZodOptional<z.ZodNumber>;
        /** Output amount in USD */
        amountOutUSD: z.ZodOptional<z.ZodNumber>;
        /** Market impact percentage */
        marketImpactPercentage: z.ZodOptional<z.ZodNumber>;
        /** Pool fees percentage */
        poolFeesPercentage: z.ZodOptional<z.ZodNumber>;
        /** Token input metadata */
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
        /** Token output metadata */
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
        /** Unique request ID */
        requestId: z.ZodString;
        /** Route details */
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
        /** Solana instructions data */
        solana: z.ZodObject<{
            /** All instructions needed to execute the swap */
            instructions: z.ZodObject<{
                /** Instructions to set compute budget (priority fees, compute limits) */
                computeBudgetInstructions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    /** Program ID that will process this instruction */
                    programId: z.ZodString;
                    /** Account keys involved in the instruction */
                    accounts: z.ZodArray<z.ZodObject<{
                        pubkey: z.ZodString;
                        isSigner: z.ZodBoolean;
                        isWritable: z.ZodBoolean;
                    }, "strip", z.ZodTypeAny, {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }, {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }>, "many">;
                    /** Instruction data as base64 encoded string */
                    data: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }, {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }>, "many">>;
                /** Setup instructions (e.g., create token accounts) */
                setupInstructions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    /** Program ID that will process this instruction */
                    programId: z.ZodString;
                    /** Account keys involved in the instruction */
                    accounts: z.ZodArray<z.ZodObject<{
                        pubkey: z.ZodString;
                        isSigner: z.ZodBoolean;
                        isWritable: z.ZodBoolean;
                    }, "strip", z.ZodTypeAny, {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }, {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }>, "many">;
                    /** Instruction data as base64 encoded string */
                    data: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }, {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }>, "many">>;
                /** Swap instructions (can be multiple for multi-hop routes) */
                swapInstructions: z.ZodArray<z.ZodObject<{
                    /** Program ID that will process this instruction */
                    programId: z.ZodString;
                    /** Account keys involved in the instruction */
                    accounts: z.ZodArray<z.ZodObject<{
                        pubkey: z.ZodString;
                        isSigner: z.ZodBoolean;
                        isWritable: z.ZodBoolean;
                    }, "strip", z.ZodTypeAny, {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }, {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }>, "many">;
                    /** Instruction data as base64 encoded string */
                    data: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }, {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }>, "many">;
                /** Cleanup instructions (e.g., close token accounts) */
                cleanupInstructions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    /** Program ID that will process this instruction */
                    programId: z.ZodString;
                    /** Account keys involved in the instruction */
                    accounts: z.ZodArray<z.ZodObject<{
                        pubkey: z.ZodString;
                        isSigner: z.ZodBoolean;
                        isWritable: z.ZodBoolean;
                    }, "strip", z.ZodTypeAny, {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }, {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }>, "many">;
                    /** Instruction data as base64 encoded string */
                    data: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }, {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }>, "many">>;
                /** Address lookup table addresses for versioned transactions */
                addressLookupTableAddresses: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                swapInstructions: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[];
                computeBudgetInstructions?: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[] | undefined;
                setupInstructions?: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[] | undefined;
                cleanupInstructions?: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[] | undefined;
                addressLookupTableAddresses?: string[] | undefined;
            }, {
                swapInstructions: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[];
                computeBudgetInstructions?: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[] | undefined;
                setupInstructions?: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[] | undefined;
                cleanupInstructions?: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[] | undefined;
                addressLookupTableAddresses?: string[] | undefined;
            }>;
            /** The last block height at which the blockhash will be valid */
            lastValidBlockHeight: z.ZodNumber;
            /** Recent blockhash to use when building the transaction */
            recentBlockhash: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            lastValidBlockHeight: number;
            instructions: {
                swapInstructions: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[];
                computeBudgetInstructions?: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[] | undefined;
                setupInstructions?: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[] | undefined;
                cleanupInstructions?: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[] | undefined;
                addressLookupTableAddresses?: string[] | undefined;
            };
            recentBlockhash: string;
        }, {
            lastValidBlockHeight: number;
            instructions: {
                swapInstructions: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[];
                computeBudgetInstructions?: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[] | undefined;
                setupInstructions?: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[] | undefined;
                cleanupInstructions?: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[] | undefined;
                addressLookupTableAddresses?: string[] | undefined;
            };
            recentBlockhash: string;
        }>;
        /** Integration fee details (if feePercentage and feeWallet were provided) */
        fee: z.ZodOptional<z.ZodObject<{
            /** Fee amount in human-readable format (e.g., "0.01" for 0.01 SOL) */
            amount: z.ZodString;
            /** Fee percentage applied (0.01 to 99) */
            percentage: z.ZodNumber;
            /** Wallet address receiving the fee */
            wallet: z.ZodString;
            /** Whether fee is deducted from input (SOL→token) or output (token→SOL) */
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
    }, "strip", z.ZodTypeAny, {
        requestId: string;
        solana: {
            lastValidBlockHeight: number;
            instructions: {
                swapInstructions: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[];
                computeBudgetInstructions?: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[] | undefined;
                setupInstructions?: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[] | undefined;
                cleanupInstructions?: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[] | undefined;
                addressLookupTableAddresses?: string[] | undefined;
            };
            recentBlockhash: string;
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
    }, {
        requestId: string;
        solana: {
            lastValidBlockHeight: number;
            instructions: {
                swapInstructions: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[];
                computeBudgetInstructions?: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[] | undefined;
                setupInstructions?: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[] | undefined;
                cleanupInstructions?: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[] | undefined;
                addressLookupTableAddresses?: string[] | undefined;
            };
            recentBlockhash: string;
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
    }>;
    error: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    data: {
        requestId: string;
        solana: {
            lastValidBlockHeight: number;
            instructions: {
                swapInstructions: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[];
                computeBudgetInstructions?: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[] | undefined;
                setupInstructions?: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[] | undefined;
                cleanupInstructions?: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[] | undefined;
                addressLookupTableAddresses?: string[] | undefined;
            };
            recentBlockhash: string;
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
    };
    error?: string | undefined;
}, {
    data: {
        requestId: string;
        solana: {
            lastValidBlockHeight: number;
            instructions: {
                swapInstructions: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[];
                computeBudgetInstructions?: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[] | undefined;
                setupInstructions?: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[] | undefined;
                cleanupInstructions?: {
                    data: string;
                    programId: string;
                    accounts: {
                        pubkey: string;
                        isSigner: boolean;
                        isWritable: boolean;
                    }[];
                }[] | undefined;
                addressLookupTableAddresses?: string[] | undefined;
            };
            recentBlockhash: string;
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
    };
    error?: string | undefined;
}>;
export type SolanaInstruction = z.infer<typeof SolanaInstructionSchema>;
export type SolanaInstructions = z.infer<typeof SolanaInstructionsSchema>;
export type SwapQuotingInstructionsData = z.infer<typeof SwapQuotingInstructionsDataSchema>;
export type SwapQuotingInstructionsResponse = z.infer<typeof SwapQuotingInstructionsOutputSchema>;
