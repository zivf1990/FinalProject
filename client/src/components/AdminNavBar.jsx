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
      <NavLink to="/login">LogIn</NavLink>
      <NavLink onClick={logOut} id="logOutButton" to="/">
        <h4> Logout</h4>
      </NavLink>
      <NavLink id="users" to="users">
        <h4> Users</h4>
      </NavLink>
      <NavLink className="NavLink" to="profile">
        <h4>Profile</h4>
      </NavLink>
      <NavLink className="NavLink" to="products">
        <h4>My Products</h4>
      </NavLink>
    </header>
  );
}

export default AdminNavBar;
