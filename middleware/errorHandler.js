const {constants}= require('../constants');

const errorHandler =(err,req,res,next) =>{
const statusCode =res.statusCode ?res.statusCode : 500;
switch (statusCode){
    case constants.VALIDATION_ERROR: res.json({title:"vallidation Failed ", Message:err.Message, stackTrace: err.stack });
    break;
    case constants.NOT_FOUND: res.json({title:"not Found",Message:err.Message,stackTrace:err.stack });
    case constants.UNAUTHORIZED:res.json({title:"unauthorized ", Message:err.Message, stackTrace: err.stack });
    case  constants.FORBIDDEN: res.json({title:"forbidden",Message:err.Message,stackTrace:err.stack });
    case constants.SERVER_ERROR: res.json({title:"Server Error",Message:err.Message,stackTrace:err.stack });
default:
    console.log("no error");
    break;

}


};

module.exports =errorHandler;