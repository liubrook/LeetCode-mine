// 1745. 分割回文串 IV
// 困难
// 相关标签
// 相关企业
// 提示
// 给你一个字符串 s ，如果可以将它分割成三个 非空 回文子字符串，那么返回 true ，否则返回 false 。

// 当一个字符串正着读和反着读是一模一样的，就称其为 回文字符串 。



// 示例 1：

// 输入：s = "abcbdd"
// 输出：true
// 解释："abcbdd" = "a" + "bcb" + "dd"，三个子字符串都是回文的。
// 示例 2：

// 输入：s = "bcbddxy"
// 输出：false
// 解释：s 没办法被分割成 3 个回文子字符串。


// 提示：

// 3 <= s.length <= 2000
// s​​​​​​ 只包含小写英文字母。

/**
 * @param {string} s
 * @return {boolean}
 */
var checkPartitioning = function (s) {
  const n = s.length;
  const isPalindrome = Array.from({ length: n }, () => new Array(n).fill(false));
  for (let length = 1; length < n; length++) {
    for (let start = 0; start <= n - length; start++) {
      const end = start + length - 1;
      if (length === 1) {
        isPalindrome[start][end] = true;
      } else if (length === 2) {
        isPalindrome[start][end] = (s[start] === s[end]);
      } else {
        isPalindrome[start][end] = (s[start] === s[end]) && isPalindrome[start + 1][end - 1];
      }
    }
  }

  for (let start = 1; start < n - 1; start++) {
    if (!isPalindrome[0][start - 1]) {
      continue;
    }
    for (let end = start; end < n - 1; end++) {
      if (isPalindrome[start][end] && isPalindrome[end + 1][n - 1]) {
        return true;
      }
    }
  }
  return false;
};