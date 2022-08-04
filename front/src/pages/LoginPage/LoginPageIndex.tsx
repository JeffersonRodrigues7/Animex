import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import NavbarComponent from "../generalComponents/Navbar/NavbarComponent";
import LoginForm from "./components/LoginForm";

import "./loginPageIndexStyle.css";

const LoginPage = () => {
  const navigate: NavigateFunction = useNavigate();
  const links: { href: string; text: string }[] = [
    { href: "/login", text: "Entrar" },
    { href: "/register", text: "Cadastrar" },
  ];

  useEffect(() => {
    const recovered_user = localStorage.getItem("user");
    if (recovered_user) {
      navigate("/1");
    }
  }, []);

  return (
    <>
      <div id="navbar_component">
        <NavbarComponent links={links}></NavbarComponent>
      </div>
      <div id="login_form">
        <LoginForm></LoginForm>
      </div>
    </>
  );
};

export default LoginPage;
