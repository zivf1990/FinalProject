import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSessionID } from "../context/UserContext";
import { useCart } from "../context/CartContext";

const ShopifyUsers = () => {
  const { sessionID } = useSessionID();

  const [users, setUsers] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  const [visibleUsers, setVisibleUsers] = useState([]);
  useEffect(() => {
    console.log(sessionID);
    getUsers();
  }, []);
  useEffect(() => searchByName(), [users]);
  useEffect(() => searchByName(), [searchBar]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setSearchBar(value);
  };

  const getUsers = async () => {
    console.log("sdssd");
    if (sessionID) {
      const res = await fetch(`http://localhost:8000/users/notAdmin`, {
        method: "GET",
        headers: {
          "x-session-id": sessionID,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("data: ", data);
      setUsers(data.data);
      setVisibleUsers(data.data);
    }
  };
  function searchByName() {
    let result = users.filter((str) => str.username.includes(searchBar));
    setVisibleUsers(result);
  }
  async function changePermission(user_id) {
    const res = await fetch(`http://localhost:8000/users/userPermission`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id,
      }),
    });
    if (res.ok) {
      console.log("good");
      getUsers();
    } else {
      alert("bad");
    }
  }
  return (
    <div className="users">
      <h1>erere</h1>
      <label htmlFor="searchBar">
        Search By Username
        <input
          type="text"
          name="searchBar"
          id="searchBar"
          onChange={handleChange}
          value={searchBar}
        />
      </label>
      <table>
        <tr>
          <th>User ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Address</th>
          <th>Permission</th>
          <th>last seen</th>
          <th>picture</th>
        </tr>
        {visibleUsers.map((user) => (
          <tr
            style={
              user.permission_level == "user"
                ? { background: "green" }
                : { background: "red" }
            }
          >
            <th>{user.user_id}</th>
            <th>{user.username}</th>
            <th>{user.email}</th>
            <th>{user.address}</th>
            <th
              id="permission_cell"
              onClick={() => changePermission(user.user_id)}
            >
              {user.permission_level}
            </th>
            <th>{user.updated_at}</th>
            <th>{user.user_picture}</th>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ShopifyUsers;
