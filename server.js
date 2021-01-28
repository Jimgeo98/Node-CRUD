const path = require("path");
const express = require("express");
const ejs = require("ejs");
const app = express();
const mysql = require("mysql");


const db = mysql.createPool({
  connectionLimit : 100,
  host: "localhost",
  user: "admin2",
  password: "1qa2ws",
  database: "uowm",
  port: 3307,
});


// Check the possible errors 
db.getConnection((err, connection) => {

  if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('Database connection was closed.')
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
          console.error('Database has too many connections.')
      }
      if (err.code === 'ECONNREFUSED') {
          console.error('Database connection was refused.')
      }
  }
  else if (connection){
    console.log("MySQL Database connected successfully")
  }
})


//set views file
app.set("views", path.join(__dirname, "views"));

//set view engine
app.set("view engine", "ejs");

//Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Display all Data
app.get("/", (req, res) => {
  let sql = "SELECT * FROM users ORDER by name ASC";
  db.query(sql, (err, rows) => {
    if (err) throw err;
    res.render("user_index", {
      title: "CRUD App using NodeJS / ExpressJS / MySQL",
      users: rows,
    });
  });
});

//Add Request
app.get("/add", (req, res) => {
  res.render("user_add", {
    title: "Add New User",
  });
});

//Save the add item
app.post("/save", (req, res) => {
  let data = {
    name: req.body.name,
    email: req.body.email,
    am: req.body.am,
  };
  let sql = "INSERT INTO users SET ?";
  db.query(sql, [data], (err, results) => {
    if (err) throw err;
    console.log(results);
    res.redirect("/");
  });
});

app.get("/edit/:userId", (req, res) => {
  const userId = req.params.userId;
  let sql = "Select * from users where id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) throw err;
    res.render("user_edit", {
      title: "Edit user",
      user: result[0],
    });
  });
});

// Update Request
app.post("/update", (req, res) => {
  const userId = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const am = req.body.am;

  let sql = "update users SET name= ?, email= ? , am= ? where id = ?";
  db.query(sql, [name, email, am, userId], (err, results) => {
    if (err) throw err;
    console.log(results);
    res.redirect("/");
  });
});

//Delete Request
app.get("/delete/:userId", (req, res) => {
  const userId = req.params.userId;
  let sql = "DELETE from users where id = ?";
  db.query(sql, userId, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

// Server Listening
app.listen(3000, () => {
  console.log("server started at port 3000");
  console.log("click here " + " http://localhost:3000/");
});
