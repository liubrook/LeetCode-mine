// 3517. 最小回文排列 I
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个 回文 字符串 s。

// 返回 s 的按字典序排列的 最小 回文排列。

// 如果一个字符串从前往后和从后往前读都相同，那么这个字符串是一个 回文 字符串。

// 排列 是字符串中所有字符的重排。

// 如果字符串 a 按字典序小于字符串 b，则表示在第一个不同的位置，a 中的字符比 b 中的对应字符在字母表中更靠前。
// 如果在前 min(a.length, b.length) 个字符中没有区别，则较短的字符串按字典序更小。

// 示例 1：

// 输入： s = "z"

// 输出： "z"

// 解释：

// 仅由一个字符组成的字符串已经是按字典序最小的回文。

// 示例 2：

// 输入： s = "babab"

// 输出： "abbba"

// 解释：

// 通过重排 "babab" → "abbba"，可以得到按字典序最小的回文。

// 示例 3：

// 输入： s = "daccad"

// 输出： "acddca"

// 解释：

// 通过重排 "daccad" → "acddca"，可以得到按字典序最小的回文。

// 提示：

// 1 <= s.length <= 10^5
// s 由小写英文字母组成。
// 保证 s 是回文字符串。
/**
 * @param {string} s
 * @return {string}
 */
var smallestPalindrome = function (s) {
  const partition = Math.floor(s.length / 2);
  const bucket = new Int32Array(26);

  for (let i = 0; i < partition; i++) {
    bucket[s.charCodeAt(i) - 97] += 1;
  }

  let left = "";
  let right = "";
  for (let i = 0; i < 26; i++) {
    if (bucket[i] > 0) {
      left += String.fromCharCode(i + 97).repeat(bucket[i]);
      right = String.fromCharCode(i + 97).repeat(bucket[i]) + right;
    }
  }

  const mid = s.length % 2 !== 0 ? s[partition] : "";

  return left + mid + right;
};
