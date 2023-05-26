// 1091. 二进制矩阵中的最短路径
// 给你一个 n x n 的二进制矩阵 grid 中，返回矩阵中最短 畅通路径 的长度。如果不存在这样的路径，返回 - 1 。

// 二进制矩阵中的 畅通路径 是一条从 左上角 单元格（即，(0, 0)）到 右下角 单元格（即，(n - 1, n - 1)）的路径，该路径同时满足下述要求：

// 路径途经的所有单元格都的值都是 0 。
// 路径中所有相邻的单元格应当在 8 个方向之一 上连通（即，相邻两单元之间彼此不同且共享一条边或者一个角）。
// 畅通路径的长度 是该路径途经的单元格总数。



// 示例 1：

// https://assets.leetcode.com/uploads/2021/02/18/example1_1.png
// 输入：grid = [[0, 1], [1, 0]]
// 输出：2
// 示例 2：

// https://assets.leetcode.com/uploads/2021/02/18/example2_1.png
// 输入：grid = [[0, 0, 0], [1, 1, 0], [1, 1, 0]]
// 输出：4
// 示例 3：

// 输入：grid = [[1, 0, 0], [1, 1, 0], [1, 1, 0]]
// 输出：-1


// 提示：

// n == grid.length
// n == grid[i].length
// 1 <= n <= 100
// grid[i][j] 为 0 或 1

/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {
  if (grid[0][0] === 1) {
    return -1;
  }
  const n = grid.length;
  const dist = new Array(n).fill(undefined).map(() => new Array(n).fill(Infinity));
  dist[0][0] = 1;
  const queue = [[0, 0]];
  while (queue.length > 0) {
    const [x, y] = queue.shift();
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (x == n - 1 && y == n - 1) {
          return dist[x][y];
        }
        if (x + dx < 0 || x + dx >= n || y + dy < 0 || y + dy >= n) { // 越界
          continue;
        }
        if (grid[x + dx][y + dy] > 0 || dist[x + dx][y + dy] <= dist[x][y] + 1) { // 单元格值不为 0 或已被访问
          continue;
        }
        dist[x + dx][y + dy] = dist[x][y] + 1;
        queue.push([x + dx, y + dy]);
      }
    }
  }
  return -1;
};