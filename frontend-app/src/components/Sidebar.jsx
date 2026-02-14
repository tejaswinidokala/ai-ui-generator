export default function Sidebar({ items = [] }) {
  return (
    <div className="w-60 h-full bg-gray-900 text-white p-4 space-y-2">
      <h2 className="text-lg font-bold mb-4">Menu</h2>
      {items.map((item, i) => (
        <div
          key={i}
          className="p-2 rounded hover:bg-gray-700 cursor-pointer"
        >
          {item}
        </div>
      ))}
    </div>
  );
}
