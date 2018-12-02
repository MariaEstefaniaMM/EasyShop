const express = require('express');
const cart = require('../helpers/models/carts');
const product = require('../helpers/models/products');
const router = express.Router();
const isAuth = require('../middlewares/isAuth').isAuth;

router.get('/getUserCart',isAuth,(req,res)=>{ 
  console.log(req);
      cart.getUserCart(req.user.id_user).then((data) => {
          res.send({status:200, products:data});
        }).catch((err) => {
          console.log(err);
          res.send({status:403, message: 'Error while getting user cart product'})
        })    
});

router.post('/addProductToCart',isAuth,(req,res)=>{
      console.log(req.body.id_product, req.body.product_quantity,req.user.id_user)
      product.getProductById(req.body.id_product).then((data) => {
        if(data.quantity>=req.body.product_quantity){
          cart.addProductToCart(req.body.id_product, req.body.product_quantity,req.user.id_user).then((data) => {
            res.send({
              data:data,
              status:200});
          }).catch((err) => {
            console.log(err)
            res.send({status:403, message:'Fail to add the product to cart'});
          })
        }else{
            res.send({status:403, message:'Insuficient Stock'});
        }
      }).catch((err) => {
        console.log(err)
        res.send({status:403, message:'Fail to get the product'});
      })
});

router.put('/updateProductCart',isAuth,(req,res)=>{
      console.log(req.body.product_quantity, req.body.id_cart, req.body.return,req.body.id_product)
      if(!req.body.return){
        product.getProductById(req.body.id_product).then((data) => {
          if(data.quantity>=req.body.product_quantity){
            cart.updateProductCart( req.body.product_quantity, req.body.id_cart,req.body.return,req.body.id_product).then((data) => {
            res.send({
              data:data,
              status:200,
              message:'Added!'});
          }).catch((err) => {
            console.log(err)
            res.send({status:403, message:'Fail to update the product from cart'});
          })
        }else{
          res.send({status:403, message:'Insuficient Stock'});
      }
      }).catch((err) => {
        console.log(err)
        res.send({status:403, message:'Fail to get the product'});
      })
    }else{
      cart.updateProductCart( req.body.product_quantity, req.body.id_cart,req.body.return,req.body.id_product).then((data) => {
        res.send({
          data:data,
          status:200,
          message:'Updated!'});
      }).catch((err) => {
        console.log(err)
        res.send({status:403, message:'Fail to update the product from cart'});
      })
    }
      
  });

  router.post('/deleteProductCart', isAuth, (req, res) => {
    console.log(req.body.id_cart)
      cart.deleteProductCart(req.body.id_cart,req.body.product_quantity, req.body.id_product).then((data) => {
          console.log(data);
          res.send({status:200});
        }).catch((err) => {
          console.log(err);
          res.send({status:403, message:'Fail to delete the product from cart'})
        })
  });

  router.post('/shop',isAuth,(req,res)=>{
    cart.shop(req.body.amount,req.body.payment_mode,req.user.id_user,req.body.id_product).then((data) => {
      console.log(data);
      res.send({status:200, message:'Successful purchase', id_bill:data.id_bill});
    }).catch((err) => {
      console.log(err);
      res.send({status:403, message:'Shop failed'})
    })
  })

module.exports = router;
