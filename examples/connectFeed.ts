// @ts-nocheck - Example file
import { MobulaClient } from '@mobula/sdk';

async function main() {
  const client = new MobulaClient({
    apiKey: 'eb66b1f3-c24b-4f43-9892-dbc5f37d5a6d',
    debug: true,
  });

  const payload = {
    kind: 'asset_ids',
    asset_ids: [100001566],
    quote_id: 456,
  };

  client.streams.subscribe('feed', payload, (data) => {
    console.log('Price Feed Responses From Payload:', data.chain_id);
  });

  // How to unsubscribe the Price Feed payload alone without affecting other subscription
  setTimeout(async () => {
    try {
      await client.streams.unsubscribe('feed', undefined, {
        kind: 'asset_ids',
        asset_ids: [100001566],
        quote_id: 456,
      });
    } catch (err) {
      console.error('Unsubscribe failed:', err);
    }
  }, 5000);
}

main().catch(console.error);
