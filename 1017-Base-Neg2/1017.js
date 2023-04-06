// 1017. 负二进制转换
// 给你一个整数 n ，以二进制字符串的形式返回该整数的 负二进制（base - 2）表示。

// 注意，除非字符串就是 "0"，否则返回的字符串中不能含有前导零。



// 示例 1：

// 输入：n = 2
// 输出："110"
// 解释：(-2)2 + (-2)1 = 2
// 示例 2：

// 输入：n = 3
// 输出："111"
// 解释：(-2)2 + (-2)1 + (-2)0 = 3
// 示例 3：

// 输入：n = 4
// 输出："100"
// 解释：(-2)2 = 4


// 提示：

// 0 <= n <= 10^9


/**
 * @param {number} n
 * @return {string}
 */
var baseNeg2 = function (n) {
  if (n === 0) {
    return "0";
  }
  const bits = new Array(32).fill(0);
  for (let i = 0; i < 32 && n !== 0; i++) {
    if ((n & 1) !== 0) {
      bits[i]++;
      if ((i & 1) !== 0) {
        bits[i + 1]++;
      }
    }
    n >>= 1;
  }
  let carry = 0;
  for (let i = 0; i < 32; i++) {
    const val = carry + bits[i];
    bits[i] = val & 1;
    carry = (val - bits[i]) / (-2);
  }
  let pos = 31;
  let res = "";
  while (pos >= 0 && bits[pos] === 0) {
    pos--;
  }
  while (pos >= 0) {
    res += bits[pos];
    pos--;
  }
  return res;
};