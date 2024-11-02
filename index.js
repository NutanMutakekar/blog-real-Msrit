// const express = require("express");

// const app = express();

// app.get("/", (req, res) => {
//   res.send("welcome to the port 4000")
// })

// app.get("/hello", (req, res) => {
//   //   res.send("hello dear");
//   res.json({
//     success: "true",
//     message: "get request to /hello",
//   });
// });

// app.get("/hi", (req, res) => {
//   // res.send("hidear");
//   res.status(201).json({
//     success: "true",
//     message: "get request to /hi",
//   });
// });

// app.get("/postreq", (req, res) => {
//   res.status(500).json({
//     name: "nutan",
//   });
// });

// app.get("/bond", (req, res) => {
//   res.status(200).json({
//     success: "true",
//     message: "bond",
//   });
// });

// const PORT = 4000;

// app.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`);
// });

const express = require("express");

//always connet to the database before initializing the app
// here we always use the same name as you exported in that file while creatingˀ
const connectDB = require("./db");
connectDB();

// const category = require("./models/category");

// const blogs = require('./models/blogsM')

const app = express();

const categoryRoute=require('./routes/categories');

const blogRoute=require('./routes/blogsR');

//allow us to read the body of the request
app.use(express.json());

app.use('/categories',categoryRoute);

// /categories/:categoryId/blogs   

//this path is to establish one to many relationship

app.use('/blogs',blogRoute);



app.get("/nitu", (req, res) => {
  res.send("hiiiiiiii");
});
// app.post("/categories", async (req, res) => {
//   // console.log(req.body)
//   try {
//     const cat = await category.create(req.body);
//     res.status(201).json({
//       successs: true,
//       category: cat,
//     });
//   } catch {
//     res.status(400).json({
//       status: false,
//       message: "something went wrong",
//     });
//   }
// }
// );

// app.get("/categories", async (req, res) => {
//   try {
//     const cat = await category.find();
//     res.status(200).json({
//       success: true,
//       count: cat.length,
//       categories: cat,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: "something went wrong",
//       error,
//     });
//   }
// }
// );
// app.get('/categories/:id',async(req,res)=>{
//   try{
//     const cat= await category.findById(req.params.id);
//     res.status(200).json({
//       success:true,
//       message:"get method using find by id",
//       categorylist:cat
//     })
//   }
//   catch(error){
// res.status.json({
//   success:false,
//   message:"somthing went wrong"
// })
//   }
// }
// )
// app.put('/categories/:id',async(req,res)=>{
//   try{
//     const cat= await category.findByIdAndUpdate(req.params.id,req.body,{new :true}); 
//     res.status(200).json({
//       success:true,
//       message:"put method using find by id",
//       categorylist:cat
//     })
//   }
//   catch(error){
// res.status.json({
//   success:false,
//   message:"somthing went wrong"
// })
//   }
// }
// )



// app.delete("/categories/:id", async (req, res) => {
//   try {
//     const del = await category.findByIdAndDelete(req.params.id);
//     res.status(200).json({
//       success: true,
//       message: ` data got deleted with id ${req.params.id}`,
//       del
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: "something went wrong",
//       error,
//     });
//   }
// }
// );

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
