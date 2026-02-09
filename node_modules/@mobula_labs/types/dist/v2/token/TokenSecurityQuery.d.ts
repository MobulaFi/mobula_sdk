import { z } from 'zod';
export declare const TokenSecurityQuery: z.ZodObject<{
    blockchain: z.ZodOptional<z.ZodString>;
    address: z.ZodString;
    instanceTracking: z.ZodEffects<z.ZodOptional<z.ZodBoolean>, boolean | undefined, unknown>;
    _forceAnalysis: z.ZodEffects<z.ZodOptional<z.ZodBoolean>, boolean | undefined, unknown>;
}, "strip", z.ZodTypeAny, {
    address: string;
    blockchain?: string | undefined;
    instanceTracking?: boolean | undefined;
    _forceAnalysis?: boolean | undefined;
}, {
    address: string;
    blockchain?: string | undefined;
    instanceTracking?: unknown;
    _forceAnalysis?: unknown;
}>;
export type TokenSecurityQueryType = z.input<typeof TokenSecurityQuery>;
