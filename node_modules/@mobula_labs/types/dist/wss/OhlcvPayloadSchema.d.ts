import { z } from 'zod';
export declare const OhlcvPayloadSchema: z.ZodObject<{
    address: z.ZodOptional<z.ZodString>;
    subscriptionId: z.ZodOptional<z.ZodString>;
    blockchain: z.ZodOptional<z.ZodString>;
    chainId: z.ZodOptional<z.ZodString>;
    period: z.ZodEffects<z.ZodOptional<z.ZodString>, string, string | undefined>;
    asset: z.ZodOptional<z.ZodString>;
    currentPrice: z.ZodOptional<z.ZodString>;
    mode: z.ZodOptional<z.ZodEnum<["asset", "pair"]>>;
    subscriptionTracking: z.ZodEffects<z.ZodDefault<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>, boolean, string | boolean | undefined>;
}, "strip", z.ZodTypeAny, {
    period: string;
    subscriptionTracking: boolean;
    address?: string | undefined;
    chainId?: string | undefined;
    blockchain?: string | undefined;
    asset?: string | undefined;
    mode?: "asset" | "pair" | undefined;
    subscriptionId?: string | undefined;
    currentPrice?: string | undefined;
}, {
    address?: string | undefined;
    chainId?: string | undefined;
    blockchain?: string | undefined;
    asset?: string | undefined;
    period?: string | undefined;
    mode?: "asset" | "pair" | undefined;
    subscriptionId?: string | undefined;
    subscriptionTracking?: string | boolean | undefined;
    currentPrice?: string | undefined;
}>;
export type OhlcvPayloadType = z.input<typeof OhlcvPayloadSchema>;
export interface WssOhlcvDetailsResponseType {
    subscriptionId?: string;
    high: number | null;
    low: number | null;
    open: number | null;
    close: number | null;
    volume: number;
    time: number;
    period: string;
    tradeTime?: number;
}
