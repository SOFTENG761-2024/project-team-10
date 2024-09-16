import { createContext, useContext, useState, useEffect } from "react";
import { useAPI } from "../APIProvider";
import { useLocalStorage } from "../LocalStorageProvider";
const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setItem, getItem } = useLocalStorage();
  const { get, post, setError } = useAPI();
  const [user, setUser] = useState(null);

  const login = async () => {
    setIsAuthenticated(true);
    setItem("isAuthenticated", true);
  };
  const logout = async () => {
    setIsAuthenticated(false);
    setItem("accessToken", "null");
    setItem("isAuthenticated", false);
  };

  useEffect(() => {
    const geCurrenttUser = async () => {
      return await get(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/current-user`,
      );
    };

    // try {
    //   setUser(geCurrenttUser());
    // } catch (error) {
    //   setError(error);
    // }
  }, [get]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
