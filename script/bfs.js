//---------------------BFS--------------------------------------------------------------------------

function bfs(){
var steps = 0;
var matrixRows = 15, matrixCols = 15, matrixColors = 4;
// var sourRow = 3, sourCol = 10;
var row = sourRow, col = sourCol;
// var destRow = 8, destCol = 2;
// var prow = -1, pcol = -1;
var colorNO = 0;

// class point{
//   constructor(x, y){
//     this.x = x;
//     this.y = y;
//   }
// }

var indices = [new point(-1, 0), new point(0, -1), new point(1, 0), new point(0, 1)];

function validIndex(x, y){
  if(x<0 || y<0 || x>=matrixRows || y>=matrixCols)
    return false;
  return true;
}

class queue{
  constructor(){
    this.data = [];
  }
  push(x){
    this.data.push(x);
  }
  pop(){
    if(this.data.length == 0){
      console.log("queue underflow!");
    }else{
      return this.data.shift();
    }
  }
  peek(){
    if(this.data.length == 0){
      console.log("queue empty!");
    }else{
      return this.data[0];
    }
  }
  empty(){
    return this.data.length == 0;
  }
}



var q = new queue();
q.push(new point(row, col));

var visited = Create2DArray(15);

for(var i=0; i<15; i++){
  for(var j=0; j<15; j++){
    visited[i].push(false);
  }
}

for(var i=0; i<blockedCells.length; i++){
  var x = blockedCells[i].x, y = blockedCells[i].y;
  console.log("x y " + x+" "+y);
  visited[x][y]=  true;
}

function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}

var predecessor = Create2DArray(15);      //store the predecessor of each cell.. i.e the cell from which this is reached.. so that we can follow this and print shortest path
for(var i=0; i<15; i++){
  for(var j=0; j<15; j++){
    visited[i].push(new point(0, 0));
  }
}

var fnLoop = setInterval(change, 50);

function change(){

  if(STOP && !(row == sourRow && col == sourCol)){
    clearInterval(fnLoop);
    console.log("stopped!");
    STOP = 0;
    document.getElementById("msg").innerHTML = "BFS : stopped! took " + steps + " steps!";
    return;
  }else{
    STOP = 0;
  }

  if(q.empty()){
    clearInterval(fnLoop);
    document.getElementById("msg").innerHTML = "BFS : Target unreachable! took " + steps + " steps!";
    console.log("queue empty target not found!");
    return;
  }

  var pt = q.pop();
  row = pt.x;
  col = pt.y;
  steps++;

  var cell = document.getElementById("matrix").rows[row].cells[col];

  if(!visited[row][col]){
    console.log(row, col);

    if(row == destRow && col == destCol){
      clearInterval(fnLoop);
      cell.style.backgroundColor = "red";
      document.getElementById("msg").innerHTML = "BFS took " + steps + " steps to reach target! <br><hr><br>[+] Click on Stop & Refresh => to create a new map. <br><br>[+] Click on Restart on same map => to try a different Algorithm on same map.";
      console.log("found target!");

      var tempx = destRow, tempy = destCol, tempz;    //keep going to predecessors of each cell iteratively to form shortest path
      while(!(predecessor[tempx][tempy].x == sourRow && predecessor[tempx][tempy].y == sourCol)){             //color the shortest path from dest till source except these two
        var tempCell = document.getElementById("matrix").rows[predecessor[tempx][tempy].x].cells[predecessor[tempx][tempy].y];
        tempCell.style.backgroundColor = "#fada5e";
        tempz = tempx;
        tempx = predecessor[tempx][tempy].x;
        tempy = predecessor[tempz][tempy].y;
      }

      return;
    }

    if(row == sourRow && col == sourCol){
      cell.style.backgroundColor = "green";
    }else{
      cell.style.backgroundColor = "#0074D9";
      cell.style.boxShadow = "2px 2px 10px 2px white";
      cell.style.borderStyle = "dashed";
      cell.style.borderColor = "black";
    }

    visited[row][col] = true;
    for(var i=0; i<4; i++){
      var indexX = row+indices[i].x, indexY = col+indices[i].y;
      if(validIndex(indexX, indexY) && !visited[indexX][indexY]){
        q.push(new point(indexX, indexY));
        predecessor[indexX][indexY] = new point(row,col);
      }
    }
  }else{
  }
}
}