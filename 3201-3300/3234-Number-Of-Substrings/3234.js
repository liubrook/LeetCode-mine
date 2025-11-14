// 3234. 统计 1 显著的字符串的数量
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个二进制字符串 s。

// 请你统计并返回其中 1 显著 的 子字符串 的数量。

// 如果字符串中 1 的数量 大于或等于 0 的数量的 平方，则认为该字符串是一个 1 显著 的字符串 。

// 示例 1：

// 输入：s = "00011"

// 输出：5

// 解释：

// 1 显著的子字符串如下表所示。

// i	j	s[i..j]	0 的数量	1 的数量
// 3	3	1	0	1
// 4	4	1	0	1
// 2	3	01	1	1
// 3	4	11	0	2
// 2	4	011	1	2
// 示例 2：

// 输入：s = "101101"

// 输出：16

// 解释：

// 1 不显著的子字符串如下表所示。

// 总共有 21 个子字符串，其中 5 个是 1 不显著字符串，因此有 16 个 1 显著子字符串。

// i	j	s[i..j]	0 的数量	1 的数量
// 1	1	0	1	0
// 4	4	0	1	0
// 1	4	0110	2	2
// 0	4	10110	2	3
// 1	5	01101	2	3

// 提示：

// 1 <= s.length <= 4 * 10^4
// s 仅包含字符 '0' 和 '1'。
/**
 * @param {string} s
 * @return {number}
 */
var numberOfSubstrings = function (s) {
  const n = s.length;
  const pre = new Array(n + 1);
  pre[0] = -1;
  for (let i = 0; i < n; i++) {
    if (i === 0 || (i > 0 && s[i - 1] === "0")) {
      pre[i + 1] = i;
    } else {
      pre[i + 1] = pre[i];
    }
  }
  let res = 0;
  for (let i = 1; i <= n; i++) {
    let cnt0 = s[i - 1] === "0" ? 1 : 0;
    let j = i;
    while (j > 0 && cnt0 * cnt0 <= n) {
      const cnt1 = i - pre[j] - cnt0;
      if (cnt0 * cnt0 <= cnt1) {
        res += Math.min(j - pre[j], cnt1 - cnt0 * cnt0 + 1);
      }
      j = pre[j];
      cnt0++;
    }
  }
  return res;
};
