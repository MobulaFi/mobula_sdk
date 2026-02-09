import { z } from 'zod';
export declare const WalletSmartMoneyResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        wallet_address: z.ZodString;
        realized_pnl: z.ZodNumber;
        unrealized_pnl: z.ZodNumber;
        txns_count: z.ZodNumber;
        volume: z.ZodNumber;
        blockchains: z.ZodArray<z.ZodString, "many">;
        win_rate: z.ZodNumber;
        tokens_distribution: z.ZodObject<{
            '10x+': z.ZodNumber;
            '4x - 10x': z.ZodNumber;
            '2x - 4x': z.ZodNumber;
            '10% - 2x': z.ZodNumber;
            '-10% - 10%': z.ZodNumber;
            '-50% - -10%': z.ZodNumber;
            '-100% - -50%': z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            '10x+': number;
            '4x - 10x': number;
            '2x - 4x': number;
            '10% - 2x': number;
            '-10% - 10%': number;
            '-50% - -10%': number;
            '-100% - -50%': number;
        }, {
            '10x+': number;
            '4x - 10x': number;
            '2x - 4x': number;
            '10% - 2x': number;
            '-10% - 10%': number;
            '-50% - -10%': number;
            '-100% - -50%': number;
        }>;
        top_3_tokens: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodNumber>, "many">;
    }, "strip", z.ZodTypeAny, {
        volume: number;
        blockchains: string[];
        realized_pnl: number;
        unrealized_pnl: number;
        win_rate: number;
        tokens_distribution: {
            '10x+': number;
            '4x - 10x': number;
            '2x - 4x': number;
            '10% - 2x': number;
            '-10% - 10%': number;
            '-50% - -10%': number;
            '-100% - -50%': number;
        };
        wallet_address: string;
        txns_count: number;
        top_3_tokens: Record<string, number>[];
    }, {
        volume: number;
        blockchains: string[];
        realized_pnl: number;
        unrealized_pnl: number;
        win_rate: number;
        tokens_distribution: {
            '10x+': number;
            '4x - 10x': number;
            '2x - 4x': number;
            '10% - 2x': number;
            '-10% - 10%': number;
            '-50% - -10%': number;
            '-100% - -50%': number;
        };
        wallet_address: string;
        txns_count: number;
        top_3_tokens: Record<string, number>[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        volume: number;
        blockchains: string[];
        realized_pnl: number;
        unrealized_pnl: number;
        win_rate: number;
        tokens_distribution: {
            '10x+': number;
            '4x - 10x': number;
            '2x - 4x': number;
            '10% - 2x': number;
            '-10% - 10%': number;
            '-50% - -10%': number;
            '-100% - -50%': number;
        };
        wallet_address: string;
        txns_count: number;
        top_3_tokens: Record<string, number>[];
    }[];
}, {
    data: {
        volume: number;
        blockchains: string[];
        realized_pnl: number;
        unrealized_pnl: number;
        win_rate: number;
        tokens_distribution: {
            '10x+': number;
            '4x - 10x': number;
            '2x - 4x': number;
            '10% - 2x': number;
            '-10% - 10%': number;
            '-50% - -10%': number;
            '-100% - -50%': number;
        };
        wallet_address: string;
        txns_count: number;
        top_3_tokens: Record<string, number>[];
    }[];
}>;
export type WalletSmartMoneyResponse = z.infer<typeof WalletSmartMoneyResponseSchema>;
