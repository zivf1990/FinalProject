import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSessionID } from "../context/UserContext";
import { deleteCookie, getCookie } from "../js/cookie";
import "../style/navbar.css";

function NavBar() {
  // const [userId, setUserId] = useState("");
  const { sessionID, removeSessionID } = useSessionID();

  useEffect(() => {
    // setUserId(getCookie("userId"));
  });

  function logOut() {
    // deleteCookie("userId");
    removeSessionID();
  }

  return (
    <header className="navBar">
      <div className="logo">
        <NavLink id="shop" to="shop">
          <i className="bx bxl-shopify"> Shopify</i>
        </NavLink>
      </div>
      <div className="nav">
        <NavLink className="NavLink" to="profile">
          <h4>Account</h4>
        </NavLink>
        <NavLink className="NavLink" to="/sellerproducts">
          <h4>sell</h4>
        </NavLink>

        {sessionID ? (
          <NavLink onClick={logOut} id="logOutButton" to="/">
            <h4> Logout</h4>
          </NavLink>
        ) : (
          <>
            <NavLink to="/login">
              <h4>LogIn</h4>
            </NavLink>
            <NavLink to="/register">
              <h4>Register</h4>
            </NavLink>
          </>
        )}
        <NavLink className="NavLink" to="shoppingcart">
          <i className="bx bx-cart"></i>
        </NavLink>
      </div>
    </header>
  );
}

export default NavBar;
