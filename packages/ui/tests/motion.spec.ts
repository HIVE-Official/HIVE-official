import { expect, test } from '@playwright/test';

// Helper to open a story via title path
async function openStory(page, section: string, story: string) {
  // Storybook CSF router hash format: /?path=/story/<section>--<story>
  const toId = (s: string) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const id = `${toId(section)}--${toId(story)}`;
  await page.goto(`/?path=/story/${id}`);
  // wait for canvas
  await page.locator('#storybook-root').waitFor({ state: 'visible' });
}

test.describe('Motion patterns', () => {
  test('marquee animates by default and stops with reduced motion', async ({ page }) => {
    await openStory(page, 'Patterns/Library', 'Marquee Example');
    const track = page.locator('.marquee-track').first();
    await expect(track).toBeVisible();
    // Computed animation-name should include hive-marquee-x by default
    const name = await track.evaluate((el) => getComputedStyle(el).animationName);
    expect(name).toContain('hive-marquee-x');
  });

  test('reduced motion disables animation', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await openStory(page, 'Patterns/Library', 'Marquee Example');
    const track = page.locator('.marquee-track').first();
    await expect(track).toBeVisible();
    const name = await track.evaluate((el) => getComputedStyle(el).animationName);
    expect(name === 'none' || name === 'initial' || name.trim() === '').toBeTruthy();
    await context.close();
  });

  test('entry/exit classes do not animate layout properties', async ({ page }) => {
    await openStory(page, 'Polish/Motion Patterns', 'Entry Exit');
    const sample = page.locator('text=enter-slide-up').first();
    await expect(sample).toBeVisible();
    const props = await sample.evaluate((el) => getComputedStyle(el).transitionProperty);
    // Should not include width/height/top/left
    expect(props).not.toMatch(/width|height|top|left/);
  });
});
