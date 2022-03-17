import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ButtonIcon } from 'components/ButtonIcon';
import { useForm } from 'react-hook-form';

import './styles.css';
import {
  getTokenData,
  requestBackendLogin,
  saveAuthData,
} from 'utils/requests';
import { useContext, useState } from 'react';
import { AuthContext } from 'contexts/AuthContext';

type FormData = {
  username: string;
  password: string;
};

type LocationState = {
  from: Location;
}

export const Login = () => {
  const {  setAuthContextData } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { from } = location.state ? location.state as any : '/admin';

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((res) => {
        saveAuthData(res.data);

        setHasError(false);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        });
        
          navigate(from, {replace: true});
      })
      .catch((err) => {
        setHasError(true);
      });
  };

  return (
    <div className="base-card login-card">
      <h1>LOGIN</h1>
      {hasError && (
        <div className="alert alert-danger">Erro ao tentar efetuar login</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            {...register('username', {
              required: 'Campo obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido',
              },
            })}
            name="username"
            type="text"
            className={`form-control base-input ${
              errors.username ? 'is-invalid' : ''
            }`}
            placeholder="Email"
          />
          <div className="invalid-feedback d-block">
            {errors.username?.message}
          </div>
        </div>
        <div className="mb-2">
          <input
            {...register('password', {
              required: 'Campo obrigatório',
            })}
            type="password"
            className={`form-control base-input  ${
              errors.password ? 'is-invalid' : ''
            }`}
            placeholder="Password"
            name="password"
          />
          <div className="invalid-feedback d-block">
            {errors.password?.message}
          </div>
        </div>
        <Link to="/admin/auth/recover" className="login-link-recover">
          Esqueci a senha
        </Link>
        <div className="login-submit">
          <ButtonIcon text="Fazer login" />
        </div>
        <div className="signup-container">
          <span className="not-registered">Não tem Cadastro?</span>
          <Link to="/admin/auth/register" className="login-link-register">
            CADASTRAR
          </Link>
        </div>
      </form>
    </div>
  );
};
