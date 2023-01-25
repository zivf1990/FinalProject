import React from "react";

const Album = ({ albumTitle }) => {
  return (
    <div className="Album post">
      <br />
      <h3>{albumTitle}</h3>
      <br />
    </div>
  );
};

export default Album;
