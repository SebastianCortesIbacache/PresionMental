const { test, expect } = require('@playwright/test');

test.describe('Suite 13: Flujo de Salida de Partida (Quit Modal)', () => {

  test('T-QUIT-01: Al presionar Salir y Aceptar, debe regresar al Home sin congelarse', async ({ page }) => {
    // 1. Onboarding
    await page.goto('/index.html');
    await expect(page.locator('#namePopup')).toBeVisible({ timeout: 10000 });
    await page.fill('#nameInput', 'TesterQuit');
    await page.fill('#ageInput', '7');
    await page.click('.onboarding-btn-vamos', { force: true });
    await expect(page.locator('#home')).toHaveClass(/active/, { timeout: 5000 });

    // 2. Entrar a Modo Libre
    await page.click('[aria-label="Ir a Modo Libre"]');
    
    // Cerrar Guía Rápida si aparece
    try {
      const guideBtn = page.locator('#introPopup .btn-play');
      if (await guideBtn.isVisible({ timeout: 1500 })) {
        await guideBtn.click({ force: true });
      }
    } catch(e) {}

    await page.click('button:has-text("EMPEZAR")');
    await expect(page.locator('#countOverlay')).not.toBeVisible({ timeout: 5000 });
    await expect(page.locator('#game')).toHaveClass(/active/);

    // 3. Presionar botón de salir (✕) dentro del juego
    await page.click('#game .btn-back');

    // 4. Modal de confirmación ¿Salir? debe estar abierto
    const quitPopup = page.locator('#quitConfirmPopup');
    await expect(quitPopup).toBeVisible();

    // 5. Presionar 'Salir'
    await page.click('#quitConfirmPopup button:has-text("Salir")');

    // 6. Debe mostrar la pantalla de resultado (#result) con título 'SALIDA' y botón 'Aceptar'
    await expect(page.locator('#result')).toHaveClass(/active/);
    await expect(page.locator('#resTitle')).toHaveText('SALIDA');
    const resBtn = page.locator('#resBtn');
    await expect(resBtn).toHaveText(/Aceptar/i);

    // 7. Presionar 'Aceptar'
    await resBtn.click();

    // 8. El juego DEBE volver al Home y no quedar congelado
    await expect(page.locator('#home')).toHaveClass(/active/, { timeout: 5000 });
  });

});
