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
        var counter = 1;
        for (let k = 0; k < carResults.length; k++) {
            var carItemDisplay = $(".carItemDisplay");
            var image = $("<img>");
            image.attr("class", "carPhoto");
            $(image).attr("src", carResults[k].imageLink);
            carItemDisplay.append(image);
            var ul = $("<ul>");
            ul.attr("id", "carItemList" + counter)
            carItemDisplay.append(ul);
            $("#carItemList" + counter).append("<li>" + carResults[k].make + " " + carResults[k].model + "</li>", "<li> miles: " + carResults[k].miles + "</li>", "<li> Year: " + carResults[k].carYear + "</li>", "<li> color: " + carResults[k].color + "</li>");
            var priceDisplay = $("<div>");
            priceDisplay.attr("id", "price" + counter) 
            priceDisplay.append("<h3> Only: " + carResults[k].price + "<h3>")
            carItemDisplay.append(priceDisplay);
            counter++;
        };
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
        return alert("select a make")
    };
    if (sellPrice >= 50000) {
        return alert("Too Much");
    };
    if (sellYear >= 2021 || sellYear <= 1929) {
        return alert("Inter a Valad year Please")
    };
    if (sellMiles > 300000) {
        return alert("too many miles")
    };
    if (sellColor === "") {
        return alert("Inter a Color please")
    };
    if (sellModel === "") {
        return alert("inter a model please")
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
            $.ajax({
                method: "POST",
                url: "/api/sell",
                data: sellObj
            });
        } else if (status === 404) {
            return alert("invalad image link");
        };
    });
};
$("#sellSubmit").on("click", function (e) {
    e.preventDefault();
    sell();
    $("#carsSell").empty();
    $("#carModel").empty();
    $("#carColor").empty();
    $("#carYear").empty();
    $("#carMiles").empty();
    $("#carPrice").empty();
    $("#imageLink").empty();
});