import { ALERT_CONFIG } from "../constants/alertconfig";

export default function AlertCard({ alert }) {
  /* --------------------------------------------------
     Safe fallback values
     -------------------------------------------------- */
  const type = alert?.type || "info";
  const config = ALERT_CONFIG[type] || ALERT_CONFIG.info;

  return (
    <div
      className={`group relative flex items-start gap-4 rounded-xl border p-5 
      shadow-sm transition-all duration-300 hover:shadow-md ${config.style}`}
    >
      {/* Left Accent Bar */}
      <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gray-300" />

      {/* Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-lg">
        {config.icon}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">
            {alert?.title || "Alert"}
          </h2>

          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs capitalize text-gray-600">
            {type}
          </span>
        </div>

        <p className="mt-1 text-sm leading-relaxed text-gray-600">
          {alert?.message || ""}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            {alert?.time || ""}
          </p>

          <button className="text-xs text-blue-600 opacity-0 transition group-hover:opacity-100">
            View
          </button>
        </div>
      </div>
    </div>
  );
}