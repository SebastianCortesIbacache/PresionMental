const { test, expect } = require('@playwright/test');

test.describe('Suite 10: Resistencia Offline Real & Emulación de Tablets Escolares', () => {

  test('T-OFF-01: Partida completa con corte abrupto de red (100% Offline-First)', async ({ page, context }) => {
    // 1. Cargar la app inicialmente con red activa
    await page.goto('/index.html');
    await page.waitForSelector('#namePopup', { timeout: 15000 });
    await page.fill('#nameInput', 'OfflineHero');
    await page.fill('#ageInput', '7');
    await page.click('.onboarding-btn-vamos', { force: true });
    await expect(page.locator('#home')).toHaveClass(/active/, { timeout: 10000 });

    // 2. Ir a Modo Libre
    await page.click('[aria-label="Ir a Modo Libre"]', { force: true });
    try {
      const introPopup = page.locator('#introPopup');
      if (await introPopup.isVisible({ timeout: 2000 })) {
        await introPopup.locator('.btn-play').click({ force: true });
      }
    } catch(e) {}

    await page.click('button:has-text("EMPEZAR")');
    await expect(page.locator('#countOverlay')).not.toBeVisible({ timeout: 8000 });
    await expect(page.locator('#game')).toHaveClass(/active/, { timeout: 5000 });

    // 3. CORTE TOTAL DE RED (Desconectar internet en runtime)
    console.log('Cortando conexión de red simulada en medio de la partida...');
    await context.setOffline(true);

    // 4. Jugar sin conexión
    try {
      const loTengo = page.locator('button:has-text("¡LO TENGO!")');
      if (await loTengo.isVisible({ timeout: 2000 })) {
        await loTengo.click({ force: true });
      }
    } catch(e) {}

    const ansButtons = page.locator('.btn-ans');
    await ansButtons.first().waitFor({ state: 'visible', timeout: 5000 });

    // Responder 2 preguntas en modo 100% desconectado
    await ansButtons.first().click({ force: true });
    await page.waitForTimeout(1000);

    // Si sigue en juego, responder otra
    if (await page.locator('#game.active').isVisible()) {
      try {
        await page.locator('.btn-ans').first().click({ force: true });
      } catch(e) {}
    }

    // 5. Verificar que el juego no se congeló ni mostró pantalla en blanco
    const isGameOrResult = await page.evaluate(() => {
      return document.getElementById('game')?.classList.contains('active') ||
             document.getElementById('resultScreen')?.classList.contains('active');
    });
    expect(isGameOrResult).toBe(true);

    // Restaurar red para no afectar otras pruebas
    await context.setOffline(false);
  });

  test('T-OFF-02: Emulación de Tablet Escolar Básica (1024x600 px con pantalla táctil)', async ({ browser }) => {
    // Contexto emulando una tablet escolar económica de 7 pulgadas
    const tabletContext = await browser.newContext({
      viewport: { width: 1024, height: 600 },
      hasTouch: true,
      isMobile: false,
    });
    const page = tabletContext.newPage ? await tabletContext.newPage() : await tabletContext.pages()[0];

    await page.goto('/index.html');
    await page.waitForSelector('#namePopup', { timeout: 15000 });
    await page.fill('#nameInput', 'TabletStudent');
    await page.fill('#ageInput', '7');
    await page.click('.onboarding-btn-vamos', { force: true });
    await expect(page.locator('#home')).toHaveClass(/active/, { timeout: 10000 });

    // Verificar que los botones de navegación no se desborden verticalmente
    const homeBox = await page.locator('#home').boundingBox();
    expect(homeBox.height).toBeLessThanOrEqual(650);

    // Probar interacción táctil con tap en la rueda
    const shopBtn = page.locator('[aria-label="Ir a Tienda"]');
    await shopBtn.tap();
    await expect(page.locator('#shop')).toHaveClass(/active/, { timeout: 5000 });

    // Volver con botón atrás
    const backBtn = page.locator('#shop .btn-back, #shop [onclick*="showScreen"]').first();
    await backBtn.tap();
    await expect(page.locator('#home')).toHaveClass(/active/, { timeout: 5000 });

    await tabletContext.close();
  });

});
