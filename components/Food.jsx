import TextField from './TextField';

export default function Food({ id = 0, ...props }) {
  return (
    <div {...props}>
      <h3 className="mb-2 text-lg"></h3>
      <TextField label={`Name of Food #${id}`} className="mb-2" />
      <h4 className="mb-2">
        Nutrition <span className="text-sm">(per 100g)</span>
      </h4>
      <TextField label="Calories (kcal)" type="number" min="0" className="mb-2" />
      <div className="grid grid-cols-3 gap-4">
        <TextField label="Fat (g)" type="number" min="0" />
        <TextField label="Carbs (g)" type="number" min="0" />
        <TextField label="Protein (g)" type="number" min="0" />
      </div>
    </div>
  );
}
