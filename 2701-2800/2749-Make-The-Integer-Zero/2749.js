// 2749. 得到整数零需要执行的最少操作数
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你两个整数：num1 和 num2 。

// 在一步操作中，你需要从范围[0, 60] 中选出一个整数 i ，并从 num1 减去 2i + num2 。

// 请你计算，要想使 num1 等于 0 需要执行的最少操作数，并以整数形式返回。

// 如果无法使 num1 等于 0 ，返回 - 1 。



// 示例 1：

// 输入：num1 = 3, num2 = -2
// 输出：3
// 解释：可以执行下述步骤使 3 等于 0 ：
// - 选择 i = 2 ，并从 3 减去 22 + (-2) ，num1 = 3 - (4 + (-2)) = 1 。
// - 选择 i = 2 ，并从 1 减去 22 + (-2) ，num1 = 1 - (4 + (-2)) = -1 。
// - 选择 i = 0 ，并从 - 1 减去 20 + (-2) ，num1 = (-1) - (1 + (-2)) = 0 。
// 可以证明 3 是需要执行的最少操作数。
// 示例 2：

// 输入：num1 = 5, num2 = 7
// 输出：-1
// 解释：可以证明，执行操作无法使 5 等于 0 。


// 提示：

// 1 <= num1 <= 10^9
//   - 10^9 <= num2 <= 10^9

/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var makeTheIntegerZero = function (num1, num2) {
  let k = 1;
  while (true) {
    let x = BigInt(num1) - BigInt(num2) * BigInt(k);
    if (x < BigInt(k)) {
      return -1;
    }
    if (k >= bitCount(x)) {
      return k;
    }
    k++;
  }
};

function bitCount(n) {
  let count = 0;
  while (n !== 0n) {
    count++;
    n &= n - 1n;
  }
  return count;
}