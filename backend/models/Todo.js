const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ["A fazer", "Fazendo", "Concluído"],
    default: "A fazer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

TodoSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model("Todo", TodoSchema);
