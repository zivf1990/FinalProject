const connection = require("../modules/sqlConfig");

const createUser = async (username, password, email, name, address, cb) => {
  // Build the first query to insert the user information
  const userInfoQuery = `INSERT INTO user_info (name, username, email,address) 
          VALUES("${name}", "${username}", "${email}", "${address}");`;

  try {
    // Start a new transaction
    connection.beginTransaction(async function (err) {
      if (err) {
        throw err;
      }

      // Execute the first query
      connection.query(userInfoQuery, function (error, results, fields) {
        if (error) {
          // If there's an error, roll back the transaction
          return connection.rollback(function () {
            throw error;
          });
        }

        // Get the inserted user's ID
        const insertId = results.insertId;

        // Build the second query to insert the password
        const passwordQuery = `INSERT INTO user_password(password, user_id) VALUES("${password}", ${insertId})`;

        // Execute the second query
        connection.query(passwordQuery, function (error, results, fields) {
          if (error) {
            // If there's an error, roll back the transaction
            return connection.rollback(function () {
              throw error;
            });
          }
        });

        const token = Math.random() * Number.MAX_SAFE_INTEGER;

        const permissionQuery = `INSERT INTO user_permission(user_id, permission_level , token)
         VALUES( ${insertId}, "user", "${token}")`;

        // Execute the second query
        connection.query(permissionQuery, function (error, results, fields) {
          if (error) {
            // If there's an error, roll back the transaction
            return connection.rollback(function () {
              throw error;
            });
          }
          cb(token);
        });
      });

      // Commit the transaction
      connection.commit(function (err, res) {
        if (err) {
          // If there's an error, roll back the transaction
          return connection.rollback(function () {
            throw err;
          });
        }
        console.log("Transaction completed.");
      });
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = createUser;
