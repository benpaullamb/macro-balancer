export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`${className} min-w-[6rem] px-4 py-2 bg-gradient-to-r from-blue-700 to-teal-600 border rounded-lg text-sm text-white font-bold uppercase`}
      {...props}>
      {children}
    </button>
  );
}
