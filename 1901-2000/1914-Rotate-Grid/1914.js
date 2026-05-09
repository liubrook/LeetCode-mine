// 1914. 循环轮转矩阵
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个大小为 m x n 的整数矩阵 grid​​​ ，其中 m 和 n 都是 偶数 ；另给你一个整数 k 。

// 矩阵由若干层组成，如下图所示，每种颜色代表一层：

// https://assets.leetcode.com/uploads/2021/06/10/ringofgrid.png

// 矩阵的循环轮转是通过分别循环轮转矩阵中的每一层完成的。在对某一层进行一次循环旋转操作时，层中的每一个元素将会取代其 逆时针 方向的相邻元素。轮转示例如下：
// https://assets.leetcode.com/uploads/2021/06/22/explanation_grid.jpg

// 返回执行 k 次循环轮转操作后的矩阵。

// 示例 1：

// https://assets.leetcode.com/uploads/2021/06/19/rod2.png

// 输入：grid = [[40,10],[30,20]], k = 1
// 输出：[[10,20],[40,30]]
// 解释：上图展示了矩阵在执行循环轮转操作时每一步的状态。
// 示例 2：
// https://assets.leetcode.com/uploads/2021/06/10/ringofgrid5.png
// https://assets.leetcode.com/uploads/2021/06/10/ringofgrid6.png
// https://assets.leetcode.com/uploads/2021/06/10/ringofgrid7.png
// 输入：grid = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]], k = 2
// 输出：[[3,4,8,12],[2,11,10,16],[1,7,6,15],[5,9,13,14]]
// 解释：上图展示了矩阵在执行循环轮转操作时每一步的状态。

// 提示：

// m == grid.length
// n == grid[i].length
// 2 <= m, n <= 50
// m 和 n 都是 偶数
// 1 <= grid[i][j] <= 5000
// 1 <= k <= 10^9
/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
var rotateGrid = function (grid, k) {
  const m = grid.length;
  const n = grid[0].length;
  const nlayer = Math.min(Math.floor(m / 2), Math.floor(n / 2)); // 层数
  // 从左上角起逆时针枚举每一层
  for (let layer = 0; layer < nlayer; ++layer) {
    const r = [];
    const c = [];
    const val = []; // 每个元素的行下标，列下标与数值
    for (let i = layer; i < m - layer - 1; ++i) {
      // 左
      r.push(i);
      c.push(layer);
      val.push(grid[i][layer]);
    }
    for (let j = layer; j < n - layer - 1; ++j) {
      // 下
      r.push(m - layer - 1);
      c.push(j);
      val.push(grid[m - layer - 1][j]);
    }
    for (let i = m - layer - 1; i > layer; --i) {
      // 右
      r.push(i);
      c.push(n - layer - 1);
      val.push(grid[i][n - layer - 1]);
    }
    for (let j = n - layer - 1; j > layer; --j) {
      // 上
      r.push(layer);
      c.push(j);
      val.push(grid[layer][j]);
    }
    const total = val.length; // 每一层的元素总数
    const kk = k % total; // 等效轮转次数
    // 找到每个下标对应的轮转后的取值
    for (let i = 0; i < total; ++i) {
      const idx = (i + total - kk) % total; // 轮转后取值对应的下标
      grid[r[i]][c[i]] = val[idx];
    }
  }
  return grid;
};
