
import {db} from "../model/db.mjs";


// Display all Data
export const getAllData = (req, res) => {
  let sql = "SELECT * FROM users ORDER by name ASC";
  db.query(sql, (err, rows) => {
    if (err) throw err;
    res.render("user_index", {
      title: "CRUD App to Store employees data",
      users: rows,
    });
  });
};



//Add Request
export const addData = (req, res) => {
  res.render("user_add", {
    title: "Add New User",
  });
};



//Save the added item
export const saveData = (req, res) => {
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
};



//Get specific user with unique id
export const getSpecificUser = (req, res) => {
  const userId = req.params.userId;
  let sql = "Select * from users where id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) throw err;
    res.render("user_edit", {
      title: "Edit user",
      user: result[0],
    });
  });
};



// Update Request
export const updateData = (req, res) => {
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
};



//Delete user with specific id
export const deleteData = (req, res) => {
  const userId = req.params.userId;
  let sql = "DELETE from users where id = ?";
  db.query(sql, userId, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
};

