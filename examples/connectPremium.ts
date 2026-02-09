// @ts-nocheck - Example file
import { MobulaClient, MobulaError } from '@mobula/sdk';

// Initialize the Mobula SDK client
const mobulaClient = new MobulaClient({
  restUrl: 'https://api.mobula.io', // If you have custom one. Use it
  apiKey: 'YOUR_API_KEY', // Create one at https://admin.mobula.io if you don't have it
  debug: true,
});

async function fetchWalletPortfolio(walletAddress: string) {
  try {
    const portfolio = await mobulaClient.fetchWalletPortfolio({ wallet: walletAddress });
    return portfolio;
  } catch (err: unknown) {
    console.error(`Error fetching portfolio for wallet: ${walletAddress}`);

    // Handle Mobula-specific errors
    if (err instanceof MobulaError) {
      console.error('MobulaError status:', err.status);
      console.error('MobulaError data:', err.data);
    }
    // Handle generic JS/TS errors
    else if (err instanceof Error) {
      console.error('Error message:', err.message);
      console.error('Stack trace:', err.stack);
    }
    // Handle unknown error types
    else {
      console.error('Unexpected error:', err);
    }
  }
}

// Example usage
const walletAddress = '0xc1e42f862d202b4a0ed552c1145735ee088f6ccf';
fetchWalletPortfolio(walletAddress).then((portfolio) => {
  if (portfolio) {
    console.log('Successfully fetched portfolio:', portfolio);
  }
});
