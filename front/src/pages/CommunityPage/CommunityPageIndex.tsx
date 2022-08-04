import NavbarComponent from "../generalComponents/Navbar/NavbarComponent";
import Topics from "./components/Community";

const CommunityPage = () => {
  const links: { href: string; text: string }[] = [
    { href: "/profile", text: "Perfil" },
    { href: "/logout", text: "Sair" },
  ];

  return (
    <>
      <div id="navbar_component">
        <NavbarComponent links={links}></NavbarComponent>
      </div>

      <Topics />
    </>
  );
};

export default CommunityPage;
