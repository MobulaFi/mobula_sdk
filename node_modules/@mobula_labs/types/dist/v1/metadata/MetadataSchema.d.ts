import { z } from 'zod';
export declare const MetadataParamsSchema: z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    id: z.ZodOptional<z.ZodString>;
    asset: z.ZodOptional<z.ZodString>;
    blockchain: z.ZodOptional<z.ZodString>;
    force: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    full: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strict", z.ZodTypeAny, {
    force: boolean;
    full: boolean;
    symbol?: string | undefined;
    id?: string | undefined;
    blockchain?: string | undefined;
    asset?: string | undefined;
}, {
    symbol?: string | undefined;
    id?: string | undefined;
    blockchain?: string | undefined;
    asset?: string | undefined;
    force?: boolean | undefined;
    full?: boolean | undefined;
}>;
export type MetadataParams = z.input<typeof MetadataParamsSchema>;
export declare const MultiMetadataParamsSchema: z.ZodEffects<z.ZodObject<{
    ids: z.ZodOptional<z.ZodString>;
    assets: z.ZodOptional<z.ZodString>;
    blockchains: z.ZodOptional<z.ZodString>;
    symbols: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    blockchains?: string | undefined;
    ids?: string | undefined;
    symbols?: string | undefined;
    assets?: string | undefined;
}, {
    blockchains?: string | undefined;
    ids?: string | undefined;
    symbols?: string | undefined;
    assets?: string | undefined;
}>, {
    ids: string[] | undefined;
    assets: string[] | undefined;
    blockchains: string[] | undefined;
    symbols: string[] | undefined;
}, {
    blockchains?: string | undefined;
    ids?: string | undefined;
    symbols?: string | undefined;
    assets?: string | undefined;
}>;
export type MultiMetadataParams = z.input<typeof MultiMetadataParamsSchema>;
export declare const MetadataResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodNullable<z.ZodNumber>;
        name: z.ZodString;
        symbol: z.ZodString;
        rank: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        contracts: z.ZodArray<z.ZodString, "many">;
        blockchains: z.ZodArray<z.ZodString, "many">;
        decimals: z.ZodArray<z.ZodNumber, "many">;
        twitter: z.ZodNullable<z.ZodString>;
        website: z.ZodNullable<z.ZodString>;
        logo: z.ZodNullable<z.ZodString>;
        price: z.ZodNullable<z.ZodNumber>;
        market_cap: z.ZodNumber;
        liquidity: z.ZodNumber;
        volume: z.ZodNumber;
        description: z.ZodNullable<z.ZodString>;
        kyc: z.ZodNullable<z.ZodString>;
        audit: z.ZodNullable<z.ZodString>;
        total_supply_contracts: z.ZodArray<z.ZodString, "many">;
        circulating_supply_addresses: z.ZodArray<z.ZodString, "many">;
        total_supply: z.ZodNumber;
        circulating_supply: z.ZodNumber;
        discord: z.ZodNullable<z.ZodString>;
        max_supply: z.ZodNullable<z.ZodNumber>;
        chat: z.ZodNullable<z.ZodString>;
        tags: z.ZodArray<z.ZodString, "many">;
        investors: z.ZodArray<z.ZodObject<{
            lead: z.ZodBoolean;
            name: z.ZodString;
            type: z.ZodString;
            image: z.ZodString;
            country_name: z.ZodString;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            description: string;
            name: string;
            lead: boolean;
            image: string;
            country_name: string;
        }, {
            type: string;
            description: string;
            name: string;
            lead: boolean;
            image: string;
            country_name: string;
        }>, "many">;
        distribution: z.ZodArray<z.ZodObject<{
            percentage: z.ZodNumber;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            percentage: number;
        }, {
            name: string;
            percentage: number;
        }>, "many">;
        release_schedule: z.ZodArray<z.ZodObject<{
            allocation_details: z.ZodRecord<z.ZodString, z.ZodNumber>;
            tokens_to_unlock: z.ZodNumber;
            unlock_date: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            allocation_details: Record<string, number>;
            tokens_to_unlock: number;
            unlock_date: number;
        }, {
            allocation_details: Record<string, number>;
            tokens_to_unlock: number;
            unlock_date: number;
        }>, "many">;
        cexs: z.ZodArray<z.ZodObject<{
            logo: z.ZodNullable<z.ZodString>;
            name: z.ZodNullable<z.ZodString>;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string | null;
            id: string;
            logo: string | null;
        }, {
            name: string | null;
            id: string;
            logo: string | null;
        }>, "many">;
        listed_at: z.ZodNullable<z.ZodDate>;
        deployer: z.ZodNullable<z.ZodString>;
        source: z.ZodNullable<z.ZodString>;
        others: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        dexscreener_listed: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        dexscreener_header: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        dexscreener_ad_paid: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        live_status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        live_thumbnail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        livestream_title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        live_reply_count: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        telegram: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        twitterRenameCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        twitterRenameHistory: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            username: z.ZodString;
            last_checked: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            username: string;
            last_checked: string;
        }, {
            username: string;
            last_checked: string;
        }>, "many">>>;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        description: string | null;
        name: string;
        tags: string[];
        decimals: number[];
        id: number | null;
        logo: string | null;
        source: string | null;
        deployer: string | null;
        twitter: string | null;
        website: string | null;
        price: number | null;
        liquidity: number;
        market_cap: number;
        cexs: {
            name: string | null;
            id: string;
            logo: string | null;
        }[];
        volume: number;
        blockchains: string[];
        contracts: string[];
        chat: string | null;
        total_supply: number;
        circulating_supply: number;
        kyc: string | null;
        audit: string | null;
        total_supply_contracts: string[];
        circulating_supply_addresses: string[];
        discord: string | null;
        max_supply: number | null;
        investors: {
            type: string;
            description: string;
            name: string;
            lead: boolean;
            image: string;
            country_name: string;
        }[];
        distribution: {
            name: string;
            percentage: number;
        }[];
        release_schedule: {
            allocation_details: Record<string, number>;
            tokens_to_unlock: number;
            unlock_date: number;
        }[];
        listed_at: Date | null;
        telegram?: string | null | undefined;
        others?: Record<string, unknown> | null | undefined;
        twitterRenameCount?: number | null | undefined;
        twitterRenameHistory?: {
            username: string;
            last_checked: string;
        }[] | null | undefined;
        rank?: number | null | undefined;
        dexscreener_listed?: boolean | null | undefined;
        dexscreener_header?: string | null | undefined;
        dexscreener_ad_paid?: boolean | null | undefined;
        live_status?: string | null | undefined;
        live_thumbnail?: string | null | undefined;
        livestream_title?: string | null | undefined;
        live_reply_count?: number | null | undefined;
    }, {
        symbol: string;
        description: string | null;
        name: string;
        tags: string[];
        decimals: number[];
        id: number | null;
        logo: string | null;
        source: string | null;
        deployer: string | null;
        twitter: string | null;
        website: string | null;
        price: number | null;
        liquidity: number;
        market_cap: number;
        cexs: {
            name: string | null;
            id: string;
            logo: string | null;
        }[];
        volume: number;
        blockchains: string[];
        contracts: string[];
        chat: string | null;
        total_supply: number;
        circulating_supply: number;
        kyc: string | null;
        audit: string | null;
        total_supply_contracts: string[];
        circulating_supply_addresses: string[];
        discord: string | null;
        max_supply: number | null;
        investors: {
            type: string;
            description: string;
            name: string;
            lead: boolean;
            image: string;
            country_name: string;
        }[];
        distribution: {
            name: string;
            percentage: number;
        }[];
        release_schedule: {
            allocation_details: Record<string, number>;
            tokens_to_unlock: number;
            unlock_date: number;
        }[];
        listed_at: Date | null;
        telegram?: string | null | undefined;
        others?: Record<string, unknown> | null | undefined;
        twitterRenameCount?: number | null | undefined;
        twitterRenameHistory?: {
            username: string;
            last_checked: string;
        }[] | null | undefined;
        rank?: number | null | undefined;
        dexscreener_listed?: boolean | null | undefined;
        dexscreener_header?: string | null | undefined;
        dexscreener_ad_paid?: boolean | null | undefined;
        live_status?: string | null | undefined;
        live_thumbnail?: string | null | undefined;
        livestream_title?: string | null | undefined;
        live_reply_count?: number | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        symbol: string;
        description: string | null;
        name: string;
        tags: string[];
        decimals: number[];
        id: number | null;
        logo: string | null;
        source: string | null;
        deployer: string | null;
        twitter: string | null;
        website: string | null;
        price: number | null;
        liquidity: number;
        market_cap: number;
        cexs: {
            name: string | null;
            id: string;
            logo: string | null;
        }[];
        volume: number;
        blockchains: string[];
        contracts: string[];
        chat: string | null;
        total_supply: number;
        circulating_supply: number;
        kyc: string | null;
        audit: string | null;
        total_supply_contracts: string[];
        circulating_supply_addresses: string[];
        discord: string | null;
        max_supply: number | null;
        investors: {
            type: string;
            description: string;
            name: string;
            lead: boolean;
            image: string;
            country_name: string;
        }[];
        distribution: {
            name: string;
            percentage: number;
        }[];
        release_schedule: {
            allocation_details: Record<string, number>;
            tokens_to_unlock: number;
            unlock_date: number;
        }[];
        listed_at: Date | null;
        telegram?: string | null | undefined;
        others?: Record<string, unknown> | null | undefined;
        twitterRenameCount?: number | null | undefined;
        twitterRenameHistory?: {
            username: string;
            last_checked: string;
        }[] | null | undefined;
        rank?: number | null | undefined;
        dexscreener_listed?: boolean | null | undefined;
        dexscreener_header?: string | null | undefined;
        dexscreener_ad_paid?: boolean | null | undefined;
        live_status?: string | null | undefined;
        live_thumbnail?: string | null | undefined;
        livestream_title?: string | null | undefined;
        live_reply_count?: number | null | undefined;
    };
}, {
    data: {
        symbol: string;
        description: string | null;
        name: string;
        tags: string[];
        decimals: number[];
        id: number | null;
        logo: string | null;
        source: string | null;
        deployer: string | null;
        twitter: string | null;
        website: string | null;
        price: number | null;
        liquidity: number;
        market_cap: number;
        cexs: {
            name: string | null;
            id: string;
            logo: string | null;
        }[];
        volume: number;
        blockchains: string[];
        contracts: string[];
        chat: string | null;
        total_supply: number;
        circulating_supply: number;
        kyc: string | null;
        audit: string | null;
        total_supply_contracts: string[];
        circulating_supply_addresses: string[];
        discord: string | null;
        max_supply: number | null;
        investors: {
            type: string;
            description: string;
            name: string;
            lead: boolean;
            image: string;
            country_name: string;
        }[];
        distribution: {
            name: string;
            percentage: number;
        }[];
        release_schedule: {
            allocation_details: Record<string, number>;
            tokens_to_unlock: number;
            unlock_date: number;
        }[];
        listed_at: Date | null;
        telegram?: string | null | undefined;
        others?: Record<string, unknown> | null | undefined;
        twitterRenameCount?: number | null | undefined;
        twitterRenameHistory?: {
            username: string;
            last_checked: string;
        }[] | null | undefined;
        rank?: number | null | undefined;
        dexscreener_listed?: boolean | null | undefined;
        dexscreener_header?: string | null | undefined;
        dexscreener_ad_paid?: boolean | null | undefined;
        live_status?: string | null | undefined;
        live_thumbnail?: string | null | undefined;
        livestream_title?: string | null | undefined;
        live_reply_count?: number | null | undefined;
    };
}>;
export type MetadataResponse = z.infer<typeof MetadataResponseSchema>;
export declare const MultiMetadataResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodOptional<z.ZodObject<{
        data: z.ZodObject<{
            id: z.ZodNullable<z.ZodNumber>;
            name: z.ZodString;
            symbol: z.ZodString;
            rank: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            contracts: z.ZodArray<z.ZodString, "many">;
            blockchains: z.ZodArray<z.ZodString, "many">;
            decimals: z.ZodArray<z.ZodNumber, "many">;
            twitter: z.ZodNullable<z.ZodString>;
            website: z.ZodNullable<z.ZodString>;
            logo: z.ZodNullable<z.ZodString>;
            price: z.ZodNullable<z.ZodNumber>;
            market_cap: z.ZodNumber;
            liquidity: z.ZodNumber;
            volume: z.ZodNumber;
            description: z.ZodNullable<z.ZodString>;
            kyc: z.ZodNullable<z.ZodString>;
            audit: z.ZodNullable<z.ZodString>;
            total_supply_contracts: z.ZodArray<z.ZodString, "many">;
            circulating_supply_addresses: z.ZodArray<z.ZodString, "many">;
            total_supply: z.ZodNumber;
            circulating_supply: z.ZodNumber;
            discord: z.ZodNullable<z.ZodString>;
            max_supply: z.ZodNullable<z.ZodNumber>;
            chat: z.ZodNullable<z.ZodString>;
            tags: z.ZodArray<z.ZodString, "many">;
            investors: z.ZodArray<z.ZodObject<{
                lead: z.ZodBoolean;
                name: z.ZodString;
                type: z.ZodString;
                image: z.ZodString;
                country_name: z.ZodString;
                description: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: string;
                description: string;
                name: string;
                lead: boolean;
                image: string;
                country_name: string;
            }, {
                type: string;
                description: string;
                name: string;
                lead: boolean;
                image: string;
                country_name: string;
            }>, "many">;
            distribution: z.ZodArray<z.ZodObject<{
                percentage: z.ZodNumber;
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
                percentage: number;
            }, {
                name: string;
                percentage: number;
            }>, "many">;
            release_schedule: z.ZodArray<z.ZodObject<{
                allocation_details: z.ZodRecord<z.ZodString, z.ZodNumber>;
                tokens_to_unlock: z.ZodNumber;
                unlock_date: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                allocation_details: Record<string, number>;
                tokens_to_unlock: number;
                unlock_date: number;
            }, {
                allocation_details: Record<string, number>;
                tokens_to_unlock: number;
                unlock_date: number;
            }>, "many">;
            cexs: z.ZodArray<z.ZodObject<{
                logo: z.ZodNullable<z.ZodString>;
                name: z.ZodNullable<z.ZodString>;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string | null;
                id: string;
                logo: string | null;
            }, {
                name: string | null;
                id: string;
                logo: string | null;
            }>, "many">;
            listed_at: z.ZodNullable<z.ZodDate>;
            deployer: z.ZodNullable<z.ZodString>;
            source: z.ZodNullable<z.ZodString>;
            others: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            dexscreener_listed: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            dexscreener_header: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            dexscreener_ad_paid: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            live_status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            live_thumbnail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            livestream_title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            live_reply_count: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            telegram: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            twitterRenameCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            twitterRenameHistory: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
                username: z.ZodString;
                last_checked: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                username: string;
                last_checked: string;
            }, {
                username: string;
                last_checked: string;
            }>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            symbol: string;
            description: string | null;
            name: string;
            tags: string[];
            decimals: number[];
            id: number | null;
            logo: string | null;
            source: string | null;
            deployer: string | null;
            twitter: string | null;
            website: string | null;
            price: number | null;
            liquidity: number;
            market_cap: number;
            cexs: {
                name: string | null;
                id: string;
                logo: string | null;
            }[];
            volume: number;
            blockchains: string[];
            contracts: string[];
            chat: string | null;
            total_supply: number;
            circulating_supply: number;
            kyc: string | null;
            audit: string | null;
            total_supply_contracts: string[];
            circulating_supply_addresses: string[];
            discord: string | null;
            max_supply: number | null;
            investors: {
                type: string;
                description: string;
                name: string;
                lead: boolean;
                image: string;
                country_name: string;
            }[];
            distribution: {
                name: string;
                percentage: number;
            }[];
            release_schedule: {
                allocation_details: Record<string, number>;
                tokens_to_unlock: number;
                unlock_date: number;
            }[];
            listed_at: Date | null;
            telegram?: string | null | undefined;
            others?: Record<string, unknown> | null | undefined;
            twitterRenameCount?: number | null | undefined;
            twitterRenameHistory?: {
                username: string;
                last_checked: string;
            }[] | null | undefined;
            rank?: number | null | undefined;
            dexscreener_listed?: boolean | null | undefined;
            dexscreener_header?: string | null | undefined;
            dexscreener_ad_paid?: boolean | null | undefined;
            live_status?: string | null | undefined;
            live_thumbnail?: string | null | undefined;
            livestream_title?: string | null | undefined;
            live_reply_count?: number | null | undefined;
        }, {
            symbol: string;
            description: string | null;
            name: string;
            tags: string[];
            decimals: number[];
            id: number | null;
            logo: string | null;
            source: string | null;
            deployer: string | null;
            twitter: string | null;
            website: string | null;
            price: number | null;
            liquidity: number;
            market_cap: number;
            cexs: {
                name: string | null;
                id: string;
                logo: string | null;
            }[];
            volume: number;
            blockchains: string[];
            contracts: string[];
            chat: string | null;
            total_supply: number;
            circulating_supply: number;
            kyc: string | null;
            audit: string | null;
            total_supply_contracts: string[];
            circulating_supply_addresses: string[];
            discord: string | null;
            max_supply: number | null;
            investors: {
                type: string;
                description: string;
                name: string;
                lead: boolean;
                image: string;
                country_name: string;
            }[];
            distribution: {
                name: string;
                percentage: number;
            }[];
            release_schedule: {
                allocation_details: Record<string, number>;
                tokens_to_unlock: number;
                unlock_date: number;
            }[];
            listed_at: Date | null;
            telegram?: string | null | undefined;
            others?: Record<string, unknown> | null | undefined;
            twitterRenameCount?: number | null | undefined;
            twitterRenameHistory?: {
                username: string;
                last_checked: string;
            }[] | null | undefined;
            rank?: number | null | undefined;
            dexscreener_listed?: boolean | null | undefined;
            dexscreener_header?: string | null | undefined;
            dexscreener_ad_paid?: boolean | null | undefined;
            live_status?: string | null | undefined;
            live_thumbnail?: string | null | undefined;
            livestream_title?: string | null | undefined;
            live_reply_count?: number | null | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: {
            symbol: string;
            description: string | null;
            name: string;
            tags: string[];
            decimals: number[];
            id: number | null;
            logo: string | null;
            source: string | null;
            deployer: string | null;
            twitter: string | null;
            website: string | null;
            price: number | null;
            liquidity: number;
            market_cap: number;
            cexs: {
                name: string | null;
                id: string;
                logo: string | null;
            }[];
            volume: number;
            blockchains: string[];
            contracts: string[];
            chat: string | null;
            total_supply: number;
            circulating_supply: number;
            kyc: string | null;
            audit: string | null;
            total_supply_contracts: string[];
            circulating_supply_addresses: string[];
            discord: string | null;
            max_supply: number | null;
            investors: {
                type: string;
                description: string;
                name: string;
                lead: boolean;
                image: string;
                country_name: string;
            }[];
            distribution: {
                name: string;
                percentage: number;
            }[];
            release_schedule: {
                allocation_details: Record<string, number>;
                tokens_to_unlock: number;
                unlock_date: number;
            }[];
            listed_at: Date | null;
            telegram?: string | null | undefined;
            others?: Record<string, unknown> | null | undefined;
            twitterRenameCount?: number | null | undefined;
            twitterRenameHistory?: {
                username: string;
                last_checked: string;
            }[] | null | undefined;
            rank?: number | null | undefined;
            dexscreener_listed?: boolean | null | undefined;
            dexscreener_header?: string | null | undefined;
            dexscreener_ad_paid?: boolean | null | undefined;
            live_status?: string | null | undefined;
            live_thumbnail?: string | null | undefined;
            livestream_title?: string | null | undefined;
            live_reply_count?: number | null | undefined;
        };
    }, {
        data: {
            symbol: string;
            description: string | null;
            name: string;
            tags: string[];
            decimals: number[];
            id: number | null;
            logo: string | null;
            source: string | null;
            deployer: string | null;
            twitter: string | null;
            website: string | null;
            price: number | null;
            liquidity: number;
            market_cap: number;
            cexs: {
                name: string | null;
                id: string;
                logo: string | null;
            }[];
            volume: number;
            blockchains: string[];
            contracts: string[];
            chat: string | null;
            total_supply: number;
            circulating_supply: number;
            kyc: string | null;
            audit: string | null;
            total_supply_contracts: string[];
            circulating_supply_addresses: string[];
            discord: string | null;
            max_supply: number | null;
            investors: {
                type: string;
                description: string;
                name: string;
                lead: boolean;
                image: string;
                country_name: string;
            }[];
            distribution: {
                name: string;
                percentage: number;
            }[];
            release_schedule: {
                allocation_details: Record<string, number>;
                tokens_to_unlock: number;
                unlock_date: number;
            }[];
            listed_at: Date | null;
            telegram?: string | null | undefined;
            others?: Record<string, unknown> | null | undefined;
            twitterRenameCount?: number | null | undefined;
            twitterRenameHistory?: {
                username: string;
                last_checked: string;
            }[] | null | undefined;
            rank?: number | null | undefined;
            dexscreener_listed?: boolean | null | undefined;
            dexscreener_header?: string | null | undefined;
            dexscreener_ad_paid?: boolean | null | undefined;
            live_status?: string | null | undefined;
            live_thumbnail?: string | null | undefined;
            livestream_title?: string | null | undefined;
            live_reply_count?: number | null | undefined;
        };
    }>>, "many">;
}, "strip", z.ZodTypeAny, {
    data: ({
        data: {
            symbol: string;
            description: string | null;
            name: string;
            tags: string[];
            decimals: number[];
            id: number | null;
            logo: string | null;
            source: string | null;
            deployer: string | null;
            twitter: string | null;
            website: string | null;
            price: number | null;
            liquidity: number;
            market_cap: number;
            cexs: {
                name: string | null;
                id: string;
                logo: string | null;
            }[];
            volume: number;
            blockchains: string[];
            contracts: string[];
            chat: string | null;
            total_supply: number;
            circulating_supply: number;
            kyc: string | null;
            audit: string | null;
            total_supply_contracts: string[];
            circulating_supply_addresses: string[];
            discord: string | null;
            max_supply: number | null;
            investors: {
                type: string;
                description: string;
                name: string;
                lead: boolean;
                image: string;
                country_name: string;
            }[];
            distribution: {
                name: string;
                percentage: number;
            }[];
            release_schedule: {
                allocation_details: Record<string, number>;
                tokens_to_unlock: number;
                unlock_date: number;
            }[];
            listed_at: Date | null;
            telegram?: string | null | undefined;
            others?: Record<string, unknown> | null | undefined;
            twitterRenameCount?: number | null | undefined;
            twitterRenameHistory?: {
                username: string;
                last_checked: string;
            }[] | null | undefined;
            rank?: number | null | undefined;
            dexscreener_listed?: boolean | null | undefined;
            dexscreener_header?: string | null | undefined;
            dexscreener_ad_paid?: boolean | null | undefined;
            live_status?: string | null | undefined;
            live_thumbnail?: string | null | undefined;
            livestream_title?: string | null | undefined;
            live_reply_count?: number | null | undefined;
        };
    } | undefined)[];
}, {
    data: ({
        data: {
            symbol: string;
            description: string | null;
            name: string;
            tags: string[];
            decimals: number[];
            id: number | null;
            logo: string | null;
            source: string | null;
            deployer: string | null;
            twitter: string | null;
            website: string | null;
            price: number | null;
            liquidity: number;
            market_cap: number;
            cexs: {
                name: string | null;
                id: string;
                logo: string | null;
            }[];
            volume: number;
            blockchains: string[];
            contracts: string[];
            chat: string | null;
            total_supply: number;
            circulating_supply: number;
            kyc: string | null;
            audit: string | null;
            total_supply_contracts: string[];
            circulating_supply_addresses: string[];
            discord: string | null;
            max_supply: number | null;
            investors: {
                type: string;
                description: string;
                name: string;
                lead: boolean;
                image: string;
                country_name: string;
            }[];
            distribution: {
                name: string;
                percentage: number;
            }[];
            release_schedule: {
                allocation_details: Record<string, number>;
                tokens_to_unlock: number;
                unlock_date: number;
            }[];
            listed_at: Date | null;
            telegram?: string | null | undefined;
            others?: Record<string, unknown> | null | undefined;
            twitterRenameCount?: number | null | undefined;
            twitterRenameHistory?: {
                username: string;
                last_checked: string;
            }[] | null | undefined;
            rank?: number | null | undefined;
            dexscreener_listed?: boolean | null | undefined;
            dexscreener_header?: string | null | undefined;
            dexscreener_ad_paid?: boolean | null | undefined;
            live_status?: string | null | undefined;
            live_thumbnail?: string | null | undefined;
            livestream_title?: string | null | undefined;
            live_reply_count?: number | null | undefined;
        };
    } | undefined)[];
}>;
export type MultiMetadataResponse = z.infer<typeof MultiMetadataResponseSchema>;
