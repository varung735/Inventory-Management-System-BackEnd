const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.auth = async (req,res,next) => {
    // to get the token from cookies
    const token = req.headers.token;

    // if the token's missing
    if(!token){
        res.status(403).send("token is missing");
        return;
    }
    else{
        //verify token
        try {
            const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
            req.employee = decodedToken;
            
        } catch (error) {
            res.status(403).json({
                "message": "token invalid",
                "error": error.message
            });
            console.log(error);
        }
    }


    return next();
}