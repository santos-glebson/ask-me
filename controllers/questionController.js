const Question = require("../models/Question");
const Room = require("../models/Room");
const { validationResult } = require("express-validator");

module.exports = {
  create: async function (req, res) {
    const question = new Question({
      question: req.body.question,
      roomCode: req.body.roomCode,
    });
    try {
      const savedQuestion = await question.save();
      res.redirect(`/room/${req.body.roomCode}`);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  check: async function (req, res) {
    try {
      const roomCode = req.params.roomCode;
      const errors = validationResult(req);
      let questions = await Question.find({ roomCode });
      let findRoom = await Room.findOne({ roomCode });
      const questionCode = req.params.questionCode;
      let question = { _id: questionCode };
      const password = req.body.password;
      if (password != findRoom.password) {
        return res.render("room", {
          title: "Sala",
          page: "rooms",
          roomCode,
          questions,
          error: [{ msg: "Senha inválida" }],
        });
      }
      await Question.findOneAndUpdate(question, { read: true });
      res.redirect(`/room/${roomCode}`);
    } catch (error) {
      const roomCode = req.params.roomCode;
      let questions = await Question.find({ roomCode });
      return res.render("room", {
        title: "Sala",
        page: "rooms",
        roomCode,
        questions,
        error: [{ msg: "Erro, tente novamente" }],
      });
    }
  },
  delete: async function (req, res) {
    try {
      const roomCode = req.params.roomCode;
      const errors = validationResult(req);
      let questions = await Question.find({ roomCode });
      let findRoom = await Room.findOne({ roomCode });
      const questionCode = req.params.questionCode;
      const password = req.body.password;
      if (password != findRoom.password) {
        return res.render("room", {
          title: "Sala",
          page: "rooms",
          roomCode,
          questions,
          error: [{ msg: "Senha inválida" }],
        });
      }
      await Question.deleteOne({ _id: questionCode });
      res.redirect(`/room/${roomCode}`);
    } catch (error) {
      const roomCode = req.params.roomCode;
      let questions = await Question.find({ roomCode });
      return res.render("room", {
        title: "Sala",
        page: "rooms",
        roomCode,
        questions,
        error: [{ msg: "Erro, tente novamente" }],
      });
    }
  },
};
