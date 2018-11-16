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
    delete: sql("./users/deleteUser.sql")
  },
  // external queries for Carts:
  carts: {
    create: sql("./carts/createCart.sql")
  }
};
