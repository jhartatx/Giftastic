var topics = ["alcohol", "politics", "cats", "dogs"];

for (var i =0; i< topics.length; i++) {

	var newButton = $("<button class='newButtonSearch'>").text(topics[i]);

	$("#new-gifs").append(newButton);
}

$("#add-gif").on("click", function() {

 	var searchText = $("#gif-input").val();
 	if(searchText!==""){
	    var newButton = $("<button class='newButtonSearch'>" + searchText + "</button>");

		$("#new-gifs").append(newButton);

		topics.push(searchText);
	} 
  });


$(document).on("click",".newButtonSearch",function(){
	var searchText = $(this).text();


	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        searchText + "&api_key=dc6zaTOxFJmzC&limit=10";

$.ajax({
          url: queryURL,
          method: "GET"
        })

  .done(function(response) {

  	var results = response.data;
  	$("#gif-display").empty();

  	for (var i = 0; i < results.length; i++) {
  		var gifDiv = $('<div class ="gifSection">');

  		var p = $("<p>").text("Rating: " + results[i].rating);

  		var newImage = $("<img>");
  		newImage.attr("class", "gif");
  		newImage.attr("src", results[i].images.fixed_height_still.url);
  		newImage.attr("data-state", 'still');
  		newImage.attr("data-animate", results[i].images.fixed_height.url);
  		newImage.attr("data-still", results[i].images.fixed_height_still.url);


  		// $("#gif-display").prepend(p);
  		// $("#gif-display").prepend(newImage);

  		gifDiv.prepend(p);
  		gifDiv.prepend(newImage);

  		$("#gif-display").prepend(gifDiv);

  		};		
	});
  $(document).on("click", ".gif", function() {

  	var state = $(this).attr("data-state");

  	 if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
   		 }	
     });
});



