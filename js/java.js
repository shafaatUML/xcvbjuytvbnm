/*  Author: Shafaat Osmani
    Contact: Shafaat_Osmani@student.uml.edu
    Date: 12/20/2022
    GUI HW5 Scrabble Project

    About this file: Main Javascript file which is responsible for the functionality
    of the scrabble game. Description of each section/function is described. 

    * There are various console log statements dispersed throughout the 
    file, there are solely for debugging purposes and do not affect the functionality of the game. *
*/
/*
    Sources for general use: 
    
    https://www.w3schools.com/jsref/prop_li_value.asp
    https://stackoverflow.com/questions/54717357/how-can-i-console-log-the-second-li-element-using-javascript-onclick
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li#:~:text=The%20only%20allowed%20value%20for,numbering%20from%20the%20value%20set.
    https://www.geeksforgeeks.org/what-are-custom-attributes-in-html5/
    https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li 
    https://www.youtube.com/watch?v=hdI2bqOjy3c 
    https://www.w3schools.com/css/css_selectors.asp
    https://www.youtube.com/watch?v=LynjytfeY4U&t=636s
    https://stackoverflow.com/questions/41025630/css-background-image-stretch-horizontally-and-repeat-vertically
    https://linuxhint.com/change-cursor-to-hand-pointer-css/
    https://stackoverflow.com/questions/5735270/revert-a-jquery-draggable-object-back-to-its-original-container-on-out-event-of
    https://www.coderrocketfuel.com/article/generate-a-random-letter-from-the-alphabet-using-javascript
    https://stackoverflow.com/questions/35785134/jquery-draggable-after-drop
    https://www.w3schools.com/JSREF/prop_style_border.asp
    https://stackoverflow.com/questions/15193640/jquery-ui-draggable-reset-to-original-position
    https://www.tutorialrepublic.com/faq/how-to-set-css-background-image-property-using-jquery.php
    https://stackoverflow.com/questions/72581491/javascript-arithmetic-operations-between-strings-of-numbers 
*/


// uses ajax to get file then creates an array of every word in the file and puts it into an array
// source: https://johnresig.com/blog/dictionary-lookups-in-javascript/
var words = [];
$.ajax({
    url: "graphics_data/dictionary.txt",
    success: function (result) {
        console.log("booting up dict");
        words = result.split("\n");
        for (var i = 0; i < words.length; ++i) {
            words[i] = words[i].toUpperCase();
        }
        console.log(words[30]);
    }
});

// Board array to store board information, keeps track of which spaces are 
// empty and which spaces are used as well as what letters are placed on the board
let board_arr = [];
board_arr[0] = ' ';
board_arr[1] = ' ';
board_arr[2] = ' ';
board_arr[3] = ' ';
board_arr[4] = ' ';
board_arr[5] = ' ';
board_arr[6] = ' ';
board_arr[7] = ' ';
board_arr[8] = ' ';
board_arr[9] = ' ';
board_arr[10] = ' ';
board_arr[11] = ' ';
board_arr[12] = ' ';
board_arr[13] = ' ';
board_arr[14] = ' ';

// useful variables
// source: https://www.tutorialsteacher.com/javascript/javascript-variable#:~:text=Declare%20Variables%20without%20var%20and%20let%20Keywords&text=However%2C%20a%20value%20must%20be,JavaScript%20to%20learn%20about%20it.
var word_string = "";           // keeps track of the word
var score = 0;                  // score for the current round
var total_score = 0;            // total running score
var tiles_on_rack = 0;          // # of tiles on rack
var tiles_on_board = 0;         // # of tiles on board 
var random_index;               // random int
var firstTile;                  // if first tile on board
var boarderror;
var validation_string = "";
let blanktileletter;            // helper variable
var doubleScore = "false";      // if double score is required
var isWord = "false";           // check if word
var amount = 0;                 // amount of double score multipliers
var jamaica = "false";          // true if word is valid false if not, submit only lights up when this is true
var origcount = 100;            // original tile distribution, game is won if total tile count has been brought down to less than a full hand or 0

