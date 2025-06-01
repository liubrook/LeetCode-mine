// 44. 通配符匹配
// 给定一个字符串 (s) 和一个字符模式 (p) ，实现一个支持 '?' 和 '*' 的通配符匹配。

// '?' 可以匹配任何单个字符。
// '*' 可以匹配任意字符串（包括空字符串）。
// 两个字符串完全匹配才算匹配成功。

// 说明:

// s 可能为空，且只包含从 a-z 的小写字母。
// p 可能为空，且只包含从 a-z 的小写字母，以及字符 ? 和 *。
// 示例 1:

// 输入:
// s = "aa"
// p = "a"
// 输出: false
// 解释: "a" 无法匹配 "aa" 整个字符串。
// 示例 2:

// 输入:
// s = "aa"
// p = "*"
// 输出: true
// 解释: '*' 可以匹配任意字符串。
// 示例 3:

// 输入:
// s = "cb"
// p = "?a"
// 输出: false
// 解释: '?' 可以匹配 'c', 但第二个 'a' 无法匹配 'b'。
// 示例 4:

// 输入:
// s = "adceb"
// p = "*a*b"
// 输出: true
// 解释: 第一个 '*' 可以匹配空字符串, 第二个 '*' 可以匹配字符串 "dce".
// 示例 5:

// 输入:
// s = "acdcb"
// p = "a*c?b"
// 输出: false
const isMatch = (s, p) => {
    const sLen = s.length;
    const pLen = p.length;
    // 初始化（包括了一部分base case）
    const dp = new Array(sLen + 1);
    for (let i = 0; i < sLen + 1; i++) {
      dp[i] = new Array(pLen + 1).fill(false);
    }
    // base case
    dp[0][0] = true;
    for (let j = 1; j <= pLen; j++) {
      dp[0][j] = p[j - 1] == '*' && dp[0][j - 1];
    }
    // 迭代
    for (let i = 1; i <= sLen; i++) {
      for (let j = 1; j <= pLen; j++) {
        if (p[j - 1] == '?' || s[i - 1] == p[j - 1])
          dp[i][j] = dp[i - 1][j - 1];
        else if (p[j - 1] == '*' && (dp[i - 1][j] || dp[i][j - 1]))
          dp[i][j] = true;
      }
    }
    return dp[sLen][pLen]; // 整个s串和整个p串是否匹配
  };