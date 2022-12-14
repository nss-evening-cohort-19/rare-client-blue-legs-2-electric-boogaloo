import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import {
  Container, Nav, Navbar, Button,
} from 'react-bootstrap';
import { useEffect } from 'react';
import Logo from './rare.jpeg';

function AppNavBar({ token, setToken }) {
  const navigate = useRouter();

  useEffect(() => {
    console.warn(token);
  }, [token]);

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
            <>
              <div className="addIcon">
                <Link passHref href="/posts/new">
                  <AddIcon />
                </Link>
              </div>
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
            </>
          ) : (
            <div className="loginRegisterButtons">
              <Link passHref href="/register">
                <Nav.Link>Register</Nav.Link>
              </Link>
              <Link passHref href="/login">
                <Nav.Link>Login</Nav.Link>
              </Link>
            </div>
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
