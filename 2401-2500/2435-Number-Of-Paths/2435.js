// 2435. 矩阵中和能被 K 整除的路径
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个下标从 0 开始的 m x n 整数矩阵 grid 和一个整数 k 。你从起点 (0, 0) 出发，每一步只能往 下 或者往 右 ，你想要到达终点 (m - 1, n - 1) 。

// 请你返回路径和能被 k 整除的路径数目，由于答案可能很大，返回答案对 109 + 7 取余 的结果。

// 示例 1：

// https://assets.leetcode.com/uploads/2022/08/13/image-20220813183124-1.png

// 输入：grid = [[5,2,4],[3,0,5],[0,7,2]], k = 3
// 输出：2
// 解释：有两条路径满足路径上元素的和能被 k 整除。
// 第一条路径为上图中用红色标注的路径，和为 5 + 2 + 4 + 5 + 2 = 18 ，能被 3 整除。
// 第二条路径为上图中用蓝色标注的路径，和为 5 + 3 + 0 + 5 + 2 = 15 ，能被 3 整除。
// 示例 2：
// https://assets.leetcode.com/uploads/2022/08/17/image-20220817112930-3.png

// 输入：grid = [[0,0]], k = 5
// 输出：1
// 解释：红色标注的路径和为 0 + 0 = 0 ，能被 5 整除。
// 示例 3：
// https://assets.leetcode.com/uploads/2022/08/12/image-20220812224605-3.png

// 输入：grid = [[7,3,4,9],[2,3,6,2],[2,3,7,0]], k = 1
// 输出：10
// 解释：每个数字都能被 1 整除，所以每一条路径的和都能被 k 整除。

// 提示：

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 5 * 10^4
// 1 <= m * n <= 5 * 10^4
// 0 <= grid[i][j] <= 100
// 1 <= k <= 50
/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
const MOD = 1e9 + 7;
var numberOfPaths = function (grid, k) {
  const m = grid.length;
  const n = grid[0].length;

  const dp = [];
  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    for (let j = 0; j <= n; j++) {
      dp[i][j] = new Array(k).fill(0);
      if (i === 1 && j === 1) {
        dp[i][j][grid[0][0] % k] = 1;
        continue;
      }

      if (i >= 1 && j >= 1) {
        const value = grid[i - 1][j - 1] % k;

        for (let r = 0; r < k; r++) {
          const prevMod = (r - value + k) % k;

          dp[i][j][r] = dp[i - 1][j][prevMod] + dp[i][j - 1][prevMod];
          dp[i][j][r] %= MOD;
        }
      }
    }
  }
  return dp[m][n][0];
};
console.log(
  numberOfPaths(
    [
      [5, 2, 4],
      [3, 0, 5],
      [0, 7, 2],
    ],
    3
  )
);
