const jwt = require("jsonwebtoken");
const connection = require("../modules/sqlPromiseConfig");

const getTokenAndSessionID = async (sessionID) => {
  const data = await (
    await connection
  ).execute(`
  SELECT token, sessionID 
  FROM user_permission
  WHERE sessionID = "${sessionID}";`);
  return data[0][0];
};

const sessionIDcheck = async (req, res, next) => {
  const excludePaths = [
    "/login",
    "/register",
    "/categories",
    "/category/",
    "/products/",
  ];
  console.log("req.path::: ", req.path);

  let exclude = false;
  excludePaths.forEach((path) => {
    if (req.path.startsWith(path)) {
      exclude = true;
    }
  });

  if (!exclude) {
    console.log("Running middleware sessionIDcheck");

    const clientSessionID = req.headers["x-session-id"];
    console.log("clientSessionID ", clientSessionID);

    if (!clientSessionID) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const data = await getTokenAndSessionID(clientSessionID);

    const sessionID = data["sessionID"];
    const token = data["token"];

    if (!sessionID) {
      return res.status(401).send({ error: "Session not found" });
    }

    if (!token) {
      return res.status(401).send({ error: "Token not found" });
    }

    try {
      const decoded = jwt.verify(token, "secret-key");
      req.user = decoded;
      return next();
    } catch (err) {
      return res.status(401).send({ error: "Invalid token" });
    }
  }

  return next();
};

module.exports = sessionIDcheck;
