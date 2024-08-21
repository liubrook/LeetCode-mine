// 3133. 数组最后一个元素的最小值
// 中等
// 相关标签
// 相关企业
// 提示
// 给你两个整数 n 和 x 。你需要构造一个长度为 n 的 正整数 数组 nums ，对于所有 0 <= i < n - 1 ，满足 nums[i + 1] 大于 nums[i] ，并且数组 nums 中所有元素的按位 AND 运算结果为 x 。

// 返回 nums[n - 1] 可能的 最小 值。



// 示例 1：

// 输入：n = 3, x = 4

// 输出：6

// 解释：

// 数组 nums 可以是[4, 5, 6] ，最后一个元素为 6 。

// 示例 2：

// 输入：n = 2, x = 7

// 输出：15

// 解释：

// 数组 nums 可以是[7, 15] ，最后一个元素为 15 。



// 提示：

// 1 <= n, x <= 10^8

/**
 * @param {number} n
 * @param {number} x
 * @return {number}
 */
var minEnd = function (n, x) {
  const bitCount = 64 - leadingZeros(n) - leadingZeros(x);
  let res = BigInt(x);
  let j = 0;
  n--;
  for (let i = 0; i < bitCount; ++i) {
    if (((res >> BigInt(i)) & 1n) === 0n) {
      if (((BigInt(n) >> BigInt(j)) & 1n) != 0n) {
        res |= 1n << BigInt(i);
      }
      j++;
    }
  }
  return Number(res);
};

function leadingZeros(x) {
  return x === 0 ? 32 : 31 - Math.floor(Math.log2(x));
}