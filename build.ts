import { build } from 'bun';

console.log('Building ESM...');
// ESM build
await build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist/esm',
  target: 'node',
  format: 'esm',
  minify: false,
  sourcemap: 'external',
  external: ['@mobula/types', 'axios', 'crypto-js', 'eventemitter3', 'isomorphic-ws', 'ws', 'zod'],
});

console.log('Building CJS...');
// CJS build
await build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist/cjs',
  target: 'node',
  format: 'cjs',
  minify: false,
  sourcemap: 'external',
  external: ['@mobula/types', 'axios', 'crypto-js', 'eventemitter3', 'isomorphic-ws', 'ws', 'zod'],
  naming: {
    entry: '[name].cjs',
  },
});

console.log('Generating TypeScript declarations...');
// Generate declaration files (note the $ for shell execution)
const tscResult = await Bun.$`tsc -p tsconfig.build.json --skipLibCheck`.quiet();

if (tscResult.exitCode !== 0) {
  console.error('❌ TypeScript declaration generation failed!');
  console.error(tscResult.stderr.toString());
  process.exit(1);
}

console.log('✅ Build complete!');
