import { z } from 'zod';
export declare const SystemMetadataResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        poolTypes: z.ZodArray<z.ZodString, "many">;
        chains: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            blockExplorers: z.ZodOptional<z.ZodObject<{
                default: z.ZodObject<{
                    name: z.ZodString;
                    url: z.ZodString;
                    apiUrl: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    url: string;
                    apiUrl?: string | undefined;
                }, {
                    name: string;
                    url: string;
                    apiUrl?: string | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                default: {
                    name: string;
                    url: string;
                    apiUrl?: string | undefined;
                };
            }, {
                default: {
                    name: string;
                    url: string;
                    apiUrl?: string | undefined;
                };
            }>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            blockExplorers?: {
                default: {
                    name: string;
                    url: string;
                    apiUrl?: string | undefined;
                };
            } | undefined;
        }, {
            name: string;
            id: string;
            blockExplorers?: {
                default: {
                    name: string;
                    url: string;
                    apiUrl?: string | undefined;
                };
            } | undefined;
        }>, "many">;
        factories: z.ZodArray<z.ZodObject<{
            chainId: z.ZodString;
            address: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            ui_name: z.ZodOptional<z.ZodString>;
            logo: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            address: string;
            chainId: string;
            name?: string | undefined;
            logo?: string | undefined;
            ui_name?: string | undefined;
        }, {
            address: string;
            chainId: string;
            name?: string | undefined;
            logo?: string | undefined;
            ui_name?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        factories: {
            address: string;
            chainId: string;
            name?: string | undefined;
            logo?: string | undefined;
            ui_name?: string | undefined;
        }[];
        poolTypes: string[];
        chains: {
            name: string;
            id: string;
            blockExplorers?: {
                default: {
                    name: string;
                    url: string;
                    apiUrl?: string | undefined;
                };
            } | undefined;
        }[];
    }, {
        factories: {
            address: string;
            chainId: string;
            name?: string | undefined;
            logo?: string | undefined;
            ui_name?: string | undefined;
        }[];
        poolTypes: string[];
        chains: {
            name: string;
            id: string;
            blockExplorers?: {
                default: {
                    name: string;
                    url: string;
                    apiUrl?: string | undefined;
                };
            } | undefined;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        factories: {
            address: string;
            chainId: string;
            name?: string | undefined;
            logo?: string | undefined;
            ui_name?: string | undefined;
        }[];
        poolTypes: string[];
        chains: {
            name: string;
            id: string;
            blockExplorers?: {
                default: {
                    name: string;
                    url: string;
                    apiUrl?: string | undefined;
                };
            } | undefined;
        }[];
    };
}, {
    data: {
        factories: {
            address: string;
            chainId: string;
            name?: string | undefined;
            logo?: string | undefined;
            ui_name?: string | undefined;
        }[];
        poolTypes: string[];
        chains: {
            name: string;
            id: string;
            blockExplorers?: {
                default: {
                    name: string;
                    url: string;
                    apiUrl?: string | undefined;
                };
            } | undefined;
        }[];
    };
}>;
export type SystemMetadataResponse = z.infer<typeof SystemMetadataResponseSchema>;
