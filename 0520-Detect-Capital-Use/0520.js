// 520. 检测大写字母
// 我们定义，在以下情况时，单词的大写用法是正确的：

// 全部字母都是大写，比如 "USA" 。
// 单词中所有字母都不是大写，比如 "leetcode" 。
// 如果单词不只含有一个字母，只有首字母大写， 比如 "Google" 。
// 给你一个字符串 word 。如果大写用法正确，返回 true ；否则，返回 false 。



// 示例 1：

// 输入：word = "USA"
// 输出：true
// 示例 2：

// 输入：word = "FlaG"
// 输出：false


// 提示：

// 1 <= word.length <= 100
// word 由小写和大写英文字母组成


/**
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function (word) {
  // 若第1个字母为小写，则需额外判断第 2 个字母是否为小写
  if (word.length >= 2 && word[0] === word[0].toLowerCase() && word[1] === word[1].toUpperCase()) {
    return false;
  }

  // 无论第 1 个字母是否大写，其他字母必须与第 2 个字母的大小写相同
  for (let i = 2; i < word.length; ++i) {
    if (word[i] === word[i].toLowerCase() ^ word[1] === word[1].toLowerCase()) {
      return false;
    }
  }
  return true;
}