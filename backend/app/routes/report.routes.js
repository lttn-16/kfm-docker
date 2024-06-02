const { verifyAccessToken } = require("../helpers/jwt_helpers");
const reports = require("../controllers/report.controller");

module.exports = app => {
  
    var router = require("express").Router();
  
    // create record
    router.post('/', verifyAccessToken, reports.beLate);

    // bang phong than
    router.get("/", reports.getByMonth);
  
    app.use('/reports', router);
  };
  