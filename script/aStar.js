//---------------------A*--------------------------------------------------------------------------

function aStar(){
var steps = 0;
var matrixRows = 15, matrixCols = 15, matrixColors = 4;
// var sourRow = 3, sourCol = 10;
var row = sourRow, col = sourCol;
// var destRow = 8, destCol = 2;
// var prow = -1, pcol = -1;
var colorNO = 0;

class pointAstar{
  constructor(x, y, f, g){
    this.x = x;
    this.y = y;
    this.f = f;
    this.g = g;
  }
}

var indices = [new point(-1, 0), new point(0, -1), new point(1, 0), new point(0, 1)];

function validIndex(x, y){
  if(x<0 || y<0 || x>=matrixRows || y>=matrixCols)
    return false;
  return true;
}

function heuristic(x, y) {
  // This is the Manhattan distance
  var d1 = Math.abs (x - destRow);
  var d2 = Math.abs (y - destCol);
  return d1 + d2;
}

function findMinIndex(list){
  if(list.length == 0)
    console.log("Can't find min, list is empty.");
  var ans = 0;
  for(var x=1; x<list.length; x++){
    if(list[x].f < list[ans].f){
      ans = x;
    }
  }

  return ans;
}

var openL = [];
var temph = Math.abs (destRow - sourRow) + Math.abs (destCol - sourCol);
openL.push(new pointAstar(row, col, 0, 0));

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

var fnLoop = setInterval(change, 40);

function change(){

  if(STOP && !(row == sourRow && col == sourCol)){
    clearInterval(fnLoop);
    console.log("stopped!");
    STOP = 0;
    document.getElementById("msg").innerHTML = "A* : stopped! took " + steps + " steps!";
    return;
  }else{
    STOP = 0;
  }

  if(openL.length == 0){
    clearInterval(fnLoop);
    document.getElementById("msg").innerHTML = "A* : Target unreachable! took " + steps + " steps!";
    console.log("queue empty target not found!");
    return;
  }

  var ptIndex = findMinIndex(openL);
  var pt = openL[ptIndex];
  row = pt.x;
  col = pt.y;
  var g = pt.g;
  openL.splice(ptIndex, 1);

  steps++;

  var cell = document.getElementById("matrix").rows[row].cells[col];

  if(!visited[row][col]){
    console.log(row, col);

    if(row == destRow && col == destCol){
      clearInterval(fnLoop);
      cell.style.backgroundColor = "red";
      document.getElementById("msg").innerHTML = "A* took " + steps + " steps to reach target! <br><hr><br>[+] Click on Stop & Refresh => to create a new map. <br><br>[+] Click on Restart on same map => to try a different Algorithm on same map.";
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
        var nodeAstar = new pointAstar(indexX, indexY, g+1+heuristic(indexX, indexY), g+1);
        openL.push(nodeAstar);
        predecessor[indexX][indexY] = new point(row,col);
      }
    }
  }else{
  }
}
}