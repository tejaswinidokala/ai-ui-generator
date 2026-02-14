export default function Navbar({ title = "App Title" }) {
  return (
    <div className="w-full bg-white shadow px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="space-x-3">
        <button className="text-sm text-gray-600">Login</button>
        <button className="text-sm text-gray-600">Signup</button>
      </div>
    </div>
  );
}
