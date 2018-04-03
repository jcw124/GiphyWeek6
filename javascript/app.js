//define variables
//create buttons for default topics
//request to giphy api
//parse response to giphy api
//search box to add another topic and submit
///create a favorites section



$("button").on("click", function() {
    var name = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      name + "&api_key=dc6zaTOxFJmzC&limit=10&rating=PG&lang=en";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      
      console.log(response);

      var  results = (response.data) ;


       for (var i = 0; i < results.length; i++) {


      var nameDiv = $("<nameDiv>");

      var p = $("<p>").text("Rating: " + results[i].rating);

      var nameImage = $("<img>");

      nameImage.attr("src", results[i].images.fixed_height.url);
      // Set the image's src to results[i]'s fixed_height.url.
       nameDiv.append(p);
          nameDiv.append(nameImage);

          $("#images").prepend(nameImage);
    }

});
});