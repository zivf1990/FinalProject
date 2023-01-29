const connection = require("../modules/sqlConfig");

const checkUser = async (username, password, cb) => {
    const responseObj={};
    const selectQuery = `
    SELECT u.user_id, per.permission_level
    FROM user_password p
    JOIN user_info u
    ON u.user_id = p.user_id
    JOIN user_permission per
    ON u.user_id = per.user_id
    WHERE u.username = "${username}" and p.password = "${password}";
  `;
    connection.query(selectQuery, function (error, results) {
        if(error){
            cb(false);
        }
        if(results.length>0){
            const token = Math.random() * Number.MAX_SAFE_INTEGER;
            responseObj.token = token;
            responseObj.permission_level = results[0].permission_level;
            connection.query(`UPDATE user_permission
                SET token="${token}" WHERE user_id=${results[0].user_id}`, function (err,toke) {
                cb(responseObj);
                    console.log(token, "erer");
            })
        }
        else{
            cb(false);
        }
    });
};

module.exports = checkUser;
