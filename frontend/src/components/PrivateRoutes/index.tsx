import { Navigate, Routes, useLocation } from "react-router-dom";
import { isAuthenticated } from "utils/requests"

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {

    const isAuth = isAuthenticated();
    const location = useLocation();
    console.log(location)

    return isAuth ? children : <Navigate to='/admin/auth/login' state={{ from: location}}/>
}