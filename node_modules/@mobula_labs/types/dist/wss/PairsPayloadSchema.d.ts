import { z } from 'zod';
export declare const PairsPayloadSchema: z.ZodObject<{
    mode: z.ZodDefault<z.ZodOptional<z.ZodEnum<["asset", "pair"]>>>;
    subscriptionId: z.ZodOptional<z.ZodString>;
    blockchain: z.ZodOptional<z.ZodString>;
    factory: z.ZodOptional<z.ZodString>;
    interval: z.ZodDefault<z.ZodNumber>;
    address: z.ZodOptional<z.ZodString>;
    asset: z.ZodOptional<z.ZodString>;
    subscriptionTracking: z.ZodEffects<z.ZodDefault<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>, boolean, string | boolean | undefined>;
}, "strip", z.ZodTypeAny, {
    mode: "asset" | "pair";
    subscriptionTracking: boolean;
    interval: number;
    address?: string | undefined;
    factory?: string | undefined;
    blockchain?: string | undefined;
    asset?: string | undefined;
    subscriptionId?: string | undefined;
}, {
    address?: string | undefined;
    factory?: string | undefined;
    blockchain?: string | undefined;
    asset?: string | undefined;
    mode?: "asset" | "pair" | undefined;
    subscriptionId?: string | undefined;
    subscriptionTracking?: string | boolean | undefined;
    interval?: number | undefined;
}>;
export type PairsPayloadType = z.input<typeof PairsPayloadSchema>;
