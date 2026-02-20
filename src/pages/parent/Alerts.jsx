import { useState } from "react";
import { AlertCircle, CheckCircle, Info, Bell } from "lucide-react";
import AlertCard from "../../components/AlertCard";

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
    if (type === "success") return <CheckCircle className="w-5 h-5 flex-shrink-0" />;
    if (type === "warning") return <AlertCircle className="w-5 h-5 flex-shrink-0" />;
    if (type === "info") return <Info className="w-5 h-5 flex-shrink-0" />;
    return <Bell className="w-5 h-5 flex-shrink-0" />;
  };

  const getAlertStyle = (type) => {
    if (type === "success") return "bg-green-50 border-l-4 border-green-500";
    if (type === "warning") return "bg-yellow-50 border-l-4 border-yellow-500";
    if (type === "info") return "bg-blue-50 border-l-4 border-blue-500";
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
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="text-gray-600 mt-2">Loading alerts...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Alerts & Updates</h1>
        <p className="text-gray-600">Important notifications about your child's school activities</p>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-700 font-medium">Good News</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {alerts.filter(a => a.type === "success").length}
          </p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-700 font-medium">Needs Attention</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {alerts.filter(a => a.type === "warning").length}
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700 font-medium">Information</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {alerts.filter(a => a.type === "info").length}
          </p>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">No alerts right now</p>
            <p className="text-gray-500 text-sm mt-1">All is well with your child's progress!</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border ${getAlertStyle(alert.type)}`}>
              <div className="flex gap-4">
                <div className={`${getAlertIconColor(alert.type)} mt-0.5`}>
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                  <p className="text-gray-700 text-sm mt-1">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
