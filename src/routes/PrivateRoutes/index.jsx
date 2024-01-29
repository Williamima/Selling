import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../Providers/UserContext";

const PrivateRoutes = () => {
    const { user } = useUserContext();

    return user ? <Outlet /> : <Navigate to="/"/>
}

export { PrivateRoutes }