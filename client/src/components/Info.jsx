import React, { Component, useEffect, useState } from "react";
import { useStateRef } from "../hooks/useStateRef";
import { getCookie } from "../js/cookie";

function Info() {
  let userId = getCookie("userId");
  const [user, setUser, userRef] = useStateRef(null);

  useEffect(() => {
    window.onbeforeunload = toLocalStorage;
    const localUserInfo = localStorage.getItem('localUserInfo');
    if (localUserInfo) {
      setUser(JSON.parse(localUserInfo));
      console.log(111111)
    }
    else {
      getUser()
      console.log(2222222)
    }
    return () => {
      toLocalStorage();

    }
  }, [])


  const getUser = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    if (!res.ok) throw new Error(res.message);

    const data = await res.json();
    setUser(data);
    return data;
  };

  function toLocalStorage() {
    localStorage.setItem('localUserInfo', JSON.stringify(userRef.current));
  }

  return (
    <div className='main-content'>
      <div className='info'>
        <div className='inside-info'>
          <img className='profile-pic'
            src='https://images.pexels.com/photos/220454/pexels-photo-220454.jpeg?auto=compress&cs=tinysrgb&h=200'
            alt='' />
          <h1>id: {user?.id}</h1>
          <h2>Name: {user?.name}</h2>
          <h2>Username: {user?.username}</h2>
          <h2>Email: {user?.email}</h2>
          <h2>Address: {user?.address?.city}</h2>
          <h2>Phone: {user?.phone}</h2>
          <h2>Company: {user?.company?.name}</h2>
        </div>
      </div>
    </div>
  );
}

export default Info;
