import MobulaClient from '../src/client.ts';

async function main() {
  // Initialize the Mobula SDK client
  const client = new MobulaClient({
    apiKey: 'YOUR_API_KEY', // Replace with your Mobula API key
    debug: true,
  });

  /**
   * There are two ways to receive WebSocket data:
   * 1. Using Event Emitters
   * 2. Using Callbacks (defined during subscription)
   *
   * This example demonstrates the Event Emitter approach.
   */

  // Subscribe to multiple market streams using the Event Emitter method
  const marketEthSubId = client.streams.subscribe('market', {
    assets: [{ name: 'Ethereum' }],
    interval: 15,
  });

  const marketDogeSubId = client.streams.subscribe('market', {
    assets: [{ name: 'Doge' }],
    interval: 15,
  });

  const marketBtcSubId = client.streams.subscribe('market', {
    assets: [{ name: 'Bitcoin' }],
    interval: 15,
    subscriptionId: 'callback-1', // Optional custom subscription ID
  });

  console.log('Subscribed to markets with IDs:', marketEthSubId, marketDogeSubId, marketBtcSubId);

  // Listen for all "market" updates via the Event Emitter
  client.streams.on('market', (data) => {
    console.log('[EventEmitter] Market Response:', data);
  });

  /**
   * ────────────────────────────────────────────────────────────────
   * Unsubscribing Examples
   * ────────────────────────────────────────────────────────────────
   *
   * There are three ways to unsubscribe:
   * 1. By type + subscription ID
   * 2. By type (all subscriptions under that type)
   * 3. Unsubscribe from all active subscriptions
   */

  // 1️⃣ Unsubscribe by type and subscription ID
  // This removes only the specific subscription (e.g., marketBtcSubId)
  setTimeout(async () => {
    try {
      await client.streams.unsubscribe('market', marketBtcSubId);
      console.log('Unsubscribed from Bitcoin market subscription.');
    } catch (err) {
      console.error('Failed to unsubscribe from Bitcoin subscription:', err);
    }
  }, 20000);

  // 2️⃣ Unsubscribe by type
  // This removes all subscriptions under the given type (e.g., "market")
  setTimeout(async () => {
    try {
      await client.streams.unsubscribe('market');
      console.log('Unsubscribed from all market subscriptions.');
    } catch (err) {
      console.error('Failed to unsubscribe from market subscriptions:', err);
    }
  }, 40000);

  // 3️⃣ Unsubscribe from all active subscriptions
  // Passing an empty payload removes all active subscriptions for the client
  // This one returns "No subscription found" because we were already unsubscribed all.
  setTimeout(async () => {
    try {
      await client.streams.unsubscribe();
      console.log('Unsubscribed from all active subscriptions.');
    } catch (err) {
      console.error('Failed to unsubscribe from all subscriptions:', err);
    }
  }, 60000);
}

// Run the example
main().catch((err) => console.error('Error running example:', err));
