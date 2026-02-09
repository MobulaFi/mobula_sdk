import type { WalletDefiPositionsParams } from '@mobula_labs/types';
import MobulaClient from '../src/client.ts';

async function main() {
  const client = new MobulaClient({
    apiKey: '', // Replace with a valid API key
    debug: true,
    timeout: 30000, // 30 seconds defi positions timeout
  });

  // Fetch DeFi positions for a wallet on Solana
  const solanaParams: WalletDefiPositionsParams = {
    wallet: '6Doy9NiFN4euSrkzpbYfyZe7p3pkgERumMmvoGvDEGrP',
    blockchains: 'solana',
  };
  const solanaPositions = await client.fetchWalletDefiPositionsV2(solanaParams);
  console.log('Solana DeFi positions:', solanaPositions);

  // Fetch DeFi positions for a wallet on Ethereum
  const ethParams: WalletDefiPositionsParams = {
    wallet: '0x7bfee91193d9df2ac0bfe90191d40f23c773c060',
    blockchains: 'ethereum',
  };
  const ethPositions = await client.fetchWalletDefiPositionsV2(ethParams);
  console.log('Ethereum DeFi positions:', ethPositions);
}

main().catch((error) => {
  console.error('Failed to run DeFi positions example:', error);
});
