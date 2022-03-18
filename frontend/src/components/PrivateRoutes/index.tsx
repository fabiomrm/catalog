import { AuthContext } from 'contexts/AuthContext';
import { useContext, useEffect } from 'react';
import { Navigate, Routes, useLocation, useNavigate } from 'react-router-dom';
import { hasAnyRoles, isAuthenticated, Role } from 'utils/auth';


type Props = {
  children: JSX.Element;
  roles?: Role[];
};

export const PrivateRoute = ({ roles }: Props) => {
  const isAuth = isAuthenticated();
  const location = useLocation();
  const navigate = useNavigate();

  const { authContextData } = useContext(AuthContext);

  useEffect(() => {
    console.log(isAuth)
    console.log(authContextData.roles)
    if(!isAuth) {
      navigate("/", {state: {from: location}});
      console.log('aqui')
    } else if (isAuth && (roles && !hasAnyRoles(roles))) {
      console.log('aqui 2')
      navigate("/admin/products",{replace: true, state: {from: location}})
    }
  }, [authContextData])


  return <></>;
};
