const db = require('../config/db');
const cart = require('../queries').carts;
const bill = require('../queries').bills;

module.exports.addProductToCart = (id_product, product_quantity, id_user)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.one(cart.create,[id_product, product_quantity, id_user]).then((data)=>{
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

module.exports.getUserCart = (id_user)=>{
    return new Promise((res,rej)=>{
          db.connect().then((obj)=>{
              obj.any(cart.read,[id_user]).then((data)=>{
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

module.exports.deleteProductCart = (id_cart, product_quantity, id_product)=>{
    console.log(cart.delete,id_cart,product_quantity, id_product);
    return new Promise((res,rej)=>{
          db.connect().then((obj)=>{
              obj.none(cart.delete,[id_cart,product_quantity, id_product]).then((data)=>{
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

module.exports.updateProductCart = (product_quantity,id_cart,product_return,id_product)=>{
    if(product_return){
        query=cart.updateReturn;
    }else{
        query=cart.updateAdd;
    }
    console.log(query,product_quantity,id_cart,product_return,id_product)
    return new Promise((res,rej)=>{
          db.connect().then((obj)=>{
              obj.none(query,[product_quantity, id_cart, id_product]).then((data)=>{
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
module.exports.updateStock = (id_product, quantity)=>{
    return new Promise((res,rej)=>{
          db.connect().then((obj)=>{
              obj.one(query,[quantity, id_product]).then((data)=>{
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
}*/

module.exports.createBill=(amount, payment_mode)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.one(bill.create,[amount, payment_mode]).then((data)=>{
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

module.exports.shop=(amount, payment_mode,id_user)=>{
    return new Promise((res,rej)=>{
        this.createBill(amount, payment_mode).then((data)=>{
            console.log(data);
            console.log(bill.add,data.id_bill, id_user);
            db.connect().then((obj)=>{
                obj.none(bill.add,[data.id_bill, id_user]).then(()=>{
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
            })
        }).catch((err) => {
            console.log(err);
            rej(error);
        })
    })
}

