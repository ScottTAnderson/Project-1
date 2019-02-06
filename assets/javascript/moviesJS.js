//firebase config
var config = {
    apiKey: "AIzaSyCzjnnF9wUUBv0wys562PrCCIt3_1QHxnk",
    authDomain: "date-night-project1.firebaseapp.com",
    databaseURL: "https://date-night-project1.firebaseio.com",
    projectId: "date-night-project1",
    storageBucket: "date-night-project1.appspot.com",
    messagingSenderId: "902893916791"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
var database = firebase.database();

var genresArray = [];
var decadesArray = [];
var YourMovie = '';
var moviePoster = '';

//Necessary JS for the checkboxes to work
$(function () {
    $('.genres .list-group-item').each(function () {
        //This sets up the whole checkbox selection
        var $widget = $(this)
        //Here a variable is created for the DOM checkbox object
        var $checkbox = $('<input type="checkbox" class="hidden" />');
        //Set a color for the whole checkbox selection
        var color = ($widget.data('color') ? $widget.data('color') : "primary");
        var style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-");
        var settings = {
            on: {
                icon: 'glyphicon glyphicon-check'
            },
            off: {
                icon: 'glyphicon glyphicon-unchecked'
            }
        };
        $widget.css('cursor', 'pointer')
        $widget.prepend(" ");
        $widget.prepend($checkbox);

        // Event Handlers
        $widget.on('click', function () {

            //this should check if the clicked box is checked, and subsequently removed the array item by its index
            if ($checkbox.is(':checked')) {
                genresArray = genresArray.filter(function (value, index, arr) {
                    return value !== $widget.attr('value')
                });
            } else {
                genresArray.push($widget.attr('value'));
            }
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');
            // Set the button's state
            $widget.data('state', (isChecked) ? "on" : "off");
            // Set the button's icon
            $widget.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$widget.data('state')].icon);
            // Update the button's color
            if (isChecked) {
                $widget.addClass(style + color + ' active');
            } else {
                $widget.removeClass(style + color + ' active');
            }
        }

        // Initialization
        function init() {
            if ($widget.data('checked') == true) {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
            }
            updateDisplay();

            // Inject the icon if applicable
            if ($widget.find('.state-icon').length == 0) {
                $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
            }
        }
        init();
    });

    //Isolating the logic for the decades array
    $('.decades .list-group-item').each(function () {
        //This sets up the whole checkbox selection
        var $widget = $(this)
        //Here a variable is created for the DOM checkbox object
        var $checkbox = $('<input type="checkbox" class="hidden" />');
        //Set a color for the whole checkbox selection
        var color = ($widget.data('color') ? $widget.data('color') : "primary");
        var style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-");
        var settings = {
            on: {
                icon: 'glyphicon glyphicon-check'
            },
            off: {
                icon: 'glyphicon glyphicon-unchecked'
            }
        };
        $widget.css('cursor', 'pointer')
        $widget.prepend(" ");
        $widget.prepend($checkbox);

        // Event Handlers
        $widget.on('click', function () {

            if ($checkbox.is(':checked')) {
                decadesArray = decadesArray.filter(function (value, index, arr) {
                    return value !== $widget.attr('value')
                });
            } else {
                decadesArray.push($widget.attr('value'));
            }
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');
            // Set the button's state
            $widget.data('state', (isChecked) ? "on" : "off");
            // Set the button's icon
            $widget.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$widget.data('state')].icon);
            // Update the button's color
            if (isChecked) {
                $widget.addClass(style + color + ' active');
            } else {
                $widget.removeClass(style + color + ' active');
            }
        }

        // Initialization
        function init() {
            if ($widget.data('checked') == true) {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
            }
            updateDisplay();
            // Inject the icon if applicable
            if ($widget.find('.state-icon').length == 0) {
                $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
            }
        }
        init();
    });
});

