import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  Container, Nav, Navbar, Button,
} from 'react-bootstrap';
import Logo from './rare.jpeg';

function AppNavBar({ token, setToken }) {
  const navigate = useRouter();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <Image src={Logo} height="50px" width="50px" className="navBarLogo" />
          </Navbar.Brand>
        </Link>
        <Navbar.Collapse>
          <Nav className="me-auto">
            { token ? (
              <>
                <Link passHref href="/posts/allPosts">
                  <Nav.Link>All Posts</Nav.Link>
                </Link>
                <Link passHref href="/posts/myPosts">
                  <Nav.Link>My Posts</Nav.Link>
                </Link>
                <Link passHref href="/categories/allCategories">
                  <Nav.Link>Category Manager</Nav.Link>
                </Link>
                <Link passHref href="/tags/allTags">
                  <Nav.Link>Tag Manager</Nav.Link>
                </Link>
              </>
            ) : (
              ''
            )}
          </Nav>
          {token ? (
            <Button
              type="button"
              className="d-flex"
              onClick={() => {
                setToken('');
                navigate.push('/login');
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Link passHref href="/register">
                <Nav.Link>Register</Nav.Link>
              </Link>
              <Link passHref href="/login">
                <Nav.Link>Login</Nav.Link>
              </Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

AppNavBar.propTypes = {
  token: PropTypes.string.isRequired,
  setToken: PropTypes.func.isRequired,
};
export default AppNavBar;
