import MobulaClient from '../src/client.ts';

async function main() {
  const client = new MobulaClient({
    apiKey: '', // Replace with a valid API key or wire one from the environment
    debug: true,
    restUrl: 'https://api.mobula.io',
  });

  const marketDetails = await client.fetchMarketDetailsBatch({
    items: [
      {
        blockchain: 'solana:solana',
        address: '26M5M3nwgaKE4zavkD3zEtYs5hJWdxe6xBwpdtsLHy1o',
      },
      {
        blockchain: 'evm:1',
        address: '0xA43fe16908251ee70EF74718545e4FE6C5cCEc9f',
      },
      {
        blockchain: 'evm:137',
        address: '0x369582d2010B6eD950B571F4101e3bB9b554876F',
      },
      {
        blockchain: 'base',
        address: '0x22AEe3699b6A0fEd71490C103Bd4E5f3309891D5',
      },
    ],
  });

  console.log('Market details response:', marketDetails);
}

main().catch((error) => {
  console.error('Failed to run metadata example:', error);
});
