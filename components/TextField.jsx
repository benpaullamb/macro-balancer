export default function TextField({ label, className = '', ...props }) {
  return (
    <div className={className}>
      <label className="mb-1 block text-sm">{label}</label>
      <input className="w-full px-2 py-1 block border border-gray-800 rounded-lg" {...props} />
    </div>
  );
}
