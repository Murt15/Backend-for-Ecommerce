const express=require('express');

const cartController=require('../Controllers/cart');

const router=express.Router();

router.post('/cart/add-product',cartController.postAddProduct);

router.get('/cart/get-products',cartController.getProducts);

router.get('/cart/get-productsforOrder',cartController.getAllOrders);

router.post('/cart/postOrder',cartController.postOrder)

router.post('/cart/delete-product/:productid',cartController.postdeleteProduct);



module.exports=router;