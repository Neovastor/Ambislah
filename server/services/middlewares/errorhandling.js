module.exports = (err, req, res, next) => {
  switch (err.code) {
    case 400: message = err.message ; break;
    case 401: message = err.message || `Username and Password Not Match`; break;
    case 403: message = `Forbidden Access`; break;
    case 404: message = `No Match Found`; break;
    case 500: message = err || `Internal Server Error`; break;
  }
  console.log(err)
  return res.status(err.code).json({message})
}