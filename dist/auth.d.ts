export interface MobulaOptions {
    apiKey?: string;
    restUrl?: string;
    wsUrl?: string;
    wsUrlMap?: Partial<Record<string, string>>;
}
export declare const getAuthHeaders: (apiKey?: string) => Record<string, string>;
export declare const defaultWsUrlMap: Record<string, string>;
export declare const getWsUrl: (topic: string, options: MobulaOptions) => string;
