// 791. 自定义字符串排序
// 给定两个字符串 order 和 s 。order 的所有单词都是 唯一 的，并且以前按照一些自定义的顺序排序。

// 对 s 的字符进行置换，使其与排序的 order 相匹配。更具体地说，如果在 order 中的字符 x 出现字符 y 之前，那么在排列后的字符串中， x 也应该出现在 y 之前。

// 返回 满足这个性质的 s 的任意排列 。



// 示例 1:

// 输入: order = "cba", s = "abcd"
// 输出: "cbad"
// 解释: 
// “a”、“b”、“c”是按顺序出现的，所以“a”、“b”、“c”的顺序应该是“c”、“b”、“a”。
// 因为“d”不是按顺序出现的，所以它可以在返回的字符串中的任何位置。“dcba”、“cdba”、“cbda”也是有效的输出。
// 示例 2:

// 输入: order = "cbafg", s = "abcd"
// 输出: "cbad"


// 提示:

// 1 <= order.length <= 26
// 1 <= s.length <= 200
// order 和 s 由小写英文字母组成
// order 中的所有字符都 不同


/**
 * @param {string} order
 * @param {string} s
 * @return {string}
 */
var customSortString = function (order, s) {
  const freq = new Array(26).fill(0);
  for (let i = 0; i < s.length; ++i) {
    const ch = s[i];
    ++freq[ch.charCodeAt() - 'a'.charCodeAt()];
  }
  let ans = '';
  for (let i = 0; i < order.length; ++i) {
    const ch = order[i];
    while (freq[ch.charCodeAt() - 'a'.charCodeAt()] > 0) {
      ans += ch;
      freq[ch.charCodeAt() - 'a'.charCodeAt()]--;
    }
  }
  for (let i = 0; i < 26; ++i) {
    while (freq[i] > 0) {
      ans += String.fromCharCode(i + 'a'.charCodeAt());
      freq[i]--;
    }
  }
  return ans;
};