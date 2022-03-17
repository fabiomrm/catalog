import './assets/styles/custom.scss';
import './App.css';
import { useState } from 'react';
import { MainRoutes } from 'MainRoutes';
import { AuthContext, AuthContextData } from 'contexts/AuthContext';

function App() {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  return (
    <AuthContext.Provider value={{authContextData, setAuthContextData}}>
      <MainRoutes />;
    </AuthContext.Provider>
  );
}

export default App;
