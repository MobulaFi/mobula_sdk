import { MobulaClient, MobulaError } from '@mobula/sdk';
import type { SwapQuotingQueryParams } from '@mobula_labs/types';

// Initialize the Mobula SDK client
const mobulaClient = new MobulaClient({
  restUrl: 'https://api.mobula.io', // Optional: your custom REST endpoint
  apiKey: '', // Get an API key at https://admin.mobula.io
  debug: true,
});

/**
 * Fetch Pulse V2 for a given blockchain and token.
 *
 * @param tokenIn - The token in address
 * @param tokenOut - The token out address
 * @param amount - The amount to swap
 * @param poolAddress - The pool address
 * @param walletAddress - The wallet address
 * @param slippage - The slippage
 * @param chainId - The chain identifier (e.g., ['solana:solana', 'evm:8453'])
 */
async function fetchSwapExample({
  chainId,
  tokenIn,
  tokenOut,
  amount,
  poolAddress,
  walletAddress,
  slippage,
}: SwapQuotingQueryParams) {
  try {
    const response = await mobulaClient.fetchSwapQuote({
      chainId,
      tokenIn,
      tokenOut,
      amount,
      poolAddress,
      walletAddress,
      slippage,
    });

    console.log('Swap Quote Response:', JSON.stringify(response, null, 2));

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
  // Fetch Swap Quote for EVM chain
  await fetchSwapExample({
    chainId: 'evm:8453' as unknown as never,
    tokenIn: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    tokenOut: '0x1111111111166b7fe7bd91427724b487980afc69',
    amount: 0.1,
    poolAddress: '0x3f53f1fd5b7723ddf38d93a584d280b9b94c3111',
    walletAddress: '0x0904d772e301a49363c5caf836f06739e2de2bdb',
    slippage: 1,
  });
})();
