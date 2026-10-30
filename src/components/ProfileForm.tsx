import React, { useState } from 'react';
import { ActivityLevel, Formula, Gender, Goal, UserProfile } from '../types';

interface ProfileFormProps {
  onSaveProfile: (profile: UserProfile) => void;
  initialProfile?: UserProfile;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ onSaveProfile, initialProfile }) => {
  const [weightKg, setWeightKg] = useState<number>(initialProfile?.weightKg ?? 70);
  const [heightCm, setHeightCm] = useState<number>(initialProfile?.heightCm ?? 175);
  const [ageYears, setAgeYears] = useState<number>(initialProfile?.ageYears ?? 25);
  const [gender, setGender] = useState<Gender>(initialProfile?.gender ?? 'male');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(initialProfile?.activityLevel ?? 'moderate');
  const [goal, setGoal] = useState<Goal>(initialProfile?.goal ?? 'maintain');
  const [formula, setFormula] = useState<Formula>(initialProfile?.formula ?? 'mifflin');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      weightKg,
      heightCm,
      ageYears,
      gender,
      activityLevel,
      goal,
      formula
    });
  };

  return (
    <form className="card" onSubmit={handleSubmit} data-testid="profile-form">
      <h2>Perfil Biométrico e Metas</h2>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="gender">Gênero Biológico</label>
          <select
            id="gender"
            data-testid="profile-gender"
            value={gender}
            onChange={(e) => setGender(e.target.value as Gender)}
          >
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="weight">Peso (kg)</label>
          <input
            id="weight"
            data-testid="profile-weight"
            type="number"
            min="1"
            step="0.1"
            value={weightKg}
            onChange={(e) => setWeightKg(Number(e.target.value))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="height">Altura (cm)</label>
          <input
            id="height"
            data-testid="profile-height"
            type="number"
            min="1"
            value={heightCm}
            onChange={(e) => setHeightCm(Number(e.target.value))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Idade (anos)</label>
          <input
            id="age"
            data-testid="profile-age"
            type="number"
            min="1"
            value={ageYears}
            onChange={(e) => setAgeYears(Number(e.target.value))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="activityLevel">Nível de Atividade</label>
          <select
            id="activityLevel"
            data-testid="profile-activity"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
          >
            <option value="sedentary">Sedentário (pouco ou nenhum exercício)</option>
            <option value="light">Leve (exercício 1 a 3 dias/semana)</option>
            <option value="moderate">Moderado (exercício 3 a 5 dias/semana)</option>
            <option value="active">Ativo (exercício 6 a 7 dias/semana)</option>
            <option value="very_active">Muito Ativo (treino intenso diário)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="goal">Objetivo</label>
          <select
            id="goal"
            data-testid="profile-goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value as Goal)}
          >
            <option value="lose_weight">Perder Peso (-500 kcal)</option>
            <option value="maintain">Manter Peso</option>
            <option value="gain_weight">Ganhar Peso (+500 kcal)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="formula">Fórmula de BMR</label>
          <select
            id="formula"
            data-testid="profile-formula"
            value={formula}
            onChange={(e) => setFormula(e.target.value as Formula)}
          >
            <option value="mifflin">Mifflin-St Jeor (Padrão)</option>
            <option value="harris">Harris-Benedict</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: '1.25rem' }}>
        <button type="submit" data-testid="save-profile-btn">
          Atualizar Perfil
        </button>
      </div>
    </form>
  );
};
