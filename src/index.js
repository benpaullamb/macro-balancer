import logUpdate from 'log-update';
import Food from './food.js';
import MealSolution from './meal-solution.js';

const chicken = new Food({
  name: 'Chicken Breast',
  nutritionPer100g: {
    kcal: 106,
    fat: 1.1,
    carbs: 0,
    protein: 24,
  },
});

const rice = new Food({
  name: 'Wholegrain Rice',
  nutritionPer100g: {
    kcal: 164,
    fat: 2.5,
    carbs: 31,
    protein: 3.7,
  },
  gramLimits: {
    max: 250,
  },
});

const veg = new Food({
  name: 'Broccoli',
  nutritionPer100g: {
    kcal: 34,
    fat: 0.7,
    carbs: 3.2,
    protein: 2.5,
  },
  gramLimits: {
    max: 200,
  },
});

const rmhcMealSolution = (targets, foods, iterations = 1000000, changeRate = 50) => {
  const startSolution = new MealSolution({
    targets,
    foods,
    changeRate,
  });

  let bestSolution = startSolution;

  for (let i = 0; i < iterations; i++) {
    const mutation = bestSolution.mutate();

    if (mutation.fitness() < bestSolution.fitness()) {
      bestSolution = mutation;
      logUpdate(`Fitness: ${bestSolution.fitness().toFixed(2)} (i: ${i})`);
    }
  }

  return bestSolution;
};

rmhcMealSolution(
  {
    calories: 700,
    carbs: 50,
    fat: 20,
    protein: 30,
  },
  [chicken, rice, veg]
).log();
