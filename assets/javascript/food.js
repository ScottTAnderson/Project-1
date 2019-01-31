$(document).ready(function() {

    var queryParam = '';
    var foodName;
    var foodImage;
    var foodCalories;
    var foodIngredients = [];
    var foodPrepSite;

    function getRecipe() {
        var randomRecipe = Math.floor(Math.random() * 100 + 1);
        var appID = 'c7db65d2';
        var appKey = 'eabbd467ce4d304a551a72e85f1f0ef1';
        
        //var recipeID = $('.userProtein').val(); //use the input value for protein in HTML
        var queryURL = 'https://api.edamam.com/search?q=' +
            queryParam +
            '&from=0&to=100&app_id=' +
            appID +
            '&app_key=' +
            appKey;
    
    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function (answer) {
        console.log(queryURL);
        //a single random recipe json object
        console.log(answer.hits[randomRecipe].recipe);
        //Name of Dish
        foodName = answer.hits[randomRecipe].recipe.label;
        $('.recipe-text').text(foodName);
        //Image path
        foodImage = answer.hits[randomRecipe].recipe.image;
        console.log(foodImage);
        $('.food-image').attr('src', foodImage);
        //Calories. May not end up using
        foodCalories = answer.hits[randomRecipe].recipe.calories;
        $('.recipe-text').append('<br>Calories: ' + foodCalories.toFixed(2));
        //Ingredients. It is an array of strings
        foodIngredients = answer.hits[randomRecipe].recipe.ingredientLines;
        for (i = 0; i < foodIngredients.lenth; i++) {
            $('.recipe-text').append(foodIngredients[i]);
        }
        //Link to full recipe website with prep instructions
        foodPrepSite = answer.hits[randomRecipe].recipe.url;
        $('.recipe-link').attr('href', foodPrepSite);
        $('.recipe-link').text(foodPrepSite);
    })
    }

    var protein = '';
    var diet = '';
    var allergy = '';

    $('#proteinForm').on('click', function(){
        protein = $('#proteinForm option:selected').val().trim();
        console.log(protein);
    });

    $('#dietForm').on('click', function(){
        diet = '&diet=' + $('#dietForm option:selected').val().trim();
        console.log(diet);
    });

    $('#allergyForm').on('click', function(){
        allergy = '&health=' + $('#allergyForm option:selected').val().trim();
        console.log(allergy);
    });

    $('#search').on('click', function() {
        if (protein === '') {
            $('.protein').css('color', 'red');
            $('.protein').append(' (Required) ');
        } else {
            queryParam = protein += diet += allergy;
            getRecipe();
            $('.protein').css('color', 'black');
            $('.protein').text('Select a Protein');
        }
    });

});
