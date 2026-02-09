import type { TokenPriceBatchParams, TokenPriceParams } from '@mobula_labs/types';
import MobulaClient from '../src/client.ts';

async function main() {
  const client = new MobulaClient({
    apiKey: '', // Replace with a valid API key
    debug: true,
  });

  // Fetch single token price
  const singleParams: TokenPriceParams = {
    blockchain: 'evm:1',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC on Ethereum
  };
  const singlePrice = await client.fetchTokenPrice(singleParams);
  console.log('Single token price:', singlePrice);

  // Fetch multiple token prices in batch
  const batchParams: TokenPriceBatchParams = {
    items: [
      {
        blockchain: 'evm:1',
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
      },
      {
        blockchain: 'evm:1',
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT
      },
      {
        blockchain: 'solana:solana',
        address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC on Solana
      },
    ],
  };
  const batchPrices = await client.fetchTokenPriceBatch(batchParams);
  console.log('Batch token prices:', batchPrices);
}

main().catch((error) => {
  console.error('Failed to run token price example:', error);
});
