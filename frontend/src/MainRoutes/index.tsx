import { Navbar } from 'components/Navbar';
import { PrivateRoute } from 'components/PrivateRoutes';
import { Admin } from 'pages/Admin';
import { Auth } from 'pages/Admin/Auth';
import { Login } from 'pages/Admin/Auth/Login';
import { Products } from 'pages/Admin/Products';
import { Users } from 'pages/Admin/Users';
import { Catalog } from 'pages/Catalog';
import { Home } from 'pages/Home';
import { ProductDetails } from 'pages/ProductDetails';
import { Navigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Catalog />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route
          path="/admin/auth"
          element={<Navigate to="/admin/auth/login" />}
        />
        <Route path="/admin/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<h1>Card de Signup</h1>} />
          <Route path="recover" element={<h1>Card de Recover</h1>} />
        </Route>

        <Route path="/admin" element={<Navigate to="/admin/products" />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="products/*" element={<PrivateRoute><Products /></PrivateRoute>} />
          <Route path="categories" element={<PrivateRoute><h1>CATEGORIES ADMIN</h1></PrivateRoute>} />
          <Route path="users" element={<PrivateRoute roles={["ROLE_ADMIN"]}><Users /></PrivateRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
