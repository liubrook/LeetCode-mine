// 3197. 包含所有 1 的最小矩形面积 II
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个二维 二进制 数组 grid。你需要找到 3 个 不重叠、面积 非零 、边在水平方向和竖直方向上的矩形，并且满足 grid 中所有的 1 都在这些矩形的内部。

// 返回这些矩形面积之和的 最小 可能值。

// 注意，这些矩形可以相接。



// 示例 1：

// 输入： grid = [[1, 0, 1], [1, 1, 1]]

// 输出： 5

// 解释：

// https://assets.leetcode.com/uploads/2024/05/14/example0rect21.png

// 位于(0, 0) 和(1, 0) 的 1 被一个面积为 2 的矩形覆盖。
// 位于(0, 2) 和(1, 2) 的 1 被一个面积为 2 的矩形覆盖。
// 位于(1, 1) 的 1 被一个面积为 1 的矩形覆盖。
// 示例 2：

// 输入： grid = [[1, 0, 1, 0], [0, 1, 0, 1]]

// 输出： 5

// 解释：

// https://assets.leetcode.com/uploads/2024/05/14/example1rect2.png

// 位于(0, 0) 和(0, 2) 的 1 被一个面积为 3 的矩形覆盖。
// 位于(1, 1) 的 1 被一个面积为 1 的矩形覆盖。
// 位于(1, 3) 的 1 被一个面积为 1 的矩形覆盖。


// 提示：

// 1 <= grid.length, grid[i].length <= 30
// grid[i][j] 是 0 或 1。
// 输入保证 grid 中至少有三个 1 。

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumSum = function (grid) {
  const rgrid = rotate(grid);
  return Math.min(solve(grid), solve(rgrid));
}

const minimumSum2 = (grid, u, d, l, r) => {
  let min_i = grid.length, max_i = 0;
  let min_j = grid[0].length, max_j = 0;
  for (let i = u; i <= d; i++) {
    for (let j = l; j <= r; j++) {
      if (grid[i][j] === 1) {
        min_i = Math.min(min_i, i);
        min_j = Math.min(min_j, j);
        max_i = Math.max(max_i, i);
        max_j = Math.max(max_j, j);
      }
    }
  }
  return min_i <= max_i ? (max_i - min_i + 1) * (max_j - min_j + 1) : Number.MAX_SAFE_INTEGER / 3;
}

const rotate = (vec) => {
  const n = vec.length, m = vec[0].length;
  const ret = new Array(m).fill().map(() => new Array(n));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      ret[m - j - 1][i] = vec[i][j];
    }
  }
  return ret;
}

const solve = (grid) => {
  const n = grid.length, m = grid[0].length;
  let res = n * m;
  for (let i = 0; i + 1 < n; i++) {
    for (let j = 0; j + 1 < m; j++) {
      res = Math.min(res, minimumSum2(grid, 0, i, 0, m - 1)
        + minimumSum2(grid, i + 1, n - 1, 0, j)
        + minimumSum2(grid, i + 1, n - 1, j + 1, m - 1));
      res = Math.min(res, minimumSum2(grid, 0, i, 0, j)
        + minimumSum2(grid, 0, i, j + 1, m - 1)
        + minimumSum2(grid, i + 1, n - 1, 0, m - 1));
    }
  }
  for (let i = 0; i + 2 < n; i++) {
    for (let j = i + 1; j + 1 < n; j++) {
      res = Math.min(res, minimumSum2(grid, 0, i, 0, m - 1)
        + minimumSum2(grid, i + 1, j, 0, m - 1)
        + minimumSum2(grid, j + 1, n - 1, 0, m - 1));
    }
  }
  return res;
}