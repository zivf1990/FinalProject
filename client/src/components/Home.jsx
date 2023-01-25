import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCookie } from "../js/cookie";
import Category from "./Category";

function Home() {
  let userId = getCookie("userId");
  const { userName } = useParams();


  return (
    <div className='main-content'>
      <Category/>
      <h1>Welcome {userName}!</h1>
    </div>
  );
}

export default Home;
