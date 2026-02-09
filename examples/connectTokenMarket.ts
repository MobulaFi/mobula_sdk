import MobulaClient from '../src/client.ts';

async function main() {
  // Initialize the Mobula SDK client
  const client = new MobulaClient({
    apiKey: 'YOUR_API_KEY', // Replace with your Mobula API key
    debug: true,
  });

  const response = await client.fetchTokenMarkets({
    blockchain: 'solana:solana',
    address: 'CB9dDufT3ZuQXqqSfa1c5kY935TEreyBw9XJXxHKpump',
  });

  console.log('TokenMarket Response', response);
}

// Run the example
main().catch((err) => console.error('Error running example:', err));
