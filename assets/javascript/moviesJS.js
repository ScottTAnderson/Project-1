var genresArray = [];

var genresObjectArray = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
];

var decadesArray = [
    {
        "id": "2010s",
        "start": 2010,
        "end": 2019
    },
    {
        "id": "2000s",
        "start": 2000,
        "end": 2009
    },
    {
        "id": "1990s",
        "start": 1990,
        "end": 1999
    },
    {
        "id": "1980s",
        "start": 1980,
        "end": 1989
    },
    {
        "id": "1970s",
        "start": 1970,
        "end": 1979
    },
    {
        "id": "1960s",
        "start": 1960,
        "end": 1969
    },
    {
        "id": "1950s",
        "start": 1950,
        "end": 1959
    },
    
];

//Need 3 functions: 1
//1 to create a list of genres for the dropdown on page load
//2 to 

//Have the document listen for a click to a button of class "genre"

// $(document).on("click", "#dropdownMenu2", GenreDropdown());
// $(document).ready( function GenreDropdown() {
//     for (i = 0; i < genres.length; i++) {

//         var newGenre = $("<button>");
//         newGenre.attr("value", genres[i].id).html(genres[i].name).attr("class", "dropdown-item");
//         $("#dropdownGenre").append(newGenre);
//         console.log(genres[i].id);
//         console.log(genres[i].name);
//     };

// });
$(document).ready(function () {

    //Necessary JS for the checkboxes to work
    $(function () {
        $('.list-group.checked-list-box .list-group-item').each(function () {

            // Settings

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
                $checkbox.prop('checked', !$checkbox.is(':checked'));
                $checkbox.triggerHandler('change');
                
                genresArray.push($widget.attr('value'));
                console.log(genresArray);
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

        $('#get-checked-data').on('click', function (event) {
            event.preventDefault();
            var checkedItems = {}, counter = 0;
            $("#check-list-box li.active").each(function (idx, li) {
                checkedItems[counter] = $(li).text();
                console.log(checkedItems[counter]);
                counter++;
            });
            $('#display-json').html(JSON.stringify(checkedItems, null, '\t'));
        });
    });


//This section should 


    $("#SubmitButton").on("click", function () {
        debugger;
        getRandomMovie();

    });

    function getRandomMovie() {
        debugger;

        //Get a random movie - comment this out.
        // var apiKey = '5eac88493bbb29ff93bb4bedf09e7f4e';
        // var findMovie = Math.floor(Math.random() * 20 + 1);
        // var findPage = Math.floor(Math.random() * 20 + 1);
        // var genresArray = [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37];
        // var findGenres = genresArray.join('|');


        //Get a movie based on your selections on the page
        var apiKey = '5eac88493bbb29ff93bb4bedf09e7f4e';
        //This findMovie variable needs to go if you want to be querying using genres and years
        var findMovie = Math.floor(Math.random() * 20 + 1);
        var findPage = Math.floor(Math.random() * 20 + 1);
        var startDate = 1980;
        var endDate = 1990;
        var genresArray = [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37];
        var findGenres = genresArray.join('|');

        //Now to actually use the criteria checked in order to call a movie with the right genre and decade
        //Comment this section out to use the other variable names
        console.log(findGenres);
        console.log(findMovie);
        console.log(findPage);

        //API Read Access Token = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWFjODg0OTNiYmIyOWZmOTNiYjRiZWRmMDllN2Y0ZSIsInN1YiI6IjVjNGU3ZDliMGUwYTI2NDk1YWQ3NzJmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q6gP_DxVZvU1_9xztOOuJ_5pATqDkg33cWwVgSCkyyQ
        var queryURL = 'https://api.themoviedb.org/3/discover/movie?api_key=' +
            apiKey +
            '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' +
            findPage +
            '&primary_release_date.gte=' +
            startDate + //placeholder start date
            //$('.startYear').val() +  //use the input value for start year in HTML
            '&primary_release_date.lte=' +
            endDate + //placeholder end date
            //$('.endYear').val(); //use the input value for end year in HTML
            '&with_genres=' +
            findGenres; //The array needs to be updated based on genre boxes selected
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
            console.log(response.results[findMovie]);


            // Also go ahead and change the HTML elements accordingly
            //a single random movie json object
            var YourMovie = response.results[findMovie];

            $("#MovieTitle").empty();
            $("#MovieTitle").html("Title: " + YourMovie.title)

            console.log(response.results[findMovie].overview);
            $("#MoviePlot").empty()
            $("#MoviePlot").text("Plot: " + YourMovie.overview)

            console.log(response.results[findMovie].rating);
            $("#MovieRating").empty();
            $("#MovieRating").text("Rating: " + YourMovie.rating)

            //Release Date in yyyy-mm-dd format
            console.log(response.results[findMovie].release_date);
            $("#MovieYear").empty();
            $("#MovieYear").text("Release Date: " + YourMovie.release_date)

            $("#MoviePoster").empty();
            $("#MoviePoster").attr("src", 'https://image.tmdb.org/t/p/w300' + response.results[randomMovie].poster_path)
        })
    }

})