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

function AdminNavBar() {
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
                <MDBNavbarLink aria-current="page" href="/">
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink href="/">About</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink onClick={logOut} href="/">
                  Logout
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/register">Register</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
          <MDBDropdown>
            <MDBDropdownToggle tag="a" className="nav-link" role="button">
              My Shopify
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem href="/adminHome/purchaseHistory" link>
                Purchase History
              </MDBDropdownItem>
              <MDBDropdownItem href="/adminHome/products" link>
                My Products
              </MDBDropdownItem>
              <MDBDropdownItem href="/adminHome/profile" link>
                Account
              </MDBDropdownItem>
              <MDBDropdownItem href="/adminHome/users" link>
                Users
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBContainer>
      </MDBNavbar>
    </header>
  );
}


export default AdminNavBar;


{/* <NavLink id="users" to="/adminHome/users">
<h4> Users</h4>
</NavLink>
<NavLink className="NavLink" to="/adminHome/profile">
<h4>Profile</h4>
</NavLink>
<NavLink className="NavLink" to="/adminHome/products">
<h4>Products in Shopify</h4>
</NavLink>
<NavLink className="NavLink" to="/adminHome/purchaseHistory">
  <h4>The Purcahse History</h4>
</NavLink> */}