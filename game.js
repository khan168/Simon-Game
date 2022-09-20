var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var start = false;
function checkAns(currindex) {
if (userClickedPattern[currindex] === gamePattern[currindex]) {
    $("body").addClass("correct");
    setTimeout(function () {
    $("body").removeClass("correct");
    }, 100);

    if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function () {
        nextSequence();
    }, 1000);
    }
} else {
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function () {
    $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
}
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence() {
  //green bg?
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randnom = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randnom];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(name) {
    $("#" + name).addClass("pressed");
    setTimeout(function () {
    $("#" + name).removeClass("pressed");
    }, 100);
}

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    start = false;
    }

$(document).keydown(function (event) {
    if (!start) {
    setTimeout(function () {
        nextSequence();
    }, 700);
    start = true;
    }
});

$(".btn").click(function (event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAns(userClickedPattern.length - 1);
});
