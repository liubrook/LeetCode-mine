// 3212. 统计 X 和 Y 频数相等的子矩阵数量
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个二维字符矩阵 grid，其中 grid[i][j] 可能是 'X'、'Y' 或 '.'，返回满足以下条件的子矩阵数量：

// 包含 grid[0][0]
// 'X' 和 'Y' 的频数相等。
// 至少包含一个 'X'。

// 示例 1：

// 输入： grid = [["X","Y","."],["Y",".","."]]

// 输出： 3

// 解释：

// https://assets.leetcode.com/uploads/2024/06/07/examplems.png

// 示例 2：

// 输入： grid = [["X","X"],["X","Y"]]

// 输出： 0

// 解释：

// 不存在满足 'X' 和 'Y' 频数相等的子矩阵。

// 示例 3：

// 输入： grid = [[".","."],[".","."]]

// 输出： 0

// 解释：

// 不存在满足至少包含一个 'X' 的子矩阵。

// 提示：

// 1 <= grid.length, grid[i].length <= 1000
// grid[i][j] 可能是 'X'、'Y' 或 '.'.
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numberOfSubmatrices = function (grid) {
  const n = grid.length,
    m = grid[0].length;
  let ans = 0;
  const sum = new Array(n + 1)
    .fill(0)
    .map(() => new Array(m + 1).fill(0).map(() => [0, 0]));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === "X") {
        sum[i + 1][j + 1][0] =
          sum[i + 1][j][0] + sum[i][j + 1][0] - sum[i][j][0] + 1;
        sum[i + 1][j + 1][1] = 1;
      } else if (grid[i][j] === "Y") {
        sum[i + 1][j + 1][0] =
          sum[i + 1][j][0] + sum[i][j + 1][0] - sum[i][j][0] - 1;
        sum[i + 1][j + 1][1] = sum[i + 1][j][1] | sum[i][j + 1][1];
      } else {
        sum[i + 1][j + 1][0] =
          sum[i + 1][j][0] + sum[i][j + 1][0] - sum[i][j][0];
        sum[i + 1][j + 1][1] = sum[i + 1][j][1] | sum[i][j + 1][1];
      }
      if (sum[i + 1][j + 1][0] === 0 && sum[i + 1][j + 1][1] === 1) {
        ans++;
      }
    }
  }
  return ans;
};
