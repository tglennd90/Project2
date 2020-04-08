var db = require("../models");
module.exports = function (app) {
  app.post("/api/cars", function (req, res) {
    console.log(req.body.car);
    db.Cars.findAll({
        where: {
          make: req.body.car
        }
      })
      .then(function (dbPost) {
        var dbCars = dbPost
        var carsArr = [];
        for (let i = 0; i < dbCars.length; i++) {
          carsArr.push(dbCars[i].dataValues);
        }

        var obj = {
          cars: carsArr
        }
      
     res.json(obj)
       
        app.post("/api/cars/make", function (req, res) {
     res.json(obj.cars)
        });
     
        


      });
  });

};