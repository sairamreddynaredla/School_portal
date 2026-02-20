export function calculateAttendancePercentage(attendanceRecords = {}) {
  const totalDays = Object.keys(attendanceRecords).length;
  if (totalDays === 0) return 0;

  const presentDays = Object.values(attendanceRecords).filter(
    (status) => status === "Present"
  ).length;

  return Math.round((presentDays / totalDays) * 100);
}
