const express = require("express");

//always connet to the database before initializing the app
// here we always use the same name as you exported in that file while creatingˀ
const connectDB = require("./db");
connectDB();

const morgan = require("morgan");
// const category = require("./models/category");

// const blogs = require('./models/blogsM')

const app = express();

const categoryRoute = require("./routes/categories");

const blogRoute = require("./routes/blogsR");
const ErrorHandler = require("./Middelware/ErrorHandler");
app.use(morgan("dev"));
//allow us to read the body of the request
app.use(express.json());

app.use("/categories", categoryRoute);

// /categories/:categoryId/blogs

//this path is to establish one to many relationship

app.use("/blogs", blogRoute);

app.use(ErrorHandler);

app.get("/nitu", (req, res) => {
  res.send("hiiiiiiii");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
