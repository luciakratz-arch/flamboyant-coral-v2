import { build } from 'esbuild';

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/index.mjs',
  platform: 'node',
  format: 'esm',
  target: 'node20',
  external: ['@workspace/api-zod', '@workspace/db', 'fsevents'],
}).catch(() => process.exit(1));
