// 2906. 构造乘积矩阵
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个下标从 0 开始、大小为 n * m 的二维整数矩阵 grid ，定义一个下标从 0 开始、大小为 n * m 的的二维矩阵 p。如果满足以下条件，则称 p 为 grid 的 乘积矩阵 ：

// 对于每个元素 p[i][j] ，它的值等于除了 grid[i][j] 外所有元素的乘积。乘积对 12345 取余数。
// 返回 grid 的乘积矩阵。

// 示例 1：

// 输入：grid = [[1,2],[3,4]]
// 输出：[[24,12],[8,6]]
// 解释：p[0][0] = grid[0][1] * grid[1][0] * grid[1][1] = 2 * 3 * 4 = 24
// p[0][1] = grid[0][0] * grid[1][0] * grid[1][1] = 1 * 3 * 4 = 12
// p[1][0] = grid[0][0] * grid[0][1] * grid[1][1] = 1 * 2 * 4 = 8
// p[1][1] = grid[0][0] * grid[0][1] * grid[1][0] = 1 * 2 * 3 = 6
// 所以答案是 [[24,12],[8,6]] 。
// 示例 2：

// 输入：grid = [[12345],[2],[1]]
// 输出：[[2],[0],[0]]
// 解释：p[0][0] = grid[0][1] * grid[0][2] = 2 * 1 = 2
// p[0][1] = grid[0][0] * grid[0][2] = 12345 * 1 = 12345. 12345 % 12345 = 0 ，所以 p[0][1] = 0
// p[0][2] = grid[0][0] * grid[0][1] = 12345 * 2 = 24690. 24690 % 12345 = 0 ，所以 p[0][2] = 0
// 所以答案是 [[2],[0],[0]] 。

// 提示：

// 1 <= n == grid.length <= 10^5
// 1 <= m == grid[i].length <= 10^5
// 2 <= n * m <= 10^5
// 1 <= grid[i][j] <= 10^9
/**
 * @param {number[][]} grid
 * @return {number[][]}
 */
var constructProductMatrix = function (grid) {
  const MOD = 12345;
  const n = grid.length,
    m = grid[0].length;
  const p = Array.from({ length: n }, () => new Array(m).fill(0));

  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      p[i][j] = suffix;
      suffix = (suffix * grid[i][j]) % MOD;
    }
  }

  let prefix = 1;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      p[i][j] = (p[i][j] * prefix) % MOD;
      prefix = (prefix * grid[i][j]) % MOD;
    }
  }
  return p;
};
