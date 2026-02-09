import { z } from 'zod';
export declare const MetadataNewsParamsSchema: z.ZodObject<{
    symbols: z.ZodEffects<z.ZodString, string[], string>;
}, "strip", z.ZodTypeAny, {
    symbols: string[];
}, {
    symbols: string;
}>;
export type MetadataNewsParams = z.input<typeof MetadataNewsParamsSchema>;
export declare const CryptoNewsDataSchema: z.ZodArray<z.ZodObject<{
    news_url: z.ZodString;
    image_url: z.ZodString;
    title: z.ZodString;
    text: z.ZodString;
    source_name: z.ZodString;
    date: z.ZodString;
    topics: z.ZodArray<z.ZodString, "many">;
    sentiment: z.ZodString;
    type: z.ZodString;
    tickers: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    type: string;
    title: string;
    date: string;
    news_url: string;
    image_url: string;
    text: string;
    source_name: string;
    topics: string[];
    sentiment: string;
    tickers: string[];
}, {
    type: string;
    title: string;
    date: string;
    news_url: string;
    image_url: string;
    text: string;
    source_name: string;
    topics: string[];
    sentiment: string;
    tickers: string[];
}>, "many">;
export declare const MetadataNewsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        news_url: z.ZodString;
        image_url: z.ZodString;
        title: z.ZodString;
        text: z.ZodString;
        source_name: z.ZodString;
        date: z.ZodString;
        topics: z.ZodArray<z.ZodString, "many">;
        sentiment: z.ZodString;
        type: z.ZodString;
        tickers: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        type: string;
        title: string;
        date: string;
        news_url: string;
        image_url: string;
        text: string;
        source_name: string;
        topics: string[];
        sentiment: string;
        tickers: string[];
    }, {
        type: string;
        title: string;
        date: string;
        news_url: string;
        image_url: string;
        text: string;
        source_name: string;
        topics: string[];
        sentiment: string;
        tickers: string[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        type: string;
        title: string;
        date: string;
        news_url: string;
        image_url: string;
        text: string;
        source_name: string;
        topics: string[];
        sentiment: string;
        tickers: string[];
    }[];
}, {
    data: {
        type: string;
        title: string;
        date: string;
        news_url: string;
        image_url: string;
        text: string;
        source_name: string;
        topics: string[];
        sentiment: string;
        tickers: string[];
    }[];
}>;
export type MetadataNewsResponse = z.infer<typeof MetadataNewsResponseSchema>;
