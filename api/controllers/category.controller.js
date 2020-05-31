const db = require('../../config/database.config');
const validation = require('../validations/category.validation');

module.exports = {
    categoryInsert : async (req,res,next) =>{
        const {error} = validation.categoryValidation(req.body);
        if(error) return res.json({
            error : error.details[0].message
        });
        let imagePath = (req.file)?req.file.path:'';
        imagePath = imagePath.split('\\').join('/');;
        let data = {
            "name" : req.body.name,
             "image": imagePath.split("public").join("")
        };
       
        let sql = 'INSERT into category SET ?';
        db.query(sql,data,function(error,result){
            if(error) return res.json({
                success : false,
                message : "Something wrong. Try Again."
            });
            res.json({
                success : true,
                message : `${result.affectedRows} record inserted successfully.`
            });

        });
        
    },
    categoryList : async (req,res,next) => {
        let sql = 'SELECT *from category';
        db.query(sql,function(error,rows,fields){
            if(error) return res.json({
                success : false,
                message : "Something Wrong"
            });
            return res.json({
                success : true,
                data : rows
            });
        });
    }
}