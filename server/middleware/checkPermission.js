const checkPermission = (req, res, next) => {
  const token = req.body.token;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  connection.query(
    `
    SELECT permission_level 
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

      const { permission_level } = results[0];

      //   if (permission_level === '<some value>') {
      //     // Additional check for permission level goes here
      //   }

      next();
    }
  );
};

module.exports = checkPermission;
