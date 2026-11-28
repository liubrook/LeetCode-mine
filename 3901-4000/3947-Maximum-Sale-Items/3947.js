// 3947. 购买最多物品数目 II
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个二维整数数组 items，其中 items[i] = [factori, pricei] 表示下标为 i 的物品。同时给你一个整数 budget。

// 每种物品都有无限个可供购买。你可以购买任意数量的任意物品，但购买物品的总花费最多为 budget。

// 购买物品后，你可以根据以下规则获得免费的物品：

// 购买的每一份物品 i 最多 可以让你获得 一份 免费的其他物品 j。
// 免费物品必须满足 i != j 且 factori 可以整除 factorj。
// 对于每个有序对 (i, j)，无论你购买了多少个物品 i，你从物品 i 的购买中 最多只能一次 免费获得物品 j。
// 如果免费物品 j 是通过购买不同种类的物品获得的，那么同一种物品 j 可以被免费获得多次。
// 返回你在购买物品花费最多为 budget 的前提下，能够获得的 物品最大总数 ，包括购买的物品和免费的物品。

// 示例 1：

// 输入： items = [[1,6],[2,4],[3,5]], budget = 19

// 输出： 5

// 解释：

// 你可以购买 2 个物品 0 和 1 个物品 1，总花费为 2 * 6 + 4 = 16，不超过 budget = 19。
// 购买的其中 1 个物品 0 可以免费获得 1 个物品 1，因为 factor0 = 1 可以整除 factor1 = 2。
// 购买的另一个物品 0 可以免费获得 1 个物品 2，因为 factor0 = 1 可以整除 factor2 = 3。
// 你最终拥有 3 个购买的物品和 2 个免费物品，总共 5 个物品。
// 示例 2：

// 输入： items = [[2,8],[1,10],[6,6],[4,12],[5,20],[5,17]], budget = 35

// 输出： 7

// 解释：

// 你可以购买 2 个物品 0、1 个物品 1 以及 1 个物品 2，总花费为 2 * 8 + 10 + 6 = 32，不超过 budget = 35。
// 购买的其中 1 个物品 0 可以免费获得 1 个物品 2，因为 factor0 = 2 可以整除 factor2 = 6。
// 购买的另一个物品 0 可以免费获得 1 个物品 3，因为 factor0 = 2 可以整除 factor3 = 4。
// 购买的 1 个物品 1 可以免费获得 1 个物品 2，因为 factor1 = 1 可以整除 factor2 = 6。
// 购买物品 2 没有获得免费物品，因为 factor2 = 6 不能整除任何其他物品的 factor。
// 你最终拥有 4 个购买的物品和 3 个免费物品，总共 7 个物品。

// 提示：

// 1 <= items.length <= 10^5
// items[i] = [factori, pricei]
// 1 <= factori <= items.length
// 1 <= pricei <= 10^9
// 1 <= budget <= 10^9
/**
 * @param {number[][]} items
 * @param {number} budget
 * @return {number}
 */
var maximumSaleItems = function (items, budget) {
  items.sort((a, b) => a[1] - b[1]);
  let mx = 0;
  for (const [factor] of items) {
    mx = Math.max(mx, factor);
  }
  const freq = new Int32Array(mx + 1);
  for (const [factor] of items) {
    freq[factor]++;
  }
  for (let i = 1; i <= mx; i++) {
    if (freq[i] > 0) {
      for (let j = i * 2; j <= mx; j += i) {
        freq[i] += freq[j];
      }
    }
  }

  const mn = items[0][1];
  let ans = 0;
  for (const [factor, price] of items) {
    if (price > mn * 2) {
      break;
    }
    const cnt = freq[factor] - 1;
    const take = Math.min(cnt, Math.floor(budget / price));
    ans += take * 2;
    budget -= take * price;
  }
  ans += Math.floor(budget / mn);
  return ans;
};
