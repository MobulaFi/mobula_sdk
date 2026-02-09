import { z } from 'zod';
import type { BaseMessageType } from '../utils/schemas/BaseMessage.ts';
export declare const TokenDetailsPayloadSchema: z.ZodObject<{
    tokens: z.ZodArray<z.ZodObject<{
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
    tokens: {
        address: string;
        blockchain: string;
    }[];
    subscriptionTracking: boolean;
    subscriptionId?: string | undefined;
}, {
    tokens: {
        address: string;
        blockchain: string;
    }[];
    subscriptionId?: string | undefined;
    subscriptionTracking?: string | boolean | undefined;
}>;
export type TokenDetailsPayloadType = z.input<typeof TokenDetailsPayloadSchema>;
export interface WssTokenDetailsResponseType extends Omit<BaseMessageType, 'pairData'> {
    subscriptionId: string;
    updated: true;
    timestamp: number;
}
