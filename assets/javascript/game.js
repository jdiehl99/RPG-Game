// assign health points & attack points to each fighter
var playerAtt = 0;
var playerHP = 0;
var defenderAtt = 0;
var defenderHP = 0;
var fighterA = "";
var defenderA = "";
var playerAttCurr = "";

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

function damIncrease(attAP,attCurr) {
    playerAttCurr = parseInt(attAP) + parseInt(attCurr);
    console.log("player current attack",playerAttCurr);
}

function damAttack(defHP,defAP,attHP,attAP,attCurr) {
    defenderHP = parseInt(defHP) - parseInt(attAP);
    playerHP = parseInt(attHP) - parseInt(defAP);
}

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
        var playerChoicesBtn = $("<button><img src=\"assets/images/" + playerChoices[i].fighter + ".png\" class=" + playerChoices[i].fighter + "><p class=\"hp-" + playerChoices[i].fighter + " " + playerChoices[i].fighter + " text-center\">" + playerChoices[i].hp + "</p>")
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
        $(".fighter").each(function(){
            $(this).off("click");
        })

        // move remaining fighters to defender section
        // run for loop on updated array
        for (j = 0; j < activeFighters.length; j++) {
            var activeFightersBtn = $("<button id=" + activeFighters[j].fighter + "><img src=\"assets/images/" + activeFighters[j].fighter + ".png\" class=" + activeFighters[j].fighter + "><p class=\"hp-" + activeFighters[j].fighter + " " + activeFighters[j].fighter + " text-center\">" + activeFighters[j].hp + "</p>")
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
            // update array to remove chosen fighter
            var isplice = activeFighters.findIndex(kk => kk.fighter === defenderA);
            if (i != -1) {
                activeFighters.splice(isplice, 1);
            }
            $("#" + defenderA).appendTo("#defender");

            playerAtt = $("." + fighterA).attr('attack-val');
            playerAttCurr = $("." + fighterA).attr('attack-val');
            playerHP = $("." + fighterA).attr('hp-val');
            defenderAtt = $("." + defenderA).attr('attack-val');
            defenderHP = $("." + defenderA).attr('hp-val');

        });
    });

    // take action when attack is pressed
    $(".btn-attack").on("click",function () {

        console.log("fighterA",fighterA);
        console.log("defenderA",defenderA);

        console.log("player attack", playerAtt);
        console.log("defender attack", defenderAtt);

        damIncrease(playerAtt,playerAttCurr);
        damAttack(defenderHP,defenderAtt,playerHP,playerAtt);

        if (playerHP <= 0) { // player loses, game over
            alert("You lost!");
        } else if (defenderHP <= 0) {
            alert("Defender lost!");
        } else {
            $("#gamestatus").html("<p class=\"status\">You attacked " + defenderA + " for " + playerAttCurr + " damage.</p><p class=\"status\">" + defenderA + " attacked you for " + defenderAtt + " damage.</p>");
            $(".hp-" + fighterA).html("<p class=\"hp-" + fighterA + " " + fighterA + " text-center\">" + playerHP + "</p>");
            $(".hp-" + defenderA).html("<p class=\"hp-" + defenderA + " " + defenderA + " text-center\">" + defenderHP + "</p>");
        }
    });
});