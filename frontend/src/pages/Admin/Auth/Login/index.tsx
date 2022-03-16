import { Link } from 'react-router-dom';
import { ButtonIcon } from 'components/ButtonIcon';
import { useForm } from 'react-hook-form';

import './styles.css';
import { requestBackendLogin } from 'utils/requests';
import { useState } from 'react';

type FormData = {
  username: string;
  password: string;
};

export const Login = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [hasError, setHasError] = useState(false);

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((res) => {
        setHasError(false);
        console.log('Sucesso', res);
      })
      .catch((err) => {
        setHasError(true);
        console.log('ERROR', err);
      });
  };

  return (
    <div className="base-card login-card">
      <h1>LOGIN</h1>
      {hasError && (
        <div className="alert alert-danger">
          Erro ao tentar efetuar login
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            {...register('username')}
            name="username"
            type="text"
            className="form-control base-input"
            placeholder="Email"
          />
        </div>
        <div className="mb-2">
          <input
            {...register('password')}
            type="password"
            className="form-control base-input "
            placeholder="Password"
            name="password"
          />
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
