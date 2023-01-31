import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserToken } from "../context/UserContext";
import { deleteCookie, getCookie } from "../js/cookie";

function AdminNavBar() {
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
      <NavLink onClick={logOut} id="logOutButton" to="/">
        <h4> Logout</h4>
      </NavLink>
      <NavLink id="users" to="/adminHome/users">
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
       </NavLink>
    </header>
  );
}

export default AdminNavBar;
