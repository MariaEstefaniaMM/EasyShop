const express = require('express');
const product = require('../helpers/models/products');
const router = express.Router();
const isAuth = require('../middlewares/isAuth').isAuth;

router.get('/getAll', (req, res) => {
    product.getAllProducts().then((data) => {
      if(data.length == 0){
        res.send({status:403});
      } else {
        res.status(200).send({status:200, products:data});
      }
      }).catch((err) => {
        console.log(err);
        res.send({status:403})
      })
});

router.get('/getUserProducts',isAuth,(req,res)=>{ 
      product.getUserProducts(req.user.id_user).then((data) => {
        if(data.length == 0){
          res.send({status:403});
        } else {
          res.send({status:200, products:data});
        }
        }).catch((err) => {
          console.log(err);
          res.send({status:403})
        })    
});

router.post('/createProduct',isAuth,(req,res)=>{
      console.log(req.body.name+ req.body.description+ req.body.price+ req.body.quantity+req.body.photo+ req.body.category+ req.user.id_user)
      product.createProduct(req.body.name, req.body.description, req.body.price, req.body.quantity, req.body.photo, req.body.category, req.user.id_user).then((data) => {
        res.send({
          data:data,
          status:200});
      }).catch((err) => {
        console.log(err)
        res.send({status:403});
      })
});

router.put('/updateProduct',isAuth,(req,res)=>{
      console.log(req.body.name+ req.body.description+ req.body.price+ req.body.quantity+ req.body.category+ req.body.id_product+req.body.photo)
      product.updateProduct(req.body.name, req.body.description, req.body.price, req.body.quantity, req.body.photo, req.body.category, req.body.id_product).then((data) => {
        res.send({
          data:data,
          status:200});
      }).catch((err) => {
        console.log(err)
        res.send({status:403});
      })
  });

  router.delete('/deleteProduct', (req, res) => {
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
