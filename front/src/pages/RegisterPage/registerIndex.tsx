import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "./components/RegisterForm";
import NavbarComponent from "../generalComponents/Navbar/NavbarComponent";
import "./registerIndexstyles.css";

const RegisterPage = () => {
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
      <div id="register_form">
        <RegisterForm></RegisterForm>
      </div>
    </>
  );
};

export default RegisterPage;
