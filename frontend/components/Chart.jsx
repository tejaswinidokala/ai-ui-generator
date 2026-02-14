export default function Chart({ title = "Analytics", data = [40, 70, 55, 90] }) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="flex items-end gap-3 h-40">
        {data.map((value, i) => (
          <div
            key={i}
            className="bg-blue-500 w-8 rounded"
            style={{ height: `${value}%` }}
          />
        ))}
      </div>
    </div>
  );
}
