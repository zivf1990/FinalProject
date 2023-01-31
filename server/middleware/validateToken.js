const validateToken = (req, res, next) => {
  const token = req.body.token;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  connection.query(
    `
    SELECT token
    FROM user_permission 
    WHERE token = ?`,
    [token],
    (error, results) => {
      if (error) {
        return res.status(401).send({ message: "Unauthorized" });
      }

      if (results.length === 0) {
        return res.status(401).send({ message: "Unauthorized" });
      }

      next();
    }
  );
};

module.exports = checkToken;
