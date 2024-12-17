// /* 
// Created by: Nika Ashtarzadeh
// Email: Nika_Ashtarzadeh@student.uml.edu
// Date: 12/16/24
// */

// let draggedLetters = []; // holds the letters that the player dragged to form a word
// let lettersInHolder = [];
// let tileIdCounter = 0;   // Keep track of unique tile IDs
// let totalScore = 0;      // Track total accumulated points over multiple words
// let currentWordScore = 0;// Score of the currently formed word

// let dictionarySet = new Set();  // Store dictionary words
// let isDictionaryLoaded = false;  // Flag when dictionary is loaded
// let piecesData = null;           // Will hold the scrabbleData from pieces.json once fetched

// // Load the dictionary file locally and populate the Set
// fetch('words.txt')
//     .then(response => response.text())
//     .then(data => {
//         const words = data.split('\n');
//         words.forEach(word => dictionarySet.add(word.trim().toUpperCase()));
//         isDictionaryLoaded = true;
//     })
//     .catch(error => {
//         console.error("Error loading the dictionary:", error);
//     });

// function checkIfValid(word) {
//     if (!isDictionaryLoaded) {
//         console.error("Dictionary is not loaded yet.");
//         return false;
//     }
//     return dictionarySet.has(word.toUpperCase());
// }

// $(document).ready(function() {

//     // Initialize board
//     var tiles = ["", "bonus", "", "", "", "bonus", ""];
//     var container = $("#scrabbleBoard");
//     tiles.forEach(function(tile, index) {
//         var tileDiv = $("<div></div>").addClass("board-tile")
//             .attr("data-index", index)
//             .css("z-index", 1);
      
//         if (tile === "bonus") {
//             var bonusImage = $("<img>").attr("src", "bonus-tile.png").attr("alt", "Bonus Tile");
//             tileDiv.append(bonusImage);
//         } else if (tile === "") {
//             var blankImage = $("<img>").attr("src", "blank-tile.png").attr("alt", "Blank Tile");
//             tileDiv.append(blankImage);
//         }
      
//         container.append(tileDiv);
//     });

//     // Reset button logic
//     $("#resetBtn").on("click", function() {
//         // Reset scores
//         totalScore = 0;
//         currentWordScore = 0;
//         $("#totalScore").text(totalScore);
//         $("#nextWordBtn").prop("disabled", true);

//         // Clear board and tile holder completely
//         $(".tile-letter").remove();
//         $("#tile-holder").empty();
//         draggedLetters = [];
//         lettersInHolder = [];
//         $("#word").text("");
//         $("#score").text("0");

//         // Re-fetch pieces.json to restore original amounts
//         $.getJSON("pieces.json", function(scrabbleData) {
//             piecesData = JSON.parse(JSON.stringify(scrabbleData));
//             dealTiles(piecesData); // Will deal full 7 as lettersInHolder is empty
//         });
//     });

//     // Next Word button logic
//     $("#nextWordBtn").on("click", function() {
//         if (currentWordScore > 0) {
//             // Add current word's score to total score
//             totalScore += currentWordScore;
//             $("#totalScore").text(totalScore);

//             // Clear the board only, not the tile holder
//             $(".tile-letter").remove();
//             draggedLetters = [];
//             $("#word").text("");
//             $("#score").text("0");
//             currentWordScore = 0;
//             $(this).prop("disabled", true);

//             // Not clearing lettersInHolder or tile-holder here as instructed. Player keeps their leftover tiles.

//             // Just top up to 7 tiles
//             dealTiles(piecesData);
//         }
//     });

//     // Initial load of pieces.json
//     $.getJSON("pieces.json", function(scrabbleData) {
//         piecesData = JSON.parse(JSON.stringify(scrabbleData));
//         dealTiles(piecesData); // First time dealing: lettersInHolder empty, deal full 7.
//     });

