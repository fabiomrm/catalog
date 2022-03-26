import { createContext } from 'react';
import { Role } from 'types/Role';
import { TokenData } from 'utils/token';

export type AuthContextData = {
    authenticated: boolean;
    tokenData?: TokenData;
    roles?: Role[];
};

export type AuthContextType = {
    authContextData: AuthContextData;
    setAuthContextData: (authContextData: AuthContextData) => void;
}

export const AuthContext = createContext<AuthContextType>({
    authContextData: {
        authenticated: false,
    },
    setAuthContextData: () => null,
});