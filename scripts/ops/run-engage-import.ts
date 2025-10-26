#!/usr/bin/env tsx
// Call the by-host import endpoint once with options.
// Usage examples:
//   pnpm ops:engage-import                        # http://localhost:3000, space-robotics, no secret
//   pnpm ops:engage-import --base https://app --space space-robotics --limit 500 --secret X

const args = new Map<string, string>();
for (let i = 2; i < process.argv.length; i += 2) {
  const k = process.argv[i];
  const v = process.argv[i + 1];
  if (k && k.startsWith('--')) args.set(k.slice(2), v ?? '');
}

const base = args.get('base') || 'http://localhost:3000';
const space = args.get('space') || 'space-robotics';
const limit = Number(args.get('limit') || '1000');
const secret = args.get('secret');
const url = new URL(`/api/spaces/${space}/import/engage`, base);
url.searchParams.set('mode', 'by-host');
url.searchParams.set('limit', String(limit));
if (secret) url.searchParams.set('secret', secret);

async function main() {
  console.log('Import URL:', url.toString());
  const resp = await fetch(url.toString(), { method: 'POST' });
  const text = await resp.text();
  if (!resp.ok) {
    console.error('✗ Import failed', resp.status, text);
    process.exit(1);
  }
  try {
    const json = JSON.parse(text);
    console.log('✓ Import success:', {
      attempted: json?.data?.attempted,
      created: json?.data?.created,
      feedUrl: json?.data?.feedUrl,
    });
  } catch {
    console.log(text);
  }
}

main().catch((e) => {
  console.error('✗ Error:', e?.message || e);
  process.exit(1);
});

