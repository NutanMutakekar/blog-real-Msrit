
const express = require('express');

// here we have set mergeparams:true because by setting this to true now router can accept route request from other routes also like in this case we are gonna accept route req from categories route


const {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog
} = require("../controller/blog");

const router = express.Router({mergeParams:true});
// /categories/:categoryId/blogs/

// router.get("/", getAllBlog);
// router.get("/:id", getSingleBlog);
// router.post("/", createBlog);

//todo this is called chaining


//these two routes are triggered in two cases 1> /blogs/
//2> /categories/categoryId/blogs/
//to handle the create and getAll function we will add some new feature to it in order to set the categoryId in req.body while creating blog and fetching the all vlogs that belogs to perticular categoryId
router
.route('/')
.get(getAllBlog)
.post(createBlog)

// /categories/:categoryId/blogs/:id

router
.route('/:id')
.get(getSingleBlog)
.put(updateBlog)
.delete(deleteBlog)
// router.put("/:id", updateBlog);
// router.delete("/:id", deleteBlog);

module.exports = router;
