import React, { useState } from 'react';
import { calculateFoodCalories } from '../services/calculations';
import { FoodItem } from '../types';

interface FoodFormProps {
  onAddFood: (food: FoodItem) => void;
}

export const FoodForm: React.FC<FoodFormProps> = ({ onAddFood }) => {
  const [name, setName] = useState('');
  const [proteinGrams, setProteinGrams] = useState<number>(0);
  const [carbsGrams, setCarbsGrams] = useState<number>(0);
  const [fatGrams, setFatGrams] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const calories = calculateFoodCalories(proteinGrams, carbsGrams, fatGrams);

    const newFood: FoodItem = {
      id: Date.now().toString(),
      name: name.trim(),
      calories,
      proteinGrams,
      carbsGrams,
      fatGrams
    };

    onAddFood(newFood);
    setName('');
    setProteinGrams(0);
    setCarbsGrams(0);
    setFatGrams(0);
  };

  const estimatedCalories = calculateFoodCalories(
    Math.max(0, proteinGrams),
    Math.max(0, carbsGrams),
    Math.max(0, fatGrams)
  );

  return (
    <form className="card" onSubmit={handleSubmit} data-testid="food-form">
      <h2>Registrar Alimento Consumido</h2>
      <div className="form-grid">
        <div className="form-group" style={{ gridColumn: 'span 2' }}>
          <label htmlFor="foodName">Nome do Alimento ou Refeição</label>
          <input
            id="foodName"
            data-testid="food-name-input"
            type="text"
            placeholder="Ex: Peito de Frango Grelhado"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="protein">Proteínas (g)</label>
          <input
            id="protein"
            data-testid="food-protein-input"
            type="number"
            min="0"
            step="0.1"
            value={proteinGrams}
            onChange={(e) => setProteinGrams(Number(e.target.value))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="carbs">Carboidratos (g)</label>
          <input
            id="carbs"
            data-testid="food-carbs-input"
            type="number"
            min="0"
            step="0.1"
            value={carbsGrams}
            onChange={(e) => setCarbsGrams(Number(e.target.value))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fat">Gorduras (g)</label>
          <input
            id="fat"
            data-testid="food-fat-input"
            type="number"
            min="0"
            step="0.1"
            value={fatGrams}
            onChange={(e) => setFatGrams(Number(e.target.value))}
            required
          />
        </div>
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Total estimado: <strong style={{ color: 'var(--accent)' }}>{estimatedCalories} kcal</strong>
        </span>
        <button type="submit" data-testid="add-food-btn">
          Adicionar Alimento
        </button>
      </div>
    </form>
  );
};
