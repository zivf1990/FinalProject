import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { deleteCookie, getCookie } from "../js/cookie";

function NavBar() {
  // const [userId, setUserId] = useState("");
  const { setUserId, userId } = useUser();

  useEffect(() => {
    // setUserId(getCookie("userId"));
  });

  function logOut() {
    // deleteCookie("userId");
    setUserId("");
  }

  return (
    <header id="navBar">
      <div>
        <NavLink to={`users/${userId}/Info`}>Info</NavLink>
        <NavLink to={`users/${userId}/Todos`}>Todos</NavLink>
        <NavLink to={`users/${userId}/Posts`}>Posts</NavLink>
        <NavLink to={`users/${userId}/Albums`}>Albums</NavLink>
      </div>
      {!userId ? (
        <NavLink to="/Login">LogIn</NavLink>
      ) : (
        <NavLink onClick={logOut} id="logOutButton" to="/">
          Logout
        </NavLink>
      )}
    </header>
  );
}

export default NavBar;
