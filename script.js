// // /* 
// // Created by: Nika Ashtarzadeh
// // Email: Nika_Ashtarzadeh@student.uml.edu
// // Date: 12/11/24
// // */


// let draggedLetters = []; // holds the letters that the player dragged to form a word
// let lettersInHolder = [];
// let tileIdCounter = 0; // Keep track of unique tile IDs
// let totalScore = 0;     // Track total accumulated points over multiple words
// let currentWordScore = 0; // Score of the currently formed word

// // Create a Set to store dictionary words
// let dictionarySet = new Set();

// // Flag to track when dictionary is loaded
// let isDictionaryLoaded = false;

// // Load the dictionary file locally and populate the Set
// fetch('words.txt')
//     .then(response => response.text())  // Convert the response to text
//     .then(data => {
//         // Split by new lines and add each word to the Set
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

//         // Clear board and tile holder
//         $(".tile-letter").remove();
//         $("#tile-holder").empty();
//         draggedLetters = [];
//         lettersInHolder = [];
//         $("#word").text("");
//         $("#score").text("0");

//         // Re-deal tiles
//         $.getJSON("pieces.json", function(scrabbleData) {
//             dealTiles(scrabbleData);
//         });
//     });

//     // Next Word button logic
//     $("#nextWordBtn").on("click", function() {
//         if (currentWordScore > 0) {
//             // Add current word's score to total score
//             totalScore += currentWordScore;
//             $("#totalScore").text(totalScore);

//             // Clear the board and holder
//             $(".tile-letter").remove();
//             $("#tile-holder").empty();
//             draggedLetters = [];
//             lettersInHolder = [];
//             $("#word").text("");
//             $("#score").text("0");
//             currentWordScore = 0;
//             $(this).prop("disabled", true); // disable until next valid word

//             // Deal new tiles
//             $.getJSON("pieces.json", function(scrabbleData) {
//                 dealTiles(scrabbleData);
//             });
//         }
//     });

//     // Initial load of tiles
//     $.getJSON("pieces.json", function(scrabbleData) {
//         dealTiles(scrabbleData);
//     });


//     // Inline function to deal out tiles
//     function dealTiles(scrabbleData) {
//         // Clear tile holder and arrays
//         $("#tile-holder").empty();
//         draggedLetters = [];
//         lettersInHolder = [];
        
//         // Create a pool of tiles
//         const tilePool = [];
//         scrabbleData.pieces.forEach(piece => {
//             for (let i = 0; i < piece.amount; i++) {
//                 tilePool.push(piece.letter);
//             }
//         });

//         // Shuffle and select 7 tiles
//         const shuffledTiles = shuffle(tilePool);
//         const selectedTiles = shuffledTiles.slice(0, 7);
//         const tileHolder = $("#tile-holder");

//         selectedTiles.forEach(letter => {
//             tileIdCounter++;
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

//         $(".draggable").draggable({
//             revert: "invalid",
//             snap: ".board-tile, #tile-holder .tile",
//             snapMode: "inner",
//             snapTolerance: 30,
//             start: function(event, ui) {
//                 ui.helper.css("z-index", 4);
//             }
//         });

//         // Reinitialize scores and buttons
//         $("#word").text("");
//         $("#score").text("0");
//         currentWordScore = 0;
//         $("#nextWordBtn").prop("disabled", true);

//         // Set up droppables (in case of re-deal)
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
//                   position: "absolute",
//                   top: $(this).offset().top,
//                   left: $(this).offset().left,
//                   zIndex: 1000,
//                   width: "80px",
//                   height: "80px"
//                 });

//                 validateWord(scrabbleData);
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
//             $("#nextWordBtn").prop("disabled", false); // Enable if valid word
//         } else {
//             console.log("Invalid word:", word);
//             wordElement.textContent = word;
//             $("#score").text(0);
//             currentWordScore = 0;
//             $("#nextWordBtn").prop("disabled", true); // Disable if not valid
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

// });

// /* 
// Created by: Nika Ashtarzadeh
// Email: Nika_Ashtarzadeh@student.uml.edu
// Date: 12/11/24
// */

let draggedLetters = []; // holds the letters that the player dragged to form a word
let lettersInHolder = [];
let tileIdCounter = 0;   // Keep track of unique tile IDs
let totalScore = 0;      // Track total accumulated points over multiple words
let currentWordScore = 0;// Score of the currently formed word

let dictionarySet = new Set();  // Store dictionary words
let isDictionaryLoaded = false;  // Flag when dictionary is loaded
let piecesData = null;           // Will hold the scrabbleData from pieces.json once fetched

// Load the dictionary file locally and populate the Set
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

function checkIfValid(word) {
    if (!isDictionaryLoaded) {
        console.error("Dictionary is not loaded yet.");
        return false;
    }
    return dictionarySet.has(word.toUpperCase());
}

