import { z } from 'zod';
import type { BaseMessageType } from '../utils/schemas/BaseMessage.ts';
export declare const MarketDetailsPayloadSchema: z.ZodObject<{
    pools: z.ZodArray<z.ZodObject<{
        address: z.ZodString;
        blockchain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        address: string;
        blockchain: string;
    }, {
        address: string;
        blockchain: string;
    }>, "many">;
    subscriptionId: z.ZodOptional<z.ZodString>;
    subscriptionTracking: z.ZodEffects<z.ZodDefault<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>, boolean, string | boolean | undefined>;
}, "strip", z.ZodTypeAny, {
    pools: {
        address: string;
        blockchain: string;
    }[];
    subscriptionTracking: boolean;
    subscriptionId?: string | undefined;
}, {
    pools: {
        address: string;
        blockchain: string;
    }[];
    subscriptionId?: string | undefined;
    subscriptionTracking?: string | boolean | undefined;
}>;
export type MarketDetailsPayloadType = z.input<typeof MarketDetailsPayloadSchema>;
export interface WssMarketDetailsResponseType extends Omit<BaseMessageType, 'tokenData'> {
    subscriptionId: string;
    updated: true;
    timestamp: number;
}
