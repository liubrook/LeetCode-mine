// 504. 七进制数
// 给定一个整数 num，将其转化为 7 进制，并以字符串形式输出。



// 示例 1:

// 输入: num = 100
// 输出: "202"
// 示例 2:

// 输入: num = -7
// 输出: "-10"


// 提示：

// -107 <= num <= 107

/**
 * @param {number} num
 * @return {string}
 */
var convertToBase7 = function (num) {
  if (num === 0) {
    return "0";
  }
  let negative = num < 0;
  num = Math.abs(num);
  const digits = [];
  while (num > 0) {
    digits.push(num % 7);
    num = Math.floor(num / 7);
  }
  if (negative) {
    digits.push('-');
  }
  return digits.reverse().join('');
};