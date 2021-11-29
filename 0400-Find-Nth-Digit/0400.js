// 400. 第 N 位数字
// 给你一个整数 n ，请你在无限的整数序列[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...] 中找出并返回第 n 位数字。



// 示例 1：

// 输入：n = 3
// 输出：3
// 示例 2：

// 输入：n = 11
// 输出：0
// 解释：第 11 位数字在序列 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ... 里是 0 ，它是 10 的一部分。


// 提示：

// 1 <= n <= 231 - 1


/**
 * @param {number} n
 * @return {number}
 */
var findNthDigit = function (n) {
  let low = 1, high = 9;
  while (low < high) {
    const mid = Math.floor((high - low) / 2) + low;
    if (totalDigits(mid) < n) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  const d = low;
  const prevDigits = totalDigits(d - 1);
  const index = n - prevDigits - 1;
  const start = Math.floor(Math.pow(10, d - 1));
  const num = start + Math.floor(index / d);
  const digitIndex = index % d;
  const digit = Math.floor(num / Math.floor(Math.pow(10, d - digitIndex - 1))) % 10;
  return digit;
};

const totalDigits = (length) => {
  let digits = 0;
  let curLength = 1, curCount = 9;
  while (curLength <= length) {
    digits += curLength * curCount;
    curLength++;
    curCount *= 10;
  }
  return digits;
}