import { describe, expect, it } from 'vitest';
import { calculateBMR } from '../../src/services/calculations';

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
});
