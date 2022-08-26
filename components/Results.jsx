export default function Results({ foods, results }) {
  return (
    <div>
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
