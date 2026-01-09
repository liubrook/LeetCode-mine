// 712. 两个字符串的最小ASCII删除和
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给定两个字符串s1 和 s2，返回 使两个字符串相等所需删除字符的 ASCII 值的最小和 。

// 示例 1:

// 输入: s1 = "sea", s2 = "eat"
// 输出: 231
// 解释: 在 "sea" 中删除 "s" 并将 "s" 的值(115)加入总和。
// 在 "eat" 中删除 "t" 并将 116 加入总和。
// 结束时，两个字符串相等，115 + 116 = 231 就是符合条件的最小和。
// 示例 2:

// 输入: s1 = "delete", s2 = "leet"
// 输出: 403
// 解释: 在 "delete" 中删除 "dee" 字符串变成 "let"，
// 将 100[d]+101[e]+101[e] 加入总和。在 "leet" 中删除 "e" 将 101[e] 加入总和。
// 结束时，两个字符串都等于 "let"，结果即为 100+101+101+101 = 403 。
// 如果改为将两个字符串转换为 "lee" 或 "eet"，我们会得到 433 或 417 的结果，比答案更大。

// 提示:

// 0 <= s1.length, s2.length <= 1000
// s1 和 s2 由小写英文字母组成
/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var minimumDeleteSum = function (s1, s2) {
  const m = s1.length;
  const n = s2.length;
  // 创建(m + 1) x (n + 1) 的二维数组，初始化全为0
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  // 初始化边界条件
  // dp[0][0] 已经为0, 一个空字符串和另一个空字符串相等, 不需要删除

  // 第一列: s2 为空字符串时, 需要删除s1的所有字符
  for (let i = 1; i <= m; i++) {
    dp[i][0] = dp[i - 1][0] + s1.charCodeAt(i - 1);
  }

  // 第一行: s1为空字符串时, 需要删除s2的所有字符
  for (let j = 1; j <= n; j++) {
    dp[0][j] = dp[0][j - 1] + s2.charCodeAt(j - 1);
  }

  // 填充dp表
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        // 字符相同, 无需删除，继承左上角的值
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        // 字符不同, 选择删除s1当前字符串或s2当前字符串中代价较小的
        const deleteS1 = dp[i - 1][j] + s1.charCodeAt(i - 1);
        const deleteS2 = dp[i][j - 1] + s2.charCodeAt(j - 1);
        dp[i][j] = Math.min(deleteS1, deleteS2);
      }
    }
  }

  // dp[m][n] 就是使两个完整字符串相等的最小删除ASCII和
  return dp[m][n];
};
