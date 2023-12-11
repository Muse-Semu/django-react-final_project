import React, { useState } from "react";
import { useContext } from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import LoginForm from "../forms/LoginForm";
// import { userContext } from "../contexts/Context";

function Navigatebar() {
  const navigate = useNavigate()
  // const userCon= useContext(userContext)
  const checkCustomer = localStorage.getItem("customer_login");
  const [isLogin,setIsLogin] = useState(false);
  // console.log(userCon)
  const logout = () =>{
    localStorage.removeItem("customer_login");
    localStorage.removeItem("customer_username");
   
  }
  return (
    <div className="mx-4 sticky top-0 z-50">
      <Navbar bg="light" expand="lg" className=" mx-auto fixed top-0">
        <Container fluid>
          <Navbar.Brand >
            Login
          </Navbar.Brand>
          <Navbar.Brand onClick={() => navigate("/dashboard")}>
            Dashbord
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
              {!checkCustomer ? (
                <Nav.Link onClick={() => setIsLogin(!isLogin)}>Login</Nav.Link>
              ) : (
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              )}

              <Nav.Link>Dashboard</Nav.Link>
            </Nav>
            <div className="flex gap-2 items-center ">
              <NavDropdown title="Accounts" id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={() => navigate("/dashboard")}>
                  Dasboard
                </NavDropdown.Item>
                {/* {userCon ? (
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                ) : (
                  <>
                    <NavDropdown.Item onClick={() => navigate("/login")}>
                      Login
                    </NavDropdown.Item>
                  </>
                )} */}

                <NavDropdown.Divider />
                <NavDropdown.Item>Something else here</NavDropdown.Item>
              </NavDropdown>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {isLogin && <LoginForm setIsLogin={setIsLogin} />}
    </div>
  );
}

export default Navigatebar;
