import { z } from 'zod';
type ExtractShape<T> = T extends z.ZodObject<infer S> ? S : never;
type ZodRawShape = Record<string, z.ZodTypeAny>;
export declare function extractZodSchemaKeys<TSchema extends z.ZodObject<ZodRawShape>, TShape = ExtractShape<TSchema>>(schema: TSchema): readonly (keyof TShape)[];
export declare function getZodKeysAdvanced<TSchema extends z.ZodTypeAny>(schema: TSchema): readonly string[];
export type NestedObjectKeys<T> = T extends Record<string, unknown> ? {
    [K in keyof T]: T[K] extends Record<string, unknown> ? `${string & K}.${string & NestedObjectKeys<T[K]>}` : string & K;
}[keyof T] : never;
export declare function extractAllZodKeys<TSchema extends z.ZodObject<ZodRawShape>>(schema: TSchema, includeNested?: boolean): readonly string[];
export declare const getZodDefaultValue: (zodType: unknown) => unknown;
export declare const generateDefaultFromSchema: <T>(schema: unknown) => T;
export declare const getZodSchemaKeys: (schema: unknown) => string[];
export declare const generateMinimalistMapping: <T>(schema: unknown, data: unknown[]) => T;
export declare const generateAutomaticMinimalistParser: <T extends z.ZodTypeAny>(schema: T, data: unknown[]) => z.infer<T>;
export {};
