// 1391. 检查网格中是否存在有效路径
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个 m x n 的网格 grid。网格里的每个单元都代表一条街道。grid[i][j] 的街道可以是：

// 1 表示连接左单元格和右单元格的街道。
// 2 表示连接上单元格和下单元格的街道。
// 3 表示连接左单元格和下单元格的街道。
// 4 表示连接右单元格和下单元格的街道。
// 5 表示连接左单元格和上单元格的街道。
// 6 表示连接右单元格和上单元格的街道。
// https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/03/21/main.png

// 你最开始从左上角的单元格 (0,0) 开始出发，网格中的「有效路径」是指从左上方的单元格 (0,0) 开始、一直到右下方的 (m-1,n-1) 结束的路径。该路径必须只沿着街道走。

// 注意：你 不能 变更街道。

// 如果网格中存在有效的路径，则返回 true，否则返回 false 。

// 示例 1：

// https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/03/21/e1.png

// 输入：grid = [[2,4,3],[6,5,2]]
// 输出：true
// 解释：如图所示，你可以从 (0, 0) 开始，访问网格中的所有单元格并到达 (m - 1, n - 1) 。
// 示例 2：

// https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/03/21/e2.png

// 输入：grid = [[1,2,1],[1,2,1]]
// 输出：false
// 解释：如图所示，单元格 (0, 0) 上的街道没有与任何其他单元格上的街道相连，你只会停在 (0, 0) 处。
// 示例 3：

// 输入：grid = [[1,1,2]]
// 输出：false
// 解释：你会停在 (0, 1)，而且无法到达 (0, 2) 。
// 示例 4：

// 输入：grid = [[1,1,1,1,1,1,3]]
// 输出：true
// 示例 5：

// 输入：grid = [[2],[2],[2],[2],[2],[2],[6]]
// 输出：true

// 提示：

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 300
// 1 <= grid[i][j] <= 6
/**
 * @param {number[][]} grid
 * @return {boolean}
 */
const DIRS = [
  [],
  [
    [0, -1],
    [0, 1],
  ], // 站在街道 1，可以往左或者往右
  [
    [-1, 0],
    [1, 0],
  ], // 站在街道 2，可以往上或者往下
  [
    [0, -1],
    [1, 0],
  ], // 站在街道 3，可以往左或者往下
  [
    [0, 1],
    [1, 0],
  ], // 站在街道 4，可以往右或者往下
  [
    [0, -1],
    [-1, 0],
  ], // 站在街道 5，可以往左或者往上
  [
    [0, 1],
    [-1, 0],
  ], // 站在街道 6，可以往右或者往上
];

// 判断街道 street 是否包含移动方向 (dx, dy)
function contains(street, dx, dy) {
  const ds = DIRS[street];
  return (
    (ds[0][0] === dx && ds[0][1] === dy) || (ds[1][0] === dx && ds[1][1] === dy)
  );
}

var hasValidPath = function (grid) {
  const m = grid.length,
    n = grid[0].length;
  const vis = Array.from({ length: m }, () => Array(n).fill(false));

  function dfs(x, y) {
    if (x === m - 1 && y === n - 1) {
      return true;
    }
    vis[x][y] = true; // 标记 (x, y) 访问过，从而避免重复访问
    for (const [dx, dy] of DIRS[grid[x][y]]) {
      // 枚举下一步往哪走
      const i = x + dx,
        j = y + dy;
      if (
        0 <= i &&
        i < m &&
        0 <= j &&
        j < n &&
        !vis[i][j] &&
        contains(grid[i][j], -dx, -dy) &&
        dfs(i, j)
      ) {
        return true;
      }
    }
    return false;
  }

  return dfs(0, 0);
};
