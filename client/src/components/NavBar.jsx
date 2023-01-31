import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserToken } from "../context/UserContext";
import { deleteCookie, getCookie } from "../js/cookie";

function NavBar() {
  // const [userId, setUserId] = useState("");
  const { setUserId, userId, removeToken } = useUserToken();

  useEffect(() => {
    // setUserId(getCookie("userId"));
  });

  function logOut() {
    // deleteCookie("userId");
    removeToken();
  }

  return (
    <header id="navBar">
      <div></div>
      <NavLink className="NavLink" to="/purchaseHistory"><h4> Purchase History</h4></NavLink>
      <NavLink onClick={logOut} id="logOutButton" to="/">
        <h4> Logout</h4>
      </NavLink>
      <NavLink id="shop" to="shop">
        <h4> Shop</h4>
      </NavLink>
      <NavLink className="NavLink" to="/info">
        <h4>Account</h4>
      </NavLink>

      <NavLink className="NavLink" to="profile">
        <h4>Profile</h4>
      </NavLink>
      <NavLink className="NavLink" to="/sellerProducts">
        <h4>seller manager</h4>
      </NavLink>
      <NavLink className="NavLink" to="shoppingcart">
        <h4>Cart</h4>
      </NavLink>
    </header>
  );
}

export default NavBar;
