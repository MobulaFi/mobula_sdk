import { z } from 'zod';
export declare const stringOrArray: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string[], string | string[]>;
