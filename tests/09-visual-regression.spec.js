const { test, expect } = require('@playwright/test');

async function ensureHome(page) {
  await page.goto('/index.html');
  await page.waitForSelector('#namePopup', { timeout: 15000 });
  await page.fill('#nameInput', 'VisualMochi');
  await page.fill('#ageInput', '7');
  await page.click('.onboarding-btn-vamos', { force: true });
  await expect(page.locator('#home')).toHaveClass(/active/, { timeout: 10000 });
  await page.waitForTimeout(500);
}

test.describe('Suite 9: Regresión Visual y Fidelidad Estética (Juicy Clay World)', () => {

  test('T-VIS-01: Verificación de Proporciones y Geometría en Home Desktop (1280x800)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await ensureHome(page);

    // 1. Validar que el Tablero de Misiones existe, es visible y no está comprimido
    const missionSlab = page.locator('.home-missions-slab');
    await expect(missionSlab).toBeVisible();
    const slabBox = await missionSlab.boundingBox();
    expect(slabBox.width).toBeGreaterThanOrEqual(400);
    expect(slabBox.height).toBeGreaterThanOrEqual(350);

    // 2. Validar que la Rueda de Comandos está a la izquierda sin solapar el tablero
    const wheelContainer = page.locator('.circular-menu, .circular-menu-wrapper').first();
    await expect(wheelContainer).toBeVisible();
    const wheelBox = await wheelContainer.boundingBox();
    expect(wheelBox.x).toBeLessThan(slabBox.x);

    // 3. Capturar instantánea de inspección
    await page.screenshot({ path: 'tests/snapshots/home-desktop-latest.png', fullPage: true });
  });

  test('T-VIS-02: Verificación de Proporciones en Tablet Horizontal (1024x768)', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await ensureHome(page);

    // En tablet horizontal ambos paneles deben seguir visibles sin scroll horizontal indeseado
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);

    await page.screenshot({ path: 'tests/snapshots/home-tablet-latest.png', fullPage: true });
  });

  test('T-VIS-03: Fidelidad Geométrica de Tarjetas de Tienda (Sin Desbordes)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await ensureHome(page);

    await page.click('[aria-label="Ir a Tienda"]', { force: true });
    await expect(page.locator('#shop')).toHaveClass(/active/, { timeout: 5000 });
    await page.waitForTimeout(800);

    // Verificar que todas las tarjetas de la tienda tienen dimensiones 3D correctas
    const items = await page.locator('.shop-item').all();
    expect(items.length).toBeGreaterThanOrEqual(4);

    for (const item of items) {
      const box = await item.boundingBox();
      expect(box.width).toBeGreaterThanOrEqual(120);
      expect(box.height).toBeGreaterThanOrEqual(140);
    }

    await page.screenshot({ path: 'tests/snapshots/shop-latest.png', fullPage: true });
  });

});
