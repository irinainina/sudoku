module.exports = function solveSudoku(board) {
  var emptyPositions = saveEmptyPositions(board);
  var limit = board.length / 3 * board[0].length / 3;
  for(var i = 0; i < emptyPositions.length;) {
    var y = emptyPositions[i][0];
    var x = emptyPositions[i][1];
    var value = board[y][x] + 1;
    var found = false;
    while(!found && value <= limit) {
      if(checkValue(board, x, y, value)) {
        found = true;
        board[y][x] = value;
        i++;
      } else {
        value++;
      }
    }
    if(!found) {
      board[y][x] = 0;
      i--;
    }
  }
  board.forEach(function(row) {
    console.log(row.join());
  });
  return board;
};

function saveEmptyPositions(board) {
  var emptyPositions = [];

  for(var i = 0; i < board.length; i++) {
    for(var j = 0; j < board[i].length; j++) {
      if(board[i][j] === 0) {
        emptyPositions.push([i, j]);
      }
    }
  }

  return emptyPositions;
};

function checkRow(board, position, value) {
  for(var i = 0; i < board[position].length; i++) {
    if(board[position][i] == value) {
      return false;
    }
  }
  return true;
};

function checkColumn(board, position, value) {
  for(var i = 0; i < board.length; i++) {
    if(board[i][position] == value) {
      return false;
    }
  }
  return true;
};

function checkSquare(board, x, y, value) {
  var squareSize = [board[0].length / 3, board.length / 3];
  var xCorner = 0;
  var yCorner = 0;



  while(x >= xCorner + squareSize[0]) {
    xCorner += squareSize[0];
  }

  while(y >= yCorner + squareSize[1]) {
    yCorner += squareSize[1];
  }

  for(var i = yCorner; i < yCorner + squareSize[1]; i++) {
    for(var j = xCorner; j < xCorner + squareSize[0]; j++) {
      if(board[i][j] == value) {        return false;
      }
    }
  }
  return true;
};

function checkValue(board, x, y, value) {
  if(checkRow(board, y, value) &&
    checkColumn(board, x, value) &&
    checkSquare(board, x, y, value)) {
    return true;
  } else {
    return false;
  }
};