const db = require('../config/db');
const bcrypt = require('bcryptjs');
const user = require('../queries').users;
let cart = require('../models/carts');

module.exports.getUserByEmail = (email)=>{
    console.log('getUserByEmail');
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.one(user.read,[email]).then((data)=>{
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

module.exports.comparePassword = (candidatePassword, hash)=>{
    console.log('Aqui'+candidatePassword+ hash)
    return new Promise((res,rej) => {
        let hashedPass = bcrypt.hashSync(hash, 10);
        bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
            if (err) throw rej(err);
            res(isMatch);
        });
    });
};

module.exports.signup = (name, lastname, email, password, photo, address, phone)=>{
    //console.log(name+lastname+email+password+user.create)
    return new Promise((res,rej)=>{
        cart.createCart().then((data) => {
            let hashedPass = bcrypt.hashSync(password, 10);
            console.log(name+lastname+email+password+user.create)
              db.connect().then((obj)=>{
                  obj.any(user.create,
                    [name, lastname,email, hashedPass, data.id_cart, photo, address, phone]).then((data)=>{
                    console.log(data)
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
      }).catch((error) => {
        console.log(error)
    });    
}

module.exports.checkUser = (email)=>{
    return new Promise((res,rej)=>{ 
        db.connect().then((obj)=>{
            obj.any(user.read,[email]).then((data)=>{
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

module.exports.deleteUser = (id_user)=>{
	return new Promise((res,rej)=>{
		db.connect().then((obj)=>{
			obj.none(user.delete, [id_user]).then((data)=>{
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

module.exports.updateUser = (name, lastName, email, photo, address, phone, id_user)=>{
	return new Promise((res,rej)=>{
		db.connect().then((obj)=>{
            console.log(user.update);
			obj.none(user.update, [name, lastName, email, photo, address, phone, id_user]).then((data)=>{
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

module.exports.updatePassword = (password, id_user)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            console.log(user.updatePassword);
            let hashedPass = bcrypt.hashSync(password, 10);
            obj.none(user.updatePassword,[hashedPass, id_user]).then((data)=>{
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