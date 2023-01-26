import { Route, Routes } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Info from "./Info";
import Login from "./Login";
import NavBar from "./NavBar";
import Posts from "./Posts";
import Todos from "./Todos";
import { getCookie } from "../js/cookie";
import Post from "./Post";
import Comments from "../pages/CommentsPage";
import Home from "./Home";

function Header() {
  // const userId = getCookie("userId");
  const { userId } = useUser();
  return (
    <>
      {userId ? (
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path={`users/:id/`}>
              <Route path="Info" element={<Info />} />
              <Route path="Todos" element={<Todos />} />
              <Route path="Posts" element={<Posts />} />
              <Route path="Posts/:postId" element={<Comments />} />
            </Route>
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="*" element={<Login />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default Header;
