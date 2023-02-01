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
        setErrorMessage("User does not exist");

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
          setErrorMessage("User is blocked");
        }
      }
    } catch (e) {
      setErrorMessage(e.message);
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
          <FormLabel>Username</FormLabel>
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
    </>
  );
};

export default Login;
