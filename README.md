GitHub repo: https://github.com/Ashtarzadeh-02111948/Ashtarzadeh-02111948.github.io-hw5

Url of game: https://ashtarzadeh-02111948.github.io/Ashtarzadeh-02111948.github.io-hw5/

Description: 
/* 
Created by: Nika Ashtarzadeh
Email: Nika_Ashtarzadeh@student.uml.edu
Date: 12/16/24

Description:
This program implements a one board line of Scrabble. The player is given a rack 
of letter tiles and can drag and drop these tiles onto a single row of Scrabble board squares. 
When the player forms a valid word, points are awarded based on the Scrabble letter values in the provided pieces.json file.
The player can continue to form multiple words, accumulating 
points across rounds until no tiles remain or they choose to reset the game.


## Extra Credit Features

### Word Validation with a Dictionary
- I have implemented word validation against a dictionary file. The dictionary used is sourced from `/usr/share/dict/words` and is loaded in by the script at the start of the game.
- Whenever the player forms a word on the board, the game checks if the word is present in the dictionary before awarding points.
- This ensures that only legitimate English words (as defined by the dictionary file) score points.
- If the word is not found in the dictionary, the player’s score for that round is zero, and they may need to rearrange tiles or try a different word.


Key Features and Implementation Details:

1. **Tile Distribution and Random Selection:**
   The tile distribution matches the standard Scrabble letters, as defined in the external 
   pieces.json file. Each letter has a certain amount and value. The code loads this 
   data, builds a pool of available tiles, and selects tiles randomly to deal to the player. 
   Initially, the player receives 7 random tiles. After playing a word, only the number of tiles 
   needed to return the rack back to 7 is drawn from the remaining pool. This ensures that the 
   game follows the Scrabble logic of a diminishing tile set.

2. **Rack and Board Interaction:**
   The player's rack is represented as a droppable area where tiles can be placed and moved 
   back and forth. Tiles are draggable, enabling the player to pick them up from the rack and 
   place them onto the board squares. Tiles placed illegally or in invalid spots automatically 
   revert back to the rack due to the use of jQuery UI draggable/droppable with `revert: "invalid"`.

3. **Board Layout and Bonus Squares:**
   The board is represented as a single line of tiles, some of which are designated as bonus 
   squares. When a word touches a bonus square, the total score for that word is doubled. This 
   encourages strategic placement of tiles. The board and bonus squares are initialized at the 
   start and remain consistent across rounds.

5. **Scoring Logic:**
   Each placed tile contributes its Scrabble letter value to the total word score. If the word 
   touches a bonus square, the entire word score is doubled. The player’s total score is 
   accumulated over multiple words until they reset the game. Letter values are defined in the 
   JSON data (pieces.json), and the program sums these values after determining that the formed 
   word is valid.

6. **Adhering to Placement Rules:**
   Except for the very first tile placed, every subsequent tile must be placed adjacent to 
   existing placed tiles, ensuring no gaps. If a tile is placed leaving a gap, the tile is 
   immediately reverted to the rack and the player is prompted to place tiles contiguously. 
   This simulates the Scrabble requirement of forming continuous words on the board.

7. **Next Word vs. Reset Buttons:**
   - **Next Word:** When the player finishes a valid word, clicking "Next Word" will add the 
     current word’s score to the total score, clear only the board (not the rack), and top up 
     the player’s hand to 7 tiles. The player can then continue placing tiles to form another 
     word.
   - **Reset:** Clicking "Reset" fully restarts the game—scores are reset, the rack and board 
     are cleared, and the tile distribution is reset as if starting a new game.

8. **Game Termination/Tiles Running out:**
   If at any point the tile pool is exhausted and the player cannot draw new tiles, the program 
   indicates "No more tiles available!" The player may continue playing words if tiles remain 
   in their rack, but eventually will be forced to reset or end the session when they can no 
   longer form words.


By combining these features, the code provides a simply version of the game Scrabble. It includes
mechanics such as - managing a rack of letters, forming valid words on a board with bonus squares, 
scoring, and playing multiple rounds until the tiles are exhausted or the player chooses to reset.
*/
