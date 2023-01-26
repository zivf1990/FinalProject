import React from "react";
import { NavLink } from "react-router-dom";

function Post({ title, body, postId, deletepost, index, changeContext }) {
  return (
    <div className="post">
      <NavLink
        onClick={() => changeContext(index)}
        key={postId}
        to={`${postId}`}
      >
        <h2>{title}</h2>
        <h3>{postId}</h3>
        <p>{body}</p>
      </NavLink>
      <span
        onClick={() => {
          deletepost(postId);
        }}
        className="bx bx-x-circle"
      ></span>
    </div>
  );
}

export default Post;
