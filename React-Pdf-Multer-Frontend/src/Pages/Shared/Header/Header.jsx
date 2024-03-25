import React, { useContext } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { Button, Image } from "react-bootstrap";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .then((error) => console.error("Error: ", error));
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Link className="navbar-brand" to={"/"}>
            
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto"></Nav>

            <Nav className="d-flex align-items-center justify-center ">
              <Nav.Link>
                <Link to={"/profile"}>
                  {user?.photoURL ? (
                    <Image
                      style={{ height: "30px" }}
                      roundedCircle
                      src={user.photoURL}
                    ></Image>
                  ) : (
                    <FaUser></FaUser>
                  )}
                </Link>
              </Nav.Link>
              <Nav.Link>
                {user?.uid ? (
                  <div>
                    <Link className="text-decoration-none" to={"/profile"}>
                      <span>{user?.displayName}</span>
                    </Link>
                    <Button
                      onClick={handleLogOut}
                      className="mx-3 py-0"
                      variant={"warning"}
                    >
                      Log Out
                    </Button>
                  </div>
                ) : (
                  <div className="d-flex flex-column flex-md-row ">
                    <Link className="me-4 text-decoration-none" to={"/login"}>
                      Login
                    </Link>
                    <Link className="text-decoration-none" to={"/register"}>
                      Register
                    </Link>
                  </div>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
