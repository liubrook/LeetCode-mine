// 3195. 包含所有 1 的最小矩形面积 I
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个二维 二进制 数组 grid。请你找出一个边在水平方向和竖直方向上、面积 最小 的矩形，并且满足 grid 中所有的 1 都在矩形的内部。

// 返回这个矩形可能的 最小 面积。



// 示例 1：

// 输入： grid = [[0, 1, 0], [1, 0, 1]]

// 输出： 6

// 解释：

// https://assets.leetcode.com/uploads/2024/05/08/examplerect0.png

// 这个最小矩形的高度为 2，宽度为 3，因此面积为 2 * 3 = 6。

// 示例 2：

// 输入： grid = [[0, 0], [1, 0]]

// 输出： 1

// 解释：

// https://assets.leetcode.com/uploads/2024/05/08/examplerect1.png

// 这个最小矩形的高度和宽度都是 1，因此面积为 1 * 1 = 1。



// 提示：

// 1 <= grid.length, grid[i].length <= 1000
// grid[i][j] 是 0 或 1。
// 输入保证 grid 中至少有一个 1 。

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumArea = function (grid) {
  const n = grid.length, m = grid[0].length;
  let min_i = n, max_i = 0;
  let min_j = m, max_j = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 1) {
        min_i = Math.min(min_i, i);
        max_i = Math.max(max_i, i);
        min_j = Math.min(min_j, j);
        max_j = Math.max(max_j, j);
      }
    }
  }
  return (max_i - min_i + 1) * (max_j - min_j + 1);
};