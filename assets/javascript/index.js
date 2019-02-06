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
//animated header using Granim
var granimInstance = new Granim({
    element: '#canvas-basic',
    direction: 'radial',
    isPausedWhenNotInView: true,
    states: {
        "default-state": {
            gradients: [
                ['#ff9966', '#ff5e62'],
                ['#00F260', '#0575E6'],
                ['#e1eec3', '#f05053'],
            ],
            transitionSpeed: 1000
        }
    }
});
//adds a faux login (resets the db) when clicking LOGIN
$('.navbar-brand').on('click', function () {
    $('.modal').fadeIn();
});

$('.close').on('click', function () {
    $('.modal').fadeOut();
});

$('.submit-button').on('click', function () {
    database.ref().remove();
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    };
    $('.modal').fadeOut();
    window.document.location.href = "index.html";
});
