import React, { Fragment } from "react";
import AuthService from "../AuthService";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavbarSection = () => {
  const user = AuthService.getCurrentUser();
  const navigate = useNavigate();
  const logout = () => {
    AuthService.logout();
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">OrientCV</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <Fragment>
                <Link className="btn-1 btn-2" to="/userDashboard">
                  Dashboard
                </Link>
                <span onClick={logout} className="btn-1">
                  Logout
                </span>
              </Fragment>
            ) : (
              <Fragment>
                <Link to="/register" className="btn-1">
                  Register
                </Link>
                <Link to="/login" className="btn-1 btn-2">
                  Login
                </Link>
              </Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarSection;
