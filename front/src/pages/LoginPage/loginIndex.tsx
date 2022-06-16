import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../generalComponents/Navbar/NavbarComponent";
import { LoginForm } from "./components/LoginForm";

import "./loginIndexStyles.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const links: { href: string; text: string }[] = [
    { href: "/login", text: "Entrar" },
    { href: "/register", text: "Cadastrar" },
  ];

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    if (recoveredUser) {
      navigate("/");
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
