import TextField from './TextField';

export default function Targets() {
  return (
    <div className="bg-blue-100">
      <div className="container p-8 mx-auto">
        <h2 className="mb-2 text-3xl">Targets</h2>
        <TextField label="Calories (kcal)" type="number" min="0" className="mb-2" />
        <div className="grid grid-cols-3 gap-4">
          <TextField label="Fat (%)" type="number" min="0" max="100" />
          <TextField label="Carbs (%)" type="number" min="0" max="100" />
          <TextField label="Protein (%)" type="number" min="0" max="100" />
        </div>
      </div>
    </div>
  );
}
