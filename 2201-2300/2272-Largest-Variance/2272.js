// 2272. 最大波动的子字符串
// 困难
// 相关标签
// 相关企业
// 提示
// 字符串的 波动 定义为子字符串中出现次数 最多 的字符次数与出现次数 最少 的字符次数之差。

// 给你一个字符串 s ，它只包含小写英文字母。请你返回 s 里所有 子字符串的 最大波动 值。

// 子字符串 是一个字符串的一段连续字符序列。



// 示例 1：

// 输入：s = "aababbb"
// 输出：3
// 解释：
// 所有可能的波动值和它们对应的子字符串如以下所示：
// - 波动值为 0 的子字符串："a" ，"aa" ，"ab" ，"abab" ，"aababb" ，"ba" ，"b" ，"bb" 和 "bbb" 。
// - 波动值为 1 的子字符串："aab" ，"aba" ，"abb" ，"aabab" ，"ababb" ，"aababbb" 和 "bab" 。
// - 波动值为 2 的子字符串："aaba" ，"ababbb" ，"abbb" 和 "babb" 。
// - 波动值为 3 的子字符串 "babbb" 。
// 所以，最大可能波动值为 3 。
// 示例 2：

// 输入：s = "abcde"
// 输出：0
// 解释：
// s 中没有字母出现超过 1 次，所以 s 中每个子字符串的波动值都是 0 。


// 提示：

// 1 <= s.length <= 10^4
// s  只包含小写英文字母。

/**
 * @param {string} s
 * @return {number}
 */
var largestVariance = function (s) {
  const pos = {};
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (!pos[ch]) pos[ch] = [];
    pos[ch].push(i);
  }

  let ans = 0;
  for (let c0 in pos) {
    for (let c1 in pos) {
      if (c0 !== c1) {
        const pos0 = pos[c0];
        const pos1 = pos[c1];
        let i = 0, j = 0;
        let f = 0, g = -Infinity;
        while (i < pos0.length || j < pos1.length) {
          if (j === pos1.length || (i < pos0.length && pos0[i] < pos1[j])) {
            f = Math.max(f, 0) + 1;
            g = g + 1;
            i++;
          } else {
            g = Math.max(f, Math.max(g, 0)) - 1;
            f = Math.max(f, 0) - 1;
            j++;
          }
          ans = Math.max(ans, g);
        }
      }
    }
  }
  return ans;
};