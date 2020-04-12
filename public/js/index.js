//reuqests the /api/cars/make endpoint
$.ajax({
    method: "POST",
    url: "/api/cars/make"
}).then(function (res) {
    //carResults is set to empty array
    var carResults = [];
    //makeArr is set to empty array
    var makeArr = [];
    //modelArr is set to empty array
    var modelArr = [];
    //runs a loop on res.cars
    for (let i = 0; i < res.cars.length; i++) {
        //pushes res.cars[i].make to makeArr only if the item being pushed is the only item of that name in the array
        if (makeArr.indexOf(res.cars[i].make) === -1) {
            makeArr.push(res.cars[i].make);
        };
    };
    //runs a loop on makeArr
    for (let j = 0; j < makeArr.length; j++) {
        //populates the select on the buy screen with the car makes
        $("#cars").append($("<option>", {
            //sets the value of the option to the same as the text
            value: makeArr[j],
            text: makeArr[j]
        }));
        //populates the select on the sell screen with the car makes
        $("#carsSell").append($("<option>", {
            //sets the value of the option to the same as the text
            value: makeArr[j],
            text: makeArr[j]
        }));
    };
    //when a car make is selected on the buy screen
    $("#cars").on("change", function () {
        //emptys the models select
        $("#models").empty()
        //emptys the card that displays the car image and specs
        $("#carItemList").empty();
        $(".carItemDisplay").empty();
        $("#price").empty();
        $(".carItemInfo").empty();
        //adds a placeholder option to the models select
        $("#models").append($("<option>", {
            value: "",
            text: "Choose a model"
        }));
        //selected is the value of the make that was selected
        var selected = $(this).val();
        //puts the selected option into selectedobj 
        var selectedObj = {
            car: selected
        };
        //requests the /api/cars
        $.ajax({
            type: "GET",
            url: "/api/cars",
            //puts the selectedObj into the data
            data: selectedObj,
        }).then(function (res) {
            //makes sure modelArr is empty by setting it to empty
            modelArr = [];
            //loops res.cars
            for (let j = 0; j < res.cars.length; j++) {
                //pushes res.cars[j].model to modelArr only if the item being pushed is the only item of that name in the array
                if (modelArr.indexOf(res.cars[j].model) === -1) {
                    modelArr.push(res.cars[j].model);
                };
            };
            //loops modelArr
            for (let x = 0; x < modelArr.length; x++) {
                //populates the models select
                $("#models").append($("<option>", {
                    //sets the value and the text to modelArr[x]
                    value: modelArr[x],
                    text: modelArr[x]
                }));
            };
        });
    });
    //on change of the models array
    $("#models").on("change", function () {
        //makes sure that there is no data on the screen
        $("#carItemList").empty();
        $(".carItemDisplay").empty();
        $("#price").empty();
        $(".carItemInfo").empty();
        //selectedModel is set to the value of the model option that was selected
        var selectedModel = $(this).val();
        //puts selectedModel into the selectedModelObj object
        var selectedModelObj = {
            model: selectedModel
        };
        //requests the /api/cars/model endpoint
        $.ajax({
            type: "GET",
            url: "/api/cars/model",
            //puts the selectedModelObj into the data
            data: selectedModelObj
        }).then(function (res) {
            //makes sure carResults is empty by setting it to empty
            carResults = [];
            //loops res
            for (let x = 0; x < res.length; x++) {
                //pust res[x] into the carResults array
                carResults.push(res[x])
            };
        });
    });
    //on click of the submit button on the buy page
    $("#buySubmit").on("click", function (e) {
        e.preventDefault();
        //counter is set to 0 
        var counter = 0;
        //loops the carResults array
        for (let k = 0; k < carResults.length; k++) {
            //displays all of the car data onto the page
            var carItemDisplay = $(".carItemInfo");
            var image = $("<img>");
            //sets the value of the add to cart button to the counter
            var addToCartBtn = $("<button class='addToCart'>").attr("value", counter);
            addToCartBtn.text("Add To Cart")
            image.attr("class", "carPhoto");
            $(image).attr("src", carResults[k].imageLink);
            $(".carItemDisplay").append(image);
            var ul = $("<ul>");
            //uses the counter in the id to keep the lists of specs in the right card if there are multiple cars of the same make and model
            ul.attr("id", "carItemList" + counter)
            carItemDisplay.append(ul);
            $("#carItemList" + counter).append("<li>" + carResults[k].make + " " + carResults[k].model + "</li>", "<li> miles: " + carResults[k].miles + "</li>", "<li> Year: " + carResults[k].carYear + "</li>", "<li> color: " + carResults[k].color + "</li>");
            var priceDisplay = $("<div>");
            //uses the counter in the id to keep the car cost in the right card if there are multiple cars of the same make and model
            priceDisplay.attr("id", "price" + counter)
            priceDisplay.append("<h3> Only: " + carResults[k].price + "<h3>")
            //displays the car price and add to cart button
            carItemDisplay.append(addToCartBtn);
            carItemDisplay.append(priceDisplay);
            //adds to the counter 
            counter++;
        };
        //the add to cart button
        $(".addToCart").on("click", function (event) {
            event.preventDefault();
            alert("Added Item To Cart")
            //addToCartSelect is set to the value of the button clicked
            var addToCartSelect = $(this).val();
            //requests the /api/cart endpoint
            $.ajax({
                method: "POST",
                url: "/api/cart",
                //carResults index of addToCartSelect is the data
                data: carResults[addToCartSelect]
            });
        });
    });
});
//the sell function
function sell() {
    //takes in all of the users input and stores it in variables
    var sellMake = $("#carsSell").val();
    var sellModel = $("#carModel").val();
    var sellColor = $("#carColor").val();
    var sellYear = $("#carYear").val();
    var sellMiles = $("#carMiles").val();
    var sellPrice = $("#carPrice").val();
    var imageLink = $("#imageLink").val();
    //validates the inputs
    if (sellMake === "") {
        return alert("Select a make")
    };
    //will not take an price of 50000 or more
    if (sellPrice >= 50000) {
        return alert("Too Much");
    };
    //the sell year must be between 2021 and 1929
    if (sellYear >= 2021 || sellYear <= 1929) {
        return alert("Enter a valid year please")
    };
    //the car must have less than 300,000 miles
    if (sellMiles > 300000) {
        return alert("Too many miles")
    };
    //makes sure there is some input for the model and color
    if (sellColor === "") {
        return alert("Enter a color please")
    };
    if (sellModel === "") {
        return alert("Enter a model please")
    };
    //function to check the image link is a real link
    function isUrlExists(url, cb) {
        jQuery.ajax({
            url: url,
            dataType: "text",
            type: "GET",
            complete: function (xhr) {
                if (typeof cb === "function")
                    cb.apply(this, [xhr.status]);
            }
        });
    };

    isUrlExists(imageLink, function (status) {
        //if the link returns a status of 200 
        if (status === 200) {
            //getPercent calculates 20 percent if the sell price
            var getPercent = parseInt(sellPrice) * 100 / 500;
            //sellOBj puts all of the user inputs into a object
            var sellObj = {
                make: sellMake,
                model: sellModel,
                color: sellColor,
                year: sellYear,
                miles: sellMiles,
                //adds 20 percent to the price
                price: parseInt(sellPrice) + parseInt(getPercent),
                link: imageLink
            };
            //requests the /api/sell endpoint
            $.ajax({
                method: "POST",
                url: "/api/sell",
                //sellObj is the data
                data: sellObj
            }).then(
                //reloads the page
                location.reload()
            )
            //if the status if the link is 404 alert 
        } else if (status === 404) {
            return alert("Invalid image link");
        };
    });
};
//the submit button on the sell page
$("#sellSubmit").on("click", function (e) {
    e.preventDefault();
    sell();
});
//requests the /api/cart/find endpoint
$.ajax({
    method: "GET",
    url: "/api/cart/find",
}).then(function (res) {
    var counter = 0;
    var totalPrice = 0;
    //res is put in the object cart
    var cart = {
        items: res
    }
    for (let n = 0; n < res.length; n++) {
        var cartItemDisplay = $(".cartItemDisplay");
        var image = $("<img>");
        image.attr("class", "carPhoto");
        $(image).attr("src", res[n].imageLink);
        cartItemDisplay.append(image);
        var ul = $("<ul>");
        ul.attr("id", "cartItemList" + counter)
        cartItemDisplay.append(ul);
        //fills the ul with items

        $("#cartItemList" + counter).append("<li>" + res[n].make + " " + res[n].model + "</li>", "<li> miles: " + res[n].miles + "</li>", "<li> Year: " + res[n].carYear + "</li>", "<li> color: " + res[n].color + "</li>" + "<button value=" + res[n].id + " class='removeFromCart'> Remove Item");
        counter++;
        //combines the cart total price
        totalPrice += parseInt(res[n].price);
    };
    //displays the total price
    $(".cartItem").append("<p>Total Price: $" + totalPrice);
    //remove item from cart button
    $(".removeFromCart").on("click", function (e) {
        e.preventDefault();
        //itemToRemove is set to the value of the item you would like to remove
        var itemToRemove = $(this).val();
        //itemToRemoveObj contains the itemToRemove
        itemToRemoveObj = {
            item: itemToRemove
        }
        //requests the /api/cart/remove endpoint
        $.ajax({
            method: "GET",
            url: "/api/cart/remove",
            //itemToRemove as the data
            data: itemToRemoveObj
        });
        //reloads the page
        location.reload();
    });
    //process payment button
    $("#processPayment").on("click", function (e) {
        e.preventDefault();
        //if there is nothing in the cart display on the page telling the user the cart is empty
        if (res.length === 0) {
            return $(".cartItemDisplay").text("There are no items in the cart");
        };
        //requests the /api/cart/buy endpoint
        $.ajax({
            method: "GET",
            url: "/api/cart/buy",
            //the data is the cart object from above
            data: cart
        });
        //sends you to the endscreen
        location.reload();
        location.replace("/endscreen")
    });
});