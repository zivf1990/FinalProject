import "../style/signin.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../js/cookie";
import { useUserToken } from "../context/UserContext";

const Login = () => {
  const { setUserId } = useUserToken();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    username: "ziv1",
    password: "1234",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInput((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }
    validateUser();
  };

  const validateUser = async () => {
    // setLoading(true);

    const { username, password } = userInput;

    try {
      const res = await fetch(`http://localhost:8000/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      //failed to login. need to show error message in the UI.
      if (!res.ok) {
        console.log("status code: ", res.status);
        console.log("message: ", res);
        console.log("message: ", res.statusText);
        setErrorMessage("Something went wrong");

        //success to login. need to save token to coockie and context and redirect.
      } else {
        const data = await res.json();
        console.log("data: ", data);
        setCookie("token", data.token);
        if (data.permission_level === "admin") {
          navigate("/register");
        } else if (data.permission_level === "user") {
          navigate("/home");
        }
      }

      // setLoading(false);

      //success to login.
      // if (data) {
      //   localStorage.setItem("userId", data.userId);
      //   console.log(data);
      //   setUserId(data);
      //   // setCookie("userId", user.id, 1);
      //   // window.history.pushState(null, null, window.location.href);
      //   // window.onpopstate = window.history.go(1);
      //   if(data.permission_level=="user"){
      //   navigate(`/Home`);
      //   localStorage.setItem("userId", data.token);
      //   }
      //   else if(data.permission_level=="admin"){
      //   navigate(`/admin`);
      //   }
      // } else {
      //   alert("failed")
      // }
    } catch (e) {
      // console.log(e);
      // setTimeout(3000, alert("Please Check Your Internet Connection"));
      // setTimeout(3000, window.location.reload());
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="container main">
          <div className="row">
            <div className="col-md-6 signin-image">
              <div className="text"></div>
            </div>

            <form
              className={
                loading === false ? "col-md-6 right" : "col-md-6 input-loading"
              }
              onSubmit={handleSubmit}
            >
              <div className="input-box">
                <header>Log In</header>
                <div className="input-field">
                  <input
                    type="text"
                    name="username"
                    className={loading === false ? "input" : "input wait"}
                    id="username"
                    onChange={handleChange}
                    value={userInput.username}
                    required
                  />
                  <label htmlFor="username">Username</label>
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    name="password"
                    className={loading === false ? "input" : "input wait"}
                    id="password"
                    onChange={handleChange}
                    value={userInput.password}
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="input-field">
                  <input
                    type="submit"
                    className={loading === false ? "submit" : "loading"}
                    value={loading === false ? "Login" : "Loading..."}
                  />
                </div>
                <p id="response-text">{errorMessage}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
