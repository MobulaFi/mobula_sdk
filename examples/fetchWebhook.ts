import type { CreateWebhookParams, ListWebhooksParams, UpdateWebhookParams } from '@mobula_labs/types';
import MobulaClient from '../src/client.ts';

async function main() {
  const apiKey = 'YOUR_API_KEY';

  const client = new MobulaClient({
    restUrl: 'https://api.mobula.io',
    apiKey: apiKey, // Replace with a valid API key
    debug: true,
  });

  // Create a new webhook
  const createParams: CreateWebhookParams = {
    name: 'My Swap Webhook',
    chainIds: ['evm:1', 'evm:137'],
    events: ['swap'],
    apiKey,
    url: 'https://violet-superconformable-cuddly.ngrok-free.dev/webhook',
  };
  const createResponse = await client.createWebhook(createParams);
  console.log('Created webhook:', createResponse);

  // List all webhooks
  const listParams: ListWebhooksParams = { apiKey };
  const listResponse = await client.listWebhooks(listParams);
  console.log('All webhooks:', listResponse);

  // Update a webhook (merge new filters)
  if (createResponse.id) {
    const updateParams: UpdateWebhookParams = {
      streamId: createResponse.id,
      apiKey,
      mode: 'merge',
    };
    const updateResponse = await client.updateWebhook(updateParams);
    console.log('Updated webhook:', updateResponse);

    // Delete the webhook
    const deleteResponse = await client.deleteWebhook({ id: createResponse.id });
    console.log('Deleted webhook:', deleteResponse);
  }
}

main().catch((error) => {
  console.error('Failed to run webhook example:', error);
});
