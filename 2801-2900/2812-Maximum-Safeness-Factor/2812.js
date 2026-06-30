// 2812. 找出最安全路径
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个下标从 0 开始、大小为 n x n 的二维矩阵 grid ，其中 (r, c) 表示：

// 如果 grid[r][c] = 1 ，则表示一个存在小偷的单元格
// 如果 grid[r][c] = 0 ，则表示一个空单元格
// 你最开始位于单元格 (0, 0) 。在一步移动中，你可以移动到矩阵中的任一相邻单元格，包括存在小偷的单元格。

// 矩阵中路径的 安全系数 定义为：从路径中任一单元格到矩阵中任一小偷所在单元格的 最小 曼哈顿距离。

// 返回所有通向单元格 (n - 1, n - 1) 的路径中的 最大安全系数 。

// 单元格 (r, c) 的某个 相邻 单元格，是指在矩阵中存在的 (r, c + 1)、(r, c - 1)、(r + 1, c) 和 (r - 1, c) 之一。

// 两个单元格 (a, b) 和 (x, y) 之间的 曼哈顿距离 等于 | a - x | + | b - y | ，其中 |val| 表示 val 的绝对值。

// 示例 1：
// https://assets.leetcode.com/uploads/2023/07/02/example1.png

// 输入：grid = [[1,0,0],[0,0,0],[0,0,1]]
// 输出：0
// 解释：从 (0, 0) 到 (n - 1, n - 1) 的每条路径都经过存在小偷的单元格 (0, 0) 和 (n - 1, n - 1) 。
// 示例 2：
// https://assets.leetcode.com/uploads/2023/07/02/example2.png

// 输入：grid = [[0,0,1],[0,0,0],[0,0,0]]
// 输出：2
// 解释：
// 上图所示路径的安全系数为 2：
// - 该路径上距离小偷所在单元格（0，2）最近的单元格是（0，0）。它们之间的曼哈顿距离为 | 0 - 0 | + | 0 - 2 | = 2 。
// 可以证明，不存在安全系数更高的其他路径。
// 示例 3：
// https://assets.leetcode.com/uploads/2023/07/02/example3.png

// 输入：grid = [[0,0,0,1],[0,0,0,0],[0,0,0,0],[1,0,0,0]]
// 输出：2
// 解释：
// 上图所示路径的安全系数为 2：
// - 该路径上距离小偷所在单元格（0，3）最近的单元格是（1，2）。它们之间的曼哈顿距离为 | 0 - 1 | + | 3 - 2 | = 2 。
// - 该路径上距离小偷所在单元格（3，0）最近的单元格是（3，2）。它们之间的曼哈顿距离为 | 3 - 3 | + | 0 - 2 | = 2 。
// 可以证明，不存在安全系数更高的其他路径。

// 提示：

// 1 <= grid.length == n <= 400
// grid[i].length == n
// grid[i][j] 为 0 或 1
// grid 至少存在一个小偷
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maximumSafenessFactor = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  if (grid[0][0] === 1 || grid[m - 1][n - 1] === 1) {
    return 0;
  }

  const dis = Array.from({ length: m }, () => Array(n).fill(-1));
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];
  const q = new Queue();
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        q.push([i, j]);
        dis[i][j] = 0;
      }
    }
  }

  while (!q.isEmpty()) {
    const [cx, cy] = q.dequeue();
    for (const [dx, dy] of dirs) {
      const nx = cx + dx;
      const ny = cy + dy;
      if (nx >= 0 && nx < m && ny >= 0 && ny < n && dis[nx][ny] === -1) {
        dis[nx][ny] = dis[cx][cy] + 1;
        q.push([nx, ny]);
      }
    }
  }

  const check = (limit) => {
    const visit = Array.from({ length: m }, () => Array(n).fill(false));
    const q = [[0, 0]];
    visit[0][0] = true;
    let head = 0;

    while (head < q.length) {
      const [cx, cy] = q[head++];
      if (cx === m - 1 && cy === n - 1) {
        return true;
      }
      for (const [dx, dy] of dirs) {
        const nx = cx + dx;
        const ny = cy + dy;
        if (
          nx >= 0 &&
          nx < m &&
          ny >= 0 &&
          ny < n &&
          !visit[nx][ny] &&
          dis[nx][ny] >= limit
        ) {
          q.push([nx, ny]);
          visit[nx][ny] = true;
        }
      }
    }
    return false;
  };

  let lo = 0,
    hi = Math.min(dis[0][0], dis[m - 1][n - 1]);
  let res = 0;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (check(mid)) {
      res = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return res;
};
