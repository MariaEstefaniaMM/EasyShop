const db = require('../config/db');
const product = require('../queries').products;

module.exports.getAllProducts = ()=>{
    console.log(product.readAll);
    return new Promise((res,rej)=>{
          db.connect().then((obj)=>{
              obj.any(product.readAll).then((data)=>{
                  console.log(data);
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

module.exports.createProduct = (name, description, price, quantity, img_name, category,  id_user)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.one(product.create, [name, description, price, quantity, img_name, category, id_user]).then((data)=>{
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

module.exports.updateProduct = (name, description, price, quantity, img_name, category, id_product)=>{
    console.log('updateProduct'+product.update)
    return new Promise((res,rej)=>{
          db.connect().then((obj)=>{
              obj.none(product.update,[name, description, price, quantity, img_name, category, id_product]).then((data)=>{
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

module.exports.getUserProducts = (id_user)=>{
    return new Promise((res,rej)=>{
          db.connect().then((obj)=>{
              obj.any(product.read,[id_user]).then((data)=>{
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

module.exports.deleteProduct = (id_product)=>{
    return new Promise((res,rej)=>{
      db.connect().then((obj)=>{
        obj.none(product.delete, [id_product]).then((data)=>{
          res(data);
          obj.done();
        }).catch((error)=>{
          console.log(error);
          rej(error);
          obj.done();
        });
      }).catch((error)=>{
        rej(error);
      });
    });
  }
