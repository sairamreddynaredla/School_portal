import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white p-6 space-y-6">
      <h2 className="text-xl font-bold">School ERP</h2>

      <nav className="space-y-3">
        <Link to="/admin" className="block hover:text-blue-400">
          Dashboard
        </Link>

        <Link to="/admin/students" className="block hover:text-blue-400">
          Students
        </Link>

        <Link to="/admin/teachers" className="block hover:text-blue-400">
          Teachers
        </Link>

        <Link to="/admin/classes" className="block hover:text-blue-400">
          Classes
        </Link>
      </nav>
    </div>
  );
}