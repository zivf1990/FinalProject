const userData = {
  table_name: "user",
  values: {
    name: "yotam",
    username: "yot$4",
    address: "jerusalem",
  },
};

const passwordData = {
  table_name: "password",
  values: {
    password: "yotam",
    user_id: 10,
  },
};
const postData = {
  table_name: "post",
  values: {
    title: "swagga kjnkjd 2",
    body: "post number 2 lkfmlkmslkmfsksd",
    user_id: 11,
  },
};
const commentData = {
  table_name: "comment",
  values: {
    title: "title2",
    body: "WHAT WHAT WHAT...",
    post_id: 8,
  },
};
const todoData = {
  table_name: "todo",
  values: {
    title: "opop",
    completed: false,
    user_id: 9,
  },
};

// //insert
// const insertIntoTable2 = `INSERT INTO user_password(password, token) VALUES ?`;
// const values2 = [
//   ["mdslkmlm", "l;dskl;d"],
//   ["kd;lsk;lds", ";ld,s;lds"],
//   ["lkdsjdslk", "idshjiudshj"],
// ];

// //DROP value
// // connection.query("DELETE FROM user_password WHERE password = 'lkdsjdslk';", (err, results, fields) => {
// //   if (err) throw err;
// //   console.log(results.length); // results contains rows returned by server
// // });

// const createUser = async () => {
//   try {
//     //Get the user id from user_info table.
//     const result = await connection
//       .promise()
//       .query("SELECT MAX(id) as last_id FROM user_info");
//     const lastId = await result[0][0].last_id;
//     console.log("Last ID: " + lastId);
//   } catch (err) {
//     throw err;
//   }

//   // const getLastId = () => {
//   //   connection.query(
//   //     "SELECT MAX(id) as last_id FROM user_info",
//   //     function (err, result) {
//   //       if (err) throw err;
//   //       console.log("Last ID: " + result[0].last_id);
//   //       lastId = result[0].last_id;
//   //     }
//   //   );
//   // };
// };

// // createUser();
