import type { MetadataParams, MultiMetadataParams } from '@mobula_labs/types';
import MobulaClient from '../src/client.ts';

async function main() {
  const client = new MobulaClient({
    apiKey: '', // Replace with a valid API key or wire one from the environment
    debug: true,
  });

  // Fetch multiple metadata entries in a single batched request
  const multiMetadataParams: MultiMetadataParams = { assets: 'bitcoin,ethereum' };
  const multiMetadata = await client.fetchMultiMetadata(multiMetadataParams);
  console.log('Multi metadata response:', multiMetadata);

  // Retrieve system-level metadata and a specific asset snapshot
  const metadataParams: MetadataParams = { asset: 'bitcoin' };
  const singleMetadata = await client.fetchMetadata(metadataParams);
  console.log('Single metadata response:', singleMetadata);

  const systemMetadata = await client.fetchSystemMetadata();
  console.log('System metadata response:', systemMetadata);
}

main().catch((error) => {
  console.error('Failed to run metadata example:', error);
});
