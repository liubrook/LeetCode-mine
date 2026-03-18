// 3070. 元素和小于等于 k 的子矩阵的数目
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 给你一个下标从 0 开始的整数矩阵 grid 和一个整数 k。

// 返回包含 grid 左上角元素、元素和小于或等于 k 的 子矩阵的数目。

// 示例 1：
// https://assets.leetcode.com/uploads/2024/01/01/example1.png

// 输入：grid = [[7,6,3],[6,6,1]], k = 18
// 输出：4
// 解释：如上图所示，只有 4 个子矩阵满足：包含 grid 的左上角元素，并且元素和小于或等于 18 。
// 示例 2：
// https://assets.leetcode.com/uploads/2024/01/01/example21.png

// 输入：grid = [[7,2,9],[1,5,0],[2,6,6]], k = 20
// 输出：6
// 解释：如上图所示，只有 6 个子矩阵满足：包含 grid 的左上角元素，并且元素和小于或等于 20 。

// 提示：

// m == grid.length
// n == grid[i].length
// 1 <= n, m <= 1000
// 0 <= grid[i][j] <= 1000
// 1 <= k <= 10^9
/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var countSubmatrices = function (grid, k) {
  const m = grid.length;
  const n = grid[0].length;
  const cols = new Array(n).fill(0);
  let res = 0;

  for (let i = 0; i < m; i++) {
    let rows = 0;
    for (let j = 0; j < n; j++) {
      cols[j] += grid[i][j];
      rows += cols[j];
      if (rows <= k) {
        res++;
      }
    }
  }
  return res;
};