//     // Only deal as many tiles as needed to return the player's hand to 7 tiles
//     function dealTiles(scrabbleData) {
//         // Check how many tiles we currently have in lettersInHolder
//         let currentCount = lettersInHolder.length;
//         let needed = 7 - currentCount;

//         if (needed <= 0) {
//             // Already have 7 or more 
//             return;
//         }

//         // Build tilePool from current scrabbleData amounts
//         const tilePool = [];
//         scrabbleData.pieces.forEach(piece => {
//             for (let i = 0; i < piece.amount; i++) {
//                 tilePool.push(piece.letter);
//             }
//         });

//         // If no tiles left in the pool
//         if (tilePool.length === 0) {
//             $("#word").text("No more tiles available!");
//             $("#score").text("0");
//             currentWordScore = 0;
//             $("#nextWordBtn").prop("disabled", true);
//             return;
//         }

//         const shuffledTiles = shuffle(tilePool);
//         const selectedTiles = shuffledTiles.slice(0, Math.min(needed, tilePool.length));
//         const tileHolder = $("#tile-holder");

//         selectedTiles.forEach(letter => {
//             tileIdCounter++;
//             const piece = scrabbleData.pieces.find(p => p.letter === letter);
//             if (piece && piece.amount > 0) {
//                 piece.amount -= 1; // decrement from piecesData
//             }

//             const imagePath = `Scrabble_Tiles/Scrabble_Tile_${letter}.jpg`;
//             const tileImage = $("<img>")
//                 .attr("src", imagePath)
//                 .attr("alt", `Tile ${letter}`)
//                 .addClass("tile-image draggable letter-tile")
//                 .attr("data-letter", letter)
//                 .attr("data-tile-id", tileIdCounter);

//             const tileDiv = $("<div>").addClass("letter-tile-container").append(tileImage);
//             tileHolder.append(tileDiv);
//             lettersInHolder.push(letter);
//         });

//         // Make newly added tiles draggable
//         $(".draggable").draggable({
//             revert: "invalid",
//             snap: ".board-tile, #tile-holder .tile",
//             snapMode: "inner",
//             snapTolerance: 30,
//             start: function(event, ui) {
//                 ui.helper.css("z-index", 4);
//             }
//         });

//         $("#word").text("");
//         $("#score").text("0");
//         currentWordScore = 0;
//         $("#nextWordBtn").prop("disabled", true);

//         // Re-establish droppables if needed
//         $(".board-tile").droppable({
//             accept: ".letter-tile.draggable",
//             drop: function(event, ui) {
//                 const draggedLetter = ui.helper.attr("data-letter");
//                 const draggedTileId = ui.helper.attr("data-tile-id");
//                 const tileIndex = $(this).attr("data-index");

//                 const indexInDragged = draggedLetters.findIndex(item => item.id == draggedTileId);
//                 if (indexInDragged !== -1) {
//                     draggedLetters.splice(indexInDragged, 1);
//                 }

//                 const indexInHolder = lettersInHolder.indexOf(draggedLetter);
//                 if (indexInHolder !== -1) {
//                     lettersInHolder.splice(indexInHolder, 1);
//                 }

//                 draggedLetters.push({
//                     letter: draggedLetter,
//                     index: parseInt(tileIndex),
//                     id: draggedTileId
//                 });

//                 const draggedElement = ui.helper.detach();
//                 draggedElement.css({
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     margin: 0,
//                     zIndex: 1000
//                 }).addClass("tile-letter");

//                 $("#scrabbleBoard").append(draggedElement);
//                 draggedElement.css({
//                     position: "absolute",
//                     top: $(this).offset().top,
//                     left: $(this).offset().left,
//                     zIndex: 1000,
//                     width: "80px",
//                     height: "80px"
//                 });

//                 // Check adjacency before validating word
//                 if (!checkAdjacency()) {
//                     // If not adjacent, revert tile to rack
//                     revertTileToRack(draggedElement, draggedLetter, draggedTileId);
//                 } else {
//                     validateWord(scrabbleData);
//                 }
//             }
//         });

