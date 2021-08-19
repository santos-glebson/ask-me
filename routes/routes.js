const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");
const questionController = require("../controllers/questionController");
const { check } = require("express-validator");

// Rooms
router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
    page: "login",
    error: false,
  });
});

router.get("/create-room", (req, res) => {
  res.render("create-room", {
    title: "Criar sala",
    page: "login",
    error: false,
  });
});

router.get("/room/:roomCode", roomController.show);

router.post(
  "/create-room",
  [
    check("password", "A senha deve ter de 4 a 8 caracteres").isLength({
      min: 4,
      max: 8,
    }),
  ],
  roomController.create,
);

router.post(
  "/login",
  [
    check("roomCode", "O código deve ter de 4 a 8 caracteres").isLength({
      min: 4,
      max: 8,
    }),
  ],
  roomController.login,
);

router.get("/room/:roomCode/:status", roomController.filter);

// Questions
router.post("/create-question", questionController.create);
module.exports = router;

router.post("/checkQuestion/:roomCode/:questionCode", questionController.check);
router.post(
  "/deleteQuestion/:roomCode/:questionCode",
  questionController.delete,
);
