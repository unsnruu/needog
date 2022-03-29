const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "q1ryu87fs73",
  database: "database_test",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const promisePool = pool.promise();

const sql = {
  findUser: async (id) => {
    try {
      const [user] = await promisePool.query(
        `SELECT * FROM users WHERE id=${id}`
      );
      return user;
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = sql;
