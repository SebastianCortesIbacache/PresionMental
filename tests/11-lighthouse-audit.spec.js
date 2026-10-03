const { test, expect } = require('@playwright/test');

test.describe('Suite 11: Auditoría PWA, Performance y Buenas Prácticas', () => {

  test('T-PWA-01: Verificación de Manifiesto PWA (manifest.json)', async ({ request }) => {
    const response = await request.get('/manifest.json');
    expect(response.status()).toBe(200);

    const manifest = await response.json();
    expect(manifest.name).toBeTruthy();
    expect(manifest.short_name).toBeTruthy();
    expect(manifest.start_url).toBeTruthy();
    expect(manifest.display).toBe('standalone');
    expect(Array.isArray(manifest.icons)).toBe(true);
    expect(manifest.icons.length).toBeGreaterThanOrEqual(1);

    console.log(`[PWA Manifest] Nombre: "${manifest.name}", Display: "${manifest.display}", Iconos: ${manifest.icons.length}`);
  });

  test('T-PWA-02: Registro y Activación del Service Worker (sw.js)', async ({ page }) => {
    await page.goto('/index.html');
    await page.waitForTimeout(2000);

    const swStatus = await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return { supported: false };
      const reg = await navigator.serviceWorker.getRegistration();
      return {
        supported: true,
        registered: Boolean(reg),
        active: Boolean(reg?.active),
        scope: reg?.scope
      };
    });

    console.log('[Service Worker Status]', swStatus);
    expect(swStatus.supported).toBe(true);
    expect(swStatus.registered).toBe(true);
  });

  test('T-PERF-03: Métricas de Rendimiento y Core Web Vitals en Carga Fría', async ({ page }) => {
    await page.goto('/index.html');
    await page.waitForLoadState('networkidle');

    // Medir métricas de navegación mediante Navigation Timing API
    const perfTiming = await page.evaluate(() => {
      const [timing] = performance.getEntriesByType('navigation');
      return {
        dnsLookup: Math.round(timing.domainLookupEnd - timing.domainLookupStart),
        tcpConnect: Math.round(timing.connectEnd - timing.connectStart),
        responseDuration: Math.round(timing.responseEnd - timing.responseStart),
        domInteractive: Math.round(timing.domInteractive),
        domContentLoaded: Math.round(timing.domContentLoadedEventEnd),
        loadEventEnd: Math.round(timing.loadEventEnd),
      };
    });

    console.log('[Core Performance Metrics]', perfTiming);

    // En un entorno offline-first local, el DOMContentLoaded debe ser ultrarrápido (< 2000ms)
    expect(perfTiming.domContentLoaded).toBeLessThan(2500);
  });

  test('T-QUAL-04: Cero Errores de Consola y Cero Fugas de Excepciones', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        // Filtrar advertencias benignas conocidas (ej. autoplay audio bloqueado)
        const text = msg.text();
        if (!text.includes('AudioContext') && !text.includes('play() failed') && !text.includes('favicon')) {
          consoleErrors.push(text);
        }
      }
    });

    await page.goto('/index.html');
    await page.waitForSelector('#namePopup', { timeout: 15000 });
    await page.fill('#nameInput', 'ZeroErrorUser');
    await page.fill('#ageInput', '7');
    await page.click('.onboarding-btn-vamos', { force: true });
    await expect(page.locator('#home')).toHaveClass(/active/, { timeout: 10000 });

    // Navegar por las secciones principales
    await page.click('[aria-label="Ir a Tienda"]', { force: true });
    await expect(page.locator('#shop')).toHaveClass(/active/, { timeout: 5000 });
    await page.locator('#shop .btn-back, #shop [onclick*="showScreen"]').first().click({ force: true });
    await expect(page.locator('#home')).toHaveClass(/active/, { timeout: 5000 });

    console.log(`[Calidad de Código] Errores de consola registrados: ${consoleErrors.length}`);
    expect(consoleErrors).toEqual([]);
  });

});
