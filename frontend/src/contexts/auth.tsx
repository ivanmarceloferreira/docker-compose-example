import { jwtDecode } from "jwt-decode";
import { createContext, ReactElement, useState } from "react";

type AuthContextData = {
  setUser: (user: object) => void;
  user: object | null;
  login: (userToken: string) => void;
  logout: () => void;
  authenticated: boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  const [user, setUser] = useState<object | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  const login = (userToken: string) => {
    const userDecoded = jwtDecode(userToken);
    setUser(userDecoded);
    localStorage.setItem("token", userToken);
    setAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    localStorage.setItem("token", "");
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ setUser, user, login, logout, authenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
