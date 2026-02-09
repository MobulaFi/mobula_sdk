import { z } from 'zod';
export declare const FeedPayloadSchema: z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
    kind: z.ZodLiteral<"asset_ids">;
    asset_ids: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    quote_id: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    kind: "asset_ids";
    asset_ids?: number[] | undefined;
    quote_id?: number | null | undefined;
}, {
    kind: "asset_ids";
    asset_ids?: number[] | undefined;
    quote_id?: number | null | undefined;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"address">;
    tokens: z.ZodArray<z.ZodObject<{
        blockchain: z.ZodString;
        address: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        address: string;
        blockchain: string;
    }, {
        address: string;
        blockchain: string;
    }>, "many">;
    quote: z.ZodOptional<z.ZodObject<{
        address: z.ZodString;
        blockchain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        address: string;
        blockchain: string;
    }, {
        address: string;
        blockchain: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    tokens: {
        address: string;
        blockchain: string;
    }[];
    kind: "address";
    quote?: {
        address: string;
        blockchain: string;
    } | undefined;
}, {
    tokens: {
        address: string;
        blockchain: string;
    }[];
    kind: "address";
    quote?: {
        address: string;
        blockchain: string;
    } | undefined;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"all">;
}, "strip", z.ZodTypeAny, {
    kind: "all";
}, {
    kind: "all";
}>]>;
export type FeedPayloadType = z.input<typeof FeedPayloadSchema>;
export declare const FeedAssetIdSchema: z.ZodObject<{
    asset_ids: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    quote_id: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    asset_ids?: number[] | undefined;
    quote_id?: number | null | undefined;
}, {
    asset_ids?: number[] | undefined;
    quote_id?: number | null | undefined;
}>;
export declare const FeedTokenSchema: z.ZodObject<{
    tokens: z.ZodArray<z.ZodObject<{
        blockchain: z.ZodString;
        address: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        address: string;
        blockchain: string;
    }, {
        address: string;
        blockchain: string;
    }>, "many">;
    quote: z.ZodOptional<z.ZodObject<{
        address: z.ZodString;
        blockchain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        address: string;
        blockchain: string;
    }, {
        address: string;
        blockchain: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    tokens: {
        address: string;
        blockchain: string;
    }[];
    quote?: {
        address: string;
        blockchain: string;
    } | undefined;
}, {
    tokens: {
        address: string;
        blockchain: string;
    }[];
    quote?: {
        address: string;
        blockchain: string;
    } | undefined;
}>;
