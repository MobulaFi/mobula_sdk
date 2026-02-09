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
  const positionSubscriptionId = 'position-subscription';
  client.streams.subscribe(
    'position',
    {
      wallet: '0x3A351dC992443dd306BE1Fee3fe34c9fF8062540',
      token: '0x50da645f148798f68ef2d7db7c1cb22a6819bb2c',
      blockchain: 'evm:8453',
      subscriptionId: positionSubscriptionId,
      subscriptionTracking: true,
    },
    (data) => {
      console.log('[Callback] Position Update:', data);
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

  // 1️⃣ Unsubscribe only the position stream
  setTimeout(async () => {
    try {
      const result = await client.streams.unsubscribe('position', positionSubscriptionId);
      console.log('Unsubscribed position stream:', result);
    } catch (err) {
      console.error('Failed to unsubscribe position stream:', err);
    }
  }, 20000);

  // 2️⃣ Unsubscribe all funding subscriptions (BTC + ETH)
  setTimeout(async () => {
    try {
      const result = await client.streams.unsubscribe('position');
      console.log('Unsubscribed all position streams:', result);
    } catch (err) {
      console.error('Failed to unsubscribe all position streams:', err);
    }
  }, 40000);
}

// Run the example
main().catch((err) => console.error('Error running example:', err));
