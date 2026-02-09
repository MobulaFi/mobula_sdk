import type { SwapQuotingQueryParams } from '@mobula_labs/types';
import MobulaClient from '../src/client.ts';

async function main() {
  const client = new MobulaClient({
    apiKey: '', // Replace with a valid API key
    debug: true,
    restUrl: 'https://api.mobula.io',
  });

  // Fetch swap quoting instructions for Solana
  // This returns individual instructions instead of a serialized transaction,
  // allowing you to add your own instructions (e.g., Jito tips, fee transfers)
  const params: SwapQuotingQueryParams = {
    chainId: 'solana:solana',
    tokenIn: 'So11111111111111111111111111111111111111112', // Wrapped SOL
    tokenOut: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
    amount: 1, // 1 SOL
    slippage: 0.5, // 0.5% slippage
    walletAddress: 'FTp1BybZ51NiZKbnZH6MsrV3tUZNauhpQMbBcqYUEr5f',
  };

  const instructions = await client.fetchSwapQuotingInstructions(params);
  console.log('Swap quoting instructions:', instructions);

  // The response contains:
  // - instructions.data.solana.instructions - All instructions needed for the swap
  // - instructions.data.solana.recentBlockhash - Blockhash to use
  // - instructions.data.solana.lastValidBlockHeight - Block height validity
  // - instructions.data.amountOutTokens - Expected output amount
  // - instructions.data.amountOutUSD - Output value in USD

  if (instructions.data?.solana) {
    console.log('Compute budget instructions:', instructions.data.solana.instructions.computeBudgetInstructions);
    console.log('Setup instructions:', instructions.data.solana.instructions.setupInstructions);
    console.log('Swap instructions:', instructions.data.solana.instructions.swapInstructions);
    console.log('Cleanup instructions:', instructions.data.solana.instructions.cleanupInstructions);
  }
}

main().catch((error) => {
  console.error('Failed to run swap instructions example:', error);
});
