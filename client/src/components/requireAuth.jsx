import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  
  const hasRequiredRole = auth?.roles?.some((role) => allowedRoles.includes(role));

  return hasRequiredRole ? (
    <Outlet />
  ) : auth?.username ? (
    <Navigate to={location.state?.from || "/"} state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );  
};

export default RequireAuth;