// 2414. 最长的字母序连续子字符串的长度
// 中等
// 相关标签
// 相关企业
// 提示
// 字母序连续字符串 是由字母表中连续字母组成的字符串。换句话说，字符串 "abcdefghijklmnopqrstuvwxyz" 的任意子字符串都是 字母序连续字符串 。

// 例如，"abc" 是一个字母序连续字符串，而 "acb" 和 "za" 不是。
// 给你一个仅由小写英文字母组成的字符串 s ，返回其 最长 的 字母序连续子字符串 的长度。



// 示例 1：

// 输入：s = "abacaba"
// 输出：2
// 解释：共有 4 个不同的字母序连续子字符串 "a"、"b"、"c" 和 "ab" 。
// "ab" 是最长的字母序连续子字符串。
// 示例 2：

// 输入：s = "abcde"
// 输出：5
// 解释："abcde" 是最长的字母序连续子字符串。


// 提示：

// 1 <= s.length <= 10^5
// s 由小写英文字母组成

/**
 * @param {string} s
 * @return {number}
 */
var longestContinuousSubstring = function (s) {
  let res = 1;
  let cur = 1;
  for (let i = 1; i < s.length; i++) {
    if (s[i] == String.fromCharCode(s.charCodeAt(i - 1) + 1)) {
      cur++;
    } else {
      cur = 1;
    }
    res = Math.max(res, cur);
  }
  return res;
};