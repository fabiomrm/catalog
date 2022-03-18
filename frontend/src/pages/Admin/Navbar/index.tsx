import { AuthContext } from 'contexts/AuthContext';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { hasAnyRoles } from 'utils/auth';
import './styles.css';

export const Navbar = () => {

  const { authContextData } = useContext(AuthContext);

  return (
    <nav className="admin-nav-container">
      <p>{authContextData.roles}</p>
      <ul>
        <li>
          <NavLink to="/admin/products" className="admin-nav-item">
            <p>Produtos</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/categories" className="admin-nav-item">
            <p>Categorias</p>
          </NavLink>
        </li>
        {hasAnyRoles(['ROLE_ADMIN']) && (
          <li>
            <NavLink to="/admin/users" className="admin-nav-item">
              <p>Usuários</p>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
