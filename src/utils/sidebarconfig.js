export const notificationCount = 3;

export const navClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded transition ${
    isActive
      ? "bg-blue-600 text-white"
      : "text-gray-700 hover:bg-blue-100"
  }`;