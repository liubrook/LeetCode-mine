// 2182. 构造限制重复的字符串
// 中等
// 相关标签
// 相关企业
// 提示
// 给你一个字符串 s 和一个整数 repeatLimit ，用 s 中的字符构造一个新字符串 repeatLimitedString ，使任何字母 连续 出现的次数都不超过 repeatLimit 次。你不必使用 s 中的全部字符。

// 返回 字典序最大的 repeatLimitedString 。

// 如果在字符串 a 和 b 不同的第一个位置，字符串 a 中的字母在字母表中出现时间比字符串 b 对应的字母晚，则认为字符串 a 比字符串 b 字典序更大 。如果字符串中前 min(a.length, b.length) 个字符都相同，那么较长的字符串字典序更大。



// 示例 1：

// 输入：s = "cczazcc", repeatLimit = 3
// 输出："zzcccac"
// 解释：使用 s 中的所有字符来构造 repeatLimitedString "zzcccac"。
// 字母 'a' 连续出现至多 1 次。
// 字母 'c' 连续出现至多 3 次。
// 字母 'z' 连续出现至多 2 次。
// 因此，没有字母连续出现超过 repeatLimit 次，字符串是一个有效的 repeatLimitedString 。
// 该字符串是字典序最大的 repeatLimitedString ，所以返回 "zzcccac" 。
// 注意，尽管 "zzcccca" 字典序更大，但字母 'c' 连续出现超过 3 次，所以它不是一个有效的 repeatLimitedString 。
// 示例 2：

// 输入：s = "aababab", repeatLimit = 2
// 输出："bbabaa"
// 解释：
// 使用 s 中的一些字符来构造 repeatLimitedString "bbabaa"。 
// 字母 'a' 连续出现至多 2 次。 
// 字母 'b' 连续出现至多 2 次。
// 因此，没有字母连续出现超过 repeatLimit 次，字符串是一个有效的 repeatLimitedString 。 
// 该字符串是字典序最大的 repeatLimitedString ，所以返回 "bbabaa" 。
// 注意，尽管 "bbabaaa" 字典序更大，但字母 'a' 连续出现超过 2 次，所以它不是一个有效的 repeatLimitedString 。


// 提示：

// 1 <= repeatLimit <= s.length <= 10^5
// s 由小写英文字母组成

/**
 * @param {string} s
 * @param {number} repeatLimit
 * @return {string}
 */
var repeatLimitedString = function (s, repeatLimit) {
  let N = 26;
  let count = new Array(N).fill(0);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
  }
  let ret = new Array();
  let m = 0;
  for (let i = N - 1, j = N - 2; i >= 0 && j >= 0;) {
    if (count[i] == 0) { // 当前字符已经填完，填入后面的字符，重置 m
      m = 0;
      i--;
    } else if (m < repeatLimit) { // 当前字符未超过限制
      count[i]--;
      ret.push(String.fromCharCode(97 + i));
      m++;
    } else if (j >= i || count[j] == 0) { // 当前字符已经超过限制，查找可填入的其他字符
      j--;
    } else { // 当前字符已经超过限制，填入其他字符，并且重置 m
      count[j]--;
      ret.push(String.fromCharCode(97 + j));
      m = 0;
    }
  }
  return ret.join('');
};