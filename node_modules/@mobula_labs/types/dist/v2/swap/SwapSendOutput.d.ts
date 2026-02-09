import { z } from 'zod';
export declare const SwapSendResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        success: z.ZodBoolean;
        transactionHash: z.ZodOptional<z.ZodString>;
        requestId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        success: boolean;
        requestId: string;
        transactionHash?: string | undefined;
    }, {
        success: boolean;
        requestId: string;
        transactionHash?: string | undefined;
    }>;
    error: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    data: {
        success: boolean;
        requestId: string;
        transactionHash?: string | undefined;
    };
    error?: string | undefined;
}, {
    data: {
        success: boolean;
        requestId: string;
        transactionHash?: string | undefined;
    };
    error?: string | undefined;
}>;
export type SwapSendResponse = z.infer<typeof SwapSendResponseSchema>;
