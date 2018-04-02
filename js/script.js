$(document).ready(function() {
  var currentPattern = [];
  var inputPattern = [];
  var currentScore = 0;

  $(".start-game").click(function() {
    currentPattern = [];
    inputPattern = [];
    currentScore = 0;
    updateAndShowPattern();
  });

  function updateAndShowPattern() {
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
        new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3").play();
        $("." + field).addClass("active");
        setTimeout(function() {
          $("." + field).removeClass("active");
        }, 600);
        i++;
        if (i >= currentPattern.length) {
          clearInterval(moves);
        }
      }, 1000);
      usersTurn();
    }

    function usersTurn() {
    $(".box").click(function() {
      switch($(this).css("background-color")) {
        case "rgb(255, 0, 0)":
          new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3').play();
          inputPattern.push("red");
          break;
        case "rgb(0, 128, 0)":
          new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3').play();
          inputPattern.push("green");
          break;
        case "rgb(0, 0, 255)":
          new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3').play();
          inputPattern.push("blue");
          break;
        case "rgb(255, 255, 0)":
          new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3').play();
          inputPattern.push("yellow");
          break;
        default:
          break;
      }
    });
  }


});
