// 3085. 成为 K 特殊字符串需要删除的最少字符数
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个字符串 word 和一个整数 k。

// 如果 |freq(word[i]) - freq(word[j])| <= k 对于字符串中所有下标 i 和 j  都成立，则认为 word 是 k 特殊字符串。

// 此处，freq(x) 表示字符 x 在 word 中的出现频率，而 |y| 表示 y 的绝对值。

// 返回使 word 成为 k 特殊字符串 需要删除的字符的最小数量。



// 示例 1：

// 输入：word = "aabcaba", k = 0

// 输出：3

// 解释：可以删除 2 个 "a" 和 1 个 "c" 使 word 成为 0 特殊字符串。word 变为 "baba"，此时 freq('a') == freq('b') == 2。

// 示例 2：

// 输入：word = "dabdcbdcdcd", k = 2

// 输出：2

// 解释：可以删除 1 个 "a" 和 1 个 "d" 使 word 成为 2 特殊字符串。word 变为 "bdcbdcdcd"，此时 freq('b') == 2，freq('c') == 3，freq('d') == 4。

// 示例 3：

// 输入：word = "aaabaaa", k = 2

// 输出：1

// 解释：可以删除 1 个 "b" 使 word 成为 2特殊字符串。因此，word 变为 "aaaaaa"，此时每个字母的频率都是 6。



// 提示：

// 1 <= word.length <= 10^5
// 0 <= k <= 10^5
// word 仅由小写英文字母组成。

/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var minimumDeletions = function (word, k) {
  const cnt = new Map();
  for (const ch of word) {
    cnt.set(ch, (cnt.get(ch) || 0) + 1);
  }
  let res = word.length;
  for (const a of cnt.values()) {
    let deleted = 0;
    for (const b of cnt.values()) {
      if (a > b) {
        deleted += b;
      } else if (b > a + k) {
        deleted += b - (a + k);
      }
    }
    res = Math.min(res, deleted);
  }
  return res;
};