module.exports = app => {
    const users = require("../controllers/user.controller");
  
    var router = require("express").Router();
  
    // signup
    router.post("/signup", users.signup);

    // sign in
    router.post("/signin", users.signin);
  
    app.use('/users', router);
  };
  