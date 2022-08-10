import logUpdate from 'log-update';
import chalk from 'chalk';
import Food from './food.js';
import Solution from './solution.js';

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
});

const veg = new Food({
  name: 'Broccoli',
  nutritionPer100g: {
    kcal: 34,
    fat: 0.7,
    carbs: 3.2,
    protein: 2.5,
  },
  maxGrams: 200,
});

console.log(chalk.bgBlue.black.bold('--- Macro Balancer by Ben Lamb ---'));

const solution = new Solution({
  targets: {
    calories: 700,
    carbs: 50,
    fat: 20,
    protein: 30,
  },
  foods: [chicken, rice, veg],
  changeRate: 10,
});

const findSolution = (startSolution, iterations = 1000000) => {
  let bestSolution = startSolution;

  for (let i = 0; i < iterations; i++) {
    const mutation = bestSolution.mutate();

    if (mutation.fitness() < bestSolution.fitness()) {
      bestSolution = mutation;
      logUpdate(`Fitness: ${bestSolution.fitness().toFixed(2)} ${chalk.gray(`(i: ${i})`)}`);
    }
  }

  return bestSolution;
};

findSolution(solution).log();
