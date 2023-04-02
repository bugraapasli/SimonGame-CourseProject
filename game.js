
let userClickedPattern = [];  // empty array for tracking the User's click.
let gamePattern = [];   // empty array for tracking the game pattern.
const buttonColours = ["red","blue","yellow","green"];  // Games' colors.

let startingValue = false;    // starting value
let level = 0;   // first level value.




$(document).keydown(function () {            // get value from keyboard to start the game.
    if(!startingValue){
        nextSequence();                       // when user press a button first time, the game will start.
        startingValue = true;                 // because of that if statement works one time.
    }
});


$(".btn").click(function () {                           // takes the clicks.
    let userChosenColour = $(this).attr("id");          // taking id of the colors.
    userClickedPattern.push(userChosenColour);   // pushing the colors to the user's empty click pattern.
    animatePress(userChosenColour);
    checkingAnswer((userClickedPattern.length)-1);       // sending the lengths-1 (because we need index num) to the checking function.
});




function nextSequence(){           // this func shows the next lvl color.

userClickedPattern = [];          // cleaning the user's click array because user needs to remember the pattern.
level++; 
$("#level-title").text("Level " + level);
let randomNumber = Math.floor(Math.random()*4);      
let randomChosenColour = buttonColours[randomNumber];        // taking the random color from there.
gamePattern.push(randomChosenColour);    // pushing all the pattern to our gamePattern.
$("#"+ randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);     //playing sounds.
}








function playSound(name){              // playing sounds with this funct.
    const audio = new Audio(name + '.mp3');
    audio.play();
}





function animatePress(currentColor){             // giving animation for clicking the buttons.
    $("#" + currentColor).addClass("pressed");
   setTimeout(function() {                       // adding the class and removing it after 80 ms for animation.
    $("#" + currentColor).removeClass("pressed");
   },80)
}





function checkingAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){      // if their current index are the same color user remember the color correctly.
        

        if (gamePattern.length === userClickedPattern.length) {   // if their lengths are correct after checking every index, user remember the all the colors correctly.
            setTimeout(nextSequence(), 1000);  // then we can continue to next level.
        }


    }
   else{           // else, user remember wrong and game over section starts.

    const gameOver = new Audio("wrong.mp3");      // plays game over sound.

    gameOver.play();

    $("body").addClass("game-over");  
                                             // adding animation for the game over section.
    setTimeout(function() { 
        $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    StartingOver();  // restarting the values with this func.
   }
   
}


function StartingOver(){          // restart the values to restart the game again.
    level = 0;
    gamePattern = [];
    startingValue = false;
}

