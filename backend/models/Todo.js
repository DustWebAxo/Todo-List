const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Customizando a saída JSON
TodoSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};


module.exports = mongoose.model('Todo', TodoSchema);