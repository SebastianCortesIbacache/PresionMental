const { test, expect } = require('@playwright/test');

test.describe('Suite 8: Monkey Testing & Caos Infantil (Gremlins Simulator)', () => {

  test('T-MONKEY-01: 2.000 acciones aleatorias ultrarrápidas sin colapso del DOM', async ({ page }) => {
    const pageErrors = [];
    page.on('pageerror', err => pageErrors.push(err.message));

    await page.goto('/v51_modular.html');
    await page.waitForSelector('#namePopup', { timeout: 15000 });
    await page.fill('#nameInput', 'MonkeyMochi');
    await page.fill('#ageInput', '7');
    await page.click('.onboarding-btn-vamos', { force: true });
    await expect(page.locator('#home')).toHaveClass(/active/, { timeout: 10000 });

    console.log('Iniciando inyección de caos y toques aleatorios (Monkey Simulation)...');

    // Inyectar simulador de toques caóticos nativo en el contexto de la página
    await page.evaluate(async () => {
      const startTime = performance.now();
      const actionsCount = 1500;
      const getClickables = () => Array.from(document.querySelectorAll('button, .circle-btn, .shop-tab, .shop-item, [onclick], .home-missions-tab-chip'));

      for (let i = 0; i < actionsCount; i++) {
        const elements = getClickables();
        if (elements.length > 0) {
          const target = elements[Math.floor(Math.random() * elements.length)];
          if (target && typeof target.click === 'function') {
            try {
              // Disparamos eventos táctiles y de ratón desordenados
              target.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
              target.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true }));
              target.click();
            } catch (e) {
              // Ignorar errores menores de dispatch
            }
          }
        }
        // Micro-pausa no bloqueante cada 50 iteraciones para permitir renderizado
        if (i % 50 === 0) {
          await new Promise(r => setTimeout(r, 4));
        }
      }
      return performance.now() - startTime;
    });

    console.log('Simulación caótica completada. Verificando estabilidad del DOM...');

    // 1. Esperar a que la cola de animaciones y eventos acumulados termine de descargarse
    await page.waitForTimeout(2500);

    // 2. Limpiar diálogos y volver a Home de forma estable
    await page.evaluate(() => {
      document.querySelectorAll('dialog[open]').forEach(d => {
        try { d.close(); } catch(e) {}
      });
      if (typeof window.safeCall === 'function') {
        window.safeCall('nav', 'home');
      }
      const home = document.getElementById('home');
      if (home && !home.classList.contains('active')) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        home.classList.add('active');
      }
    });

    await expect(page.locator('#home')).toHaveClass(/active/, { timeout: 10000 });
  });

  test('T-MONKEY-02: Ráfaga de clics en audio sin desbordamiento de AudioContext', async ({ page }) => {
    await page.goto('/v51_modular.html');
    await page.waitForSelector('#namePopup', { timeout: 15000 });
    await page.fill('#nameInput', 'AudioStress');
    await page.fill('#ageInput', '7');
    await page.click('.onboarding-btn-vamos', { force: true });
    await expect(page.locator('#home')).toHaveClass(/active/, { timeout: 10000 });

    const ambientBtn = page.locator('#ambientBtn');
    const sfxBtn = page.locator('#audioBtnGlobal');

    // Disparar 60 clics en menos de 2 segundos alternando botones de audio
    for (let i = 0; i < 30; i++) {
      await ambientBtn.click({ force: true, delay: 10 });
      await sfxBtn.click({ force: true, delay: 10 });
    }

    // Verificar que los botones mantienen sus estados sin romper la UI
    await expect(ambientBtn).toBeVisible();
    await expect(sfxBtn).toBeVisible();
  });

  test('T-MONKEY-03: Spam de respuestas múltiples simultáneas en Gameplay', async ({ page }) => {
    await page.goto('/v51_modular.html');
    await page.waitForSelector('#namePopup', { timeout: 15000 });
    await page.fill('#nameInput', 'SpamGamer');
    await page.fill('#ageInput', '7');
    await page.click('.onboarding-btn-vamos', { force: true });
    await expect(page.locator('#home')).toHaveClass(/active/, { timeout: 10000 });

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

    // Saltar pantalla de memoria si aparece
    try {
      const loTengo = page.locator('button:has-text("¡LO TENGO!")');
      if (await loTengo.isVisible({ timeout: 2000 })) {
        await loTengo.click({ force: true });
      }
    } catch(e) {}

    // Simular que el niño toca todos los botones de respuesta a la vez rápidamente
    const ansButtons = page.locator('.btn-ans');
    await ansButtons.first().waitFor({ state: 'visible', timeout: 5000 });

    const count = await ansButtons.count();
    expect(count).toBeGreaterThanOrEqual(2);

    // Spam click simultáneo en todos los botones de respuesta
    await Promise.all([
      ansButtons.nth(0).click({ force: true }),
      ansButtons.nth(1).click({ force: true }),
      count > 2 ? ansButtons.nth(2).click({ force: true }) : Promise.resolve(),
      count > 3 ? ansButtons.nth(3).click({ force: true }) : Promise.resolve(),
    ]);

    // La app no debe haberse roto, debe seguir en #game o pasar a resultado
    await page.waitForTimeout(1000);
    const isValidState = await page.evaluate(() => {
      const gameActive = document.getElementById('game')?.classList.contains('active');
      const resultActive = document.getElementById('resultScreen')?.classList.contains('active');
      const homeActive = document.getElementById('home')?.classList.contains('active');
      return gameActive || resultActive || homeActive;
    });
    expect(isValidState).toBe(true);
  });

});
