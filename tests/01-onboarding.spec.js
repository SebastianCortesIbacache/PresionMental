const { test, expect } = require('@playwright/test');

test.describe('Suite 1: Onboarding y Perfil', () => {

  test('Creación de perfil nuevo (Usuario Español)', async ({ page }) => {
    // 1. Limpiar localStorage por si acaso
    await page.goto('/v51_modular.html');
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    // 2. Esperar Splash y Popup
    await expect(page.locator('#namePopup')).toBeVisible({ timeout: 10000 });
    
    // 3. Completar formulario con acento (Para validar BUG-004 cuando se arregle)
    await page.fill('#nameInput', 'María');
    await page.fill('#ageInput', '6');
    await page.click('.onboarding-btn-vamos'); 
    
    // 4. Verificaciones
    await expect(page.locator('#home')).toHaveClass(/active/);
    
    // Aquí esperamos que ya no falle, debe decir María
    await expect(page.locator('#playerNameDisplay')).toHaveText('María', { timeout: 3000 });
    await expect(page.locator('#playerAgeDisplay')).toHaveText('6');
    
    // 5. Verificar que el popup no regrese al recargar
    await page.reload();
    await expect(page.locator('#namePopup')).not.toBeVisible();
    await expect(page.locator('#home')).toHaveClass(/active/);
  });
});
