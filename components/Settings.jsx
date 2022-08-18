import TextField from './TextField';

export default function Settings() {
  return (
    <div className="bg-blue-100">
      <div className="container p-8 mx-auto">
        <h2 className="mb-2 text-3xl">Settings</h2>
        <div className="grid grid-cols-2 gap-4">
          <TextField label="Iterations" type="number" min="0" />
          <TextField label="Change Rate" type="number" min="0" />
        </div>
      </div>
    </div>
  );
}
