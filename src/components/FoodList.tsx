import React from 'react';
import { FoodItem } from '../types';

interface FoodListProps {
  foods: FoodItem[];
  onRemoveFood: (id: string) => void;
}

export const FoodList: React.FC<FoodListProps> = ({ foods, onRemoveFood }) => {
  if (foods.length === 0) {
    return (
      <div className="card" data-testid="food-list-empty">
        <h2>Registro de Refeições</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Nenhum alimento registrado até o momento. Adicione um alimento acima para começar.
        </p>
      </div>
    );
  }

  return (
    <div className="card" data-testid="food-list">
      <h2>Registro de Refeições</h2>
      <table>
        <thead>
          <tr>
            <th>Alimento</th>
            <th>Calorias</th>
            <th>Proteínas</th>
            <th>Carboidratos</th>
            <th>Gorduras</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food.id} data-testid={`food-row-${food.id}`}>
              <td data-testid={`food-name-${food.id}`}>{food.name}</td>
              <td>{food.calories} kcal</td>
              <td>{food.proteinGrams}g</td>
              <td>{food.carbsGrams}g</td>
              <td>{food.fatGrams}g</td>
              <td>
                <button
                  type="button"
                  className="btn-danger"
                  data-testid={`delete-food-btn-${food.id}`}
                  onClick={() => onRemoveFood(food.id)}
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
