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
});
