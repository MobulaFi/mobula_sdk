import { z } from 'zod';
export declare const WalletLabelsParamsSchema: z.ZodObject<{
    walletAddresses: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    tokenAddress: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    walletAddresses?: string | string[] | undefined;
    tokenAddress?: string | undefined;
}, {
    walletAddresses?: string | string[] | undefined;
    tokenAddress?: string | undefined;
}>;
export type WalletLabelsParams = z.input<typeof WalletLabelsParamsSchema>;
export declare const WalletLabelsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        walletAddress: z.ZodString;
        labels: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        walletAddress: string;
        labels: string[];
    }, {
        walletAddress: string;
        labels: string[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        walletAddress: string;
        labels: string[];
    }[];
}, {
    data: {
        walletAddress: string;
        labels: string[];
    }[];
}>;
export type WalletLabelsResponse = z.infer<typeof WalletLabelsResponseSchema>;
