import { useEffect } from "react";
import { useSchool } from "../../context/SchoolContext";
import { CheckCircle, AlertTriangle, MessageCircle, Info } from "lucide-react";

export default function Notifications() {
  const school = useSchool();
  const notifications = school.notifications || [];
  const setNotifications = school.setNotifications;

  useEffect(() => {
    if (!setNotifications) return;
    setNotifications((prev = []) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  }, [setNotifications]);

  const getStyle = (type) => {
    if (type === "success")
      return { bg: "bg-green-50", border: "border-green-200", icon: "text-green-600" };
    if (type === "warning")
      return { bg: "bg-yellow-50", border: "border-yellow-200", icon: "text-yellow-600" };
    if (type === "message")
      return { bg: "bg-blue-50", border: "border-blue-200", icon: "text-blue-600" };
    return { bg: "bg-gray-50", border: "border-gray-200", icon: "text-gray-600" };
  };

  const getIcon = (type) => {
    if (type === "success") return <CheckCircle className="w-5 h-5" />;
    if (type === "warning") return <AlertTriangle className="w-5 h-5" />;
    if (type === "message") return <MessageCircle className="w-5 h-5" />;
    return <Info className="w-5 h-5" />;
  };

  const styles = {
    success: getStyle("success"),
    warning: getStyle("warning"),
    message: getStyle("message"),
    info: getStyle("info"),
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
        <p className="text-xs text-gray-600 mt-1">Important updates about your child</p>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
            <Info className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 font-medium">No new notifications</p>
            <p className="text-xs text-gray-500 mt-1">You're all caught up!</p>
          </div>
        ) : (
          notifications.map((note) => {
            const style = styles[note.type] || styles.info;
            return (
              <div
                key={note.id}
                className={`border-l-4 p-4 rounded-md ${style.bg} ${style.border}`}
              >
                <div className="flex items-start gap-3">
                  <span className={`${style.icon} mt-0.5`}>
                    {getIcon(note.type)}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {note.text}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      {note.time || "Just now"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
