import { MobulaClient } from '@mobula/sdk';

async function main() {
  // Initialize the Mobula SDK client
  const client = new MobulaClient({
    apiKey: 'YOUR_API_KEY', // Replace with your Mobula API key
    debug: true,
  });

  /**
   * This example demonstrates the Callback-based approach for receiving WebSocket data.
   *
   * Each subscription can define its own callback function to handle incoming data.
   * You can manage individual subscriptions using the `subscriptionId` parameter.
   */

  // Subscribe to BTC funding rate updates
  const btcSubscriptionId = 'btc-funding';
  client.streams.subscribe(
    'funding',
    {
      symbol: 'BTC',
      quote: 'USDT',
      interval: 10,
      subscriptionId: btcSubscriptionId,
      subscriptionTracking: 'true',
    },
    (data) => {
      console.log('[Callback] BTC Funding Rate Update:', data);
    },
  );

  // Subscribe to ETH funding rate updates
  client.streams.subscribe(
    'funding',
    {
      symbol: 'ETH',
      quote: 'USDT',
      interval: 10,
      subscriptionTracking: 'true',
    },
    (data) => {
      console.log('[Callback] ETH Funding Rate Update:', data);
    },
  );

  /**
   * ────────────────────────────────────────────────────────────────
   * Unsubscribing Examples (Callback Approach)
   * ────────────────────────────────────────────────────────────────
   *
   * 1️⃣ Unsubscribe a specific subscription using its type and subscription ID.
   * 2️⃣ Unsubscribe all subscriptions under a specific type.
   */

  // 1️⃣ Unsubscribe only the BTC funding stream
  setTimeout(async () => {
    try {
      const result = await client.streams.unsubscribe('funding', btcSubscriptionId);
      console.log('Unsubscribed BTC funding stream:', result);
    } catch (err) {
      console.error('Failed to unsubscribe BTC funding stream:', err);
    }
  }, 20000);

  // 2️⃣ Unsubscribe all funding subscriptions (BTC + ETH)
  setTimeout(async () => {
    try {
      const result = await client.streams.unsubscribe('funding');
      console.log('Unsubscribed all funding streams:', result);
    } catch (err) {
      console.error('Failed to unsubscribe all funding streams:', err);
    }
  }, 40000);
}

// Run the example
main().catch((err) => console.error('Error running example:', err));
