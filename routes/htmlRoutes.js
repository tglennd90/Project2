var path = require("path");
module.exports = function (app) {
    //the / endpoint routes to the the home page
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    //the /buy endpoint routes to the buy page
    app.get("/buy", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/buy.html"))
    });
    //the /sell endpoint routes to the sell page
    app.get("/sell", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/sell.html"))
    });
    //the /cart endpoint routes to the cart page
    app.get("/cart", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/cart.html"))
    });
    //the /endscreen endpoint routes to the endScreen page
    app.get("/endscreen", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/endScreen.html"))
    });
};