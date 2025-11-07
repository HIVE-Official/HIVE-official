import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import glob from 'glob';

const webRoot = join(process.cwd(), 'apps', 'web');
const apiRoot = join(webRoot, 'src', 'app', 'api');

function read(file: string) {
  return readFileSync(file, 'utf8');
}

describe('Static: Admin routes use admin campus isolation', () => {
  const adminFiles = glob.sync(join(apiRoot, 'admin', '**', 'route.ts'));

  it('every admin route wraps with admin isolation or secure auth requireAdmin', () => {
    const offenders: string[] = [];
    for (const file of adminFiles) {
      const text = read(file);
      const hasAdminIsolation = text.includes('withAdminCampusIsolation(');
      const hasSecureAuthAdmin = /withSecureAuth\([^\)]*,\s*\{[\s\S]*requireAdmin:\s*true[\s\S]*\}/m.test(text);
      if (!hasAdminIsolation && !hasSecureAuthAdmin) {
        offenders.push(file.replace(process.cwd() + '/', ''));
      }
    }
    expect(offenders, `Admin routes missing admin isolation:
${offenders.join('\n')}
`).toEqual([]);
  });
});

describe('Static: Firestore-using routes include campus isolation', () => {
  const allRouteFiles = glob.sync(join(apiRoot, '**', 'route.ts'))
    .filter(f => !f.includes('/auth/') && !f.includes('/internal/') && !f.includes('/onboarding/catalog'));

  it('routes that call dbAdmin include campus isolation markers', () => {
    const offenders: string[] = [];
    for (const file of allRouteFiles) {
      const text = read(file);
      const usesDb = text.includes('dbAdmin.collection(');
      if (!usesDb) continue; // Not a Firestore route

      const hasCampusMarker = (
        text.includes('CURRENT_CAMPUS_ID') ||
        text.includes(".where('campusId'") ||
        text.includes('getSecureSpaces') ||
        text.includes('validateSecureSpace') ||
        text.includes('addSecureCampusMetadata(')
      );

      if (!hasCampusMarker) {
        offenders.push(file.replace(process.cwd() + '/', ''));
      }
    }

    // Allow zero offenders to pass; otherwise list files missing campus isolation
    expect(offenders, `Routes missing campus isolation markers:\n${offenders.join('\n')}`).toEqual([]);
  });
});

