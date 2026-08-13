// 3090. 每个字符最多出现两次的最长子字符串
// 简单
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个字符串 s ，请找出满足每个字符最多出现两次的最长子字符串，并返回该子字符串的 最大 长度。

// 示例 1：

// 输入： s = "bcbbbcba"

// 输出： 4

// 解释：

// 以下子字符串长度为 4，并且每个字符最多出现两次："bcbbbcba"。

// 示例 2：

// 输入： s = "aaaa"

// 输出： 2

// 解释：

// 以下子字符串长度为 2，并且每个字符最多出现两次："aaaa"。

// 提示：

// 2 <= s.length <= 100
// s 仅由小写英文字母组成。
/**
 * @param {string} s
 * @return {number}
 */
var maximumLengthSubstring = function (s) {
  const count = new Array(26).fill(0);
  let left = 0;
  let res = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s.charCodeAt(right) - 97;
    count[ch]++;

    while (count[ch] > 2) {
      const ch2 = s.charCodeAt(left) - 97;
      count[ch2]--;
      left++;
    }
    res = Math.max(res, right - left + 1);
  }
  return res;
};
