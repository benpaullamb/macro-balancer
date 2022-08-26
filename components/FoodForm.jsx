import TextField from './TextField';

export default function FoodForm({ food, onFoodChange, className = '' }) {
  return (
    <div className={className}>
      <span className="block text-2xl">{food.name || 'Untitled Food'}</span>

      <TextField
        label="Name"
        className="mb-2"
        type="text"
        value={food.name}
        onChange={e => onFoodChange(e, 'name', food)}
      />
      <TextField
        label="Calories"
        className="mb-2"
        type="number"
        min={0}
        value={food.calories}
        onChange={e => onFoodChange(e, 'calories', food)}
      />
      <div className="mb-2 grid grid-cols-3 gap-2">
        <TextField
          label="Fat"
          type="number"
          min={0}
          value={food.fat}
          onChange={e => onFoodChange(e, 'fat', food)}
        />
        <TextField
          label="Carbs"
          type="number"
          min={0}
          value={food.carbs}
          onChange={e => onFoodChange(e, 'carbs', food)}
        />
        <TextField
          label="Protein"
          type="number"
          min={0}
          value={food.protein}
          onChange={e => onFoodChange(e, 'protein', food)}
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <TextField
          label="Min"
          type="number"
          min={-1}
          value={food.min}
          onChange={e => onFoodChange(e, 'min', food)}
        />
        <TextField
          label="Max"
          type="number"
          min={-1}
          value={food.max}
          onChange={e => onFoodChange(e, 'max', food)}
        />
        <TextField
          label="Fixed"
          type="number"
          min={-1}
          value={food.fixed}
          onChange={e => onFoodChange(e, 'fixed', food)}
        />
      </div>
    </div>
  );
}
