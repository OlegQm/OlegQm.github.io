import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/projects/', '/about/', '/contact/', '/projects/ai-robotics-manipulator/', '/projects/stu-genai-chatbot/', '/projects/boxyland-data-analytics/', '/projects/llm-mesh-agents/', '/404.html'];

test('all pages load directly with working local links, unique titles and canonical URLs', async ({ page, request }) => {
  const titles = new Set<string>();
  const links = new Set<string>();
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('main h1')).toHaveCount(1);
    const title = await page.title();
    expect(titles.has(title)).toBeFalsy();
    titles.add(title);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://olegqm.github.io${route}`);
    const hrefs = await page.locator('a[href^="/"]').evaluateAll(elements => elements.map(el => el.getAttribute('href')!));
    hrefs.forEach(href => links.add(href));
  }
  for (const link of links) expect((await request.get(link)).status(), link).toBe(200);
  expect(errors).toEqual([]);
});

for (const width of [320, 390, 768, 1440]) {
  test(`all routes reflow without horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, page: document.documentElement.scrollWidth, body: document.body.scrollWidth }));
      expect(dimensions.page, `${route}: document width`).toBeLessThanOrEqual(dimensions.viewport);
      expect(dimensions.body, `${route}: body width`).toBeLessThanOrEqual(dimensions.viewport);
    }
  });
}

test('mobile navigation supports touch-sized controls, keyboard and Escape', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/');
  const menu = page.locator('[data-menu-toggle]');
  const bounds = await menu.boundingBox();
  expect(bounds?.width).toBeGreaterThanOrEqual(44);
  expect(bounds?.height).toBeGreaterThanOrEqual(44);
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeHidden();
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Home' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeFocused();
  await menu.click();
  await page.getByRole('navigation').getByRole('link', { name: 'Projects' }).click();
  await expect(page).toHaveURL('/projects/');
});

test('theme follows system until manually chosen, persists across pages and reloads', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.goto('/about/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('theme works when local storage is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Storage disabled', 'SecurityError'); } });
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('genuine STU gallery supports keyboard changes, dismissal and focus restoration', async ({ page }) => {
  await page.goto('/projects/stu-genai-chatbot/');
  const trigger = page.getByRole('link', { name: 'Enlarge: Student support · Demo.' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('[data-counter]')).toHaveText('1 / 5');
  await page.keyboard.press('ArrowRight');
  await expect(dialog.locator('[data-caption]')).toHaveText('Campus navigation · Demo.');
  await expect(dialog.locator('img')).toHaveAttribute('alt', /fictional campus directions/);
  await page.keyboard.press('ArrowRight');
  await expect(dialog.locator('[data-caption]')).toHaveText('Mobile navigation · Demo.');
  await expect(dialog.locator('img')).toHaveAttribute('alt', /on mobile/);
  await page.keyboard.press('ArrowRight');
  await expect(dialog.locator('[data-caption]')).toHaveText('Admin dashboard · Demo.');
  await expect(dialog.locator('img')).toHaveAttribute('alt', /synthetic feedback statistics/);
  await page.keyboard.press('ArrowRight');
  await expect(dialog.locator('[data-counter]')).toHaveText('5 / 5');
  await expect(dialog.locator('[data-caption]')).toHaveText('Knowledge base · Demo.');
  await expect(dialog.locator('img')).toHaveAttribute('alt', /fictional document names/);
  await expect(page.getByText(/Answers, campus routes, metrics and documents are fixtures/)).toBeAttached();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.locator('body')).not.toHaveClass(/dialog-open/);
});

test('project visuals use content-appropriate crops on cards and detail covers', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/projects/stu-genai-chatbot/');
  const stuCover = page.locator('.case-cover .visual-genai img');
  await expect(stuCover).toHaveAttribute('alt', /robot head illustration/);
  await expect(stuCover).toHaveCSS('object-fit', 'contain');
  await expect.poll(() => stuCover.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await expect(stuCover.locator('xpath=..')).toHaveCSS('aspect-ratio', '1.5 / 1');
  await page.goto('/projects/');
  const stuCard = page.locator('a[href="/projects/stu-genai-chatbot/"] .visual-genai img');
  await expect(stuCard).toHaveAttribute('alt', /robot head illustration/);
  await expect(stuCard).toHaveCSS('object-fit', 'contain');
  await expect.poll(() => stuCard.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  const workspaceCard = page.locator('a[href="/projects/llm-mesh-agents/"] .visual-agents img');
  await expect(workspaceCard).toHaveAttribute('alt', /Agent workspace interface/);
  await expect(workspaceCard).toHaveCSS('object-fit', 'contain');
  await expect.poll(() => workspaceCard.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await page.goto('/projects/llm-mesh-agents/');
  const workspaceCover = page.locator('.case-cover .visual-agents img');
  await expect(workspaceCover).toHaveAttribute('alt', /Agent workspace interface/);
  await expect(workspaceCover).toHaveCSS('object-fit', 'contain');
  await expect.poll(() => workspaceCover.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await expect(workspaceCover.locator('xpath=..')).toHaveCSS('aspect-ratio', '1.5 / 1');
  await expect(page.getByText(/Assistant replies are demo fixtures/)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Workspace demo' })).toBeVisible();
});

test('wide robotics photography stays framed around the manipulator at desktop and mobile widths', async ({ page }) => {
  for (const viewport of [{ width: 1440, height: 1000, ratio: '1.5 / 1' }, { width: 390, height: 844, ratio: '1.3 / 1' }]) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/');
    const hero = page.locator('.hero-project .visual-robotics');
    const image = hero.locator('img');
    await expect.poll(() => image.evaluate(item => (item as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await expect(hero).toHaveCSS('aspect-ratio', viewport.ratio);
    await expect(image).toHaveCSS('object-position', '60% 50%');
    await page.goto('/projects/ai-robotics-manipulator/');
    const cover = page.locator('.case-cover .visual-robotics img');
    await expect.poll(() => cover.evaluate(item => (item as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await expect(cover).toHaveCSS('object-fit', 'cover');
  }
});

test('workspace walkthrough gallery labels distinct synthetic desktop and mobile states', async ({ page }) => {
  await page.goto('/projects/llm-mesh-agents/');
  await expect(page.getByText(/Assistant replies are demo fixtures/)).toBeVisible();
  const figures = page.locator('.gallery-grid figure');
  await expect(figures).toHaveCount(5);
  await expect(figures.nth(0)).toContainText('Desktop conversation and files · Synthetic demo.');
  await expect(figures.nth(1)).toContainText('Desktop spreadsheet preview · Synthetic demo.');
  await expect(figures.nth(2)).toContainText('Mobile conversation · Synthetic demo.');
  await expect(figures.nth(3)).toContainText('Mobile workspace files · Synthetic demo.');
  await expect(figures.nth(4)).toContainText('Mobile document preview · Synthetic demo.');
});

test('video makes no third-party requests until activated and never autoplays', async ({ page }) => {
  const remoteRequests: string[] = [];
  await page.route('https://**/*', route => { remoteRequests.push(route.request().url()); return route.abort(); });
  await page.goto('/projects/ai-robotics-manipulator/');
  await expect(page.locator('iframe')).toHaveCount(0);
  expect(remoteRequests).toEqual([]);
  await page.getByRole('button', { name: 'Load video: Robotic arm real-life testing' }).click();
  const frame = page.locator('iframe');
  await expect(frame).toHaveCount(1);
  await expect(frame).toHaveAttribute('src', 'https://www.youtube-nocookie.com/embed/Tj-Ivm7bxoU?autoplay=0&controls=1&rel=0');
  await expect(frame).not.toHaveAttribute('allow', /autoplay/);
  await expect(page.getByRole('link', { name: 'Watch on YouTube (opens in a new tab)' })).toHaveAttribute('href', 'https://www.youtube.com/watch?v=Tj-Ivm7bxoU');
});

test('contact and learning content reflect approved facts without a fabricated resume', async ({ page }) => {
  await page.goto('/contact/');
  await expect(page.locator('a[href="mailto:olegqm@gmail.com"]')).toBeVisible();
  await expect(page.locator('a[href="https://github.com/olegqm"]').first()).toBeVisible();
  await expect(page.locator('a[href="https://www.linkedin.com/in/oleh-savchenko-12194127b"]').first()).toBeVisible();
  await expect(page.locator('a[download]')).toHaveCount(0);
  await page.goto('/about/');
  await expect(page.getByText('In progress', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Machine Learning with PyTorch and Scikit-Learn' })).toBeVisible();
  await expect(page.getByText('Part-time Jul 2025–Jul 2026 · Full-time since Jul 2026')).toBeVisible();
});

test('navigation and main content are available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 720 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4323/');
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Projects' })).toBeVisible();
  await page.getByRole('navigation').getByRole('link', { name: 'Projects' }).click();
  await expect(page.getByRole('heading', { name: 'Selected projects.' })).toBeVisible();
  await context.close();
});

for (const theme of ['light', 'dark'] as const) {
  test(`key pages have no automated WCAG A/AA violations in ${theme} theme`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme });
    for (const route of ['/', '/about/', '/contact/', '/projects/stu-genai-chatbot/', '/projects/ai-robotics-manipulator/']) {
      await page.goto(route);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(results.violations, `${theme}: ${route}`).toEqual([]);
    }
  });
}

test('404 is useful and excluded from indexing; sitemap contains only real pages', async ({ page, request }) => {
  const response = await page.goto('/not-a-real-page/');
  expect(response?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  await expect(page.getByRole('link', { name: 'Explore projects' })).toBeVisible();
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('https://olegqm.github.io/projects/ai-robotics-manipulator/');
  expect(sitemap).not.toContain('/404');
  expect((await request.get('/social-card.png')).status()).toBe(200);
});
