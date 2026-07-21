import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AppLoader from "../../components/AppLoader";

export default function GuestRoute() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <AppLoader />;
  }

  return !isAuthenticated
    ? <Outlet />
    : <Navigate to="/admin/dashboard" replace />;
}