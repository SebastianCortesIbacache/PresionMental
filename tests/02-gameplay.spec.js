const { test, expect } = require('@playwright/test');

test.describe('Suite 2: Gameplay y Lógica Base', () => {

  test.beforeEach(async ({ page }) => {
    // Completar Onboarding legalmente
    await page.goto('/v51_modular.html');
    await expect(page.locator('#namePopup')).toBeVisible({ timeout: 10000 });
    await page.fill('#nameInput', 'Tester');
    await page.fill('#ageInput', '6');
    await page.click('.onboarding-btn-vamos', { force: true });
    await expect(page.locator('#home')).toHaveClass(/active/, { timeout: 5000 });
  });

  test('Flujo de Partida Libre: Acierto, Error y Game Over', async ({ page }) => {
    // Entrar a Modo Libre y Empezar
    await page.click('[aria-label="Ir a Modo Libre"]');
    
    // El sistema muestra la Guía Rápida la primera vez, el robot debe cerrarla
    await page.click('#introPopup .btn-play', { force: true });
    
    await page.click('button:has-text("EMPEZAR")');
    
    // Esperar fin del contador 3-2-1
    await expect(page.locator('#countOverlay')).not.toBeVisible({ timeout: 5000 });
    
    // Asegurar que estamos en el juego
    await expect(page.locator('#game')).toHaveClass(/active/);

    // Función para manejar preguntas de memoria que bloquean la pantalla
    const handleMemory = async () => {
      try {
        const memOverlay = page.locator('#memOverlay');
        // Si no aparece en 1 segundo, asumimos que no es de memoria
        await memOverlay.waitFor({ state: 'visible', timeout: 1000 });
        await memOverlay.locator('.btn-play').click({ force: true });
      } catch (e) {
        // No es pregunta de memoria, continuamos normal
      }
    };

    // 1. Acierto
    await handleMemory();
    const correctBtn = page.locator('.btn-ans[data-correct="1"]');
    await correctBtn.click({ force: true });
    await expect(page.locator('#feedbackOverlay')).toBeVisible();
    await expect(page.locator('#fbTitle')).toContainText(/(GENIAL|CORRECTO|EXCELENTE|MUY BIEN|FANTÁSTICO|INCREÍBLE)/i); // Considera mayusculas/minusculas
    await expect(page.locator('#feedbackOverlay')).not.toBeVisible({ timeout: 3000 });

    // 2. Error (Pierde Vida 1)
    await handleMemory();
    const wrongBtn = page.locator('.btn-ans[data-correct="0"]').first();
    await wrongBtn.click({ force: true });
    await expect(page.locator('#feedbackOverlay')).toBeVisible();
    await expect(page.locator('#fbTitle')).toContainText(/(CASI|INTÉNTALO|UPS|VAYA|INCORRECTO)/i);
    await expect(page.locator('#feedbackOverlay')).not.toBeVisible({ timeout: 3000 });
    
    // 3. Error (Pierde Vida 2)
    await handleMemory();
    await page.locator('.btn-ans[data-correct="0"]').first().click({ force: true });
    await page.waitForTimeout(2000); // Pausa entre preguntas
    
    // 4. Error Fatal (Pierde Vida 3 -> Game Over)
    await handleMemory();
    await page.locator('.btn-ans[data-correct="0"]').first().click({ force: true });
    
    // 5. Verificar Pantalla de Resultados
    await expect(page.locator('#result')).toHaveClass(/active/, { timeout: 5000 });
    // Verificar que permita volver al inicio saltando animaciones de Game Over
    await page.click('#resBtn', { force: true });
  });
});
