import "../style/signin.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../js/cookie";
import { useSessionID } from "../context/UserContext";

import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import ModeToggle from "../components/ModeToggle";

const Register = () => {
  const { setSessionID } = useSessionID();
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

    // if (loading) {
    //   return;
    // }
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

        //success to signup. need to save sessionID to coockie and context and redirect.
      } else {
        const data = await res.json();
        console.log("data: ", data);
        setSessionID(data.sessionID);
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      setTimeout(3000, alert("Please Check Your Internet Connection"));
      setTimeout(3000, window.location.reload());
    }
  };

  return (
    <>
  <ModeToggle />

<Sheet
  sx={{
    width: 300,
    mx: "auto", // margin left & right
    my: 4, // margin top & botom
    py: 3, // padding top & bottom
    px: 2, // padding left & right
    display: "flex",
    flexDirection: "column",
    gap: 2,
    borderRadius: "sm",
    boxShadow: "md",
  }}
  variant="outlined"
>
  <div>
    <Typography level="h4" component="h1">
      <b>Welcome!</b>
    </Typography>
    <Typography level="body2">Sign in to continue.</Typography>
  </div>
  <FormControl>
    <FormLabel>Email</FormLabel>
    <Input
      // html input attribute
      name="username"
      type="text"
      placeholder="username"
      id="username"
      onChange={handleChange}
      value={userInput.username}
      required
    />
  </FormControl>
  <FormControl>
    <FormLabel>Password</FormLabel>
    <Input
      // html input attribute
      name="password"
      type="password"
      placeholder="password"
      id="password"
      onChange={handleChange}
      value={userInput.password}
      required
    />
  </FormControl>
  <FormControl>
    <FormLabel>Password</FormLabel>
    <Input
      // html input attribute
      name="password"
      type="password"
      placeholder="password"
      id="password"
      onChange={handleChange}
      value={userInput.password}
      required
    />
  </FormControl>
  <FormControl>
    <FormLabel>Password</FormLabel>
    <Input
      // html input attribute
      name="password"
      type="password"
      placeholder="password"
      id="password"
      onChange={handleChange}
      value={userInput.password}
      required
    />
  </FormControl>
  <FormControl>
    <FormLabel>Password</FormLabel>
    <Input
      // html input attribute
      name="password"
      type="password"
      placeholder="password"
      id="password"
      onChange={handleChange}
      value={userInput.password}
      required
    />
  </FormControl>

  <Button onClick={handleSubmit} sx={{ mt: 1 /* margin top */ }}>
    Log in
  </Button>
  <Typography
    endDecorator={<Link href="/register">Sign up</Link>}
    fontSize="sm"
    sx={{ alignSelf: "center" }}
  >
    Don&apos;t have an account?
  </Typography>
  {errorMessage && <p id="response-text">{errorMessage}</p>}
</Sheet>

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
