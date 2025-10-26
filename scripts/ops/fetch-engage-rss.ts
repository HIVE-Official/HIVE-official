#!/usr/bin/env tsx
// Fetch Engage RSS and write raw XML and normalized JSON for inspection
// Usage:
//   pnpm ops:fetch-engage-rss                    # uses ENGAGE_RSS_URL or UB default
//   pnpm ops:fetch-engage-rss https://.../rss    # custom URL
//   pnpm ops:fetch-engage-rss --out docs/dev/samples/ub

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const DEFAULT_URL = process.env.ENGAGE_RSS_URL || 'https://buffalo.campuslabs.com/engage/events.rss';
const args = process.argv.slice(2);
const urlArg = args.find((a) => a && !a.startsWith('--'));
const outArgIdx = args.findIndex((a) => a === '--out');
const outPrefix = outArgIdx >= 0 && args[outArgIdx + 1] ? args[outArgIdx + 1]! : 'docs/dev/samples/engage_ub_events';

const FEED_URL = urlArg || DEFAULT_URL;
const OUT_XML = `${outPrefix}.rss`;
const OUT_JSON = `${outPrefix}.json`;

async function main() {
  console.log(`Fetching RSS: ${FEED_URL}`);
  const resp = await fetch(FEED_URL, { method: 'GET' });
  if (!resp.ok) {
    throw new Error(`Fetch failed: ${resp.status} ${resp.statusText}`);
  }
  const xml = await resp.text();

  // Ensure directory exists
  const dir = resolve(process.cwd(), dirname(OUT_XML));
  mkdirSync(dir, { recursive: true });

  writeFileSync(OUT_XML, xml, 'utf8');
  console.log(`✓ Wrote raw XML → ${OUT_XML}`);

  // Normalize via shared parser
  const { parseEngageRssXml } = await import('../../apps/web/src/server/integrations/engage/rss');
  const items = parseEngageRssXml(xml);
  const payload = {
    fetchedAt: new Date().toISOString(),
    url: FEED_URL,
    count: items.length,
    sampleTitles: items.slice(0, 8).map((x: any) => x.title),
    metrics: {
      missing: {
        startAt: items.filter((x: any) => !x.startAt).length,
        endAt: items.filter((x: any) => !x.endAt).length,
        location: items.filter((x: any) => !x.location).length,
        imageUrl: items.filter((x: any) => !x.imageUrl).length,
        hosts: items.filter((x: any) => !x.hosts || x.hosts.length === 0).length,
        status: items.filter((x: any) => !x.status).length,
      }
    },
    items
  };
  writeFileSync(OUT_JSON, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`✓ Wrote normalized JSON → ${OUT_JSON}`);
  console.log('Summary:', {
    total: payload.count,
    missing: payload.metrics.missing,
  });
}

main().catch((e) => {
  console.error('✗ Failed:', e?.message || e);
  process.exit(1);
});
