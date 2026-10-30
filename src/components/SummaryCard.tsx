import React from 'react';
import { DailyTotals, MacroTargets, RemainingNutrients } from '../types';

interface SummaryCardProps {
  bmr: number;
  tdee: number;
  targets: MacroTargets;
  totals: DailyTotals;
  remaining: RemainingNutrients;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  bmr,
  tdee,
  targets,
  totals,
  remaining
}) => {
  return (
    <div className="card" data-testid="summary-card">
      <h2>Resumo Nutricional e Metas Diárias</h2>
      
      <div className="metrics-grid">
        <div className="metric-box">
          <span>Taxa Basal (BMR)</span>
          <strong data-testid="metric-bmr">{bmr} kcal</strong>
        </div>
        <div className="metric-box">
          <span>Gasto Estimado (TDEE)</span>
          <strong data-testid="metric-tdee">{tdee} kcal</strong>
        </div>
        <div className="metric-box">
          <span>Meta Calórica</span>
          <strong data-testid="target-calories">{targets.calories} kcal</strong>
        </div>
        <div className="metric-box">
          <span>Total Consumido</span>
          <strong data-testid="consumed-calories">{totals.calories} kcal</strong>
        </div>
        <div className="metric-box">
          <span>Saldo Restante</span>
          <strong
            data-testid="remaining-calories"
            style={{ color: remaining.calories < 0 ? 'var(--danger)' : 'var(--success)' }}
          >
            {remaining.calories} kcal
          </strong>
        </div>
      </div>

      <h2 style={{ marginTop: '1.5rem', fontSize: '1.05rem' }}>Distribuição de Macronutrientes</h2>
      <div className="metrics-grid">
        <div className="metric-box">
          <span>Proteínas (Consumido / Meta)</span>
          <strong data-testid="metric-protein">{totals.proteinGrams}g / {targets.proteinGrams}g</strong>
          <span>Saldo: {remaining.proteinGrams}g</span>
        </div>
        <div className="metric-box">
          <span>Carboidratos (Consumido / Meta)</span>
          <strong data-testid="metric-carbs">{totals.carbsGrams}g / {targets.carbsGrams}g</strong>
          <span>Saldo: {remaining.carbsGrams}g</span>
        </div>
        <div className="metric-box">
          <span>Gorduras (Consumido / Meta)</span>
          <strong data-testid="metric-fat">{totals.fatGrams}g / {targets.fatGrams}g</strong>
          <span>Saldo: {remaining.fatGrams}g</span>
        </div>
      </div>
    </div>
  );
};
