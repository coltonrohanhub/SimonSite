var game_RNG = [];
var button_color = ["red", "blue", "green", "yellow"];
var user_clicked = [];

var started = false;

//start / stop button function
$(".button").click(function () {
    if (!started) {
        $(".button").text("Stop");
        nextSequence();
        started = true;
    } else if (started) {
        alert("game over");
        start_over()
    }
});

//pushing the user clicks into a base array
$(".btn").click(function () {
    var user_input = $(this).attr("id");
    user_clicked.push(user_input);

    playSound(user_input);
    animateClick(user_input);
    checkAnswers(user_clicked.length - 1);
})
//this function checks the answers aginst the RNG of the game to make sure the user is correct
function checkAnswers(current_level) {
    if (game_RNG[current_level] === user_clicked[current_level]) {
        console.log("pass");

        if (user_clicked.length === game_RNG.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    } else {
        //console.log("fail");
        alert("game over");
        start_over();
    }

}

// this is my main function which checks to make sure the game has not passes 8 wins then 
function nextSequence() {
    var index = 0;
    if (game_RNG.length === 8) {
        game_RNG = [];
        alert("You have won");
        $(".button").text("Start");
        started = false;
        return;
    }

    if(game_RNG.length < 8){
        var interval = setInterval(function () {
            playSound(game_RNG[index]);
            $("#" + game_RNG[index++]).fadeOut(100).fadeIn(100);
            
            if (index == game_RNG.length) {
                clearInterval(interval);
            }
        }, 500)
    }
    
    //console.log(game_RNG.length);
    user_clicked = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = button_color[randomNumber];
    game_RNG.push(randomChosenColor);
    //console.log(game_RNG);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animateClick(currentColor) {
    $("#" + currentColor).addClass("clicked");

    setTimeout(function () {
        $("#" + currentColor).removeClass("clicked");
    }, 200);
}

// this function starts the game over when a user presses stop or fails
function start_over() {
    game_RNG = [];
    started = false;
    $(".button").text("Start");
}