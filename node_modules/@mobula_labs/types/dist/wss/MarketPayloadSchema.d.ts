import { z } from 'zod';
export declare const MarketPayloadSchema: z.ZodObject<{
    interval: z.ZodDefault<z.ZodNumber>;
    subscriptionId: z.ZodOptional<z.ZodString>;
    assets: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
    }, {
        name: string;
    }>, z.ZodObject<{
        symbol: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
    }, {
        symbol: string;
    }>, z.ZodObject<{
        address: z.ZodString;
        blockchain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        address: string;
        blockchain: string;
    }, {
        address: string;
        blockchain: string;
    }>]>, "many">;
    subscriptionTracking: z.ZodEffects<z.ZodDefault<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>, boolean, string | boolean | undefined>;
}, "strip", z.ZodTypeAny, {
    assets: ({
        name: string;
    } | {
        symbol: string;
    } | {
        address: string;
        blockchain: string;
    })[];
    subscriptionTracking: boolean;
    interval: number;
    subscriptionId?: string | undefined;
}, {
    assets: ({
        name: string;
    } | {
        symbol: string;
    } | {
        address: string;
        blockchain: string;
    })[];
    subscriptionId?: string | undefined;
    subscriptionTracking?: string | boolean | undefined;
    interval?: number | undefined;
}>;
export type MarketPayloadType = z.input<typeof MarketPayloadSchema>;
