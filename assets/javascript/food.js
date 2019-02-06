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
};
var database = firebase.database();

//global variables
var foodName;
var foodImage;
var foodCalories;
var foodIngredients = [];
var foodPrepSite;
var queryURL;
var protein = '';
var diet = '';
var allergy = '';

//get single recipe object based on user preferences
function getRecipe() {
    var randomRecipe = Math.floor(Math.random() * 20 + 1);
    var appID = 'c7db65d2';
    var appKey = 'eabbd467ce4d304a551a72e85f1f0ef1';

    //var recipeID = $('.userProtein').val(); //use the input value for protein in HTML
    queryURL = 'https://api.edamam.com/search?q=' +
        protein +
        '&app_id=' +
        appID +
        '&app_key=' +
        appKey +
        '&from=0&to=100' +
        diet +
        allergy;

    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function (answer) {
        //Name of Dish
        foodName = answer.hits[randomRecipe].recipe.label;
        $('.recipe-name').text(foodName);
        //Image path
        foodImage = answer.hits[randomRecipe].recipe.image;
        $('.food-image').attr('src', foodImage);
        //Calories. May not end up using
        foodCalories = answer.hits[randomRecipe].recipe.calories;
        $('.recipe-calories').html('Calories: ');
        $('.recipe-calorie-count').html(foodCalories.toFixed(0) + '<br><br>');
        $('.recipe-ingredients').html('Ingredients:<br>');
        //Ingredients. It is an array of strings
        foodIngredients = answer.hits[randomRecipe].recipe.ingredientLines;
        console.log(foodIngredients);
        $('.last-moment').css('overflow', 'auto');
        $('.caard-body').css('overflow', 'auto');
        for (i = 0; i < foodIngredients.length; i++) {
            $('.recipe-text').append(foodIngredients[i] + '<br>');
        };
        //Link to full recipe website with prep instructions
        foodPrepSite = answer.hits[randomRecipe].recipe.url;
        $('.recipe-link').attr('href', foodPrepSite);
        $('.recipe-link').attr('target', 'blank');
        $('.recipe-link').text(foodPrepSite);
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
        var moviePoster = snapshot.val().moviePoster;

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
    });
};

//click handlers
$('#proteinForm').on('click', function () {
    protein = $('#proteinForm option:selected').val().trim();
});

$('#dietForm').on('click', function () {
    diet = '&diet=' + $('#dietForm option:selected').val().trim();
});

$('#allergyForm').on('click', function () {
    allergy = '&health=' + $('#allergyForm option:selected').val().trim();
});

//ensures at least protien selection is clicked
$('#search').on('click', function () {
    if (protein === '') {
        $('.protein').css('color', 'yellow');
        $('.protein').append(' (Required) ');
    } else {
        getRecipe();
        $('.protein').css('color', 'white');
        $('.protein').text('Select a Protein');
    }
});

$('.shopping-btn').on('click', function (event) {
    event.preventDefault();
    var newFood = {
        foodName: foodName,
        foodPrepSite: foodPrepSite,
        foodImage: foodImage,
    };
    database.ref().push(newFood);
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

updateList();
