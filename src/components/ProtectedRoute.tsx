
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  useEffect(() => {
    console.log("ProtectedRoute rendered with:", { isAuthenticated, isLoading });
  }, [isAuthenticated, isLoading]);
  
  if (isLoading) {
    console.log("ProtectedRoute: Still loading");
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <p className="ml-2 text-sm text-muted-foreground">Loading auth state...</p>
      </div>
    );
  }
  
  console.log("ProtectedRoute: Loading complete, authenticated:", isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export const AuthRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  useEffect(() => {
    console.log("AuthRoute rendered with:", { isAuthenticated, isLoading });
  }, [isAuthenticated, isLoading]);
  
  if (isLoading) {
    console.log("AuthRoute: Still loading");
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <p className="ml-2 text-sm text-muted-foreground">Loading auth state...</p>
      </div>
    );
  }
  
  console.log("AuthRoute: Loading complete, authenticated:", isAuthenticated);
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
