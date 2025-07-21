import { createContext, useContext, useEffect, useState } from "react";

type UserPayload = {
  id: number;
  email: string;
  role: string;
};

type AuthContextType = {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserPayload | null;
  setUser: React.Dispatch<React.SetStateAction<UserPayload | null>>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<UserPayload | null>(null);

  useEffect(() => {
    fetch("http://localhost:3310/api/refresh", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Token invalide");
        }
        return res.json();
      })
      .then((data) => {
        setIsLogged(true);
        setUser(data);
      })
      .catch(() => {
        setIsLogged(false);
        setUser(null);
      });
  }, []);

  const logout = () => {
    fetch("http://localhost:3310/api/auth/logout", {
      credentials: "include",
    }).then(() => {
      setIsLogged(false);
      setUser(null);
    });
  };

  return (
    <AuthContext.Provider
      value={{ isLogged, setIsLogged, user, setUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
