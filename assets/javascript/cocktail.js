$(document).ready(function () {
    var ingredient = '';
    var alcoholIndicator = '';

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
                var drinkName;
                $('.drink-ingredients').text('');
                $('.drink-measurements').text('');
                
                //Display list of ingredients
                for (var i = 1; i < 16; i++) {
                    var ingredientNumber = 'strIngredient' + i;
                    var isIngredient = drinkDetails.drinks[0][ingredientNumber];
                    var measureNumber = 'strMeasure' + i;
                    var isMeasurement = drinkDetails.drinks[0][measureNumber]
                    if (isIngredient.length > 2) {
                        $('.drink-ingredients').append(isMeasurement + ' ' +isIngredient + '<br>');
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
});