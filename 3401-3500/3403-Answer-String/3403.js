// 3403. 从盒子中找出字典序最大的字符串 I
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个字符串 word 和一个整数 numFriends。

// Alice 正在为她的 numFriends 位朋友组织一个游戏。游戏分为多个回合，在每一回合中：

// word 被分割成 numFriends 个 非空 字符串，且该分割方式与之前的任意回合所采用的都 不完全相同 。
// 所有分割出的字符串都会被放入一个盒子中。
// 在所有回合结束后，找出盒子中 字典序最大的 字符串。



// 示例 1：

// 输入: word = "dbca", numFriends = 2

// 输出: "dbc"

// 解释:

// 所有可能的分割方式为：

// "d" 和 "bca"。
// "db" 和 "ca"。
// "dbc" 和 "a"。
// 示例 2：

// 输入: word = "gggg", numFriends = 4

// 输出: "g"

// 解释:

// 唯一可能的分割方式为："g", "g", "g", 和 "g"。



// 提示:

// 1 <= word.length <= 5 * 10^3
// word 仅由小写英文字母组成。
// 1 <= numFriends <= word.length

/**
 * @param {string} word
 * @param {number} numFriends
 * @return {string}
 */
var answerString = function (word, numFriends) {
  if (numFriends === 1) {
    return word;
  }
  let last = lastSubstring(word);
  let n = word.length, m = last.length;
  return last.substring(0, Math.min(m, n - numFriends + 1));
};

var lastSubstring = function (s) {
  let i = 0, j = 1, n = s.length;
  while (j < n) {
    let k = 0;
    while (j + k < n && s[i + k] === s[j + k]) {
      k++;
    }
    if (j + k < n && s[i + k] < s[j + k]) {
      let t = i;
      i = j;
      j = Math.max(j + 1, t + k + 1);
    } else {
      j = j + k + 1;
    }
  }
  return s.substring(i, n);
};