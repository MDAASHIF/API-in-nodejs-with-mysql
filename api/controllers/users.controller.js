const db = require('../../config/database.config');
const validation = require('../validations/users.validation');
const bcrypt = require('bcryptjs');

module.exports = {
    userList : async (req,res,next) =>{
       var sql = "SELECT * from users";
       db.query(sql,(error,rows,fields)=>{
           if(error) return res.json({
               success : false,
               message : 'Something Wrong'
           });
          return res.json({
               success : true,
               message : 'Data Found',
               data : rows
           });
       });
    },
    insertUser : async (req,res,next) =>{
        const {error} = validation.insertUserValidation(req.body);
        if(error) return res.json({
            success : false,
            error: error.details[0].message
        });
        // Password Encryption
        const saltRound = await bcrypt.genSalt(10);
        const hasPass = await bcrypt.hash(req.body.password,saltRound);
        
        let data = {
            "name":req.body.name,
            "email": req.body.email,
            "password": hasPass,
            "mobile" : req.body.mobile
        }
        var sql = "INSERT into users SET ? ";
        db.query(sql,data,function(error,result){
            if(error) return res.json({"message":"Something Wrong"});
            return res.json({
                success: true,
                "Number of record inserted": result.affectedRows
            })
        })
    },
    updateUser : async (req,res,next) =>{
        const {error} = validation.updateUserValidation(req.body);
        if(error) return res.json({
            success : false,
            message : error.details[0].message
        });
        let user_id = req.params.userId;
        let data = {
            "name" : req.body.name,
            "email":req.body.email,
            "mobile" : req.body.mobile
        }
        var sql = `UPDATE users SET ? where id= ${user_id}`;
        db.query(sql,data ,function(error,result){
            if(error) return res.json({message:"Somthing Wrong"});
            return res.json({
                success : true,
                message : `User id ${user_id} updated successfully`
            })
        })
    },
    deleteUser : async (req,res,next)=>{
        let user_id = req.params.userId;
        var sql = `DELETE from users WHERE id=${user_id}`;
        db.query(sql,function(error,result){
           if(error) return res.json({
               success : false,
               message : 'Something Wrong'
           });
           res.json({
               success : true,
               message : `Number of record deleted ${result.affectedRows}`
           });
        });
    },
    getUserById : async (req,res,next) => {
        let user_id = req.params.userId;
        var sql = `SELECT * from users WHERE id=${user_id}`;
        db.query(sql,function(error,result){
            if(error) return res.json({message : "Something Wrong"});
            return res.json({
                 success : true,
                 data : result
            });
        })
    }
}