$(document).ready(function() {

    // Initialize board
    var tiles = ["", "bonus", "", "", "", "bonus", ""];
    var container = $("#scrabbleBoard");
    tiles.forEach(function(tile, index) {
        var tileDiv = $("<div></div>").addClass("board-tile")
            .attr("data-index", index)
            .css("z-index", 1);
      
        if (tile === "bonus") {
            var bonusImage = $("<img>").attr("src", "bonus-tile.png").attr("alt", "Bonus Tile");
            tileDiv.append(bonusImage);
        } else if (tile === "") {
            var blankImage = $("<img>").attr("src", "blank-tile.png").attr("alt", "Blank Tile");
            tileDiv.append(blankImage);
        }
      
        container.append(tileDiv);
    });

    // Reset button logic
    $("#resetBtn").on("click", function() {
        // Reset scores
        totalScore = 0;
        currentWordScore = 0;
        $("#totalScore").text(totalScore);
        $("#nextWordBtn").prop("disabled", true);

        // Clear board and tile holder
        $(".tile-letter").remove();
        $("#tile-holder").empty();
        draggedLetters = [];
        lettersInHolder = [];
        $("#word").text("");
        $("#score").text("0");

        // Re-fetch pieces.json to restore original amounts
        $.getJSON("pieces.json", function(scrabbleData) {
            // Make a fresh copy to reset piecesData
            piecesData = JSON.parse(JSON.stringify(scrabbleData));
            dealTiles(piecesData);
        });
    });

    // Next Word button logic
    $("#nextWordBtn").on("click", function() {
        if (currentWordScore > 0) {
            // Add current word's score to total score
            totalScore += currentWordScore;
            $("#totalScore").text(totalScore);

            // Clear the board and holder
            $(".tile-letter").remove();
            $("#tile-holder").empty();
            draggedLetters = [];
            lettersInHolder = [];
            $("#word").text("");
            $("#score").text("0");
            currentWordScore = 0;
            $(this).prop("disabled", true);

            // Deal new tiles again with updated piecesData
            dealTiles(piecesData);
        }
    });

    // Initial load of pieces.json
    $.getJSON("pieces.json", function(scrabbleData) {
        piecesData = JSON.parse(JSON.stringify(scrabbleData));
        dealTiles(piecesData);
    });

    // Inline function to deal out tiles from the updated piecesData
    function dealTiles(scrabbleData) {
        // Clear tile holder and arrays
        $("#tile-holder").empty();
        draggedLetters = [];
        lettersInHolder = [];

        // Build tilePool from current scrabbleData amounts
        const tilePool = [];
        scrabbleData.pieces.forEach(piece => {
            for (let i = 0; i < piece.amount; i++) {
                tilePool.push(piece.letter);
            }
        });

        // If no tiles left
        if (tilePool.length === 0) {
            $("#word").text("No more tiles available!");
            $("#score").text("0");
            currentWordScore = 0;
            $("#nextWordBtn").prop("disabled", true);
            return;
        }

        // Shuffle and select up to 7 tiles
        const shuffledTiles = shuffle(tilePool);
        const selectedTiles = shuffledTiles.slice(0, Math.min(7, tilePool.length));
        const tileHolder = $("#tile-holder");

        // Decrement the amounts for the selected letters in piecesData
        selectedTiles.forEach(letter => {
            tileIdCounter++;
            const piece = scrabbleData.pieces.find(p => p.letter === letter);
            if (piece && piece.amount > 0) {
                piece.amount -= 1; // decrement from piecesData
            }

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

        $(".draggable").draggable({
            revert: "invalid",
            snap: ".board-tile, #tile-holder .tile",
            snapMode: "inner",
            snapTolerance: 30,
            start: function(event, ui) {
                ui.helper.css("z-index", 4);
            }
        });

        // Reinitialize scores and buttons
        $("#word").text("");
        $("#score").text("0");
        currentWordScore = 0;
        $("#nextWordBtn").prop("disabled", true);

        // Set up droppables (in case of re-deal)
        $(".board-tile").droppable({
            accept: ".letter-tile.draggable",
            drop: function(event, ui) {
                const draggedLetter = ui.helper.attr("data-letter");
                const draggedTileId = ui.helper.attr("data-tile-id");
                const tileIndex = $(this).attr("data-index");

                const indexInDragged = draggedLetters.findIndex(item => item.id == draggedTileId);
                if (indexInDragged !== -1) {
                    draggedLetters.splice(indexInDragged, 1);
                }

                const indexInHolder = lettersInHolder.indexOf(draggedLetter);
                if (indexInHolder !== -1) {
                    lettersInHolder.splice(indexInHolder, 1);
                }

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

                validateWord(scrabbleData);
            }
        });

        $("#tile-holder").droppable({
            accept: ".tile-letter",
            drop: function(event, ui) {
                const draggedLetter = ui.helper.attr("data-letter");
                const draggedTileId = ui.helper.attr("data-tile-id");

                const indexInDragged = draggedLetters.findIndex(item => item.id == draggedTileId);
                if (indexInDragged !== -1) {
                    draggedLetters.splice(indexInDragged, 1);
                }

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
                    snap: ".tile, #tile-holder .tile",
                    snapMode: "inner",
                    snapTolerance: 5,
                    containment: "#board",
                    start: function(event, ui) {
                        ui.helper.css("z-index", 1);
                    }
                });

                validateWord(scrabbleData);
            }
        });
    }

    function validateWord(scrabbleData) {
        const wordElement = document.getElementById("word");

        if (draggedLetters.length === 0) {
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

        // cant just be a single letter despite dictionary containing it
        if(word.length < 2){
            wordElement.textContent = word;
            $("#score").text(0);
            currentWordScore = 0;
            $("#nextWordBtn").prop("disabled", true); // Disable if not valid
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

            // Apply bonus multiplier for bonus tiles
            if (draggedLetters.some(item => item.index == 1 || item.index == 5)) {
                totalPoints *= 2;
            }

            $("#score").text(totalPoints);
            currentWordScore = totalPoints;
            $("#nextWordBtn").prop("disabled", false); // Enable if valid
        } else {
            wordElement.textContent = word;
            $("#score").text(0);
            currentWordScore = 0;
            $("#nextWordBtn").prop("disabled", true); // Disable if not valid
        }
    }

    function getLetterValue(letter, pieces) {
        const piece = pieces.find(p => p.letter === letter);
        return piece ? piece.value : 0;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

});

