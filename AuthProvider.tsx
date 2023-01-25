import { createContext, useState } from "react";

interface AuthContextProps {
    auth: {
      token?: string;
      email?: string;
      fullName?: string;
      type?:string;
    };
    login: (token: string, email: string, fullName: string,type:string) => void;
    logout: () => void;
  }
  
  export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
  
  interface AuthProviderProps {
    children: React.ReactNode;
  }
  
  export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState<AuthContextProps['auth']>({});
  
    const login = (token: string, email: string, fullName: string, type : string) => {
      setAuth({ token, email, fullName,type});
    };
  
    const logout = () => {
      setAuth({});
    };
  
    return (
      <AuthContext.Provider value={{ auth, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };