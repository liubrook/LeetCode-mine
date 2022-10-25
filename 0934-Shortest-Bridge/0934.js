// 934. 最短的桥
// 给你一个大小为 n x n 的二元矩阵 grid ，其中 1 表示陆地，0 表示水域。

// 岛 是由四面相连的 1 形成的一个最大组，即不会与非组内的任何其他 1 相连。grid 中 恰好存在两座岛 。

// 你可以将任意数量的 0 变为 1 ，以使两座岛连接起来，变成 一座岛 。

// 返回必须翻转的 0 的最小数目。



// 示例 1：

// 输入：grid = [[0, 1], [1, 0]]
// 输出：1
// 示例 2：

// 输入：grid = [[0, 1, 0], [0, 0, 0], [0, 0, 1]]
// 输出：2
// 示例 3：

// 输入：grid = [[1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 1, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1]]
// 输出：1


// 提示：

// n == grid.length == grid[i].length
// 2 <= n <= 100
// grid[i][j] 为 0 或 1
// grid 中恰有两个岛

/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestBridge = function (grid) {
  const n = grid.length;
  const dirs = [[-1, 0], [1, 0], [0, 1], [0, -1]];
  const island = [];
  const queue = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        queue.push([i, j]);
        grid[i][j] = -1;
        while (queue.length !== 0) {
          const cell = queue.shift();
          let x = cell[0], y = cell[1];
          island.push(cell);
          for (let k = 0; k < 4; k++) {
            let nx = x + dirs[k][0];
            let ny = y + dirs[k][1];
            if (nx >= 0 && ny >= 0 && nx < n && ny < n && grid[nx][ny] == 1) {
              queue.push([nx, ny]);
              grid[nx][ny] = -1;
            }
          }
        }
        for (const cell of island) {
          queue.push(cell);
        }
        let step = 0;
        while (queue.length !== 0) {
          const sz = queue.length;
          for (let k = 0; k < sz; k++) {
            const cell = queue.shift();
            let x = cell[0], y = cell[1];
            for (let d = 0; d < 4; d++) {
              let nx = x + dirs[d][0];
              let ny = y + dirs[d][1];
              if (nx >= 0 && ny >= 0 && nx < n && ny < n) {
                if (grid[nx][ny] === 0) {
                  queue.push([nx, ny]);
                  grid[nx][ny] = -1;
                } else if (grid[nx][ny] === 1) {
                  return step;
                }
              }
            }
          }
          step++;
        }
      }
    }
  }
  return 0;
};