/* 
Created by: Nika Ashtarzadeh
Email: Nika_Ashtarzadeh@student.uml.edu
Date: 12/11/24
*/

$(document).ready(function() {


    // Define the tiles array
    var tiles = ["", "bonus", "", "", "", "bonus", ""];
  
    // Loop through the array and create tile elements
    var container = $("#scrabbleBoard");

    tiles.forEach(function(tile, index) {
      // Create a div element for each tile
      var tileDiv = $("<div></div>").addClass("tile");
      
      // Add the correct image for each tile type using values from the array above
      if (tile === "bonus") {
        var bonusImage = $("<img>").attr("src", "bonus-tile.png").attr("alt", "Bonus Tile");
        tileDiv.append(bonusImage);
      } 
      
        else if (tile === "") {
            var blankImage = $("<img>").attr("src", "blank-tile.png").attr("alt", "Blank Tile");
            tileDiv.append(blankImage);
      }
  
      // Append the tile to the container
      container.append(tileDiv);
    });

    /*                      end of initlaizing the board display                                 */ 




    // Load the JSON data
    $.getJSON("pieces.json", function (scrabbleData) {

        // Create a pool of tiles
        const tilePool = [];
        scrabbleData.pieces.forEach(piece => {
            for (let i = 0; i < piece.amount; i++) {
                tilePool.push(piece.letter);
            }
        });

        // Function to shuffle an array
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        // Shuffle the pool and select 7 tiles
        const shuffledTiles = shuffle(tilePool);
        const selectedTiles = shuffledTiles.slice(0, 7);

        // Add selected tiles to the tile rack
        const tileHolder = $("#tile-holder");

        selectedTiles.forEach(letter => {
            const imagePath = `Scrabble_Tiles/Scrabble_Tile_${letter}.jpg`; // Path to get letters

            const tileImage = $("<img>")
                .attr("src", imagePath)
                .attr("alt", `Tile ${letter}`)
                .addClass("tile-image")
                .css({ width: "80px", height: "80px" }); // Ensure images are visible

            const tileDiv = $("<div>").addClass("tile").append(tileImage); // Wrap the image in a div

            tileHolder.append(tileDiv); // Add the tile to the tile holder

        });









        /*                           example                                         */ 

        let totalPoints = 0; // holds the total points of the player
        let draggedLetters = []; // holds the letters that the player dragged to form a word

        draggedLetters = ["A", "P", "P", "L", "E"] // example, if user formed "APPLE"



        const word = draggedLetters.join(""); // creating a string out of the dragged letters.

        const isValidWord = checkIfValid(word); // checks if the word is valid; returns true if valid, false if not




        // simple function that uses very limited dictionary to check if the word exists
        function checkIfValid(word){
            const dictionary = ["APPLE", "BANANA", "ORANGE"]; // example for now
            return dictionary.includes(word);

        }

         // function to get the value of a given piece from the letter and piece struct
        function getLetterValue(letter, pieces){
            const piece = pieces.find(p => p.letter === letter);
            return piece ? piece.value : 0
        }

        if(isValidWord){
            // loop over each letter, and from that letter get its value
            draggedLetters.forEach(letter =>{
                const letterValue = getLetterValue(letter, scrabbleData.pieces);
                totalPoints+=letterValue // award points if the word exists
            })
                // needs to be reset after reset game or a new word
                if(draggedLetters[1] != ""){
                    totalPoints *=2;
                }
    
                if(draggedLetters[5]!= ""){
                    totalPoints *=2;
                }
        }

        // display points to the page using jquery
        $("#score").text(totalPoints);

        /*          end of example                                       */ 













    }); // end of scrabbleData scope



});



