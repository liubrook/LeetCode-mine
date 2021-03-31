// 74. 搜索二维矩阵
// 编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：

// 每行中的整数从左到右按升序排列。
// 每行的第一个整数大于前一行的最后一个整数。


// 示例 1：

// https://assets.leetcode.com/uploads/2020/10/05/mat.jpg
// 输入：matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target = 3
// 输出：true
// 示例 2：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/11/25/mat2.jpg
// 输入：matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target = 13
// 输出：false


// 提示：

// m == matrix.length
// n == matrix[i].length
// 1 <= m, n <= 100
//   - 104 <= matrix[i][j], target <= 104

// var searchMatrix = function (matrix, target) {
//   const m = matrix.length, n = matrix[0].length;
//   for (let i = 0; i < m; i++) {
//     if (target <= matrix[i][n - 1]) {
//       if (matrix[i].includes(target)) {
//         return true;
//       }
//     }
//   }
//   return false;
// };

var searchMatrix = function (matrix, target) {
  const rowIndex = binarySearchFirstColumn(matrix, target);
  if (rowIndex < 0) {
    return false;
  }
  return binarySearchRow(matrix[rowIndex], target);
}

const binarySearchFirstColumn = (matrix, target) => {
  let low = -1, hight = matrix.length - 1;
  while (low < hight) {
    const mid = Math.floor((hight - low + 1) / 2) + low;
    if (matrix[mid][0] <= target) {
      low = mid;
    } else {
      hight = mid - 1;
    }
  }
  return low;
}

const binarySearchRow = (row, target) => {
  let low = 0, high = row.length - 1;
  while (low <= high) {
    const mid = Math.floor(high - low) / 2 + low;
    if (row[mid] == target) {
      return true;
    } else if (row[mid] > target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return false;
}
