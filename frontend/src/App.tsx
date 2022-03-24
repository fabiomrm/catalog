import './assets/styles/custom.scss';
import './App.css';
import { useState } from 'react';
import { MainRoutes } from 'MainRoutes';
import { AuthContext, AuthContextData } from 'contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  return (
    <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
      <MainRoutes />
      <ToastContainer />
    </AuthContext.Provider>
  );
}

export default App;
