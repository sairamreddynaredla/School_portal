import { useContext, useMemo } from "react";
import { SchoolContext } from "../context/SchoolContext";

export default function useActiveStudent() {
  const { students = [], activeStudentId } =
    useContext(SchoolContext);

  const student = useMemo(() => {
    if (!Array.isArray(students)) return null;

    return students.find(
      (s) => Number(s.id) === Number(activeStudentId)
    );
  }, [students, activeStudentId]);

  return student || null;
}