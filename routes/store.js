const express=require('express');

const productController=require('../Controllers/admin')

const router=express.Router();

router.get('/products/music',productController.getMusic)

// router.get('/products/merch',productController.getMerch);

module.exports=router;