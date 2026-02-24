import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const userDatabase = {
  teacher: {
    id: "T001",
    username: "teacher",
    password: "123",
    name: "Mr. James Smith",
    role: "teacher",
    email: "james.smith@school.com",
    subject: "Mathematics",
  },
  parent: {
    id: "P001",
    username: "parent",
    password: "123",
    name: "Ramesh Kumar",
    role: "parent",
    email: "ramesh.kumar@email.com",
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("schoolUser");

      if (saved) {
        const parsedUser = JSON.parse(saved);

        if (
          parsedUser.id &&
          parsedUser.username &&
          parsedUser.role
        ) {
          return parsedUser;
        }
      }
    } catch {
      localStorage.removeItem("schoolUser");
    }

    return null;
  });

  const login = (username, password) => {
    const userData = userDatabase[username];

    if (!userData || userData.password !== password) {
      throw new Error("Invalid username or password");
    }

    const newUser = {
      id: userData.id,
      username: userData.username,
      name: userData.name,
      role: userData.role,
      email: userData.email,
      ...(userData.subject && { subject: userData.subject }),
    };

    setUser(newUser);
    localStorage.setItem("schoolUser", JSON.stringify(newUser));

    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("schoolUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);