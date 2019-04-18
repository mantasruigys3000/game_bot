var exports = module.exports = {};

exports.start = function (g,emojies) {
  grid = g;
  tempstate = null;
  for(y = 0; y < 6;y++){
    for(x = 0; x <7;x++){
      if(grid[x][y] == ":black_circle:"){
        tempstate = null;
        //break;
      }else{
        tempstate = grid[x][y];
      }
      for(var c = 0; c < 8; c++){
			mathes = 0;

			switch(c){
				case 0: modx = 1; mody = 0; break;
				case 1: modx = 0; mody = 1; break;
				case 2: modx = 1; mody = 1; break;
				case 3: modx = -1; mody = 0; break;
				case 4: modx = 0; mody = -1; break; // lol whats the point in this? i dont know lmao;
				case 5: modx = -1; mody = -1; break;
				case 6: modx = 1; mody = -1; break;
				case 7: modx = -1; mody = 1; break;
		    }


			for(var j = 1; j < 4; j++){
        if((j*modx) + x > 6 || (j*mody) + y > 5 || (j*modx) + x < 0|| (j*mody) + y < 0) {break;}

				if(grid[(j*modx) + x][(j*mody) + y] != tempstate){
          break;
        }
        if(grid[(j*modx) + x][(j*mody) + y] == tempstate && j==3){
          r = (tempstate == emojies[1])? 1 : 0;
            console.log("Game logic returning " + r);
          return r

        }

			}

    }
  }
}
return -1;
console.log("Game logic returning " + -1);
}
