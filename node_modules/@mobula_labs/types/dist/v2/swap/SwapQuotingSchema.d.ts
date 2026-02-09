import { z } from 'zod';
/**
 * Swap Quoting Query Schema
 *
 * Amount specification:
 * - Either `amount` OR `amountRaw` must be provided (but not both)
 * - `amount`: Human-readable amount (e.g., "1.5" for 1.5 tokens)
 *   This will be converted to raw amount by multiplying by 10^decimals
 *   Example: For USDC (6 decimals), amount="1.5" becomes 1500000 raw units
 * - `amountRaw`: Raw amount as a string (e.g., "1500000" for 1.5 USDC with 6 decimals)
 *   This is the exact amount that will be used in the swap without conversion
 *   Useful when you already have the raw amount and want to avoid precision loss
 *
 * Decimals explanation:
 * Tokens have a decimals property (typically 18 for ETH, 6 for USDC, 8 for BTC)
 * Raw amount = human-readable amount × 10^decimals
 * Example: 1.5 USDC (6 decimals) = 1.5 × 10^6 = 1500000 raw units
 */
export declare const SwapQuotingQuerySchema: z.ZodEffects<z.ZodObject<{
    chainId: z.ZodString;
    tokenIn: z.ZodString;
    tokenOut: z.ZodString;
    /**
     * Human-readable amount (e.g., "1.5" for 1.5 tokens)
     * Will be converted to raw amount by multiplying by 10^decimals
     */
    amount: z.ZodEffects<z.ZodOptional<z.ZodString>, number | undefined, string | undefined>;
    /**
     * Raw amount as a string (e.g., "1500000" for 1.5 USDC with 6 decimals)
     * This is the exact amount that will be used in the swap without conversion
     * Must be a positive integer string
     */
    amountRaw: z.ZodEffects<z.ZodOptional<z.ZodString>, bigint | undefined, string | undefined>;
    slippage: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, number, string | undefined>;
    walletAddress: z.ZodString;
    excludedProtocols: z.ZodEffects<z.ZodOptional<z.ZodString>, string[] | undefined, string | undefined>;
    onlyProtocols: z.ZodEffects<z.ZodOptional<z.ZodString>, string[] | undefined, string | undefined>;
    poolAddress: z.ZodOptional<z.ZodString>;
    onlyRouters: z.ZodEffects<z.ZodOptional<z.ZodString>, ("jupiter" | "kyberswap" | "lifi")[] | undefined, string | undefined>;
    /**
     * Priority fee configuration for Solana transactions.
     * Can be:
     * - 'auto': Automatically estimate priority fee based on network conditions
     * - A number: Exact priority fee in microLamports per compute unit
     * - A preset name: 'low', 'medium', 'high', 'veryHigh'
     *
     * Presets (microLamports per CU):
     * - low: 10,000 (0.01 lamports/CU)
     * - medium: 100,000 (0.1 lamports/CU)
     * - high: 500,000 (0.5 lamports/CU)
     * - veryHigh: 1,000,000 (1 lamport/CU)
     */
    priorityFee: z.ZodEffects<z.ZodOptional<z.ZodString>, number | "auto" | {
        preset: "high" | "medium" | "low" | "veryHigh";
    } | undefined, string | undefined>;
    /**
     * Compute unit limit for Solana transactions.
     * Can be 'true' for dynamic limit or a specific number.
     * Default: 400,000
     */
    computeUnitLimit: z.ZodEffects<z.ZodOptional<z.ZodString>, number | true | undefined, string | undefined>;
    /**
     * Jito tip amount in lamports for Solana transactions.
     * This adds a SOL transfer instruction to a Jito tip account to prioritize
     * the transaction via Jito's block engine.
     *
     * The tip is sent to one of Jito's official tip accounts and helps ensure
     * faster transaction inclusion.
     *
     * Example: 10000 = 0.00001 SOL tip
     *
     * Note: This is separate from priorityFee (compute unit price).
     * For best results, use both jitoTipLamports and priorityFee together.
     */
    jitoTipLamports: z.ZodEffects<z.ZodOptional<z.ZodString>, number | undefined, string | undefined>;
    /**
     * Fee percentage to charge on the swap (0.01 to 99).
     * This is the percentage of the input token amount that will be charged as a fee.
     *
     * On Solana: Fee is always taken from SOL/WSOL (native token).
     * - If tokenIn is SOL/WSOL → fee is deducted from input before swap
     * - If tokenOut is SOL/WSOL → fee is deducted from output after swap
     *
     * Must be used together with feeWallet on Solana.
     */
    feePercentage: z.ZodEffects<z.ZodOptional<z.ZodString>, number | undefined, string | undefined>;
    /**
     * Wallet address to receive fees (Solana only).
     * Must be a valid Solana wallet address.
     * Required when feePercentage is set on Solana chains.
     */
    feeWallet: z.ZodOptional<z.ZodString>;
    /**
     * Payer wallet address for Solana transactions (fee abstraction).
     * This wallet will be the fee payer and signer of the transaction.
     * The swap itself uses `walletAddress` for token transfers.
     * If not provided, `walletAddress` is used as the payer.
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
    amount?: string | undefined;
    feePercentage?: string | undefined;
    slippage?: string | undefined;
    excludedProtocols?: string | undefined;
    onlyProtocols?: string | undefined;
    onlyRouters?: string | undefined;
    priorityFee?: string | undefined;
    computeUnitLimit?: string | undefined;
    jitoTipLamports?: string | undefined;
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
    amount?: string | undefined;
    feePercentage?: string | undefined;
    slippage?: string | undefined;
    excludedProtocols?: string | undefined;
    onlyProtocols?: string | undefined;
    onlyRouters?: string | undefined;
    priorityFee?: string | undefined;
    computeUnitLimit?: string | undefined;
    jitoTipLamports?: string | undefined;
    feeWallet?: string | undefined;
    payerAddress?: string | undefined;
}>;
/** Inferred type from SwapQuotingQuerySchema - includes payerAddress for fee abstraction */
export type SwapQuotingQueryParams = z.infer<typeof SwapQuotingQuerySchema>;
