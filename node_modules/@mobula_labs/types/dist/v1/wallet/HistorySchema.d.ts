import { z } from 'zod';
export declare const WalletHistoryParamsSchema: z.ZodObject<{
    wallet: z.ZodOptional<z.ZodString>;
    wallets: z.ZodOptional<z.ZodString>;
    blockchains: z.ZodOptional<z.ZodString>;
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
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
}, "strip", z.ZodTypeAny, {
    blockchains?: string | undefined;
    testnet?: string | undefined;
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
}, {
    blockchains?: string | undefined;
    testnet?: string | undefined;
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
}>;
export type WalletHistoryParams = z.input<typeof WalletHistoryParamsSchema>;
export declare const WalletHistoryResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        wallets: z.ZodArray<z.ZodString, "many">;
        balance_usd: z.ZodNumber;
        balance_history: z.ZodArray<z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>, "many">;
        backfill_status: z.ZodOptional<z.ZodEnum<["processed", "processing", "pending"]>>;
    }, "strip", z.ZodTypeAny, {
        wallets: string[];
        balance_usd: number;
        balance_history: [number, number][];
        backfill_status?: "processed" | "processing" | "pending" | undefined;
    }, {
        wallets: string[];
        balance_usd: number;
        balance_history: [number, number][];
        backfill_status?: "processed" | "processing" | "pending" | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        wallets: string[];
        balance_usd: number;
        balance_history: [number, number][];
        backfill_status?: "processed" | "processing" | "pending" | undefined;
    };
}, {
    data: {
        wallets: string[];
        balance_usd: number;
        balance_history: [number, number][];
        backfill_status?: "processed" | "processing" | "pending" | undefined;
    };
}>;
export type WalletHistoryResponse = z.infer<typeof WalletHistoryResponseSchema>;
