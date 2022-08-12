export default class MealSolution {
  constructor(options) {
    this.targets = { ...options.targets };
    this.changeRate = options.changeRate;
    this.foods = options.foods;
  }

  fitness() {
    const { carbsPct, fatPct, proteinPct, totalKcal } = this.macros();

    const carbsDiff = Math.abs(this.targets.carbs - carbsPct);
    const fatDiff = Math.abs(this.targets.fat - fatPct);
    const proteinDiff = Math.abs(this.targets.protein - proteinPct);
    const kcalDiff = Math.abs(this.targets.calories - totalKcal);

    return kcalDiff + carbsDiff + fatDiff + proteinDiff;
  }

  macros() {
    let totalKcal = 0;
    let totalCarbsKcal = 0;
    let totalFatKcal = 0;
    let totalProteinKcal = 0;

    this.foods.forEach((food) => {
      totalKcal += food.kcal;
      totalCarbsKcal += food.carbsKcal;
      totalFatKcal += food.fatKcal;
      totalProteinKcal += food.proteinKcal;
    });

    const carbsPct = (totalCarbsKcal / totalKcal) * 100;
    const fatPct = (totalFatKcal / totalKcal) * 100;
    const proteinPct = (totalProteinKcal / totalKcal) * 100;

    return { carbsPct, fatPct, proteinPct, totalKcal };
  }

  mutate() {
    const newFoods = this.foods.map((food) => {
      const change = Math.random() * (this.changeRate * 2) - this.changeRate;
      return food.addGrams(change);
    });

    const copy = this.copy();
    copy.foods = newFoods;
    return copy;
  }

  copy() {
    return new MealSolution({ ...this });
  }

  log() {
    console.log(this.foods.map((food) => `${food.name}: ${Math.round(food.grams)}g`).join(' | '));

    const { carbsPct, fatPct, proteinPct, totalKcal } = this.macros();
    console.log(
      `Carbs: ${carbsPct.toFixed(0)}% | Fat: ${fatPct.toFixed(0)}% | Protein: ${proteinPct.toFixed(
        0
      )}% | ${totalKcal.toFixed(0)}kcal`
    );
  }
}