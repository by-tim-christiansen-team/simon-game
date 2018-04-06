$(document).ready(function() {

// introducing variables
  var gameData = {                  // storing game information
    "currentPattern": [],
    "usersPattern": [],
    "score": 0,
    "strictMode": false,
  };
  var userClickIndex = -1;          // set to -1 so it starts at 0 and currentPattern[userClickIndex] works
  clickFunction();                  // run once to enable the function
  console.log("Program running.");

  // toggle strict mode
  $(".strict-btn").click(function() {
    strictMode = !strictMode;
  });

  // setup and start new game on button-click
  $(".start-game").click(function() {
    $(this).text("Reset");
    gameData.currentPattern = [];
    gameData.score = 0;
    setupNewRound();
  });

  // add one color to pattern
  function setupNewRound() {
    $(".buttons-circle").addClass("disable-clicks");      // disable buttons
    userClickIndex = -1;                                  // reset clickIndex
    gameData.usersPattern = [];                           // clear users input
    var newColor;
    var num = Math.floor(Math.random() * (4 - 1 + 1)) + 1;  // generate random number between 1 and 4
    switch(num) {                                           // assign each number to one color
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
    gameData.currentPattern.push(newColor);                 // add random picked color to the pattern
    displayPattern();
  }

  // show the pattern to user
  function displayPattern() {
    var i = 0;
    var moves = setInterval(function() {
      var field = gameData.currentPattern[i];
      new Audio("sounds/" + gameData.currentPattern[i] + "Sound.mp3").play();
      $("." + field).addClass("active");
      setTimeout(function() {
        $("." + field).removeClass("active");
      }, 600);
      i++;
      if (i >= gameData.currentPattern.length) {
        clearInterval(moves);
        $(".buttons-circle").removeClass("disable-clicks");     // enable buttons
      }
    }, 1000);
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
      userClickIndex += 1;          // increase click counter by 1
      validateInput();
    });
  }

  // check whether the click fits with the current Pattern or not
  function validateInput() {
    if (gameData.currentPattern[userClickIndex] == gameData.usersPattern[userClickIndex]) {     // if input was right
      console.log(gameData.currentPattern + " | " + gameData.usersPattern);
      if (gameData.usersPattern.length == gameData.currentPattern.length) {             // if the whole pattern was returned correctly
        console.log("Game won.");
        $(".buttons-circle").addClass("disable-clicks");          // disable buttons
        gameData.score += 1;                                // increase score by 1
        $(".score-value").text(gameData.score);             // display new score
        setupNewRound();
      }
    }
    else {
      console.log("Game lost.");
      $(".buttons-circle").addClass("disable-clicks");      // disable buttons
    }
  }

});
