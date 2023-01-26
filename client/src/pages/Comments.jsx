import React, { Component, useEffect, useState } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { usePost } from "../context/PostContext";
import { getCookie } from "../js/cookie";
import { motion } from "framer-motion";

function Comments() {
  const { postObj } = usePost();
  const navigate = useNavigate();

  const [comments, setComments] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    if (!comments) {
      try {
        const res = await fetch(
          `http://localhost:8000/comments?postId=${postId}`
        );
        if (!res.ok) throw new Error(res.message);

        const data = await res.json();
        setComments(data);
      } catch (e) {
        console.log(e.message);
      }
    }
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
        <h2 style={{ marginTop: 50 }}>{postObj.title}</h2>
        <p>{postObj.body}</p>
        {comments &&
          comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <h6>{comment.name}</h6>
              <p>{comment.body}</p>
            </div>
          ))}
      </div>
    </motion.div>
  );
}

export default Comments;
