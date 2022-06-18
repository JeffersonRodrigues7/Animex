import NavbarComponent from "../generalComponents/Navbar/NavbarComponent";
import { Profile } from "./components/Profile";
import "./profileIndexStyles.css";

const ProfilePage = () => {
  const links: { href: string; text: string }[] = [
    { href: "/profile", text: "Perfil" },
    { href: "/logout", text: "Sair" },
  ];

  return (
    <>
      <div id="navbar_component">
        <NavbarComponent links={links}></NavbarComponent>
      </div>
      <div id="profile_component">
        <Profile></Profile>
      </div>
    </>
  );
};

export default ProfilePage;
