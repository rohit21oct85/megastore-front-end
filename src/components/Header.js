import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
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
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Navbar.Brand href="/">Mega Store</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/products">
                All products</Nav.Link>
          <NavDropdownMenu title="Manage Account"  id="collasible-nav-dropdown" Left alignLeft>
            <DropdownSubmenu href="" title="Products">
              <NavDropdown.Item href="#action/8.1">Add products</NavDropdown.Item>
              <NavDropdown.Item href="#action/8.1">View products</NavDropdown.Item>
            </DropdownSubmenu>
            
            <DropdownSubmenu href="" title="Category">
              <NavDropdown.Item href="#action/8.1">Add Category</NavDropdown.Item>
              <NavDropdown.Item href="#action/8.1">View Category</NavDropdown.Item>
            </DropdownSubmenu>
            </NavDropdownMenu>
        </Nav>

      </Navbar.Collapse>
    </Navbar>
  );
}
