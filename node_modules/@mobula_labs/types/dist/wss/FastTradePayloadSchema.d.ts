import { z } from 'zod';
export declare const FastTradesPayloadSchema: z.ZodObject<{
    assetMode: z.ZodDefault<z.ZodBoolean>;
    items: z.ZodArray<z.ZodObject<{
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
    items: {
        address: string;
        blockchain: string;
    }[];
    assetMode: boolean;
    subscriptionTracking: boolean;
    subscriptionId?: string | undefined;
}, {
    items: {
        address: string;
        blockchain: string;
    }[];
    subscriptionId?: string | undefined;
    assetMode?: boolean | undefined;
    subscriptionTracking?: string | boolean | undefined;
}>;
export type FastTradesPayloadType = z.input<typeof FastTradesPayloadSchema>;
export interface BaseFastTrade {
    date: number;
    tokenPrice: number;
    tokenPriceVs: number;
    tokenAmount: number;
    tokenAmountVs: number;
    tokenAmountUsd: number;
    tokenNativePrice: number;
    tokenMarketCapUSD: number;
    type: 'buy' | 'sell';
    operation: 'regular' | 'liquidity' | 'arbitrage' | string;
    blockchain: string;
    hash: string;
    sender: string;
    tokenAmountRaw: string;
    tokenAmountRawVs: string;
    preBalanceBaseToken: string | null;
    preBalanceQuoteToken: string | null;
    postBalanceBaseToken: string | null;
    postBalanceQuoteToken: string | null;
    subscriptionId: string;
    timestamp: number;
    labels?: string[];
    platform?: string | null;
    swapRecipient?: string | null;
    totalFeesUSD?: number | null;
    gasFeesUSD?: number | null;
    platformFeesUSD?: number | null;
    mevFeesUSD?: number | null;
}
export interface PairFastTrade extends BaseFastTrade {
    pair: string;
    token?: never;
}
export interface TokenFastTrade extends BaseFastTrade {
    token: string;
    pair?: never;
}
export type WssFastTradesResponseType = PairFastTrade | TokenFastTrade;
