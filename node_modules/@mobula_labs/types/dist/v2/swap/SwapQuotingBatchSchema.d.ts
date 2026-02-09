import { z } from 'zod';
declare const SwapQuotingBatchItemSchema: z.ZodEffects<z.ZodObject<{
    chainId: z.ZodString;
    tokenIn: z.ZodString;
    tokenOut: z.ZodString;
    amount: z.ZodOptional<z.ZodNumber>;
    amountRaw: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, bigint, string>>;
    slippage: z.ZodDefault<z.ZodNumber>;
    walletAddress: z.ZodString;
    excludedProtocols: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    onlyProtocols: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    poolAddress: z.ZodOptional<z.ZodString>;
    onlyRouters: z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodEnum<["jupiter", "kyberswap", "lifi"]>, "many">>, ("jupiter" | "kyberswap" | "lifi")[] | undefined, ("jupiter" | "kyberswap" | "lifi")[] | undefined>;
    /**
     * Priority fee configuration for Solana transactions.
     * Can be 'auto', a preset name, or a number in microLamports per CU.
     */
    priorityFee: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodNumber, z.ZodObject<{
        preset: z.ZodEnum<["low", "medium", "high", "veryHigh"]>;
    }, "strip", z.ZodTypeAny, {
        preset: "high" | "medium" | "low" | "veryHigh";
    }, {
        preset: "high" | "medium" | "low" | "veryHigh";
    }>]>>;
    /**
     * Compute unit limit for Solana transactions.
     * Can be true for dynamic limit or a specific number.
     */
    computeUnitLimit: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<true>, z.ZodNumber]>>;
    /**
     * Jito tip amount in lamports for Solana transactions.
     * This adds a SOL transfer instruction to a Jito tip account.
     */
    jitoTipLamports: z.ZodOptional<z.ZodNumber>;
    /**
     * Fee percentage to charge on the swap (0.01 to 99).
     * On Solana: Fee is always taken from SOL/WSOL (native token).
     */
    feePercentage: z.ZodOptional<z.ZodNumber>;
    /**
     * Wallet address to receive fees (Solana only).
     * Required when feePercentage is set on Solana chains.
     */
    feeWallet: z.ZodOptional<z.ZodString>;
    /**
     * Payer wallet address for Solana transactions (fee abstraction).
     * This wallet will be the fee payer (paying SOL rent/transaction fees) and the signer of the transaction.
     * The swap itself will still use the `walletAddress` for token transfers.
     *
     * Only supported for Solana chains.
     */
    payerAddress: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    chainId: string;
    walletAddress: string;
    tokenIn: string;
    tokenOut: string;
    slippage: number;
    poolAddress?: string | undefined;
    amountRaw?: bigint | undefined;
    amount?: number | undefined;
    feePercentage?: number | undefined;
    excludedProtocols?: string[] | undefined;
    onlyProtocols?: string[] | undefined;
    onlyRouters?: ("jupiter" | "kyberswap" | "lifi")[] | undefined;
    priorityFee?: number | "auto" | {
        preset: "high" | "medium" | "low" | "veryHigh";
    } | undefined;
    computeUnitLimit?: number | true | undefined;
    jitoTipLamports?: number | undefined;
    feeWallet?: string | undefined;
    payerAddress?: string | undefined;
}, {
    chainId: string;
    walletAddress: string;
    tokenIn: string;
    tokenOut: string;
    poolAddress?: string | undefined;
    amountRaw?: string | undefined;
    amount?: number | undefined;
    feePercentage?: number | undefined;
    slippage?: number | undefined;
    excludedProtocols?: string[] | undefined;
    onlyProtocols?: string[] | undefined;
    onlyRouters?: ("jupiter" | "kyberswap" | "lifi")[] | undefined;
    priorityFee?: number | "auto" | {
        preset: "high" | "medium" | "low" | "veryHigh";
    } | undefined;
    computeUnitLimit?: number | true | undefined;
    jitoTipLamports?: number | undefined;
    feeWallet?: string | undefined;
    payerAddress?: string | undefined;
}>, {
    chainId: string;
    walletAddress: string;
    tokenIn: string;
    tokenOut: string;
    slippage: number;
    poolAddress?: string | undefined;
    amountRaw?: bigint | undefined;
    amount?: number | undefined;
    feePercentage?: number | undefined;
    excludedProtocols?: string[] | undefined;
    onlyProtocols?: string[] | undefined;
    onlyRouters?: ("jupiter" | "kyberswap" | "lifi")[] | undefined;
    priorityFee?: number | "auto" | {
        preset: "high" | "medium" | "low" | "veryHigh";
    } | undefined;
    computeUnitLimit?: number | true | undefined;
    jitoTipLamports?: number | undefined;
    feeWallet?: string | undefined;
    payerAddress?: string | undefined;
}, {
    chainId: string;
    walletAddress: string;
    tokenIn: string;
    tokenOut: string;
    poolAddress?: string | undefined;
    amountRaw?: string | undefined;
    amount?: number | undefined;
    feePercentage?: number | undefined;
    slippage?: number | undefined;
    excludedProtocols?: string[] | undefined;
    onlyProtocols?: string[] | undefined;
    onlyRouters?: ("jupiter" | "kyberswap" | "lifi")[] | undefined;
    priorityFee?: number | "auto" | {
        preset: "high" | "medium" | "low" | "veryHigh";
    } | undefined;
    computeUnitLimit?: number | true | undefined;
    jitoTipLamports?: number | undefined;
    feeWallet?: string | undefined;
    payerAddress?: string | undefined;
}>;
export declare const SwapQuotingBatchBodySchema: z.ZodObject<{
    requests: z.ZodArray<z.ZodEffects<z.ZodObject<{
        chainId: z.ZodString;
        tokenIn: z.ZodString;
        tokenOut: z.ZodString;
        amount: z.ZodOptional<z.ZodNumber>;
        amountRaw: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, bigint, string>>;
        slippage: z.ZodDefault<z.ZodNumber>;
        walletAddress: z.ZodString;
        excludedProtocols: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        onlyProtocols: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        poolAddress: z.ZodOptional<z.ZodString>;
        onlyRouters: z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodEnum<["jupiter", "kyberswap", "lifi"]>, "many">>, ("jupiter" | "kyberswap" | "lifi")[] | undefined, ("jupiter" | "kyberswap" | "lifi")[] | undefined>;
        /**
         * Priority fee configuration for Solana transactions.
         * Can be 'auto', a preset name, or a number in microLamports per CU.
         */
        priorityFee: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodNumber, z.ZodObject<{
            preset: z.ZodEnum<["low", "medium", "high", "veryHigh"]>;
        }, "strip", z.ZodTypeAny, {
            preset: "high" | "medium" | "low" | "veryHigh";
        }, {
            preset: "high" | "medium" | "low" | "veryHigh";
        }>]>>;
        /**
         * Compute unit limit for Solana transactions.
         * Can be true for dynamic limit or a specific number.
         */
        computeUnitLimit: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<true>, z.ZodNumber]>>;
        /**
         * Jito tip amount in lamports for Solana transactions.
         * This adds a SOL transfer instruction to a Jito tip account.
         */
        jitoTipLamports: z.ZodOptional<z.ZodNumber>;
        /**
         * Fee percentage to charge on the swap (0.01 to 99).
         * On Solana: Fee is always taken from SOL/WSOL (native token).
         */
        feePercentage: z.ZodOptional<z.ZodNumber>;
        /**
         * Wallet address to receive fees (Solana only).
         * Required when feePercentage is set on Solana chains.
         */
        feeWallet: z.ZodOptional<z.ZodString>;
        /**
         * Payer wallet address for Solana transactions (fee abstraction).
         * This wallet will be the fee payer (paying SOL rent/transaction fees) and the signer of the transaction.
         * The swap itself will still use the `walletAddress` for token transfers.
         *
         * Only supported for Solana chains.
         */
        payerAddress: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        chainId: string;
        walletAddress: string;
        tokenIn: string;
        tokenOut: string;
        slippage: number;
        poolAddress?: string | undefined;
        amountRaw?: bigint | undefined;
        amount?: number | undefined;
        feePercentage?: number | undefined;
        excludedProtocols?: string[] | undefined;
        onlyProtocols?: string[] | undefined;
        onlyRouters?: ("jupiter" | "kyberswap" | "lifi")[] | undefined;
        priorityFee?: number | "auto" | {
            preset: "high" | "medium" | "low" | "veryHigh";
        } | undefined;
        computeUnitLimit?: number | true | undefined;
        jitoTipLamports?: number | undefined;
        feeWallet?: string | undefined;
        payerAddress?: string | undefined;
    }, {
        chainId: string;
        walletAddress: string;
        tokenIn: string;
        tokenOut: string;
        poolAddress?: string | undefined;
        amountRaw?: string | undefined;
        amount?: number | undefined;
        feePercentage?: number | undefined;
        slippage?: number | undefined;
        excludedProtocols?: string[] | undefined;
        onlyProtocols?: string[] | undefined;
        onlyRouters?: ("jupiter" | "kyberswap" | "lifi")[] | undefined;
        priorityFee?: number | "auto" | {
            preset: "high" | "medium" | "low" | "veryHigh";
        } | undefined;
        computeUnitLimit?: number | true | undefined;
        jitoTipLamports?: number | undefined;
        feeWallet?: string | undefined;
        payerAddress?: string | undefined;
    }>, {
        chainId: string;
        walletAddress: string;
        tokenIn: string;
        tokenOut: string;
        slippage: number;
        poolAddress?: string | undefined;
        amountRaw?: bigint | undefined;
        amount?: number | undefined;
        feePercentage?: number | undefined;
        excludedProtocols?: string[] | undefined;
        onlyProtocols?: string[] | undefined;
        onlyRouters?: ("jupiter" | "kyberswap" | "lifi")[] | undefined;
        priorityFee?: number | "auto" | {
            preset: "high" | "medium" | "low" | "veryHigh";
        } | undefined;
        computeUnitLimit?: number | true | undefined;
        jitoTipLamports?: number | undefined;
        feeWallet?: string | undefined;
        payerAddress?: string | undefined;
    }, {
        chainId: string;
        walletAddress: string;
        tokenIn: string;
        tokenOut: string;
        poolAddress?: string | undefined;
        amountRaw?: string | undefined;
        amount?: number | undefined;
        feePercentage?: number | undefined;
        slippage?: number | undefined;
        excludedProtocols?: string[] | undefined;
        onlyProtocols?: string[] | undefined;
        onlyRouters?: ("jupiter" | "kyberswap" | "lifi")[] | undefined;
        priorityFee?: number | "auto" | {
            preset: "high" | "medium" | "low" | "veryHigh";
        } | undefined;
        computeUnitLimit?: number | true | undefined;
        jitoTipLamports?: number | undefined;
        feeWallet?: string | undefined;
        payerAddress?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    requests: {
        chainId: string;
        walletAddress: string;
        tokenIn: string;
        tokenOut: string;
        slippage: number;
        poolAddress?: string | undefined;
        amountRaw?: bigint | undefined;
        amount?: number | undefined;
        feePercentage?: number | undefined;
        excludedProtocols?: string[] | undefined;
        onlyProtocols?: string[] | undefined;
        onlyRouters?: ("jupiter" | "kyberswap" | "lifi")[] | undefined;
        priorityFee?: number | "auto" | {
            preset: "high" | "medium" | "low" | "veryHigh";
        } | undefined;
        computeUnitLimit?: number | true | undefined;
        jitoTipLamports?: number | undefined;
        feeWallet?: string | undefined;
        payerAddress?: string | undefined;
    }[];
}, {
    requests: {
        chainId: string;
        walletAddress: string;
        tokenIn: string;
        tokenOut: string;
        poolAddress?: string | undefined;
        amountRaw?: string | undefined;
        amount?: number | undefined;
        feePercentage?: number | undefined;
        slippage?: number | undefined;
        excludedProtocols?: string[] | undefined;
        onlyProtocols?: string[] | undefined;
        onlyRouters?: ("jupiter" | "kyberswap" | "lifi")[] | undefined;
        priorityFee?: number | "auto" | {
            preset: "high" | "medium" | "low" | "veryHigh";
        } | undefined;
        computeUnitLimit?: number | true | undefined;
        jitoTipLamports?: number | undefined;
        feeWallet?: string | undefined;
        payerAddress?: string | undefined;
    }[];
}>;
export type SwapQuotingBatchItem = z.infer<typeof SwapQuotingBatchItemSchema>;
export type SwapQuotingBatchBody = z.infer<typeof SwapQuotingBatchBodySchema>;
export {};
