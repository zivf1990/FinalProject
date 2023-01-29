import { Route, Routes } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Info from "./Info";
import Login from "../pages/Login";
import NavBar from "./NavBar";
import Posts from "../pages/Posts";
import Todos from "../pages/Todos";
import Register from "../pages/Register";
import { getCookie } from "../js/cookie";
import Comments from "../pages/Comments";
import Home from "../pages/Home";
import { AnimatePresence } from "framer-motion";

function Pages() {
  // const userId = getCookie("userId");
  const { userId } = useUser();
  return (
    <AnimatePresence mode="wait">
      <>
        {userId ? (
          <>
            <Routes>
              <Route path="/" element={<Home />}>
                <Route path="info" element={<Info />} />
                <Route path="todos" element={<Todos />} />
                <Route path="posts" element={<Posts />} />
                <Route path="posts/:postId" element={<Comments />} />
              </Route>
              <Route path="login" element={<Login />} />
            </Routes>
          </>
        ) : (
          <>
            <Routes>
              <Route path="*" element={<Register />} />
            </Routes>
          </>
        )}
      </>
    </AnimatePresence>
  );
}

export default Pages;
