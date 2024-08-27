// 3144. 分割字符频率相等的最少子字符串
// 中等
// 相关标签
// 相关企业
// 提示
// 给你一个字符串 s ，你需要将它分割成一个或者更多的 平衡 子字符串。比方说，s == "ababcc" 那么("abab", "c", "c") ，("ab", "abc", "c") 和("ababcc") 都是合法分割，但是("a", "bab", "cc") ，("aba", "bc", "c") 和("ab", "abcc") 不是，不平衡的子字符串用粗体表示。

// 请你返回 s 最少 能分割成多少个平衡子字符串。

// 注意：一个 平衡 字符串指的是字符串中所有字符出现的次数都相同。



// 示例 1：

// 输入：s = "fabccddg"

// 输出：3

// 解释：

// 我们可以将 s 分割成 3 个子字符串：("fab, "ccdd", "g") 或者 ("fabc", "cd", "dg") 。

// 示例 2：

// 输入：s = "abababaccddb"

// 输出：2

// 解释：

// 我们可以将 s 分割成 2 个子字符串：("abab", "abaccddb") 。



// 提示：

// 1 <= s.length <= 1000
// s 只包含小写英文字母。

/**
 * @param {string} s
 * @return {number}
 */
const inf = 0x3f3f3f3f;
var minimumSubstringsInPartition = function (s) {
  const n = s.length;
  const d = new Array(n + 1).fill(inf);
  d[0] = 0;

  for (let i = 1; i <= n; i++) {
    let maxCnt = 0;
    const occCnt = new Map();
    for (let j = i; j >= 1; j--) {
      const char = s[j - 1];
      occCnt.set(char, (occCnt.get(char) || 0) + 1);
      maxCnt = Math.max(maxCnt, occCnt.get(char));
      if (maxCnt * occCnt.size === (i - j + 1) && d[j - 1] !== inf) {
        d[i] = Math.min(d[i], d[j - 1] + 1);
      }
    }
  }
  return d[n];
};