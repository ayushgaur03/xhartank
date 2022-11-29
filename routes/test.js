var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
/* GET home page. */
router.get("/", function (req, res, next) {
  //   res.render("index", { title: "Express" });
  const Cat = mongoose.model("Cat", { name: String });

  const kitty = new Cat({ name: "Max" });
  kitty
    .save()
    .then(() => {
      return res.send("meow");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
