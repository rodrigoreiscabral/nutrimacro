import { describe, expect, it } from 'vitest';
import {
  calculateBMR,
  calculateCalorieTarget,
  calculateFoodCalories,
  calculateMacroTargets,
  calculateRemaining,
  calculateTDEE,
  sumDailyTotals
} from '../../src/services/calculations';
import { DailyTotals, FoodItem, MacroTargets } from '../../src/types';

describe('Servico de Calculos Nutricionais', () => {
  it('1. Deve calcular BMR masculino corretamente usando formula Mifflin-St Jeor', () => {
    const result = calculateBMR('male', 80, 180, 30, 'mifflin');
    expect(result).toBe(1780);
  });

  it('2. Deve calcular BMR feminino corretamente usando formula Mifflin-St Jeor', () => {
    const result = calculateBMR('female', 60, 165, 28, 'mifflin');
    expect(result).toBe(1330);
  });

  it('3. Deve calcular BMR masculino corretamente usando formula Harris-Benedict', () => {
    const result = calculateBMR('male', 80, 180, 30, 'harris');
    expect(result).toBe(1854);
  });

  it('4. Deve calcular BMR feminino corretamente usando formula Harris-Benedict', () => {
    const result = calculateBMR('female', 60, 165, 28, 'harris');
    expect(result).toBe(1392);
  });

  it('5. Deve lancar erro caso o peso fornecido seja menor ou igual a zero', () => {
    expect(() => calculateBMR('male', 0, 175, 25)).toThrowError();
  });

  it('6. Deve lancar erro caso a altura fornecida seja menor ou igual a zero', () => {
    expect(() => calculateBMR('female', 60, -10, 25)).toThrowError();
  });

  it('7. Deve lancar erro caso a idade fornecida seja menor ou igual a zero', () => {
    expect(() => calculateBMR('male', 75, 175, 0)).toThrowError();
  });

  it('8. Deve calcular TDEE com multiplicador de nivel sedentario (1.2)', () => {
    expect(calculateTDEE(1500, 'sedentary')).toBe(1800);
  });

  it('9. Deve calcular TDEE com multiplicador de nivel leve (1.375)', () => {
    expect(calculateTDEE(1600, 'light')).toBe(2200);
  });

  it('10. Deve calcular TDEE com multiplicador de nivel moderado (1.55)', () => {
    expect(calculateTDEE(1600, 'moderate')).toBe(2480);
  });

  it('11. Deve calcular TDEE com multiplicador de nivel ativo (1.725)', () => {
    expect(calculateTDEE(2000, 'active')).toBe(3450);
  });

  it('12. Deve calcular TDEE com multiplicador de nivel muito ativo (1.9)', () => {
    expect(calculateTDEE(2000, 'very_active')).toBe(3800);
  });

  it('13. Deve lancar erro se TDEE for invocado com BMR invalido', () => {
    expect(() => calculateTDEE(0, 'moderate')).toThrowError();
  });

  it('14. Deve manter calorias iguais ao TDEE para meta de manutencao', () => {
    expect(calculateCalorieTarget(2500, 'maintain')).toBe(2500);
  });

  it('15. Deve subtrair 500 kcal para meta de perda de peso', () => {
    expect(calculateCalorieTarget(2500, 'lose_weight')).toBe(2000);
  });

  it('16. Deve respeitar o piso minimo seguro de 1200 kcal na perda de peso', () => {
    expect(calculateCalorieTarget(1400, 'lose_weight')).toBe(1200);
  });

  it('17. Deve somar 500 kcal para meta de ganho de peso', () => {
    expect(calculateCalorieTarget(2200, 'gain_weight')).toBe(2700);
  });

  it('18. Deve lancar erro ao tentar calcular meta para TDEE zerado ou negativo', () => {
    expect(() => calculateCalorieTarget(-50, 'maintain')).toThrowError();
  });

  it('19. Deve calcular gramas de macronutrientes corretamente para perda de peso (40/30/30)', () => {
    const macros = calculateMacroTargets(2000, 'lose_weight');
    expect(macros.proteinGrams).toBe(200);
    expect(macros.carbsGrams).toBe(150);
    expect(macros.fatGrams).toBe(67);
  });

  it('20. Deve calcular gramas de macronutrientes corretamente para manutencao (30/45/25)', () => {
    const macros = calculateMacroTargets(2000, 'maintain');
    expect(macros.proteinGrams).toBe(150);
    expect(macros.carbsGrams).toBe(225);
    expect(macros.fatGrams).toBe(56);
  });

  it('21. Deve calcular gramas de macronutrientes corretamente para ganho de peso (25/55/20)', () => {
    const macros = calculateMacroTargets(2000, 'gain_weight');
    expect(macros.proteinGrams).toBe(125);
    expect(macros.carbsGrams).toBe(275);
    expect(macros.fatGrams).toBe(44);
  });

  it('22. Deve lancar erro ao calcular macros para calorias invalidas', () => {
    expect(() => calculateMacroTargets(0, 'maintain')).toThrowError();
  });

  it('23. Deve calcular calorias de um alimento pela regra 4kcal/g proteina e carboidrato e 9kcal/g gordura', () => {
    expect(calculateFoodCalories(20, 30, 10)).toBe(290);
  });

  it('24. Deve retornar 0 calorias se todos os macros forem zerados', () => {
    expect(calculateFoodCalories(0, 0, 0)).toBe(0);
  });

  it('25. Deve lancar erro se algum macronutriente for negativo', () => {
    expect(() => calculateFoodCalories(-1, 10, 5)).toThrowError();
  });

  it('26. Deve retornar totais zerados para uma lista vazia de alimentos', () => {
    const totals = sumDailyTotals([]);
    expect(totals).toEqual({
      calories: 0,
      proteinGrams: 0,
      carbsGrams: 0,
      fatGrams: 0
    });
  });

  it('27. Deve somar corretamente calorias e macros de multiplos alimentos', () => {
    const foods: FoodItem[] = [
      { id: '1', name: 'Ovos mexidos', calories: 200, proteinGrams: 14, carbsGrams: 2, fatGrams: 15 },
      { id: '2', name: 'Arroz integral', calories: 215, proteinGrams: 5, carbsGrams: 45, fatGrams: 2 }
    ];
    const totals = sumDailyTotals(foods);
    expect(totals.calories).toBe(415);
    expect(totals.proteinGrams).toBe(19);
    expect(totals.carbsGrams).toBe(47);
    expect(totals.fatGrams).toBe(17);
  });

  it('28. Deve calcular saldo restante positivo quando consumo for inferior as metas', () => {
    const targets: MacroTargets = { calories: 2000, proteinGrams: 150, carbsGrams: 200, fatGrams: 60 };
    const totals: DailyTotals = { calories: 1200, proteinGrams: 90, carbsGrams: 110, fatGrams: 35 };
    const remaining = calculateRemaining(targets, totals);
    expect(remaining).toEqual({
      calories: 800,
      proteinGrams: 60,
      carbsGrams: 90,
      fatGrams: 25
    });
  });

  it('29. Deve calcular saldo negativo quando o consumo ultrapassar as metas', () => {
    const targets: MacroTargets = { calories: 1800, proteinGrams: 140, carbsGrams: 180, fatGrams: 50 };
    const totals: DailyTotals = { calories: 2100, proteinGrams: 160, carbsGrams: 210, fatGrams: 65 };
    const remaining = calculateRemaining(targets, totals);
    expect(remaining).toEqual({
      calories: -300,
      proteinGrams: -20,
      carbsGrams: -30,
      fatGrams: -15
    });
  });

  it('30. Deve retornar saldo zerado quando consumo for exatamente igual as metas', () => {
    const targets: MacroTargets = { calories: 2000, proteinGrams: 150, carbsGrams: 200, fatGrams: 60 };
    const totals: DailyTotals = { calories: 2000, proteinGrams: 150, carbsGrams: 200, fatGrams: 60 };
    const remaining = calculateRemaining(targets, totals);
    expect(remaining).toEqual({
      calories: 0,
      proteinGrams: 0,
      carbsGrams: 0,
      fatGrams: 0
    });
  });
});
