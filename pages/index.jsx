import { useState } from 'react';
import { rmhcMealSolution } from '../rmhc';
import Food from '../rmhc/food';
import FoodForm from '../components/FoodForm';

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
    grams: [],
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0
  });

  const onConfigChange = (e, prop) => {
    const value = typeof config[prop] === 'number' ? Number(e.target.value) : e.target.value;
    setConfig({ ...config, [prop]: value });
  };

  const onFoodChange = (e, prop, food) => {
    const i = foods.findIndex(foodOption => foodOption === food);
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
      grams: solution.grams
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
        <FoodForm food={food} onFoodChange={onFoodChange} key={i} />
      ))}

      <button onClick={run} className="mt-4 border text-xl">
        Run
      </button>

      <button onClick={addFood} className="mt-4 border text-xl">
        Add Food
      </button>

      <hr className="mt-4" />
      <span className="block text-2xl">Results</span>

      {results.grams.map((gram, i) => (
        <span className="block" key={i}>
          {foods[i].name}: {gram}g
        </span>
      ))}

      <span className="block">Calories: {results.calories}</span>
      <span className="block">Fat: {results.fat}</span>
      <span className="block">Carbs: {results.carbs}</span>
      <span className="block">Protein: {results.protein}</span>
    </div>
  );
}
