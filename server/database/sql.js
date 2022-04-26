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
  getPostsByPetLoc: async ({ pet, sido, sigungu, table }) => {
    const wherePet = pet ? `AND pet = ${pet}` : "";
    const whereSido = sido ? `AND sido = ${sido}` : "";
    const whereSigungu = sigungu ? `AND sigungu = ${sigungu}` : "";

    const query = `SELECT * FROM ${table} WHERE TRUE ${wherePet} ${whereSido} ${whereSigungu} `;
    try {
      const [results, metas] = await promisePool.query(query);
      return results;
    } catch (err) {
      console.error(err);
    }
  },
  getPostById: async ({ table, id }) => {
    const query = `SELECT * FROM ${table} WHERE id = ${id};`;
    try {
      const [[result], metas] = await promisePool.query(query);
      return result;
    } catch (err) {
      console.log("Failed get a Post from " + table);
    }
  },

  createPost: async (post) => {
    const { title, json, author, pet, sido, sigungu, table } = post;
    const jsonText = JSON.stringify(json);

    const values = [title, jsonText, author, pet, sido, sigungu];

    try {
      await promisePool.query(
        `
        INSERT INTO ${table} (title, json, author, pet, sido, sigungu)
        VALUES(?, ?, ?, ?, ?, ?)
      `,
        values
      );
    } catch (err) {
      console.log("Failed to create a new post");
      throw new Error(err);
    }
  },
};

module.exports = sql;
