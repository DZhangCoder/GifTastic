// array of strings related to a topic 
var topics = ["puppy", "cat", "rabbit", "goldfish", "lion", "hummingbird", "elephant", "giant panda", "dolphin"];

// funtion: loop through the topics array and create buttons in HTML 
var createBtn = function () {
    for (i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.attr("class", "topic");
        button.attr("animal-name", topics[i])
        button.text(topics[i]);
        $("#animalButton").append(button);
    }
}
createBtn(); 


// function: when user clicks on a button, go to GIPHY API and grab 10 static gif images 
var getGif = function () {
    $("#gifDump").empty();
    var animal = $(this).attr("animal-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=C4vArDxqlTxNCuMZ8QbD5QtC7u4TVnSc&q=" + animal + "&limit=10&lang=en";
    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function (response) {
        console.log(response);
        var dataSource = response.data;
        //loop through the dataSource array and find the fixed height image
        for (j = 0; j < dataSource.length; j++) {
            //create an image tag
            var gifImage = $("<img>");

            // still URL and animate URL
            var stillURL = dataSource[j].images.fixed_height_still.url;
            var animateURL = dataSource[j].images.fixed_height.url;

            // set the attributes of the images 
            gifImage.attr("src", stillURL)
            gifImage.attr("data-still", stillURL);
            gifImage.attr("data-animate", animateURL);
            gifImage.attr("data-status", "still")
            gifImage.attr("class", "gifs");

            // append ratinf and images into HTML
            var rating = dataSource[j].rating;
            $("#gifDump").append("<div>Rating: " + rating + "</div>");
            $("#gifDump").append(gifImage)
        }
        // on click event
        //if...else statement: pause and start animation when clicking
        $(".gifs").on("click", function () {
            var state = $(this).attr("data-status");
            if (state === "still") {
                $(this).attr("data-status", "animate")
                $(this).attr("src", $(this).attr("data-animate"));
            }
            else {
                $(this).attr("data-status", "still");
                $(this).attr("src", $(this).attr("data-still"));
            }
        })
    })
}

// function: the form takes in user input and push it in the button array
$("#submitBtn").on("click", function () {
    //prevent the btn from submitting the form
    event.preventDefault();
    // create a variable that takes in user input 
    var userInput = $("#userInput").val();
    console.log(userInput);
    topics.push(userInput);
    console.log(topics);
    $("#animalButton").empty(); 
    createBtn(); 
})

// on click event: when user clicks on a button, execute the function 
$(document.body).on("click", ".topic", getGif);


