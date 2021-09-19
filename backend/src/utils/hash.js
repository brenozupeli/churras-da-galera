const bcrypt = require('bcryptjs');

function hashGenerator(pass) {
  return new Promise((resolve) => {
    bcrypt.genSalt(10, function (_, salt) {
      bcrypt.hash(pass, salt, function (_, hash) {
        resolve(hash);
      });
    });
  });
}

module.exports = { hashGenerator }