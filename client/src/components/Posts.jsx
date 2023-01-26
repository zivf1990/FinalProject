import React, { Component, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { usePost } from "../context/PostContext";
import { useUser } from "../context/UserContext";
import { getCookie } from "../js/cookie";
import Post from "./Post";

function Posts() {
  const [posts, setPosts] = useState(null);
  // const userId = getCookie("userId");
  const { userId } = useUser();

  const { setPostObj } = usePost();

  const getPosts = async () => {
    if (!posts) {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
      if (!res.ok) throw new Error(res.message);

      const data = await res.json();
      setPosts(data);
      return data;
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  function changeContext(index) {
    setPostObj({
      title: posts[index].title,
      body: posts[index].body,
      postId: posts[index].postId,
    });
  }

  return (
    <div className="main-content">
      <h1 style={{ marginTop: 50 }}>Posts</h1>

      {posts &&
        posts.map((post, index) => (
          <NavLink
            onClick={() => changeContext(index)}
            key={post.id}
            to={`${post.id}`}
          >
            <Post
              key={index}
              title={post.title}
              body={post.body}
              postId={post.id}
            />
          </NavLink>
        ))}
    </div>
  );
}

export default Posts;
