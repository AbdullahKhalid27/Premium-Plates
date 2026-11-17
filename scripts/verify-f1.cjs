const { chromium } = require('C:/Users/HomePC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  fs.mkdirSync('implementation/docs/evidence', { recursive: true });
  for (const width of [390, 768, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('http://127.0.0.1:4175/Premium-Plates/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'overflow ' + width);
    assert.equal(await page.locator('header').evaluate(e => getComputedStyle(e).backgroundColor), 'rgb(240, 237, 230)');
    if (width <= 768) {
      const trigger = page.getByRole('button', { name: 'Open navigation' });
      await trigger.click();
      const sheet = page.getByRole('dialog');
      await sheet.waitFor();
      assert.equal(await sheet.evaluate(e => getComputedStyle(e).backgroundColor), 'rgb(74, 31, 57)');
      await page.screenshot({ path: 'docs/evidence/f1-menu-' + width + '.png' });
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      assert.equal(await trigger.evaluate(e => e === document.activeElement), true, 'menu focus restored');
    } else {
      const collection = page.getByRole('button', { name: 'The collection', exact: true });
      await collection.focus();
      await page.keyboard.press('Enter');
      assert.equal(await collection.getAttribute('aria-expanded'), 'true');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Escape');
      assert.equal(await collection.evaluate(e => e === document.activeElement), true);
    }
    await page.locator('#studio-reg').fill('AB12 CDE');
    await page.screenshot({ path: 'docs/evidence/f1-' + width + '.png', fullPage: true });
    await page.getByRole('link', { name: 'Version 0.2.0' }).click();
    await page.getByRole('heading', { name: 'Version 0.2.0' }).waitFor();
    console.log('PASS viewport ' + width + ', navigation, palette, input and version route');
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:4175/Premium-Plates/');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(() => document.activeElement.id), 'main-content');
  assert.deepEqual(errors, []);
  console.log('PASS skip link and no browser runtime errors');
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
