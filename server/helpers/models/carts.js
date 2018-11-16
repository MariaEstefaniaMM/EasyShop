const db = require('../config/db');
const cart = require('../queries').carts;

module.exports.createCart = ()=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.one(cart.create).then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                console.log(error);
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            console.log(error);
            rej(error);
        });
    });
}
/*
module.exports.getCartProducts = (cart_id)=>{
    return new Promise((res,rej)=>{
          db.connect().then((obj)=>{
              obj.any(cartQueries.getCartProducts,[cart_id]).then((data)=>{
                  res(data);
                  obj.done();
              }).catch((error)=>{
                  console.log(error);
                  rej(error);
                  obj.done();
              });
          }).catch((error)=>{
              console.log(error);
              rej(error);
        });
    });
}

module.exports.addProductToCart = (cart_id, product_id, product_quantity, price_product)=>{
    return new Promise((res,rej)=>{
          db.connect().then((obj)=>{
              obj.one(cartQueries.addProductToCart,[product_quantity, cart_id, product_id, (price_product*product_quantity)]).then((data)=>{
                  res(data);
                  obj.done();
              }).catch((error)=>{
                  console.log(error);
                  rej(error);
                  obj.done();
              });
          }).catch((error)=>{
              console.log(error);
              rej(error);
        });
    });
}

module.exports.deleteProductFromCart = (id_cart_product,amount,id_cart,product_quantity,id_product)=>{
    return new Promise((res,rej)=>{
          db.connect().then((obj)=>{
              obj.none(cartQueries.deleteProductFromCart,[id_cart_product, amount,id_cart,product_quantity, id_product]).then((data)=>{
                  res(data);
                  obj.done();
              }).catch((error)=>{
                  console.log(error);
                  rej(error);
                  obj.done();
              });
          }).catch((error)=>{
              console.log(error);
              rej(error);
        });
    });
}

module.exports.updateProductCart = (id_cart_product, product_quantity,amount, id_cart, id_product)=>{
    return new Promise((res,rej)=>{
          db.connect().then((obj)=>{
              obj.one(cartQueries.updateProductFromCart,[product_quantity, id_cart_product,amount, id_cart, id_product]).then((data)=>{
                  res(data);
                  obj.done();
              }).catch((error)=>{
                  console.log(error);
                  rej(error);
                  obj.done();
              });
          }).catch((error)=>{
              console.log(error);
              rej(error);
        });
    });
}

module.exports.updateProductFromCart = (up, id_cart_product, product_quantity,amount, id_cart, id_product)=>{
    var query = cartQueries.updateProductFromCartUP
    if (!up){
        query = cartQueries.updateProductFromCartDOWN
    }
    return new Promise((res,rej)=>{
          db.connect().then((obj)=>{
              obj.one(query,[product_quantity, id_cart_product,amount, id_cart, id_product]).then((data)=>{
                  res(data);
                  obj.done();
              }).catch((error)=>{
                  console.log(error);
                  rej(error);
                  obj.done();
              });
          }).catch((error)=>{
              console.log(error);
              rej(error);
        });
    });
}

module.exports.getCP = (id_cart,id_product)=>{
    return new Promise((res,rej)=>{
          db.connect().then((obj)=>{
              obj.any(cartQueries.getCP,[id_cart,id_product]).then((data)=>{
                  res(data);
                  obj.done();
              }).catch((error)=>{
                  console.log(error);
                  rej(error);
                  obj.done();
              });
          }).catch((error)=>{
              console.log(error);
              rej(error);
        });
    });
}
*/

