import React from "react";
import { Link, NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FiUsers } from "react-icons/fi";
import { RiTodoLine } from "react-icons/ri";

const Category = () => {
  return (
    <div className="List">
      <NavLink className="NavLink" to="/info">
        <CgProfile />
        <h4>Account</h4>
      </NavLink>
      <NavLink className="NavLink" to="/posts">
        <FiUsers />
        <h4>Posts</h4>
      </NavLink>
      <NavLink className="NavLink" to="/todos">
        <RiTodoLine />
        <h4>Todos</h4>
      </NavLink>
    </div>
  );
};

export default Category;
