import NextLink from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import styles from './Header.module.css';

export const Header = () => {
  const router = useRouter();

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="sticky-top"
    >
      <Container>
        <NextLink href="/" passHref>
          <Navbar.Brand>Lang</Navbar.Brand>
        </NextLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav activeKey={router.pathname} className="me-auto">
            <NextLink href="/about" passHref>
              <Nav.Link>About</Nav.Link>
            </NextLink>
            <NextLink href="/contact" passHref>
              <Nav.Link>Contact</Nav.Link>
            </NextLink>
          </Nav>
          <Nav activeKey={router.pathname}>
            <NextLink href="/register" passHref>
              <Nav.Link>Register</Nav.Link>
            </NextLink>
            <NextLink href="/login" passHref>
              <Nav.Link>Login</Nav.Link>
            </NextLink>
            <NextLink href="/profile" passHref>
              <Nav.Link>Profile</Nav.Link>
            </NextLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
