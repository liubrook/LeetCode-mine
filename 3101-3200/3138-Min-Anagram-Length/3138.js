// 3138. 同位字符串连接的最小长度
// 中等
// 相关标签
// 相关企业
// 提示
// 给你一个字符串 s ，它由某个字符串 t 和若干 t  的 同位字符串 连接而成。

// 请你返回字符串 t 的 最小 可能长度。

// 同位字符串 指的是重新排列一个单词得到的另外一个字符串，原来字符串中的每个字符在新字符串中都恰好只使用一次。



// 示例 1：

// 输入：s = "abba"

// 输出：2

// 解释：

// 一个可能的字符串 t 为 "ba" 。

// 示例 2：

// 输入：s = "cdef"

// 输出：4

// 解释：

// 一个可能的字符串 t 为 "cdef" ，注意 t 可能等于 s 。



// 提示：

// 1 <= s.length <= 10^5
// s 只包含小写英文字母。

/**
 * @param {string} s
 * @return {number}
 */
var minAnagramLength = function (s) {
  let n = s.length;
  for (let i = 1; i < n; i++) {
    if (n % i !== 0) {
      continue;
    }
    if (check(s, i)) {
      return i;
    }
  }
  return n;
}

var check = function (s, m) {
  let count0 = new Array(26).fill(0);
  for (let j = 0; j < s.length; j += m) {
    let count1 = new Array(26).fill(0);
    for (let k = j; k < j + m; k++) {
      count1[s.charCodeAt(k) - 'a'.charCodeAt(0)]++;
    }
    if (j > 0 && !count0.every((val, index) => val === count1[index])) {
      return false;
    }
    count0 = count1.slice();
  }
  return true;
}