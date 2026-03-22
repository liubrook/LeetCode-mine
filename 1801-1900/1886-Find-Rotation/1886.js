// 1886. 判断矩阵经轮转后是否一致
// 简单
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你两个大小为 n x n 的二进制矩阵 mat 和 target 。现 以 90 度顺时针轮转 矩阵 mat 中的元素 若干次 ，如果能够使 mat 与 target 一致，返回 true ；否则，返回 false 。

// 示例 1：
// https://assets.leetcode.com/uploads/2021/05/20/grid3.png

// 输入：mat = [[0,1],[1,0]], target = [[1,0],[0,1]]
// 输出：true
// 解释：顺时针轮转 90 度一次可以使 mat 和 target 一致。
// 示例 2：
// https://assets.leetcode.com/uploads/2021/05/20/grid4.png

// 输入：mat = [[0,1],[1,1]], target = [[1,0],[0,1]]
// 输出：false
// 解释：无法通过轮转矩阵中的元素使 equal 与 target 一致。
// 示例 3：
// https://assets.leetcode.com/uploads/2021/05/26/grid4.png

// 输入：mat = [[0,0,0],[0,1,0],[1,1,1]], target = [[1,1,1],[0,1,0],[0,0,0]]
// 输出：true
// 解释：顺时针轮转 90 度两次可以使 mat 和 target 一致。

// 提示：

// n == mat.length == target.length
// n == mat[i].length == target[i].length
// 1 <= n <= 10
// mat[i][j] 和 target[i][j] 不是 0 就是 1
/**
 * @param {number[][]} mat
 * @param {number[][]} target
 * @return {boolean}
 */
var findRotation = function (mat, target) {
  let n = mat.length;
  const rotate = (grid) => {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < i; j++) {
        [grid[i][j], grid[j][i]] = [grid[j][i], grid[i][j]];
      }
    }
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n / 2; j++) {
        [grid[i][j], grid[i][n - j - 1]] = [grid[i][n - j - 1], grid[i][j]];
      }
    }
  };
  return [0, 0, 0, 0].some(() => {
    rotate(mat);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (mat[i][j] !== target[i][j]) return false;
      }
    }
    return true;
  });
};
