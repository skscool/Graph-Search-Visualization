var sourRow = 3, sourCol = 10;
var destRow = 8, destCol = 2;
var blockedCells = [];
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


class point{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}


function clearResult(){                           //just clear the previous result, but keep the source, dest and blockage.. we can add blockage
  document.getElementById("msg").innerHTML = "Click single cell to Block it (<span style=\"color:grey;\">X</span>) or Click & Drag to block multiple cells.<br><br><span style=\"color:blue;\">You can then run your favorite algorithm.</span>";
  var matrix = document.getElementById("matrix");

  for (var i = 0; i < matrix.rows.length; i++) {
      for (var j = 0; j < matrix.rows[i].cells.length; j++){
        var cell = matrix.rows[i].cells[j];

        var isBlocked = false;                      //if the cell i,j is blocked or not.. if blocked then dont reset it
        for(k=0; k<blockedCells.length; k++){                           //find if cell i,j is blocked or not
          if(blockedCells[k].x == i && blockedCells[k].y == j)
            isBlocked = true;
        }

        if(!((i == destRow && j == destCol) || (i == sourRow && j == sourCol) || (isBlocked))){
          cell.style.backgroundColor = "black";
          cell.style.borderColor = "white";
          cell.style.borderStyle = "solid";;
          cell.style.boxShadow = "";
          cell.onmousedown = "";
          cell.onmouseover = "";
          cell.onmouseup = "";
          cell.onclick = function(){
            setSingleBlockage(this);
          };
          cell.onmousedown = function(){
            setBlockage(this);
          };
        }
      }
  }
}




function reset(){
  STOP = 1;
  blockedCells = [];
  var matrix = document.getElementById("matrix");
  document.getElementById("msg").innerHTML = "Click a cell to select as Source (<span style=\"color:green;\">S</span>) and then a Destination (<span style=\"color:red;\">D</span>).";
  for (var i = 0; i < matrix.rows.length; i++) {
      for (var j = 0; j < matrix.rows[i].cells.length; j++){
        var cell = matrix.rows[i].cells[j];
        cell.innerHTML = "";
        cell.style.backgroundColor = "black";
        cell.style.borderColor = "white";
        cell.style.borderStyle = "solid";;
        cell.style.boxShadow = "";
        cell.onmousedown = "";
        cell.onmouseover = "";
        cell.onmouseup = "";
        cell.onclick = function(){
          setSource(this);
        };
      }
  }

}



function setSource(cell) {
    cell.innerHTML = "S";
    cell.style.backgroundColor = "green ";
    cell.style.boxShadow = "2px 2px 10px white";
    sourRow = cell.parentElement.rowIndex;
    sourCol = cell.cellIndex;

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
    document.getElementById("msg").innerHTML = "Click single cell to Block it (<span style=\"color:white; background-color:#303030;\">X</span>) or Click & Drag to block multiple cells.<br><br><span style=\"color:blue;\">Click button to the left of the Grid to run your favorite algorithm.</span>";
    cell.innerHTML = "D";
    cell.style.backgroundColor = "Red";
    cell.style.boxShadow = "2px 2px 10px white";
    destRow = cell.parentElement.rowIndex;
    destCol = cell.cellIndex;
    var matrix = document.getElementById("matrix");
    for (var i = 0; i < matrix.rows.length; i++) {
        for (var j = 0; j < matrix.rows[i].cells.length; j++){
          var cell = matrix.rows[i].cells[j];
          cell.onclick = function(){
            setSingleBlockage(this);
          };
          cell.onmousedown = function(){
            setBlockage(this);
          };
        }
    }
}


function setSingleBlockage(cell) {
  cell.innerHTML = "X";
  cell.style.backgroundColor = "#303030";
  blockedRow = cell.parentElement.rowIndex;
  blockedCol = cell.cellIndex;
  blockedCells.push(new point(blockedRow, blockedCol));
  mouseDown = false;
}


console.log(sourRow, sourCol);



var mouseDown = false;
function setBlockage(cell) {
    cell.innerHTML = "X";
    cell.style.backgroundColor = "#303030";
    blockedRow = cell.parentElement.rowIndex;
    blockedCol = cell.cellIndex;
    blockedCells.push(new point(blockedRow, blockedCol));
    mouseDown = true;
    var matrix = document.getElementById("matrix");
    for (var i = 0; i < matrix.rows.length; i++) {
        for (var j = 0; j < matrix.rows[i].cells.length; j++){
          var cell = matrix.rows[i].cells[j];
          cell.onmouseover = function(){
            setBlockageMouseOver(this);
          };
          cell.onmouseup = function(){
            mouseDown = false;
          };
        }
    }
}

function setBlockageMouseOver(cell) {
    if(mouseDown == false)
      return;
    cell.innerHTML = "X";
    cell.style.backgroundColor = "#303030";
    blockedRow = cell.parentElement.rowIndex;
    blockedCol = cell.cellIndex;
    blockedCells.push(new point(blockedRow, blockedCol));
    mouseDown = true;
    var matrix = document.getElementById("matrix");
    for (var i = 0; i < matrix.rows.length; i++) {
        for (var j = 0; j < matrix.rows[i].cells.length; j++){
          var cell = matrix.rows[i].cells[j];
          cell.onmouseover = function(){
            setBlockageMouseOver(this);
          };

        }
    }
}
