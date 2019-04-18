const Discord = require('discord.js');
const client = new Discord.Client();
const mantas = require('./modules/mantas.js');

const game_logic = require('./modules/game_logic');

grid = [];
turn = 0;
function main(){

  client.on('ready', function () {
    console.log("REee");
    victim = null;
    startApp();

  });
  client.on("message",function(msg){
    command = msg.content.split(" ");
  if(command[0] == "!challenge"){
    if (msg.mentions.users.size >= 1){ victim = msg.mentions.users.values().next().value.id;}
    usr = msg.mentions.users.array();
    console.log(usr);
    console.log(usr[1].username);
    msg.mentions.users.forEach(function(key,val){

        //console.log(Object.keys(key)[0]);

    })
    challenger = msg.author.id;
    msg.channel.send(msg.author.username + " Has challenged " + command[2]);
    game = command[1];
    console.log(challenger +" challenged " + victim +" to "+game);
  }else if (command[0] == "!accept" && victim == msg.author.id){
    console.log(victim +" accepted " + challenger + "challenge");
    ids = [challenger,victim];
    switch(game){

      case "connect" : start_connect(challenger,victim,msg.channel); break;
    }
  }
  else if (command[0] == "play" && msg.author.id == ids[turn]){
    col = (turn == 0)? 'b': 'r';
      w = putgrid(col,command[1]);
      turn = (turn == 0) ? 1 : 0;
      if(w == -1){
      printgird(msg.channel,turn,players);
    }else{
      printgird(msg.channel,turn,players);
      str = players[w];
      msg.channel.send("THE WINNER IS "+str);
    }
  }
  })


}
function start_connect(p1,p2,chan){
  startApp();
  playername1 = client.users.get(p1).username;
  playername2 = client.users.get(p2).username;
  players = [playername1,playername2];
str = '';
str += playername1+" is :large_blue_circle:\n";
str += playername2+" is :red_circle:";
turn = 0;
chan.send(str);
printgird(chan,turn,players);


}

function putgrid(colour,line){
if(line > 0 && line < 8){
  line -= 1;

  for(var j = 0; j < 6; j++){
    put = false;
      if(grid[line][j+1] != ":black_circle:" || j == 5){
        str = ""
        if(colour == 'r'){str =":red_circle:";put = true;}
        if(colour == 'b'){str =":large_blue_circle:";put = true;}
        if (put) {grid[line][j] = str};
        winner = game_logic.start(grid)
        if ( winner != -1){
            return winner;
        }
        return -1;
      }
  }
}
}
function startApp(chan) {
  grid = [];
  str = "";

    for(var j = 0; j < 7;j++){
      grid[j] = new Array(6);
    }
    for(var i = 0; i < 6; i++){
      for(var j = 0; j < 7;j++){
        grid[j][i] = ":black_circle:";
      }


    }




  //game_logic.start();
}
function printgird(chan,turn,players){
  str = ":one::two::three::four::five::six::seven:\n";
  for(var i = 0; i < 6; i++){
    for(var j = 0; j < 7;j++){
      str += grid[j][i];
    }
    str += "\n";

  }
  chan.send("It is currently " + players[turn] + "'s turn");
  chan.send(str);
}

(function () {
  client.login('NDczNTQzNzAzMTQ3ODM5NDg4.DkDdkg.p4yB7OHZWbiSN_lGC_wZZSgvVWM');
  main();
})();
