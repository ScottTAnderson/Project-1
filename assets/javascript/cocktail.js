$(document).ready(function(){

    var drinkName;
    var drinkIngredient;
    var drinkMeasurement;
    var drinkInstructions;
    var drinkImage;

    //Get cocktail
    function getCocktail() {
        var apiKey = '1';
        //var ingredient = $(.ingredient).val(); //use the input value for ingredient in HTML
        var queryURL = 'https://www.thecocktaildb.com/api/json/v1/' + apiKey + '/filter.php?i=' + ingredient;

        $.ajax({
            url: queryURL,
            method: 'GET',
        }).then(function(drink) {
            var randomDrink = Math.floor(Math.random()* drink.drinks.length + 1);
            console.log(drink.drinks[randomDrink].idDrink);
            console.log(drink);
            console.log(randomDrink);
            drinkID = drink.drinks[randomDrink].idDrink;
            queryURL = 'https://www.thecocktaildb.com/api/json/v1/' + apiKey + '/lookup.php?i=' + drinkID
            $.ajax({
                url: queryURL,
                method: 'GET',
            }).then(function(drinkDetails){
                console.log(drinkDetails.drinks[0]);
                //drink name
                drinkName = drinkDetails.drinks[0].strDrink;
                $('.drink-name').text(drinkName);

                //ingredint measurements -- need to iterate over 1-15, checking to see if a measurement exists
                drinkMeasurement = drinkDetails.drinks[0].strMeasure1;
                for (i=0; i<drinkMeasurement.length; i++) {
                    $('.drink-ingredients').append(drinkMeasurement[i]);
                }
                console.log(drinkDetails.drinks[0].strMeasure1)

                //ingredients -- need to iterate over 1-15, checking to see if an ingredient exists
                drinkIngredient = drinkDetails.drinks[0].strIngredient1;
                for (i=0; i<drinkIngredient.length; i++) {
                    $('.drink-ingredients').append(drinkIngredient[i]);
                }
                console.log(drinkDetails.drinks[0].strIngredient1)

                //directions for making
                drinkInstructions = drinkDetails.drinks[0].strInstructions
                $('.drink-text').text(drinkInstructions);

                //image url for drink
                drinkImage = drinkDetails.drinks[0].strDrinkThumb;
                $('.drink-image').attr('src', drinkImage); 
            });
        });
    };
    
    var ingredient = '';

    $('#ingredientForm').on('click', function(){
        ingredient = $('#ingredientForm option:selected').val().trim();
        console.log(ingredient);
    });

    $('#search').on('click', function() {
        if (ingredient === '') {
            $('.ingredient').css('color', 'red');
            $('.ingredient').append(' (Required) ');
        } else {
            getCocktail();
            $('.ingredient').css('color', 'black');
            $('.ingredient').text('Select a Protein');
        }
    });




});