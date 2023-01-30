import React, { Component, useEffect, useState } from "react";
import { useUserToken } from "../context/UserContext";
import { useStateRef } from "../hooks/useStateRef";
import { getCookie } from "../js/cookie";
import { getLocalStorage } from "../util/localsessionStorage";
import { motion } from "framer-motion";

function Info() {
  const { userId, setUserId } = useUserToken();
  const [user, setUser] = useStateRef(null);

  useEffect(() => {
    const uId = getLocalStorage("userId");
    if (uId) {
      setUserId(uId);
      console.log(uId, userId);
      getUser();
    }
  }, []);

  const getUser = async () => {
    const res = await fetch(`http://localhost:8000/users/${userId}`);
    const data = await res.json();
    setUser(data);
    return data;
  };

  return (
    <motion.div
      className="Grid"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="main-content">
        <div className="info">
          <div className="inside-info">
            <img
              className="profile-pic"
              src="https://images.pexels.com/photos/220454/pexels-photo-220454.jpeg?auto=compress&cs=tinysrgb&h=200"
              alt=""
            />
            <h1>id: {user?.id}</h1>
            <h2>Name: {user?.name}</h2>
            <h2>Username: {user?.username}</h2>
            <h2>Address: {user?.address}</h2>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Info;
