import { expect, test } from '@playwright/test';

async function openStory(page, section: string, story: string) {
  const toId = (s: string) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const id = `${toId(section)}--${toId(story)}`;
  await page.goto(`/?path=/story/${id}`);
  await page.locator('#storybook-root').waitFor({ state: 'visible' });
}

test('layout shift (CLS) is negligible for no-shift patterns', async ({ page }) => {
  await openStory(page, 'Polish/Layout Shift Patterns', 'No Shift Patterns');

  // Collect CLS via PerformanceObserver
  await page.addInitScript(() => {
    (window as any).__cls__ = 0;
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any) {
          if (!entry.hadRecentInput) (window as any).__cls__ += entry.value || 0;
        }
      });
      observer.observe({ type: 'layout-shift', buffered: true } as any);
    } catch (error) {
      console.warn('layout-shift.observer_failed', error);
    }
  });

  // Let animations run a bit
  await page.waitForTimeout(800);
  const cls = await page.evaluate(() => (window as any).__cls__ ?? 0);
  expect(cls).toBeLessThan(0.01);
});
