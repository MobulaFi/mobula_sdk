import MobulaClient from '../src/client.ts';

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

  // Subscribe to positions updates
  const positionsSubscriptionId = 'positions-subscription';
  client.streams.subscribe(
    'positions',
    {
      wallet: '0xBa616F6b873a51a6dE9c72181BBeF9cA45488D94',
      blockchain: 'evm:1',
      subscriptionId: positionsSubscriptionId,
      subscriptionTracking: true,
    },
    (data) => {
      console.log('[Callback] Positions Update:', data);
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

  // 1️⃣ Unsubscribe only the positions stream
  setTimeout(async () => {
    try {
      const result = await client.streams.unsubscribe('positions', positionsSubscriptionId);
      console.log('Unsubscribed position stream:', result);
    } catch (err) {
      console.error('Failed to unsubscribe position stream:', err);
    }
  }, 20000);

  // 2️⃣ Unsubscribe all positions subscriptions
  setTimeout(async () => {
    try {
      const result = await client.streams.unsubscribe('positions');
      console.log('Unsubscribed all position streams:', result);
    } catch (err) {
      console.error('Failed to unsubscribe all position streams:', err);
    }
  }, 40000);
}

// Run the example
main().catch((err) => console.error('Error running example:', err));
