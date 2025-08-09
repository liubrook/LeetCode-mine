// 869. 重新排序得到 2 的幂
// 已解答
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 给定正整数 n ，我们按任何顺序（包括原始顺序）将数字重新排序，注意其前导数字不能为零。

// 如果我们可以通过上述方式得到 2 的幂，返回 true；否则，返回 false。



// 示例 1：

// 输入：n = 1
// 输出：true
// 示例 2：

// 输入：n = 10
// 输出：false


// 提示：

// 1 <= n <= 10^9

/**
 * @param {number} n
 * @return {boolean}
 */
var reorderedPowerOf2 = function (n) {
  const powerOf2Digits = new Set();

  for (let n = 1; n <= 1e9; n <<= 1) {
    powerOf2Digits.add(countDigits(n));
  }

  return powerOf2Digits.has(countDigits(n));
};

const countDigits = (n) => {
  const cnt = new Array(10).fill(0);
  while (n) {
    cnt[n % 10]++;
    n = Math.floor(n / 10);
  }
  return cnt.join('');
}