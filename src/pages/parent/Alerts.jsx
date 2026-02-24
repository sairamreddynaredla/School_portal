import { useState } from "react";
import { AlertCircle, CheckCircle, Info, Bell } from "lucide-react";

export default function Alerts() {
  const [alerts] = useState([
    {
      id: 1,
      type: "info",
      title: "Attendance Update",
      message: "Your child attended all classes today.",
      time: "Today • 3:45 PM",
    },
    {
      id: 2,
      type: "success",
      title: "Assignment Submitted",
      message: "Math assignment successfully submitted before deadline.",
      time: "Today • 2:15 PM",
    },
    {
      id: 3,
      type: "warning",
      title: "Low Score Alert",
      message: "Recent test score needs attention. Please review.",
      time: "Yesterday • 4:30 PM",
    },
  ]);

  const [loading] = useState(false);

  const getAlertIcon = (type) => {
    if (type === "success")
      return <CheckCircle className="h-5 w-5 flex-shrink-0" />;
    if (type === "warning")
      return <AlertCircle className="h-5 w-5 flex-shrink-0" />;
    if (type === "info")
      return <Info className="h-5 w-5 flex-shrink-0" />;
    return <Bell className="h-5 w-5 flex-shrink-0" />;
  };

  const getAlertStyle = (type) => {
    if (type === "success")
      return "bg-green-50 border-l-4 border-green-500";
    if (type === "warning")
      return "bg-yellow-50 border-l-4 border-yellow-500";
    if (type === "info")
      return "bg-blue-50 border-l-4 border-blue-500";
    return "bg-gray-50 border-l-4 border-gray-500";
  };

  const getAlertIconColor = (type) => {
    if (type === "success") return "text-green-600";
    if (type === "warning") return "text-yellow-600";
    if (type === "info") return "text-blue-600";
    return "text-gray-600";
  };

  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
        <p className="mt-2 text-gray-600">Loading alerts...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Alerts & Updates
        </h1>
        <p className="text-gray-600">
          Important notifications about your child's school activities
        </p>
      </div>

      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <p className="text-sm font-medium text-green-700">
            Good News
          </p>
          <p className="mt-1 text-2xl font-bold text-green-600">
            {alerts.filter((a) => a.type === "success").length}
          </p>
        </div>

        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm font-medium text-yellow-700">
            Needs Attention
          </p>
          <p className="mt-1 text-2xl font-bold text-yellow-600">
            {alerts.filter((a) => a.type === "warning").length}
          </p>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm font-medium text-blue-700">
            Information
          </p>
          <p className="mt-1 text-2xl font-bold text-blue-600">
            {alerts.filter((a) => a.type === "info").length}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-12 text-center">
            <Bell className="mx-auto mb-3 h-12 w-12 text-gray-400" />
            <p className="font-medium text-gray-600">
              No alerts right now
            </p>
            <p className="mt-1 text-sm text-gray-500">
              All is well with your child's progress!
            </p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-lg border p-4 ${getAlertStyle(
                alert.type
              )}`}
            >
              <div className="flex gap-4">
                <div
                  className={`${getAlertIconColor(
                    alert.type
                  )} mt-0.5`}
                >
                  {getAlertIcon(alert.type)}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {alert.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-700">
                    {alert.message}
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    {alert.time}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}