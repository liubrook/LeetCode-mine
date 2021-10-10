// 441. 排列硬币
// 你总共有 n 枚硬币，并计划将它们按阶梯状排列。对于一个由 k 行组成的阶梯，其第 i 行必须正好有 i 枚硬币。阶梯的最后一行 可能 是不完整的。

// 给你一个数字 n ，计算并返回可形成 完整阶梯行 的总行数。

 

// 示例 1：

// https://assets.leetcode.com/uploads/2021/04/09/arrangecoins1-grid.jpg
// 输入：n = 5
// 输出：2
// 解释：因为第三行不完整，所以返回 2 。
// 示例 2：

// https://assets.leetcode.com/uploads/2021/04/09/arrangecoins2-grid.jpg
// 输入：n = 8
// 输出：3
// 解释：因为第四行不完整，所以返回 3 。
 

// 提示：

// 1 <= n <= 231 - 1

/**
 * @param {number} n
 * @return {number}
 */
var arrangeCoins = function(n) {
  let left = 1, right = n;
  while (left < right) {
    const mid = Math.floor((right - left + 1) / 2) + left;
    if (mid * (mid + 1) <= 2 * n) {
      left = mid;
    }else {
      right = mid - 1;
    }
  }
  return left;
}