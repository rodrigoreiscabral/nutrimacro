import { Formula, Gender } from '../types';

export function calculateBMR(
  gender: Gender,
  weightKg: number,
  heightCm: number,
  ageYears: number,
  formula: Formula = 'mifflin'
): number {
  if (weightKg <= 0 || heightCm <= 0 || ageYears <= 0) {
    throw new Error('Peso, altura e idade devem ser estritamente positivos.');
  }

  if (formula === 'mifflin') {
    if (gender === 'male') {
      return Math.round(10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5);
    }
    return Math.round(10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161);
  }

  if (gender === 'male') {
    return Math.round(88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * ageYears);
  }
  return Math.round(447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * ageYears);
}
