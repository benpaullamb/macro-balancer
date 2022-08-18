export default function Progress({ percent = 50, barClass = '', bgClass = '', children }) {
  return (
    <div className={`${bgClass} h-6 rounded-lg`}>
      <div
        style={{ width: `${percent}%` }}
        className={`${barClass} h-full flex justify-center items-center rounded-lg text-white`}>
        {children}
      </div>
    </div>
  );
}
