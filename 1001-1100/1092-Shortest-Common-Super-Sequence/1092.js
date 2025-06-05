// 1092. 最短公共超序列
// 给出两个字符串 str1 和 str2，返回同时以 str1 和 str2 作为子序列的最短字符串。如果答案不止一个，则可以返回满足条件的任意一个答案。

// （如果从字符串 T 中删除一些字符（也可能不删除，并且选出的这些字符可以位于 T 中的 任意位置），可以得到字符串 S，那么 S 就是 T 的子序列）



// 示例：

// 输入：str1 = "abac", str2 = "cab"
// 输出："cabac"
// 解释：
// str1 = "abac" 是 "cabac" 的一个子串，因为我们可以删去 "cabac" 的第一个 "c"得到 "abac"。
// str2 = "cab" 是 "cabac" 的一个子串，因为我们可以删去 "cabac" 末尾的 "ac" 得到 "cab"。
// 最终我们给出的答案是满足上述属性的最短字符串。


// 提示：

// 1 <= str1.length, str2.length <= 1000
// str1 和 str2 都由小写英文字母组成。


/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var shortestCommonSupersequence = function (str1, str2) {
  const n = str1.length, m = str2.length;
  const dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0));
  for (let i = 0; i < n; ++i) {
    dp[i][m] = n - i;
  }
  for (let i = 0; i < m; ++i) {
    dp[n][i] = m - i;
  }
  for (let i = n - 1; i >= 0; --i) {
    for (let j = m - 1; j >= 0; --j) {
      if (str1[i] == str2[j]) {
        dp[i][j] = dp[i + 1][j + 1] + 1;
      } else {
        dp[i][j] = Math.min(dp[i + 1][j], dp[i][j + 1]) + 1;
      }
    }
  }
  let res = '';
  let t1 = 0, t2 = 0;
  while (t1 < n && t2 < m) {
    if (str1[t1] === str2[t2]) {
      res += str1[t1];
      ++t1;
      ++t2;
    } else if (dp[t1 + 1][t2] === dp[t1][t2] - 1) {
      res += str1[t1];
      ++t1;
    } else if (dp[t1][t2 + 1] === dp[t1][t2] - 1) {
      res += str2[t2];
      ++t2;
    }
  }
  if (t1 < n) {
    res += str1.slice(t1);
  } else if (t2 < m) {
    res += str2.slice(t2);
  }
  return res;
};