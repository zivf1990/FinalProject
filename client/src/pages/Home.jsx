import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSessionID } from "../context/UserContext";
import { getLocalStorage } from "../util/localsessionStorage";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";

function Home() {
  // let userId = getCookie("userId");

  useEffect(() => {}, []);

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
        <Outlet />
      </div>
    </motion.div>
  );
}

export default Home;
