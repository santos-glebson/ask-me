const Room = require("../models/Room");
const Question = require("../models/Question");
const { validationResult } = require("express-validator");

module.exports = {
  create: async function (req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render("create-room", {
          title: "Criar sala",
          page: "login",
          error: errors.array(),
        });
      }
      let roomCode = "";
      for (let c = 0; c < 6; c++) {
        const number = Math.floor(Math.random() * 9);
        roomCode += number;
      }
      const room = new Room({
        password: req.body.password,
        roomCode: roomCode,
      });
      const savedRoom = await room.save();
      res.redirect(`/room/${roomCode}`);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  show: async (req, res) => {
    try {
      let roomCode = req.params.roomCode;
      let questions = await Question.find({ roomCode });
      let room = await Room.find({ roomCode });
      const errors = validationResult(req);
      if (room.length != 0) {
        res.render("room", {
          title: "Sala",
          page: "rooms",
          roomCode,
          questions,
          error: false,
        });
      }
    } catch {
      res.send("Página não existe");
    }
  },
  login: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render("login", {
          title: "Login",
          page: "login",
          error: errors.array(),
        });
      }
      let roomCode = req.body.roomCode;
      let findRoom = await Room.find({ roomCode });
      if (findRoom.length == 0) {
        return res.render("login", {
          title: "Login",
          page: "login",
          error: [{ msg: "Sala não encontrada" }],
        });
      }
      res.redirect(`/room/${roomCode}`);
    } catch (error) {
      res.send("{error: [msg: Erro]}");
    }
  },
  filter: async (req, res) => {
    let status = req.params.filter;
    if (status == "read") {
      let room = await Room.find({ read: true });
      res.redirect(`room/${req.params.roomCode}`);
    }
  },
};
