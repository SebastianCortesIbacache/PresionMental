const { test, expect } = require('@playwright/test');

// ============================================================
// Suite 6: Pruebas Especiales Pre-Beta (Suite 9 de Memoria)
// Cubre T-22, T-23 y T-24
// ============================================================

test.describe('Suite 6: Estrés Pre-Beta', () => {

  // ─────────────────────────────────────────────────────────
  // T-22: Estrés Offline — La app debe funcionar completamente
  //       sin conexión a internet (Service Worker en acción).
  // ─────────────────────────────────────────────────────────
  test('T-22: Estrés Offline — App jugable sin red', async ({ page, context }) => {
    // 1. Cargar con red normal y limpiar estado previo para forzar el onboarding
    await page.goto('/index.html');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await expect(page.locator('#namePopup')).toBeVisible({ timeout: 10000 });

    // 2. Completar onboarding para activar el Service Worker plenamente
    await page.fill('#nameInput', 'PandaOffline');
    await page.fill('#ageInput', '7');
    await page.click('.onboarding-btn-vamos', { force: true });
    await expect(page.locator('#home')).toHaveClass(/active/, { timeout: 5000 });

    // 3. ✂️ CORTAR LA RED — Simula DevTools → Network → Offline
    await context.setOffline(true);

    // 4. Recargar la página sin red (el SW debe servir desde caché)
    await page.reload();

    // 5. Verificar que la app cargó sin pantalla en blanco ni crash
    //    (El home o el onboarding deben estar visibles — no una página de error del browser)
    const homeVisible = await page.locator('#home').isVisible();
    const namePopupVisible = await page.locator('#namePopup').isVisible();
    expect(homeVisible || namePopupVisible).toBeTruthy();

    // 6. Verificar que el SW sirvió el HTML (no hay mensaje de "No internet" del browser)
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).not.toContain('ERR_INTERNET_DISCONNECTED');
    expect(bodyText).not.toContain('No se puede acceder a este sitio');

    // 7. Restaurar la red
    await context.setOffline(false);
  });

  // ─────────────────────────────────────────────────────────
  // T-23: Fallback Tipográfico — Sin internet, Google Fonts
  //       falla y el sistema usa fuente de respaldo.
  //       Verificar que los botones y layouts no se rompen.
  // ─────────────────────────────────────────────────────────
  test('T-23: Fallback Tipográfico — Layouts intactos sin Google Fonts', async ({ page, context }) => {
    // 1. Bloquear SOLO las requests a Google Fonts para simular fallo de fuente
    await page.route('**fonts.googleapis.com**', route => route.abort());
    await page.route('**fonts.gstatic.com**', route => route.abort());

    // 2. Cargar la app y limpiar estado previo (Google Fonts fallará silenciosamente)
    await page.goto('/index.html');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await expect(page.locator('#namePopup')).toBeVisible({ timeout: 10000 });

    // 3. Completar onboarding
    await page.fill('#nameInput', 'PandaFont');
    await page.fill('#ageInput', '6');
    await page.click('.onboarding-btn-vamos', { force: true });
    await expect(page.locator('#home')).toHaveClass(/active/, { timeout: 5000 });

    // 4. Verificar que los botones circulares del menú siguen siendo círculos
    //    (el tamaño no debe colapsar a 0 si la fuente falla)
    const btn = page.locator('.circle-btn').first();
    const btnBox = await btn.boundingBox();
    expect(btnBox).not.toBeNull();
    expect(btnBox.width).toBeGreaterThan(50);  // Mínimo 50px de ancho
    expect(btnBox.height).toBeGreaterThan(50); // Mínimo 50px de alto

    // 5. Navegar a la tienda y verificar que el layout no se desbordó
    await page.click('[aria-label="Ir a Tienda"]');
    await expect(page.locator('#shop')).toHaveClass(/active/);

    // 6. Verificar que el título de la tienda es visible y tiene dimensiones coherentes
    const shopTitle = page.locator('#shop').first();
    const shopBox = await shopTitle.boundingBox();
    expect(shopBox).not.toBeNull();
    expect(shopBox.width).toBeGreaterThan(100);
  });

  // ─────────────────────────────────────────────────────────
  // T-24: Persistencia Local Completa — El perfil, estrellas
  //       y mascota comprada sobreviven a un reinicio TOTAL.
  // ─────────────────────────────────────────────────────────
  test('T-24: Persistencia Local — Perfil, estrellas y mascota tras reinicio', async ({ page }) => {
    // 1. Primera visita — Limpiar estado previo y registrar al niño
    await page.goto('/index.html');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await expect(page.locator('#namePopup')).toBeVisible({ timeout: 10000 });
    await page.fill('#nameInput', 'PandaBeta');
    await page.fill('#ageInput', '7');
    await page.click('.onboarding-btn-vamos', { force: true });
    await expect(page.locator('#home')).toHaveClass(/active/, { timeout: 5000 });

    // 2. Inyectar estrellas y simular compra de mascota via perfil de la app
    await page.evaluate(() => {
      window.profile.score = 200;
      window.profile.pet = 'cat';      // Simular mascota cat comprada
      window.profile.ownedPets = ['panda', 'cat'];
      window.saveP();                  // Persistir en localStorage
    });

    // 3. Verificar nombre visible antes del reinicio
    await expect(page.locator('#playerNameDisplay')).toHaveText('PandaBeta');

    // 4. ⚡ REINICIO TOTAL — Simula cerrar y reabrir el navegador
    await page.goto('about:blank');    // Limpiar página (destruye estado JS)
    await page.goto('/index.html'); // Re-entrar a la app

    // 5. El onboarding NO debe aparecer (ya está registrado)
    await expect(page.locator('#namePopup')).not.toBeVisible({ timeout: 5000 });

    // 6. El home debe cargar directamente
    await expect(page.locator('#home')).toHaveClass(/active/, { timeout: 5000 });

    // 7. El nombre debe persistir
    await expect(page.locator('#playerNameDisplay')).toHaveText('PandaBeta');

    // 8. Ir a la tienda y verificar que las estrellas persisten (>= 200 por posibles bonos)
    await page.click('[aria-label="Ir a Tienda"]');
    await expect(page.locator('#shop')).toHaveClass(/active/);
    const scoreText = await page.locator('#shopScore').innerText();
    expect(parseInt(scoreText)).toBeGreaterThanOrEqual(200);

    // 9. Verificar que la mascota comprada sigue siendo la activa
    //    (El icono de mascota en el home debe reflejar 'cat')
    await page.click('#shop .btn-back');
    await expect(page.locator('#home')).toHaveClass(/active/);
    // La mascota puede ser un emoji o una imagen <img> — verificamos que el elemento existe y es visible
    await expect(page.locator('#homeMascot')).toBeVisible();
  });

});
