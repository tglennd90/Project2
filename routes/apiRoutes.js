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
      //puts the array into an object
      var obj = {
        cars: carsMakeArr
      };
      res.json(obj)
    });
  });
  //gets the /api/cars endpoint
  app.get("/api/cars", function (req, res) {
    //searches the database table Cars for all rows where make equals req.query.car
    db.Cars.findAll({
      where: {
        make: req.query.car
      }
    }).then(function (dbPost) {
      var dbCars = dbPost;
      //carsArr is set to empty
      var carsArr = [];
      //loops dbPost 
      for (let i = 0; i < dbCars.length; i++) {
        //pushes the dataValues to carsArr
        carsArr.push(dbCars[i].dataValues);
      };
      //puts carsArr into an object
      var carObj = {
        cars: carsArr
      };
      res.json(carObj);
    });
  });
  //gets the /api/cars/model endpoint
  app.get("/api/cars/model", function (req, res) {
    //searches the database table Cars for all rows where model equals req.query.model
    db.Cars.findAll({
      where: {
        model: req.query.model
      }
    }).then(function (dbGetModel) {
      res.json(dbGetModel)
    });
  });
  //posts to /api/sell endpoint
  app.post("/api/sell", function (req, res) {
    //creates a new row in the database table Cars with all of the data from the request
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
  //posts to the /api/cart endpoint
  app.post("/api/cart", function(req, res) {
    //creates a new row in the database table Cart with all of the data from the request
    db.Cart.create({
      make: req.body.make,
      model: req.body.model,
      color: req.body.color,
      carYear: req.body.carYear,
      miles: req.body.miles,
      price: req.body.price,
      imageLink: req.body.imageLink,
      carTableId: req.body.id,
      createdAt: 1200,
      updatedAt: 1200
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });
  //gets the /api/cart/find endpoint
  app.get("/api/cart/find", function (req, res) {
    //finds all rows in the Cart table
    db.Cart.findAll().then(function (dbGet) {
      res.json(dbGet);
    });
  });
  //gets the /api/cart/remove endpoint
  app.get("/api/cart/remove", function(req, res){
//deletes all form the Cart table where id = req.query.item
db.Cart.destroy({
  where: {
    id: req.query.item
  }
});
  });
  //gets the /api/cart/buy
  app.get("/api/cart/buy", function(req, res){
    //shortens the req.query.items in the items
var items = req.query.items
//loops items
for (let j = 0; j < items.length; j++) {
//delets all from Cart table where id = items[j]
  db.Cart.destroy({
    where: {
      id: items[j].id
    }
  });
  //delets all from the Cars table where id = items[j].carTableId
  db.Cars.destroy({
    where: {
      id: items[j].carTableId
    }
  });
  
};
  });
};