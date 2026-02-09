import { z } from 'zod';
export declare const TokenFirstBuyersParamsSchema: z.ZodObject<{
    blockchain: z.ZodOptional<z.ZodString>;
    asset: z.ZodString;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    asset: string;
    limit: number;
    blockchain?: string | undefined;
}, {
    asset: string;
    blockchain?: string | undefined;
    limit?: number | undefined;
}>;
export type TokenFirstBuyersParams = z.input<typeof TokenFirstBuyersParamsSchema>;
export declare const TokenFirstBuyersResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        address: z.ZodString;
        blockchain: z.ZodString;
        initialAmount: z.ZodString;
        currentBalance: z.ZodString;
        firstHoldingDate: z.ZodDate;
        tags: z.ZodArray<z.ZodString, "many">;
        lastUpdate: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    }, "strip", z.ZodTypeAny, {
        address: string;
        tags: string[];
        blockchain: string;
        initialAmount: string;
        currentBalance: string;
        firstHoldingDate: Date;
        lastUpdate?: Date | null | undefined;
    }, {
        address: string;
        tags: string[];
        blockchain: string;
        initialAmount: string;
        currentBalance: string;
        firstHoldingDate: Date;
        lastUpdate?: Date | null | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        address: string;
        tags: string[];
        blockchain: string;
        initialAmount: string;
        currentBalance: string;
        firstHoldingDate: Date;
        lastUpdate?: Date | null | undefined;
    }[];
}, {
    data: {
        address: string;
        tags: string[];
        blockchain: string;
        initialAmount: string;
        currentBalance: string;
        firstHoldingDate: Date;
        lastUpdate?: Date | null | undefined;
    }[];
}>;
export type TokenFirstBuyersResponse = z.infer<typeof TokenFirstBuyersResponseSchema>;
