// 3652. 按策略买卖股票的最佳时机
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你两个整数数组 prices 和 strategy，其中：

// prices[i] 表示第 i 天某股票的价格。
// strategy[i] 表示第 i 天的交易策略，其中：
// -1 表示买入一单位股票。
// 0 表示持有股票。
// 1 表示卖出一单位股票。
// 同时给你一个 偶数 整数 k，你可以对 strategy 进行 最多一次 修改。一次修改包括：

// 选择 strategy 中恰好 k 个 连续 元素。
// 将前 k / 2 个元素设为 0（持有）。
// 将后 k / 2 个元素设为 1（卖出）。
// 利润 定义为所有天数中 strategy[i] * prices[i] 的 总和 。

// 返回你可以获得的 最大 可能利润。

// 注意： 没有预算或股票持有数量的限制，因此所有买入和卖出操作均可行，无需考虑过去的操作。

// 示例 1：

// 输入： prices = [4,2,8], strategy = [-1,0,1], k = 2

// 输出： 10

// 解释：

// 修改	策略	利润计算	利润
// 原始	[-1, 0, 1]	(-1 × 4) + (0 × 2) + (1 × 8) = -4 + 0 + 8	4
// 修改 [0, 1]	[0, 1, 1]	(0 × 4) + (1 × 2) + (1 × 8) = 0 + 2 + 8	10
// 修改 [1, 2]	[-1, 0, 1]	(-1 × 4) + (0 × 2) + (1 × 8) = -4 + 0 + 8	4
// 因此，最大可能利润是 10，通过修改子数组 [0, 1] 实现。

// 示例 2：

// 输入： prices = [5,4,3], strategy = [1,1,0], k = 2

// 输出： 9

// 解释：

// 修改	策略	利润计算	利润
// 原始	[1, 1, 0]	(1 × 5) + (1 × 4) + (0 × 3) = 5 + 4 + 0	9
// 修改 [0, 1]	[0, 1, 0]	(0 × 5) + (1 × 4) + (0 × 3) = 0 + 4 + 0	4
// 修改 [1, 2]	[1, 0, 1]	(1 × 5) + (0 × 4) + (1 × 3) = 5 + 0 + 3	8
// 因此，最大可能利润是 9，无需任何修改即可达成。

// 提示：

// 2 <= prices.length == strategy.length <= 10^5
// 1 <= prices[i] <= 10^5
// -1 <= strategy[i] <= 1
// 2 <= k <= prices.length
// k 是偶数
/**
 * @param {number[]} prices
 * @param {number[]} strategy
 * @param {number} k
 * @return {number}
 */
var maxProfit = function (prices, strategy, k) {
  const n = prices.length;
  const profitSum = new Array(n + 1).fill(0);
  const priceSum = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    profitSum[i + 1] = profitSum[i] + prices[i] * strategy[i];
    priceSum[i + 1] = priceSum[i] + prices[i];
  }
  let res = profitSum[n];
  for (let i = k - 1; i < n; i++) {
    const leftProfit = profitSum[i - k + 1];
    const rightProfit = profitSum[n] - profitSum[i + 1];
    const changeProfit = priceSum[i + 1] - priceSum[i - Math.floor(k / 2) + 1];
    res = Math.max(res, leftProfit + changeProfit + rightProfit);
  }
  return res;
};
