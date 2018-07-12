//https://api.giphy.com/v1/gifs/search?api_key=TK2Z9omttYlkdSparPo1CKO2v0Pf0B27&q=&limit=25&offset=0&rating=G&lang=en

function showGifs() {
  //console.log(movie)
  var movie = "Gladiator"




  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=TK2Z9omttYlkdSparPo1CKO2v0Pf0B27&limit=10&lang=en&q=" + movie

  var movies = ["Star Wars", "Avengers", "Terminator", "Harry Potter"];

  function alertMovieName() {
    $("#display").empty();
    movie = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=TK2Z9omttYlkdSparPo1CKO2v0Pf0B27&limit=10&lang=en&q=" + movie
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response)
      for (var i = 0; i < response.data.length; i++) {
        var gifUrl = response.data[i].images.original_still.url
        var movingGif = response.data[i].images.original.url
        var $img = $("<img>")
        $img.attr("src", gifUrl)
        $img.attr("data-still", gifUrl)
        $img.attr("data-animate", movingGif)
        $img.attr("data-state", "still")
        $img.addClass("image")
        var p = $("<p>").text("Rating: " + response.data[i].rating);
        $("#display").append(p)
        $("#display").append($img)
      }

      // <img src="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-still="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-animate="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" data-state="still" class="gif">


    })

    console.log(movie);
  }
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    for (var i = 0; i < response.data.length; i++) {
      var gifUrl = response.data[i].images.original.url
      //$("#display").append("<img src =" + gifUrl + ">")
    }

    function renderButtons() {
      $("#buttons-view").empty();
      for (var i = 0; i < movies.length; i++) {
        var btn = $("<button>");
        btn.addClass("movie");
        btn.attr("data-name", movies[i]);
        btn.text(movies[i]);
        $("#buttons-view").append(btn);
      }
    }

    $("#gif-btn").on("click", function (event) {
      event.preventDefault();
      var movie = $("#movie-input").val().trim();
      movies.push(movie);
      renderButtons();

    });

    $(document).on("click", ".movie", alertMovieName);

    renderButtons();
  })

}

showGifs()



function imageClick() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}
$(document).on("click", ".image", imageClick);
