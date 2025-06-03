// 600. 不含连续1的非负整数
// 给定一个正整数 n，找出小于或等于 n 的非负整数中，其二进制表示不包含 连续的1 的个数。

// 示例 1:

// 输入: 5
// 输出: 5
// 解释:
// 下面是带有相应二进制表示的非负整数 <= 5：
// 0 : 0
// 1 : 1
// 2 : 10
// 3 : 11
// 4 : 100
// 5 : 101
// 其中，只有整数3违反规则（有两个连续的1），其他5个满足规则。
// 说明: 1 <= n <= 109

/**
 * @param {number} n
 * @return {number}
 */
var findIntegers = function (n) {
  const dp = new Array(31).fill(0);
  dp[0] = dp[1] = 1;
  for (let i = 2; i < 31; ++i) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  let pre = 0, res = 0;
  for (let i = 29; i >= 0; --i) {
    let val = 1 << i;
    if ((n & val) !== 0) {
      res += dp[i + 1];
      if (pre === 1) {
        break;
      }
      pre = 1;
    } else {
      pre = 0;
    }

    if (i === 0) {
      ++res;
    }
  }
  return res;
}