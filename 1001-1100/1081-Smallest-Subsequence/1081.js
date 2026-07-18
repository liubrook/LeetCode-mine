// 1081. 不同字符的最小子序列
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 返回 s 字典序最小的子序列，该子序列包含 s 的所有不同字符，且只包含一次。

// 示例 1：

// 输入：s = "bcabc"
// 输出："abc"
// 示例 2：

// 输入：s = "cbacdcbc"
// 输出："acdb"

// 提示：

// 1 <= s.length <= 1000
// s 由小写英文字母组成

// 注意：该题与 316 https://leetcode.cn/problems/remove-duplicate-letters/ 相同
/**
 * @param {string} s
 * @return {string}
 */
var smallestSubsequence = function (s) {
  const vis = new Array(26).fill(0);
  const num = _.countBy(s);

  const sb = new Array();
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (!vis[ch.charCodeAt() - "a".charCodeAt()]) {
      while (sb.length > 0 && sb[sb.length - 1] > ch) {
        if (num[sb[sb.length - 1]] > 0) {
          vis[sb[sb.length - 1].charCodeAt() - "a".charCodeAt()] = 0;
          sb.pop();
        } else {
          break;
        }
      }
      vis[ch.charCodeAt() - "a".charCodeAt()] = 1;
      sb.push(ch);
    }
    num[ch]--;
  }
  return sb.join("");
};
