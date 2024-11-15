const express = require("express");

//always connet to the database before initializing the app

// here we always use the same name as you exported in that file while creating

const connectDB = require("./db");
const dotenv=require("dotenv")
//if you have defined .env file inside any env folder or given name like rabbit.env ingeneral somename.env than you should define the path like shown

// dotenv.config(path: "./path vere you have saved")

// we need to do call dotenv.config() before conneting to database

// as we have mannully told to import all the env variable by below syntax that is dotenv.config()
//every middleware has access to env 
dotenv.config()
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

app.use("/api/categories", categoryRoute);

// /categories/:categoryId/blogs

//this path is to establish one to many relationship

app.use("/api/blogs", blogRoute);

app.use(ErrorHandler);


//we will handler incorrect url or url which are not defined at the last after the ErrorHandler

// all means it will match with all the http methods wether it is post,put,get,patch, delete

// * means it mathes any pattern

// this we are doing to send standard response whenever url is not matched with defined url instead of sending simple html responsce
app.all('*',(req,res)=>{
  res.status(404).json({
    success:false,
    message:"Page Not Found"
  })
})


app.get("/nitu", (req, res) => {
  res.send("hiiiiiiii");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
