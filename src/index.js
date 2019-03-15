module.exports = function solveSudoku(matrix) {
  var emptyPositions = saveEmptyPositions(matrix);
  var limit = 9;
  for(var i = 0; i < emptyPositions.length;) {
    var row = emptyPositions[i][0];
    var coll = emptyPositions[i][1];
    var num = matrix[row][coll] + 1;
    var found = false;
    while(!found && num <= limit) {
      if(checkNum(matrix, coll, row, num)) {
        found = true;
        matrix[row][coll] = num;
        i++;
      } else {
        num++;
      }
    }
    if(!found) {
      matrix[row][coll] = 0;
      i--;
    }
  }
  return matrix;
};

  function saveEmptyPositions(matrix){
    var emptyPositions = [];
    for(var row = 0; row < 9; row++){
      for(var coll = 0; coll < 9; coll++){
        if(matrix[row][coll] === 0){
          emptyPositions.push([row,coll]);
        }
      }
    }
    return emptyPositions;
  };

function checkRow(matrix, row, num) {
  for(var i = 0; i < 9; i++) {
    if(matrix[row][i] === num) {
      return false;
    }
  }
  return true;
};

  function checkColumn(matrix, coll, num) {
    for(var i = 0; i < 9; i++) {
      if(matrix[i][coll] === num) {
        return false;
      }
    }
    return true;
  };

    function checkSquare(matrix, row, coll, num) {
        var row = Math.floor(row / 3) * 3;
        var coll = Math.floor(coll / 3) * 3;
        for (var r = 0; r < 3; r++) {
            for (var c = 0; c < 3; c++) {
                if (matrix[row + r][coll + c] === n) return false;
            }
        }
        return true;
    }

  function checkSquare(matrix, x, y, num) {
    var squareSize = [matrix[0].length / 3, matrix.length / 3];
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
        if(matrix[i][j] == num) {        
          return false;
        }
      }
    }
    return true;
  };

  function checkNum(matrix, x, y, num) {
    if(checkRow(matrix, y, num) &&
      checkColumn(matrix, x, num) &&
      checkSquare(matrix, x, y, num)) {
      return true;
    } else {
      return false;
    }
  };