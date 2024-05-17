const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const env = require("dotenv");
const app = express();

const routes = require("./app/routes/index");
const User = require("./app/models/User");
const { createDefaultCategories } = require("./app/defualt_data/categories");
const { createDefaultUser, createAdmin } = require("./app/defualt_data/users");
const { createDefaultProducts } = require("./app/defualt_data/products");

env.config();
app.use(cors());
app.use(express.json());
app.use("/public", express.static("public"));

const url_db =
  process.env.URL_DB || "mongodb://localhost:27017/furniture_world_db";
mongoose
  .connect(url_db)
  .then(() => console.log("db connected"))
  .catch((error) => console.error(error));

app.use(routes);

// create admin user
createAdmin()
// create defualt user
createDefaultUser()
// create defualt categories and Products
createDefaultCategories(createDefaultProducts)
// create defualt Products
// createDefaultProducts();

const port = process.env.PORT || 5000;
app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${port}`);
});
