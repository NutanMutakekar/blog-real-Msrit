const errorHandler=(err,req,res,next)=>{
    console.log("errorHandler called")
    
    const statusCode=err.statusCode || 500;

    res.status(statusCode).json({
        success:false,
        message:err.message || "internal server error"
    })
    next();
}

module.exports=errorHandler;