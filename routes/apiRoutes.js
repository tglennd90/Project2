//requires the models folder
var db = require("../models");
//exports all of the code in the function
module.exports = function (app) {
  //posts to the /api/cars/make endpoint
  app.post("/api/cars/make", function (req, res) {
    //sequelize query to select all of the rows in the table cars
    db.Cars.findAll().then(function (dbGet) {
      //carMakeArr is set to empty array
      var carsMakeArr = [];
      //loops the dbGet parameter (mysql select response)
      for (let i = 0; i < dbGet.length; i++) {
        //pushes the desired vales to the carsMakeArr
        carsMakeArr.push(dbGet[i].dataValues);
      };
      //puts the array into an
      var obj = {
        cars: carsMakeArr
      };
      res.json(obj)
    });
  });
  app.get("/api/cars", function (req, res) {
    db.Cars.findAll({
      where: {
        make: req.query.car
      }
    }).then(function (dbPost) {
      var dbCars = dbPost;
      var carsArr = [];
      for (let i = 0; i < dbCars.length; i++) {
        carsArr.push(dbCars[i].dataValues);
      };
      var obj = {
        cars: carsArr
      };
      res.json(obj);
    });
  });
  app.get("/api/cars/model", function (req, res) {
    console.log(req.query.model);
    db.Cars.findAll({
      where: {
        model: req.query.model
      }
    }).then(function (dbGetModel) {
      res.json(dbGetModel)
    });
  });
  app.post("/api/sell", function (req, res) {
    db.Cars.create({
      make: req.body.make,
      model: req.body.model,
      color: req.body.color,
      carYear: req.body.year,
      miles: req.body.miles,
      price: req.body.price,
      imageLink: req.body.link,
      createdAt: 1200,
      updatedAt: 1200
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });
  app.post("/api/cart", function(req, res) {
    console.log(req.body)
    console.log(req.body.carYear)
    db.Cart.create({
      make: req.body.make,
      model: req.body.model,
      color: req.body.color,
      carYear: req.body.carYear,
      miles: req.body.miles,
      price: req.body.price,
      imageLink: req.body.imageLink,
      createdAt: 1200,
      updatedAt: 1200
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });
};