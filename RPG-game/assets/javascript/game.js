$(document).ready(function () {
    var characters = [
        luke = {
            name: "Luke",
            health: 100,
            baseAttack: 6,
            attackPoints: 6,
            counterAttack: 6
        },
        obe = {
            name: "Obe-Wan",
            health: 120,
            baseAttack: 8,
            attackPoints: 8,
            counterAttack: 8
        },
        vadar = {
            name: "Darth Vador",
            health: 180,
            baseAttack: 15,
            attackPoints: 15,
            counterAttack: 15
        },
        solo = {
            name: "Han Solo",
            health: 200,
            baseAttack: 20,
            attackPoints: 20,
            counterAttack: 20
        }
    ];
    var defend = false;
    setUp();
    //pick your character
    $(".character").on("click", function () {
        $(this).addClass("player").removeClass("character").off("click");
        $(".playerHere").append(this);
        $(".character").not(this).each(function () {
            $(this).removeClass("character").addClass("enemy").off("click");
            $(this).appendTo(".enemiesHere");
        });
    });
    //pick your opponent  
    $(document).on("click", ".enemy", function () {
        if (!defend) {
            $(this).removeClass("enemy").addClass("defender");
            $(this).appendTo(".defenderHere");
            $("#attack").show();
            defend = true;
        }
    });
    //attack the defender
    $(document).on("click", "#attack", function () {
        console.log("Health: " + $(".player").data().health);
        console.log("Attack: " + $(".player").data().attackPoints);
        var player = $(".player").data();
        var defender = $(".defender").data();
        player.health -= defender.counterAttack;
        defender.health -= player.attackPoints;
        player.attackPoints += player.baseAttack;
        if (player.health <= 0) {
            //lose
            alert("You lose. Press OK to play again.");
            setUp();
        }
        if (defender.health <= 0) {
            //win
            $(".defender").removeClass("defender").hide();
            $("#attack").hide();
            defend = false;
        }
    });
    //setting up the page
    function setUp() {
        $(".playerHere").empty();
        $(".defenderHere").empty();
        $(".enemiesHere").empty();
        $("#controls").empty();
        for (var i = 0; i < characters.length; i++) {
            var addChar = $("<div>");
            addChar.addClass("character");
            addChar.data(characters[i]);
            addChar.text(characters[i].name);
            $(".charactersHere").append(addChar);
            console.log(characters[i]);

        }
        //create button
        var attackBtn = $("<button>");
        attackBtn.attr("id", "attack");
        attackBtn.text("Attack");
        $("#controls").append(attackBtn);
        $("#attack").hide();
    }
});