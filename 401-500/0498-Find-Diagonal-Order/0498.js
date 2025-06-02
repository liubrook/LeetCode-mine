// 498. 对角线遍历
// 给你一个大小为 m x n 的矩阵 mat ，请以对角线遍历的顺序，用一个数组返回这个矩阵中的所有元素。



// 示例 1：
// https://assets.leetcode.com/uploads/2021/04/10/diag1-grid.jpg

// 输入：mat = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
// 输出：[1, 2, 4, 7, 5, 3, 6, 8, 9]
// 示例 2：

// 输入：mat = [[1, 2], [3, 4]]
// 输出：[1, 2, 3, 4]


// 提示：

// m == mat.length
// n == mat[i].length
// 1 <= m, n <= 104
// 1 <= m * n <= 104
//   - 105 <= mat[i][j] <= 105

/**
 * @param {number[][]} mat
 * @return {number[]}
 */
var findDiagonalOrder = function (mat) {
  const m = mat.length;
  const n = mat[0].length;
  const res = new Array(m * n).fill(0);
  let pos = 0;
  for (let i = 0; i < m + n - 1; i++) {
    if (i % 2 === 1) {
      let x = i < n ? 0 : i - n + 1;
      let y = i < n ? i : n - 1;
      while (x < m && y >= 0) {
        res[pos] = mat[x][y];
        pos++;
        x++;
        y--;
      }
    } else {
      let x = i < m ? i : m - 1;
      let y = i < m ? 0 : i - m + 1;
      while (x >= 0 && y < n) {
        res[pos] = mat[x][y];
        pos++;
        x--;
        y++;
      }
    }
  }
  return res;
};