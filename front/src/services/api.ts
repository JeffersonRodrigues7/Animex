import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3001",
});

export const apiLogin = async (email: string, password: string) => {
    return api.post("/users/login", { email, password });
};

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers!.Authorization = token;
    }

    return config;
});

export const apiRegister = async (userName: string, email: string, password: string) => {
    return api.post("/users", { userName, email, password });
};
