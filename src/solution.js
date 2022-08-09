import chalk from 'chalk';

export default class Solution {
  constructor(options) {
    this.targets = options.targets;
    this.changeRate = options.changeRate;
    this.foods = options.foods;
  }

  fitness() {
    let totalKcal = 0;
    let totalCarbsKcal = 0;
    let totalFatKcal = 0;
    let totalProteinKcal = 0;

    this.foods.forEach(({ food, grams }) => {
      totalKcal += (food.kcal / 100) * grams;
      totalCarbsKcal += (food.carbs / 100) * grams * 4;
      totalFatKcal += (food.fat / 100) * grams * 9;
      totalProteinKcal += (food.protein / 100) * grams * 4;
    });

    const carbsPct = (totalCarbsKcal / totalKcal) * 100;
    const fatPct = (totalFatKcal / totalKcal) * 100;
    const proteinPct = (totalProteinKcal / totalKcal) * 100;

    const carbsDiff = Math.abs(this.targets.carbs - carbsPct);
    const fatDiff = Math.abs(this.targets.fat - fatPct);
    const proteinDiff = Math.abs(this.targets.protein - proteinPct);
    const kcalDiff = Math.abs(this.targets.calories - totalKcal);

    return kcalDiff + carbsDiff + fatDiff + proteinDiff;
  }

  mutate() {
    const newFoods = this.foods.map(({ food, grams, max }) => {
      const change = Math.random() * (this.changeRate * 2) - this.changeRate;
      let newGrams = grams + change;
      if (max) {
        newGrams = Math.min(newGrams, max);
      }

      return {
        food,
        grams: newGrams,
        max,
      };
    });

    const newSol = this.copy();
    newSol.foods = newFoods;
    return newSol;
  }

  copy() {
    return new Solution({
      targets: this.targets,
      changeRate: this.changeRate,
      foods: this.foods,
    });
  }

  log() {
    this.foods.forEach(({ food, grams }) => {
      console.log(`${chalk.green(`${food.name}:`)} ${chalk.bgGreen.black.bold(`${Math.round(grams)}g`)}`);
    });
  }
}
