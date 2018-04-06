$(document).ready(function() {

var gameData = {
  "currentPattern": [],
  "usersPattern": [],
  "score": 0,
  "strictMode": false,
};
var userClickIndex = -1;
  clickFunction();
  console.log("Program running.");

  $(".strict-btn").click(function() {
    strictMode = !strictMode;
  });

  $(".start-game").click(function() {
    $(this).text("Reset");
    gameData.currentPattern = [];
    gameData.usersPattern = [];
    gameData.score = 0;
    userClickIndex = -1;
    updateAndShowPattern();
  });

  function updateAndShowPattern() {
    $(".buttons-circle").addClass("disable-clicks");
    userClickIndex = -1;
    gameData.usersPattern = [];
    var btnToAdd;
    var num = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    switch(num) {
      case 1:
        btnToAdd = "red";
        break;
      case 2:
        btnToAdd = "green";
        break;
      case 3:
        btnToAdd = "blue";
        break;
      case 4:
        btnToAdd = "yellow";
        break;
      default:
        break;
    }
    gameData.currentPattern.push(btnToAdd);
    displayPattern();
  }

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
          $(".buttons-circle").removeClass("disable-clicks");
        }
      }, 1000);
    }

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
      userClickIndex += 1;
      if (gameData.currentPattern[userClickIndex] == gameData.usersPattern[userClickIndex]) {
        console.log(gameData.currentPattern + " | " + gameData.usersPattern);
        if (gameData.usersPattern.length == gameData.currentPattern.length) {
          console.log("Game won.");
          $(".buttons-circle").addClass("disable-clicks");
          updateAndShowPattern();
          return true;
        }
      }
      else {
        console.log("Game lost.");
        $(".buttons-circle").addClass("disable-clicks");

      }

    });
  }


});
