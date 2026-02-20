import TeacherSidebar from "../components/TeacherSidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function TeacherLayout() {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Teacher Sidebar */}
      <TeacherSidebar />

      {/* Right Side */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
