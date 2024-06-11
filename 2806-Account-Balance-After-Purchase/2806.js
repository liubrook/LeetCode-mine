
// 示例 1：

// 输入：purchaseAmount = 9
// 输出：90
// 解释：这个例子中，最接近 9 的 10 的倍数是 10 。所以你的账户余额为 100 - 10 = 90 。
// 示例 2：

// 输入：purchaseAmount = 15
// 输出：80
// 解释：这个例子中，有 2 个最接近 15 的 10 的倍数：10 和 20，较大的数 20 是你的实际开销。
// 所以你的账户余额为 100 - 20 = 80 。


// 提示：

// 0 <= purchaseAmount <= 100

/**
 * @param {number} purchaseAmount
 * @return {number}
 */
var accountBalanceAfterPurchase = function (purchaseAmount) {
  const r = purchaseAmount % 10;
  if (r < 5) {
    purchaseAmount -= r;
  } else {
    purchaseAmount += 10 - r;
  }
  return 100 - purchaseAmount;
};