$(document).ready(function() {
  var currentPattern = [];
  var inputPattern = [];
  var currentScore = 0;
  var clickCounter = -1;
  $(".start-game").click(function() {
    currentPattern = ["red", "blue"];
    inputPattern = [];
    currentScore = 0;
    updateAndShowPattern();
  });

  function updateAndShowPattern() {
    $(".buttons-div").addClass("disable-clicks");
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
          usersTurn();
        }
      }, 1000);
    }

    function usersTurn() {
    $(".buttons-div").removeClass("disable-clicks");
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
        $(".log").text(currentPattern + " | " + inputPattern);
      }
      else {
        $(".log").text("Fehler gemacht!");
        $("selector").click(false);
        return false;
      }
      if (inputPattern.length == currentPattern.length) {
        $(".log").text("GEWONNEN");
        return true;
      }

    });
  }


});
