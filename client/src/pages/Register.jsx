import "../style/signin.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../js/cookie";
import { useUserToken } from "../context/UserContext";

const Register = () => {
  const { setUserToken } = useUserToken();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
    email: "",
    address: "",
    name: "",
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
    setLoading(true);

    const { username, password, email, name, address } = userInput;

    try {
      const res = await fetch(`http://localhost:8000/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email, name, address }),
      });

      //failed to singup. need to show error message in the UI.

      if (!res.ok) {
        setErrorMessage("Something went wrong");

        //success to signup. need to save token to coockie and context and redirect.
      } else {
        const data = await res.json();
        console.log("data: ", data);
        // setCookie("token", data.token);
        // setUserToken(data.token);
        setUserToken(data.token);
        navigate("/home");
      }
      // setLoading(false);

      //success to login.
      // if (data?.result == true) {
      //   localStorage.setItem("userId", data.userId);
      //   setUserId(data.userId);
      // setCookie("userId", user.id, 1);
      // window.history.pushState(null, null, window.location.href);
      // window.onpopstate = window.history.go(1);
      //   navigate(`/`);
      // } else {
      //falied to login.
      // }
    } catch (e) {
      console.log(e);
      setTimeout(3000, alert("Please Check Your Internet Connection"));
      setTimeout(3000, window.location.reload());
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
                <header>Register</header>
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
                    type="email"
                    name="email"
                    className={loading === false ? "input" : "input wait"}
                    id="email"
                    onChange={handleChange}
                    value={userInput.email}
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    name="name"
                    className={loading === false ? "input" : "input wait"}
                    id="name"
                    onChange={handleChange}
                    value={userInput.name}
                    required
                  />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    name="address"
                    className={loading === false ? "input" : "input wait"}
                    id="address"
                    onChange={handleChange}
                    value={userInput.address}
                    required
                  />
                  <label htmlFor="address">Address</label>
                </div>
                <div className="input-field">
                  <input
                    type="submit"
                    className={loading === false ? "submit" : "loading"}
                    value={loading === false ? "Register" : "Loading..."}
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

export default Register;
