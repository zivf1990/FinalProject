const checkReqToken = (req, res, next) => {
  //check request for user token and save it into req.token.
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    console.log("req.token ", req.token);
    next();
  } else {
    // res.sendStatus(401);
    next();
  }
};

module.exports = checkReqToken;
