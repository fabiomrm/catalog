import { AuthContext } from 'contexts/AuthContext';
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { hasAnyRoles, isAuthenticated, Role } from 'utils/auth';


type Props = {
  children: JSX.Element;
  roles?: Role[];
};

export const PrivateRoute = ({ roles, children }: Props) => {
  const isAuth = isAuthenticated();
  const location = useLocation();
  const navigate = useNavigate();

  const { authContextData } = useContext(AuthContext);

  useEffect(() => {
  
    if(!isAuth) {
      navigate("/", {state: {from: location}});
    } else if (isAuth && (roles && !hasAnyRoles(roles))) {
      navigate("/admin/products",{replace: true, state: {from: location}})
    }
  }, [authContextData])


  return <>{children}</>;
};
