import { z } from 'zod';
declare const BaseFilter: z.ZodObject<{
    eq: z.ZodOptional<z.ZodTuple<[z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>], null>>;
    neq: z.ZodOptional<z.ZodTuple<[z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>], null>>;
    lt: z.ZodOptional<z.ZodTuple<[z.ZodString, z.ZodNumber], null>>;
    lte: z.ZodOptional<z.ZodTuple<[z.ZodString, z.ZodNumber], null>>;
    gt: z.ZodOptional<z.ZodTuple<[z.ZodString, z.ZodNumber], null>>;
    gte: z.ZodOptional<z.ZodTuple<[z.ZodString, z.ZodNumber], null>>;
    in: z.ZodOptional<z.ZodTuple<[z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>], null>>;
}, "strip", z.ZodTypeAny, {
    gte?: [string, number] | undefined;
    in?: [string, string | number | boolean | null] | undefined;
    lte?: [string, number] | undefined;
    gt?: [string, number] | undefined;
    lt?: [string, number] | undefined;
    eq?: [string, string | number | boolean | null] | undefined;
    neq?: [string, string | number | boolean | null] | undefined;
}, {
    gte?: [string, number] | undefined;
    in?: [string, string | number | boolean | null] | undefined;
    lte?: [string, number] | undefined;
    gt?: [string, number] | undefined;
    lt?: [string, number] | undefined;
    eq?: [string, string | number | boolean | null] | undefined;
    neq?: [string, string | number | boolean | null] | undefined;
}>;
type BaseFilter = z.infer<typeof BaseFilter>;
export type Filter = BaseFilter & ({
    and?: Filter[];
} | {
    or?: Filter[];
});
declare const Filter: z.ZodType<Filter>;
export type FilterType = z.infer<typeof Filter>;
export declare function countOperations(filter: Filter | undefined): number;
declare const FilterWithLimit: z.ZodEffects<z.ZodType<Filter, z.ZodTypeDef, Filter>, Filter, Filter>;
export default FilterWithLimit;
declare const UpdateWebhook: z.ZodObject<{
    streamId: z.ZodString;
    apiKey: z.ZodString;
    mode: z.ZodDefault<z.ZodEnum<["replace", "merge"]>>;
    filters: z.ZodOptional<z.ZodEffects<z.ZodType<Filter, z.ZodTypeDef, Filter>, Filter, Filter>>;
}, "strip", z.ZodTypeAny, {
    mode: "replace" | "merge";
    streamId: string;
    apiKey: string;
    filters?: Filter | undefined;
}, {
    streamId: string;
    apiKey: string;
    filters?: Filter | undefined;
    mode?: "replace" | "merge" | undefined;
}>;
type UpdateWebhookDto = z.infer<typeof UpdateWebhook>;
export { UpdateWebhook };
export type { UpdateWebhookDto };
export type UpdateWebhookParams = UpdateWebhookDto;
export declare const CreateWebhook: z.ZodObject<{
    name: z.ZodString;
    chainIds: z.ZodArray<z.ZodString, "many">;
    events: z.ZodArray<z.ZodString, "many">;
    apiKey: z.ZodString;
    filters: z.ZodOptional<z.ZodEffects<z.ZodType<Filter, z.ZodTypeDef, Filter>, Filter, Filter>>;
    url: z.ZodString;
}, "strict", z.ZodTypeAny, {
    name: string;
    url: string;
    apiKey: string;
    chainIds: string[];
    events: string[];
    filters?: Filter | undefined;
}, {
    name: string;
    url: string;
    apiKey: string;
    chainIds: string[];
    events: string[];
    filters?: Filter | undefined;
}>;
export type CreateWebhookDto = z.infer<typeof CreateWebhook>;
export type CreateWebhookParams = CreateWebhookDto;
export declare const listWebhooksQueryParams: z.ZodObject<{
    apiKey: z.ZodString;
}, "strip", z.ZodTypeAny, {
    apiKey: string;
}, {
    apiKey: string;
}>;
export type ListWebhooksQuery = z.infer<typeof listWebhooksQueryParams>;
export type ListWebhooksParams = ListWebhooksQuery;
export declare const deleteWebhookParams: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type DeleteWebhookType = z.infer<typeof deleteWebhookParams>;
export type DeleteWebhookParams = DeleteWebhookType;
export declare const WebhookResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    chainIds: z.ZodArray<z.ZodString, "many">;
    events: z.ZodArray<z.ZodString, "many">;
    filters: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
    webhookUrl: z.ZodString;
    apiKey: z.ZodString;
    createdAt: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodDate]>, string, string | Date>;
}, "strip", z.ZodTypeAny, {
    name: string;
    createdAt: string;
    id: string;
    apiKey: string;
    chainIds: string[];
    events: string[];
    webhookUrl: string;
    filters?: any;
}, {
    name: string;
    createdAt: string | Date;
    id: string;
    apiKey: string;
    chainIds: string[];
    events: string[];
    webhookUrl: string;
    filters?: any;
}>;
export type WebhookResponse = z.infer<typeof WebhookResponseSchema>;
export declare const CreateWebhookResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    chainIds: z.ZodArray<z.ZodString, "many">;
    events: z.ZodArray<z.ZodString, "many">;
    filters: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
    webhookUrl: z.ZodString;
    apiKey: z.ZodString;
    createdAt: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodDate]>, string, string | Date>;
} & {
    webhookSecret: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    createdAt: string;
    id: string;
    apiKey: string;
    chainIds: string[];
    events: string[];
    webhookUrl: string;
    webhookSecret: string;
    filters?: any;
}, {
    name: string;
    createdAt: string | Date;
    id: string;
    apiKey: string;
    chainIds: string[];
    events: string[];
    webhookUrl: string;
    webhookSecret: string;
    filters?: any;
}>;
export type CreateWebhookResponse = z.infer<typeof CreateWebhookResponseSchema>;
export declare const listWebhookResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    count: z.ZodNumber;
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        chainIds: z.ZodArray<z.ZodString, "many">;
        events: z.ZodArray<z.ZodString, "many">;
        filters: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
        webhookUrl: z.ZodString;
        apiKey: z.ZodString;
        createdAt: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodDate]>, string, string | Date>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        createdAt: string;
        id: string;
        apiKey: string;
        chainIds: string[];
        events: string[];
        webhookUrl: string;
        filters?: any;
    }, {
        name: string;
        createdAt: string | Date;
        id: string;
        apiKey: string;
        chainIds: string[];
        events: string[];
        webhookUrl: string;
        filters?: any;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        name: string;
        createdAt: string;
        id: string;
        apiKey: string;
        chainIds: string[];
        events: string[];
        webhookUrl: string;
        filters?: any;
    }[];
    success: boolean;
    count: number;
}, {
    data: {
        name: string;
        createdAt: string | Date;
        id: string;
        apiKey: string;
        chainIds: string[];
        events: string[];
        webhookUrl: string;
        filters?: any;
    }[];
    success: boolean;
    count: number;
}>;
export type listWebhookResponse = z.infer<typeof listWebhookResponseSchema>;
export type ListWebhooksResponse = listWebhookResponse;
export declare const updateWebhookResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    message: z.ZodString;
    data: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        chainIds: z.ZodArray<z.ZodString, "many">;
        events: z.ZodArray<z.ZodString, "many">;
        filters: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
        webhookUrl: z.ZodString;
        apiKey: z.ZodString;
        createdAt: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodDate]>, string, string | Date>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        createdAt: string;
        id: string;
        apiKey: string;
        chainIds: string[];
        events: string[];
        webhookUrl: string;
        filters?: any;
    }, {
        name: string;
        createdAt: string | Date;
        id: string;
        apiKey: string;
        chainIds: string[];
        events: string[];
        webhookUrl: string;
        filters?: any;
    }>;
}, "strip", z.ZodTypeAny, {
    message: string;
    data: {
        name: string;
        createdAt: string;
        id: string;
        apiKey: string;
        chainIds: string[];
        events: string[];
        webhookUrl: string;
        filters?: any;
    };
    success: boolean;
}, {
    message: string;
    data: {
        name: string;
        createdAt: string | Date;
        id: string;
        apiKey: string;
        chainIds: string[];
        events: string[];
        webhookUrl: string;
        filters?: any;
    };
    success: boolean;
}>;
export type updateWebhookResponse = z.infer<typeof updateWebhookResponseSchema>;
export type UpdateWebhookResponse = updateWebhookResponse;
export declare const deleteWebhookResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    message: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
    id: string;
    success: boolean;
}, {
    message: string;
    id: string;
    success: boolean;
}>;
export type DeleteWebhookResponse = z.infer<typeof deleteWebhookResponseSchema>;
