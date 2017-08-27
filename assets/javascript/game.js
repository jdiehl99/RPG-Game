// assign health points & attack points to each fighter
var mamaAttack = 8;
var mamaHP = 120;
var vtAttack = 5;
var vtHP = 100;
var piperAttack = 20;
var piperHP = 150;
var macAttack = 25;
var macHP = 180;


var playerChoices = [
    { "fighter": "maccready", "attack": "25", "hp": "180" },
    { "fighter": "mama_murphy", "attack": "8", "hp": "120" },
    { "fighter": "piper", "attack": "20", "hp": "150" },
    { "fighter": "vault_tec", "attack": "5", "hp": "100" }
];

var activeFighters = [ // working array for enemies
    { "fighter": "maccready", "attack": "25", "hp": "180" },
    { "fighter": "mama_murphy", "attack": "8", "hp": "120" },
    { "fighter": "piper", "attack": "20", "hp": "150" },
    { "fighter": "vault_tec", "attack": "5", "hp": "100" }
];

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

// need array to hold fighters
// once selected, array will need to remove selected fighter
// as each defender is defeated, array will need to udpate again

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

    // create buttons for each fighter
    for (i = 0; i < playerChoices.length; i++) {
        var playerChoicesBtn = $("<button><img src=\"assets/images/" + playerChoices[i].fighter + ".png\" class=" + playerChoices[i].fighter + "><p class=" + playerChoices[i].fighter + " text-center\">" + playerChoices[i].hp + "</p>")
            .addClass("fighter " + playerChoices[i].fighter)
            .attr("value", playerChoices[i].fighter)
            .attr("attack-val", playerChoices[i].attack)
            .attr("hp-val", playerChoices[i].hp);
        $("#fighters").append(playerChoicesBtn);
    }

    // select a fighter
    $(".fighter").on('click', function () {
        var clickedFighter = $(this).val();
        fighterA = clickedFighter;
        // remove enemies from active block
        $('#fighters').find('*').not('.' + fighterA + '').remove();

        // update array to remove chosen fighter
        var isplice = activeFighters.findIndex(jj => jj.fighter === fighterA);

        if (i != -1) {
            activeFighters.splice(isplice, 1);
        }

        // move remaining fighters to defender section
        // run for loop on updated array
        for (j = 0; j < activeFighters.length; j++) {
            var activeFightersBtn = $("<button><img src=\"assets/images/" + activeFighters[j].fighter + ".png\" class=" + activeFighters[j].fighter + "><p class=" + activeFighters[j].fighter + " text-center\">" + activeFighters[j].hp + "</p>")
                .addClass("defender " + activeFighters[j].fighter)
                .attr("value", activeFighters[j].fighter)
                .attr("attack-val", activeFighters[j].attack)
                .attr("hp-val", activeFighters[j].hp);
            $("#enemies").append(activeFightersBtn);
        }

        // select a defender
        $(".defender").on('click', function () {
            var clickedDefender = $(this).val();
            defenderA = clickedDefender;
            console.log("chosen defender", defenderA);
            // remove defender from enemies block
          //  $('#enemies').find('*').not('.' + defenderA + '').remove();

            // update array to remove chosen fighter
            var isplice = activeFighters.findIndex(kk => kk.fighter === defenderA);

            if (i != -1) {
                activeFighters.splice(isplice, 1);
            }
console.log(activeFighters);
        });

        // move selected enemy to defender section
        //  $("."link-field-first-ticket-button"").appendTo(".event-location-one");

    });
});