//         $("#tile-holder").droppable({
//             accept: ".tile-letter",
//             drop: function(event, ui) {
//                 const draggedLetter = ui.helper.attr("data-letter");
//                 const draggedTileId = ui.helper.attr("data-tile-id");

//                 const indexInDragged = draggedLetters.findIndex(item => item.id == draggedTileId);
//                 if (indexInDragged !== -1) {
//                     draggedLetters.splice(indexInDragged, 1);
//                 }

//                 lettersInHolder.push(draggedLetter);

//                 const draggedElement = ui.helper.detach();
//                 draggedElement.css({
//                     position: "relative",
//                     zIndex: 1000,
//                     top: "auto",
//                     left: "auto"
//                 }).removeClass("tile-letter");

//                 $(this).append(draggedElement);

//                 draggedElement.draggable({
//                     revert: "invalid",       
//                     revertDuration: 600,     
//                     snap: ".tile, #tile-holder .tile",
//                     snapMode: "inner",
//                     snapTolerance: 5,
//                     containment: "#board",
//                     start: function(event, ui) {
//                         ui.helper.css("z-index", 1); 
//                     }
//                 });

//                 validateWord(scrabbleData);
//             }
//         });
//     }

//     function validateWord(scrabbleData) {
//         const wordElement = document.getElementById("word");

//         if (draggedLetters.length === 0) {
//             wordElement.textContent = "";
//             $("#score").text(0);
//             currentWordScore = 0;
//             $("#nextWordBtn").prop("disabled", true);
//             return;
//         }

//         draggedLetters.sort((a, b) => a.index - b.index);

//         const minIndex = draggedLetters[0].index;
//         const maxIndex = draggedLetters[draggedLetters.length - 1].index;

//         let boardArray = [];
//         for (let i = minIndex; i <= maxIndex; i++) {
//             const tile = draggedLetters.find(item => item.index === i);
//             boardArray.push(tile ? tile.letter : '-');
//         }

//         const word = boardArray.join('');

//         // must be at least 2 letters
//         if(word.length < 2){
//             wordElement.textContent = word;
//             $("#score").text(0);
//             currentWordScore = 0;
//             $("#nextWordBtn").prop("disabled", true); 
//             return;
//         }

//         const isValidWord = checkIfValid(word);

//         if (isValidWord) {
//             wordElement.textContent = word;
//             console.log("Valid word:", word);
//             let totalPoints = 0;
//             draggedLetters.forEach(item => {
//                 totalPoints += getLetterValue(item.letter, scrabbleData.pieces);
//             });

//             // Apply bonus multiplier for bonus tiles
//             if (draggedLetters.some(item => item.index == 1 || item.index == 5)) {
//                 totalPoints *= 2;
//             }

//             $("#score").text(totalPoints);
//             currentWordScore = totalPoints;
//             $("#nextWordBtn").prop("disabled", false); 
//         } else {
//             wordElement.textContent = word;
//             $("#score").text(0);
//             currentWordScore = 0;
//             $("#nextWordBtn").prop("disabled", true); 
//         }
//     }

//     function getLetterValue(letter, pieces) {
//         const piece = pieces.find(p => p.letter === letter);
//         return piece ? piece.value : 0;
//     }

//     function shuffle(array) {
//         for (let i = array.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [array[i], array[j]] = [array[j], array[i]];
//         }
//         return array;
//     }

//     function checkAdjacency() {
//         if (draggedLetters.length <= 1) {
//             return true;
//         }
//         draggedLetters.sort((a, b) => a.index - b.index);
//         for (let i = 0; i < draggedLetters.length - 1; i++) {
//             if (draggedLetters[i+1].index - draggedLetters[i].index !== 1) {
//                 return false;
//             }
//         }
//         return true;
//     }

//     function revertTileToRack(draggedElement, draggedLetter, draggedTileId) {
//         const indexInDragged = draggedLetters.findIndex(item => item.id == draggedTileId);
//         if (indexInDragged !== -1) {
//             draggedLetters.splice(indexInDragged, 1);
//         }
//         lettersInHolder.push(draggedLetter);

