import { z } from 'zod';
export declare const MarketSparklineResponseSchema: z.ZodObject<{
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
}, {
    url: string;
}>;
export type MarketSparklineResponse = z.infer<typeof MarketSparklineResponseSchema>;
export declare const MarketSparklineParamsSchema: z.ZodObject<{
    asset: z.ZodOptional<z.ZodString>;
    blockchain: z.ZodOptional<z.ZodString>;
    symbol: z.ZodOptional<z.ZodString>;
    id: z.ZodOptional<z.ZodString>;
    timeFrame: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    png: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    timeFrame: string;
    png: string;
    symbol?: string | undefined;
    id?: string | undefined;
    blockchain?: string | undefined;
    asset?: string | undefined;
}, {
    symbol?: string | undefined;
    id?: string | undefined;
    blockchain?: string | undefined;
    asset?: string | undefined;
    timeFrame?: string | undefined;
    png?: string | undefined;
}>;
export type MarketSparklineParams = z.input<typeof MarketSparklineParamsSchema>;
