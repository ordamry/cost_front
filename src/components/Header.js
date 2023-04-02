/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/
import { useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserDetails } from "../redux/user/userActions";
import { logout } from "../redux/user/userSlice";

const Header = () => {
  const { userInfo, userToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //assigning location variable
  const location = useLocation();
  const navigate = useNavigate();
  //destructuring pathname from location
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  // automatically authenticate user if token is found
  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails());
    }
  }, [userToken, dispatch]);
  const logouthandler = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <Navbar
      className="header-nav"
      bg="dark"
      variant="dark"
      expand="lg"
      collapseOnSelect
    >
      <Container>
        {userInfo ? (
          <Navbar.Brand
            href="/costs"
            style={{ fontSize: "calc(1.3rem + .6vw)" }}
          >
            <i className="fas fa-money-bill-wave" /> Cost Manager
          </Navbar.Brand>
        ) : (
          <Navbar.Brand href="/" style={{ fontSize: "calc(1.3rem + .6vw)" }}>
            <i className="fas fa-money-bill-wave" /> Cost Manager
          </Navbar.Brand>
        )}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {userInfo ? (
              <>
                <Nav.Link
                  className={splitLocation[1] === "costs" ? "active" : ""}
                  href="/costs"
                >
                  Cost
                </Nav.Link>
                <Nav.Link
                  className={splitLocation[1] === "category" ? "active" : ""}
                  href="/category"
                >
                  Category
                </Nav.Link>
                <Nav.Link
                  className={splitLocation[1] === "report" ? "active" : ""}
                  href="/report"
                >
                  Report
                </Nav.Link>
                {userInfo.role === "admin" ? (
                  <Nav.Link
                    className={splitLocation[1] === "users" ? "active" : ""}
                    href="/users"
                  >
                    Users
                  </Nav.Link>
                ) : (
                  <></>
                )}

                <NavDropdown
                  title={userInfo.first_name}
                  id="first_name"
                  alignright="true"
                >
                  <NavDropdown.Item href="/profile">
                    <i className="fas fa-user me-2" />
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => logouthandler()}>
                    <i className="fas fa-sign-out-alt me-2" />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
