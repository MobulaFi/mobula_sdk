import { z } from 'zod';
export declare const PausePulsePayloadSchema: z.ZodObject<{
    action: z.ZodEnum<["pause", "unpause"]>;
    views: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    views: string[];
    action: "pause" | "unpause";
}, {
    views: string[];
    action: "pause" | "unpause";
}>;
export type PausePulsePayloadType = z.input<typeof PausePulsePayloadSchema>;
