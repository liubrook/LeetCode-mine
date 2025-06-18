// 1962. 移除石子使总数最小
// 提示
// 中等
// 35
// 相关企业
// 给你一个整数数组 piles ，数组 下标从 0 开始 ，其中 piles[i] 表示第 i 堆石子中的石子数量。另给你一个整数 k ，请你执行下述操作 恰好 k 次：

// 选出任一石子堆 piles[i] ，并从中 移除 floor(piles[i] / 2) 颗石子。
// 注意：你可以对 同一堆 石子多次执行此操作。

// 返回执行 k 次操作后，剩下石子的 最小 总数。

// floor(x) 为 小于 或 等于 x 的 最大 整数。（即，对 x 向下取整）。



// 示例 1：

// 输入：piles = [5, 4, 9], k = 2
// 输出：12
// 解释：可能的执行情景如下：
// - 对第 2 堆石子执行移除操作，石子分布情况变成[5, 4, 5] 。
// - 对第 0 堆石子执行移除操作，石子分布情况变成[3, 4, 5] 。
// 剩下石子的总数为 12 。
// 示例 2：

// 输入：piles = [4, 3, 6, 7], k = 3
// 输出：12
// 解释：可能的执行情景如下：
// - 对第 2 堆石子执行移除操作，石子分布情况变成[4, 3, 3, 7] 。
// - 对第 3 堆石子执行移除操作，石子分布情况变成[4, 3, 3, 4] 。
// - 对第 0 堆石子执行移除操作，石子分布情况变成[2, 3, 3, 4] 。
// 剩下石子的总数为 12 。


// 提示：

// 1 <= piles.length <= 10^5
// 1 <= piles[i] <= 10^4
// 1 <= k <= 10^5

/**
 * @param {number[]} piles
 * @param {number} k
 * @return {number}
 */
var minStoneSum = function (piles, k) {
  const pq = new MaxPriorityQueue();
  for (const pile of piles) {
    pq.enqueue(pile, pile);
  }
  for (let i = 0; i < k; i++) {
    let pile = pq.front().element;
    pq.dequeue();
    pile -= Math.floor(pile / 2);
    pq.enqueue(pile, pile);
  }
  let sum = 0;
  while (!pq.isEmpty()) {
    sum += pq.front().element;
    pq.dequeue();
  }
  return sum;
};