// 878. 第 N 个神奇数字
// 一个正整数如果能被 a 或 b 整除，那么它是神奇的。

// 给定三个整数 n, a, b ，返回第 n 个神奇的数字。因为答案可能很大，所以返回答案 对 109 + 7 取模 后的值。



// 示例 1：

// 输入：n = 1, a = 2, b = 3
// 输出：2
// 示例 2：

// 输入：n = 4, a = 2, b = 3
// 输出：6


// 提示：

// 1 <= n <= 109
// 2 <= a, b <= 4 * 104

/**
 * @param {number} n
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
const MOD = 1000000007;
var nthMagicalNumber = function (n, a, b) {
  let l = Math.min(a, b);
  let r = n * Math.min(a, b);
  const c = lcm(a, b);
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    const cnt = Math.floor(mid / a) + Math.floor(mid / b) - Math.floor(mid / c);
    if (cnt >= n) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  return (r + 1) % MOD;
}

const lcm = (a, b) => {
  return Math.floor(a * b / gcd(a, b));
}

const gcd = (a, b) => {
  return b !== 0 ? gcd(b, a % b) : a;
};