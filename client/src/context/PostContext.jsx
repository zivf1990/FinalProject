
import React, { useState, createContext, useContext } from "react";

const PostContext = createContext();
export const usePost = () => useContext(PostContext);

export default function PostProvider({ children }) {
  const [postObj, setPostObj] = useState(null);

  return (
    <PostContext.Provider value={{ postObj, setPostObj }}>
      {children}
    </PostContext.Provider>
  );
}
