// 1016. 子串能表示从 1 到 N 数字的二进制串
// 给定一个二进制字符串 s 和一个正整数 n，如果对于[1, n] 范围内的每个整数，其二进制表示都是 s 的 子字符串 ，就返回 true，否则返回 false 。

// 子字符串 是字符串中连续的字符序列。



// 示例 1：

// 输入：s = "0110", n = 3
// 输出：true
// 示例 2：

// 输入：s = "0110", n = 4
// 输出：false


// 提示：

// 1 <= s.length <= 1000
// s[i] 不是 '0' 就是 '1'
// 1 <= n <= 10^9

/**
 * @param {string} s
 * @param {number} n
 * @return {boolean}
 */
var queryString = function (s, n) {
  if (n === 1) {
    return [...s].indexOf('1') !== -1;
  }
  let k = 30;
  while ((1 << k) >= n) {
    --k;
  }
  if (s.length < (1 << (k - 1)) + k - 1 || s.length < n - (1 << k) + k + 1) {
    return false;
  }
  return help(s, k, 1 << (k - 1), (1 << k) - 1) && help(s, k + 1, 1 << k, n);
}

const help = (s, k, mi, ma) => {
  const set = new Set();
  let t = 0;
  for (let r = 0; r < s.length; ++r) {
    t = t * 2 + (s[r].charCodeAt() - '0'.charCodeAt());
    if (r >= k) {
      t -= (s[r - k].charCodeAt() - '0'.charCodeAt()) << k;
    }
    if (r >= k - 1 && t >= mi && t <= ma) {
      set.add(t);
    }
  }
  return set.size === ma - mi + 1;
};