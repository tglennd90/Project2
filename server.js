var express = require("express");
require("dotenv").config();

var PORT = process.env.PORT || 8000;
var app = express();
var db = require("./models")



app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static("public"));
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("App Listening: http://localhost:" + PORT);
    });
});
