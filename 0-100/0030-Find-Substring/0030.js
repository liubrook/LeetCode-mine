// 30. 串联所有单词的子串
// 给定一个字符串 s 和一些 长度相同 的单词 words 。找出 s 中恰好可以由 words 中所有单词串联形成的子串的起始位置。

// 注意子串要与 words 中的单词完全匹配，中间不能有其他字符 ，但不需要考虑 words 中单词串联的顺序。



// 示例 1：

// 输入：s = "barfoothefoobarman", words = ["foo", "bar"]
// 输出：[0, 9]
// 解释：
// 从索引 0 和 9 开始的子串分别是 "barfoo" 和 "foobar" 。
// 输出的顺序不重要, [9, 0] 也是有效答案。
// 示例 2：

// 输入：s = "wordgoodgoodgoodbestword", words = ["word", "good", "best", "word"]
// 输出：[]
// 示例 3：

// 输入：s = "barfoofoobarthefoobarman", words = ["bar", "foo", "the"]
// 输出：[6, 9, 12]


// 提示：

// 1 <= s.length <= 104
// s 由小写英文字母组成
// 1 <= words.length <= 5000
// 1 <= words[i].length <= 30
// words[i] 由小写英文字母组成


/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {
  const res = [];
  const m = words.length, n = words[0].length, ls = s.length;
  for (let i = 0; i < n; i++) {
    if (i + m * n > ls) {
      break;
    }
    const differ = new Map();
    for (let j = 0; j < m; j++) {
      const word = s.substring(i + j * n, i + (j + 1) * n);
      differ.set(word, (differ.get(word) || 0) + 1);
    }
    for (const word of words) {
      differ.set(word, (differ.get(word) || 0) - 1);
      if (differ.get(word) === 0) {
        differ.delete(word);
      }
    }
    for (let start = i; start < ls - m * n + 1; start += n) {
      if (start !== i) {
        let word = s.substring(start + (m - 1) * n, start + m * n);
        differ.set(word, (differ.get(word) || 0) + 1);
        if (differ.get(word) === 0) {
          differ.delete(word);
        }
        word = s.substring(start - n, start);
        differ.set(word, (differ.get(word) || 0) - 1);
        if (differ.get(word) === 0) {
          differ.delete(word);
        }
        word = s.substring(start - n, start);
      }
      if (differ.size === 0) {
        res.push(start);
      }
    }
  }
  return res;
}