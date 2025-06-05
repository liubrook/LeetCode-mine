// 1012. 至少有 1 位重复的数字
// 给定正整数 n，返回在[1, n] 范围内具有 至少 1 位 重复数字的正整数的个数。



// 示例 1：

// 输入：n = 20
// 输出：1
// 解释：具有至少 1 位重复数字的正数（<= 20）只有 11 。
// 示例 2：

// 输入：n = 100
// 输出：10
// 解释：具有至少 1 位重复数字的正数（<= 100）有 11，22，33，44，55，66，77，88，99 和 100 。
// 示例 3：

// 输入：n = 1000
// 输出：262


// 提示：

// 1 <= n <= 10^9

/**
 * @param {number} n
 * @return {number}
 */
var numDupDigitsAtMostN = function (n) {
  const sn = '' + n;
  const f = (mask, sn, i, same) => {
    if (i === sn.length) {
      return 1;
    }
    let t = same ? sn[i].charCodeAt() - '0'.charCodeAt() : 9, res = 0, c = bitCount(mask) + 1;
    for (let k = 0; k <= t; k++) {
      if ((mask & (1 << k)) !== 0) {
        continue;
      }
      if (same && k === t) {
        res += f(mask | (1 << t), sn, i + 1, true);
      } else if (mask === 0 && k === 0) {
        res += f(0, sn, i + 1, false);
      } else {
        res += A(sn.length - 1 - i, 10 - c);
      }
    }
    return res;
  }
  return n + 1 - f(0, sn, 0, true);
}

const A = (x, y) => {
  let res = 1;
  for (let i = 0; i < x; i++) {
    res *= y--;
  }
  return res;
}

const bitCount = (n) => {
  return n.toString(2).split('0').join('').length;
}