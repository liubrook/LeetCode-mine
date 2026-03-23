// 1594. 矩阵的最大非负积
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个大小为 m x n 的矩阵 grid 。最初，你位于左上角 (0, 0) ，每一步，你可以在矩阵中 向右 或 向下 移动。

// 在从左上角 (0, 0) 开始到右下角 (m - 1, n - 1) 结束的所有路径中，找出具有 最大非负积 的路径。路径的积是沿路径访问的单元格中所有整数的乘积。

// 返回 最大非负积 对 109 + 7 取余 的结果。如果最大积为 负数 ，则返回 -1 。

// 注意，取余是在得到最大积之后执行的。

// 示例 1：
// https://assets.leetcode.com/uploads/2021/12/23/product1.jpg

// 输入：grid = [[-1,-2,-3],[-2,-3,-3],[-3,-3,-2]]
// 输出：-1
// 解释：从 (0, 0) 到 (2, 2) 的路径中无法得到非负积，所以返回 -1 。
// 示例 2：
// https://assets.leetcode.com/uploads/2021/12/23/product2.jpg

// 输入：grid = [[1,-2,1],[1,-2,1],[3,-4,1]]
// 输出：8
// 解释：最大非负积对应的路径如图所示 (1 * 1 * -2 * -4 * 1 = 8)
// 示例 3：
// https://assets.leetcode.com/uploads/2021/12/23/product3.jpg

// 输入：grid = [[1,3],[0,-4]]
// 输出：0
// 解释：最大非负积对应的路径如图所示 (1 * 0 * -4 = 0)

// 提示：

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 15
// -4 <= grid[i][j] <= 4
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxProductPath = function (grid) {
  const MOD = 1000000007;
  const m = grid.length,
    n = grid[0].length;
  const maxgt = new Array(m).fill(0).map(() => new Array(n).fill(0));
  const minlt = new Array(m).fill(0).map(() => new Array(n).fill(0));

  maxgt[0][0] = minlt[0][0] = grid[0][0];
  for (let i = 1; i < n; i++) {
    maxgt[0][i] = minlt[0][i] = maxgt[0][i - 1] * grid[0][i];
  }
  for (let i = 1; i < m; i++) {
    maxgt[i][0] = minlt[i][0] = maxgt[i - 1][0] * grid[i][0];
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (grid[i][j] >= 0) {
        maxgt[i][j] = Math.max(maxgt[i][j - 1], maxgt[i - 1][j]) * grid[i][j];
        minlt[i][j] = Math.min(minlt[i][j - 1], minlt[i - 1][j]) * grid[i][j];
      } else {
        maxgt[i][j] = Math.min(minlt[i][j - 1], minlt[i - 1][j]) * grid[i][j];
        minlt[i][j] = Math.max(maxgt[i][j - 1], maxgt[i - 1][j]) * grid[i][j];
      }
    }
  }

  if (maxgt[m - 1][n - 1] < 0) {
    return -1;
  } else {
    return maxgt[m - 1][n - 1] % MOD;
  }
};
