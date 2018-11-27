const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

// Helper for linking to external query files:
function sql(file) {
    const fullPath = path.join(__dirname, file); // generating full path;
    return new QueryFile(fullPath, {minify: true});
}

module.exports = {
  // external queries for Users:
  users: {
    create: sql("./users/createUser.sql"),
    read: sql("./users/getUser.sql"),
    update: sql("./users/updateUser.sql"),
    updatePassword: sql("./users/updatePassword.sql"),
    delete: sql("./users/deleteUser.sql"),
    checkUser: sql("./users/checkUser.sql")
  },
  // external queries for Carts:
  carts: {
    create: sql("./carts/createCart.sql"),
    updateAdd: sql("./carts/updateCartAdd.sql"),
    updateReturn: sql("./carts/updateCartReturn.sql"),
    delete: sql("./carts/deleteCart.sql"),
    read: sql("./carts/getCart.sql"),
    updateStock: sql("./carts/updateStock.sql")
  },
  // external queries for Products:
  products:{
    readAll: sql("./products/getAll.sql"),
    readById:sql("./products/getById.sql"),
    create: sql("./products/createProduct.sql"),
    update: sql("./products/updateProduct.sql"),
    read: sql("./products/getUserProducts.sql"),
    delete: sql("./products/deleteProduct.sql"),
    addPaymentMode: sql("./products/addPaymentMode.sql")
  },
  // external queries for Comments:
  comments:{
    create: sql("./comments/createComment.sql"),
    update: sql("./comments/updateComment.sql"),
    read: sql("./comments/getProductComments.sql"),
    delete: sql("./comments/deleteComment.sql")
  },
  // external queries for Bill:
  bills:{
    create: sql("./bills/createBill.sql"),
    add: sql("./bills/productsBill.sql"),
  }
};
