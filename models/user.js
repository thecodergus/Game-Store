const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    password: {type: String, required: true}
});

userSchema.methods.encryptPassword = function(senha) {
  return bcrypt.hashSync(senha, bcrypt.genSaltSync(5), null);  
};

userSchema.methods.validPassword = function(senha) {
  return bcrypt.compareSync(senha, this.password);  
};

module.exports = mongoose.model('User', userSchema);