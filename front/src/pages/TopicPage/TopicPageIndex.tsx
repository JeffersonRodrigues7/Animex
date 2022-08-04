import NavbarComponent from "../generalComponents/Navbar/NavbarComponent";
import TopicPageComponent from "./components/Topic";
import "./topicPageIndexStyle.css";

export const TopicPage = () => {
  const links: { href: string; text: string }[] = [
    { href: "/profile", text: "Perfil" },
    { href: "/logout", text: "Sair" },
  ];

  return (
    <>
      <div id="navbar_component">
        <NavbarComponent links={links}></NavbarComponent>
      </div>
      <div id="topic_component">
        <TopicPageComponent></TopicPageComponent>
      </div>
    </>
  );
};

export default TopicPage;
