export default function FoodForm({ food, onFoodChange }) {
  return (
    <div>
      <span className="block text-2xl">{food.name || 'Untitled Food'}</span>

      <div>
        <label className="block">Calories</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={food.calories}
          onChange={e => onFoodChange(e, 'calories', food)}
        />
      </div>
      <div>
        <label className="block">Fat</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={food.fat}
          onChange={e => onFoodChange(e, 'fat', food)}
        />
      </div>
      <div>
        <label className="block">Carbs</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={food.carbs}
          onChange={e => onFoodChange(e, 'carbs', food)}
        />
      </div>
      <div>
        <label className="block">Protein</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={food.protein}
          onChange={e => onFoodChange(e, 'protein', food)}
        />
      </div>
      <div>
        <label className="block">Name</label>
        <input
          className="block border border-black"
          type="text"
          value={food.name}
          onChange={e => onFoodChange(e, 'name', food)}
        />
      </div>
      <div>
        <label className="block">Min</label>
        <input
          className="block border border-black"
          type="number"
          min={-1}
          value={food.min}
          onChange={e => onFoodChange(e, 'min', food)}
        />
      </div>
      <div>
        <label className="block">Max</label>
        <input
          className="block border border-black"
          type="number"
          min={-1}
          value={food.max}
          onChange={e => onFoodChange(e, 'max', food)}
        />
      </div>
      <div>
        <label className="block">Fixed</label>
        <input
          className="block border border-black"
          type="number"
          min={-1}
          value={food.fixed}
          onChange={e => onFoodChange(e, 'fixed', food)}
        />
      </div>
    </div>
  );
}
