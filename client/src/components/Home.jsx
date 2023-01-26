import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { getCookie } from "../js/cookie";
import { getLocalStorage } from "../util/localsessionStorage";
import Category from "./Category";

function Home() {
  // let userId = getCookie("userId");
  const { userId, setUserId } = useUser();

  useEffect(() => {
    const uId = getLocalStorage("userId");
    if (uId) setUserId(uId);
  }, []);

  return (
    <div className="main-content">
      <Category />
      {/* <h1>Welcome {}!</h1> */}
    </div>
  );
}

export default Home;