//         draggedElement.detach();
//         draggedElement.css({
//             position: "relative",
//             top: "auto",
//             left: "auto",
//             zIndex: 1000
//         }).removeClass("tile-letter");

//         $("#tile-holder").append(draggedElement);

//         draggedElement.draggable({
//             revert: "invalid",
//             revertDuration: 600,
//             snap: ".tile, #tile-holder .tile",
//             snapMode: "inner",
//             snapTolerance: 5,
//             containment: "#board",
//             start: function(event, ui) {
//                 ui.helper.css("z-index", 1); 
//             }
//         });

//         // Re-check the word now that the tile is back in the rack
//         validateWord(piecesData);
//     }

// });



/* 
Created by: Nika Ashtarzadeh
Email: Nika_Ashtarzadeh@student.uml.edu
Date: 12/16/24

Description:
This script implements a simplified Scrabble-like game. It loads a set of letter tiles based on 
Scrabble distribution, allows the player to drag and drop letter tiles onto a board, calculates 
scores for formed words, and can deal new tiles to top the player's hand back to seven tiles 
after each valid word is played. The player can continue playing multiple words, accumulate scores,
and reset the game at any time.

Note on External Sources:
- The dictionary file (words.txt) used for word validation is not included here. It should be 
  placed in the same directory. The file presumably comes from a standard English words list.
- The letter tile images and the board tile images used are presumably taken from standard 
  Scrabble image sets. These images are not the original work of the author.
- The jQuery UI library is used for drag-and-drop functionality (https://jqueryui.com/).

This code meets the following requirements:
- Tiles are randomly selected from a letter distribution that matches Scrabble.
- Tiles can be dragged from the rack to the board and back.
- Words formed are validated against a dictionary.
- Only as many tiles as needed are dealt to bring the player's hand back to 7 tiles after 
  each word is played.
- The board and scoring logic include bonus tiles.
- The player can reset the game at any time, starting fresh.
*/

let draggedLetters = [];     // Array to track which letters are currently placed on the board
let lettersInHolder = [];    // Array to track which letters remain in the player's rack
let tileIdCounter = 0;       // Unique ID counter to differentiate identical letters
let totalScore = 0;          // Keeps track of the total accumulated score across multiple words
let currentWordScore = 0;    // Score for the currently formed word

let dictionarySet = new Set();    // Set to store dictionary words for quick lookup
let isDictionaryLoaded = false;   // Flag to indicate when the dictionary is loaded
let piecesData = null;            // Holds the original tile distribution and values from pieces.json

// Load the dictionary file and populate the Set. Each word is stored in uppercase for easy comparison.
fetch('words.txt')
    .then(response => response.text())
    .then(data => {
        const words = data.split('\n');
        words.forEach(word => dictionarySet.add(word.trim().toUpperCase()));
        isDictionaryLoaded = true;
    })
    .catch(error => {
        console.error("Error loading the dictionary:", error);
    });

// Check if a given word is in the dictionary. Returns true if it exists, false otherwise.
function checkIfValid(word) {
    if (!isDictionaryLoaded) {
        console.error("Dictionary is not loaded yet.");
        return false;
    }
    return dictionarySet.has(word.toUpperCase());
}

