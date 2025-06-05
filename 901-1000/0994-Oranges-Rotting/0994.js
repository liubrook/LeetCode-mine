// 994. 腐烂的橘子
// 中等
// 相关标签
// 相关企业
// 在给定的 m x n 网格 grid 中，每个单元格可以有以下三个值之一：

// 值 0 代表空单元格；
// 值 1 代表新鲜橘子；
// 值 2 代表腐烂的橘子。
// 每分钟，腐烂的橘子 周围 4 个方向上相邻 的新鲜橘子都会腐烂。

// 返回 直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 - 1 。



// 示例 1：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/02/16/oranges.png

// 输入：grid = [[2, 1, 1], [1, 1, 0], [0, 1, 1]]
// 输出：4
// 示例 2：

// 输入：grid = [[2, 1, 1], [0, 1, 1], [1, 0, 1]]
// 输出：-1
// 解释：左下角的橘子（第 2 行， 第 0 列）永远不会腐烂，因为腐烂只会发生在 4 个方向上。
// 示例 3：

// 输入：grid = [[0, 2]]
// 输出：0
// 解释：因为 0 分钟时已经没有新鲜橘子了，所以答案就是 0 。


// 提示：

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 10
// grid[i][j] 仅为 0、1 或 2

/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  const R = grid.length, C = grid[0].length;
  const dr = [-1, 0, 1, 0];
  const dc = [0, -1, 0, 1];
  const queue = [];
  const depth = new Map();

  for (let r = 0; r < R; ++r) {
    for (let c = 0; c < C; ++c) {
      if (grid[r][c] === 2) {
        const code = r * C + c;
        queue.push(code);
        depth.set(code, 0);
      }
    }
  }

  let ans = 0;
  while (queue.length !== 0) {
    const code = queue.shift();
    const r = Math.floor(code / C), c = code % C;
    for (let k = 0; k < 4; ++k) {
      const nr = r + dr[k];
      const nc = c + dc[k];
      if (0 <= nr && nr < R && 0 <= nc && nc < C && grid[nr][nc] === 1) {
        grid[nr][nc] = 2;
        const ncode = nr * C + nc;
        queue.push(ncode);
        depth.set(ncode, depth.get(code) + 1);
        ans = depth.get(ncode);
      }
    }
  }

  const freshOrangesCount = grid.reduce((acc, row) => acc + row.reduce((acc, v) => acc + (v === 1 ? 1 : 0), 0), 0);
  return freshOrangesCount > 0 ? -1 : ans;
};