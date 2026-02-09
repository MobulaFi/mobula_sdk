import { MobulaClient, MobulaError } from '@mobula/sdk';

// Initialize the Mobula SDK client
const mobulaClient = new MobulaClient({
  restUrl: 'https://pulse-v2-api.mobula.io', // Optional: your custom REST endpoint
  apiKey: '', // Get an API key at https://admin.mobula.io
  debug: true,
});

/**
 * Fetch Pulse V2 for a given blockchain and token.
 *
 * @param assetMode - The asset mode (true for asset mode, false for non-asset mode)
 * @param chainId - The chain identifier (e.g., ['solana:solana'])
 * @param compressed - Optional flag; if true, returns compressed data (default: false)
 */
async function fetchPulseV2Example(assetMode: boolean, chainId: string[], compressed: boolean) {
  try {
    const response = await mobulaClient.fetchPulseV2({
      model: 'default',
      assetMode,
      chainId,
      compressed,
    });

    console.log('Pulse V2 Response:', response);

    return response;
  } catch (err) {
    console.error(`\n Error fetching Pulse V2: ${err}`);

    // Handle Mobula-specific errors
    if (err instanceof MobulaError) {
      const mobulaErr: MobulaError = err;
      console.error('MobulaError status:', mobulaErr.status);
      console.error('MobulaError data:', mobulaErr.data);
      console.error('MobulaError message:', mobulaErr.message);
    }

    // Handle generic JS/TS errors
    else if (err instanceof Error) {
      const error: Error = err;
      console.error('Error message:', error.message);
      console.error('Stack trace:', error.stack);
    }

    // Handle unexpected error types
    else {
      console.error('Unexpected error type:', err);
    }

    return null;
  }
}

// Example usage
(async () => {
  // Fetch Pulse V2 in asset mode for Solana
  await fetchPulseV2Example(true, ['solana:solana'], false);
})();
