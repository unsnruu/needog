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
  findUser: async (where) => {
    const [key, val] = Object.entries(where)[0];

    try {
      const [result] = await promisePool.query(
        `SELECT * FROM users WHERE ${key}="${val}"`
      );
      const [user] = result;
      return user;
    } catch (error) {
      console.log(error);
    }
  },
  createUser: async (enrollment) => {
    const keys = Object.keys(enrollment);
    const values = Object.values(enrollment).map(
      (val) => '"' + val.toString() + '"'
    );
    try {
      await promisePool.query(`
        INSERT INTO users (${keys.toString()})
        VALUES (${values});
      `);
    } catch (error) {
      console.log(error);
      throw new Error("MySQL: failed to create a user");
    }
  },
};

module.exports = sql;
