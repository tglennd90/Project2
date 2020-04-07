var db = require("../models");
module.exports = function(app){
    app.post("/api/cars", function (req, res) {
      console.log(req.body.car);
      db.Cars.findAll({
        where: {
          make: req.body.car
        }
      })
        .then(function(dbPost) {
          res.json(dbPost[0].dataValues);
          console.log(dbPost[0].dataValues);
          
        });
    });
};
