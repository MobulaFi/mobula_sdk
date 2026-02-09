import { z } from 'zod';
declare const DateQuery: z.ZodEffects<z.ZodUnion<[z.ZodOptional<z.ZodNumber>, z.ZodOptional<z.ZodDate>]>, Date | undefined, number | Date | undefined>;
export type DateQuery = z.infer<typeof DateQuery>;
export default DateQuery;
