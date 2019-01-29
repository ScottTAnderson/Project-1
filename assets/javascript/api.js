var recipeURL = '';

function getRandomMovie() {
    var apiKey = '5eac88493bbb29ff93bb4bedf09e7f4e';
    var randomMovie = Math.floor(Math.random() * 20 + 1);
    var randomPage = Math.floor(Math.random() * 20 + 1);
    var genresArray = [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37];
    var genres = genresArray.join('|');
    console.log(genres);
    console.log(randomMovie);
    console.log(randomPage);
    //API Read Access Token = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWFjODg0OTNiYmIyOWZmOTNiYjRiZWRmMDllN2Y0ZSIsInN1YiI6IjVjNGU3ZDliMGUwYTI2NDk1YWQ3NzJmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q6gP_DxVZvU1_9xztOOuJ_5pATqDkg33cWwVgSCkyyQ
    var queryURL = 'https://api.themoviedb.org/3/discover/movie?api_key=' +
        apiKey +
        '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' +
        randomPage +
        '&primary_release_date.gte=' +
        1980 + //placeholder start date
        //$('.startYear').val() +  //use the input value for start year in HTML
        '&primary_release_date.lte=' +
        1990 + //placeholder end date
        //$('.endYear').val(); //use the input value for end year in HTML
        '&with_genres=' +
        genres; //The array needs to be updated based on genre boxes selected
        console.log(queryURL);

    $.ajax({
        // async: true,
        // crossDomain: true,
        url: queryURL,
        method: 'GET',
        // headers: {},
        // data: '{}'
    }).then(function (response) {
        //a single random movie json object
        console.log(response.results[randomMovie]);
        //Title
        console.log(response.results[randomMovie].title);
        //Plot
        console.log(response.results[randomMovie].overview);
        //Release Date in yyyy-mm-dd format
        console.log(response.results[randomMovie].release_date);
        //Poster path. w500 defines a width of 500px
        console.log('https://image.tmdb.org/t/p/w500' + response.results[randomMovie].poster_path);
    })
}

function getRecipe() {
    var randomRecipe = Math.floor(Math.random() * 100 + 1);
    var appID = 'c7db65d2';
    var appKey = 'eabbd467ce4d304a551a72e85f1f0ef1';
    var recipeID = 'chicken'; //placeholder protein
    //var recipeID = $('.userProtein').val(); //use the input value for protein in HTML
    var queryURL = 'https://api.edamam.com/search?q=' +
        recipeID +
        '&from=0&to=100&app_id=' +
        appID +
        '&app_key=' +
        appKey;

    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function (answer) {
        //a single random recipe json object
        console.log(answer.hits[randomRecipe].recipe);
        //Name of Dish
        console.log(answer.hits[randomRecipe].recipe.label);
        //Image path
        console.log(answer.hits[randomRecipe].recipe.image);
        //Calories. May not end up using
        console.log(answer.hits[randomRecipe].recipe.calories);
        //Ingredients. It is an array of strings
        console.log(answer.hits[randomRecipe].recipe.ingredientLines);
        //Link to full recipe website with prep instructions
        console.log(answer.hits[randomRecipe].recipe.url);

    })
}


$(document).ready(function () {
    getRandomMovie();
    getRecipe();

});
//Food2Fork API key = 01ec3a6106be7bd086339dcba3f5c9af max usage 50

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

// function getRecipeJson() {
//     var apiKey = '01ec3a6106be7bd086339dcba3f5c9af';
//     var recipeID = 'chicken';
//     var randomRecipe = Math.floor(Math.random() * 30 + 1);
//     var randomPage = Math.floor(Math.random() * 5 + 1);
//     //var recipeID = $('.protienChoice').val(); // to change querry to something based on user input
//     var queryURL = 'https://www.food2fork.com/api/search?key=' + apiKey + '&q=' + recipeID + '&page=' + randomPage;
//     $.ajax({
//         url: queryURL,
//         method: "GET",
//     }).then(function (response) {
//         var jsonResponse = JSON.parse(response)
//         recipeURL = jsonResponse.recipes[randomRecipe].source_url;
//         $('.recipe').attr("src", recipeURL);
//             console.log(jsonResponse);        
//             console.log(recipeURL);
//     });
// }