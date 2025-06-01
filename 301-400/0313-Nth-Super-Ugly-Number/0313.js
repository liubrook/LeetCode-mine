// 313. 超级丑数
// 超级丑数 是一个正整数，并满足其所有质因数都出现在质数数组 primes 中。

// 给你一个整数 n 和一个整数数组 primes ，返回第 n 个 超级丑数 。

// 题目数据保证第 n 个 超级丑数 在 32 - bit 带符号整数范围内。



// 示例 1：

// 输入：n = 12, primes = [2, 7, 13, 19]
// 输出：32
// 解释：给定长度为 4 的质数数组 primes = [2, 7, 13, 19]，前 12 个超级丑数序列为：[1, 2, 4, 7, 8, 13, 14, 16, 19, 26, 28, 32] 。
// 示例 2：

// 输入：n = 1, primes = [2, 3, 5]
// 输出：1
// 解释：1 不含质因数，因此它的所有质因数都在质数数组 primes = [2, 3, 5] 中。

// 提示：

// 1 <= n <= 106
// 1 <= primes.length <= 100
// 2 <= primes[i] <= 1000
// 题目数据 保证 primes[i] 是一个质数
// primes 中的所有值都 互不相同 ，且按 递增顺序 排列

/**
 * @param {number} n
 * @param {number[]} primes
 * @return {number}
 */

var nthSuperUglyNumber = function (n, primes) {
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  const m = primes.length;
  const pointers = new Array(m).fill(1);
  for (let i = 2; i <= n; i++) {
    const nums = new Array(m).fill(m);
    let minNum = Number.MAX_SAFE_INTEGER;
    for (let j = 0; j < m; j++) {
      nums[j] = dp[pointers[j]] * primes[j];
      minNum = Math.min(minNum, nums[j]);
    }
    dp[i] = minNum;
    for (let j = 0; j < m; j++) {
      if (minNum == nums[j]) {
        pointers[j]++;
      }
    }
  }
  return dp[n];
}