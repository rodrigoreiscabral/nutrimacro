import { ActivityLevel, DailyTotals, FoodItem, Formula, Gender, Goal, MacroTargets } from '../types';

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

export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  if (bmr <= 0) {
    throw new Error('BMR deve ser maior que zero.');
  }

  const multipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };

  return Math.round(bmr * multipliers[activityLevel]);
}

export function calculateCalorieTarget(tdee: number, goal: Goal): number {
  if (tdee <= 0) {
    throw new Error('TDEE deve ser maior que zero.');
  }

  const calorieDeltas: Record<Goal, number> = {
    lose_weight: -500,
    maintain: 0,
    gain_weight: 500
  };

  const calculated = tdee + calorieDeltas[goal];
  return Math.max(1200, calculated);
}

export function calculateMacroTargets(targetCalories: number, goal: Goal): MacroTargets {
  if (targetCalories <= 0) {
    throw new Error('Calorias devem ser maiores que zero.');
  }

  const distribution: Record<Goal, { protein: number; carbs: number; fat: number }> = {
    lose_weight: { protein: 0.4, carbs: 0.3, fat: 0.3 },
    maintain: { protein: 0.3, carbs: 0.45, fat: 0.25 },
    gain_weight: { protein: 0.25, carbs: 0.55, fat: 0.2 }
  };

  const currentDist = distribution[goal];

  return {
    calories: targetCalories,
    proteinGrams: Math.round((targetCalories * currentDist.protein) / 4),
    carbsGrams: Math.round((targetCalories * currentDist.carbs) / 4),
    fatGrams: Math.round((targetCalories * currentDist.fat) / 9)
  };
}

export function calculateFoodCalories(proteinGrams: number, carbsGrams: number, fatGrams: number): number {
  if (proteinGrams < 0 || carbsGrams < 0 || fatGrams < 0) {
    throw new Error('Macronutrientes nao podem ser negativos.');
  }
  return Math.round(proteinGrams * 4 + carbsGrams * 4 + fatGrams * 9);
}

export function sumDailyTotals(foods: FoodItem[]): DailyTotals {
  return foods.reduce(
    (acc, item) => ({
      calories: acc.calories + item.calories,
      proteinGrams: acc.proteinGrams + item.proteinGrams,
      carbsGrams: acc.carbsGrams + item.carbsGrams,
      fatGrams: acc.fatGrams + item.fatGrams
    }),
    { calories: 0, proteinGrams: 0, carbsGrams: 0, fatGrams: 0 }
  );
}
