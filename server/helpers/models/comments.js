const db = require('../config/db');
const comment = require('../queries').comments;

module.exports.createComment = (id_product, id_user, comment_text, first_comment)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.one(comment.create, [id_product, id_user, comment_text, first_comment]).then((data)=>{
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

module.exports.updateComment = (comment_text, id_commet)=>{
    console.log('updateCommet'+comment.update)
    return new Promise((res,rej)=>{
          db.connect().then((obj)=>{
              obj.none(comment.update,[comment_text, id_commet]).then((data)=>{
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

module.exports.getProductComments = (id_product)=>{
    return new Promise((res,rej)=>{
          db.connect().then((obj)=>{
              obj.any(comment.read,[id_product]).then((data)=>{
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

module.exports.deleteComment = (id_comment)=>{
    return new Promise((res,rej)=>{
      db.connect().then((obj)=>{
        obj.none(comment.delete, [id_comment]).then((data)=>{
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
