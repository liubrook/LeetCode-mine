// 3305. 元音辅音字符串计数 I
// 中等
// 相关标签
// 相关企业
// 提示
// 给你一个字符串 word 和一个 非负 整数 k。

// 返回 word 的 子字符串 中，每个元音字母（'a'、'e'、'i'、'o'、'u'）至少 出现一次，并且 恰好 包含 k 个辅音字母的子字符串的总数。



// 示例 1：

// 输入：word = "aeioqq", k = 1

// 输出：0

// 解释：

// 不存在包含所有元音字母的子字符串。

// 示例 2：

// 输入：word = "aeiou", k = 0

// 输出：1

// 解释：

// 唯一一个包含所有元音字母且不含辅音字母的子字符串是 word[0..4]，即 "aeiou"。

// 示例 3：

// 输入：word = "ieaouqqieaouqq", k = 1

// 输出：3

// 解释：

// 包含所有元音字母并且恰好含有一个辅音字母的子字符串有：

// word[0..5]，即 "ieaouq"。
// word[6..11]，即 "qieaou"。
// word[7..12]，即 "ieaouq"。


// 提示：

// 5 <= word.length <= 250
// word 仅由小写英文字母组成。
// 0 <= k <= word.length - 5

/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var countOfSubstrings = function (word, k) {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  const count = (m) => {
    let n = word.length, consonants = 0, res = 0;
    let occur = new Map();
    for (let i = 0, j = 0; i < n; i++) {
      while (j < n && (consonants < m || occur.size < 5)) {
        let ch = word[j];
        if (vowels.has(ch)) {
          occur.set(ch, (occur.get(ch) || 0) + 1);
        } else {
          consonants++;
        }
        j++;
      }
      if (consonants >= m && occur.size === 5) {
        res += n - j + 1;
      }
      let left = word[i];
      if (vowels.has(left)) {
        occur.set(left, occur.get(left) - 1);
        if (occur.get(left) === 0) {
          occur.delete(left);
        }
      } else {
        consonants--;
      }
    }
    return res;
  };
  return count(k) - count(k + 1);
};