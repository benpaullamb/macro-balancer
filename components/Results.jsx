import Progress from './Progress';

export default function Results() {
  return (
    <div>
      <div className="container p-8 mx-auto">
        <h2 className="mb-2 text-3xl">Results</h2>
        <div className="mb-2 grid grid-cols-[30%,1fr] items-center">
          <span>Fat</span>
          <Progress percent="20" bgClass="bg-gray-100" barClass="bg-red-500">
            20%
          </Progress>
        </div>
        <div className="mb-2 grid grid-cols-[30%,1fr] items-center">
          <span>Carbs</span>
          <Progress percent="50" bgClass="bg-gray-100" barClass="bg-blue-500">
            50%
          </Progress>
        </div>
        <div className="mb-2 grid grid-cols-[30%,1fr] items-center">
          <span>Protein</span>
          <Progress percent="30" bgClass="bg-gray-100" barClass="bg-green-500">
            30%
          </Progress>
        </div>
      </div>
    </div>
  );
}
