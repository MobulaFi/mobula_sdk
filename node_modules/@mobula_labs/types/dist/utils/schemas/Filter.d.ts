import { z } from 'zod';
declare const BaseFilter: z.ZodObject<{
    eq: z.ZodOptional<z.ZodTuple<[z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>], null>>;
    neq: z.ZodOptional<z.ZodTuple<[z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>], null>>;
    lt: z.ZodOptional<z.ZodTuple<[z.ZodString, z.ZodNumber], null>>;
    lte: z.ZodOptional<z.ZodTuple<[z.ZodString, z.ZodNumber], null>>;
    gt: z.ZodOptional<z.ZodTuple<[z.ZodString, z.ZodNumber], null>>;
    gte: z.ZodOptional<z.ZodTuple<[z.ZodString, z.ZodNumber], null>>;
    in: z.ZodOptional<z.ZodTuple<[z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>, "many">]>], null>>;
}, "strip", z.ZodTypeAny, {
    gte?: [string, number] | undefined;
    in?: [string, string | number | boolean | (string | number | boolean | null)[] | null] | undefined;
    lte?: [string, number] | undefined;
    gt?: [string, number] | undefined;
    lt?: [string, number] | undefined;
    eq?: [string, string | number | boolean | null] | undefined;
    neq?: [string, string | number | boolean | null] | undefined;
}, {
    gte?: [string, number] | undefined;
    in?: [string, string | number | boolean | (string | number | boolean | null)[] | null] | undefined;
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
export declare function countOperations(filter: Filter | undefined): number;
declare const FilterWithLimit: z.ZodEffects<z.ZodType<Filter, z.ZodTypeDef, Filter>, Filter, Filter>;
export default FilterWithLimit;
