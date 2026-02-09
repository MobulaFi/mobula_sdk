import type { MarketDetailsOutputType } from './MarketDetailsOutput.ts';
import type { TokenDetailsOutputType } from './TokenDetailsOutput.ts';
export interface BaseMessageType {
    pair: string;
    date: number;
    token_price: number;
    token_price_vs: number;
    token_amount: number;
    token_amount_vs: number;
    token_amount_usd: number | undefined;
    type: string;
    operation: string;
    blockchain: string;
    hash: string;
    sender: string;
    token_amount_raw: string;
    token_amount_raw_vs: string;
    labels?: string[];
    pairData?: MarketDetailsOutputType;
    tokenData?: TokenDetailsOutputType;
    preBalanceBaseToken: string | null;
    preBalanceQuoteToken: string | null;
    postBalanceBaseToken: string | null;
    postBalanceQuoteToken: string | null;
    platform?: string | null;
    swapRecipient?: string | null;
}
