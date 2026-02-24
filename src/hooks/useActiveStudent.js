import { useContext, useMemo } from "react";
import { SchoolContext } from "../context/SchoolContext";

export default function useActiveStudent() {
  const { students, activeStudentId } = useContext(SchoolContext);

  const student = useMemo(() => {
    return students.find((s) => s.id === activeStudentId);
  }, [students, activeStudentId]);

  return student;
}
