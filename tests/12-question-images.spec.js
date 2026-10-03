const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test.describe('Suite 12: Integración de Banco MVP y Renderizado de Ilustraciones', () => {

  test('T-IMG-01: Integridad del JSON MVP y consistencia con assets en disco', async () => {
    const dbPath = path.resolve(__dirname, '../assets/data/db_mvp_6_7.json');
    expect(fs.existsSync(dbPath)).toBe(true);

    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const categories = Object.keys(data);
    expect(categories.length).toBeGreaterThanOrEqual(6);

    let total = 0;
    let withImg = 0;

    for (const cat of categories) {
      for (const q of data[cat]) {
        total++;
        expect(Array.isArray(q.opts)).toBe(true);
        expect(q.opts.length).toBe(4);
        expect(q.correct).toBeGreaterThanOrEqual(0);
        expect(q.correct).toBeLessThan(4);
        expect(q.q).not.toMatch(/\((?:Dibujo|Imagen)[^)]*\)/i);

        if (q.img) {
          withImg++;
          const imgOnDisk = path.resolve(__dirname, '..', q.img);
          expect(fs.existsSync(imgOnDisk), `Imagen debe existir en disco: ${q.img}`).toBe(true);
        }
      }
    }

    expect(total).toBe(200);
    expect(withImg).toBe(103);
  });

  test('T-IMG-02: Carga y renderizado visual en runtime con fallback activo', async ({ page }) => {
    await page.goto('/index.html');
    await page.waitForSelector('#namePopup', { state: 'visible', timeout: 15000 });
    await page.fill('#nameInput', 'MochiTester');
    await page.fill('#ageInput', '7');
    await page.click('.onboarding-btn-vamos', { force: true });
    await page.waitForSelector('#home.active', { timeout: 10000 });

    await page.click('[aria-label="Ir a Modo Libre"]');
    await page.click('#introPopup .btn-play', { force: true }).catch(() => {});
    await page.click('button:has-text("EMPEZAR")');
    await page.waitForSelector('#game.active', { timeout: 8000 });
    await page.waitForTimeout(3600);

    // Navegar y responder para comprobar preguntas
    let foundImg = false;
    for (let i = 0; i < 20; i++) {
      const mem = page.locator('#memOverlay');
      if (await mem.isVisible().catch(() => false)) {
        await mem.locator('.btn-play').click({ force: true });
        await page.waitForTimeout(500);
      }

      const imgCount = await page.locator('#qMedia.has-img img.q-illustration').count();
      if (imgCount > 0) {
        foundImg = true;
        const isLoaded = await page.evaluate(() => {
          const img = document.querySelector('#qMedia img.q-illustration');
          return img && img.complete && img.naturalWidth > 0;
        });
        expect(isLoaded).toBe(true);
        break;
      }

      await page.locator('.btn-ans[data-correct="1"]').first().click({ force: true });
      await page.waitForTimeout(2500);
    }

    expect(foundImg).toBe(true);
  });
});
