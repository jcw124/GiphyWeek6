$(document).ready(function () {});

//define variables
var topics=["Beyonce","Jay-Z","Outkast","India Arie","Prince","Kendrick Lamar"];
var topic;
var p;

//create buttons for default topics
function createButtons() {
  $("#topics-view").empty();
  for (var i =0; i < topics.length; i++) {
    var button = $("<button>");
    button.addClass("topic");
    button.attr("data-name", topics[i]);
    button.text(topics[i]);
    $("#topics-view").append(button);
  }
}


//search box to add another topic and submit
$("#add-topic").on("click", function (event){
  event.preventDefault();
  var topic = $("#topic-input").val().trim();
  topics.push(topic);
  createButtons();
});

createButtons();


//request to giphy api
$("button").on("click", function() {
  var name = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=dc6zaTOxFJmzC&limit=10&rating=PG&lang=en";
console.log(queryURL);
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    
    console.log(response);

    var  results = (response.data) ;


     for (var i = 0; i < results.length; i++) {


    var nameDiv = $("<nameDiv>");

    var p = $("<p>").text("Rating: " + results[i].rating);
    console.log(p);
    console.log(results[i].images.fixed_height_still.url);
    console.log(results[i].images.fixed_height_still.url);
    console.log(results[i].images.fixed_height.url);

    var nameImage = $("<img>");

    nameImage.attr("src", results[i].images.fixed_height_still.url);
    nameImage.attr("data-still", results[i].images.fixed_height_still.url);
    nameImage.attr("data-animate", results[i].images.fixed_height.url); 
    nameImage.attr("data-state", "still"); 
    nameImage.addClass("gif"); 
        
        nameDiv.append(nameImage);
        nameDiv.append(p);

        $("#images").prepend(nameImage, p);
  }
});
});

$(".gif").on("click", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

