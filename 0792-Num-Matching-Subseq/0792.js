// 792. 匹配子序列的单词数
// 给定字符串 s 和字符串数组 words, 返回  words[i] 中是s的子序列的单词个数 。

// 字符串的 子序列 是从原始字符串中生成的新字符串，可以从中删去一些字符(可以是none)，而不改变其余字符的相对顺序。

// 例如， “ace” 是 “abcde” 的子序列。


// 示例 1:

// 输入: s = "abcde", words = ["a", "bb", "acd", "ace"]
// 输出: 3
// 解释: 有三个是 s 的子序列的单词: "a", "acd", "ace"。
// Example 2:

// 输入: s = "dsahjpjauf", words = ["ahjpjau", "ja", "ahbwzgqnuk", "tnmlanowax"]
// 输出: 2


// 提示:

// 1 <= s.length <= 5 * 104
// 1 <= words.length <= 5000
// 1 <= words[i].length <= 50
// words[i]和 s 都只由小写字母组成。



/**
 * @param {string} s
 * @param {string[]} words
 * @return {number}
 */
var numMatchingSubseq = function (s, words) {
  const pos = new Array(26).fill(0).map(() => new Array());
  for (let i = 0; i < s.length; ++i) {
    pos[s[i].charCodeAt() - 'a'.charCodeAt()].push(i);
  }
  let res = words.length;
  for (const w of words) {
    if (w.length > s.length) {
      --res;
      continue;
    }
    let p = -1;
    for (let i = 0; i < w.length; ++i) {
      const c = w[i];
      if (pos[c.charCodeAt() - 'a'.charCodeAt()].length === 0 || pos[c.charCodeAt() - 'a'.charCodeAt()][pos[c.charCodeAt() - 'a'.charCodeAt()].length - 1] <= p) {
        --res;
        break;
      }
      p = binarySearch(pos[c.charCodeAt() - 'a'.charCodeAt()], p);
    }
  }
  return res;
}

const binarySearch = (list, target) => {
  let left = 0, right = list.length - 1;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (list[mid] > target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return list[left];
};