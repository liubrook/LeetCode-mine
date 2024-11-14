// 3239. 最少翻转次数使二进制矩阵回文 I
// 中等
// 相关标签
// 相关企业
// 提示
// 给你一个 m x n 的二进制矩阵 grid 。

// 如果矩阵中一行或者一列从前往后与从后往前读是一样的，那么我们称这一行或者这一列是 回文 的。

// 你可以将 grid 中任意格子的值 翻转 ，也就是将格子里的值从 0 变成 1 ，或者从 1 变成 0 。

// 请你返回 最少 翻转次数，使得矩阵 要么 所有行是 回文的 ，要么所有列是 回文的 。



// 示例 1：

// 输入：grid = [[1, 0, 0], [0, 0, 0], [0, 0, 1]]

// 输出：2

// 解释：

// https://assets.leetcode.com/uploads/2024/07/07/screenshot-from-2024-07-08-00-20-10.png

// 将高亮的格子翻转，得到所有行都是回文的。

// 示例 2：

// 输入：grid = [[0, 1], [0, 1], [0, 0]]

// 输出：1

// 解释：

// https://assets.leetcode.com/uploads/2024/07/07/screenshot-from-2024-07-08-00-31-23.png

// 将高亮的格子翻转，得到所有列都是回文的。

// 示例 3：

// 输入：grid = [[1], [0]]

// 输出：0

// 解释：

// 所有行已经是回文的。



// 提示：

// m == grid.length
// n == grid[i].length
// 1 <= m * n <= 2 * 10^5
// 0 <= grid[i][j] <= 1

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minFlips = function (grid) {
  let rowCnt = 0;
  let colCnt = 0;
  const m = grid.length;
  const n = grid[0].length;
  for (let i = 0; i < m; i++) {
    for (let j1 = 0; j1 < Math.floor(n / 2); j1++) {
      const j2 = n - 1 - j1;
      if (grid[i][j1] !== grid[i][j2]) {
        rowCnt++;
      }
    }
  }
  for (let j = 0; j < n; j++) {
    for (let i1 = 0; i1 < Math.floor(m / 2); i1++) {
      const i2 = m - 1 - i1;
      if (grid[i1][j] !== grid[i2][j]) {
        colCnt++;
      }
    }
  }
  return Math.min(colCnt, rowCnt);
};