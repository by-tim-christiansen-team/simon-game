$(document).ready(function() {
  var currentPattern = [];
  var inputPattern = [];
  var currentScore = 0;
  var clickCounter = -1;
  var strictMode = false;
  usersTurn();
  console.log("Program running.");

  $(".strict-btn").click(function() {
    strictMode = !strictMode;
  });

  $(".start-game").click(function() {
    currentPattern = ["red", "blue"];
    inputPattern = [];
    currentScore = 0;
    clickCounter = -1;
    updateAndShowPattern();
  });

  function updateAndShowPattern() {
    $(".buttons-div").addClass("disable-clicks");
    clickCounter = -1;
    inputPattern = [];
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
    currentPattern.push(btnToAdd);
    displayPattern();
  }

  function displayPattern() {
      var i = 0;
      var moves = setInterval(function() {
        var field = currentPattern[i];
        new Audio("sounds/" + currentPattern[i] + "Sound.mp3").play();
        $("." + field).addClass("active");
        setTimeout(function() {
          $("." + field).removeClass("active");
        }, 600);
        i++;
        if (i >= currentPattern.length) {
          clearInterval(moves);
          $(".buttons-div").removeClass("disable-clicks");
        }
      }, 1000);
    }

    function usersTurn() {
    $(".box").click(function() {
      switch($(this).css("background-color")) {
        case "rgb(255, 0, 0)":
          new Audio("sounds/redSound.mp3").play();
          inputPattern.push("red");
          break;
        case "rgb(0, 128, 0)":
          new Audio("sounds/greenSound.mp3").play();
          inputPattern.push("green");
          break;
        case "rgb(0, 0, 255)":
          new Audio("sounds/blueSound.mp3").play();
          inputPattern.push("blue");
          break;
        case "rgb(255, 255, 0)":
          new Audio("sounds/yellowSound.mp3").play();
          inputPattern.push("yellow");
          break;
        default:
          break;
      }
      clickCounter += 1;
      if (currentPattern[clickCounter] == inputPattern[clickCounter]) {
        console.log(currentPattern + " | " + inputPattern);
        if (inputPattern.length == currentPattern.length) {
          console.log("Game won.");
          $(".buttons-div").addClass("disable-clicks");
          updateAndShowPattern();
          return true;
        }
      }
      else {
        console.log("Game lost." + clickCounter);
        $(".buttons-div").addClass("disable-clicks");

      }

    });
  }


});
