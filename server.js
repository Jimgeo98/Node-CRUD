
const path = require("path");
const routes = require("./routes/routes");
const express = require("express");
const favicon = require("express-favicon");

const port = process.env.SERVER_PORT;
const app = express();

//set views file
app.set("views", path.join(__dirname, "views"));

//set view engine
app.set("view engine", "ejs");

//middleware
app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


// Server Listening
app.listen(port, (err) => {
  if(err) console.log(err)
  console.log(`server started at port ${port}`);
  console.log(`click here http://localhost:${port}`);
});
