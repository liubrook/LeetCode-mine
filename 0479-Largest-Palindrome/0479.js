// 479. 最大回文数乘积
// 给定一个整数 n ，返回 可表示为两个 n 位整数乘积的 最大回文整数 。因为答案可能非常大，所以返回它对 1337 取余 。



// 示例 1:

// 输入：n = 2
// 输出：987
// 解释：99 x 91 = 9009, 9009 % 1337 = 987
// 示例 2:

// 输入： n = 1
// 输出： 9


// 提示:

// 1 <= n <= 8

/**
 * @param {number} n
 * @return {number}
 */
var largestPalindrome = function (n) {
  if (n === 1) {
    return 9;
  }
  const upper = 10 ** n - 1;
  for (let left = upper; left > upper / 10; left--) {
    let right = String(left).split('').reverse().join('');
    let p = BigInt(String(left) + right)    //得到回文数
    let x = BigInt(upper);
    while (x * x >= p) {
      if (p % x === BigInt(0)) { // x 是 p 的因子
        return p % BigInt(1337);
      }
      x--;
    }
  }
};