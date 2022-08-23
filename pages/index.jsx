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
    protein: 30,

    nameFoodA: 'Chicken',
    kcalFoodA: 106,
    fatFoodA: 1.1,
    carbsFoodA: 0,
    proteinFoodA: 24,
    minFoodA: 0,
    maxFoodA: -1,

    fixedFoodA: -1,
    nameFoodB: 'Rice',
    kcalFoodB: 164,
    fatFoodB: 2.5,
    carbsFoodB: 31,
    proteinFoodB: 3.7,
    minFoodB: 0,
    maxFoodB: 250,
    fixedFoodB: -1,

    nameFoodC: 'Broccoli',
    kcalFoodC: 34,
    fatFoodC: 0.7,
    carbsFoodC: 3.2,
    proteinFoodC: 2.5,
    minFoodC: 0,
    maxFoodC: 200,
    fixedFoodC: -1
  });

  const [results, setResults] = useState({
    gramsFoodA: 0,
    gramsFoodB: 0,
    gramsFoodC: 0,

    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0
  });

  const handleChange = (e, prop) => {
    const value = typeof config[prop] === 'number' ? Number(e.target.value) : e.target.value;
    setConfig({ ...config, [prop]: value });
  };

  const run = () => {
    const solution = rmhcMealSolution(
      {
        calories: config.calories,
        fat: config.fat,
        carbs: config.carbs,
        protein: config.protein
      },
      [
        new Food({
          name: config.nameFoodA,
          nutritionPer100g: {
            kcal: config.kcalFoodA,
            fat: config.fatFoodA,
            carbs: config.carbsFoodA,
            protein: config.proteinFoodA
          },
          gramLimits: {
            min: config.minFoodA === -1 ? undefined : config.minFoodA,
            max: config.maxFoodA === -1 ? undefined : config.maxFoodA,
            fixed: config.fixedFoodA === -1 ? undefined : config.fixedFoodA
          }
        }),
        new Food({
          name: config.nameFoodB,
          nutritionPer100g: {
            kcal: config.kcalFoodB,
            fat: config.fatFoodB,
            carbs: config.carbsFoodB,
            protein: config.proteinFoodB
          },
          gramLimits: {
            min: config.minFoodB === -1 ? undefined : config.minFoodB,
            max: config.maxFoodB === -1 ? undefined : config.maxFoodB,
            fixed: config.fixedFoodB === -1 ? undefined : config.fixedFoodB
          }
        }),
        new Food({
          name: config.nameFoodC,
          nutritionPer100g: {
            kcal: config.kcalFoodC,
            fat: config.fatFoodC,
            carbs: config.carbsFoodC,
            protein: config.proteinFoodC
          },
          gramLimits: {
            min: config.minFoodC === -1 ? undefined : config.minFoodC,
            max: config.maxFoodC === -1 ? undefined : config.maxFoodC,
            fixed: config.fixedFoodC === -1 ? undefined : config.fixedFoodC
          }
        })
      ],
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
          onChange={e => handleChange(e, 'iterations')}
        />
      </div>
      <div>
        <label className="block">Change Rate</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={config.changeRate}
          onChange={e => handleChange(e, 'changeRate')}
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
          onChange={e => handleChange(e, 'calories')}
        />
      </div>
      <div>
        <label className="block">Fat</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={config.fat}
          onChange={e => handleChange(e, 'fat')}
        />
      </div>
      <div>
        <label className="block">Carbs</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={config.carbs}
          onChange={e => handleChange(e, 'carbs')}
        />
      </div>
      <div>
        <label className="block">Protein</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={config.protein}
          onChange={e => handleChange(e, 'protein')}
        />
      </div>

      <hr className="mt-4" />
      <span className="block text-2xl">Food A</span>

      <div>
        <label className="block">Calories</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={config.kcalFoodA}
          onChange={e => handleChange(e, 'kcalFoodA')}
        />
      </div>
      <div>
        <label className="block">Fat</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={config.fatFoodA}
          onChange={e => handleChange(e, 'fatFoodA')}
        />
      </div>
      <div>
        <label className="block">Carbs</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={config.carbsFoodA}
          onChange={e => handleChange(e, 'carbsFoodA')}
        />
      </div>
      <div>
        <label className="block">Protein</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={config.proteinFoodA}
          onChange={e => handleChange(e, 'proteinFoodA')}
        />
      </div>
      <div>
        <label className="block">Name</label>
        <input
          className="block border border-black"
          type="text"
          value={config.nameFoodA}
          onChange={e => handleChange(e, 'nameFoodA')}
        />
      </div>
      <div>
        <label className="block">Min</label>
        <input
          className="block border border-black"
          type="number"
          min={-1}
          value={config.minFoodA}
          onChange={e => handleChange(e, 'minFoodA')}
        />
      </div>
      <div>
        <label className="block">Max</label>
        <input
          className="block border border-black"
          type="number"
          min={-1}
          value={config.maxFoodA}
          onChange={e => handleChange(e, 'maxFoodA')}
        />
      </div>
      <div>
        <label className="block">Fixed</label>
        <input
          className="block border border-black"
          type="number"
          min={-1}
          value={config.fixedFoodA}
          onChange={e => handleChange(e, 'fixedFoodA')}
        />
      </div>

      <hr className="mt-4" />
      <span className="block text-2xl">Food B</span>

      <div>
        <label className="block">Calories</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={config.kcalFoodB}
          onChange={e => handleChange(e, 'kcalFoodB')}
        />
      </div>
      <div>
        <label className="block">Fat</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={config.fatFoodB}
          onChange={e => handleChange(e, 'fatFoodB')}
        />
      </div>
      <div>
        <label className="block">Carbs</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={config.carbsFoodB}
          onChange={e => handleChange(e, 'carbsFoodB')}
        />
      </div>
      <div>
        <label className="block">Protein</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={config.proteinFoodB}
          onChange={e => handleChange(e, 'proteinFoodB')}
        />
      </div>
      <div>
        <label className="block">Name</label>
        <input
          className="block border border-black"
          type="text"
          value={config.nameFoodB}
          onChange={e => handleChange(e, 'nameFoodB')}
        />
      </div>
      <div>
        <label className="block">Min</label>
        <input
          className="block border border-black"
          type="number"
          min={-1}
          value={config.minFoodB}
          onChange={e => handleChange(e, 'minFoodB')}
        />
      </div>
      <div>
        <label className="block">Max</label>
        <input
          className="block border border-black"
          type="number"
          min={-1}
          value={config.maxFoodB}
          onChange={e => handleChange(e, 'maxFoodB')}
        />
      </div>
      <div>
        <label className="block">Fixed</label>
        <input
          className="block border border-black"
          type="number"
          min={-1}
          value={config.fixedFoodB}
          onChange={e => handleChange(e, 'fixedFoodB')}
        />
      </div>

      <hr className="mt-4" />
      <span className="block text-2xl">Food C</span>

      <div>
        <label className="block">Calories</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={config.kcalFoodC}
          onChange={e => handleChange(e, 'kcalFoodC')}
        />
      </div>
      <div>
        <label className="block">Fat</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={config.fatFoodC}
          onChange={e => handleChange(e, 'fatFoodC')}
        />
      </div>
      <div>
        <label className="block">Carbs</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={config.carbsFoodC}
          onChange={e => handleChange(e, 'carbsFoodC')}
        />
      </div>
      <div>
        <label className="block">Protein</label>
        <input
          className="block border border-black"
          type="number"
          min={0}
          value={config.proteinFoodC}
          onChange={e => handleChange(e, 'proteinFoodC')}
        />
      </div>
      <div>
        <label className="block">Name</label>
        <input
          className="block border border-black"
          type="text"
          value={config.nameFoodC}
          onChange={e => handleChange(e, 'nameFoodC')}
        />
      </div>
      <div>
        <label className="block">Min</label>
        <input
          className="block border border-black"
          type="number"
          min={-1}
          value={config.minFoodC}
          onChange={e => handleChange(e, 'minFoodC')}
        />
      </div>
      <div>
        <label className="block">Max</label>
        <input
          className="block border border-black"
          type="number"
          min={-1}
          value={config.maxFoodC}
          onChange={e => handleChange(e, 'maxFoodC')}
        />
      </div>
      <div>
        <label className="block">Fixed</label>
        <input
          className="block border border-black"
          type="number"
          min={-1}
          value={config.fixedFoodC}
          onChange={e => handleChange(e, 'fixedFoodC')}
        />
      </div>

      <button onClick={run} className="mt-4 border text-xl">
        Run
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
