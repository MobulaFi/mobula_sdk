import { z } from 'zod';
export declare const StreamPayloadSchema: z.ZodObject<{
    filters: z.ZodOptional<z.ZodEffects<z.ZodType<import("../../utils/schemas/Filter.ts").Filter, z.ZodTypeDef, import("../../utils/schemas/Filter.ts").Filter>, import("../../utils/schemas/Filter.ts").Filter, import("../../utils/schemas/Filter.ts").Filter>>;
    chainIds: z.ZodArray<z.ZodString, "atleastone">;
    name: z.ZodOptional<z.ZodString>;
    events: z.ZodArray<z.ZodEnum<["swap", "transfer", "swap-enriched", "block", "order"]>, "atleastone">;
    authorization: z.ZodString;
    subscriptionId: z.ZodOptional<z.ZodString>;
    subscriptionTracking: z.ZodOptional<z.ZodString>;
    debugSubscriptionId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    chainIds: [string, ...string[]];
    events: ["order" | "swap" | "transfer" | "swap-enriched" | "block", ...("order" | "swap" | "transfer" | "swap-enriched" | "block")[]];
    authorization: string;
    name?: string | undefined;
    filters?: import("../../utils/schemas/Filter.ts").Filter | undefined;
    subscriptionId?: string | undefined;
    subscriptionTracking?: string | undefined;
    debugSubscriptionId?: string | undefined;
}, {
    chainIds: [string, ...string[]];
    events: ["order" | "swap" | "transfer" | "swap-enriched" | "block", ...("order" | "swap" | "transfer" | "swap-enriched" | "block")[]];
    authorization: string;
    name?: string | undefined;
    filters?: import("../../utils/schemas/Filter.ts").Filter | undefined;
    subscriptionId?: string | undefined;
    subscriptionTracking?: string | undefined;
    debugSubscriptionId?: string | undefined;
}>;
export type StreamPayloadType = z.infer<typeof StreamPayloadSchema>;
export declare const UnsubscribeStreamPayloadSchema: z.ZodOptional<z.ZodEffects<z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<["stream"]>>;
    subscriptionId: z.ZodOptional<z.ZodString>;
    personalizedId: z.ZodOptional<z.ZodString>;
    viewName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type?: "stream" | undefined;
    subscriptionId?: string | undefined;
    viewName?: string | undefined;
    personalizedId?: string | undefined;
}, {
    type?: "stream" | undefined;
    subscriptionId?: string | undefined;
    viewName?: string | undefined;
    personalizedId?: string | undefined;
}>, {
    type?: "stream" | undefined;
    subscriptionId?: string | undefined;
    viewName?: string | undefined;
    personalizedId?: string | undefined;
}, {
    type?: "stream" | undefined;
    subscriptionId?: string | undefined;
    viewName?: string | undefined;
    personalizedId?: string | undefined;
}>>;
export type UnsubscribeStreamPayloadType = z.input<typeof UnsubscribeStreamPayloadSchema>;
export declare const UpdateStreamPayloadSchema: z.ZodObject<{
    subscriptionId: z.ZodString;
    authorization: z.ZodString;
    mode: z.ZodDefault<z.ZodEnum<["merge", "replace"]>>;
    filters: z.ZodOptional<z.ZodEffects<z.ZodType<import("../../utils/schemas/Filter.ts").Filter, z.ZodTypeDef, import("../../utils/schemas/Filter.ts").Filter>, import("../../utils/schemas/Filter.ts").Filter, import("../../utils/schemas/Filter.ts").Filter>>;
    chainIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    events: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    subscriptionTracking: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    mode: "replace" | "merge";
    subscriptionId: string;
    authorization: string;
    filters?: import("../../utils/schemas/Filter.ts").Filter | undefined;
    chainIds?: string[] | undefined;
    events?: string[] | undefined;
    subscriptionTracking?: string | undefined;
}, {
    subscriptionId: string;
    authorization: string;
    filters?: import("../../utils/schemas/Filter.ts").Filter | undefined;
    mode?: "replace" | "merge" | undefined;
    chainIds?: string[] | undefined;
    events?: string[] | undefined;
    subscriptionTracking?: string | undefined;
}>;
export type UpdateStreamPayloadType = z.input<typeof UpdateStreamPayloadSchema>;
