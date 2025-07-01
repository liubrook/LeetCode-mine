// 3083. 字符串及其反转中是否存在同一子字符串
// 简单
// 相关标签
// 相关企业
// 提示
// 给你一个字符串 s ，请你判断字符串 s 是否存在一个长度为 2 的子字符串，在其反转后的字符串中也出现。

// 如果存在这样的子字符串，返回 true；如果不存在，返回 false 。



// 示例 1：

// 输入：s = "leetcode"

// 输出：true

// 解释：子字符串 "ee" 的长度为 2，它也出现在 reverse(s) == "edocteel" 中。

// 示例 2：

// 输入：s = "abcba"

// 输出：true

// 解释：所有长度为 2 的子字符串 "ab"、"bc"、"cb"、"ba" 也都出现在 reverse(s) == "abcba" 中。

// 示例 3：

// 输入：s = "abcd"

// 输出：false

// 解释：字符串 s 中不存在满足「在其反转后的字符串中也出现」且长度为 2 的子字符串。



// 提示：

// 1 <= s.length <= 100
// 字符串 s 仅由小写英文字母组成。

/**
 * @param {string} s
 * @return {boolean}
 */
var isSubstringPresent = function (s) {
  let h = new Array(26).fill(0);
  for (let i = 0; i + 1 < s.length; i++) {
    let x = s.charCodeAt(i) - 'a'.charCodeAt(0);
    let y = s.charCodeAt(i + 1) - 'a'.charCodeAt(0);
    h[x] |= (1 << y);
    if ((h[y] >> x) & 1) {
      return true;
    }
  }
  return false;
};