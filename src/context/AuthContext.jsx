import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const userDatabase = {
  admin: {
    id: "A001",
    username: "admin",
    password: "123",
    name: "School Admin",
    role: "admin",
    email: "admin@school.com",
  },
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

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("schoolUser");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser?.id && parsedUser?.role) {
          setUser(parsedUser);
        }
      }
    } catch {
      localStorage.removeItem("schoolUser");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (username, password) => {
    const userData = Object.values(userDatabase).find(
      (u) =>
        u.username.toLowerCase() === username.toLowerCase() &&
        u.password === password
    );

    if (!userData) throw new Error("Invalid username or password");

    const newUser = {
      id: userData.id,
      username: userData.username,
      name: userData.name,
      role: userData.role,
      email: userData.email,
      subject: userData.subject || null,
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
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

/* Keep useAuth here so you don't edit other files */
export const useAuth = () => useContext(AuthContext);