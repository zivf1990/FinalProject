import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { getCookie } from "../js/cookie";
import { getLocalStorage } from "../util/localsessionStorage";
import Category from "../components/Category";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";

function Home() {
  // let userId = getCookie("userId");
  const { userId, setUserId } = useUser();

  useEffect(() => {
    const uId = getLocalStorage("userId");
    if (uId) setUserId(uId);
  }, []);

  return (
    <motion.div
      className="Grid"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="main-content">
        <NavBar />
        <Category />
        <Outlet />
      </div>
    </motion.div>
  );
}

export default Home;
