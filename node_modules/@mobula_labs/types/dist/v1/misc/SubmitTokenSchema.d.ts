import { z } from 'zod';
export declare const formattedJSONSchema: z.ZodObject<{
    name: z.ZodString;
    symbol: z.ZodString;
    type: z.ZodString;
    description: z.ZodString;
    categories: z.ZodArray<z.ZodString, "many">;
    completed: z.ZodBoolean;
    links: z.ZodObject<{
        website: z.ZodString;
        twitter: z.ZodString;
        telegram: z.ZodString;
        discord: z.ZodString;
        github: z.ZodString;
        audits: z.ZodArray<z.ZodString, "many">;
        kycs: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        twitter: string;
        website: string;
        telegram: string;
        discord: string;
        github: string;
        audits: string[];
        kycs: string[];
    }, {
        twitter: string;
        website: string;
        telegram: string;
        discord: string;
        github: string;
        audits: string[];
        kycs: string[];
    }>;
    contracts: z.ZodArray<z.ZodObject<{
        address: z.ZodString;
        blockchain: z.ZodString;
        blockchain_id: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        address: string;
        blockchain: string;
        blockchain_id: number;
    }, {
        address: string;
        blockchain: string;
        blockchain_id: number;
    }>, "many">;
    totalSupplyContracts: z.ZodArray<z.ZodObject<{
        address: z.ZodString;
        blockchain: z.ZodString;
        blockchain_id: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        address: string;
        blockchain: string;
        blockchain_id: number;
    }, {
        address: string;
        blockchain: string;
        blockchain_id: number;
    }>, "many">;
    excludedFromCirculationAddresses: z.ZodArray<z.ZodString, "many">;
    tokenomics: z.ZodObject<{
        distribution: z.ZodArray<z.ZodString, "many">;
        sales: z.ZodArray<z.ZodString, "many">;
        vestingSchedule: z.ZodArray<z.ZodString, "many">;
        fees: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        distribution: string[];
        sales: string[];
        vestingSchedule: string[];
        fees: string[];
    }, {
        distribution: string[];
        sales: string[];
        vestingSchedule: string[];
        fees: string[];
    }>;
    init: z.ZodBoolean;
    logo: z.ZodString;
}, "strip", z.ZodTypeAny, {
    symbol: string;
    type: string;
    description: string;
    name: string;
    logo: string;
    contracts: {
        address: string;
        blockchain: string;
        blockchain_id: number;
    }[];
    categories: string[];
    completed: boolean;
    links: {
        twitter: string;
        website: string;
        telegram: string;
        discord: string;
        github: string;
        audits: string[];
        kycs: string[];
    };
    totalSupplyContracts: {
        address: string;
        blockchain: string;
        blockchain_id: number;
    }[];
    excludedFromCirculationAddresses: string[];
    tokenomics: {
        distribution: string[];
        sales: string[];
        vestingSchedule: string[];
        fees: string[];
    };
    init: boolean;
}, {
    symbol: string;
    type: string;
    description: string;
    name: string;
    logo: string;
    contracts: {
        address: string;
        blockchain: string;
        blockchain_id: number;
    }[];
    categories: string[];
    completed: boolean;
    links: {
        twitter: string;
        website: string;
        telegram: string;
        discord: string;
        github: string;
        audits: string[];
        kycs: string[];
    };
    totalSupplyContracts: {
        address: string;
        blockchain: string;
        blockchain_id: number;
    }[];
    excludedFromCirculationAddresses: string[];
    tokenomics: {
        distribution: string[];
        sales: string[];
        vestingSchedule: string[];
        fees: string[];
    };
    init: boolean;
}>;
