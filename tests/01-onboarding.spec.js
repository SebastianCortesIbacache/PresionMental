const { test, expect } = require('@playwright/test');

test.describe('Suite 1: Onboarding y Perfil', () => {

  test('Creación de perfil nuevo (Usuario Español)', async ({ page }) => {
    // 1. Limpiar localStorage por si acaso
    await page.goto('/index.html');
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    // 2. Esperar Splash y Pantalla de Pasaporte
    await expect(page.locator('#namePopup')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#namePopup')).toHaveClass(/onboarding-passport-screen/);
    await expect(page.locator('#passportBgImg')).toBeVisible();
    
    // 3. Validar y seleccionar sellos de cera (Hotspots de edad)
    const seal6 = page.locator('.passport-seal-btn[data-age="6"]');
    const seal7 = page.locator('.passport-seal-btn[data-age="7"]');
    await expect(seal6).toBeVisible();
    await expect(seal7).toBeVisible();
    
    // El sello 7 viene preseleccionado, cambiamos a 6
    await seal6.click();
    await expect(seal6).toHaveClass(/selected/);
    await expect(page.locator('#ageInput')).toHaveValue('6');

    // 4. Completar nombre con acento (María) y sellar pasaporte
    await page.fill('#nameInput', 'María');
    await page.click('.onboarding-btn-vamos'); 
    
    // 5. Verificaciones en Home
    await expect(page.locator('#home')).toHaveClass(/active/);
    await expect(page.locator('#playerNameDisplay')).toHaveText('María', { timeout: 3000 });
    await expect(page.locator('#playerAgeDisplay')).toHaveText('6');
    
    // 6. Verificar que el pasaporte no regrese al recargar
    await page.reload();
    await expect(page.locator('#namePopup')).not.toBeVisible();
    await expect(page.locator('#home')).toHaveClass(/active/);
  });
});
