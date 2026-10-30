import { useMemo, useState } from 'react';
import { FoodForm } from './components/FoodForm';
import { FoodList } from './components/FoodList';
import { ProfileForm } from './components/ProfileForm';
import { SummaryCard } from './components/SummaryCard';
import {
  calculateBMR,
  calculateCalorieTarget,
  calculateMacroTargets,
  calculateRemaining,
  calculateTDEE,
  sumDailyTotals
} from './services/calculations';
import { FoodItem, UserProfile } from './types';

const DEFAULT_PROFILE: UserProfile = {
  weightKg: 70,
  heightCm: 175,
  ageYears: 25,
  gender: 'male',
  activityLevel: 'moderate',
  goal: 'maintain',
  formula: 'mifflin'
};

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [foods, setFoods] = useState<FoodItem[]>([]);

  const bmr = useMemo(
    () => calculateBMR(profile.gender, profile.weightKg, profile.heightCm, profile.ageYears, profile.formula),
    [profile]
  );

  const tdee = useMemo(
    () => calculateTDEE(bmr, profile.activityLevel),
    [bmr, profile.activityLevel]
  );

  const targets = useMemo(() => {
    const calorieTarget = calculateCalorieTarget(tdee, profile.goal);
    return calculateMacroTargets(calorieTarget, profile.goal);
  }, [tdee, profile.goal]);

  const totals = useMemo(() => sumDailyTotals(foods), [foods]);
  const remaining = useMemo(() => calculateRemaining(targets, totals), [targets, totals]);

  const handleAddFood = (food: FoodItem) => {
    setFoods((prev) => [...prev, food]);
  };

  const handleRemoveFood = (id: string) => {
    setFoods((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="container">
      <header>
        <h1>NutriMacro</h1>
        <p>Calculadora Nutricional, BMR, TDEE e Controle de Metas de Macronutrientes</p>
      </header>

      <ProfileForm onSaveProfile={setProfile} initialProfile={profile} />
      <SummaryCard
        bmr={bmr}
        tdee={tdee}
        targets={targets}
        totals={totals}
        remaining={remaining}
      />
      <FoodForm onAddFood={handleAddFood} />
      <FoodList foods={foods} onRemoveFood={handleRemoveFood} />
    </div>
  );
}
