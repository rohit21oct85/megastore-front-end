import React, { useContext } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useGetCart from "../hooks/useGetCart";
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export default function Header() {
  const { state, dispatch } = useContext(AuthContext);
  const history = useHistory();
  const { data: myCarts } = useGetCart();

  function handleLogout(e) {
    e.preventDefault();
    alert("logout");
    dispatch({ type: "LOGOUT" });
    history.push("/");
  }
  return (
    <div className="row">
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{
      position: 'fixed',
      width: '100%',
      marginRight: '0px',
      zIndex: '9'
    }}>
      <div className="container pl-3">
      <Navbar.Brand className="text-white" to="/" as={NavLink}>Mega Store</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link to="/products" as={NavLink}>
            <span className="fa fa-shopping-bag"></span>&nbsp;
            All Products</Nav.Link>
          {state.isLoggedIn ? (
          <>  
          <Nav.Link>
            <span className="fa fa-gear text-white"></span>
          </Nav.Link>
          <NavDropdownMenu title="Manage Account" id="collasible-nav-dropdown" className="pl-0" alignLeft>
            <DropdownSubmenu to="" title="Products">
              <NavDropdown.Item to="/add-products/create" as={NavLink}>
                <span className="fa fa-plus-square"></span>&nbsp;
                Add products</NavDropdown.Item>
              <NavDropdown.Item to="/add-products/view" as={NavLink}>
                <span className="fa fa-eye"></span>&nbsp;
                View products</NavDropdown.Item>
            </DropdownSubmenu>
            
            <DropdownSubmenu to="" title="Category">
              <NavDropdown.Item to="/add-category/create" as={NavLink}>
              <span className="fa fa-plus-square"></span>&nbsp;
              Add Category</NavDropdown.Item>
              <NavDropdown.Item to="/add-category/view" as={NavLink}>
              <span className="fa fa-eye"></span>&nbsp;
                View Category</NavDropdown.Item>
            </DropdownSubmenu>
            <Nav.Link className="text-dark" to="/" as={NavLink} onClick={handleLogout}>
              <span className="fa fa-power-off"></span>
              &nbsp; 
              Logout</Nav.Link>
            </NavDropdownMenu>
            <Nav.Link to="/my-cart" as={NavLink}>
            <span className="fa fa-shopping-cart"></span>&nbsp;
              {myCarts?.length} Cart
            </Nav.Link>
            </>
          ) : (
            <>
            <Nav.Link to="/login" as={NavLink}>Login</Nav.Link>
            <Nav.Link to="/register" as={NavLink}>Register</Nav.Link>
            </>
          )}
        </Nav>

      </Navbar.Collapse>
      </div>
    </Navbar>
    </div>
  );
}
