import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log(
    "auth check \n",
    auth?.roles?.some((role) => allowedRoles.includes(role)),
    auth?.roles
  );

  return auth?.roles?.some((role) => allowedRoles.includes(role)) ? (
    <Outlet /> // any child comp in req auth to protect page
  ) : auth?.user ? (
    <Navigate to="/home" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;