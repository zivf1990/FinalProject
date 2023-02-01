import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import ResponsiveAppBar from "../components/ResponsiveNavBar";
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
        {/* <ResponsiveAppBar /> */}
        <Outlet />
      </div>
    </motion.div>
  );
}

export default Home;
