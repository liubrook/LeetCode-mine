// 1277. 统计全为 1 的正方形子矩阵
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个 m * n 的矩阵，矩阵中的元素不是 0 就是 1，请你统计并返回其中完全由 1 组成的 正方形 子矩阵的个数。



// 示例 1：

// 输入：matrix =
//   [
//     [0, 1, 1, 1],
//     [1, 1, 1, 1],
//     [0, 1, 1, 1]
//   ]
// 输出：15
// 解释： 
// 边长为 1 的正方形有 10 个。
// 边长为 2 的正方形有 4 个。
// 边长为 3 的正方形有 1 个。
// 正方形的总数 = 10 + 4 + 1 = 15.
// 示例 2：

// 输入：matrix =
//   [
//     [1, 0, 1],
//     [1, 1, 0],
//     [1, 1, 0]
//   ]
// 输出：7
// 解释：
// 边长为 1 的正方形有 6 个。 
// 边长为 2 的正方形有 1 个。
// 正方形的总数 = 6 + 1 = 7.


// 提示：

// 1 <= arr.length <= 300
// 1 <= arr[0].length <= 300
// 0 <= arr[i][j] <= 1

/**
 * @param {number[][]} matrix
 * @return {number}
 */
var countSquares = function (matrix) {
  const m = matrix.length, n = matrix[0].length;
  const f = new Array(m).fill(0).map(() => new Array(n).fill(0));
  let ans = 0;
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (i === 0 || j === 0) {
        f[i][j] = matrix[i][j];
      } else if (matrix[i][j] === 0) {
        f[i][j] = 0;
      } else {
        f[i][j] = Math.min(f[i][j - 1], f[i - 1][j], f[i - 1][j - 1]) + 1;
      }
      ans += f[i][j];
    }
  }
  return ans;
};