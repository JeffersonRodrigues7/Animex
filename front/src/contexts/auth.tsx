import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { HeadersDefaults } from "axios";
import { api, apiLogin, apiRegister } from "../services/api";
import { promisify } from "util";

interface CommonHeaderProperties extends HeadersDefaults {
    Authorization: string;
}

export interface AuthContextInterface {
    user?: String | null;
    authenticated?: boolean;
    loading?: boolean;
    login?: (email: string, password: string) => Promise<Number>;
    logout?: () => void;
    register?: (userName: string, email: string, password: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextInterface>({
    user: null,
    authenticated: false,
    loading: false,
    login: async () => 4,
    logout: () => {},
    register: async () => false,
});

export const AuthProvider = ({ children }: any) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (recoveredUser) {
            setAuthenticated(true);

            api.interceptors.request.use((config) => {
                //const token = // Recupere o token aqui;
                console.log("aqui2", config);
                config.headers!.Authorization = `Bearer ${token}`;
                return config;
            });
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        console.log("aqui", api.defaults.headers);

        setLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<Number> => {
        console.log("login", { email, password });

        try {
            const res = await apiLogin(email, password);
            if (res.status === 200) {
                console.log(res.data);

                const userId = res.data.user.id;
                const token = res.data.token;
                /*if (token) {
                    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                }*/

                localStorage.setItem("user", JSON.stringify(userId));
                localStorage.setItem("token", token);

                console.log("aqui", api.defaults.headers);
                setUser(userId);
                setAuthenticated(true);
                navigate("/");

                return 0;
            } else if (res.status === 204) return 1;
            else return 2;
        } catch (error) {
            console.log(error);
            return 3;
        }

        //api.defaults.headers.Authorization = `Bearer ${token}`
        /*api.interceptors.request.use((config) => {
            //const token = // Recupere o token aqui;
            console.log("aqui2", config);
            config.headers!.Authorization = `Bearer ${token}`;
            return config;
        });*/

        //api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    };

    const register = async (userName: string, email: string, password: string): Promise<boolean> => {
        try {
            const res = await apiRegister(userName, email, password);
            if (res.status === 201) {
                console.log(res.data);

                console.log("registrado: ", api.defaults.headers);

                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    const logout = () => {
        console.log("loggout");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        api.defaults.headers = {
            Authorization: "",
        } as CommonHeaderProperties;
        setUser(null);
        setAuthenticated(false);
        navigate("/login");
    };

    return <AuthContext.Provider value={{ authenticated, user, loading, login, logout, register }}>{children}</AuthContext.Provider>;
};
