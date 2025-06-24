// 2427. 公因子的数目
// 给你两个正整数 a 和 b ，返回 a 和 b 的 公 因子的数目。

// 如果 x 可以同时整除 a 和 b ，则认为 x 是 a 和 b 的一个 公因子 。



// 示例 1：

// 输入：a = 12, b = 6
// 输出：4
// 解释：12 和 6 的公因子是 1、2、3、6 。
// 示例 2：

// 输入：a = 25, b = 30
// 输出：2
// 解释：25 和 30 的公因子是 1、5 。


// 提示：

// 1 <= a, b <= 1000

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var commonFactors = function (a, b) {
  let ans = 0;
  for (let x = 1; x <= Math.min(a, b); ++x) {
    if (a % x === 0 && b % x === 0) {
      ++ans;
    }
  }
  return ans;
};