const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ['planejado','fazendo','concluído'],
    default: 'planejado',
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

TodoSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Todo', TodoSchema);