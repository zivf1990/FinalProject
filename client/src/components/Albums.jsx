import React, { Component, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { getCookie } from "../js/cookie";
import Album from "./Album";

function Albums() {
  const [albums, setAlbums] = useState(null);
  const userId = getCookie("userId");

  const getAlbums = async () => {
    if (!albums) {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
      );
      if (!res.ok) throw new Error(res.message);

      const data = await res.json();
      setAlbums(data);
      return data;
    }
  };

  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <div className="main-content">
      <h1 style={{ marginTop: 50 }}>Albums</h1>

      {albums &&
        albums
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((album) => (
            <NavLink key={album.id} to={`${album.id}`}>
              <Album albumTitle={album.title} />
            </NavLink>
          ))}
    </div>
  );
}

export default Albums;
