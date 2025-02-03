// 680. 验证回文串 II
// 简单
// 相关标签
// 相关企业
// 给你一个字符串 s，最多 可以从中删除一个字符。

// 请你判断 s 是否能成为回文字符串：如果能，返回 true ；否则，返回 false 。



// 示例 1：

// 输入：s = "aba"
// 输出：true
// 示例 2：

// 输入：s = "abca"
// 输出：true
// 解释：你可以删除字符 'c' 。
// 示例 3：

// 输入：s = "abc"
// 输出：false


// 提示：

// 1 <= s.length <= 10^5
// s 由小写英文字母组成

/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
  let low = 0, high = s.length - 1;
  while (low < high) {
    if (s[low] === s[high]) {
      low++;
      high--;
    } else {
      return checkPalindrome(s, low, high - 1) || checkPalindrome(s, low + 1, high);
    }
  }
  return true;
};

function checkPalindrome(s, low, high) {
  while (low < high) {
    if (s[low] !== s[high]) {
      return false;
    }
    low++;
    high--;
  }
  return true;
}