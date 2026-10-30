import { describe, expect, it } from 'vitest';
import { calculateBMR, calculateCalorieTarget, calculateTDEE } from '../../src/services/calculations';

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
});
