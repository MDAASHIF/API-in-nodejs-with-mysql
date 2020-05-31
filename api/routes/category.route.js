const router = require('express').Router();
const categoryController = require('../controllers/category.controller');
var imageUploadMiddileware = require('../middileware/categoryImageUpload.middileware');

router.post('/',imageUploadMiddileware.upload.single('image1'),categoryController.categoryInsert);
router.get('/',categoryController.categoryList);

module.exports = router; 