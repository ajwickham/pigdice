let player1 = new Player("1",0,0,[],0,0,["roll1","hold1","roll2","hold2"]);
let player2 = new Player("2",0,0,[],0,0,["roll2","hold2","roll1","hold1"]);

function Player(identity, previousTotal,currentRoll, currentTurn, currentTurnTotal,totalScore,hotButton) {
  this.identity = identity;
  this.previousTotal=previousTotal;
  this.currentRoll=currentRoll;
  this.currentTurn = currentTurn;
  this.currentTurnTotal = currentTurnTotal;
  this.totalScore = totalScore;
  this.hotButton = hotButton
}


Player.prototype.playerRoll = function() {
  debugger
  this.currentRoll = parseInt(Math.random()*6)+1;  //parseInt could return 0 but will not return 6
  
  this.currentTurn.push(this.currentRoll);
  if (this.currentRoll===1) {
    this.currentTurnTotal=0
    this.totalScore = ""
    this.showScore();
    this.currentTurn = [];
    this.hotButtons(true,false)
    if (this.identity==="1"&& player2.identity !="2") {
      player2.autoPlay(); 
      player2.hotButtons(true,false);
    }
    return
  }
  else {
    this.checkScore();
    this.showScore();
  }
};

Player.prototype.checkScore = function() {
  debugger
  this.totalScore = 0
  this.currentTurnTotal = 0
  for (let i=0; i< this.currentTurn.length; i++) {
    this.currentTurnTotal += this.currentTurn[i];
  };
  this.totalScore = this.previousTotal + this.currentTurnTotal
  if (this.totalScore >= 100) {
    alert("Winner with a score of "+ this.totalScore);
    return
  }
  return
}

Player.prototype.playerHold =function() {
  this.previousTotal+=this.currentTurnTotal
  this.currentRoll = "";
  this.currentTurn = [];
  this.totalScore = ""
  this.showScore();
  this.currentTurnTotal=0
  return;
}

Player.prototype.autoPlayCheck = function() {
  if (this.identity==="PC Easy" && this.currentTurn.length >=2) {
    return true
  }
  if (this.identity==="PC Hard" && this.currentTurnTotal >=20) {
    return true
  }
  if (this.currentRoll===1) {
    return true
  }
};


Player.prototype.autoPlay = function() {
  let pauseToView = function () {
    player2.playerHold();
  }
  for (let i=0; i< 20; i++) {
    player2.playerRoll();
    if (player2.autoPlayCheck()) {
      window.setTimeout(function(){ pauseToView() ;},4000);
      return
    }
  };
  
}

// User Interface Logic ---------


Player.prototype.showScore = function () {
  if (this.identity == "1") {
    $("#Player1Roll").html(this.currentRoll);
    $("#Player1CurrentTurn").html(this.currentTurn+"  ");
    $("#Player1TotalHeld").html(this.previousTotal);
    $("#Player1totalScore").html(this.totalScore);
  }
  if(this.identity != "1" ) {
    $("#Player2Roll").html(this.currentRoll);
    $("#Player2CurrentTurn").html(this.currentTurn+"  ");
    $("#Player2TotalHeld").html(this.previousTotal);
    $("#Player2totalScore").html(this.totalScore);
  }
};

Player.prototype.hotButtons = function(own,other) {
  for (let i=0; i< 2; i++) {
    document.getElementById(this.hotButton[i]).disabled = own;
  }
  for (let i=2; i< 4; i++) {
    document.getElementById(this.hotButton[i]).disabled = other;
  }
};


$(document).ready(function() {
  player2.identity = $("input:radio[name=player2]:checked").val(); 
      
    $(".radio").on("click",function () {
      player2.identity = $("input:radio[name=player2]:checked").val(); 
    });
  
    $("#roll1").click(function () {   
      player1.hotButtons(false,true);
      player1.playerRoll();
    }); 
    $("#hold1").click(function () {
      player2.hotButtons(false,true);
      player1.playerHold();
      if (player2.identity !=2 && player2.identity !=1) {
        player2.autoPlay();
        player2.hotButtons(true,false);
      }
    });
      
    $("#roll2").click(function () {   
      player2.hotButtons(false,true);
      player2.playerRoll();
    }); 
    $("#hold2").click(function () {
      player1.hotButtons(false,true);
      player2.playerHold();
    });      
});  
