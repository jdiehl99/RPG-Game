// assign health points & attack points to each fighter
var playerAtt = 0;
var playerHP = 0;
var defenderAtt = 0;
var defenderHP = 0;
var playerAttCurr = 0;
var fighterA = "";
var defenderA = "";
var defenderB = "";
var defenderC = "";

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

function damAttack(defHP, defAP, attHP, attAP, attCurr) {
    playerAttCurr = parseInt(attAP) + parseInt(attCurr);
    defenderHP = parseInt(defHP) - playerAttCurr;
    playerHP = parseInt(attHP) - parseInt(defAP);
}

$(document).ready(function () {
    // offer option to play background music
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "assets/sounds/music.mp3");
    var gunElement = document.createElement("audio");
    gunElement.setAttribute("src", "assets/sounds/SuperSledge.mp3");

    $(".theme-button").on("click", function () {
        audioElement.play();
    });
    $(".pause-button").on("click", function () {
        audioElement.pause();
    });

    // create buttons for each fighter
    for (i = 0; i < playerChoices.length; i++) {
        console.log(playerChoices);
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
        $(".fighter").each(function () {
            $(this).off("click");
        });

        playerAtt = $("." + fighterA).attr('attack-val');
        playerAttCurr = 0;
        console.log("attcur line 75", playerAttCurr);
        playerHP = $("." + fighterA).attr('hp-val');

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

            defenderAtt = $("." + defenderA).attr('attack-val');
            defenderHP = $("." + defenderA).attr('hp-val');
            defenderDisplay = defenderA;
        });
    });

    // take action when attack is pressed
    $(".btn-attack").on("click", function () {
        gunElement.play();
        damAttack(defenderHP, defenderAtt, playerHP, playerAtt, playerAttCurr);
        if (playerHP <= 0) { // player loses, game over
            $("#gamestatus").html("<p class=\"status\">You Lost!!</p><input type=\"button\" value=\"Restart\" onClick=\"window.location.reload()\">");
           
        } else if (defenderHP <= 0) {
            if (activeFighters.length == 0) { // are there any enemies left?
                $('#defender').empty();
                $("#gamestatus").html("<p class=\"status\">You Win!!</p><input type=\"button\" value=\"Restart\" onClick=\"window.location.reload()\">");
            } else {
                //  alert("Defender lost!");
                $('#defender').empty();
                $('#enemies').empty();
                $("#gamestatus").html("<p class=\"status\">You have defeated " + defenderDisplay + ". You may choose a new enemy.</p>");

                // determine if this is last defender
                if (activeFighters.length == 1) { // yes last defender 
                    // run for loop on remaining enemies array
                    for (l = 0; l < activeFighters.length; l++) {
                        var activeFightersBtn = $("<button id=" + activeFighters[l].fighter + "><img src=\"assets/images/" + activeFighters[l].fighter + ".png\" class=" + activeFighters[l].fighter + "><p class=\"hp-" + activeFighters[l].fighter + " " + activeFighters[l].fighter + " text-center\">" + activeFighters[l].hp + "</p>")
                            .addClass("defender2 " + activeFighters[l].fighter)
                            .attr("value", activeFighters[l].fighter)
                            .attr("attack-val", activeFighters[l].attack)
                            .attr("hp-val", activeFighters[l].hp);
                        $("#enemies").append(activeFightersBtn);
                        defenderC = activeFighters[l].fighter;
                    }
                    activeFighters.pop();
                    defenderDisplay = defenderC;
                    defenderAtt = $("." + defenderC).attr('attack-val');
                    defenderHP = $("." + defenderC).attr('hp-val');
                } else { // not last defender
                    // run for loop on remaining enemies array
                    for (k = 0; k < activeFighters.length; k++) {
                        var activeFightersBtn = $("<button id=" + activeFighters[k].fighter + "><img src=\"assets/images/" + activeFighters[k].fighter + ".png\" class=" + activeFighters[k].fighter + "><p class=\"hp-" + activeFighters[k].fighter + " " + activeFighters[k].fighter + " text-center\">" + activeFighters[k].hp + "</p>")
                            .addClass("defender2 " + activeFighters[k].fighter)
                            .attr("value", activeFighters[k].fighter)
                            .attr("attack-val", activeFighters[k].attack)
                            .attr("hp-val", activeFighters[k].hp);
                        $("#enemies").append(activeFightersBtn);
                    }
                    // select a defender
                    $(".defender2").on('click', function () {
                        var clickedDefender = $(this).val();
                        defenderB = clickedDefender;
                        console.log("defender B", defenderB);
                        // update array to remove chosen fighter
                        var isplice = activeFighters.findIndex(kk => kk.fighter === defenderB);
                        if (i != -1) {
                            activeFighters.splice(isplice, 1);
                        }
                        $("#" + defenderB).appendTo("#defender");
                        defenderDisplay = defenderB;
                        defenderAtt = $("." + defenderB).attr('attack-val');
                        defenderHP = $("." + defenderB).attr('hp-val');
                    });
                }
            }
        } else {
            $("#gamestatus").html("<p class=\"status\">You attacked " + defenderDisplay + " for " + playerAttCurr + " damage.</p><p class=\"status\">" + defenderDisplay + " attacked you for " + defenderAtt + " damage.</p>");
            $(".hp-" + fighterA).html("<p class=\"hp-" + fighterA + " " + fighterA + " text-center\">" + playerHP + "</p>");
            $(".hp-" + defenderDisplay).html("<p class=\"hp-" + defenderDisplay + " " + defenderDisplay + " text-center\">" + defenderHP + "</p>");
        }
    });
});