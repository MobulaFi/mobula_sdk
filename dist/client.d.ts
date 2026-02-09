import { type MobulaOptions } from './auth.ts';
import { RestClient } from './rest/client.ts';
import { StreamClient, type SubscriptionPayload } from './wss/client.ts';
export interface MobulaClientOptions extends MobulaOptions {
    timeout?: number;
    debug?: boolean;
    wsUrlMap?: Partial<Record<keyof SubscriptionPayload, string>>;
}
export declare class MobulaClient extends RestClient {
    streams: StreamClient;
    constructor(options?: MobulaClientOptions);
}
export default MobulaClient;
