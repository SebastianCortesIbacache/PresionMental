const { test, expect } = require('@playwright/test');

test.describe('Suite 5: Persistencia de Datos (PWA)', () => {

  test('El perfil del niño sobrevive a un reinicio de la aplicación', async ({ page }) => {
    // 1. Visitar por primera vez
    await page.goto('/index.html');
    
    // 2. Completar Onboarding (Nuevo perfil)
    await expect(page.locator('#namePopup')).toBeVisible({ timeout: 10000 });
    await page.fill('#nameInput', 'PandaFuerte');
    await page.fill('#ageInput', '7');
    await page.click('.onboarding-btn-vamos', { force: true });
    
    // 3. Verificar que entramos al Home y el nombre se muestra
    await expect(page.locator('#home')).toHaveClass(/active/, { timeout: 5000 });
    await expect(page.locator('#playerNameDisplay')).toHaveText('PandaFuerte');
    
    // 4. Simular Cierre de Aplicación / Reinicio (Recarga de página de Playwright)
    // Esto destruye el estado de JS, obligando a la app a leer desde localStorage
    await page.reload();
    
    // 5. Verificar que el Onboarding NO vuelve a aparecer (La app recuerda que ya estamos registrados)
    await expect(page.locator('#namePopup')).not.toBeVisible({ timeout: 5000 });
    
    // 6. Verificar que seguimos en el Home y el nombre persistió correctamente
    await expect(page.locator('#home')).toHaveClass(/active/, { timeout: 5000 });
    await expect(page.locator('#playerNameDisplay')).toHaveText('PandaFuerte');
  });

  test('Simulación de inyección de Estrellas y persistencia', async ({ page }) => {
    await page.goto('/index.html');
    
    // Onboarding
    await page.fill('#nameInput', 'PandaFuerte');
    await page.fill('#ageInput', '7');
    await page.click('.onboarding-btn-vamos', { force: true });
    
    // Esperar a estar en el Home
    await expect(page.locator('#home')).toHaveClass(/active/, { timeout: 5000 });

    // Inyectar 50 estrellas usando el objeto profile del juego a través de JavaScript real
    // (Simulamos que el niño ganó partidas)
    await page.evaluate(() => {
      window.profile.score = 50;
      window.saveP(); // Forzar guardado en localStorage
    });

    // Recargar la página
    await page.reload();

    // Entrar a la tienda para comprobar el saldo persistido
    await page.click('[aria-label="Ir a Tienda"]');
    await expect(page.locator('#shop')).toHaveClass(/active/);

    // Verificar que el score persistió (es al menos 50, puede ser mayor por bonos diarios)
    await expect(page.locator('#shopScore')).not.toHaveText('0', { timeout: 5000 });
    const scoreText = await page.locator('#shopScore').innerText();
    expect(parseInt(scoreText)).toBeGreaterThanOrEqual(50);
  });

});