// Modified associative array, taken from Jesse M. Heines. Added letter value and 
// edited indexing to numbers rather than letters
// His copyright:
/*  File:  /~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
 *  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  Copyright (c) 2015 by Jesse M. Heines.  All rights reserved.  May be freely 
 *    copied or excerpted for educational purposes with credit to the author.
 *  updated by JMH on November 21, 2015 at 10:27 AM
 *  updated by JMH on November 25, 2015 at 10:58 AM to add the blank tile
 *  updated by JMH on November 27, 2015 at 10:22 AM to add original-distribution
 */
var ScrabbleTiles = [];
ScrabbleTiles[0] = { "letter": "A", "value": 1, "original-distribution": 9, "remaining": 9 };
ScrabbleTiles[1] = { "letter": "B", "value": 3, "original-distribution": 2, "remaining": 2 };
ScrabbleTiles[2] = { "letter": "C", "value": 3, "original-distribution": 2, "remaining": 2 };
ScrabbleTiles[3] = { "letter": "D", "value": 2, "original-distribution": 4, "remaining": 4 };
ScrabbleTiles[4] = { "letter": "E", "value": 1, "original-distribution": 12, "remaining": 12 };
ScrabbleTiles[5] = { "letter": "F", "value": 4, "original-distribution": 2, "remaining": 2 };
ScrabbleTiles[6] = { "letter": "G", "value": 2, "original-distribution": 3, "remaining": 3 };
ScrabbleTiles[7] = { "letter": "H", "value": 4, "original-distribution": 2, "remaining": 2 };
ScrabbleTiles[8] = { "letter": "I", "value": 1, "original-distribution": 9, "remaining": 9 };
ScrabbleTiles[9] = { "letter": "J", "value": 8, "original-distribution": 1, "remaining": 1 };
ScrabbleTiles[10] = { "letter": "K", "value": 5, "original-distribution": 1, "remaining": 1 };
ScrabbleTiles[11] = { "letter": "L", "value": 1, "original-distribution": 4, "remaining": 4 };
ScrabbleTiles[12] = { "letter": "M", "value": 3, "original-distribution": 2, "remaining": 2 };
ScrabbleTiles[13] = { "letter": "N", "value": 1, "original-distribution": 6, "remaining": 6 };
ScrabbleTiles[14] = { "letter": "O", "value": 1, "original-distribution": 8, "remaining": 8 };
ScrabbleTiles[15] = { "letter": "P", "value": 3, "original-distribution": 2, "remaining": 2 };
ScrabbleTiles[16] = { "letter": "Q", "value": 10, "original-distribution": 1, "remaining": 1 };
ScrabbleTiles[17] = { "letter": "R", "value": 1, "original-distribution": 6, "remaining": 6 };
ScrabbleTiles[18] = { "letter": "S", "value": 1, "original-distribution": 4, "remaining": 4 };
ScrabbleTiles[19] = { "letter": "T", "value": 1, "original-distribution": 6, "remaining": 6 };
ScrabbleTiles[20] = { "letter": "U", "value": 1, "original-distribution": 4, "remaining": 4 };
ScrabbleTiles[21] = { "letter": "V", "value": 4, "original-distribution": 2, "remaining": 2 };
ScrabbleTiles[22] = { "letter": "W", "value": 4, "original-distribution": 2, "remaining": 2 };
ScrabbleTiles[23] = { "letter": "X", "value": 8, "original-distribution": 1, "remaining": 1 };
ScrabbleTiles[24] = { "letter": "Y", "value": 4, "original-distribution": 2, "remaining": 2 };
ScrabbleTiles[25] = { "letter": "Z", "value": 10, "original-distribution": 1, "remaining": 1 };
ScrabbleTiles[26] = { "letter": "_", "value": 0, "original-distribution": 2, "remaining": 2 };

// jQuery to manipulate the board and the rack by grabbing id
var $rack = $("#rack");
var $board = $("#board");

// make the rack draggable as well as giving it some attributes, make the board droppable and only accept draggables from the rack
// sources: https://jqueryui.com/draggable/ 
//          https://jqueryui.com/droppable/#photo-manager 
//          https://stackoverflow.com/questions/2424191/how-do-i-make-an-element-draggable-in-jquery
$('li', $rack).draggable({
    cancel: "a.ui-icon",
    revert: "invalid",
    containment: "document",
    cursor: "move"
});

