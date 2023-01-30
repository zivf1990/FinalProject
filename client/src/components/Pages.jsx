import { Route, Routes, Navigate } from "react-router-dom";
import { useUserToken } from "../context/UserContext";
import Info from "./Info";
import Login from "../pages/Login";
import Posts from "../pages/Posts";
import Todos from "../pages/Todos";
import Register from "../pages/Register";
import Comments from "../pages/Comments";
import Home from "../pages/Home";
import { AnimatePresence } from "framer-motion";

function Pages() {
  // const userId = getCookie("userId");
  // const isAdmin = getCookie("isAdmin");
  const { token } = useUserToken();
  return (
    <AnimatePresence mode="wait">
      <>
        <Routes>
          {/* <Route path="/admin" element={<Home />}>
                <Route path="info" element={<Info />} />
                <Route path="todos" element={<Todos />} />
                <Route path="posts" element={<Posts />} />
                <Route path="posts/:postId" element={<Comments />} />
              </Route> */}
          <Route index element={<Navigate replace to="/login" />} />
          <Route path="login" element={<Login />} />
          <Route path="/home" element={<Home />}>
            <Route path="info" element={<Info />} />
            <Route path="todos" element={<Todos />} />
            <Route path="posts" element={<Posts />} />
            <Route path="posts/:postId" element={<Comments />} />
          </Route>
          <Route path="register" element={<Register />} />
        </Routes>
      </>
    </AnimatePresence>
  );
}

export default Pages;
