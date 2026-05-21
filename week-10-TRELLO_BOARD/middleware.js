function authmiddleware(){
    function authmiddleware(req,res, next){

        const token = req.headers.token; //jwt

        const decoded = jwt.verify(token,"rjdekjsdfjkljfkjej8473289urdkjdpassword");
        const userId = decoded.userId;
        if(userId){
            req.userId;
            next();


        }else{
            res.status(403).json({
                message:"Token was incorrect"
            })
        }
    }
}

module.exports = {
    authmiddleware:authmiddleware
}

