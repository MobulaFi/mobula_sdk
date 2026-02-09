// @ts-nocheck - Example file
import { MobulaClient, MobulaError } from '@mobula/sdk';

const client = new MobulaClient({ debug: true });

async function main() {
  const walletAddress = '0xc1e42f862d202b4a0ed552c1145735ee088f6ccf';

  try {
    const portfolio = await client.fetchWalletPortfolio({ wallet: walletAddress });
    return portfolio;
  } catch (err: unknown) {
    console.error('Error fetching portfolio for wallet', walletAddress);

    // Narrow the error type
    if (err instanceof MobulaError) {
      console.error('MobulaError status:', err.status);
      console.error('MobulaError data:', err.data);
    } else if (err instanceof Error) {
      // Generic JS/TS error
      console.error('Error message:', err.message);
      console.error('Stack trace:', err.stack);
    } else {
      // Unknown error type
      console.error('Unexpected error object:', err);
    }
  }
}

// Execute
main().then((portfolio) => {
  if (portfolio) console.log('Successfully fetched portfolio:', portfolio);
});
