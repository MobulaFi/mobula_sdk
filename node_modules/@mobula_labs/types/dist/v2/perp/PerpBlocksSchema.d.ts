import { z } from 'zod';
export declare const PerpBlocksQueryParamsSchema: z.ZodObject<{
    exchange: z.ZodOptional<z.ZodString>;
    chain_id: z.ZodOptional<z.ZodString>;
    block_number: z.ZodOptional<z.ZodNumber>;
    batch_number: z.ZodOptional<z.ZodNumber>;
    block_status: z.ZodOptional<z.ZodString>;
    from_block_time: z.ZodOptional<z.ZodString>;
    to_block_time: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    page: number;
    exchange?: string | undefined;
    chain_id?: string | undefined;
    block_number?: number | undefined;
    batch_number?: number | undefined;
    block_status?: string | undefined;
    from_block_time?: string | undefined;
    to_block_time?: string | undefined;
}, {
    exchange?: string | undefined;
    limit?: number | undefined;
    page?: number | undefined;
    chain_id?: string | undefined;
    block_number?: number | undefined;
    batch_number?: number | undefined;
    block_status?: string | undefined;
    from_block_time?: string | undefined;
    to_block_time?: string | undefined;
}>;
export type PerpBlocksQueryParams = z.infer<typeof PerpBlocksQueryParamsSchema>;
export declare const PerpBlockSchema: z.ZodObject<{
    exchange: z.ZodNullable<z.ZodString>;
    chain_id: z.ZodNullable<z.ZodString>;
    block_number: z.ZodNumber;
    batch_number: z.ZodNumber;
    block_status: z.ZodNullable<z.ZodString>;
    block_time: z.ZodString;
    total_transactions: z.ZodNumber;
    logs_count: z.ZodNumber;
    trades_count: z.ZodNumber;
    commit_tx_hash: z.ZodNullable<z.ZodString>;
    verify_tx_hash: z.ZodNullable<z.ZodString>;
    execute_tx_hash: z.ZodNullable<z.ZodString>;
    scraped_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    exchange: string | null;
    chain_id: string | null;
    block_number: number;
    batch_number: number;
    block_status: string | null;
    block_time: string;
    total_transactions: number;
    logs_count: number;
    trades_count: number;
    commit_tx_hash: string | null;
    verify_tx_hash: string | null;
    execute_tx_hash: string | null;
    scraped_at: string;
}, {
    exchange: string | null;
    chain_id: string | null;
    block_number: number;
    batch_number: number;
    block_status: string | null;
    block_time: string;
    total_transactions: number;
    logs_count: number;
    trades_count: number;
    commit_tx_hash: string | null;
    verify_tx_hash: string | null;
    execute_tx_hash: string | null;
    scraped_at: string;
}>;
export type PerpBlock = z.infer<typeof PerpBlockSchema>;
export declare const PerpBlocksResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        exchange: z.ZodNullable<z.ZodString>;
        chain_id: z.ZodNullable<z.ZodString>;
        block_number: z.ZodNumber;
        batch_number: z.ZodNumber;
        block_status: z.ZodNullable<z.ZodString>;
        block_time: z.ZodString;
        total_transactions: z.ZodNumber;
        logs_count: z.ZodNumber;
        trades_count: z.ZodNumber;
        commit_tx_hash: z.ZodNullable<z.ZodString>;
        verify_tx_hash: z.ZodNullable<z.ZodString>;
        execute_tx_hash: z.ZodNullable<z.ZodString>;
        scraped_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        exchange: string | null;
        chain_id: string | null;
        block_number: number;
        batch_number: number;
        block_status: string | null;
        block_time: string;
        total_transactions: number;
        logs_count: number;
        trades_count: number;
        commit_tx_hash: string | null;
        verify_tx_hash: string | null;
        execute_tx_hash: string | null;
        scraped_at: string;
    }, {
        exchange: string | null;
        chain_id: string | null;
        block_number: number;
        batch_number: number;
        block_status: string | null;
        block_time: string;
        total_transactions: number;
        logs_count: number;
        trades_count: number;
        commit_tx_hash: string | null;
        verify_tx_hash: string | null;
        execute_tx_hash: string | null;
        scraped_at: string;
    }>, "many">;
    pagination: z.ZodObject<{
        page: z.ZodNumber;
        totalPages: z.ZodNumber;
        totalItems: z.ZodNumber;
        limit: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        page: number;
        totalPages: number;
        totalItems: number;
    }, {
        limit: number;
        page: number;
        totalPages: number;
        totalItems: number;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        exchange: string | null;
        chain_id: string | null;
        block_number: number;
        batch_number: number;
        block_status: string | null;
        block_time: string;
        total_transactions: number;
        logs_count: number;
        trades_count: number;
        commit_tx_hash: string | null;
        verify_tx_hash: string | null;
        execute_tx_hash: string | null;
        scraped_at: string;
    }[];
    pagination: {
        limit: number;
        page: number;
        totalPages: number;
        totalItems: number;
    };
}, {
    data: {
        exchange: string | null;
        chain_id: string | null;
        block_number: number;
        batch_number: number;
        block_status: string | null;
        block_time: string;
        total_transactions: number;
        logs_count: number;
        trades_count: number;
        commit_tx_hash: string | null;
        verify_tx_hash: string | null;
        execute_tx_hash: string | null;
        scraped_at: string;
    }[];
    pagination: {
        limit: number;
        page: number;
        totalPages: number;
        totalItems: number;
    };
}>;
export type PerpBlocksResponse = z.infer<typeof PerpBlocksResponseSchema>;
