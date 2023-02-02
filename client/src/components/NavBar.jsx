import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSessionID } from "../context/UserContext";
import "../style/navbar.css";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";

function NavBar() {
  const { sessionID, removeSessionID } = useSessionID();
  const [showNavColorSecond, setShowNavColorSecond] = useState(false);

  useEffect(() => {
    // setUserId(getCookie("userId"));
  });

  function logOut() {
    // deleteCookie("userId");
    removeSessionID();
  }

  return (
    <header className="navBar">
      <MDBNavbar expand="lg" white bgColor="white">
        <MDBContainer fluid>
          <MDBNavbarBrand href="/shop">
            <i className="bx bxl-shopify"> </i>Shopify
          </MDBNavbarBrand>

          <MDBNavbarToggler
            type="button"
            data-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNavColorSecond(!showNavColorSecond)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse show={showNavColorSecond} navbar id="navbarColor02">
            <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
              <MDBNavbarItem className="active">
                <MDBNavbarLink aria-current="page" href="/shop">
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
              <MDBNavbarLink href="/shop">Service</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/shop">Discounts</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/shop">About</MDBNavbarLink>
              </MDBNavbarItem>
        
             
            </MDBNavbarNav>
          </MDBCollapse>
          <MDBDropdown>
            <MDBDropdownToggle tag="a" className="nav-link" role="button">
              My Shopify
            </MDBDropdownToggle>
            <MDBDropdownMenu>
            {sessionID ? (<div><MDBDropdownItem href="/purchaseHistory" link>
                Purchase History
              </MDBDropdownItem>
              <MDBDropdownItem href="/sellerproducts" link>
                My Products
              </MDBDropdownItem>
              <MDBDropdownItem href="/account" link>
                Account
              </MDBDropdownItem>
              {sessionID ? <MDBDropdownItem href="/shop"  onClick={logOut} link>
                Logout
              </MDBDropdownItem>
              :
              <MDBDropdownItem href="/login" link>
                Login
              </MDBDropdownItem>
            }
             
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBContainer>
      </MDBNavbar>
    </header>
  );
}

export default NavBar;