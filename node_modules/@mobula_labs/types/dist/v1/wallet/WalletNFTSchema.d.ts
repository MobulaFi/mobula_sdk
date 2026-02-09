import { z } from 'zod';
export declare const WalletNFTParamsSchema: z.ZodObject<{
    wallet: z.ZodString;
    blockchains: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    offset: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    pagination: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    limit: string;
    offset: string;
    wallet: string;
    pagination: string;
    page: string;
    blockchains?: string | undefined;
}, {
    wallet: string;
    blockchains?: string | undefined;
    limit?: string | undefined;
    offset?: string | undefined;
    pagination?: string | undefined;
    page?: string | undefined;
}>;
export type WalletNFTParams = z.input<typeof WalletNFTParamsSchema>;
export declare const WalletNFTResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        token_address: z.ZodString;
        token_id: z.ZodString;
        token_uri: z.ZodString;
        amount: z.ZodString;
        owner_of: z.ZodString;
        name: z.ZodString;
        symbol: z.ZodString;
        blockchain: z.ZodString;
        chain_id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        name: string;
        blockchain: string;
        amount: string;
        token_address: string;
        token_id: string;
        token_uri: string;
        owner_of: string;
        chain_id: string;
    }, {
        symbol: string;
        name: string;
        blockchain: string;
        amount: string;
        token_address: string;
        token_id: string;
        token_uri: string;
        owner_of: string;
        chain_id: string;
    }>, "many">;
    pagination: z.ZodNullable<z.ZodObject<{
        total: z.ZodNumber;
        page: z.ZodNumber;
        offset: z.ZodNumber;
        limit: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        offset: number;
        total: number;
        page: number;
    }, {
        limit: number;
        offset: number;
        total: number;
        page: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    data: {
        symbol: string;
        name: string;
        blockchain: string;
        amount: string;
        token_address: string;
        token_id: string;
        token_uri: string;
        owner_of: string;
        chain_id: string;
    }[];
    pagination: {
        limit: number;
        offset: number;
        total: number;
        page: number;
    } | null;
}, {
    data: {
        symbol: string;
        name: string;
        blockchain: string;
        amount: string;
        token_address: string;
        token_id: string;
        token_uri: string;
        owner_of: string;
        chain_id: string;
    }[];
    pagination: {
        limit: number;
        offset: number;
        total: number;
        page: number;
    } | null;
}>;
export type WalletNFTResponse = z.infer<typeof WalletNFTResponseSchema>;
export declare const NFTMetadataParamsSchema: z.ZodObject<{
    address: z.ZodString;
    blockchain: z.ZodString;
}, "strip", z.ZodTypeAny, {
    address: string;
    blockchain: string;
}, {
    address: string;
    blockchain: string;
}>;
export type NFTMetadataParams = z.input<typeof NFTMetadataParamsSchema>;
export declare const NFTMetadataResponseSchema: z.ZodObject<{
    name: z.ZodString;
    symbol: z.ZodString;
    address: z.ZodString;
    chain_id: z.ZodString;
    logo: z.ZodString;
    website: z.ZodString;
    telegram: z.ZodString;
    twitter: z.ZodString;
    discord: z.ZodString;
    totalSupply: z.ZodBigInt;
    URI: z.ZodString;
}, "strip", z.ZodTypeAny, {
    symbol: string;
    name: string;
    address: string;
    totalSupply: bigint;
    logo: string;
    twitter: string;
    website: string;
    telegram: string;
    discord: string;
    chain_id: string;
    URI: string;
}, {
    symbol: string;
    name: string;
    address: string;
    totalSupply: bigint;
    logo: string;
    twitter: string;
    website: string;
    telegram: string;
    discord: string;
    chain_id: string;
    URI: string;
}>;
export type NFTMetadataResponse = z.infer<typeof NFTMetadataResponseSchema>;
