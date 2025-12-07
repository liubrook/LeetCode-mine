// 1523. 在区间范围内统计奇数数目
// 简单
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你两个非负整数 low 和 high 。请你返回 low 和 high 之间（包括二者）奇数的数目。

// 示例 1：

// 输入：low = 3, high = 7
// 输出：3
// 解释：3 到 7 之间奇数数字为 [3,5,7] 。
// 示例 2：

// 输入：low = 8, high = 10
// 输出：1
// 解释：8 到 10 之间奇数数字为 [9] 。

// 提示：

// 0 <= low <= high <= 10^9
/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var countOdds = function (low, high) {
  return pre(high) - pre(low - 1);
};
function pre(x) {
  return (x + 1) >> 1;
}

var countOdds1 = function (low, high) {
  let count = 0;
  for (let i = low; i <= high; i++) {
    if (i & (1 === 1)) {
      count++;
    }
  }
  return count;
};
