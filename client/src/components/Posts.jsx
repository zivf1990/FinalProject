import React, { Component, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { usePost } from "../context/PostContext";
import { useUser } from "../context/UserContext";
import { getCookie } from "../js/cookie";
import { getLocalStorage } from "../util/localsessionStorage";
import Post from "./Post";

function Posts() {
  const [posts, setPosts] = useState(null);
  // const userId = getCookie("userId");
  const { userId, setUserId } = useUser();

  const { setPostObj } = usePost();

  const [inputs, setInputs] = useState({
    postTitle: "",
    postBody: "",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const uId = getLocalStorage("userId");
    if (uId) setUserId(uId);

    getPosts();
  }, []);

  const getPosts = async () => {
    if (!posts) {
      const res = await fetch(`http://localhost:8000/users/${userId}/posts`);

      if (!res.ok) throw new Error(res.message);

      const data = await res.json();
      setPosts(data);
      return data;
    }
  };

  const deletepost = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/posts/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        throw new Error(res.message);
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

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

      <form className="item-form">
        <label htmlFor="postTitle">
          Post title:
          <input
            id="postTitle"
            type="text"
            onChange={handleChange}
            value={inputs.postTitle}
          />
        </label>

        <label htmlFor="postBody">
          Post body:
          <input
            id="postBody"
            type="text"
            onChange={handleChange}
            value={inputs.postBody}
          />
        </label>
        <button onSubmit={handleSubmit}>add</button>
      </form>

      {posts &&
        posts.map((post, index) => (
          <div>
            <Post
              key={index}
              title={post.title}
              body={post.body}
              postId={post.id}
              deletepost={deletepost}
              index={index}
              changeContext={changeContext}
            />
          </div>
        ))}
    </div>
  );
}

export default Posts;
