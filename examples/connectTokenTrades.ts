import { MobulaClient, MobulaError } from '@mobula/sdk';

// Initialize the Mobula SDK client
const mobulaClient = new MobulaClient({
  restUrl: 'https://api.mobula.io', // Optional: your custom REST endpoint
  apiKey: 'YOUR_API_KEY', // Get an API key at https://admin.mobula.io
  debug: true,
});

/**
 * Fetch token trades for a given blockchain and token.
 *
 * @param blockchain - The chain identifier (e.g., 'evm:1' for Ethereum Mainnet)
 * @param tokenAddress - The token's contract address
 * @param formatted - Optional flag; if true, returns formatted data (default: false)
 */
async function fetchTokenTradesExample(blockchain: string, tokenAddress: string, formatted = false) {
  try {
    const response = await mobulaClient.fetchTokenTrades({
      blockchain,
      address: tokenAddress,
      formatted,
    });

    console.log(formatted ? 'Formatted Token Trades:' : 'Raw Token Trades:', response);

    return response;
  } catch (err) {
    console.error(`\n Error fetching token trades for ${tokenAddress}:`);

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
  const blockchain = 'evm:1';
  const tokenAddress = '0xa29fe6ef9592b5d408cca961d0fb9b1faf497d6d';

  // Fetch raw token trades (default)
  await fetchTokenTradesExample(blockchain, tokenAddress);

  // Fetch formatted token trades
  await fetchTokenTradesExample(blockchain, tokenAddress, true);
})();
