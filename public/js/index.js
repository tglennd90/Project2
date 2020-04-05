$("#cars").on("change", function(){
    var selected = $(this).val();
    var selectedObj = {
        car: selected
    }
  $.ajax({
      type: "POST",
      url: "/api/cars",
      data: selectedObj,
  });
});