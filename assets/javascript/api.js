//OMDB ajax call

// function getRandomMovie() {
//     var apikey = 'a2122f3e';
//     var IDprefixArray = ['tt', 'nm', 'co', 'ev', 'ch', 'ni'];
//     var IDprefix = IDprefixArray[Math.floor(Math.random()*IDprefixArray.length)];
//     var IDpostfix = Math.floor(Math.random() * 9000000) + 1000000;

//     var movieTitle = IDprefix + IDpostfix;
//     // var OMDBqueryURL = "https://www.omdbapi.com/i?" + movieTitle + "&y=&plot=short&apikey=trilogy"
//     OMDBqueryURL = "https://www.omdbapi.com/?apikey=a2122f3e&i=" + JSON.toString(movieTitle);
//     console.log(IDprefix);
//     console.log(IDpostfix);
//     console.log(movieTitle);
//         $.ajax({
//             url: OMDBqueryURL,
//             method: "GET"
//         }).then(function (response) {
//             console.log(response);
//         });
// }

var recipeURL = '';

function getRandomMovie() {
    var apiKey = '5eac88493bbb29ff93bb4bedf09e7f4e';
    var randomMovie = Math.floor(Math.random() * 20 + 1);
    var randomPage = Math.floor(Math.random() * 20 + 1);
    console.log(randomMovie);
    console.log(randomPage);
    //API Read Access Token = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWFjODg0OTNiYmIyOWZmOTNiYjRiZWRmMDllN2Y0ZSIsInN1YiI6IjVjNGU3ZDliMGUwYTI2NDk1YWQ3NzJmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q6gP_DxVZvU1_9xztOOuJ_5pATqDkg33cWwVgSCkyyQ
    var queryURL = 'https://api.themoviedb.org/3/discover/movie?api_key=' +
        apiKey +
        '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' +
        randomPage +
        '&primary_release_date.gte=' +
        1980 +
        //$('.startYear').val() +  //use the input value for start year in HTML
        '&primary_release_date.lte=' +
        1990;
    //$('.endYear').val(); //use the input value for end year in HTML
    console.log(queryURL);

    $.ajax({
        // async: true,
        // crossDomain: true,
        url: queryURL,
        method: 'GET',
        // headers: {},
        // data: '{}'
    }).then(function (response) {
        console.log(response.results[randomMovie]);
    })
}

function getRecipeJson() {
    var apiKey = '01ec3a6106be7bd086339dcba3f5c9af';
    var recipeID = 'chicken';
    var randomRecipe = Math.floor(Math.random() * 30 + 1);
    var randomPage = Math.floor(Math.random() * 5 + 1);
    //var recipeID = $('.protienChoice').val(); // to change querry to something based on user input
    var queryURL = 'https://www.food2fork.com/api/search?key=' + apiKey + '&q=' + recipeID + '&page=' + randomPage;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        var jsonResponse = JSON.parse(response)
        recipeURL = jsonResponse.recipes[randomRecipe].source_url;
        $('.recipe').attr("src", recipeURL);
            console.log(jsonResponse);        
            console.log(recipeURL);
    });
}


        

$(document).ready(function() {
getRandomMovie();
getRecipeJson();

});
//Food2Fork API key = 01ec3a6106be7bd086339dcba3f5c9af max usage 50