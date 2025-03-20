import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  
  console.log("Auth roles:", auth?.roles);
  console.log("Allowed roles:", allowedRoles);
  const hasRequiredRole = auth?.roles?.some((role) => allowedRoles.includes(role));
  console.log("Has required role:", hasRequiredRole);

  return hasRequiredRole ? (
    <Outlet /> // any child comp in req auth to protect page
  ) : auth?.username ? (
    <Navigate to="/home" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;