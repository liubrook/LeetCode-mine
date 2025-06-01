// 318. 最大单词长度乘积
// 给定一个字符串数组 words，找到 length(word[i]) * length(word[j]) 的最大值，并且这两个单词不含有公共字母。你可以认为每个单词只包含小写字母。如果不存在这样的两个单词，返回 0。



// 示例 1:

// 输入: ["abcw", "baz", "foo", "bar", "xtfn", "abcdef"]
// 输出: 16
// 解释: 这两个单词为 "abcw", "xtfn"。
// 示例 2:

// 输入: ["a", "ab", "abc", "d", "cd", "bcd", "abcd"]
// 输出: 4
// 解释: 这两个单词为 "ab", "cd"。
// 示例 3:

// 输入: ["a", "aa", "aaa", "aaaa"]
// 输出: 0
// 解释: 不存在这样的两个单词。


// 提示：

// 2 <= words.length <= 1000
// 1 <= words[i].length <= 1000
// words[i] 仅包含小写字母

/**
 * @param {string[]} words
 * @return {number}
 */
var maxProduct = function (words) {
  const map = new Map();
  const length = words.length;
  for (let i = 0; i < length; i++) {
    let mask = 0;
    const word = words[i];
    const wordLength = word.length;
    for (let j = 0; j < wordLength; j++) {
      mask |= 1 << (word[j].charCodeAt() - 'a'.charCodeAt());
    }
    if (wordLength > (map.get(mask) || 0)) {
      map.set(mask, wordLength);
    }
  }
  let maxProd = 0;
  const maskSet = Array.from(map.keys());
  for (const mask1 of maskSet) {
    const wordLength1 = map.get(mask1);
    for (const mask2 of maskSet) {
      if ((mask1 & mask2) === 0) {
        const wordLength2 = map.get(mask2);
        maxProd = Math.max(maxProd, wordLength1 * wordLength2);
      }
    }
  }
  return maxProd;
}