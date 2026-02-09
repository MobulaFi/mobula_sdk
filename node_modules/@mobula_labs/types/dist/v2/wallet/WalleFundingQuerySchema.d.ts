import { z } from 'zod';
export declare const WalletFundingParamsSchema: z.ZodObject<{
    wallet: z.ZodString;
}, "strip", z.ZodTypeAny, {
    wallet: string;
}, {
    wallet: string;
}>;
export type WalletFundingParams = z.input<typeof WalletFundingParamsSchema>;
export declare const WalletFundingResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        from: z.ZodNullable<z.ZodString>;
        chainId: z.ZodNullable<z.ZodString>;
        date: z.ZodNullable<z.ZodDate>;
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
}, "strip", z.ZodTypeAny, {
    data: {
        date: Date | null;
        chainId: string | null;
        amount: string | null;
        from: string | null;
        txHash: string | null;
        fromWalletLogo: string | null;
        fromWalletTag: string | null;
    };
}, {
    data: {
        date: Date | null;
        chainId: string | null;
        amount: string | null;
        from: string | null;
        txHash: string | null;
        fromWalletLogo: string | null;
        fromWalletTag: string | null;
    };
}>;
export type WalletFundingResponse = z.infer<typeof WalletFundingResponseSchema>;
