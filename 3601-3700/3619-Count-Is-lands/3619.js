// 3619. 总价值可以被 K 整除的岛屿数目
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个 m x n 的矩阵 grid 和一个正整数 k。一个 岛屿 是由 正 整数（表示陆地）组成的，并且陆地间 四周 连通（水平或垂直）。

// 一个岛屿的总价值是该岛屿中所有单元格的值之和。

// 返回总价值可以被 k 整除 的岛屿数量。

// 示例 1:

// https://assets.leetcode.com/uploads/2025/03/06/example1griddrawio-1.png
// 输入: grid = [[0,2,1,0,0],[0,5,0,0,5],[0,0,1,0,0],[0,1,4,7,0],[0,2,0,0,8]], k = 5

// 输出: 2

// 解释:

// 网格中包含四个岛屿。蓝色高亮显示的岛屿的总价值可以被 5 整除，而红色高亮显示的岛屿则不能。

// 示例 2:

// https://assets.leetcode.com/uploads/2025/03/06/example2griddrawio.png
// 输入: grid = [[3,0,3,0], [0,3,0,3], [3,0,3,0]], k = 3

// 输出: 6

// 解释:

// 网格中包含六个岛屿，每个岛屿的总价值都可以被 3 整除。

// 提示:

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 1000
// 1 <= m * n <= 10^5
// 0 <= grid[i][j] <= 10^6
// 1 <= k < = 10^6
/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var countIslands = function (grid, k) {
  const m = grid.length,
    n = grid[0].length;
  const dirs = [-1, 0, 1, 0, -1];

  const dfs = (i, j) => {
    let sum = grid[i][j];
    grid[i][j] = 0;
    for (let d = 0; d < 4; ++d) {
      const x = i + dirs[d],
        y = j + dirs[d + 1];
      if (x >= 0 && x < m && y >= 0 && y < n && grid[x][y] > 0) {
        sum += dfs(x, y);
      }
    }
    return sum;
  };

  let ans = 0;
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (grid[i][j] > 0 && dfs(i, j) % k === 0) {
        ++ans;
      }
    }
  }
  return ans;
};
