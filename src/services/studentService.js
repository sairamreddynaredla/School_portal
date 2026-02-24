import { students, parent } from "../data/dummydata";

export const getStudents = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(students), 300);
  });
};

export const getParent = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(parent), 300);
  });
};
