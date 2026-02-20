import { attendance } from "../data/dummydata";

export const getAttendance = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(attendance), 300);
  });
};
