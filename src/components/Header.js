import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
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
    // <header className="header pl-0 pr-0">
    //       <div className="container d-flex pl-0 pr-0">
    //       <Link to="/" className="col-md-2 logo-container text-white">
    //                  <span className="fa fa-thumbs-up"></span> MegaStore</Link>
    //       <div className="left-nav">
    //             <Link to="/products" className="link">
    //                   <span className="fa fa-shopping-bag mr-3"></span>
    //                   All products</Link>
    //       </div>

    //       <div className="right-nav">

    //             {state.isLoggedIn ? (
    //                   <>
    //                   <Link to="/my-cart" className="link my-cart">
    //                         <span className="fa fa-shopping-cart"></span>&nbsp;&nbsp;
    //                         <span className="badge badge-danger my-cart-badge">{myCarts?.length}</span>
    //                         Cart
    //                   </Link>

    //                   <Link to="/add-products/create" className="link">[ &nbsp; <span className="fa fa-plus-square"></span> Add product&nbsp;]</Link>
    //                   <Link to="/add-products/view" className="link">[&nbsp;<span className="fa fa-eye"></span> View product&nbsp;]</Link>
    //                   <Link to="/add-category/create" className="link">[&nbsp;<span className="fa fa-plus-square"></span> Add Category&nbsp;]</Link>
    //                   <Link to="/add-category/view" className="link">[&nbsp;<span className="fa fa-eye"></span> View Category &nbsp;]</Link>

    //                   <Link to="/" onClick={handleLogout} className="link"><span className="fa fa-power-off"></span> {state?.fullname} </Link>

    //                   </>
    //             ) : (
    //                   <>
    //                   <Link to="/login" className="link"><span className="fa fa-lock"></span> Login</Link>
    //                   <Link to="/register" className="link"><span className="fa fa-cogs"></span> Register</Link>
    //                   </>
    //             )}

    //       </div>
    //       </div>

    // </header>
    <div className="row">
    <Navbar className="header" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <div className="container pl-3">
      <Navbar.Brand to="/">Mega Store</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link to="/products">
            <span className="fa fa-shopping-bag"></span>&nbsp;
            All Products</Nav.Link>
          {state.isLoggedIn ? (
          <>  
          <Nav.Link>
            <span className="fa fa-gear text-white"></span>
          </Nav.Link>
          <NavDropdownMenu title="Manage Account" id="collasible-nav-dropdown" className="pl-0" alignLeft>
            <DropdownSubmenu to="" title="Products">
              <NavDropdown.Item to="/add-products/create">
                <span className="fa fa-plus-square"></span>&nbsp;
                Add products</NavDropdown.Item>
              <NavDropdown.Item to="/add-products/view">
                <span className="fa fa-eye"></span>&nbsp;
                View products</NavDropdown.Item>
            </DropdownSubmenu>
            
            <DropdownSubmenu to="" title="Category">
              <NavDropdown.Item to="/add-category/create">
              <span className="fa fa-plus-square"></span>&nbsp;
              Add Category</NavDropdown.Item>
              <NavDropdown.Item to="/add-category/view">
              <span className="fa fa-eye"></span>&nbsp;
                View Category</NavDropdown.Item>
            </DropdownSubmenu>
            <Nav.Link className="text-dark" to="/" onClick={handleLogout}>
              <span className="fa fa-power-off"></span>
              &nbsp; 
              Logout</Nav.Link>
            </NavDropdownMenu>
            <Nav.Link to="/my-cart">
            <span className="fa fa-shopping-cart"></span>&nbsp;
              {myCarts?.length} Cart
            </Nav.Link>
            </>
          ) : (
            <>
            <Nav.Link to="/login">Login</Nav.Link>
            <Nav.Link to="/register">Register</Nav.Link>
            </>
          )}
        </Nav>

      </Navbar.Collapse>
      </div>
    </Navbar>
    </div>
  );
}
