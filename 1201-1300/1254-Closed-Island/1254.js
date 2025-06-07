// 1254. 统计封闭岛屿的数目
// 二维矩阵 grid 由 0 （土地）和 1 （水）组成。岛是由最大的4个方向连通的 0 组成的群，封闭岛是一个 完全 由1包围（左、上、右、下）的岛。

// 请返回 封闭岛屿 的数目。



// 示例 1：

// https://assets.leetcode.com/uploads/2019/10/31/sample_3_1610.png

// 输入：grid = [[1, 1, 1, 1, 1, 1, 1, 0], [1, 0, 0, 0, 0, 1, 1, 0], [1, 0, 1, 0, 1, 1, 1, 0], [1, 0, 0, 0, 0, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 0]]
// 输出：2
// 解释：
// 灰色区域的岛屿是封闭岛屿，因为这座岛屿完全被水域包围（即被 1 区域包围）。
// 示例 2：



// 输入：grid = [[0, 0, 1, 0, 0], [0, 1, 0, 1, 0], [0, 1, 1, 1, 0]]
// 输出：1
// 示例 3：

// 输入：grid = [[1, 1, 1, 1, 1, 1, 1],
// [1, 0, 0, 0, 0, 0, 1],
// [1, 0, 1, 1, 1, 0, 1],
// [1, 0, 1, 0, 1, 0, 1],
// [1, 0, 1, 1, 1, 0, 1],
// [1, 0, 0, 0, 0, 0, 1],
// [1, 1, 1, 1, 1, 1, 1]]
// 输出：2
// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/11/07/sample_4_1610.png

// 提示：

// 1 <= grid.length, grid[0].length <= 100
// 0 <= grid[i][j] <= 1


/**
 * @param {number[][]} grid
 * @return {number}
 */
const dir = [[-1, 0], [1, 0], [0, -1], [0, 1]];
var closedIsland = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  let ans = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) {
        const qu = [];
        grid[i][j] = 1;
        let closed = true;

        qu.push([i, j]);
        while (qu.length) {
          const arr = qu.shift();
          let cx = arr[0], cy = arr[1];
          if (cx === 0 || cy === 0 || cx === m - 1 || cy === n - 1) {
            closed = false;
          }
          for (let d = 0; d < 4; d++) {
            let nx = cx + dir[d][0];
            let ny = cy + dir[d][1];
            if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] === 0) {
              grid[nx][ny] = 1;
              qu.push([nx, ny]);
            }
          }
        }
        if (closed) {
          ans++;
        }
      }
    }
  }
  return ans;
};