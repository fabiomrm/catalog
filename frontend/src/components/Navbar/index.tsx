import './styles.css';
import 'bootstrap/js/src/collapse.js';
import { Link, NavLink } from 'react-router-dom';
import {
  getTokenData,
  isAuthenticated,
  removeAuthData,
  TokenData,
} from 'utils/requests';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type AuthData = {
  authenticated: boolean;
  tokenData?: TokenData;
};

export const Navbar = () => {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState<AuthData>({ authenticated: false });

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthData({
        authenticated: false,
      });
    }
  }, []);

  const handleLogoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    removeAuthData();
    setAuthData({
      authenticated: false,
    });

    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav">
      <div className="container-fluid">
        <Link to="/" className="nav-logo-text">
          <h4>DS Catalog</h4>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#catalog-navbar"
          aria-controls="catalog-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="catalog-navbar">
          <ul className="navbar-nav offset-md-2 main-menu">
            <li>
              <NavLink to="/">HOME</NavLink>
            </li>
            <li>
              <NavLink to="/products">CATÁLOGO</NavLink>
            </li>
            <li>
              <NavLink to="/admin">ADMIN</NavLink>
            </li>
          </ul>
        </div>
        <div>
          {authData.authenticated ? (
            <>
              <span>{authData.tokenData?.user_name}</span>
              <Link to="/admin/auth" onClick={handleLogoutClick}>
                LOGOUT
              </Link>
            </>
          ) : (
            <Link to="/admin/auth">LOGIN</Link>
          )}
        </div>
      </div>
    </nav>
  );
};
