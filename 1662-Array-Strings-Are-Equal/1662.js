// 1662. 检查两个字符串数组是否相等
// 给你两个字符串数组 word1 和 word2 。如果两个数组表示的字符串相同，返回 true ；否则，返回 false 。

// 数组表示的字符串 是由数组中的所有元素 按顺序 连接形成的字符串。



// 示例 1：

// 输入：word1 = ["ab", "c"], word2 = ["a", "bc"]
// 输出：true
// 解释：
// word1 表示的字符串为 "ab" + "c" -> "abc"
// word2 表示的字符串为 "a" + "bc" -> "abc"
// 两个字符串相同，返回 true
// 示例 2：

// 输入：word1 = ["a", "cb"], word2 = ["ab", "c"]
// 输出：false
// 示例 3：

// 输入：word1 = ["abc", "d", "defg"], word2 = ["abcddefg"]
// 输出：true


// 提示：

// 1 <= word1.length, word2.length <= 103
// 1 <= word1[i].length, word2[i].length <= 103
// 1 <= sum(word1[i].length), sum(word2[i].length) <= 103
// word1[i] 和 word2[i] 由小写字母组成

/**
 * @param {string[]} word1
 * @param {string[]} word2
 * @return {boolean}
 */
var arrayStringsAreEqual = function (word1, word2) {
  let p1 = 0, p2 = 0, i = 0, j = 0;
  while (p1 < word1.length && p2 < word2.length) {
    if (word1[p1][i] !== word2[p2][j]) {
      return false;
    }
    i++;
    if (i === word1[p1].length) {
      p1++;
      i = 0;
    }
    j++;
    if (j === word2[p2].length) {
      p2++;
      j = 0;
    }
  }
  return p1 == word1.length && p2 == word2.length;
};