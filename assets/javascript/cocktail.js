//firebase config
var config = {
    apiKey: "AIzaSyCzjnnF9wUUBv0wys562PrCCIt3_1QHxnk",
    authDomain: "date-night-project1.firebaseapp.com",
    databaseURL: "https://date-night-project1.firebaseio.com",
    projectId: "date-night-project1",
    storageBucket: "date-night-project1.appspot.com",
    messagingSenderId: "902893916791"
};
firebase.initializeApp(config);
var database = firebase.database();


var ingredient = '';
var alcoholIndicator = '';
var drinkName = '';

//Get cocktail
function getCocktail() {
    var apiKey = '1';
    var queryURL = 'https://www.thecocktaildb.com/api/json/v1/' + apiKey + '/filter.php?' + alcoholIndicator + ingredient;

    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function (drink) {
        var randomDrink = Math.floor(Math.random() * drink.drinks.length + 1);
        drinkID = drink.drinks[randomDrink].idDrink;
        queryURL = 'https://www.thecocktaildb.com/api/json/v1/' + apiKey + '/lookup.php?i=' + drinkID
        $.ajax({
            url: queryURL,
            method: 'GET',
        }).then(function (drinkDetails) {
            var drinkInstructions;
            var drinkImage;
            drinkName;
            $('.drink-ingredients').text('');
            $('.drink-measurements').text('');

            //Display list of ingredients
            for (var i = 1; i < 16; i++) {
                var ingredientNumber = 'strIngredient' + i;
                var isIngredient = drinkDetails.drinks[0][ingredientNumber];
                var measureNumber = 'strMeasure' + i;
                var isMeasurement = drinkDetails.drinks[0][measureNumber]
                if (isIngredient.length > 2) {
                    $('.drink-ingredients').append(isMeasurement + ' ' + isIngredient + '<br>');
                };
            };

            //Display drink name
            drinkName = drinkDetails.drinks[0].strDrink;
            $('.drink-name').text(drinkName);

            //directions for making
            drinkInstructions = drinkDetails.drinks[0].strInstructions
            $('.drink-text').text(drinkInstructions);

            //image url for drink
            drinkImage = drinkDetails.drinks[0].strDrinkThumb;
            $('.drink-image').attr('src', drinkImage);
        });
    });
};

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
        $('#selection-recipe-name').text(foodName);
        $('#selection-recipe-link').attr('href', foodPrepSite);
        $('#selection-recipe-link').attr('target', 'blank');
        $('#selection-recipe-link').text(foodPrepSite);
        $('#selection-drink-name').text(drinkName);
        $('#selection-drink-link').attr('href', foodPrepSite);
        $('#selection-drink-link').attr('target', 'blank');
        $('#selection-drink-link').text(foodPrepSite);
        $('#selection-movie-name').text(movieName);
        $('#selection-movie-link').attr('href', foodPrepSite);
        $('#selection-movie-link').attr('target', 'blank');
        $('#selection-movie-link').text(foodPrepSite);
    })
};

$('#ingredientForm').on('click', function () {
    ingredient = $('#ingredientForm option:selected').val().trim();
    console.log(ingredient);
});

$('#search').on('click', function () {
    if (ingredient === '') {
        $('.ingredient').css('color', 'yellow');
        $('.ingredient').text('Ingredient Choices (required)');
    } else {
        if (ingredient == 'Non_Alcoholic') {
            alcoholIndicator = 'a=';
        } else {
            alcoholIndicator = 'i=';
        }
        getCocktail();
        $('.ingredient').css('color', 'white');
        $('.ingredient').text('Ingredient Choices');
    }
});

$('.shopping-btn').on('click', function () {
    event.preventDefault();

    var newDrink = {
        drinkName: drinkName,
    };

    database.ref().push(newDrink);

    updateList();
});

updateList();