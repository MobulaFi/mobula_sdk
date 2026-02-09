import { z } from 'zod';
export declare const TokenKlineBsPointParamsSchema: z.ZodObject<{
    blockchain: z.ZodString;
    address: z.ZodString;
    bar: z.ZodEffects<z.ZodString, string, string>;
    fromDate: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodOptional<z.ZodNumber>, z.ZodOptional<z.ZodDate>]>, Date | undefined, number | Date | undefined>, Date | undefined, number | Date | undefined>;
    toDate: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodOptional<z.ZodNumber>, z.ZodOptional<z.ZodDate>]>, Date | undefined, number | Date | undefined>, Date | undefined, number | Date | undefined>;
    transactionSenderAddresses: z.ZodDefault<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string[], string | string[]>>;
    labels: z.ZodEffects<z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string[], string | string[]>>, string[], string | string[] | undefined>;
}, "strip", z.ZodTypeAny, {
    address: string;
    blockchain: string;
    labels: string[];
    bar: string;
    transactionSenderAddresses: string[];
    fromDate?: Date | undefined;
    toDate?: Date | undefined;
}, {
    address: string;
    blockchain: string;
    bar: string;
    labels?: string | string[] | undefined;
    fromDate?: number | Date | undefined;
    toDate?: number | Date | undefined;
    transactionSenderAddresses?: string | string[] | undefined;
}>;
export type TokenKlineBsPointParams = z.input<typeof TokenKlineBsPointParamsSchema>;
export type TokenKlineBsPointInferType = z.infer<typeof TokenKlineBsPointParamsSchema>;
export declare const TokenKlineBsBubblePoint: z.ZodObject<{
    volumeBuyToken: z.ZodString;
    buys: z.ZodString;
    avgBuyPriceUSD: z.ZodString;
    volumeBuy: z.ZodString;
    volumeSellToken: z.ZodString;
    sells: z.ZodString;
    avgSellPriceUSD: z.ZodString;
    volumeSell: z.ZodString;
    fromAddress: z.ZodString;
    fromAddressTag: z.ZodString;
    time: z.ZodString;
}, "strip", z.ZodTypeAny, {
    time: string;
    buys: string;
    sells: string;
    volumeBuyToken: string;
    volumeSellToken: string;
    volumeBuy: string;
    volumeSell: string;
    avgBuyPriceUSD: string;
    avgSellPriceUSD: string;
    fromAddress: string;
    fromAddressTag: string;
}, {
    time: string;
    buys: string;
    sells: string;
    volumeBuyToken: string;
    volumeSellToken: string;
    volumeBuy: string;
    volumeSell: string;
    avgBuyPriceUSD: string;
    avgSellPriceUSD: string;
    fromAddress: string;
    fromAddressTag: string;
}>;
export declare const TokenKlineBsPointResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        volumeBuyToken: z.ZodString;
        buys: z.ZodString;
        avgBuyPriceUSD: z.ZodString;
        volumeBuy: z.ZodString;
        volumeSellToken: z.ZodString;
        sells: z.ZodString;
        avgSellPriceUSD: z.ZodString;
        volumeSell: z.ZodString;
        fromAddress: z.ZodString;
        fromAddressTag: z.ZodString;
        time: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        time: string;
        buys: string;
        sells: string;
        volumeBuyToken: string;
        volumeSellToken: string;
        volumeBuy: string;
        volumeSell: string;
        avgBuyPriceUSD: string;
        avgSellPriceUSD: string;
        fromAddress: string;
        fromAddressTag: string;
    }, {
        time: string;
        buys: string;
        sells: string;
        volumeBuyToken: string;
        volumeSellToken: string;
        volumeBuy: string;
        volumeSell: string;
        avgBuyPriceUSD: string;
        avgSellPriceUSD: string;
        fromAddress: string;
        fromAddressTag: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        time: string;
        buys: string;
        sells: string;
        volumeBuyToken: string;
        volumeSellToken: string;
        volumeBuy: string;
        volumeSell: string;
        avgBuyPriceUSD: string;
        avgSellPriceUSD: string;
        fromAddress: string;
        fromAddressTag: string;
    }[];
}, {
    data: {
        time: string;
        buys: string;
        sells: string;
        volumeBuyToken: string;
        volumeSellToken: string;
        volumeBuy: string;
        volumeSell: string;
        avgBuyPriceUSD: string;
        avgSellPriceUSD: string;
        fromAddress: string;
        fromAddressTag: string;
    }[];
}>;
export type TokenKlineBsPointResponse = z.infer<typeof TokenKlineBsPointResponseSchema>;
