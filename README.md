# Решение Sudoku на JavaScript

Для решения судоку используем поиск с возвратом или [backtracking](https://ru.wikipedia.org/wiki/Поиск_с_возвратом). Основная идея данного алгоритма — постепенное создание решения и отказ от него, как только выясняется, что такой подход не приводит к желаемому результату.

Для решения судоку используем рекурсию. Также нам потребуется несколько вспомогательных функций:
* **saveEmptyPositions** — функция, которая проверяет поле судоку на наличие незаполненых клеток и возвращает массив **emptyPositions**. в котором хранятся подмассивы с их координатами.
Код данной функции
```JavaScript
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
```
* **checkRow**, **checkColumn**, **checkSquare** — эти функции проверяют соответственно ряд, столбец и малый квадрат 3х3 на наличие проверяемого значения. Если такое значение есть, возвращают `false`, в противном случае — `true`. 
Код этих функций:
```JavaScript
  function checkRow(matrix, row, num) {
    for(var i = 0; i < 9; i++) {
      if(matrix[row][i] === num) {
        return false;
        }
      }
    return true;
    };
  };
```
  
```JavaScript
  function checkColumn(matrix, coll, num) {
    for(var i = 0; i < 9; i++) {
      if(matrix[i][coll] === num) {
        return false;
      }
    }
    return true;
  };
```
  
```JavaScript
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
```

* **checkNum** — эта функция объединяет три предыдущие функции и определяет допустимые и недопустимые значения, которые могут быть добавлены на место пропуска.
Код функции:
```JavaScript
  function checkNum(matrix, x, y, num) {
    if(checkRow(matrix, y, num) &&
      checkColumn(matrix, x, num) &&
      checkSquare(matrix, x, y, num)) {
      return true;
    } else {
      return false;
    }
  };
```

* **solveSudoku** — основная функция для решения судоку.
Код функции с комментариями:
```JavaScript
function solveSudoku(matrix) {
  // получаем координаты незаполненых клеток
  var emptyPositions = saveEmptyPositions(matrix);
  // ограничиваем максимальное значение, которое будем проверять
  var limit = 9;
  // проходим по координатам незаполненных клеток судоку
  for(var i = 0; i < emptyPositions.length;) {
    var row = emptyPositions[i][0];
    var coll = emptyPositions[i][1];
    // проверяем следующее значение
    var num = matrix[row][coll] + 1;
    // проверяем, было ли найдено подходящее значение
    var found = false;
    while(!found && num <= limit) {
      if(checkNum(matrix, coll, row, num)) {
      // если найдено подходящее значение
      // указываем, что found = true
      // устанавливаем найденное значение незаполненной ячейке
      // переходим к следующей ячейке
        found = true;
        matrix[row][coll] = num;
        i++;
      } else {
      // если подходящее значение не найдено
      // увеличиваем проверяемое значение на единицу
        num++;
      }
    }
    // если все возможные значения проверили и ни одно не подошло
    // возвращаемся к предыдущей позиции
    if(!found) {
      matrix[row][coll] = 0;
      i--;
    }
  }
  return matrix;
};
```
**Источник:** [https://github.com/mmerkes/sudoku_solvers](https://github.com/mmerkes/sudoku_solvers)
