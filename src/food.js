export default class Food {
  constructor(options) {
    this.name = options.name;
    this.nutritionPer100g = { ...options.nutritionPer100g };
    this.gramLimits = options.gramLimits;
    this.grams = this.clampGrams(options.grams || 100);
  }

  addGrams(newGrams) {
    const copy = this.copy();
    copy.grams = this.clampGrams(this.grams + newGrams);
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

  clampGrams(grams) {
    if (this.gramLimits?.fixed) {
      return this.gramLimits.fixed;
    }

    let clamped = Math.max(grams, this.gramLimits?.min || 0);

    if (this.gramLimits?.max) {
      clamped = Math.min(clamped, this.gramLimits.max);
    }

    return clamped;
  }

  copy() {
    return new Food({ ...this });
  }
}
