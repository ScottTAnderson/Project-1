$(document).ready(function() {

    var q = [];

    function getRecipe() {
        var randomRecipe = Math.floor(Math.random() * 100 + 1);
        var appID = 'c7db65d2';
        var appKey = 'eabbd467ce4d304a551a72e85f1f0ef1';
        
        //var recipeID = $('.userProtein').val(); //use the input value for protein in HTML
        var queryURL = 'https://api.edamam.com/search?q=' +
            q +
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

$('#proteinForm').on('click', function() {
    var protein = $('#proteinForm option:selected').val().trim();
    console.log(protein);
    q.push(protein);
    getRecipe();
});

$('#cookTimeForm').on('click', function() {
    var timeRange = $('#cookTimeForm option:selected').val().trim();
    console.log(timeRange);
});

$('#dietForm').on('click', function() {
    var diet = $('#dietForm option:selected').val().trim();
    console.log(diet);
});
  
$('#search').on('click', function() {
    alert('Searching!');
});



});

