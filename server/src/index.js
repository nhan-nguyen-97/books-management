import express from "express";
import morgan from "morgan";
import path from "path";
// import bodyParser from "body-parser";
// import cors from "cors";
// import mongoose from "mongoose";
import dotevn from "dotenv";
import { engine } from "express-handlebars";

// import users from "../routers/users.js";

dotevn.config();
const app = express();

const PORT = process.env.PORT || 5000;
app.use(morgan("combined"));
app.engine(
  "hbs",
  engine({
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.set(
  "views",
  "C:/Users/Admins/Desktop/Source_Code/books-management/server/src/resources/views"
);

app.use(express.static('C:/Users/Admins/Desktop/Source_Code/books-management/server/src/public'))

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// const URI = process.env.DATABASE_URL;

// app.use(bodyParser.json({ limit: "30mb" }));
// app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
// app.use(cors());

// app.get("/users", users);
// app.post("/users", users);

// mongoose
//   .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("Connected to DB");
//     app.listen(PORT, () => {
//       console.log(`Server is running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log("Error: ", err);
//   });
