var db = require("../models");
module.exports = function(app){
    app.post("/api/cars", function (req, res) {
      console.log(req.body.car);
      db.Cars.findOne({
        where: {
          make: req.body.car
        }
      })
        .then(function(dbPost) {
          res.json(dbPost);
          console.log(dbPost);
          
        });
    });
};
