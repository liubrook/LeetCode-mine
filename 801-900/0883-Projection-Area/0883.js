// 883. 三维形体投影面积
// 在 n x n 的网格 grid 中，我们放置了一些与 x，y，z 三轴对齐的 1 x 1 x 1 立方体。

// 每个值 v = grid[i][j] 表示 v 个正方体叠放在单元格(i, j) 上。

// 现在，我们查看这些立方体在 xy 、yz 和 zx 平面上的投影。

// 投影 就像影子，将 三维 形体映射到一个 二维 平面上。从顶部、前面和侧面看立方体时，我们会看到“影子”。

// 返回 所有三个投影的总面积 。



// 示例 1：

// https://s3-lc-upload.s3.amazonaws.com/uploads/2018/08/02/shadow.png

// 输入：[[1, 2], [3, 4]]
// 输出：17
// 解释：这里有该形体在三个轴对齐平面上的三个投影(“阴影部分”)。
// 示例 2:

// 输入：grid = [[2]]
// 输出：5
// 示例 3：

// 输入：[[1, 0], [0, 2]]
// 输出：8


// 提示：

// n == grid.length == grid[i].length
// 1 <= n <= 50
// 0 <= grid[i][j] <= 50


/**
 * @param {number[][]} grid
 * @return {number}
 */
var projectionArea = function (grid) {
  const n = grid.length;
  let xyArea = 0, yzArea = 0, zxArea = 0;
  for (let i = 0; i < n; i++) {
    let yzHeight = 0, zxHeight = 0;
    for (let j = 0; j < n; j++) {
      xyArea += grid[i][j] > 0 ? 1 : 0;
      yzHeight = Math.max(yzHeight, grid[i][j]);
      zxHeight = Math.max(zxHeight, grid[j][i]);
    }
    yzArea += yzHeight;
    zxArea += zxHeight;
  }
  return xyArea + yzArea + zxArea;
};