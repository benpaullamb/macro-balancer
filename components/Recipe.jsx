import Food from './Food';
import Button from './Button';

export default function Recipe() {
  return (
    <div>
      <div className="container p-8 mx-auto">
        <h2 className="mb-2 text-3xl">Recipe</h2>
        <div className="mb-4">
          <Food id={1} />
        </div>
        <Button>Add</Button>
      </div>
    </div>
  );
}
