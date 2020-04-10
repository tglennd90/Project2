$.ajax({
    method: "POST",
    url: "/api/cars/make"
}).then(function (res) {
    var makeArr = [];
    for (let i = 0; i < res.cars.length; i++) {
        if (makeArr.indexOf(res.cars[i].make) === -1) {
            makeArr.push(res.cars[i].make);
        };
    };
    for (let j = 0; j < makeArr.length; j++) {
        //++++++++++++++++++++++++++++++++++++++++
        //populates the makes for the buy page
        $("#cars").append($("<option>", {
            value: makeArr[j],
            text: makeArr[j]
        }));
        //+++++++++++++++++++++++++++++++++++++++++
        //populates the makes for the sell page
        $("#carsSell").append($("<option>", {
            value: makeArr[j],
            text: makeArr[j]
        }));
    };
    //===========================================
    //the buy page logic
    $("#cars").on("change", function () {
        $("#models").empty();
        $("#models").append($("<option>", {
            value: "",
            text: "Choose a model"
        }));
        var selected = $(this).val();
        console.log(selected);
        var selectedObj = {
            car: selected
        };
        $.ajax({
            type: "GET",
            url: "/api/cars",
            data: selectedObj,
        }).then(function (res) {
            for (let j = 0; j < res.cars.length; j++) {
                $("#models").append($("<option>", {
                    value: res.cars[j].model,
                    text: res.cars[j].model
                }));
            }
            $("#buySubmit").on("click", function (e) {
                e.preventDefault();

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
        console.log(sellColor);
        
        if (sellMake === "") {
            return alert("select a make")
        }
        if (sellPrice >= 50000) {
            return alert("Too Much");
        }
        if (sellYear >= 2021 || sellYear <= 1929) {
            return alert("Inter a Valad year Please")
        }
        if (sellMiles > 300000) {
            return alert("too many miles")
        }
        if(sellColor === ""){
            return alert("Inter a Color please")
        }
        if(sellModel === ""){
            return alert("inter a model please")
        }

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
        }

        isUrlExists(imageLink, function (status) {
            if (status === 200) {
                var getPercent = parseInt(sellPrice) * 100 / 500
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
            }
        });


      
    }
    $("#sellSubmit").on("click", function (e) {
        e.preventDefault();
        sell();
    });
});