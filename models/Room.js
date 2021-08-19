const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  password: { type: String },
  roomCode: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Room", roomSchema);
