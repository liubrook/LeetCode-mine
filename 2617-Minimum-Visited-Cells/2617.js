// 2617. 网格图中最少访问的格子数
// 困难
// 相关标签
// 相关企业
// 提示
// 给你一个下标从 0 开始的 m x n 整数矩阵 grid 。你一开始的位置在 左上角 格子(0, 0) 。

// 当你在格子(i, j) 的时候，你可以移动到以下格子之一：

// 满足 j < k <= grid[i][j] + j 的格子(i, k) （向右移动），或者
// 满足 i < k <= grid[i][j] + i 的格子(k, j) （向下移动）。
// 请你返回到达 右下角 格子(m - 1, n - 1) 需要经过的最少移动格子数，如果无法到达右下角格子，请你返回 - 1 。



// 示例 1：

// https://assets.leetcode.com/uploads/2023/01/25/ex1.png

// 输入：grid = [[3, 4, 2, 1], [4, 2, 3, 1], [2, 1, 0, 0], [2, 4, 0, 0]]
// 输出：4
// 解释：上图展示了到达右下角格子经过的 4 个格子。
// 示例 2：

// https://assets.leetcode.com/uploads/2023/01/25/ex2.png

// 输入：grid = [[3, 4, 2, 1], [4, 2, 1, 1], [2, 1, 1, 0], [3, 4, 1, 0]]
// 输出：3
// 解释：上图展示了到达右下角格子经过的 3 个格子。
// 示例 3：



// 输入：grid = [[2, 1, 0], [1, 0, 0]]
// 输出：-1
// 解释：无法到达右下角格子。


// 提示：

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 10^5
// 1 <= m * n <= 10^5
// 0 <= grid[i][j] < m * n
// grid[m - 1][n - 1] == 0

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumVisitedCells = function (grid) {
  const m = grid.length, n = grid[0].length;
  const dist = new Array(m).fill(0).map(() => new Array(n).fill(-1));
  dist[0][0] = 1;
  const row = new Array(m).fill(0).map(() => new MinPriorityQueue());
  const col = new Array(n).fill(0).map(() => new MinPriorityQueue());

  const update = (x, y) => {
    if (x === -1 || y < x) {
      return y;
    }
    return x;
  };

  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      while (!row[i].isEmpty() && row[i].front().element[1] + grid[i][row[i].front().element[1]] < j) {
        row[i].dequeue();
      }
      if (!row[i].isEmpty()) {
        dist[i][j] = update(dist[i][j], dist[i][row[i].front().element[1]] + 1);
      }

      while (!col[j].isEmpty() && col[j].front().element[1] + grid[col[j].front().element[1]][j] < i) {
        col[j].dequeue();
      }
      if (!col[j].isEmpty()) {
        dist[i][j] = update(dist[i][j], dist[col[j].front().element[1]][j] + 1);
      }
      if (dist[i][j] !== -1) {
        row[i].enqueue([dist[i][j], j], dist[i][j]);
        col[j].enqueue([dist[i][j], i], dist[i][j]);
      }
    }
  }
  return dist[m - 1][n - 1];
};