// 1930. 长度为 3 的不同回文子序列
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个字符串 s ，返回 s 中 长度为 3 的不同回文子序列 的个数。

// 即便存在多种方法来构建相同的子序列，但相同的子序列只计数一次。

// 回文 是正着读和反着读一样的字符串。

// 子序列 是由原字符串删除其中部分字符（也可以不删除）且不改变剩余字符之间相对顺序形成的一个新字符串。

// 例如，"ace" 是 "abcde" 的一个子序列。

// 示例 1：

// 输入：s = "aabca"
// 输出：3
// 解释：长度为 3 的 3 个回文子序列分别是：
// - "aba" ("aabca" 的子序列)
// - "aaa" ("aabca" 的子序列)
// - "aca" ("aabca" 的子序列)
// 示例 2：

// 输入：s = "adc"
// 输出：0
// 解释："adc" 不存在长度为 3 的回文子序列。
// 示例 3：

// 输入：s = "bbcbaba"
// 输出：4
// 解释：长度为 3 的 4 个回文子序列分别是：
// - "bbb" ("bbcbaba" 的子序列)
// - "bcb" ("bbcbaba" 的子序列)
// - "bab" ("bbcbaba" 的子序列)
// - "aba" ("bbcbaba" 的子序列)

// 提示：

// 3 <= s.length <= 10^5
// s 仅由小写英文字母组成
/**
 * @param {string} s
 * @return {number}
 */
var countPalindromicSubsequence = function (s) {
  const n = s.length;
  let res = 0;
  // 枚举两侧字符
  for (let ch = "a".charCodeAt(0); ch <= "z".charCodeAt(0); ch++) {
    const c = String.fromCharCode(ch);
    let l = 0,
      r = n - 1;
    // 寻找该字符第一次出现的下标
    while (l < n && s[l] !== c) {
      ++l;
    }
    // 寻找该字符最后一次出现的下标
    while (r >= 0 && s[r] !== c) {
      --r;
    }
    if (r - l < 2) {
      // 该字符未出现，或两下标中间的子串不存在
      continue;
    }
    // 利用哈希集合统计 s[l+1..r-1] 子串的字符总数，并更新答案
    const charset = new Set();
    for (let k = l + 1; k < r; k++) {
      charset.add(s[k]);
    }
    res += charset.size;
  }
  return res;
};
