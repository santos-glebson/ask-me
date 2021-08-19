const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes/routes");
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));

// EJS Settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use("/", routes);

// Mongoose
mongoose.connect(
  "mongodb://localhost:27017/askme",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Mongo Connected");
    }
  },
);
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

app.listen(4000, () => {
  console.log("Servidor rodando na porta 4000");
});
