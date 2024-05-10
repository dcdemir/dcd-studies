var buttoncolours = ["red","blue","green","yellow"];
var gamepattern = [];
var userclickedpattern = [];
var started = false;
var level = 0;



$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
    

$(".btn").click(function() {
    var userChosencolor = $(this).attr("id");
    userclickedpattern.push(userChosencolor);
    playSound(userChosencolor);
    animatePress(userChosencolor);
    checkAnswer(userclickedpattern.length-1);
})

function checkAnswer (currentLevel) {
    if (gamepattern[currentLevel] === userclickedpattern[currentLevel]) {
       if (userclickedpattern.length === gamepattern.length) {
        setTimeout(function () {
            nextSequence();
          }, 1000);
    }
   
    }
    else {
        console.log("Wrong!");
        $("#level-title").text("Game Over, Press any key to Restart!");
        var wrongfx = new Audio("sounds/wrong.mp3");
        wrongfx.play();
        $(document.body).addClass("game-over");
        setTimeout(function () {
            $(document.body).removeClass("game-over");
          }, 200);
      startOver();  
    }
}


function nextSequence() {
    userclickedpattern = [];
    level++;
    $("#level-title").text("LeveL:" +" " + level);
    var randomnumber = Math.floor(Math.random() * 4);
    var randomchosencolor = buttoncolours[randomnumber];
    gamepattern.push(randomchosencolor);
    $("#"+randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomchosencolor);
}

function playSound(name) {
    var soundfx = new Audio("sounds/" + name + ".mp3");
    soundfx.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

function startOver() {
    level = 0;
    gamepattern = [];
    started=false;
}

