require('dotenv').config();

let jwt = require('jsonwebtoken');

module.exports = {
    checkToken : (req,res,next) => {
        let token = req.header('token') || req.header('authentication');

        if(token){
            jwt.verify(token,process.env.JWTSECRETKEY,(error,decode)=>{
                if(error){
                    return res.json({
                        success : false,
                        message : 'Token is not Valid'
                    });
                }else{
                    req.decode = decode;
                    next();
                }
            })
        }else{
            return res.json({
                success : false,
                message : 'Auth token is not supplied'
            })
        }
    }
}