$(document).ready(function() {
    var gameObj = {
        wins: 0,
        losses: 0,
        randomNum: 0,
        score: 0,
        endSaying: "",
        gemValue: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] ,
        gameStart: function() {
            this.randomNum = Math.floor((Math.random() * 30) + 19);
            $("#randNum").text(this.randomNum);
            this.gemValue.sort(function() { return 0.5 - Math.random() });
            console.log(this.gemValue)
            $("#dark-gem").attr("value", this.gemValue[0]);
            console.log(this.gemValue[0]);
            $("#green-gem").attr("value", this.gemValue[1]);
            console.log(this.gemValue[1]);
            $("#blue-gem").attr("value", this.gemValue[2]);
            console.log(this.gemValue[2]);
            $("#purple-gem").attr("value", this.gemValue[3]);
            console.log(this.gemValue[3]);
            this.score = 0;
            $("#score").text("0");
        } ,
        youWin: function () {
            this.wins ++;
            console.log("Wins: " + this.wins);
        } ,
        youLose: function () {
            this.losses ++;
            console.log("Losses: " + this.losses);
        } ,
        printCounters : function () {
            $("#counter").html(this.endSaying + "<br>Wins: " + this.wins +
                                    "<br>Loses: " + this.losses);
            this.gemValue = [];
        }
    }
    gameObj.gameStart();
    $(".gems").on("click", function () {
        
        gameObj.score += parseInt($(this).attr("value"));
        
        console.log("Score: " + gameObj.score);

        if(gameObj.score === gameObj.randomNum) {
            gameObj.youWin();
            gameObj.gameStart();
            gameObj.endSaying ="Congrats! You won.";
            gameObj.printCounters();
        }
        else if(gameObj.score > gameObj.randomNum) {
            gameObj.youLose();
            gameObj.gameStart();
            gameObj.endSaying = "Too Bad! You lose.";
            gameObj.printCounters();
        }
        $("#score").text(gameObj.score);
    });
});