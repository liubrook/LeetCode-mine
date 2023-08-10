// 1289. 下降路径最小和 II
// 提示
// 困难
// 159
// 相关企业
// 给你一个 n x n 整数矩阵 grid ，请你返回 非零偏移下降路径 数字和的最小值。

// 非零偏移下降路径 定义为：从 grid 数组中的每一行选择一个数字，且按顺序选出来的数字中，相邻数字不在原数组的同一列。



// 示例 1：

// https://assets.leetcode.com/uploads/2021/08/10/falling-grid.jpg

// 输入：grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
// 输出：13
// 解释：
// 所有非零偏移下降路径包括：
// [1, 5, 9], [1, 5, 7], [1, 6, 7], [1, 6, 8],
//   [2, 4, 8], [2, 4, 9], [2, 6, 7], [2, 6, 8],
//   [3, 4, 8], [3, 4, 9], [3, 5, 7], [3, 5, 9]
// 下降路径中数字和最小的是[1, 5, 7] ，所以答案是 13 。
// 示例 2：

// 输入：grid = [[7]]
// 输出：7


// 提示：

// n == grid.length == grid[i].length
// 1 <= n <= 200
//   - 99 <= grid[i][j] <= 99

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minFallingPathSum = function (grid) {
  const n = grid.length;
  const d = new Array(n).fill(0).map(() => new Array(n).fill(Infinity));
  for (let i = 0; i < n; i++) {
    d[0][i] = grid[0][i];
  }
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        if (j == k) {
          continue;
        }
        d[i][j] = Math.min(d[i][j], d[i - 1][k] + grid[i][j]);
      }
    }
  }
  return Math.min(...d[n - 1]);
};