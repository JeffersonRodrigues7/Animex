import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiLogin, apiRegister } from "../services/api";

export interface AuthContextInterface {
    user?: string;
    authenticated?: boolean;
    loading?: boolean;
    login?: (email: string, password: string) => Promise<Number>;
    logout?: () => void;
    register?: (userName: string, email: string, password: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextInterface>({
    user: "",
    authenticated: false,
    loading: false,
    login: async () => 3,
    logout: () => {},
    register: async () => false,
});

export const AuthProvider = ({ children }: any) => {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem("user");
        if (recoveredUser) {
            setUser(recoveredUser);
            setAuthenticated(true);
        }

        setLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<Number> => {
        try {
            const res = await apiLogin(email, password);
            if (res.status === 200) {
                console.log(res.data);

                const userName = res.data.user.userName;
                const token = res.data.token;

                localStorage.setItem("user", JSON.stringify(userName));
                localStorage.setItem("token", token);

                setUser(userName);
                setAuthenticated(true);
                navigate("/");

                return 0;
            } else if (res.status === 204) return 1;
            else return 2;
        } catch (error) {
            console.error(error);
            return 3;
        }
    };

    const register = async (userName: string, email: string, password: string): Promise<boolean> => {
        try {
            const res = await apiRegister(userName, email, password);
            if (res.status === 201) return true;
            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser("");
        setAuthenticated(false);
        navigate("/login");
    };

    return <AuthContext.Provider value={{ authenticated, user, loading, login, logout, register }}>{children}</AuthContext.Provider>;
};
