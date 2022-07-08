import { Nav, Navbar, Container } from "react-bootstrap";
import "./navbarComponentsStyles.css";

interface Props {
  links: {
    href: string;
    text: string;
  }[];
}

const NavbarComponent = ({ links }: Props) => {
  return (
    <Navbar collapseOnSelect expand="xs" bg="dark" variant="dark">
      <Container id="navbar_container">
        <Navbar.Brand href="/1">Animex</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            {links.map((link: { href: string; text: string }, index) => (
              <Nav.Link key={index} className="navbar-nav ms-auto" href={link.href}>
                {link.text}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
