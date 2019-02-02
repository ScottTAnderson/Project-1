var GenresArray = ["Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "Film Noir", "History", "Horror", "Music", "Musical", "Mystery", "Romance", "Sci-Fi", "Short", "Sport", "Superhero", "Thriller", "War", "Western"];

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
$(document).ready(function() {

//Necessary JS for the checkboxes to work
$(function () {
    $('.list-group.checked-list-box .list-group-item').each(function () {
        
        // Settings
        var $widget = $(this),
            $checkbox = $('<input type="checkbox" class="hidden" />'),
            color = ($widget.data('color') ? $widget.data('color') : "primary"),
            style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };
            
        $widget.css('cursor', 'pointer')
        $widget.prepend("-");
        $widget.prepend($checkbox);
        

        // Event Handlers
        $widget.on('click', function () {
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
    
    $('#get-checked-data').on('click', function(event) {
        event.preventDefault(); 
        var checkedItems = {}, counter = 0;
        $("#check-list-box li.active").each(function(idx, li) {
            checkedItems[counter] = $(li).text();
            console.log(checkedItems[counter]);
            counter++;
        });
        $('#display-json').html(JSON.stringify(checkedItems, null, '\t'));
    });
});


$("#SubmitButton").on("click", function() {
    debugger;
getRandomMovie();

});

function getRandomMovie() {
    debugger;
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
      

        // Also go ahead and change the HTML elements accordingly
        //a single random movie json object
        var YourMovie = response.results[randomMovie];
        
        $("#MovieTitle").empty();
        $("#MovieTitle").html("Title: " + YourMovie.title)
        
        console.log(response.results[randomMovie].overview);
        $("#MoviePlot").empty()
        $("#MoviePlot").text("Plot: " + YourMovie.overview)

        console.log(response.results[randomMovie].Runtime);
        $("#MovieRuntime").empty();
        $("#MovieRuntime").text("Runtime: " + YourMovie.Runtime)
      
        //Release Date in yyyy-mm-dd format
        console.log(response.results[randomMovie].release_date);
        $("#MovieYear").empty();
        $("#MovieYear").text("Release Date: " + YourMovie.release_date)
        
        $("#MoviePoster").empty();
        $("#MoviePoster").attr("src", 'https://image.tmdb.org/t/p/w300' + response.results[randomMovie].poster_path)
    })
}

})