
const mysql = require("mysql")
require("dotenv").config()

// Database config
const db = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
})



// Check the possible errors
db.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.")
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.")
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.")
    }
  } else if (connection) {
    console.log("MySQL Database connected successfully")
  }
})


module.exports = db;