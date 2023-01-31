const connection = require("../modules/sqlConfig");
const connection2 = require("../modules/sqlPromiseConfig");

const usersQueries = {
    bringAllUsers: (cb) => {
        console.log("hello");
        const query =
            `SELECT * FROM user_info u
            JOIN user_permission per
            ON u.user_id = per.user_id
            WHERE NOT per.permission_level = "admin";`
            connection.query(query,(err,response) => {
                if(err){
                    cb({message:"failed to fetch users"})
                }
                else{
                    cb({message:"here are the users", data:response})
                }
            })

    },
    changeUserPermission: (id,cb) => {
        
        const query =
            `UPDATE user_permission
            SET permission_level = CASE 
              WHEN permission_level = 'user' THEN 'blocked'
              WHEN permission_level = 'blocked' THEN 'user'
              ELSE permission_level
            END
            WHERE user_id = ${id};`
            connection.query(query,(err,response) => {
                if(err){
                    cb({message:"failed to fetch users"})
                    console.log("hello");
                }
                else{
                    cb({message:"here are the users", data:true})
                }
            })

    },
};
module.exports = usersQueries;
