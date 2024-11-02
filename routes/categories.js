
const express=require('express');


const blogRoute=require('./blogsR')

const {
    createCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategory}= require('../controller/categories')
    
    const router =express.Router();
    
//  /categories/:categoryId/blogs' whenever this url is matched go to blogRoute🐱   

//this is done to extablish one to many relationship

router.use('/:categoryId/blogs',blogRoute);    
router.get('/',getAllCategory);
router.get('/:id',getCategoryById);
router.post('/',createCategory);
router.put('/:id',updateCategory);
router.delete('/:id',deleteCategory);


module.exports=router;

 