import { type MobulaOptions } from './auth.ts';
import { RestClient } from './rest/client.ts';
import { StreamClient, type SubscriptionPayload } from './wss/client.ts';

export interface MobulaClientOptions extends MobulaOptions {
  timeout?: number;
  debug?: boolean;
  wsUrlMap?: Partial<Record<keyof SubscriptionPayload, string>>;
}

export class MobulaClient extends RestClient {
  public streams: StreamClient;

  constructor(options: MobulaClientOptions = {}) {
    super({
      apiKey: options.apiKey,
      restUrl: options.restUrl,
      timeout: options.timeout,
      debug: options.debug,
    });

    this.streams = new StreamClient({
      apiKey: options.apiKey,
      wsUrl: options.wsUrl,
      wsUrlMap: options.wsUrlMap,
      debug: options.debug,
    });
  }
}

export default MobulaClient;