// WHEN DROPPED ON BOARD: 
$('li', $board).droppable({
    accept: "#rack li",
    drop: function (event, ui) { // on drop functionality, source: 
        // blank tile case
        // source: https://blog.webdevsimplified.com/2020-10/javascript-data-attributes/
        //         https://api.jquery.com/data/
        if (document.getElementById($(ui.draggable).attr("id")).dataset.letter == "_") {
            // display for blank tile
            // source: https://stackoverflow.com/questions/54717357/how-can-i-console-log-the-second-li-element-using-javascript-onclick
            //         https://stackoverflow.com/questions/6163510/jquery-draggables-get-id-of-dragable 
            //         https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt
            let btile = window.prompt("enter a number corresponding to the letter for your blank tile (ONLY NUMBERS)\n 0-A     1-B     2-C     3-D\n 4-E     5-F     6-G     7-H\n 8-I     9-J     10-K     11-L\n 12-M     13-N     14-O     15-P\n 16-Q     17-R     18-S     19-T\n 20-U     21-V     22-W     23-X     24-Y     25-Z");
            document.getElementById($(ui.draggable).attr("id")).dataset.letter = ScrabbleTiles[btile].letter;
            document.getElementById($(ui.draggable).attr("id")).dataset.letval = ScrabbleTiles[btile].value;
            document.getElementById($(ui.draggable).attr("id")).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/" + btile + ".jpg')";

        }
        tiles_on_board++;
        //****** add dropped letter to word_string *****//
        //****** check word *****//

        if (firstTile == "true") {
            ui.draggable.addClass('first_tile');
        }
        // grabs elements by their id to insert into the board_arr (keeps track of indexes and letters on board)
        // source: 
        document.getElementById($(ui.draggable).attr("id")).dataset.index = $(this).attr("value");
        board_arr[document.getElementById($(ui.draggable).attr("id")).dataset.index] = document.getElementById($(ui.draggable).attr("id")).dataset.letter;
        console.log(board_arr);

        word_string = "";
        for (var z = 0; z < board_arr.length; z++) {
            if (board_arr[z] != ' ') {
                word_string += board_arr[z];
            }
        }

        // snaps tile to the board 
        // sources: https://stackoverflow.com/questions/1254665/jquery-draggable-droppable-how-to-snap-dropped-element-to-dropped-on-element
        //         https://stackoverflow.com/questions/27135846/how-to-print-a-value-in-console-log-base-on-id-of-an-element 
        ui.draggable.position({ of: $(this), my: 'left top', at: 'left top' });
        ui.draggable.addClass('on_board');

        tiles_on_rack--;
        console.log(board_arr);


        // check that there are no spaces between letters on board
        // source: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
        if (!(document.getElementById($(ui.draggable).attr("id")).classList.contains("first_tile"))) {
            // some helper variables to look through the array and determine if there is a space
            // source: https://www.javascripttutorial.net/javascript-primitive-wrapper-types/
            //         https://www.w3schools.com/jsref/jsref_number.asp
            var next = Number(document.getElementById($(ui.draggable).attr("id")).dataset.index) + 1;
            var prev = Number(document.getElementById($(ui.draggable).attr("id")).dataset.index) - 1;
            var hi = next.toString();
            var hello = prev.toString();

            console.log("next" + board_arr[hi]);
            console.log("prev" + board_arr[hello]);
            // check if space
            if (board_arr[hi] == ' ' && board_arr[hello] == ' ') {
                console.log("ERROR HAS BEEN DETECTED!!!!!");

                console.log(word_string);
                board_arr[document.getElementById($(ui.draggable).attr("id")).dataset.index] = ' ';
                // update word string so it is correct
                word_string = "";
                for (var z = 0; z < board_arr.length; z++) {
                    if (board_arr[z] != ' ') {
                        word_string += board_arr[z];
                    }
                }
                document.getElementById('wordbeingbuilt').innerHTML = "<h3>Word: " + word_string + "</h3><p>&nbsp</p>";
                console.log("look here");
                console.log(board_arr);
                console.log(word_string);

                document.getElementById($(ui.draggable).attr("id")).classList.add('offending');  // add offending class   

                if (document.getElementById($(ui.draggable).attr("id")).classList.contains('offending')) {   // IF OFFENDING
                    $(document.getElementById($(ui.draggable).attr("id"))).css({ "top": "", "left": "" });

                    // update attributes
                    // source: https://www.javascripttutorial.net/dom/css/check-if-an-element-contains-a-class/
                    //         https://www.w3schools.com/howto/howto_js_remove_class.asp
                    document.getElementById($(ui.draggable).attr("id")).classList.remove('on_board');
                    document.getElementById($(ui.draggable).attr("id")).classList.add('on_rack');
                    document.getElementById($(ui.draggable).attr("id")).dataset.index = "";
                    // the process that this function takes is that it deletes the offending tile and recreates it 
                    // at the rack with the same attributes, simulates the tile bouncing back to the rack 
                    $(document.getElementById($(ui.draggable).attr("id"))).draggable("destroy");
                    $(document.getElementById($(ui.draggable).attr("id"))).draggable({
                        cancel: "a.ui-icon",
                        revert: "invalid",
                        containment: "document",
                        cursor: "move"
                    });

                    tiles_on_rack++;
                    tiles_on_board--;

                    return;
                }
            }
        }
        // update word tracker html 
        document.getElementById('wordbeingbuilt').innerHTML = "<h3>Word: " + word_string + "</h3><p>&nbsp</p>";
        console.log("score before drop "+ score);
        score = score + Number(document.getElementById($(ui.draggable).attr("id")).dataset.letval); // add to score
        console.log("score after drop"+ score);
        firstTile = "false";

        // WORD VALIDATION: check if the word created by the user is contained within the dictionary file
        if (tiles_on_board >= 2) {
            console.log(word_string);
            if (words.includes(word_string)) {
                console.log("TRUEEEEE");
                jamaica = "true";           // weird name for a variable but it gets the job done, just keeps track of if word is valid or not
            } else {
                console.log("FALSEEEEEE");
                jamaica = "false";
            }
        }
        if (jamaica == "true" && tiles_on_board >= 2) {
            document.getElementById('submit').style.visibility = "visible";
        }

        console.log("tiles after drop: " + tiles_on_board); 
    }
});


