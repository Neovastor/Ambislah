function errorHandler(err, req, res, next) {
    let message = [];
    let code; 

    if (err.code === 404){
        code = 404
        err.message.forEach(element => {
            
            message.push(element)    
        });
        
    }else if (err.code === 400){
        code = 400
        err.message.forEach(element => {
            message.push(element)    
        });
    }else {
        code = 500
        message.push("Internal server error")
    }

    res.status(code).send({
        code,
        message
    })
}

module.exports = errorHandler