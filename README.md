Created by: Nika Ashtarzadeh
Email: Nika_Ashtarzadeh@student.uml.edu
Date: 12/16/24

GitHub repo: https://github.com/Ashtarzadeh-02111948/Ashtarzadeh-02111948.github.io-hw5

Url of game: https://ashtarzadeh-02111948.github.io/Ashtarzadeh-02111948.github.io-hw5/


Description:
This program implements a one board line of Scrabble. The player is given a rack 
of letter tiles and can drag and drop these tiles onto a single row of Scrabble board squares. 
When the player forms a valid word, points are awarded based on the Scrabble letter values in the provided pieces.json file.
The player can continue to form multiple words, accumulating 
points across rounds until no tiles remain or they choose to reset the game.

# External Sources Referenced
Below is a list of all external sources referenced in this project's code and comments:

1. **Tile Holder Image (Rack)**  
   Source: [https://pixabay.com/static/uploads/photo/2014/07/31/20/48/scrabble-tile-holder-406774_640.png](https://pixabay.com/static/uploads/photo/2014/07/31/20/48/scrabble-tile-holder-406774_640.png)  
   
   *Used as the image for the player's tile rack.*

2. **Board Tile Images (Bonus and Blank Squares)**  
   Source: [https://d1b10bmlvqabco.cloudfront.net/attach/icm9jynacvn5kx/i5ic1b2hwmz6nv/ihf34c9jbxpw/Scrabble_Board_OneLine.png](https://d1b10bmlvqabco.cloudfront.net/attach/icm9jynacvn5kx/i5ic1b2hwmz6nv/ihf34c9jbxpw/Scrabble_Board_OneLine.png)

   *The bonus-tile.png and blank-tile.png images are derived from this Scrabble board image.*

3. **Scrabble Letter Tiles Images**  
   Source: [https://jesseheines.com/~heines/91.461/91.461-2015-16f/461-assn/Scrabble_LetterTiles.png](https://jesseheines.com/~heines/91.461/91.461-2015-16f/461-assn/Scrabble_LetterTiles.png)
   
   *These images provide the Scrabble letter tiles used in the game.*

4. **pieces.json Associative Array**  
   Source: Ramon Meza

5. **Using Fisher-Yates algorithm to randomly shuffle the array**
    Source: https://stackoverflow.com/questions/59810241/how-to-fisher-yates-shuffle-a-javascript-array


## Extra Credit Feature:

### Word Validation with a Dictionary
- **Status: Implemented**
- Uses `/usr/share/dict/words` or a similar dictionary file to validate formed words.
- If the formed word is not found, the player receives zero points and must adjust their tiles.


## Key Features and Their Status

1. **Tile Distribution and Random Selection:**
   - Reads `pieces.json` for standard Scrabble distribution.
   - Initially deals 7 tiles.
   - After playing a word, only the needed number of tiles to refill to 7 are drawn.
   - **Status: Fully Implemented and Working**

2. **Rack and Board Interaction:**
   - The rack and board are droppable areas.
   - Tiles are draggable and revert if dropped in invalid areas.
   - **Status: Fully Implemented and Working**

3. **Board Layout and Bonus Squares:**
   - Single-line board includes bonus squares that double the word score.
   - **Status: Fully Implemented and Working**

4. **Scoring Logic:**
   - Letter values from `pieces.json` are summed for each valid word.
   - Bonus squares double the total word score.
   - Scores accumulate until reset.
   - **Status: Fully Implemented and Working**

5. **Adhering to Placement Rules:**
   - Except for the first tile, each subsequent tile must be adjacent to previously placed tiles.
   - If a gap is detected, the tile immediately reverts to the rack.
   - **Status: Fully Implemented and Working**

6. **Next Word vs. Reset Buttons:**
   - **Next Word:** Adds current word’s score, clears the board (not the rack), and deals new tiles to top up to 7.
   - **Reset:** Restores the game to its initial state.
   - **Status: Fully Implemented and Working**

7. **Game Termination/Tiles Running Out:**
   - If no more tiles can be drawn, a message is displayed and the player must eventually reset.
   - **Status: Fully Implemented and Working**


By combining these features, the code provides a simple version of the game Scrabble. It includes
mechanics such as - managing a rack of letters, forming valid words on a board with bonus squares, 
scoring, and playing multiple rounds until the tiles are exhausted or the player chooses to reset.
*/
