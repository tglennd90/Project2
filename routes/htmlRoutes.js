var path = require("path");
module.exports = function (app) {
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/buy", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/buy.html"))
    });

    app.get("/sell", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/sell.html"))
    });

    app.get("/cart", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/cart.html"))
    });

    app.get("/endscreen", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/endScreen.html"))
    });
};