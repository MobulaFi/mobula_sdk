import { z } from 'zod';
export declare const FundingPayloadSchema: z.ZodObject<{
    symbol: z.ZodString;
    quote: z.ZodOptional<z.ZodString>;
    exchange: z.ZodEffects<z.ZodOptional<z.ZodString>, string[], string | undefined>;
    interval: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    subscriptionId: z.ZodOptional<z.ZodString>;
    subscriptionTracking: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    symbol: string;
    exchange: string[];
    interval: number;
    quote?: string | undefined;
    subscriptionId?: string | undefined;
    subscriptionTracking?: string | undefined;
}, {
    symbol: string;
    exchange?: string | undefined;
    quote?: string | undefined;
    subscriptionId?: string | undefined;
    subscriptionTracking?: string | undefined;
    interval?: number | undefined;
}>;
export type FundingPayloadType = z.input<typeof FundingPayloadSchema>;
