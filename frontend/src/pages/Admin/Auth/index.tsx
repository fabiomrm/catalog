import { ReactComponent as AuthImage } from 'assets/images/auth-img.svg';
import { Outlet } from 'react-router-dom';

export const Auth = () => {
    return(
        <div className="auth-container">
            <div className="auth-banner-container">
                <h1>Divulgue seus produtos neste Catálogo</h1>
                <p>Faça parte do nosso catálogo de divulgação e aumente a venda de seus produtos</p>
                <AuthImage />
            </div>
            <div className="auth-form-container">
                <Outlet />
            </div>
        </div>
    )
}