import { Outlet } from "react-router-dom";
import TeacherSidebar from "../components/TeacherSidebar";
import Navbar from "../components/Navbar";

export default function TeacherLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <TeacherSidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}