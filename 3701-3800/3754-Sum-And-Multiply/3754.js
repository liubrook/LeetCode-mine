// 3754. 连接非零数字并乘以其数字和 I
// 简单
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个整数 n。

// 将 n 中所有的 非零数字 按照它们的原始顺序连接起来，形成一个新的整数 x。如果不存在 非零数字 ，则 x = 0。

// sum 为 x 中所有数字的 数字和 。

// 返回一个整数，表示 x * sum 的值。

// 示例 1：

// 输入： n = 10203004

// 输出： 12340

// 解释：

// 非零数字是 1、2、3 和 4。因此，x = 1234。
// 数字和为 sum = 1 + 2 + 3 + 4 = 10。
// 因此，答案是 x * sum = 1234 * 10 = 12340。
// 示例 2：

// 输入： n = 1000

// 输出： 1

// 解释：

// 非零数字是 1，因此 x = 1 且 sum = 1。
// 因此，答案是 x * sum = 1 * 1 = 1。

// 提示：

// 0 <= n <= 109
/**
 * @param {number} n
 * @return {number}
 */
var sumAndMultiply = function (n) {
  let x = 0;
  let sum = 0;
  for (let c of String(n)) {
    let d = parseInt(c, 10);
    sum += d;
    if (d > 0) {
      x = x * 10 + d;
    }
  }
  return x * sum;
};
