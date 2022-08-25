import { useState } from 'react';
import { rmhcMealSolution } from '../rmhc';
import Food from '../rmhc/food';

export default function Home() {
  const [config, setConfig] = useState({
    iterations: 100000,
    changeRate: 50,
    calories: 700,
    fat: 20,
    carbs: 50,
    protein: 30
  });

  const [foods, setFoods] = useState([
    {
      name: 'Chicken',
      calories: 106,
      fat: 1.1,
      carbs: 0,
      protein: 24,
      min: 0,
      max: -1,
      fixed: -1
    },
    {
      name: 'Rice',
      calories: 164,
      fat: 2.5,
      carbs: 31,
      protein: 3.7,
      min: 0,
      max: -1,
      fixed: -1
    },
    {
      name: 'Broccoli',
      calories: 34,
      fat: 0.7,
      carbs: 3.2,
      protein: 2.5,
      min: 0,
      max: 200,
      fixed: -1
    }
  ]);

  const [results, setResults] = useState({
    gramsFoodA: 0,
    gramsFoodB: 0,
    gramsFoodC: 0,

    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0
  });

  const onConfigChange = (e, prop) => {
    const value = typeof config[prop] === 'number' ? Number(e.target.value) : e.target.value;
    setConfig({ ...config, [prop]: value });
  };

  const onFoodChange = (e, prop, food, i) => {
    const changedFood = { ...food };
    changedFood[prop] = typeof food[prop] === 'number' ? Number(e.target.value) : e.target.value;
    const allChangedFood = [...foods];
    allChangedFood[i] = changedFood;
    setFoods(allChangedFood);
  };

  const addFood = () => {
    setFoods([
      ...foods,
      {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
        min: 0,
        max: -1,
        fixed: -1
      }
    ]);
  };

  const run = () => {
    const rmhcFood = foods.map(
      food =>
        new Food({
          name: food.name,
          nutritionPer100g: {
            kcal: food.calories,
            fat: food.fat,
            carbs: food.carbs,
            protein: food.protein
          },
          gramLimits: {
            min: food.min === -1 ? undefined : food.min,
            max: food.max === -1 ? undefined : food.max,
            fixed: food.fixed === -1 ? undefined : food.fixed
          }
        })
    );

    const solution = rmhcMealSolution(
      {
        calories: config.calories,
        fat: config.fat,
        carbs: config.carbs,
        protein: config.protein
      },
      rmhcFood,
      config.iterations,
      config.changeRate
    );

    const { fat, carbs, protein } = solution.macroSplit();
    setResults({
      fat,
      carbs,
      protein,
      calories: solution.totalCalories(),
      gramsFoodA: solution.grams[0],
      gramsFoodB: solution.grams[1],
      gramsFoodC: solution.grams[2]
    });
  };

  return (
    <div>
      <span className="block text-2xl">Settings</span>

      <div>
        <label className="block">Iterations</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={config.iterations}
          onChange={e => onConfigChange(e, 'iterations')}
        />
      </div>
      <div>
        <label className="block">Change Rate</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={config.changeRate}
          onChange={e => onConfigChange(e, 'changeRate')}
        />
      </div>

      <span className="block">Targets</span>

      <div>
        <label className="block">Calories</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={config.calories}
          onChange={e => onConfigChange(e, 'calories')}
        />
      </div>
      <div>
        <label className="block">Fat</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={config.fat}
          onChange={e => onConfigChange(e, 'fat')}
        />
      </div>
      <div>
        <label className="block">Carbs</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={config.carbs}
          onChange={e => onConfigChange(e, 'carbs')}
        />
      </div>
      <div>
        <label className="block">Protein</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={config.protein}
          onChange={e => onConfigChange(e, 'protein')}
        />
      </div>

      <hr className="mt-4" />

      {foods.map((food, i) => (
        <div key={i}>
          <span className="block text-2xl">Food {i + 1}</span>

          <div>
            <label className="block">Calories</label>
            <input
              className="block border border-black"
              type="number"
              min={0}
              value={food.calories}
              onChange={e => onFoodChange(e, 'calories', food, i)}
            />
          </div>
          <div>
            <label className="block">Fat</label>
            <input
              className="block border border-black"
              type="number"
              min={0}
              value={food.fat}
              onChange={e => onFoodChange(e, 'fat', food, i)}
            />
          </div>
          <div>
            <label className="block">Carbs</label>
            <input
              className="block border border-black"
              type="number"
              min={0}
              value={food.carbs}
              onChange={e => onFoodChange(e, 'carbs', food, i)}
            />
          </div>
          <div>
            <label className="block">Protein</label>
            <input
              className="block border border-black"
              type="number"
              min={0}
              value={food.protein}
              onChange={e => onFoodChange(e, 'protein', food, i)}
            />
          </div>
          <div>
            <label className="block">Name</label>
            <input
              className="block border border-black"
              type="text"
              value={food.name}
              onChange={e => onFoodChange(e, 'name', food, i)}
            />
          </div>
          <div>
            <label className="block">Min</label>
            <input
              className="block border border-black"
              type="number"
              min={-1}
              value={food.min}
              onChange={e => onFoodChange(e, 'min', food, i)}
            />
          </div>
          <div>
            <label className="block">Max</label>
            <input
              className="block border border-black"
              type="number"
              min={-1}
              value={food.max}
              onChange={e => onFoodChange(e, 'max', food, i)}
            />
          </div>
          <div>
            <label className="block">Fixed</label>
            <input
              className="block border border-black"
              type="number"
              min={-1}
              value={food.fixed}
              onChange={e => onFoodChange(e, 'fixed', food, i)}
            />
          </div>
        </div>
      ))}

      <button onClick={run} className="mt-4 border text-xl">
        Run
      </button>

      <button onClick={addFood} className="mt-4 border text-xl">
        Add Food
      </button>

      <hr className="mt-4" />
      <span className="block text-2xl">Results</span>

      <span className="block">
        {config.nameFoodA} grams: {results.gramsFoodA}
      </span>
      <span className="block">
        {config.nameFoodB} grams: {results.gramsFoodB}
      </span>
      <span className="block">
        {config.nameFoodC} grams: {results.gramsFoodC}
      </span>

      <span className="block">Calories: {results.calories}</span>
      <span className="block">Fat: {results.fat}</span>
      <span className="block">Carbs: {results.carbs}</span>
      <span className="block">Protein: {results.protein}</span>
    </div>
  );
}
