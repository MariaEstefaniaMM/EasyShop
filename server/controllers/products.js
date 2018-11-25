const express = require('express');
const product = require('../helpers/models/products');
const router = express.Router();
const isAuth = require('../middlewares/isAuth').isAuth;

router.get('/getAll', (req, res) => {
    product.getAllProducts().then((data) => {
      if(data.length == 0){
        res.send({status:403, message:'No available products'});
      } else {
        res.status(200).send({status:200, products:data});
      }
      }).catch((err) => {
        console.log(err);
        res.send({status:403, message:'Could not get products'})
      })
});

router.get('/getUserProducts',isAuth,(req,res)=>{ 
  console.log(req);
      product.getUserProducts(req.user.id_user).then((data) => {
          res.send({status:200, products:data});
        }).catch((err) => {
          console.log(err);
          res.send({status:403, message: 'Error while getting user product'})
        })    
});

router.post('/createProduct',isAuth,(req,res)=>{
      console.log(req.body.name_product, req.body.des_product, req.body.price_product, req.body.quantity, req.body.img_product, req.body.id_category, req.user.id_user)
      product.createProduct(req.body.name_product, req.body.des_product, req.body.price_product, req.body.quantity, req.body.img_product, req.body.id_category, req.user.id_user).then((data) => {
        res.send({
          data:data,
          status:200});
      }).catch((err) => {
        console.log(err)
        res.send({status:403, message:'Fail to create the product'});
      })
});

router.put('/updateProduct',isAuth,(req,res)=>{
    console.log(req);
      console.log(req.body.name_product, req.body.des_product, req.body.price_product, req.body.quantity,req.body.img_product, req.body.id_category, req.body.id_product)
      product.updateProduct(req.body.name_product, req.body.des_product, req.body.price_product, req.body.quantity, req.body.img_product, req.body.id_category, req.body.id_product).then((data) => {
        res.send({
          data:data,
          status:200});
      }).catch((err) => {
        console.log(err)
        res.send({status:403});
      })
  });

  router.post('/deleteProduct', isAuth, (req, res) => {
    console.log(req.body.id_product)
      product.deleteProduct(req.body.id_product).then((data) => {
          console.log(data);
          res.send({status:200});
        }).catch((err) => {
          console.log(err);
          res.send({status:403})
        })
  });

module.exports = router;
