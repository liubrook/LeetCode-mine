// 3272. 统计好整数的数目
// 困难
// 相关标签
// 相关企业
// 提示
// 给你两个 正 整数 n 和 k 。

// 如果一个整数 x 满足以下条件，那么它被称为 k 回文 整数 。

// x 是一个 回文整数 。
// x 能被 k 整除。
// 如果一个整数的数位重新排列后能得到一个 k 回文整数 ，那么我们称这个整数为 好 整数。比方说，k = 2 ，那么 2020 可以重新排列得到 2002 ，2002 是一个 k 回文串，所以 2020 是一个好整数。而 1010 无法重新排列数位得到一个 k 回文整数。

// 请你返回 n 个数位的整数中，有多少个 好 整数。

// 注意 ，任何整数在重新排列数位之前或者之后 都不能 有前导 0 。比方说 1010 不能重排列得到 101 。



// 示例 1：

// 输入：n = 3, k = 5

// 输出：27

// 解释：

// 部分好整数如下：

// 551 ，因为它可以重排列得到 515 。
// 525 ，因为它已经是一个 k 回文整数。
// 示例 2：

// 输入：n = 1, k = 4

// 输出：2

// 解释：

// 两个好整数分别是 4 和 8 。

// 示例 3：

// 输入：n = 5, k = 6

// 输出：2468



// 提示：

// 1 <= n <= 10
// 1 <= k <= 9

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var countGoodIntegers = function (n, k) {
  const dict = new Set();
  const base = Math.pow(10, Math.floor((n - 1) / 2));
  const skip = n & 1;
  /* 枚举 n 个数位的回文数 */
  for (let i = base; i < base * 10; i++) {
    let s = i.toString();
    s += s.split('').reverse().slice(skip).join('');
    const palindromicInteger = parseInt(s);
    /* 如果当前回文数是 k 回文数 */
    if (palindromicInteger % k === 0) {
      const sortedS = s.split('').sort().join('');
      dict.add(sortedS);
    }
  }

  const factorial = Array(n + 1).fill(1n);
  for (let i = 1; i <= n; i++) {
    factorial[i] = factorial[i - 1] * BigInt(i);
  }

  let ans = 0n;
  for (const s of dict) {
    const cnt = Array(10).fill(0);
    for (const c of s) {
      cnt[parseInt(c)]++;
    }
    /* 计算排列组合 */
    let tot = BigInt(n - cnt[0]) * factorial[n - 1];
    for (const x of cnt) {
      tot /= factorial[x];
    }
    ans += tot;
  }
  return Number(ans);
};