$(document).ready(function () {
    //game object
    var gameObj = {
        //game characters
        characters: [
            thor = {
                name: "Thor",
                profile: "<img src='assets/images/thor.jpg'>",
                health: 150,
                baseAttack: 12,
                counterAttack: 17,
                youAttack: function () {
                    this.baseAttack += 12;
                }
            },
            starlord = {
                name: "Starlord",
                profile: "<img src='assets/images/starlord.jpg'>",
                health: 170,
                baseAttack: 10,
                counterAttack: 15,
                youAttack: function () {
                    this.baseAttack += 10;
                }
            },
            captAmer = {
                name: "Captain America",
                profile: "<img src='assets/images/captain.jpg'>",
                health: 200,
                baseAttack: 8,
                counterAttack: 12,
                youAttack: function () {
                    this.baseAttack += 8;
                }
            },
            groot = {
                name: "Groot",
                profile: "<img src='assets/images/groot.jpg'>",
                health: 130,
                baseAttack: 15,
                counterAttack: 20,
                youAttack: function () {
                    this.baseAttack += 15;
                }
            }
        ],
        //game variables 
        defended: false,
        numOpponentsDefeated: 0,
        // sets up the game
        startGame: function() {
            //loops through and sets up characters from above details
            for(var i = 0; i < this.characters.length; i++) {
                //create new character section
                var newChar = $("<div>");
                newChar.addClass("character animated"); //class
                newChar.data(this.characters[i]);
                newChar.html(this.characters[i].name + "<br>" + this.characters[i].profile);
                //create a stats section inside of character
                var charStats = $("<div>");
                charStats.attr("id", "hpPoints");
                charStats.text(this.characters[i].health);
                charStats.appendTo(newChar);
                //attach character section to characterList
                newChar.appendTo(".characterList"); 
            }
            //show characrerScreen
            $(".characterScreen").show();
            //hide defendZone 
            $(".defendZone").hide();
            //create Attack button
            var attackBtn = $("<button>");
            attackBtn.attr("id", "attack");
            attackBtn.text("Attack");
            $("#controls").append(attackBtn);
            $("#attack").hide();
            //create Reset button
            var resetBtn = $("<button>");
            resetBtn.attr("id", "reset");
            resetBtn.text("Reset");
            $("#controls").append(resetBtn);
            $("#reset").hide();

        } ,
        // sets up player stats 
        playerPick: function (player) {
            console.log(player)
            player.addClass("player").removeClass("character"); //class
            player.appendTo(".player-place");
            player.hide();
            $("#player-img").append(player.data().profile);
            $("#name").text("Name: " + player.data().name);
            this.updateStats(player.data());
        },
        // places enemies in enemyList
        enemySetUp : function () {
            $(".character").not(this).each(function () {
                $(this).removeClass("character").addClass("enemy"); //class
                $(this).appendTo(".enemyList");
            });
            $(".characterScreen").hide();
        },
        //takes chosen enemy and places him in defender Zone
        enemySelect : function (chosenWarrior) {
            if(!this.defended) {
                chosenWarrior.removeClass("enemy").addClass("defender"); //class
                $(".defendZone").append("Defender:");
                chosenWarrior.appendTo(".defendZone");
                $("#attack").show();
                $(".defendZone").show();
                this.defended = true;
            }
        },
        //attack actions
        attack: function() {
            // sets up player and villian stats
            console.log("Attack: " + $(".player").data().baseAttack);
            var player = $(".player").data();
            var defender = $(".defender").data();
            //exchange attacks
            player.health -= defender.counterAttack;
            defender.health -= player.baseAttack;
            //checks win
            var logInfo  = this.checkWin(player, defender);
            //records battle
            this.logBattle(player, defender, logInfo);
            //Increase Attack
            player.youAttack();
            // update battle infomation 
            this.updateStats(player, defender);
            console.log("Attack after: " + player.baseAttack);
        },
        //updates the stats
        updateStats: function (hero, villian) {
            //prints player stats
            $("#health").text("Health: "  + hero.health);
            $("#atk").text("Attack: " + hero.baseAttack);
            //if no villian is defined
            if (villian != undefined) {
                $(".defender #hpPoints").text(villian.health);
            }
        },
        //check to see if you won the battle or the war
        checkWin: function (hero, villian) {
            //Intialize log intry with blank string
            var check = "";
            if(hero.health <= 0) {
                //you Lose
                check = "You lose. Better luck next time. <br>----Game Over-----<br><br>";
                $(".player").removeClass("player");
                $("#attack").hide();
                //show lose
                $(".defendZone").append("You Lose");
                //shows reset button
                $("#reset").show();
            }
            else if(villian.health <= 0) {
                //you won the battle
                //change the zone
                $(".defender").removeClass("defender");
                $(".defendZone").empty();
                //increase opponents defeated
                this.numOpponentsDefeated ++;
                //update Log with win battle condition
                check = "You defeated " + villian.name + ". Pick another opponent to fight.<br><br>";
                //aviable to pick another opponent
                this.defended = false;
                $("#attack").hide();
                $(".defendZone").hide();
                //checks if player won the game
                if(this.numOpponentsDefeated === 3) {
                    //you won the war
                    //update Log with win war conditon
                    check = "You won. Congrats, you are a Guardian of the Galaxy or an Avenger.<br>"
                               + "----GAME OVER----<br><br>"
                    //show win 
                    $(".defendZone").show();
                    $(".defendZone").append("You Win!");
                    //show reset button
                    $("#reset").show();
                }
            }
            return check;
        },
        // log your battle info
        logBattle: function (hero, villian, game) {
            var event = $("<p>");
            if(game === "") {
                event.html("You attacked " + villian.name + " for " + hero.baseAttack + ".<br>" +
                        villian.name + " attacked you for " + villian.counterAttack + ".<br><br>");
            }
            else {
                event.html(game);
            }
            $(".log").prepend(event);
        },
        clearGame: function () {
            $(".player-place").empty();
            $("#player-img").empty();
            $("#name").empty();
            $("#health").empty();
            $("#atk").empty();
            $(".enemyList").empty();
            $("#controls").empty();
            $(".log").empty();
            $(".defendZone").empty();
            this.startGame();
            this.numOpponentsDefeated = 0;
            this.defended = false;
        }
    }
    // start and set up game
    gameObj.startGame();
    //picking your player
    $(".characterList").on("click", ".character", function () {
        gameObj.playerPick($(this));
        gameObj.enemySetUp();
    });
    //pick your opponent
    $(".enemyList").on("click", ".enemy", function () {
        gameObj.enemySelect($(this));
    });
    //attack the defender
    $("#controls").on("click", "#attack", function () {
        console.log("You clicked");
        gameObj.attack();
    });
    //resart game
    $("#controls").on("click", "#reset", function () {
        gameObj.clearGame();
    });
});