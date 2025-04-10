// 2843. 统计对称整数的数目
// 简单
// 相关标签
// 相关企业
// 提示
// 给你两个正整数 low 和 high 。

// 对于一个由 2 * n 位数字组成的整数 x ，如果其前 n 位数字之和与后 n 位数字之和相等，则认为这个数字是一个对称整数。

// 返回在[low, high] 范围内的 对称整数的数目 。



// 示例 1：

// 输入：low = 1, high = 100
// 输出：9
// 解释：在 1 到 100 范围内共有 9 个对称整数：11、22、33、44、55、66、77、88 和 99 。
// 示例 2：

// 输入：low = 1200, high = 1230
// 输出：4
// 解释：在 1200 到 1230 范围内共有 4 个对称整数：1203、1212、1221 和 1230 。


// 提示：

// 1 <= low <= high <= 10^4

/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var countSymmetricIntegers = function (low, high) {
  let res = 0;
  for (let a = low; a <= high; ++a) {
    if (a < 100 && a % 11 === 0) {
      res++;
    } else if (1000 <= a && a < 10000) {
      const left = Math.floor(a / 1000) + Math.floor((a % 1000) / 100);
      const right = Math.floor((a % 100) / 10) + a % 10;
      if (left === right) {
        res++;
      }
    }
  }
  return res;
};