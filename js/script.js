$(function() {
  var game = new Game(); 

  $("#play-button").click(function(){
    game.displayDifficultyPrompt($(this));
  });

  $(".prompt-button").click(function(){
    game.addDifficultyLevel($(this));
  });
});

var Game = function() {
  this.numMoves = 0;
  this.shuffleSpeed = 200;
  this.speed = 175;
  this.$puzzle = {
    start: $("#start4"),
    p1: $("#p1"),
    p2: $("#p2"),
    p3: $("#p3"),
    p4: $("#p4"),
    row2: $("#row2"),
    p5: $("#p5"),
    p6: $("#p6"),
    p7: $("#p7"),
    p8: $("#p8"),
    row3: $("#row3"),
    p9: $("#p9"),
    p10: $("#p10"),
    p11: $("#p11"),
    p12: $("#p12"),
    row3: $("#row4"),
    p13: $("#p13"),
    p14: $("#p14"),
    p15: $("#p15"),
    p16: $("#p16"),
  };
};

Game.prototype.displayDifficultyPrompt = function($button) {
  $button.prop('disabled', true);

  // Display custom prompt asking user for difficulty level
  $("#difficulty-prompt").show();
};

Game.prototype.addDifficultyLevel = function($button) {
  var userChoice = $button.attr("id");

  // Remove the prompt from the screen
  $("#difficulty-prompt").hide();

  // Compute the number of shuffles based on user's choice
  switch (userChoice) {
    case 'easy':
      this.numMoves = 3;
      break;
    case 'medium':
      this.numMoves = 20;
      break;
    case 'hard':
      this.numMoves = 75;
      break;
  }
};

var leftMove = function(n, o) {
	$(n).animate({left: "-=181px"},speed);
	$(o).animate({left: "+=181px"},speed);
	$(n).after(o);
};

var rightMove = function(n, o) {
	$(n).animate({left: "+=181px"},speed);
	$(o).animate({left: "-=181px"},speed);
	$(n).before(o);
};

var upDown = function(n, o, val1, val2) {
  $(n).animate({top: val1},speed);
	$(o).animate({top: val2},speed);
	$(n).after('<p id="mark"></p>');
	$(o).after('<p id="mark2"></p>');
	$("#mark").after(o);
	$("#mark2").after(n);
	$("#mark").remove();
	$("#mark2").remove();
};

// Create function to replace button with another button (disabled,etc.)
var replaceButton = function(name, replaceText){
	$(name).after(replaceText);
	$(name).remove();
};

// Create a function to animate a sequence once the user completes the puzzle
var youWin = function() {
	if ($($start).next().attr("id") === "p1" && $($p1).next().attr("id") === "p2" && 
		 $($p2).next().attr("id") === "p3" && $($p3).next().attr("id") === "p4" &&
		 $($p4).next().attr("id") === "row2" && $($row2).next().attr("id") === "p5" &&
		 $($p5).next().attr("id") === "p6" && $($p6).next().attr("id") === "p7" &&
		 $($p7).next().attr("id") === "p8" && $($p8).next().attr("id") === "row3" &&
		 $($row3).next().attr("id") === "p9" && $($p9).next().attr("id") === "empty" &&
		 $($empty).next().attr("id") === "p11" && $($p11).next().attr("id") === "p12" &&
		 $($p12).next().attr("id") === "row4" && $($row4).next().attr("id") === "p13" &&
		 $($p13).next().attr("id") === "p14" && $($p14).next().attr("id") === "p15" &&
		 $($p15).next().attr("id") === "p16" && $($p16).next().attr("id") === "end0") {
				$("#empty").after('<div class="piece" id="p10"></div>');
			$("#empty").remove();
			$(".piece").toggle("explode", 1700);
			$("#puzzle").empty();
			$("#puzzle").append('<div id="win-image"></div>');
			$("#sidebar").prepend('<p id="win-text">YOU WIN!</p>');
			}
};
	
// Create function to return a random number
var randomNum = function(highValue, lowValue){
	return Math.floor(Math.random() * (highValue-lowValue+1)+1);
};

var game = function(){
		// When diffculty level is clicked


			// Replace the 10th tile with an empty slot
			$("#p10").after('<div id="empty"></div>');
			$("#p10").remove();
			var $empty = $("#empty");

			// Create a function to move the tiles
			var boardMove = function(name){
				if ($(name).prev().attr("id") === "empty") {
				 	leftMove(name, $empty);
				} else if ($(name).prevUntil("#empty").length === 4) {
					upDown(name, $empty, "-=130px", "+=130px");
				} else if ($(name).next().attr("id") === "empty") {
					rightMove(name, $empty);
				} else if ($(name).nextUntil("#empty").length === 4) {
					upDown(name, $empty, "+=130px", "-=130px");
				}
			};
			
			// Create an array of 16 numbers
			var pieceNum = new Array(16);
	    	
      // Fill array with numbers from 1-16
      for(var i = 0; i < pieceNum.length; i++) {
        pieceNum[i] = i+1;
      }
      
      // Sort array in random order
      for(var i = 0; i < pieceNum.length; i++) {
        
        // Call randomNum and initialize randomIndex to it
        var randomIndex = randomNum(15, 0);
        
        // Swap the two elements if the indexes are not equal
        if(pieceNum[i] !== pieceNum[randomIndex]) {
          var hold = pieceNum[i];
          pieceNum[i] = pieceNum[randomIndex];
          pieceNum[randomIndex] = hold;
        }
      }

	 		// Shuffle the tiles by calling boardMove(); in a nested for loop
	    for(var j = 0; j < numMoves; j++) {
				for(var i = 0; i < pieceNum.length; i++) {
					var $piece = $("#p" + pieceNum[i]);
					boardMove($piece);
				}
			}
	

	  // Create arrow key functionality
		$(document).keydown(function(e) {
				switch(e.which) {
				// Left Arrow Key
				case 37:
					for(var i = 1; i < 17; i++) {
						var $left = $("#p" + i);
						if ($($left).prev().attr("id") === "empty") {
							console.log("left");
			 				console.log(i);
						 	leftMove($left, $empty);
			 				break;
			 			}
		 			}
					break;
				// Up Arrow Key
				case 38:
					for(var i = 1; i < 17; i++) {
						var $up = $("#p" + i);
						if ($($up).prevUntil("#empty").length === 4) {
							console.log("right");
			 				console.log(i);
			 				upDown($up, $empty, "-=130px", "+=130px");
			 				break;
		 				}
		 			}
					break;
				// Right Arrow Key
				case 39:
					for(var i = 1; i < 17; i++) {
						var $right = $("#p" + i);
						if ($($right).next().attr("id") === "empty") {
							console.log("right");
			 				console.log(i);
			 				rightMove($right, $empty);
			 				break;
			 				
			 			}
			 		}
					break;
				// Down Arrow Key
				case 40:
					for(var i = 1; i < 17; i++) {
						var $down = $("#p" + i);
						if ($($down).nextUntil("#empty").length === 4) {
							console.log("down");
			 				console.log(i);
			 				upDown($down, $empty, "+=130px", "-=130px");
			 				break;
		 				}
		 			}
		 			default: return;
			}
			e.preventDefault(); 
			// Call youWin(); if the user's final key press is completion of the puzzle
			youWin();
		}); 
			
		// Call boardMove(); and apply it if the user clicks a tile
		$(".piece").click(function(){
			boardMove(this);
			// Call youWin(); if the user's final mouse click is completion of the puzzle
				$(".piece").click(function(){
					youWin();
				});
		});
};
