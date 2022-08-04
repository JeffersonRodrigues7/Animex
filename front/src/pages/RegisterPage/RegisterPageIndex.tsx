import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import NavbarComponent from "../generalComponents/Navbar/NavbarComponent";
import "./registerPageIndexStyle.css";

const RegisterPage = () => {
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
      <div id="register_form">
        <RegisterForm></RegisterForm>
      </div>
    </>
  );
};

export default RegisterPage;
