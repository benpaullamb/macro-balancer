export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`${className} w-full p-2 bg-blue-600 rounded-lg text-white text-sm font-bold uppercase`}
      {...props}>
      {children}
    </button>
  );
}
