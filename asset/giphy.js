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
            gifImage.attr("src", stillURL);
            gifImage.attr("data-still", stillURL);
            gifImage.attr("data-animate", animateURL);
            gifImage.attr("data-status", "still")
            gifImage.attr("class", "gifs");

            // append ratinf and images into HTML
            var rating = dataSource[j].rating;

            // create a heart icon for the favorites section
            var heart = $("<div>");
            heart.append("<i class='far fa-heart'></i>");

            // Bonus: create a title and an import time for the gif 
            var title = dataSource[j].title;
            var importTime = dataSource[j].import_datetime;

            //create a div to contain all the variables created above 
            var container = $("<div>");
            container.attr("class", "cell")
            container.append(heart);
            container.append("<div>Rating: " + rating + "</div>");
            container.append("<div>Title: " + title + "</div>");
            container.append("<div>Import Date&Time: " + importTime + "</div>");
            container.append(gifImage);

            //append the div container to HTML
            $("#gifDump").append(container);
        }
        heartClick();
        changeState();
    })
}

// on click event
//if...else statement: pause and start animation when clicking
var changeState = function () {
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

// function: when user clicks on the heart, the gif will go to the favorites section 
var heartClick = function () {
    $(".fa-heart").on("click", function () {
        var copy = $(this).parent().parent().clone();
        $("#favoriteGif").append(copy);
        console.log($(this));
        changeState();
    })
}



