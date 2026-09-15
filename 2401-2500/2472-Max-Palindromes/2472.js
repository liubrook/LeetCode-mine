// 2472. 不重叠回文子字符串的最大数目
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个字符串 s 和一个 正 整数 k 。

// 从字符串 s 中选出一组满足下述条件且 不重叠 的子字符串：

// 每个子字符串的长度 至少 为 k 。
// 每个子字符串是一个 回文串 。
// 返回最优方案中能选择的子字符串的 最大 数目。

// 子字符串 是字符串中一个连续的字符序列。

// 示例 1 ：

// 输入：s = "abaccdbbd", k = 3
// 输出：2
// 解释：可以选择 s = "abaccdbbd" 中斜体加粗的子字符串。"aba" 和 "dbbd" 都是回文，且长度至少为 k = 3 。
// 可以证明，无法选出两个以上的有效子字符串。
// 示例 2 ：

// 输入：s = "adbcda", k = 2
// 输出：0
// 解释：字符串中不存在长度至少为 2 的回文子字符串。

// 提示：

// 1 <= k <= s.length <= 2000
// s 仅由小写英文字母组成
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxPalindromes = function (s, k) {
  const n = s.length;
  let ans = 0,
    start = 0;

  const check = (l, r) => {
    while (l < r) {
      if (s[l++] !== s[r--]) {
        return false;
      }
    }
    return true;
  };

  for (let r = k - 1; r < n; ++r) {
    let l = r - k + 1;
    if (l >= start && check(l, r)) {
      ++ans;
      start = r + 1;
      continue;
    }

    l = r - k;
    if (l >= start && check(l, r)) {
      ++ans;
      start = r + 1;
    }
  }

  return ans;
};
