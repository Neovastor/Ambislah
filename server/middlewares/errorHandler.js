function errorHandler(err, req, res, next) {
    let message = []
    let code; 

    if (err.code === 404){
        code = 404
        message.push(err.message)
    }else if (err.code === 400){
        code = 400
        message.push(err.message)
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