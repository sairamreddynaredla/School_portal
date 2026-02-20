import { marks } from "../data/dummydata";

export const getMarks = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(marks), 300);
  });
};
