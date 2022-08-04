import { AxiosResponse } from "axios";
import { createContext, useState, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { apiLogin, apiRegister } from "../services/api";

export interface AuthContextInterface {
  id?: number;
  user?: string;
  authenticated?: boolean;
  loading?: boolean;
  login?: (email: string, password: string) => Promise<number>;
  logout?: () => void;
  register?: (username: string, email: string, password: string, accessLevel: number, biography: string) => Promise<boolean>;
}

interface LoginInterface {
  user: {
    user_id: number;
    username: string;
  };
  token: string;
}

export const AuthContext = createContext<AuthContextInterface>({
  id: 0,
  user: "",
  authenticated: false,
  loading: false,
  login: async () => 3,
  logout: () => {},
  register: async () => false,
});

export const AuthProvider = ({ children }: any): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const [id, setId] = useState(0);
  const [user, setUser] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string): Promise<number> => {
    try {
      const res_login: AxiosResponse = await apiLogin(email, password);
      if (res_login.status === 200) {
        const res_login_data = res_login.data as LoginInterface;

        const user_id: number = res_login_data.user.user_id;
        const username: string = res_login_data.user.username;
        const token: string = res_login_data.token;

        localStorage.setItem("id", JSON.stringify(user_id));
        localStorage.setItem("user", username);
        localStorage.setItem("token", token);

        setId(Number(user_id));
        setUser(username);
        setAuthenticated(true);
        navigate("/1");

        return 0;
      } else if (res_login.status === 204) return 1;
      else return 2;
    } catch (error: any) {
      console.error(`Error when trying to login user with email ${email}: `, error);
      return 3;
    }
  };

  const register = async (username: string, email: string, password: string, accessLevel: number, biography: string): Promise<boolean> => {
    try {
      const res_register: AxiosResponse = await apiRegister(username, email, password, accessLevel, biography);
      if (res_register.status === 201) return true;
      return false;
    } catch (error: any) {
      console.error(`Error when trying to register user with email ${email}: `, error);
      return false;
    }
  };

  const logout = (): void => {
    localStorage.removeItem("id");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setId(0);
    setUser("");
    setAuthenticated(false);
    navigate("/login");
  };

  useEffect(() => {
    const recovered_id: string | null = localStorage.getItem("id");
    const recovered_user: string | null = localStorage.getItem("user");
    if (recovered_id && recovered_user) {
      setId(Number(recovered_id));
      setUser(recovered_user);
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  return <AuthContext.Provider value={{ authenticated, id, user, loading, login, logout, register }}>{children}</AuthContext.Provider>;
};
