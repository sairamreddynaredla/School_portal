// src/services/authService.js

// Fake users (later this will come from backend API)
const users = [
  {
    id: 1,
    username: "teacher",
    password: "1234",
    role: "teacher",
    name: "Teacher User",
  },
  {
    id: 2,
    username: "parent",
    password: "1234",
    role: "parent",
    name: "Parent User",
  },
];

// ✅ Login function (simulate API)
export const loginUser = async (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        resolve({
          user,
          token: "fake-jwt-token-12345",
        });
      } else {
        reject("Invalid username or password");
      }
    }, 500);
  });
};

// ✅ Logout function
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
