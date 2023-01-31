import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserToken } from "../context/UserContext";
import { useCart } from "../context/CartContext";

const ShopifyUsers = () => {
  const { userToken } = useUserToken();

  const [users, setUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState([]);
  useEffect(() => {
    console.log(userToken);
    getUsers();
  }, []);

  const getUsers = async () => {
    console.log("sdssd");
    if (userToken) {
      const res = await fetch(`http://localhost:8000/users/notAdmin`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
          headers: { "Content-Type": "application/json" },
        },
      });

      const data = await res.json();
      console.log("data: ", data);
       setUsers(data);
    }
  };
  return (
    <div className="users">
        <h1>erere</h1>
    </div>
  );
};

export default ShopifyUsers;