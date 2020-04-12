$.ajax({
    method: "POST",
    url: "/api/cars/make"
}).then(function (res) {
    var carResults = [];
    var makeArr = [];
    var modelArr = [];
    for (let i = 0; i < res.cars.length; i++) {
        if (makeArr.indexOf(res.cars[i].make) === -1) {
            makeArr.push(res.cars[i].make);
        };
    };
    for (let j = 0; j < makeArr.length; j++) {
        $("#cars").append($("<option>", {
            value: makeArr[j],
            text: makeArr[j]
        }));
        $("#carsSell").append($("<option>", {
            value: makeArr[j],
            text: makeArr[j]
        }));
    };
    $("#cars").on("change", function () {


        $("#models").empty()
        $("#carItemList").empty();
        $(".carItemDisplay").empty();
        $("#price").empty();
        $(".carItemInfo").empty();
        $("#models").append($("<option>", {
            value: "",
            text: "Choose a model"
        }));
        var selected = $(this).val();
        var selectedObj = {
            car: selected
        };
        $.ajax({
            type: "GET",
            url: "/api/cars",
            data: selectedObj,
        }).then(function (res) {
            modelArr = [];
            for (let j = 0; j < res.cars.length; j++) {
                if (modelArr.indexOf(res.cars[j].model) === -1) {
                    modelArr.push(res.cars[j].model);
                };

            };
            console.log(modelArr);
            for (let x = 0; x < modelArr.length; x++) {
                $("#models").append($("<option>", {
                    value: modelArr[x],
                    text: modelArr[x]
                }));

            }
        });
    });
    $("#models").on("change", function () {
        $("#carItemList").empty();
        $(".carItemDisplay").empty();
        $("#price").empty();
        $(".carItemInfo").empty();
        var selectedModel = $(this).val();
        var selectedModelObj = {
            model: selectedModel
        };
        $.ajax({
            type: "GET",
            url: "/api/cars/model",
            data: selectedModelObj
        }).then(function (res) {
            carResults = [];
            for (let x = 0; x < res.length; x++) {
                carResults.push(res[x])

            };
        });
    });
    //------------------------------------------
    $("#buySubmit").on("click", function (e) {
        e.preventDefault();

        var counter = 0;
        for (let k = 0; k < carResults.length; k++) {
            var carItemDisplay = $(".carItemInfo");
            var image = $("<img>");
            var addToCartBtn = $("<button class='addToCart'>").attr("value", counter);
            addToCartBtn.text("Add To Cart")
            image.attr("class", "carPhoto");
            $(image).attr("src", carResults[k].imageLink);
            $(".carItemDisplay").append(image);
            var ul = $("<ul>");
            ul.attr("id", "carItemList" + counter)
            carItemDisplay.append(ul);
            $("#carItemList" + counter).append("<li>" + carResults[k].make + " " + carResults[k].model + "</li>", "<li> miles: " + carResults[k].miles + "</li>", "<li> Year: " + carResults[k].carYear + "</li>", "<li> color: " + carResults[k].color + "</li>");
            var priceDisplay = $("<div>");
            priceDisplay.attr("id", "price" + counter)
            priceDisplay.append("<h3> Only: " + carResults[k].price + "<h3>")
            carItemDisplay.append(priceDisplay);
            carItemDisplay.append(addToCartBtn);
            counter++;
        };

        $(".addToCart").on("click", function (event) {
            event.preventDefault();
            alert("Added Item To Cart")
            var addToCartSelect = $(this).val();
            console.log(carResults[addToCartSelect]);

            $.ajax({
                method: "POST",
                url: "/api/cart",
                data: carResults[addToCartSelect]
            }).then(function (res) {
                console.log(res)
            })
        });
    });
});
//================================================
//the sell page logic
function sell() {
    var sellMake = $("#carsSell").val();
    var sellModel = $("#carModel").val();
    var sellColor = $("#carColor").val();
    var sellYear = $("#carYear").val();
    var sellMiles = $("#carMiles").val();
    var sellPrice = $("#carPrice").val();
    var imageLink = $("#imageLink").val();
    if (sellMake === "") {
        return alert("Select a make")
    };
    if (sellPrice >= 50000) {
        return alert("Too Much");
    };
    if (sellYear >= 2021 || sellYear <= 1929) {
        return alert("Enter a valid year please")
    };
    if (sellMiles > 300000) {
        return alert("Too many miles")
    };
    if (sellColor === "") {
        return alert("Enter a color please")
    };
    if (sellModel === "") {
        return alert("Enter a model please")
    };

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
        if (status === 200) {
            var getPercent = parseInt(sellPrice) * 100 / 500;
            var sellObj = {
                make: sellMake,
                model: sellModel,
                color: sellColor,
                year: sellYear,
                miles: sellMiles,
                price: parseInt(sellPrice) + parseInt(getPercent),
                link: imageLink
            };
            console.log(sellObj)
            $.ajax({
                method: "POST",
                url: "/api/sell",
                data: sellObj
            }).then(location.reload())
        } else if (status === 404) {
            return alert("Invalid image link");
        };
    });
};
$("#sellSubmit").on("click", function (e) {
    e.preventDefault();
    sell();
});

$.ajax({
    method: "GET",
    url: "api/cart/find",
}).then(function (res) {
    var counter = 0;
    var totalPrice = 0;
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
        $("#cartItemList" + counter).append("<li>" + res[n].make + " " + res[n].model + "</li>", "<li> miles: " + res[n].miles + "</li>", "<li> Year: " + res[n].carYear + "</li>", "<li> color: " + res[n].color + "</li>" + "<button value=" + res[n].id + " class='removeFromCart'> Remove Item");
        counter++;
        totalPrice += parseInt(res[n].price);
    };
    $(".cartItem").append("<p>Total Price: $" + totalPrice);
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //remove item from cart button
    $(".removeFromCart").on("click", function(e){
        e.preventDefault();
        var itemToRemove = $(this).val();
        itemToRemoveObj = {
            item: itemToRemove
        }
        $.ajax({
            method: "GET",
            url: "/api/cart/remove",
            data: itemToRemoveObj
        });
        location.reload();
    });
    //=============================================================
    //process payment button
    $("#processPayment").on("click", function(e){
        e.preventDefault(); 
        
         
        if(res.length === 0){
          return  $(".cartItemDisplay").text("There are no items in the cart");
        }  
        $.ajax({
            method: "GET",
            url: "/api/cart/buy",
            data: cart
        });
        location.reload();
        location.replace("/endscreen")
    });
});
