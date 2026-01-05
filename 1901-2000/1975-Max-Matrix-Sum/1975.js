// 1975. 最大方阵和
// 中等
// 相关标签
// 提示
// 给你一个 n x n 的整数方阵 matrix 。你可以执行以下操作 任意次 ：

// 选择 matrix 中 相邻 两个元素，并将它们都 乘以 -1 。
// 如果两个元素有 公共边 ，那么它们就是 相邻 的。

// 你的目的是 最大化 方阵元素的和。请你在执行以上操作之后，返回方阵的 最大 和。

// 示例 1：
// https://assets.leetcode.com/uploads/2021/07/16/pc79-q2ex1.png

// 输入：matrix = [[1,-1],[-1,1]]
// 输出：4
// 解释：我们可以执行以下操作使和等于 4 ：
// - 将第一行的 2 个元素乘以 -1 。
// - 将第一列的 2 个元素乘以 -1 。
// 示例 2：
// https://assets.leetcode.com/uploads/2021/07/16/pc79-q2ex2.png

// 输入：matrix = [[1,2,3],[-1,-2,-3],[1,2,3]]
// 输出：16
// 解释：我们可以执行以下操作使和等于 16 ：
// - 将第二行的最后 2 个元素乘以 -1 。

// 提示：

// n == matrix.length == matrix[i].length
// 2 <= n <= 250
// -10^5 <= matrix[i][j] <= 10^5
/**
 * @param {number[][]} matrix
 * @return {number}
 */
var maxMatrixSum = function (matrix) {
  const n = matrix.length;
  let cnt = 0; // 负数元素的数量
  let total = 0; // 所有元素的绝对值之和
  let mn = Number.MAX_SAFE_INTEGER; // 方阵元素的最小绝对值
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const absVal = Math.abs(matrix[i][j]);
      mn = Math.min(mn, absVal);
      if (matrix[i][j] < 0) {
        cnt++;
      }
      total += absVal;
    }
  }
  // 按照负数元素的数量的奇偶性讨论
  if (cnt % 2 === 0) {
    return total;
  } else {
    return total - 2 * mn;
  }
};
