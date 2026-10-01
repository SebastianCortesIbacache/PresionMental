const { test, expect } = require('@playwright/test');

test.describe('Suite 3: Navegación Global', () => {

  test.beforeEach(async ({ page }) => {
    // Completar Onboarding legalmente
    await page.goto('/v51_modular.html');
    await expect(page.locator('#namePopup')).toBeVisible({ timeout: 10000 });
    await page.fill('#nameInput', 'Tester');
    await page.fill('#ageInput', '6');
    await page.click('.onboarding-btn-vamos');
    await expect(page.locator('#home')).toHaveClass(/active/, { timeout: 5000 });
  });

  test('Acceso a Tienda', async ({ page }) => {
    await page.click('[aria-label="Ir a Tienda"]');
    await expect(page.locator('#shop')).toHaveClass(/active/);
    
    // Verificar tabs de la tienda usando los roles de accesibilidad
    await page.getByRole('tab', { name: 'Mascotas' }).click();
    await expect(page.getByRole('tab', { name: 'Mascotas' })).toHaveClass(/active/);
    
    await page.getByRole('tab', { name: 'Accesorios' }).click();
    await expect(page.getByRole('tab', { name: 'Accesorios' })).toHaveClass(/active/);
    
    await page.click('#shop .btn-back');
    await expect(page.locator('#home')).toHaveClass(/active/);
  });

  test('Acceso a Ajustes', async ({ page }) => {
    await page.click('[aria-label="Abrir Ajustes"]');
    await expect(page.locator('#settingsOverlay')).toBeVisible();
    
    // Verificar controles
    await expect(page.locator('#setNameInput')).toBeVisible();
    await expect(page.locator('#setAgeInput')).toBeVisible();
  });

  test('Acceso a Mapa de Mundos', async ({ page }) => {
    await page.click('[aria-label="Ir a Mundos"]');
    
    // Cerrar Guía Rápida si aparece (primer uso)
    const introPopup = page.locator('#introPopup');
    if (await introPopup.isVisible()) {
      await introPopup.locator('.btn-play').click({ force: true });
    }
    
    await expect(page.locator('#mapScreen')).toHaveClass(/active/);
    
    // Verificar que exista al menos el primer mundo
    await expect(page.locator('.map-level-node').first()).toBeVisible({ timeout: 10000 });
  });
});
