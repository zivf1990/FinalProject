const connection = require("../modules/sqlConfig");
const connection2 = require("../modules/sqlPromiseConfig");

const usersQueries = {
    bringAllUsers: (cb) => {
        console.log("hello");
        const query =
            `SELECT * FROM user_info u
            JOIN user_permission per
            ON u.user_id = per.user_id
            WHERE u.permission_level = "admin"`
            connection.query(query,(err,response) => {
                if(err){
                    cb({message:"failed to fetch users"})
                }
                else{
                    cb({message:"here are the users", data:response})
                }
            })

    }
};
module.exports = usersQueries;