$(document).ready(function() {

    // Initialize a one-line board. Some tiles are marked as "bonus" and others are blank.
    // This array represents the layout of the board. 
    // Bonus tiles affect scoring by doubling the word score if the word touches them.
    var tiles = ["", "bonus", "", "", "", "bonus", ""];
    var container = $("#scrabbleBoard");
    tiles.forEach(function(tile, index) {
        var tileDiv = $("<div></div>").addClass("board-tile")
            .attr("data-index", index)
            .css("z-index", 1);

        // If the tile is a bonus tile, display a bonus image.
        // Otherwise, display a blank tile image.
        if (tile === "bonus") {
            // bonus-tile.png not created by me, presumably standard resource.
            var bonusImage = $("<img>").attr("src", "bonus-tile.png").attr("alt", "Bonus Tile");
            tileDiv.append(bonusImage);
        } else if (tile === "") {
            // blank-tile.png not created by me, presumably standard resource.
            var blankImage = $("<img>").attr("src", "blank-tile.png").attr("alt", "Blank Tile");
            tileDiv.append(blankImage);
        }

        container.append(tileDiv);
    });

    // Reset button: Resets the entire game state, including score, board, and rack.
    $("#resetBtn").on("click", function() {
        totalScore = 0;
        currentWordScore = 0;
        $("#totalScore").text(totalScore);
        $("#nextWordBtn").prop("disabled", true);

        // Clear the board and holder completely
        $(".tile-letter").remove();
        $("#tile-holder").empty();
        draggedLetters = [];
        lettersInHolder = [];
        $("#word").text("");
        $("#score").text("0");

        // Reload pieces.json to restore the original tile distribution
        $.getJSON("pieces.json", function(scrabbleData) {
            piecesData = JSON.parse(JSON.stringify(scrabbleData));
            // Deal full 7 tiles as we are starting fresh.
            dealTiles(piecesData);
        });
    });

    // Next Word button: After validating a word, clicking this will:
    // - Add the word score to totalScore
    // - Clear only the board (not the rack)
    // - Top up the tiles back to 7 
    $("#nextWordBtn").on("click", function() {
        if (currentWordScore > 0) {
            totalScore += currentWordScore;
            $("#totalScore").text(totalScore);

            // Clear only the board tiles
            $(".tile-letter").remove();
            draggedLetters = [];
            $("#word").text("");
            $("#score").text("0");
            currentWordScore = 0;
            $(this).prop("disabled", true);

            // Do NOT clear lettersInHolder or tile-holder.
            // Player's leftover tiles remain. We only top up to 7 tiles.
            dealTiles(piecesData);
        }
    });

    // On initial page load, get pieces.json and set up the initial 7 tiles.
    $.getJSON("pieces.json", function(scrabbleData) {
        piecesData = JSON.parse(JSON.stringify(scrabbleData));
        dealTiles(piecesData); // Initially deal the full 7 tiles since lettersInHolder is empty.
    });

    // dealTiles: Deal just enough tiles to bring the player's rack back to 7 tiles total.
    // If this is the first deal of the game, it deals 7 tiles because lettersInHolder starts empty.
    // On subsequent deals (Next Word), it only adds enough tiles to refill to 7.
    function dealTiles(scrabbleData) {
        let currentCount = lettersInHolder.length;
        let needed = 7 - currentCount;

        if (needed <= 0) {
            // Already have 7 or more, no need to deal tiles.
            return;
        }

        // Build a pool of available tiles from piecesData based on the amounts remaining.
        const tilePool = [];
        scrabbleData.pieces.forEach(piece => {
            for (let i = 0; i < piece.amount; i++) {
                tilePool.push(piece.letter);
            }
        });

        // If no more tiles are left, end the game because no more tiles can be drawn.
        if (tilePool.length === 0) {
            $("#word").text("No more tiles available!");
            $("#score").text("0");
            currentWordScore = 0;
            $("#nextWordBtn").prop("disabled", true);
            return;
        }

        // Shuffle the tile pool and select the required number of tiles.
        const shuffledTiles = shuffle(tilePool);
        const selectedTiles = shuffledTiles.slice(0, Math.min(needed, tilePool.length));
        const tileHolder = $("#tile-holder");

        // For each selected tile, decrement the count from piecesData and add the tile to the rack.
        selectedTiles.forEach(letter => {
            tileIdCounter++;
            const piece = scrabbleData.pieces.find(p => p.letter === letter);
            if (piece && piece.amount > 0) {
                piece.amount -= 1;
            }

            // Note: Tile images (Scrabble_Tile_X.jpg) are presumably standard Scrabble resources.
            const imagePath = `Scrabble_Tiles/Scrabble_Tile_${letter}.jpg`;
            const tileImage = $("<img>")
                .attr("src", imagePath)
                .attr("alt", `Tile ${letter}`)
                .addClass("tile-image draggable letter-tile")
                .attr("data-letter", letter)
                .attr("data-tile-id", tileIdCounter);

            const tileDiv = $("<div>").addClass("letter-tile-container").append(tileImage);
            tileHolder.append(tileDiv);
            lettersInHolder.push(letter);
        });

        // Make the newly added tiles draggable
        $(".draggable").draggable({
            revert: "invalid",
            snap: ".board-tile, #tile-holder .tile",
            snapMode: "inner",
            snapTolerance: 30,
            start: function(event, ui) {
                ui.helper.css("z-index", 4);
            }
        });

        // Reset word and score displays since we are starting a new word attempt.
        $("#word").text("");
        $("#score").text("0");
        currentWordScore = 0;
        $("#nextWordBtn").prop("disabled", true);

        // Set up the board and tile holder droppables to handle dropping logic.
        $(".board-tile").droppable({
            accept: ".letter-tile.draggable",
            drop: function(event, ui) {
                const draggedLetter = ui.helper.attr("data-letter");
                const draggedTileId = ui.helper.attr("data-tile-id");
                const tileIndex = $(this).attr("data-index");

                // If the tile was previously on the board or holder, remove it from those arrays.
                const indexInDragged = draggedLetters.findIndex(item => item.id == draggedTileId);
                if (indexInDragged !== -1) {
                    draggedLetters.splice(indexInDragged, 1);
                }

                const indexInHolder = lettersInHolder.indexOf(draggedLetter);
                if (indexInHolder !== -1) {
                    lettersInHolder.splice(indexInHolder, 1);
                }

                // Add this new tile placement to draggedLetters with its board index.
                draggedLetters.push({
                    letter: draggedLetter,
                    index: parseInt(tileIndex),
                    id: draggedTileId
                });

                const draggedElement = ui.helper.detach();
                draggedElement.css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    margin: 0,
                    zIndex: 1000
                }).addClass("tile-letter");

                $("#scrabbleBoard").append(draggedElement);
                draggedElement.css({
                    position: "absolute",
                    top: $(this).offset().top,
                    left: $(this).offset().left,
                    zIndex: 1000,
                    width: "80px",
                    height: "80px"
                });

                // Enforce adjacency rules. If not adjacent, revert the tile back to the rack.
                if (!checkAdjacency()) {
                    revertTileToRack(draggedElement, draggedLetter, draggedTileId);
                } else {
                    validateWord(scrabbleData);
                }
            }
        });

        $("#tile-holder").droppable({
            accept: ".tile-letter",
            drop: function(event, ui) {
                const draggedLetter = ui.helper.attr("data-letter");
                const draggedTileId = ui.helper.attr("data-tile-id");

                // Remove tile from draggedLetters if it was previously placed on the board.
                const indexInDragged = draggedLetters.findIndex(item => item.id == draggedTileId);
                if (indexInDragged !== -1) {
                    draggedLetters.splice(indexInDragged, 1);
                }

                // Returning a tile to the holder adds it back to lettersInHolder.
                lettersInHolder.push(draggedLetter);

                const draggedElement = ui.helper.detach();
                draggedElement.css({
                    position: "relative",
                    zIndex: 1000,
                    top: "auto",
                    left: "auto"
                }).removeClass("tile-letter");

                $(this).append(draggedElement);

                draggedElement.draggable({
                    revert: "invalid",
                    revertDuration: 600,     
                    snap: ".tile, #tile-holder .tile",
                    snapMode: "inner",
                    snapTolerance: 5,
                    containment: "#board",
                    start: function(event, ui) {
                        ui.helper.css("z-index", 1); 
                    }
                });

                // After returning a tile to the rack, re-validate the word (which may now be empty or partial).
                validateWord(scrabbleData);
            }
        });
    }

    // validateWord: Builds the current word from draggedLetters and checks if it is in the dictionary.
    // Updates the displayed word, score, and enables the Next Word button if valid.
    function validateWord(scrabbleData) {
        const wordElement = document.getElementById("word");

        if (draggedLetters.length === 0) {
            // No letters placed means no word. Reset displays and disable Next Word.
            wordElement.textContent = "";
            $("#score").text(0);
            currentWordScore = 0;
            $("#nextWordBtn").prop("disabled", true);
            return;
        }

        draggedLetters.sort((a, b) => a.index - b.index);

        const minIndex = draggedLetters[0].index;
        const maxIndex = draggedLetters[draggedLetters.length - 1].index;

        let boardArray = [];
        for (let i = minIndex; i <= maxIndex; i++) {
            const tile = draggedLetters.find(item => item.index === i);
            boardArray.push(tile ? tile.letter : '-');
        }

        const word = boardArray.join('');

        // Enforce a minimum word length of 2 letters.
        if (word.length < 2) {
            wordElement.textContent = word;
            $("#score").text(0);
            currentWordScore = 0;
            $("#nextWordBtn").prop("disabled", true);
            return;
        }

        const isValidWord = checkIfValid(word);

        if (isValidWord) {
            wordElement.textContent = word;
            console.log("Valid word:", word);

            let totalPoints = 0;
            draggedLetters.forEach(item => {
                totalPoints += getLetterValue(item.letter, scrabbleData.pieces);
            });

            // If the word touches a bonus square (index 1 or 5), double the points.
            if (draggedLetters.some(item => item.index == 1 || item.index == 5)) {
                totalPoints *= 2;
            }

            $("#score").text(totalPoints);
            currentWordScore = totalPoints;
            $("#nextWordBtn").prop("disabled", false);
        } else {
            // If not valid, show the formed sequence but score = 0, disable Next Word.
            wordElement.textContent = word;
            $("#score").text(0);
            currentWordScore = 0;
            $("#nextWordBtn").prop("disabled", true);
        }
    }

    // getLetterValue: Returns the value of a given letter tile using the pieces data.
    function getLetterValue(letter, pieces) {
        const piece = pieces.find(p => p.letter === letter);
        return piece ? piece.value : 0;
    }

    // shuffle: Randomly shuffles an array using Fisher-Yates algorithm.
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // checkAdjacency: Ensures that all placed letters are contiguous on the board.
    // If there's a gap, the newly placed tile must revert to the rack.
    function checkAdjacency() {
        if (draggedLetters.length <= 1) {
            return true; // With one tile, no adjacency issue.
        }
        draggedLetters.sort((a, b) => a.index - b.index);
        for (let i = 0; i < draggedLetters.length - 1; i++) {
            if (draggedLetters[i+1].index - draggedLetters[i].index !== 1) {
                return false;
            }
        }
        return true;
    }

    // revertTileToRack: If a tile is placed not adjacent to existing tiles, move it back to the rack.
    function revertTileToRack(draggedElement, draggedLetter, draggedTileId) {
        const indexInDragged = draggedLetters.findIndex(item => item.id == draggedTileId);
        if (indexInDragged !== -1) {
            draggedLetters.splice(indexInDragged, 1);
        }
        lettersInHolder.push(draggedLetter);

        draggedElement.detach();
        draggedElement.css({
            position: "relative",
            top: "auto",
            left: "auto",
            zIndex: 1000
        }).removeClass("tile-letter");

        $("#tile-holder").append(draggedElement);

        draggedElement.draggable({
            revert: "invalid",
            revertDuration: 600,
            snap: ".tile, #tile-holder .tile",
            snapMode: "inner",
            snapTolerance: 5,
            containment: "#board",
            start: function(event, ui) {
                ui.helper.css("z-index", 1); 
            }
        });

        // After reverting a tile to the rack, re-validate the word to update displays accordingly.
        validateWord(piecesData);
    }

});
