$(document).ready(function() {

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

    $('#proteinForm').on('click', function(){
        protein = $('#proteinForm option:selected').val().trim();
        console.log(protein);
    });

    $('#dietForm').on('click', function(){
        diet = '&diet=' + $('#dietForm option:selected').val().trim();
        console.log(diet);
    });

    $('#allergyForm').on('click', function(){
        var allergyConcat = '&health=' + $('#allergyForm option:selected').val().trim();
        allergy += allergyConcat;
        console.log(allergy);
    });

    $('#search').on('click', function() {
        if (protein === '') {
            $('.protein').css('color', 'yellow');
            $('.protein').append(' (Required) ');
        } else {
            getRecipe();
            $('.protein').css('color', 'white');
            $('.protein').text('Select a Protein');
        }
    });

});
