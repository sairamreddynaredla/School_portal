import { createContext, useContext, useState } from "react";

// 🔐 Create Context
const AuthContext = createContext();

// Sample user database (mock backend)
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

// 👤 Provider
export function AuthProvider({ children }) {
  // Load user from localStorage (persistent login)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("schoolUser");
      if (saved) {
        const parsedUser = JSON.parse(saved);
        // Validate the user object has required fields
        if (parsedUser.id && parsedUser.username && parsedUser.role) {
          return parsedUser;
        }
      }
    } catch (e) {
      // Silently handle error and clear corrupted data
      localStorage.removeItem("schoolUser");
    }
    return null;
  });

  // ✅ Login with credentials
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

  // ✅ Logout
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

// 🪝 Custom Hook
export const useAuth = () => useContext(AuthContext);
