
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  console.log("AuthProvider rendering, isLoading:", isLoading);

  useEffect(() => {
    console.log("AuthProvider useEffect running");
    // Check if user is logged in on component mount
    const storedUser = localStorage.getItem("user");
    console.log("Stored user found:", !!storedUser);
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("User parsed successfully:", parsedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error("Failed to parse stored user", e);
        localStorage.removeItem("user");
      }
    } else {
      console.log("No stored user found");
    }
    
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    console.log("Login called with user:", userData);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    console.log("Logout called");
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  console.log("AuthProvider state:", { user, isAuthenticated: !!user, isLoading });

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
