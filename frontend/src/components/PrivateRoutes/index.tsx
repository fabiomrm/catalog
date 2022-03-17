import { Navigate, Routes } from "react-router-dom";
import { isAuthenticated } from "utils/requests"

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {

    const isAuth = isAuthenticated();

    return isAuth ? children : <Navigate to="/admin/auth"/>
}