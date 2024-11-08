// 3242. 设计相邻元素求和服务
// 简单
// 相关标签
// 相关企业
// 提示
// 给你一个 n x n 的二维数组 grid，它包含范围[0, n2 - 1] 内的不重复元素。

// 实现 neighborSum 类：

// neighborSum(int[][]grid) 初始化对象。
// int adjacentSum(int value) 返回在 grid 中与 value 相邻的元素之和，相邻指的是与 value 在上、左、右或下的元素。
// int diagonalSum(int value) 返回在 grid 中与 value 对角线相邻的元素之和，对角线相邻指的是与 value 在左上、右上、左下或右下的元素。

// https://assets.leetcode.com/uploads/2024/06/24/design.png


// 示例 1：

// 输入：

// ["neighborSum", "adjacentSum", "adjacentSum", "diagonalSum", "diagonalSum"]

// [[[[0, 1, 2], [3, 4, 5], [6, 7, 8]]], [1], [4], [4], [8]]

// 输出：[null, 6, 16, 16, 4]

// 解释：

// https://assets.leetcode.com/uploads/2024/06/24/designexample0.png

// 1 的相邻元素是 0、2 和 4。
// 4 的相邻元素是 1、3、5 和 7。
// 4 的对角线相邻元素是 0、2、6 和 8。
// 8 的对角线相邻元素是 4。
// 示例 2：

// 输入：

// ["neighborSum", "adjacentSum", "diagonalSum"]

// [[[[1, 2, 0, 3], [4, 7, 15, 6], [8, 9, 10, 11], [12, 13, 14, 5]]], [15], [9]]

// 输出：[null, 23, 45]

// 解释：

// https://assets.leetcode.com/uploads/2024/06/24/designexample2.png

// 15 的相邻元素是 0、10、7 和 6。
// 9 的对角线相邻元素是 4、12、14 和 15。


// 提示：

// 3 <= n == grid.length == grid[0].length <= 10
// 0 <= grid[i][j] <= n^2 - 1
// 所有 grid[i][j] 值均不重复。
// adjacentSum 和 diagonalSum 中的 value 均在范围[0, n^2 - 1] 内。
// 最多会调用 adjacentSum 和 diagonalSum 总共 2 * n^2 次。

/**
 * @param {number[][]} grid
 */
var NeighborSum = function (grid) {
  this.grid = grid;
  this.pos = {};
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      this.pos[grid[i][j]] = [i, j];
    }
  }
};

const dirs = [
  [[-1, 0], [1, 0], [0, -1], [0, 1]],
  [[-1, -1], [-1, 1], [1, -1], [1, 1]]
];

/** 
 * @param {number} value
 * @return {number}
 */
NeighborSum.prototype.adjacentSum = function (value) {
  return this.getSum(value, 0);
};

/** 
 * @param {number} value
 * @return {number}
 */
NeighborSum.prototype.diagonalSum = function (value) {
  return this.getSum(value, 1)
};

NeighborSum.prototype.getSum = function (value, idx) {
  const [x, y] = this.pos[value];
  let sum = 0;
  for (const [dx, dy] of dirs[idx]) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx >= 0 && nx < this.grid.length && ny >= 0 && ny < this.grid[0].length) {
      sum += this.grid[nx][ny];
    }
  }
  return sum;
}

/** 
 * Your NeighborSum object will be instantiated and called as such:
 * var obj = new NeighborSum(grid)
 * var param_1 = obj.adjacentSum(value)
 * var param_2 = obj.diagonalSum(value)
 */