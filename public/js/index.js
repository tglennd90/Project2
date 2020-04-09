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
        $("#cars").append($("<option>", {
            value: makeArr[j],
            text: makeArr[j]
        }));
    };
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
});