function authMiddleware(req, res,next){
    
      const token = req.headers.token;
    
      if(!token){
        res.status(403).send({
          message:"You are not logged in."
        })
        return;
      }
     
      let decoded;
      try {
        decoded = jwt.verify(token, "Abhi123");
      } catch (err) {
        res.status(403).send({
          message: "Invalid token"
        });
        return;
      }
      const username = decoded.username;
    
      if(!username){
        res.status(403).send({
          message:"malformed token"
        })
        return;
      }

      next();

      req.username = username;
}

module.exports ={
    authMiddleware
}