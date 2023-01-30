import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserToken } from "../context/UserContext";
import { deleteCookie, getCookie } from "../js/cookie";

function NavBar() {
  // const [userId, setUserId] = useState("");
  const { setUserId, userId } = useUserToken();

  useEffect(() => {
    // setUserId(getCookie("userId"));
  });

  function logOut() {
    // deleteCookie("userId");
    setUserId("");
  }

  return (
    <header id="navBar">
      <div></div>
      {!userId ? (
        <NavLink to="/login">LogIn</NavLink>
      ) : (
        <>
          <NavLink onClick={logOut} id="logOutButton" to="/">
            Logout
          </NavLink>
        </>
      )}
    </header>
  );
}

export default NavBar;
