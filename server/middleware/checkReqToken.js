const checkReqToken = (req, res, next) => {
  const excludePaths = ["/login", "/register"];

  if (!excludePaths.includes(req.path)) {
    console.log("Running middleware checkReqToken");

    //check request for user token and save it into req.token.
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      console.log("req.token ", req.token);
      return next();
    } else {
      // res.sendStatus(401);
      return next();
    }
  }
  return next();
};
module.exports = checkReqToken;