// WHEN DROPPED ON RACK: 
$($rack).droppable({
    accept: "#rack li",
    drop: function (event, ui) {
        if (document.getElementById($(ui.draggable).attr("id")).classList.contains('on_board')) {
            tiles_on_board--;
        }
        //console.log("drag back to rack works"); 
        if (score != 0) {
            console.log("score before drop to rack "+ score);
            score -= Number(document.getElementById($(ui.draggable).attr("id")).dataset.letval);
            console.log("score after drop to rack "+ score);
        }

        //UPDATE WORD STRING USING BOARD_ARR
        board_arr[document.getElementById($(ui.draggable).attr("id")).dataset.index] = ' ';
        word_string = "";
        for (var z = 0; z < board_arr.length; z++) {
            if (board_arr[z] != ' ') {
                word_string += board_arr[z];
            }
        }
        // update word html
        // source: https://stackoverflow.com/questions/33203173/change-innerhtml-on-button-click
        document.getElementById('wordbeingbuilt').innerHTML = "<h3>Word: " + word_string + "</h3><p>&nbsp</p>";
        //console.log(word_string); 

        $(document.getElementById($(ui.draggable).attr("id"))).css({ "top": "", "left": "" });

        // recreates the tile at the rack so that it is in the proper position, with same values
        document.getElementById($(ui.draggable).attr("id")).classList.remove('on_board');
        document.getElementById($(ui.draggable).attr("id")).classList.add('on_rack');
        document.getElementById($(ui.draggable).attr("id")).dataset.index = "";

        $(document.getElementById($(ui.draggable).attr("id"))).draggable("destroy");
        $(document.getElementById($(ui.draggable).attr("id"))).draggable({      // makes the li draggable again
            cancel: "a.ui-icon",
            revert: "invalid",
            containment: "document",
            cursor: "move"
        });

        // updated attributes
        document.getElementById($(ui.draggable).attr("id")).classList.remove('on_board');
        if (document.getElementById($(ui.draggable).attr("id")).classList.contains('first_tile')) {
            document.getElementById($(ui.draggable).attr("id")).classList.remove('first_tile');
            firstTile = "true"
        }

        if (tiles_on_board < 2) {
            jamaica == "false";
            // source: https://stackoverflow.com/questions/6242976/javascript-hide-show-element
            document.getElementById('submit').style.visibility = "hidden";
        }

        console.log(tiles_on_board);
        //console.log(board_arr); 
    }
});


