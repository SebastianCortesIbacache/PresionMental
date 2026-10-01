const { test, expect } = require('@playwright/test');

test.describe('Suite 4: Resiliencia Offline (PWA)', () => {

  test('Simulación de caída de red (Modo Avión)', async ({ page, context }) => {
    // 1. Cargar normal para popular la caché del Service Worker (simula primer uso)
    await page.goto('/v51_modular.html');
    
    // Esperar a que el motor de red baje y cachee todo
    await page.waitForTimeout(4000); 
    
    // 2. Apagar la conexión a internet en el contexto del navegador (Offline)
    await context.setOffline(true);
    
    // 3. Recargar la página (simulando que el usuario cerró y abrió sin Wifi)
    await page.reload();
    
    // 4. Validar que la app cargó sin errores de red
    await expect(page.locator('#splash')).toBeVisible();
    
    // 5. Validar que el splash desaparece (la PWA cargó exitosamente los assets)
    await expect(page.locator('#splash')).not.toBeVisible({ timeout: 15000 });
  });
});
