const validation = require('../validations/login.validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../config/database.config');

require('dotenv').config();

module.exports = {
    login : async(req,res) =>{
        const {error} = validation.loginValidation(req.body);
        if(error) return res.status(400).json({
            error : error.details[0].message
        });

        let email = req.body.email;
        let password = req.body.password;

        let sql = `SELECT * from users WHERE email= "${email}"`;

        db.query(sql,async function(error,result){
            if(error) return res.json({
                status : false,
                message : "Something Wrong"
            });
            if(!result) return res.json({
                status : false,
                message : "Wrong Email ID"
            });

            const validPass = await bcrypt.compare(password,result[0].password);
            if(!validPass) return res.json({
                status : false,
                message : "Password Wrong"
            });
            const token = jwt.sign({email:email},process.env.JWTSECRETKEY,{expiresIn:'24h'});
            return res.json({
                status : true,
                message : "Authentication Successfull",
                token :token
            });
        });

        
    }
}
