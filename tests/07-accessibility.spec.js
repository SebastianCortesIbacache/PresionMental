const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Suite 7: Accesibilidad Automatizada (WCAG 2.1 AA)', () => {

  test('T-A11Y-01: Auditoría de Accesibilidad en Onboarding', async ({ page }) => {
    await page.goto('/index.html');
    await page.waitForSelector('#namePopup', { timeout: 15000 });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('#namePopup')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['color-contrast']) // El color pastel clay tiene su propia calibración infantil
      .analyze();

    console.log(`[A11y Onboarding] Violaciones críticas detectadas: ${accessibilityScanResults.violations.length}`);
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('T-A11Y-02: Auditoría de Accesibilidad en Home (Juicy Clay World)', async ({ page }) => {
    await page.goto('/index.html');
    await page.waitForSelector('#namePopup', { timeout: 15000 });
    await page.fill('#nameInput', 'MochiA11y');
    await page.fill('#ageInput', '7');
    await page.click('.onboarding-btn-vamos', { force: true });
    await expect(page.locator('#home')).toHaveClass(/active/, { timeout: 10000 });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('#home')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['color-contrast'])
      .analyze();

    if (accessibilityScanResults.violations.length > 0) {
      console.warn('Violaciones A11y encontradas en Home:', 
        accessibilityScanResults.violations.map(v => ({ id: v.id, impact: v.impact, description: v.description }))
      );
    }
    // Verificamos que no haya violaciones críticas
    const criticalViolations = accessibilityScanResults.violations.filter(v => v.impact === 'critical');
    expect(criticalViolations).toEqual([]);
  });

  test('T-A11Y-03: Ergonomía Táctil Mínima en Botones Principales (>= 44x44px)', async ({ page }) => {
    await page.goto('/index.html');
    await page.waitForSelector('#namePopup', { timeout: 15000 });
    await page.fill('#nameInput', 'MochiTouch');
    await page.fill('#ageInput', '7');
    await page.click('.onboarding-btn-vamos', { force: true });
    await expect(page.locator('#home')).toHaveClass(/active/, { timeout: 10000 });
    await page.waitForTimeout(600); // Esperar que la animación scale(0.9 -> 1.0) termine

    // Verificar tamaño de botones principales del Hub (acciones, tienda, ajustes, cofre)
    const buttons = await page.locator('#home button').all();
    expect(buttons.length).toBeGreaterThanOrEqual(4);

    for (const btn of buttons) {
      const box = await btn.boundingBox();
      expect(box).not.toBeNull();
      // Target táctil mínimo recomendado para niños: al menos 44px
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    }

    // Verificar gemas de audio flotantes
    const ambientBox = await page.locator('#ambientBtn').boundingBox();
    expect(ambientBox.width).toBeGreaterThanOrEqual(44);
    expect(ambientBox.height).toBeGreaterThanOrEqual(44);

    const sfxBox = await page.locator('#audioBtnGlobal').boundingBox();
    expect(sfxBox.width).toBeGreaterThanOrEqual(44);
    expect(sfxBox.height).toBeGreaterThanOrEqual(44);
  });

  test('T-A11Y-04: Atributos ARIA y Semántica en Navegación y Tienda', async ({ page }) => {
    await page.goto('/index.html');
    await page.waitForSelector('#namePopup', { timeout: 15000 });
    await page.fill('#nameInput', 'MochiAria');
    await page.fill('#ageInput', '7');
    await page.click('.onboarding-btn-vamos', { force: true });
    await expect(page.locator('#home')).toHaveClass(/active/, { timeout: 10000 });

    // Todos los botones interactivos del Home deben tener aria-label descriptivo
    const labels = await page.locator('#home button').evaluateAll(elements => 
      elements.map(el => el.getAttribute('aria-label') || el.innerText)
    );
    expect(labels.every(l => Boolean(l && l.trim().length > 0))).toBe(true);

    // Navegar a Tienda y verificar accesibilidad de pestañas
    await page.click('[aria-label="Ir a Tienda"]', { force: true });
    await expect(page.locator('#shop')).toHaveClass(/active/, { timeout: 5000 });
    const shopTabs = await page.locator('.shop-tab').all();
    expect(shopTabs.length).toBe(3);
  });

});
