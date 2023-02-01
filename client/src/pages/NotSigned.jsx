import React from "react";
import Typography from "@mui/joy/Typography";

const NotSigned = () => {
  return (
    <div>
      <Typography level="h4" component="h1">
        You need to be logged in
      </Typography>
      <Typography level="body2">Sign in to continue.</Typography>
    </div>
  );
};

export default NotSigned;
