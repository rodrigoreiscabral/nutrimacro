import { test, expect } from '@playwright/test';

test.describe('NutriMacro: Testes Ponta a Ponta (E2E)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('1. Deve carregar a pagina inicial com valores padrao e lista de refeicoes vazia', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('NutriMacro');
    await expect(page.getByTestId('metric-bmr')).toHaveText('1674 kcal');
    await expect(page.getByTestId('metric-tdee')).toHaveText('2595 kcal');
    await expect(page.getByTestId('target-calories')).toHaveText('2595 kcal');
    await expect(page.getByTestId('consumed-calories')).toHaveText('0 kcal');
    await expect(page.getByTestId('remaining-calories')).toHaveText('2595 kcal');
    await expect(page.getByTestId('food-list-empty')).toBeVisible();
  });

  test('2. Deve atualizar o perfil biometrico e recalcular metas nutricionais', async ({ page }) => {
    await page.getByTestId('profile-weight').fill('80');
    await page.getByTestId('profile-height').fill('180');
    await page.getByTestId('profile-age').fill('30');
    await page.getByTestId('profile-goal').selectOption('lose_weight');
    await page.getByTestId('save-profile-btn').click();

    await expect(page.getByTestId('metric-bmr')).toHaveText('1780 kcal');
    await expect(page.getByTestId('metric-tdee')).toHaveText('2759 kcal');
    await expect(page.getByTestId('target-calories')).toHaveText('2259 kcal');
    await expect(page.getByTestId('remaining-calories')).toHaveText('2259 kcal');
  });

  test('3. Deve adicionar um alimento e atualizar a tabela e totais consumidos', async ({ page }) => {
    await page.getByTestId('food-name-input').fill('Peito de Frango');
    await page.getByTestId('food-protein-input').fill('30');
    await page.getByTestId('food-carbs-input').fill('0');
    await page.getByTestId('food-fat-input').fill('5');
    await page.getByTestId('add-food-btn').click();

    await expect(page.getByTestId('food-list')).toBeVisible();
    await expect(page.locator('tbody tr')).toHaveCount(1);
    await expect(page.getByTestId('consumed-calories')).toHaveText('165 kcal');
    await expect(page.getByTestId('remaining-calories')).toHaveText('2430 kcal');
  });

  test('4. Deve somar macronutrientes corretamente ao cadastrar multiplos alimentos', async ({ page }) => {
    await page.getByTestId('food-name-input').fill('Arroz Cozido');
    await page.getByTestId('food-protein-input').fill('5');
    await page.getByTestId('food-carbs-input').fill('50');
    await page.getByTestId('food-fat-input').fill('2');
    await page.getByTestId('add-food-btn').click();

    await page.getByTestId('food-name-input').fill('Ovo Cozido');
    await page.getByTestId('food-protein-input').fill('13');
    await page.getByTestId('food-carbs-input').fill('1');
    await page.getByTestId('food-fat-input').fill('10');
    await page.getByTestId('add-food-btn').click();

    await expect(page.locator('tbody tr')).toHaveCount(2);
    await expect(page.getByTestId('consumed-calories')).toHaveText('384 kcal');
    await expect(page.getByTestId('metric-protein')).toContainText('18g /');
    await expect(page.getByTestId('metric-carbs')).toContainText('51g /');
    await expect(page.getByTestId('metric-fat')).toContainText('12g /');
  });

  test('5. Deve remover um alimento da lista e restaurar os totais consumidos', async ({ page }) => {
    await page.getByTestId('food-name-input').fill('Banana');
    await page.getByTestId('food-protein-input').fill('1');
    await page.getByTestId('food-carbs-input').fill('27');
    await page.getByTestId('food-fat-input').fill('0');
    await page.getByTestId('add-food-btn').click();

    await expect(page.locator('tbody tr')).toHaveCount(1);
    await expect(page.getByTestId('consumed-calories')).toHaveText('112 kcal');

    await page.locator('tbody tr button.btn-danger').click();

    await expect(page.getByTestId('food-list-empty')).toBeVisible();
    await expect(page.getByTestId('consumed-calories')).toHaveText('0 kcal');
    await expect(page.getByTestId('remaining-calories')).toHaveText('2595 kcal');
  });
});