// WHEN SUBMIT BUTTON IS CLICKED: 
$("#submit").click(function () {
    console.log("score before submit" + score); 
        // calculate the score 
    for (var x = 0; x < 7; x++) {
        const calcscore = document.getElementById("rindex_" + x);
        if (calcscore.dataset.index == 2 || calcscore.dataset.index == 6 || calcscore.dataset.index == 8 || calcscore.dataset.index == 12) {
            amount = amount + 1;
            console.log("amount loop "+amount); 
        }

    }
    // commit points
    score = score * amount; 
    total_score += score;
    doubleScore = "false";
    amount = 0;
    score = 0;
    console.log("score after submit: "+ score); 
    // update score display
    document.getElementById('score').innerHTML = "<h3>Score: " + total_score + "</h3><p>&nbsp</p>";
    // reset word display
    word_string = "";
    document.getElementById('wordbeingbuilt').innerHTML = "<h3>Word: " + word_string + "</h3><p>&nbsp</p>";

    // create new tiles if used to refill hand
    // similar method for initializing the game 
    for (var x = 0; x < 7; x++) {
        random_index = getRandomInt(27);
        const setImageValue = document.getElementById("rindex_" + x);
        // sets position of tiles to rack
        $("#rindex_" + x).css({ "top": "", "left": "" });
        // source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while
        if (setImageValue.classList.contains('on_board')) {             // if it has class DROPPED
            if (ScrabbleTiles[random_index].remaining != 0) {
                setImageValue.dataset.letter = ScrabbleTiles[random_index].letter;
                ScrabbleTiles[random_index].remaining = ScrabbleTiles[random_index].remaining - 1;
                setImageValue.dataset.letval = ScrabbleTiles[random_index].value;
                setImageValue.classList.remove('on_board');
                setImageValue.classList.add('on_rack');
            }
            else {
                do {
                    random_index = getRandomInt(27);
                } while (ScrabbleTiles[random_index].remaining == 0);
                setImageValue.dataset.letter = ScrabbleTiles[random_index].letter;
                ScrabbleTiles[random_index].remaining = ScrabbleTiles[random_index].remaining - 1;
                console.log(origcount);
                origcount--;
                console.log(origcount);
                setImageValue.dataset.letval = ScrabbleTiles[random_index].value;
                setImageValue.classList.remove('on_board');
                setImageValue.classList.add('on_rack');
            }
            switch (document.getElementById("rindex_" + x).dataset.letter) {
                case "A":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/0.jpg')";
                    break;
                case "B":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/1.jpg')";
                    break;
                case "C":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/2.jpg')";
                    break;
                case "D":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/3.jpg')";
                    break;
                case "E":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/4.jpg')";
                    break;
                case "F":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/5.jpg')";
                    break;
                case "G":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/6.jpg')";
                    break;
                case "H":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/7.jpg')";
                    break;
                case "I":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/8.jpg')";
                    break;
                case "J":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/9.jpg')";
                    break;
                case "K":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/10.jpg')";
                    break;
                case "L":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/11.jpg')";
                    break;
                case "M":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/12.jpg')";
                    break;
                case "N":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/13.jpg')";
                    break;
                case "O":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/14.jpg')";
                    break;
                case "P":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/15.jpg')";
                    break;
                case "Q":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/16.jpg')";
                    break;
                case "R":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/17.jpg')";
                    break;
                case "S":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/18.jpg')";
                    break;
                case "T":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/19.jpg')";
                    break;
                case "U":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/20.jpg')";
                    break;
                case "V":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/21.jpg')";
                    break;
                case "W":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/22.jpg')";
                    break;
                case "X":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/23.jpg')";
                    break;
                case "Y":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/24.jpg')";
                    break;
                case "Z":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/25.jpg')";
                    break;
                case "_":
                    document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/26.jpg')";
                    break;
            }

            if (setImageValue.classList.contains('first_tile')) {
                setImageValue.classList.remove('first_tile');
                firstTile = "false";
            }

            $("#rindex_" + x).draggable("destroy");
            $("#rindex_" + x).draggable({
                cancel: "a.ui-icon",
                revert: "invalid",
                containment: "document",
                cursor: "move"
            });

            tiles_on_rack++;
        }
    }

    tiles_on_board = 0;
    console.log("tiles after submit: " + tiles_on_board); 
    firstTile = "true";

    for (var i = 0; i < board_arr.length; i++) {
        board_arr[i] = ' ';
    }
    jamaica == "false";
    document.getElementById('submit').style.visibility = "hidden";

    if (origcount < 7) {
        alert("CONGRATS! YOU WON THE GAME! Please press restart to play again");
    }
});

