import { useState } from 'react';
import { rmhcMealSolution } from '../rmhc';
import Food from '../rmhc/food';
import FoodForm from '../components/FoodForm';
import TextField from '../components/TextField';
import Button from '../components/Button';

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
    <div className="p-4">
      <span className="block text-2xl">Settings</span>

      <TextField
        label="Iterations"
        className="mb-2"
        type="number"
        min={0}
        value={config.iterations}
        onChange={e => onConfigChange(e, 'iterations')}
      />
      <TextField
        label="Change Rate"
        className="mb-2"
        type="number"
        min={0}
        value={config.changeRate}
        onChange={e => onConfigChange(e, 'changeRate')}
      />

      <span className="block">Targets</span>

      <TextField
        label="Calories"
        className="mb-2"
        type="number"
        min={0}
        value={config.calories}
        onChange={e => onConfigChange(e, 'calories')}
      />
      <div className="mb-4 grid grid-cols-3 gap-2">
        <TextField
          label="Fat"
          type="number"
          min={0}
          value={config.fat}
          onChange={e => onConfigChange(e, 'fat')}
        />
        <TextField
          label="Carbs"
          type="number"
          min={0}
          value={config.carbs}
          onChange={e => onConfigChange(e, 'carbs')}
        />
        <TextField
          label="Protein"
          type="number"
          min={0}
          value={config.protein}
          onChange={e => onConfigChange(e, 'protein')}
        />
      </div>

      {foods.map((food, i) => (
        <FoodForm food={food} onFoodChange={onFoodChange} key={i} className="mb-4" />
      ))}

      <div className="mb-4 grid grid-cols-2 gap-2">
        <Button onClick={run}>Run</Button>

        <Button onClick={addFood}>Add Food</Button>
      </div>

      <span className="block text-2xl">Results</span>

      {results.grams.map((gram, i) => (
        <span className="block" key={i}>
          {foods[i].name}: {Math.round(gram)}g
        </span>
      ))}

      <span className="block">Calories: {Math.round(results.calories)}kcal</span>
      <span className="block">Fat: {Math.round(results.fat)}%</span>
      <span className="block">Carbs: {Math.round(results.carbs)}%</span>
      <span className="block">Protein: {Math.round(results.protein)}%</span>
    </div>
  );
}
