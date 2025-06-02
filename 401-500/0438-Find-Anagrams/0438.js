// 438. 找到字符串中所有字母异位词
// 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。

// 异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。



// 示例 1:

// 输入: s = "cbaebabacd", p = "abc"
// 输出: [0, 6]
// 解释:
// 起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
// 起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
//  示例 2:

// 输入: s = "abab", p = "ab"
// 输出: [0, 1, 2]
// 解释:
// 起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
// 起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
// 起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。


// 提示:

// 1 <= s.length, p.length <= 3 * 104
// s 和 p 仅包含小写字母

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  const sLen = s.length, pLen = p.length;

  if (sLen < pLen) {
    return [];
  }

  const ans = [];
  const count = Array(26).fill(0);
  for (let i = 0; i < pLen; ++i) {
    ++count[s[i].charCodeAt() - 'a'.charCodeAt()];
    --count[p[i].charCodeAt() - 'a'.charCodeAt()];
  }

  let differ = 0;
  for (let j = 0; j < 26; ++j) {
    if (count[j] !== 0) {
      ++differ;
    }
  }

  if (differ === 0) {
    ans.push(0);
  }

  for (let i = 0; i < sLen - pLen; ++i) {
    if (count[s[i].charCodeAt() - 'a'.charCodeAt()] === 1) { // 窗口中字母 s[i] 的数量与字符串 p 中的数量从不同变得相同
      --differ;
    } else if (count[s[i].charCodeAt() - 'a'.charCodeAt()] === 0) { // 窗口中字母 s[i] 的数量与字符串 p 中的数量从相同变得不同
      ++differ;
    }
    --count[s[i].charCodeAt() - 'a'.charCodeAt()];

    if (count[s[i + pLen].charCodeAt() - 'a'.charCodeAt()] === -1) { // 窗口中字母 s[i+pLen] 的数量与字符串 p 中的数量从不同变得相同
      --differ;
    } else if (count[s[i + pLen].charCodeAt() - 'a'.charCodeAt()] === 0) { // 窗口中字母 s[i+pLen] 的数量与字符串 p 中的数量从相同变得不同
      ++differ;
    }
    ++count[s[i + pLen].charCodeAt() - 'a'.charCodeAt()];

    if (differ === 0) {
      ans.push(i + 1);
    }
  }

  return ans;
}