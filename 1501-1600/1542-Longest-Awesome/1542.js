// 1542. 找出最长的超赞子字符串
// 困难
// 相关标签
// 相关企业
// 提示
// 给你一个字符串 s 。请返回 s 中最长的 超赞子字符串 的长度。

// 「超赞子字符串」需满足满足下述两个条件：

// 该字符串是 s 的一个非空子字符串
// 进行任意次数的字符交换后，该字符串可以变成一个回文字符串


// 示例 1：

// 输入：s = "3242415"
// 输出：5
// 解释："24241" 是最长的超赞子字符串，交换其中的字符后，可以得到回文 "24142"
// 示例 2：

// 输入：s = "12345678"
// 输出：1
// 示例 3：

// 输入：s = "213123"
// 输出：6
// 解释："213123" 是最长的超赞子字符串，交换其中的字符后，可以得到回文 "231132"
// 示例 4：

// 输入：s = "00"
// 输出：2


// 提示：

// 1 <= s.length <= 10 ^ 5
// s 仅由数字组成

/**
 * @param {string} s
 * @return {number}
 */
var longestAwesome = function (s) {
  let prefix = new Map([[0, -1]]);
  let ans = 0;
  let sequence = 0;
  for (let j = 0; j < s.length; ++j) {
    let digit = parseInt(s[j]);
    sequence ^= (1 << digit);
    if (prefix.has(sequence)) {
      ans = Math.max(ans, j - prefix.get(sequence));
    } else {
      prefix.set(sequence, j);
    }
    for (let k = 0; k < 10; ++k) {
      if (prefix.has(sequence ^ (1 << k))) {
        ans = Math.max(ans, j - prefix.get(sequence ^ (1 << k)));
      }
    }
  }
  return ans;
};