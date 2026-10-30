import { ActivityLevel, Goal, MacroSplit, NutritionalSummary, Profile, FoodItem } from '../types';
import {
  CALORIES_PER_GRAM_CARB,
  CALORIES_PER_GRAM_FAT,
  CALORIES_PER_GRAM_PROTEIN,
  CALORIC_DEFICIT_TARGET,
  CALORIC_SURPLUS_TARGET,
  MINIMUM_CALORIC_INTAKE,
} from '../constants/nutrition';

export function calculateBMR(profile: Profile): number {
  const { weight, height, age, gender, formula } = profile;

  if (weight <= 0 || height <= 0 || age <= 0) {
    throw new Error('Peso, altura e idade devem ser valores positivos maiores que zero.');
  }

  if (formula === 'harris_benedict') {
    if (gender === 'male') {
      return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    }
    return 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;
  }

  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
  return 10 * weight + 6.25 * height - 5 * age - 161;
}

export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  if (bmr <= 0) {
    throw new Error('A taxa metabolica basal deve ser maior que zero.');
  }

  const multipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  return bmr * multipliers[activityLevel];
}

export function calculateDailyTarget(tdee: number, goal: Goal): number {
  if (tdee <= 0) {
    throw new Error('O TDEE deve ser maior que zero.');
  }

  if (goal === 'lose_weight') {
    return Math.max(MINIMUM_CALORIC_INTAKE, tdee - CALORIC_DEFICIT_TARGET);
  }

  if (goal === 'gain_weight') {
    return tdee + CALORIC_SURPLUS_TARGET;
  }

  return tdee;
}

export function calculateMacroSplit(targetCalories: number, goal: Goal): MacroSplit {
  if (targetCalories <= 0) {
    throw new Error('A meta calorica deve ser maior que zero.');
  }

  let proteinRatio = 0.3;
  let carbRatio = 0.45;
  let fatRatio = 0.25;

  if (goal === 'lose_weight') {
    proteinRatio = 0.4;
    carbRatio = 0.3;
    fatRatio = 0.3;
  } else if (goal === 'gain_weight') {
    proteinRatio = 0.25;
    carbRatio = 0.55;
    fatRatio = 0.2;
  }

  return {
    proteinGrams: Math.round((targetCalories * proteinRatio) / CALORIES_PER_GRAM_PROTEIN),
    carbsGrams: Math.round((targetCalories * carbRatio) / CALORIES_PER_GRAM_CARB),
    fatsGrams: Math.round((targetCalories * fatRatio) / CALORIES_PER_GRAM_FAT),
  };
}

export function calculateItemCalories(protein: number, carbs: number, fats: number): number {
  if (protein < 0 || carbs < 0 || fats < 0) {
    throw new Error('Macronutrientes nao podem ter valores negativos.');
  }

  return (
    protein * CALORIES_PER_GRAM_PROTEIN +
    carbs * CALORIES_PER_GRAM_CARB +
    fats * CALORIES_PER_GRAM_FAT
  );
}

export function aggregateNutrients(items: FoodItem[]): {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
} {
  return items.reduce(
    (acc, item) => ({
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fats: acc.fats + item.fats,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );
}

export function calculateRemainingNutrients(
  targetCalories: number,
  targetMacros: MacroSplit,
  consumed: { calories: number; protein: number; carbs: number; fats: number }
): NutritionalSummary {
  return {
    remainingCalories: Math.round(targetCalories - consumed.calories),
    remainingProtein: Math.round(targetMacros.proteinGrams - consumed.protein),
    remainingCarbs: Math.round(targetMacros.carbsGrams - consumed.carbs),
    remainingFats: Math.round(targetMacros.fatsGrams - consumed.fats),
  };
}
