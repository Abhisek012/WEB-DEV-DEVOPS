const jwt = require("jsonwebtoken")

function authmiddleware(req,res,next){
    const token = req.headers.token;
    try{
        const decoded = jwt.verify(token,"secret123123")
        req.userId = decode.userId;
        next();
    }catch(err){
        return res.status(403).json({
            message: "Invalid token or token not found."
        })
    }

}

module.exports = {
   authmiddleware : authmiddleware
}