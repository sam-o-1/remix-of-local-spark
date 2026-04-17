import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, Role } from "@/contexts/AuthContext";

interface Props {
  children: ReactNode;
  requireRoles?: Role[];
}

const ProtectedRoute = ({ children, requireRoles }: Props) => {
  const { user, role, loading } = useAuth();
  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Loading...</div>;
  }
  if (!user) return <Navigate to="/auth" replace />;
  if (requireRoles && role && !requireRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
