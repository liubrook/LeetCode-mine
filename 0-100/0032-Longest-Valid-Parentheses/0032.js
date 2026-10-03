// 32. 最长有效括号
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号 子串 的长度。

// 左右括号匹配，即每个左括号都有对应的右括号将其闭合的字符串是格式正确的，比如 "(()())"。

// 示例 1：

// 输入：s = "(()"
// 输出：2
// 解释：最长有效括号子串是 "()"
// 示例 2：

// 输入：s = ")()())"
// 输出：4
// 解释：最长有效括号子串是 "()()"
// 示例 3：

// 输入：s = ""
// 输出：0

// 提示：

// 0 <= s.length <= 3 * 10^4
// s[i] 为 '(' 或 ')'
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  let ans = 0,
    left = 0,
    right = 0;
  for (const ch of s) {
    if (ch === "(") {
      left++;
    } else {
      right++;
    }
    if (left < right) {
      // 右括号太多了，重置计数器
      left = right = 0;
    } else if (left === right) {
      ans = Math.max(ans, right * 2);
    }
  }

  left = right = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === ")") {
      left++;
    } else {
      right++;
    }
    if (left < right) {
      left = right = 0;
    } else if (left === right) {
      ans = Math.max(ans, right * 2);
    }
  }
  return ans;
};
