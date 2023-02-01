import "../style/signin.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../js/cookie";
import { useSessionID } from "../context/UserContext";

const Login = () => {
  const { setSessionID } = useSessionID();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
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
        throw new Error("User does not exist");

        //success to login. need to save sessionID to coockie and context and redirect.
      } else {
        const data = await res.json();
        console.log("data: ", data);
        // setCookie("sessionID", data.sessionID);
        // setSessionID(data.sessionID);
        if (data.permission_level === "admin") {
          setSessionID(data.sessionID);

          navigate("/adminHome");
        } else if (data.permission_level === "user") {
          setSessionID(data.sessionID);

          console.log("eddddddddddddddddddddddddddd");
          navigate("/shop");
        } else if (data.permission_level === "blocked") {
          throw new Error("User is blocked");
        }
      }
    } catch (e) {
      setErrorMessage(e);
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
