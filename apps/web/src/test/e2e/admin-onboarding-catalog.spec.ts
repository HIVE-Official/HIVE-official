import { test, expect } from '@playwright/test';

test.describe('Admin controls onboarding catalog (dev)', () => {
  test('updates majors, year range, and interests; reflected in catalog demo', async ({ page }) => {
    // Sign in as admin (dev magic link)
    await page.goto('/auth/login');
    await page.getByRole('button', { name: /Test University \(Development\)/i }).click();
    await page.getByTestId('email-input').fill('jwrhineh@buffalo.edu');
    await page.keyboard.press('Enter');
    await page.getByRole('button', { name: /Use Dev Magic Link/i }).click();
    await page.waitForURL(/(profile|onboarding)/);

    // Fetch CSRF token for admin
    const csrf = await page.evaluate(async () => {
      const res = await fetch('/api/auth/csrf', { credentials: 'include' });
      return res.headers.get('X-CSRF-Token');
    });
    expect(csrf).toBeTruthy();

    // Update via admin API using page.fetch to include cookies
    const payload = {
      majors: ['Astrophysics', 'Cognitive Science'],
      yearRange: { startYear: 2026, endYear: 2027 },
      interests: [
        { id: 'astro', title: 'Space & Astro', items: ['Astro Club', 'Stargazing'] },
        { id: 'mind', title: 'Mind & Brain', items: ['Cognitive Science Society'] }
      ]
    };

    const status = await page.evaluate(async ({ payload, csrf }) => {
      const res = await fetch('/api/admin/onboarding/catalog?campusId=ub', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf as string },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      return res.status;
    }, { payload, csrf });
    expect(status).toBeLessThan(400);

    // Verify API reflects changes
    const body = await page.evaluate(async () => {
      const res = await fetch('/api/onboarding/catalog?campusId=ub', { credentials: 'include' });
      return res.json();
    });
    const majors = (body.data?.majors || body.majors) as string[];
    expect(majors).toContain('Astrophysics');

    // Verify catalog demo reflects changes
    await page.goto('/ux/onboarding/catalog-demo?campusId=ub');
    await expect(page.getByTestId('catalog-root')).toBeVisible();

    const majors = page.getByTestId('catalog-majors');
    await expect(majors.getByText('Astrophysics')).toBeVisible();
    await expect(majors.getByText('Cognitive Science')).toBeVisible();

    await expect(page.getByTestId('catalog-years')).toHaveText(/2026–2027/);

    const interests = page.getByTestId('catalog-interests');
    await expect(interests.getByText('Space & Astro')).toBeVisible();
    await expect(interests.getByText('Astro Club')).toBeVisible();
  });
});
