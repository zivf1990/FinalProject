import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../js/cookie";
import { useUser } from "../context/UserContext";

const Login = () => {
  const { setUserNum } = useUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    username: "admin",
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

    const response = await validateUser();
    console.log(response);
  };

  const getUser = async () => {
    setLoading(true);

    const { username, password } = userInput;

    try {
      const res = await fetch(`http://localhost:8000/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error(res.message);

      const data = await res.json();
      setLoading(false);
      return data[0];
    } catch (e) {
      console.log(e);
      setTimeout(3000, alert("Please Check Your Internet Connection"));
      setTimeout(3000, window.location.reload());
    }
  };

  const validateUser = async (user) => {
    if (!user) {
      setErrorMessage("User not found");
      return;
    }

    if (user?.address?.geo?.lat !== userInput.password) {
      setErrorMessage("Wrong password");
      return;
    }

    localStorage.setItem("userId", user.id);
    setUserNum(user.id);
    setCookie("userId", user.id, 1);
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = window.history.go(1);
    navigate(`/home/${userInput.username}`);
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
