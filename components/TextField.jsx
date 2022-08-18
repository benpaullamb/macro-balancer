export default function TextField({ label, id, type = 'text', className = '', ...props }) {
  return (
    <div className={className}>
      <label htmlFor="id" className="mb-1 block text-sm">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="w-full px-2 py-1 block text-lg border border-gray-700 rounded-lg"
        {...props}
      />
    </div>
  );
}
