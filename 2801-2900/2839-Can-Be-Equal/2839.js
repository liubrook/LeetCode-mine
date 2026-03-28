// 2839. 判断通过操作能否让字符串相等 I
// 简单
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你两个字符串 s1 和 s2 ，两个字符串的长度都为 4 ，且只包含 小写 英文字母。

// 你可以对两个字符串中的 任意一个 执行以下操作 任意 次：

// 选择两个下标 i 和 j 且满足 j - i = 2 ，然后 交换 这个字符串中两个下标对应的字符。
// 如果你可以让字符串 s1 和 s2 相等，那么返回 true ，否则返回 false 。

// 示例 1：

// 输入：s1 = "abcd", s2 = "cdab"
// 输出：true
// 解释： 我们可以对 s1 执行以下操作：
// - 选择下标 i = 0 ，j = 2 ，得到字符串 s1 = "cbad" 。
// - 选择下标 i = 1 ，j = 3 ，得到字符串 s1 = "cdab" = s2 。
// 示例 2：

// 输入：s1 = "abcd", s2 = "dacb"
// 输出：false
// 解释：无法让两个字符串相等。

// 提示：

// s1.length == s2.length == 4
// s1 和 s2 只包含小写英文字母。
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var canBeEqual = function (s1, s2) {
  if (s1 === s2) {
    return true;
  } else if (
    s1[0] === s2[2] &&
    s1[2] === s2[2] &&
    s1[1] === s2[3] &&
    s1[3] === s2[1]
  ) {
    return true;
  } else if (
    s1[0] === s2[0] &&
    s1[2] === s2[2] &&
    s1[1] === s2[3] &&
    s1[3] === s2[1]
  ) {
    return true;
  } else if (
    s1[1] === s2[1] &&
    s1[3] === s2[3] &&
    s1[0] === s2[2] &&
    s1[2] === s2[0]
  ) {
    return true;
  }
  return false;
};
