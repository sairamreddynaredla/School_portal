import { ALERT_CONFIG } from "../constants/alertConfig";

export default function AlertCard({ alert }) {
  const config = ALERT_CONFIG[alert?.type] || ALERT_CONFIG.info;

  return (
    <div className="group relative flex items-start gap-4 rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* Left Accent Bar */}
      <div
        className={`absolute left-0 top-0 h-full w-1 rounded-l-xl ${config.style.split(" ")[1]}`}
      />

      {/* Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-lg">
        {config.icon}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">
            {alert.title}
          </h2>

          {/* Type Badge */}
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 capitalize">
            {alert.type}
          </span>
        </div>

        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
          {alert.message}
        </p>

        <div className="flex items-center justify-between mt-3">
          <p className="text-xs text-gray-400">
            {alert.time}
          </p>

          {/* Hover Action (like notification panel) */}
          <button className="opacity-0 group-hover:opacity-100 text-xs text-blue-600 transition">
            View
          </button>
        </div>
      </div>
    </div>
  );
}
