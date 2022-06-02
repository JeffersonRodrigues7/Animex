import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import "./loginIndexStyles.css";

const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const recoveredUser = localStorage.getItem("user");
        if (recoveredUser) {
            navigate("/");
        }
    }, []);

    return (
        <div id="login_form">
            <LoginForm></LoginForm>
        </div>
    );
};

export default LoginPage;
