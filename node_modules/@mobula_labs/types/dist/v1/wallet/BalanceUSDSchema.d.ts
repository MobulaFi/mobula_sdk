import { z } from 'zod';
export declare const WalletBalanceUSDParamsSchema: z.ZodObject<{
    portfolioId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    portfolioId: string;
}, {
    portfolioId: string;
}>;
export type WalletBalanceUSDParams = z.input<typeof WalletBalanceUSDParamsSchema>;
export declare const WalletBalanceUSDResponseSchema: z.ZodObject<{
    success: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    success: number;
}, {
    success: number;
}>;
export type WalletBalanceUSDResponse = z.infer<typeof WalletBalanceUSDResponseSchema>;
