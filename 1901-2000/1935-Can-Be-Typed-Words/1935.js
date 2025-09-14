// 1935. 可以输入的最大单词数
// 简单
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 键盘出现了一些故障，有些字母键无法正常工作。而键盘上所有其他键都能够正常工作。

// 给你一个由若干单词组成的字符串 text ，单词间由单个空格组成（不含前导和尾随空格）；另有一个字符串 brokenLetters ，由所有已损坏的不同字母键组成，返回你可以使用此键盘完全输入的 text 中单词的数目。



// 示例 1：

// 输入：text = "hello world", brokenLetters = "ad"
// 输出：1
// 解释：无法输入 "world" ，因为字母键 'd' 已损坏。
// 示例 2：

// 输入：text = "leet code", brokenLetters = "lt"
// 输出：1
// 解释：无法输入 "leet" ，因为字母键 'l' 和 't' 已损坏。
// 示例 3：

// 输入：text = "leet code", brokenLetters = "e"
// 输出：0
// 解释：无法输入任何单词，因为字母键 'e' 已损坏。


// 提示：

// 1 <= text.length <= 10^4
// 0 <= brokenLetters.length <= 26
// text 由若干用单个空格分隔的单词组成，且不含任何前导和尾随空格
// 每个单词仅由小写英文字母组成
// brokenLetters 由 互不相同 的小写英文字母组成

/**
 * @param {string} text
 * @param {string} brokenLetters
 * @return {number}
 */
var canBeTypedWords = function (text, brokenLetters) {
  const broken = new Set();   // 无法输入的字符集合
  for (const ch of brokenLetters) {
    broken.add(ch);
  }
  let res = 0;   // 可以完全输入的单词数目
  let flag = true;   // 当前字符所在单词是否可被完全输入
  for (const ch of text) {
    if (ch === ' ') {
      // 当前字符为空格，检查上一个单词状态，更新数目并初始化 flag
      if (flag) {
        ++res;
      }
      flag = true;
    } else if (broken.has(ch)) {
      // 当前字符不可被输入，所在单词无法被完全输入，更新 flag
      flag = false;
    }
  }
  // 判断最后一个单词状态并更新数目
  if (flag) {
    ++res;
  }
  return res;
};