export default class Food {
  constructor(options) {
    this.name = options.name;
    this.kcal = options.kcal;
    this.fat = options.fat;
    this.carbs = options.carbs;
    this.protein = options.protein;
    this.max = options.max;
    this.grams = options.grams || 100;
  }
}
