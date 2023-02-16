// ************ Require's ************
const express = require('express');
const router = express.Router();
const {uploadOneImage} = require('../middlewares/uploadIMG')
// ************ Controller Require ************
const {index,create,store,detail,edit,update,destroy, oferProducts} = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
/* /products */
router.get('/list', index); 
router.get('/list/offers', oferProducts);

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', create); 
router.post('/create', uploadOneImage.single('image'), store)


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', edit); 
router.put('/edit/:id', update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', destroy); 


module.exports = router;