//get single movie object from API
function getRandomMovie() {
    //Get a movie based on your selections on the page
    var apiKey = '5eac88493bbb29ff93bb4bedf09e7f4e';
    //This findMovie variable needs to go if you want to be querying using genres and years
    var findMovie = Math.floor(Math.random() * 20 + 1);
    var findPage = Math.floor(Math.random() * 20 + 1);
    var decadesArraySort = decadesArray.sort();
    if (decadesArray) {
        var startDate = decadesArraySort[0] + '-1-1';
        var endDate = (parseInt(decadesArraySort[0]) + 9) + '-12-31';
    } else {
        var startDate = decadesArraySort[0] + '-1-1';
        var endDate = (parseInt(decadesArraySort[decadesArray.length - 1]) + 9) + '-12-31';
    }
    var findGenres = genresArray.join('|');
    if (decadesArray.length != 0) {
        var addDates = '&primary_release_date.gte=' +
            startDate +
            '&primary_release_date.lte=' +
            endDate + ''
    } else addDates = '';
    console.log(addDates);
    if (findGenres.length != 0) {
        var addGenres = '&with_genres=' +
            findGenres + ''
    } else addGenres = '';
    //API Read Access Token = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWFjODg0OTNiYmIyOWZmOTNiYjRiZWRmMDllN2Y0ZSIsInN1YiI6IjVjNGU3ZDliMGUwYTI2NDk1YWQ3NzJmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q6gP_DxVZvU1_9xztOOuJ_5pATqDkg33cWwVgSCkyyQ
    var queryURL = 'https://api.themoviedb.org/3/discover/movie?api_key=' +
        apiKey +
        '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&certification=1&certification_country=US&page=' +
        findPage +
        addDates +
        addGenres +
        '&with_original_language=en'; //The array needs to be updated based on genre boxes selected
    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function (response) {
        //a single random movie json object
        YourMovie = response.results[findMovie];
        moviePoster = response.results[findMovie].poster_path;

        $("#MovieTitle").empty();
        $("#MovieTitle").html("Title: " + YourMovie.title);

        $("#MoviePlot").empty();
        $("#MoviePlot").text("Plot: " + YourMovie.overview);

        $("#MovieRating").empty();
        $("#MovieRating").text("Rating: " + YourMovie.rating);

        //Release Date in yyyy-mm-dd format
        $("#MovieYear").empty();
        $("#MovieYear").text("Release Date: " + YourMovie.release_date);

        $("#MoviePoster").empty();
        $("#MoviePoster").attr("src", 'https://image.tmdb.org/t/p/w300' + moviePoster).css('overflow','fit');
    });
};

//dynamically update the user's selection card with info from db
function updateList() {
    $('#selection-recipe-name').empty();
    $('#selection-recipe-link').empty();
    $('#selection-drink-name').empty();
    $('#selection-drink-link').empty();
    $('#selection-movie-name').empty();
    $('#selection-movie-link').empty();
    database.ref().on('child_added', function (snapshot) {
        var foodName = snapshot.val().foodName;
        var foodPrepSite = snapshot.val().foodPrepSite;
        var foodImage = snapshot.val().foodImage;
        var drinkName = snapshot.val().drinkName;
        var drinkID = snapshot.val().drinkID;
        var drinkImage = snapshot.val().drinkImage;
        var movieName = snapshot.val().movieName;
        var moviePoster = snapshot.val().moviePoster

        $('#selection-recipe-link').attr('href', foodPrepSite);
        $('#selection-recipe-link').attr('target', 'blank');
        $('#selection-recipe-link').text(foodName).css('color', 'white');
        $('#selection-recipe-image').attr('src', foodImage).css('margin', '20px 0px 15px 0px');

        $('#selection-drink-link').attr('href', "https://www.thecocktaildb.com/drink.php?c=" + drinkID);
        $('#selection-drink-link').attr('target', 'blank');
        $('#selection-drink-link').text(drinkName).css('color', 'white');
        $('#selection-drink-image').attr('src', drinkImage).css('margin', '20px 0px 15px 0px');

        $('#selection-movie-link').attr('href', "https://www.justwatch.com/us/search?q=" + movieName);
        $('#selection-movie-link').attr('target', 'blank');
        $('#selection-movie-link').text(movieName).css('color', 'white');;
        if (moviePoster != undefined) {
            $('#selection-movie-image').attr('src', "https://image.tmdb.org/t/p/w300" + moviePoster).css('margin', '20px 0px 15px 0px');
        };
    })
};

//event handlers
$('.shopping-btn').on('click', function () {
    event.preventDefault();
    console.log(YourMovie.backdrop_path);
    var newMovie = {
        movieName: YourMovie.original_title,
        moviePoster: moviePoster,
    }
    database.ref().push(newMovie);
    updateList();
});

$('.navbar-brand').on('click', function () {
    $('.modal').fadeIn();
});

$('.close').on('click', function () {
    $('.modal').fadeOut();
});

$('.submit-button').on('click', function (event) {
    event.preventDefault();
    database.ref().remove();
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    $('.modal').fadeOut();
    window.location.href = "index.html";
});

$("#SubmitButton").on("click", function () {
    getRandomMovie();
});

updateList();