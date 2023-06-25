import { createContext, useMemo, useState } from "react";
import FirebaseAuth from "../handlers/auth";

export const AuthContext = createContext();
const { signIn, signOut, getCurrentUser } = FirebaseAuth;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async () => {
    try {
      const user = await signIn();
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      const response = await signOut();
      console.log(response);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const authenticate = () => getCurrentUser().then(setUser);

  const value = useMemo(() => {
    return {
      login,
      logout,
      authenticate,
      user,
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
