// 3459. 最长 V 形对角线段的长度
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个大小为 n x m 的二维整数矩阵 grid，其中每个元素的值为 0、1 或 2。

// V 形对角线段 定义如下：

// 线段从 1 开始。
// 后续元素按照以下无限序列的模式排列：2, 0, 2, 0, ...。
// 该线段：
// 起始于某个对角方向（左上到右下、右下到左上、右上到左下或左下到右上）。
// 沿着相同的对角方向继续，保持 序列模式 。
// 在保持 序列模式 的前提下，最多允许 一次顺时针 90 度转向 另一个对角方向。

// https://pic.leetcode.cn/1739609732-jHpPma-length_of_longest3.jpg
// 返回最长的 V 形对角线段 的 长度 。如果不存在有效的线段，则返回 0。



// 示例 1：

// 输入： grid = [[2, 2, 1, 2, 2], [2, 0, 2, 2, 0], [2, 0, 1, 1, 0], [1, 0, 2, 2, 2], [2, 0, 0, 2, 2]]

// 输出： 5

// 解释：

// https://pic.leetcode.cn/1739609768-rhePxN-matrix_1-2.jpg

// 最长的 V 形对角线段长度为 5，路径如下：(0, 2) → (1, 3) → (2, 4)，在(2, 4) 处进行 顺时针 90 度转向 ，继续路径为(3, 3) → (4, 2)。

// 示例 2：

// 输入： grid = [[2, 2, 2, 2, 2], [2, 0, 2, 2, 0], [2, 0, 1, 1, 0], [1, 0, 2, 2, 2], [2, 0, 0, 2, 2]]

// 输出： 4

// 解释：

// https://pic.leetcode.cn/1739609774-nYJElV-matrix_2.jpg

// 最长的 V 形对角线段长度为 4，路径如下：(2, 3) → (3, 2)，在(3, 2) 处进行 顺时针 90 度转向 ，继续路径为(2, 1) → (1, 0)。

// 示例 3：

// 输入： grid = [[1, 2, 2, 2, 2], [2, 2, 2, 2, 0], [2, 0, 0, 0, 0], [0, 0, 2, 2, 2], [2, 0, 0, 2, 0]]

// 输出： 5

// 解释：

// https://pic.leetcode.cn/1739609780-tlkdUW-matrix_3.jpg

// 最长的 V 形对角线段长度为 5，路径如下：(0, 0) → (1, 1) → (2, 2) → (3, 3) → (4, 4)。

// 示例 4：

// 输入： grid = [[1]]

// 输出： 1

// 解释：

// 最长的 V 形对角线段长度为 1，路径如下：(0, 0)。



// 提示：

// n == grid.length
// m == grid[i].length
// 1 <= n, m <= 500
// grid[i][j] 的值为 0、1 或 2。

/**
 * @param {number[][]} grid
 * @return {number}
 */
var lenOfVDiagonal = function (grid) {
  const DIRS = [[1, 1], [1, -1], [-1, -1], [-1, 1]];
  const m = grid.length, n = grid[0].length;
  const memo = new Array(m * n * 8).fill(-1);

  function dfs(cx, cy, direction, turn, target) {
    const nx = cx + DIRS[direction][0];
    const ny = cy + DIRS[direction][1];
    /* 如果超出边界或者下一个节点值不是目标值，则返回 */
    if (nx < 0 || ny < 0 || nx >= m || ny >= n || grid[nx][ny] != target) {
      return 0;
    }

    const turnInt = turn ? 1 : 0;
    const index = nx * n * 8 + ny * 8 + direction * 2 + turnInt;
    if (memo[index] !== -1) {
      return memo[index];
    }

    /* 按照原来的方向继续行走 */
    let maxStep = dfs(nx, ny, direction, turn, 2 - target);
    if (turn) {
      /* 顺时针旋转 90 度转向 */
      maxStep = Math.max(maxStep, dfs(nx, ny, (direction + 1) % 4, false, 2 - target));
    }
    memo[index] = maxStep + 1;
    return maxStep + 1;
  }

  let res = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        for (let direction = 0; direction < 4; direction++) {
          res = Math.max(res, dfs(i, j, direction, true, 2) + 1);
        }
      }
    }
  }
  return res;
};