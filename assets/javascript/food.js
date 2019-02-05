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

var foodName;
var foodImage;
var foodCalories;
var foodIngredients = [];
var foodPrepSite;
var queryURL;
var protein = '';
var diet = '';
var allergy = '';

function getRecipe() {
    var randomRecipe = Math.floor(Math.random() * 100 + 1);
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
        console.log(queryURL);
        //a single random recipe json object
        console.log(answer.hits[randomRecipe].recipe);
        //Name of Dish
        foodName = answer.hits[randomRecipe].recipe.label;
        $('.recipe-name').text(foodName);
        //Image path
        foodImage = answer.hits[randomRecipe].recipe.image;
        console.log(foodImage);
        $('.food-image').attr('src', foodImage);
        //Calories. May not end up using
        foodCalories = answer.hits[randomRecipe].recipe.calories;
        $('.recipe-calories').html('Calories: ');
        $('.recipe-calorie-count').html(foodCalories.toFixed(0) + '<br><br>');
        $('.recipe-ingredients').html('Ingredients:<br>');
        //Ingredients. It is an array of strings
        foodIngredients = answer.hits[randomRecipe].recipe.ingredientLines;
        console.log(foodIngredients);
        for (i = 0; i < foodIngredients.length; i++) {
            $('.recipe-text').append(foodIngredients[i] + '<br>');
        };
        //Link to full recipe website with prep instructions
        foodPrepSite = answer.hits[randomRecipe].recipe.url;
        $('.recipe-link').attr('href', foodPrepSite);
        $('.recipe-link').attr('target', 'blank');
        $('.recipe-link').text(foodPrepSite);
    })
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
        var drinkName = snapshot.val().drinkName;
        var drinkID = snapshot.val().drinkID;
        var movieName = snapshot.val().movieName;
        var moviePoster = snapshot.val().moviePoster
        $('#selection-recipe-link').attr('href', foodPrepSite);
        $('#selection-recipe-link').attr('target', 'blank');
        $('#selection-recipe-link').text(foodName);
        $('#selection-drink-link').attr('href', "https://www.thecocktaildb.com/drink.php?c=" + drinkID);
        $('#selection-drink-link').attr('target', 'blank');
        $('#selection-drink-link').text(drinkName);
        $('#selection-movie-link').attr('href', foodPrepSite);
        $('#selection-movie-link').attr('target', 'blank');
        $('#selection-movie-link').text(movieName);
    })
};

$('#proteinForm').on('click', function () {
    protein = $('#proteinForm option:selected').val().trim();
    console.log(protein);
});

$('#dietForm').on('click', function () {
    diet = '&diet=' + $('#dietForm option:selected').val().trim();
    console.log(diet);
});

$('#allergyForm').on('click', function () {
    var allergyConcat = '&health=' + $('#allergyForm option:selected').val().trim();
    allergy += allergyConcat;
    console.log(allergy);
});

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
    };

    database.ref().push(newFood);

    updateList();

});

updateList();
