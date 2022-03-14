import { Link } from 'react-router-dom';
import './styles.css';

export const Navbar = () => {
  return (
    <nav className="admin-nav-container">
      <ul>
        <li>
          <Link to="/" className="admin-nav-item active">
            <p>Produtos</p>
          </Link>
        </li>
        <li>
          <Link to="/" className="admin-nav-item">
            <p>Categorias</p>
          </Link>
        </li>
        <li>
          <Link to="/" className="admin-nav-item">
            <p>Usuários</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
