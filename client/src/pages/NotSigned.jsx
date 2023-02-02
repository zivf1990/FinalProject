import React from "react";
import Typography from "@mui/joy/Typography";
import { Link } from "react-router-dom";

const NotSigned = () => {
  return (
    <div>
      <Typography level="h4" component="h1">
        You need to be logged in
      </Typography>
      <Typography level="body2"><Link to="/login">Sign in</Link> to continue.</Typography>
    </div>
  );
};

export default NotSigned;
