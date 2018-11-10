
var countries = ["America", "Korea", "Japan", "VietNam", "Itali", "Mexico", "Bahamas", "Denmark", "Hungary", "india"];
function renderButtons() {

  $("#country-list").empty();

  for (var i = 0; i < countries.length; i++) {

    var a = $("<button>");
   
    a.addClass("country");
  
    a.attr("data-name", countries[i]);
  
    a.text(countries[i]);

    $("#country-list").append(a);
  }
}
$("#add-country").on("click", function(event) {

  event.preventDefault();

  var country = $("#country-input").val().trim();
  
  countries.push(country);

  renderButtons();
});

renderButtons();


$(document).on("click", ".country", function() {

  $("#gifs-appear-here").empty();
 
  var country = $(this).attr("data-name");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    country + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      console.log(queryURL);

      console.log(response);

      var results = response.data;

      for (var j = 0; j < results.length; j++) {

        var countryDiv = $("<div>");
        countryDiv.addClass("countryDiv");
    
        var p = $("<p>").text("Rating: " + results[j].rating);

        var countryImage = $("<img>");
        countryImage.addClass("gif");
        countryImage.attr("data-still", results[j].images.fixed_height_still.url);
        countryImage.attr("data-animate", results[j].images.fixed_height.url);
        countryImage.attr("data-state", "still");

        countryImage.attr("src", results[j].images.fixed_height_still.url);

        countryDiv.append(p);
        countryDiv.append(countryImage);

        $("#gifs-appear-here").prepend(countryDiv);
      }
    });
});

$(document).on("click",".gif", function() {

  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});