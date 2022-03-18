import { Navigate, Routes, useLocation } from "react-router-dom";
import { isAuthenticated, Role } from "utils/auth";



type Props = {
    children: React.ReactNode;
    roles?: Role[];
}

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {

    const isAuth = isAuthenticated();
    const location = useLocation();
    
    


    return isAuth ? children : <Navigate to='/admin/auth/login' state={{ from: location}}/>
}