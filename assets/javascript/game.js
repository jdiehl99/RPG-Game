// assign health points & attack points to each fighter
var mamaAttack = 8;
var mamaHP = 120;
var vtAttack = 5;
var vtHP = 100;
var piperAttack = 20;
var piperHP = 150;
var macAttack = 25;
var macHP = 180;

// upon selection of fighter, move remaining 3 fighters to "enemies available to attack" area
// upon selection of defender, move selected defender to "defender" area
// when attack button is pressed, reduce HP on defender & attacker per original values
// on each subsequent attack, attacker attack points will increase by starting number (ie: attack 2 = 4+4 if starting at 4)
// defender attack points do not change
// game continues until attacker or defender reaches zero HP
// if defender wins, game is over
// if attacker wins, defender disappears and player may select new defender
// upon pressing attack, previous attack store for player is used and continues to build incrementally
// game continues until player has lost all HP or all defenders have been defeated
// upon game end all fighters are reset to original locations and all attack/HP points are reset to original values after pressing reset button
// if player presses attack with no defender selected, show error message

// Mama Murphy 120 / 8
// Vault-Tec 100 / 5
// Piper 150 / 20
// Maccready 180 / 25 


$(document).ready(function () {

    // offer option to play background music
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "assets/sounds/music.mp3");
    $(".theme-button").on("click", function () {
        audioElement.play();
    });
    $(".pause-button").on("click", function () {
        audioElement.pause();
    });


    $(".fighter").on('click', function () {
        var clickedFighter = $(this).val();
        console.log('clickedFighter', clickedFighter);
        fighter = clickedFighter;
        $("#chosen").html("<img src=\"assets/images/" + fighter + ".png\" class=\"" + fighter + "\">");
        $("." + fighter).empty();
    });

});
