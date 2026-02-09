import { z } from 'zod';
declare const BigIntLax: z.ZodUnion<[z.ZodEffects<z.ZodString, bigint, string>, z.ZodEffects<z.ZodNumber, bigint, number>, z.ZodBigInt, z.ZodEffects<z.ZodNull, bigint, null>]>;
export type BigIntLax = z.infer<typeof BigIntLax>;
export default BigIntLax;
