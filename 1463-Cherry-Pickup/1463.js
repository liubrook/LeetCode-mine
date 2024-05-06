// 1463. 摘樱桃 II
// 困难
// 相关标签
// 相关企业
// 提示
// 给你一个 rows x cols 的矩阵 grid 来表示一块樱桃地。 grid 中每个格子的数字表示你能获得的樱桃数目。

// 你有两个机器人帮你收集樱桃，机器人 1 从左上角格子(0, 0) 出发，机器人 2 从右上角格子(0, cols - 1) 出发。

// 请你按照如下规则，返回两个机器人能收集的最多樱桃数目：

// 从格子(i, j) 出发，机器人可以移动到格子(i + 1, j - 1)，(i + 1, j) 或者(i + 1, j + 1) 。
// 当一个机器人经过某个格子时，它会把该格子内所有的樱桃都摘走，然后这个位置会变成空格子，即没有樱桃的格子。
// 当两个机器人同时到达同一个格子时，它们中只有一个可以摘到樱桃。
// 两个机器人在任意时刻都不能移动到 grid 外面。
// 两个机器人最后都要到达 grid 最底下一行。


// 示例 1：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/05/30/sample_1_1802.png

// 输入：grid = [[3, 1, 1], [2, 5, 1], [1, 5, 5], [2, 1, 1]]
// 输出：24
// 解释：机器人 1 和机器人 2 的路径在上图中分别用绿色和蓝色表示。
// 机器人 1 摘的樱桃数目为(3 + 2 + 5 + 2) = 12 。
// 机器人 2 摘的樱桃数目为(1 + 5 + 5 + 1) = 12 。
// 樱桃总数为： 12 + 12 = 24 。
// 示例 2：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/05/30/sample_2_1802.png

// 输入：grid = [[1, 0, 0, 0, 0, 0, 1], [2, 0, 0, 0, 0, 3, 0], [2, 0, 9, 0, 0, 0, 0], [0, 3, 0, 5, 4, 0, 0], [1, 0, 2, 3, 0, 0, 6]]
// 输出：28
// 解释：机器人 1 和机器人 2 的路径在上图中分别用绿色和蓝色表示。
// 机器人 1 摘的樱桃数目为(1 + 9 + 5 + 2) = 17 。
// 机器人 2 摘的樱桃数目为(1 + 3 + 4 + 3) = 11 。
// 樱桃总数为： 17 + 11 = 28 。
// 示例 3：

// 输入：grid = [[1, 0, 0, 3], [0, 0, 0, 3], [0, 0, 3, 3], [9, 0, 3, 3]]
// 输出：22
// 示例 4：

// 输入：grid = [[1, 1], [1, 1]]
// 输出：4


// 提示：

// rows == grid.length
// cols == grid[i].length
// 2 <= rows, cols <= 70
// 0 <= grid[i][j] <= 100 

/**
 * @param {number[][]} grid
 * @return {number}
 */
var cherryPickup = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  let f = Array.from({ length: n }, () => Array(n).fill(-1));
  let g = Array.from({ length: n }, () => Array(n).fill(-1));

  f[0][n - 1] = grid[0][0] + grid[0][n - 1];
  for (let i = 1; i < m; ++i) {
    for (let j1 = 0; j1 < n; ++j1) {
      for (let j2 = 0; j2 < n; ++j2) {
        let best = -1;
        for (let dj1 = j1 - 1; dj1 <= j1 + 1; ++dj1) {
          for (let dj2 = j2 - 1; dj2 <= j2 + 1; ++dj2) {
            if (dj1 >= 0 && dj1 < n && dj2 >= 0 && dj2 < n && f[dj1][dj2] != -1) {
              best = Math.max(best, f[dj1][dj2] + (j1 == j2 ? grid[i][j1] : grid[i][j1] + grid[i][j2]));
            }
          }
        }
        g[j1][j2] = best;
      }
    }
    [f, g] = [g, f];
  }
  let ans = 0;
  for (let j1 = 0; j1 < n; ++j1) {
    ans = Math.max(ans, Math.max(...f[j1]));
  }
  return ans;
};