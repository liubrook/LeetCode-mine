// 2929. 给小朋友们分糖果 II
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你两个正整数 n 和 limit 。

// 请你将 n 颗糖果分给 3 位小朋友，确保没有任何小朋友得到超过 limit 颗糖果，请你返回满足此条件下的 总方案数 。



// 示例 1：

// 输入：n = 5, limit = 2
// 输出：3
// 解释：总共有 3 种方法分配 5 颗糖果，且每位小朋友的糖果数不超过 2 ：(1, 2, 2) ，(2, 1, 2) 和(2, 2, 1) 。
// 示例 2：

// 输入：n = 3, limit = 3
// 输出：10
// 解释：总共有 10 种方法分配 3 颗糖果，且每位小朋友的糖果数不超过 3 ：(0, 0, 3) ，(0, 1, 2) ，(0, 2, 1) ，(0, 3, 0) ，(1, 0, 2) ，(1, 1, 1) ，(1, 2, 0) ，(2, 0, 1) ，(2, 1, 0) 和(3, 0, 0) 。


// 提示：

// 1 <= n <= 10^6
// 1 <= limit <= 10^6

/**
 * @param {number} n
 * @param {number} limit
 * @return {number}
 */
var distributeCandies = function (n, limit) {
  let ans = 0;
  for (let i = 0; i <= Math.min(limit, n); i++) {
    if (n - i > 2 * limit) {
      continue;
    }
    ans += Math.min(n - i, limit) - Math.max(0, n - i - limit) + 1;
  }
  return ans;
};