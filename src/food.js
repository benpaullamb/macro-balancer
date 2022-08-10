export default class Food {
  constructor(options) {
    this.name = options.name;
    this.nutritionPer100g = { ...options.nutritionPer100g };
    this.maxGrams = options.maxGrams;
    this.grams = options.grams || 100;
  }

  addGrams(newGrams) {
    const copy = this.copy();
    const totalGrams = this.grams + newGrams;
    copy.grams = this.maxGrams ? Math.min(totalGrams, this.maxGrams) : totalGrams;
    return copy;
  }

  get kcal() {
    return (this.nutritionPer100g.kcal / 100) * this.grams;
  }
  get fatKcal() {
    return (this.nutritionPer100g.fat / 100) * this.grams * 9;
  }
  get carbsKcal() {
    return (this.nutritionPer100g.carbs / 100) * this.grams * 4;
  }
  get proteinKcal() {
    return (this.nutritionPer100g.protein / 100) * this.grams * 4;
  }

  copy() {
    return new Food({ ...this });
  }
}
