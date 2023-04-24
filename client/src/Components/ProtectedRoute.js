import { Navigate, Outlet } from "react-router-dom";
const PrivatedRoutes = () => {
  
  let auth = localStorage.getItem("user");
  return auth ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivatedRoutes;