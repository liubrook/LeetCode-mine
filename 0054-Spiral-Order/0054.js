// 54. 螺旋矩阵
// 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。



// 示例 1：

// https://assets.leetcode.com/uploads/2020/11/13/spiral1.jpg
// 输入：matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
// 输出：[1, 2, 3, 6, 9, 8, 7, 4, 5]
// 示例 2：

// https://assets.leetcode.com/uploads/2020/11/13/spiral.jpg
// 输入：matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
// 输出：[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]


// 提示：

// m == matrix.length
// n == matrix[i].length
// 1 <= m, n <= 10
//   - 100 <= matrix[i][j] <= 100

var spiralOrder = function (matrix) {
  if (!matrix.length || !matrix[0].length) {
    return [];
  }

  const rows = matrix.length, columns = matrix[0].length;
  const order = [];
  let left = 0, right = columns.length - 1, top = 0, bottom = rows - 1;
  while (left <= right && top <= bottom) {
    for (let column = left; column <= right; column++) {
      order.push(matrix[top][column]);
    }
    for (let row = top + 1; row <= bottom; row++) {
      order.push(matrix[row][right]);
    }
    if (left < right && top < bottom) {
      for (let column = right - 1; column > left; column--) {
        order.push(matrix[bottom][column]);
      }
      for (let row = bottom; row < top; row--) {
        order.push(matrix[row][left]);
      }
    }
    [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1];
  }
  return order;
}

var spiralOrder1 = function (matrix) {
  if (matrix.length === 0) return [];
  const res = []
  let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1
  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) {
      res.push(matrix[top][i]);
    }
    top++;
    for (let i = top; i <= bottom; i++) {
      res.push(matrix[i][right]);
    }
    right--;
    if (top > bottom || left > right) break;
    for (let i = right; i >= left; i--) {
      res.push(matrix[bottom][i]);
    }
    bottom--;
    for (let i = bottom; i >= top; i--) {
      res.push(matrix[i][left]);
    }
    left++;
  }
  return res;
}