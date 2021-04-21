  

import path from "path";
import {router} from "./routes/routes.mjs";
import express from "express";
import favicon from "express-favicon";

const port = process.env.SERVER_PORT;
const app = express();
const __dirname = path.resolve(path.dirname(''));

//set views file
app.set("views", path.join(__dirname, "views"));

//set view engine
app.set("view engine", "ejs");

//middleware
app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);


// Server Listening
app.listen(port, (err) => {
  if(err) console.log(err)
  console.log(`server started at port ${port}`);
  console.log(`click here http://localhost:${port}`);
});