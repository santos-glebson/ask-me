const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  question: { type: String, required: true },
  roomCode: { type: Number },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Question", questionSchema);
