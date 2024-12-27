var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var gameStart = false;

$(document).keypress(function(){
    if(!gameStart){
        levelUp();
        gameStart = true;
    }
})

function playSound(name){
    var sound = new Audio(name+'.mp3');
    sound.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                levelUp();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function levelUp(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);

    $("#"+randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChoosenColour);
}

$(".btn").click(function(){
    var userChoosenColour = $(this).attr("id");
    userClickedPattern.push(userChoosenColour);

    playSound(userChoosenColour);
    animatePress(userChoosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function startOver(){
    level = 0;
    gameStart = false;
    gamePattern = [];
}

