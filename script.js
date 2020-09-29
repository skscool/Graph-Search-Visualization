var sourRow = 3, sourCol = 10;
var destRow = 8, destCol = 2;
var STOP = 0;   //0 idle 1 stopped 9 running
var matrix = document.getElementById("matrix");
for (var i = 0; i < matrix.rows.length; i++) {
    for (var j = 0; j < matrix.rows[i].cells.length; j++){
      var cell = matrix.rows[i].cells[j];
      cell.onclick = function(){
        setSource(this);
      };
    }
}

function reset(){
  STOP = 1;
  var matrix = document.getElementById("matrix");
  for (var i = 0; i < matrix.rows.length; i++) {
      for (var j = 0; j < matrix.rows[i].cells.length; j++){
        var cell = matrix.rows[i].cells[j];
        cell.innerHTML = "";
        cell.style.backgroundColor = "black";
        cell.style.borderColor = "white";
        cell.style.borderStyle = "solid";;
        cell.style.boxShadow = "";
        cell.onclick = function(){
          setSource(this);
        };
      }
  }

}

function setSource(cell) {
    // var matrix = document.getElementById("matrix");
    // matrix.rows[sourRow].cells[sourCol].style.backgroundColor = "black";
    // matrix.rows[sourRow].cells[sourCol].innerHTML = "";
    // matrix.rows[destRow].cells[destCol].style.backgroundColor = "black";
    // matrix.rows[destRow].cells[destCol].innerHTML = "";
    cell.innerHTML = "S";
    cell.style.backgroundColor = "green";
    sourRow = cell.parentElement.rowIndex;
    sourCol = cell.cellIndex;
    //var matrix = document.getElementById("matrix");
    for (var i = 0; i < matrix.rows.length; i++) {
        for (var j = 0; j < matrix.rows[i].cells.length; j++){
          var cell = matrix.rows[i].cells[j];
          cell.onclick = function(){
            setDestination(this);
          };
        }
    }
}

function setDestination(cell) {
    cell.innerHTML = "D";
    cell.style.backgroundColor = "Red";
    destRow = cell.parentElement.rowIndex;
    destCol = cell.cellIndex;
    var matrix = document.getElementById("matrix");
    for (var i = 0; i < matrix.rows.length; i++) {
        for (var j = 0; j < matrix.rows[i].cells.length; j++){
          var cell = matrix.rows[i].cells[j];
          cell.onclick = function(){
            setSource(this);
          };
        }
    }
}

function dfs(){
var steps = 0;
var matrixRows = 15, matrixCols = 15, matrixColors = 4;
// var sourRow = 3, sourCol = 10;
var row = sourRow, col = sourCol;
// var destRow = 8, destCol = 2;
// var prow = -1, pcol = -1;
var colorNO = 0;

class point{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

var indices = [new point(-1, 0), new point(0, -1), new point(1, 0), new point(0, 1)];

function validIndex(x, y){
  if(x<0 || y<0 || x>=matrixRows || y>=matrixCols)
    return false;
  return true;
}

class stack{
  constructor(){
    this.data = [];
  }
  push(x){
    this.data.push(x);
  }
  pop(){
    if(this.data.length == 0){
      console.log("stack underflow!");
    }else{
      return this.data.pop();
    }
  }
  peek(){
    if(this.data.length == 0){
      console.log("stack empty!");
    }else{
      return this.data[this.data.length-1];
    }
  }
  empty(){
    return this.data.length == 0;
  }
}



var stk = new stack();
stk.push(new point(row, col));

var visited = Create2DArray(15);

for(var i=0; i<15; i++){
  for(var j=0; j<15; j++){
    visited[i].push(false);
  }
}


function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}

var fnLoop = setInterval(change, 50);

function change(){

  if(STOP && !(row == sourRow && col == sourCol)){
    clearInterval(fnLoop);
    console.log("stopped!");
    STOP = 0;
    document.getElementById("msg").innerHTML = "DFS took " + steps + " steps to reach target!";
    return;
  }else{
    STOP = 0;
  }

  if(stk.empty()){
    clearInterval(fnLoop);
    document.getElementById("msg").innerHTML = "DFS took " + steps + " steps to reach target!";
    console.log("loop end");
    return;
  }

  var pt = stk.pop();
  row = pt.x;
  col = pt.y;
  steps++;
  console.log(sourRow, sourCol);
  if(!visited[row][col]){
    console.log(row, col);
    var cell = document.getElementById("matrix").rows[row].cells[col];

    if(row == destRow && col == destCol){
      clearInterval(fnLoop);
      cell.style.backgroundColor = "red";
      document.getElementById("msg").innerHTML = "DFS took " + steps + " steps to reach target!";
      console.log("found target!");
      return;
    }

    if(row == sourRow && col == sourCol){
      cell.style.backgroundColor = "green";
    }else{
        cell.style.backgroundColor = "#0074D9";
        cell.style.boxShadow = "2px 2px 10px white";
        cell.style.borderStyle = "dashed";
      cell.style.borderColor = "black";
    }

    visited[row][col] = true;
    for(var i=0; i<4; i++){
      var indexX = row+indices[i].x, indexY = col+indices[i].y;
      if(validIndex(indexX, indexY) && !visited[indexX][indexY]){
        stk.push(new point(indexX, indexY));
      }
    }
  }
}
}
