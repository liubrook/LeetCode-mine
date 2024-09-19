// 2376. 统计特殊整数
// 困难
// 相关标签
// 相关企业
// 提示
// 如果一个正整数每一个数位都是 互不相同 的，我们称它是 特殊整数 。

// 给你一个 正 整数 n ，请你返回区间[1, n] 之间特殊整数的数目。



// 示例 1：

// 输入：n = 20
// 输出：19
// 解释：1 到 20 之间所有整数除了 11 以外都是特殊整数。所以总共有 19 个特殊整数。
// 示例 2：

// 输入：n = 5
// 输出：5
// 解释：1 到 5 所有整数都是特殊整数。
// 示例 3：

// 输入：n = 135
// 输出：110
// 解释：从 1 到 135 总共有 110 个整数是特殊整数。
// 不特殊的部分数字为：22 ，114 和 131 。


// 提示：

// 1 <= n <= 2 * 10^9

/**
 * @param {number} n
 * @return {number}
 */
var countSpecialNumbers = function (n) {
  const nStr = n.toString();
  const memo = new Map();

  const dp = (mask, prefixSmaller, nStr) => {
    if (countOnes(mask) === nStr.length) {
      return 1;
    }
    const key = mask * 2 + (prefixSmaller ? 1 : 0);
    if (!memo.has(key)) {
      let res = 0;
      let lowerBound = mask === 0 ? 1 : 0;
      let upperBound = prefixSmaller ? 9 : nStr[countOnes(mask)] - '0';
      for (let i = lowerBound; i <= upperBound; i++) {
        if (((mask >> i) & 1) === 0) {
          res += dp(mask | (1 << i), prefixSmaller || i < upperBound, nStr);
        }
      }
      memo.set(key, res);
    }
    return memo.get(key);
  };

  let res = 0;
  let prod = 9;
  for (let i = 0; i < nStr.length - 1; i++) {
    res += prod;
    prod *= 9 - i;
  }
  res += dp(0, false, nStr);
  return res;
};

const countOnes = (x) => {
  let count = 0;
  while (x) {
    count++;
    x &= x - 1;
  }
  return count;
}