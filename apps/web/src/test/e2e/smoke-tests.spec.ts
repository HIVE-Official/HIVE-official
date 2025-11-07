import { test, expect } from '@playwright/test';

test.describe('Smoke: auth + campus-protected APIs', () => {
  test('login via dev magic link; protected APIs require credentials and CSRF', async ({ page }) => {
    // Login (dev magic link)
    await page.goto('/auth/login');
    await page.getByRole('button', { name: /Test University \(Development\)/i }).click();
    await page.getByTestId('email-input').fill('jwrhineh@buffalo.edu');
    await page.keyboard.press('Enter');
    await page.getByRole('button', { name: /Use Dev Magic Link/i }).click();
    await page.waitForURL(/(profile|onboarding|start)/);

    // Profile endpoint should be accessible when logged in
    const profileStatus = await page.evaluate(async () => {
      const res = await fetch('/api/profile', { credentials: 'include' });
      return res.status;
    });
    expect(profileStatus).toBeLessThan(400);

    // Obtain CSRF for admin mutations
    const csrf = await page.evaluate(async () => {
      const res = await fetch('/api/auth/csrf', { credentials: 'include' });
      return res.headers.get('X-CSRF-Token');
    });
    expect(csrf).toBeTruthy();

    // Admin GET endpoint should be accessible (campus-isolated in handler or middleware)
    const adminGetStatus = await page.evaluate(async () => {
      const res = await fetch('/api/admin/moderation/stats', { credentials: 'include' });
      return res.status;
    });
    expect(adminGetStatus).toBeLessThan(400);

    // Admin POST requires CSRF
    const postStatus = await page.evaluate(async (csrfToken) => {
      const res = await fetch('/api/admin/moderation', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken as string },
        body: JSON.stringify({ action: 'noop' })
      });
      return res.status;
    }, csrf);
    expect(postStatus).toBeLessThan(400);

    // Logout and ensure protected endpoint is denied
    await page.evaluate(async () => {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    });

    const afterLogout = await page.evaluate(async () => {
      const res = await fetch('/api/profile', { credentials: 'include' });
      return res.status;
    });
    expect(afterLogout).toBeGreaterThanOrEqual(400);
  });

  test('non-admin user cannot access admin endpoints', async ({ page }) => {
    await page.goto('/auth/login');
    await page.getByRole('button', { name: /Test University \(Development\)/i }).click();
    await page.getByTestId('email-input').fill('student@buffalo.edu');
    await page.keyboard.press('Enter');
    await page.getByRole('button', { name: /Use Dev Magic Link/i }).click();
    await page.waitForURL(/(profile|onboarding|start)/);

    const status = await page.evaluate(async () => {
      const res = await fetch('/api/admin/moderation/stats', { credentials: 'include' });
      return res.status;
    });
    expect(status).toBe(403);
  });
});
