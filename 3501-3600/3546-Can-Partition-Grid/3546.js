// 3546. 等和矩阵分割 I
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个由正整数组成的 m x n 矩阵 grid。你的任务是判断是否可以通过 一条水平或一条垂直分割线 将矩阵分割成两部分，使得：

// 分割后形成的每个部分都是 非空 的。
// 两个部分中所有元素的和 相等 。
// 如果存在这样的分割，返回 true；否则，返回 false。

// 示例 1：

// 输入： grid = [[1,4],[2,3]]

// 输出： true

// 解释：

// https://pic.leetcode.cn/1746839596-kWigaF-lc.jpeg

// 在第 0 行和第 1 行之间进行水平分割，得到两个非空部分，每部分的元素之和为 5。因此，答案是 true。

// 示例 2：

// 输入： grid = [[1,3],[2,4]]

// 输出： false

// 解释：

// 无论是水平分割还是垂直分割，都无法使两个非空部分的元素之和相等。因此，答案是 false。

// 提示：

// 1 <= m == grid.length <= 10^5
// 1 <= n == grid[i].length <= 10^5
// 2 <= m * n <= 10^5
// 1 <= grid[i][j] <= 10^5
/**
 * @param {number[][]} grid
 * @return {boolean}
 */
var canPartitionGrid = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const sum = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  let total = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      sum[i + 1][j + 1] =
        sum[i + 1][j] + sum[i][j + 1] - sum[i][j] + grid[i][j];
      total += grid[i][j];
    }
  }
  for (let i = 0; i < m - 1; i++) {
    if (total === sum[i + 1][n] * 2) {
      return true;
    }
  }
  for (let i = 0; i < n - 1; i++) {
    if (total === sum[m][i + 1] * 2) {
      return true;
    }
  }
  return false;
};
