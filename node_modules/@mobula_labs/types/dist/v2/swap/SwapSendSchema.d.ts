import { z } from 'zod';
export declare const SwapSendSchema: z.ZodObject<{
    chainId: z.ZodString;
    signedTransaction: z.ZodEffects<z.ZodString, Buffer, string>;
}, "strip", z.ZodTypeAny, {
    chainId: string;
    signedTransaction: Buffer;
}, {
    chainId: string;
    signedTransaction: string;
}>;
export type SwapSendParams = z.infer<typeof SwapSendSchema>;