//****************************************************************************************** INITIALIZE GAME *****//
$(function start() {
    // hide submit button until word is valid//
    document.getElementById('submit').style.visibility = "hidden";

    firstTile = "true";
    // give each rack tile an initial value
    for (var x = 0; x < 7; x++) {
        // create the tiles randomly using the associative array
        random_index = getRandomInt(27);
        const setImageValue = document.getElementById("rindex_" + x);
        if (ScrabbleTiles[random_index].remaining != 0) {
            // set attributes and values
            setImageValue.dataset.letter = ScrabbleTiles[random_index].letter;
            ScrabbleTiles[random_index].remaining = ScrabbleTiles[random_index].remaining - 1;

            setImageValue.dataset.letval = ScrabbleTiles[random_index].value;

        }
        else {  // if distribution of a tile runs out, keep regenerating random nums until valid
            do {
                random_index = getRandomInt(27);
            } while (ScrabbleTiles[random_index].remaining == 0);
            setImageValue.dataset.letter = ScrabbleTiles[random_index].letter;
            ScrabbleTiles[random_index].remaining = ScrabbleTiles[random_index].remaining - 1;

            setImageValue.dataset.letval = ScrabbleTiles[random_index].value;
        }
        // massive switch case to determine what image to give each tile
        switch (document.getElementById("rindex_" + x).dataset.letter) {
            case "A":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/0.jpg')";
                break;
            case "B":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/1.jpg')";
                break;
            case "C":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/2.jpg')";
                break;
            case "D":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/3.jpg')";
                break;
            case "E":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/4.jpg')";
                break;
            case "F":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/5.jpg')";
                break;
            case "G":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/6.jpg')";
                break;
            case "H":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/7.jpg')";
                break;
            case "I":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/8.jpg')";
                break;
            case "J":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/9.jpg')";
                break;
            case "K":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/10.jpg')";
                break;
            case "L":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/11.jpg')";
                break;
            case "M":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/12.jpg')";
                break;
            case "N":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/13.jpg')";
                break;
            case "O":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/14.jpg')";
                break;
            case "P":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/15.jpg')";
                break;
            case "Q":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/16.jpg')";
                break;
            case "R":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/17.jpg')";
                break;
            case "S":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/18.jpg')";
                break;
            case "T":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/19.jpg')";
                break;
            case "U":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/20.jpg')";
                break;
            case "V":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/21.jpg')";
                break;
            case "W":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/22.jpg')";
                break;
            case "X":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/23.jpg')";
                break;
            case "Y":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/24.jpg')";
                break;
            case "Z":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/25.jpg')";
                break;
            case "_":
                document.getElementById("rindex_" + x).style.backgroundImage = "url('graphics_data/SCRABBLE_TILES_UPDATED/26.jpg')";
                break;
        }
        tiles_on_rack++;
        origcount--;
    }

});

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) { return Math.floor(Math.random() * max); }

function handle_drop(event, ui) {
    tiles_on_rack--;

    ui.draggable.addClass('dropped');
}
