var express = require("express");
require("dotenv").config();

var PORT = process.env.PORT || 8000;
var app = express();
var db = require("./models")

app.use(express.static("public"));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

db.sequelize.sync({
    force: true
}).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});