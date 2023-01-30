import React, { Component, useEffect, useRef, useState } from "react";
import { useUserToken } from "../context/UserContext";
import { useStateRef } from "../hooks/useStateRef";
import { getCookie } from "../js/cookie";
import { getLocalStorage } from "../util/localsessionStorage";
import { motion } from "framer-motion";

function Todos() {
  const [todos, setTodos, todosRef] = useStateRef(null);
  // const userId = getCookie("userId");
  const { userId, setUserId } = useUserToken();

  useEffect(() => {
    const uId = getLocalStorage("userId");
    if (uId) setUserId(uId);

    window.onbeforeunload = toLocalStorage;
    const localTodos = localStorage.getItem("todos");
    if (localTodos) {
      setTodos(JSON.parse(localTodos));
    } else {
      getTodos();
    }
    return () => {
      toLocalStorage();
    };
  }, []);

  const getTodos = async () => {
    try {
      if (!todos) {
        console.log("working");
        const res = await fetch(`http://localhost:8000/users/${userId}/todos`);
        const data = await res.json();
        console.log("data ", data);
        setTodos(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  function toLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todosRef.current));
  }

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/todos`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ todo_id: id, user_id: userId }),
      });
      const data = await res.json();
      setTodos(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  async function changeClassName(id, completed) {
    console.log("naharda");
    const res = await fetch(`http://localhost:8000/todos`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        todo_id: id,
        user_id: userId,
        completed: !completed,
        checkCompleted: true,
      }),
    });
    const data = await res.json();
    setTodos(data);
  }

  async function addTodo() {
    let title = prompt("Add Todos title");
    const res = await fetch(`http://localhost:8000/todos`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ user_id: userId, title: title }),
    });
    const data = await res.json();
    setTodos(data);
  }

  function sortByCompleted() {
    const todosArr = [...todos];
    todosArr.sort((a, b) => {
      if (a.completed) {
        return 1;
      }
      return -1;
    });
    setTodos(todosArr);
  }

  function sortById() {
    const todosArr = [...todos];
    todosArr.sort((a, b) => a.id - b.id);
    setTodos(todosArr);
  }

  function sortByAB() {
    const todosArr = [...todos];
    todosArr.sort((a, b) => a.title.localeCompare(b.title));
    setTodos(todosArr);
  }

  function randomSort() {
    const todosArr = [...todos];
    todosArr.sort(() => 0.5 - Math.random());
    setTodos(todosArr);
  }

  return (
    <motion.div
      className="Grid"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="main-content">
        <h1 style={{ margin: 50 }}>Todos</h1>
        <button className="sortButton" onClick={addTodo}>
          Add Todo
        </button>

        <button className="sortButton" onClick={sortByAB}>
          sort by AB
        </button>
        <button className="sortButton" onClick={randomSort}>
          sort randomly
        </button>
        <button className="sortButton" onClick={sortByCompleted}>
          sort by completed
        </button>
        <button className="sortButton" onClick={sortById}>
          sort by id
        </button>
        {todos &&
          todos.map((todo, index) => {
            if (todo.completed) {
              return (
                <div
                  id={index}
                  onClick={() => changeClassName(todo.id, todo.completed)}
                  className="todo-completed"
                  key={todo.id}
                >
                  {todo.title}
                  <span
                    onClick={() => {
                      deleteTodo(todo.id);
                    }}
                    className="bx bx-x-circle"
                  ></span>
                </div>
              );
            } else {
              return (
                <div
                  id={index}
                  onClick={() => changeClassName(todo.id, todo.completed)}
                  className="todo"
                  key={todo.id}
                >
                  {todo.title}
                </div>
              );
            }
          })}
      </div>
    </motion.div>
  );
}

export default Todos;
