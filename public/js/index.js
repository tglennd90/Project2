$("#cars").on("change", function () {
    var selected = $(this).val();
    console.log(selected);

    var selectedObj = {
        car: selected
    }
    $.ajax({
        type: "POST",
        url: "/api/cars",
        data: selectedObj,
    }).then(function () {
        $.ajax({
            method: "POST",
            url: "/api/cars/make"
        }).then(function (res) {
            for (let i = 0; i < res.length; i++) {
                $("#models").append($("<option>", {
                    value: res[i].model,
                    text: res[i].model
                }));
            }


            // $.ajax({
            //     url: "/api/cars/make",
            //     type: "DELETE",
            //     contentType: 'application/json',
            //     success: function (result) {
            //         console.log(result);

            //     }
            // });
        });
    });

});