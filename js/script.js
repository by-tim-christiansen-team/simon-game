$(document).ready(function() {

  // introducing variables
  var gameData = {                     // storing game information
    "currentPattern": [],
    "usersPattern": [],
    "score": 0,
    "strictMode": false,
  };
  var userClickIndex = -1;            // set to -1 so it starts at 0 and currentPattern[userClickIndex] works
  clickFunction();                    // run once to enable the function
  console.log("Program running.");

  // toggle strict mode
  $(".strict-btn").click(function() {
    gameData.strictMode = !gameData.strictMode;
    $(".strict-led").toggleClass("led-active");
    console.log(gameData);
  });

  // setup and start new game on button-click
  $(".start-game").click(function() {
    $(".new").fadeIn("slow");
    $(".new").delay(150).fadeOut("slow");
    setTimeout(function() {
      $(this).text("RESET");
      gameData.currentPattern = [];
      gameData.score = 0;
      $(".score-value").text(gameData.score);
      setupNewRound();
    }, 1200);
  });

  // add one color to pattern
  function setupNewRound() {
    $(".buttons-circle").addClass("disable-clicks");            // disable buttons
    $(".score-value").text(gameData.score);                     // display new score
    var newColor;
    var num = Math.floor(Math.random() * (4 - 1 + 1)) + 1;      // generate random number between 1 and 4
    switch(num) {                                               // assign each number to one color
      case 1:
        newColor = "red";
        break;
      case 2:
        newColor = "green";
        break;
      case 3:
        newColor = "blue";
        break;
      case 4:
        newColor = "yellow";
        break;
      default:
        break;
    }
    gameData.currentPattern.push(newColor);                     // add random picked color to the pattern
    displayPattern();
  }

  // show the pattern to user
  function displayPattern() {
    userClickIndex = -1;                                                        // reset clickIndex
    gameData.usersPattern = [];                                                 // clear users input
    var i = 0;
    var moves = setInterval(function() {
      var field = gameData.currentPattern[i];
      new Audio("sounds/" + gameData.currentPattern[i] + "Sound.mp3").play();
      $("." + field).addClass("active");
      setTimeout(function() {
        $("." + field).removeClass("active");
      }, 400);
      i++;
      if (i >= gameData.currentPattern.length) {
        clearInterval(moves);
        $(".buttons-circle").removeClass("disable-clicks");                     // enable buttons
      }
    }, 700);
  }

  // play sound effect and push clicked color to usersPattern array
  function clickFunction() {
    $(".quarter-btn").click(function() {
      switch($(this).css("background-color")) {
        case "rgb(255, 0, 0)":
          new Audio("sounds/redSound.mp3").play();
          gameData.usersPattern.push("red");
          break;
        case "rgb(0, 128, 0)":
          new Audio("sounds/greenSound.mp3").play();
          gameData.usersPattern.push("green");
          break;
        case "rgb(0, 0, 255)":
          new Audio("sounds/blueSound.mp3").play();
          gameData.usersPattern.push("blue");
          break;
        case "rgb(255, 255, 0)":
          new Audio("sounds/yellowSound.mp3").play();
          gameData.usersPattern.push("yellow");
          break;
        default:
          break;
      }
      userClickIndex += 1;                                  // increase click counter by 1
      validateInput();
    });
  }

  // check whether the click fits with the current Pattern or not
  function validateInput() {
    if (gameData.currentPattern[userClickIndex] == gameData.usersPattern[userClickIndex]) { // if input was right
      console.log(gameData.currentPattern + " | " + gameData.usersPattern);
      if (gameData.usersPattern.length == gameData.currentPattern.length) { // if the whole pattern was returned correctly
        console.log("Correct input.");
        $(".buttons-circle").addClass("disable-clicks");             // disable buttons
        gameData.score += 1;                                         // increase score by 1
        if (gameData.score == 20) {
          console.log("Game won!");
          $(".score-value").text(gameData.score);
          showText($(".won"));
          setTimeout(function() {
            $(".new").fadeIn("slow");
            $(".new").delay(150).fadeOut("slow");
          }, 1500);
          gameData.currentPattern = [];
          gameData.score = 0;
          setTimeout(function() {
            setupNewRound();
          }, 2500);
        }
        else {
          showText($(".correct"));
          setTimeout(function() {
            setupNewRound();
          }, 500);
        }
      }
    }
    else { // if input was wrong
      if(gameData.strictMode) {                                      // strictMode activated; end game
        console.log("Game lost.");
        showText($(".lost"));
        setTimeout(function() {
          $(".new").fadeIn("slow");
          $(".new").delay(150).fadeOut("slow");
        }, 1500);
        gameData.currentPattern = [];
        gameData.score = 0;
        setTimeout(function() {
          setupNewRound();
        }, 2500);
      }
      else {
        showText($(".wrong"));
        setTimeout(function() {
          displayPattern();
        }, 500);
      }
      $(".buttons-circle").addClass("disable-clicks");               // disable buttons
    }
  }

  function showText(text) {
    text.fadeIn("slow");
    text.delay(150).fadeOut("slow");
  }

});
