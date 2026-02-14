export default function Table({ columns = [], data = [] }) {
  return (
    <div className="overflow-x-auto border rounded-lg bg-white">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="px-4 py-2 font-semibold">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4 text-gray-400">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rIndex) => (
              <tr key={rIndex} className="border-t">
                {row.map((cell, cIndex) => (
                  <td key={cIndex} className="px-4 py-2">{cell}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
