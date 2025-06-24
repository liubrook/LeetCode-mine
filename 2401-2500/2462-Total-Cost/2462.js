// 2462. 雇佣 K 位工人的总代价
// 中等
// 相关标签
// 相关企业
// 提示
// 给你一个下标从 0 开始的整数数组 costs ，其中 costs[i] 是雇佣第 i 位工人的代价。

// 同时给你两个整数 k 和 candidates 。我们想根据以下规则恰好雇佣 k 位工人：

// 总共进行 k 轮雇佣，且每一轮恰好雇佣一位工人。
// 在每一轮雇佣中，从最前面 candidates 和最后面 candidates 人中选出代价最小的一位工人，如果有多位代价相同且最小的工人，选择下标更小的一位工人。
// 比方说，costs = [3, 2, 7, 7, 1, 2] 且 candidates = 2 ，第一轮雇佣中，我们选择第 4 位工人，因为他的代价最小[3, 2, 7, 7, 1, 2] 。
// 第二轮雇佣，我们选择第 1 位工人，因为他们的代价与第 4 位工人一样都是最小代价，而且下标更小，[3, 2, 7, 7, 2] 。注意每一轮雇佣后，剩余工人的下标可能会发生变化。
// 如果剩余员工数目不足 candidates 人，那么下一轮雇佣他们中代价最小的一人，如果有多位代价相同且最小的工人，选择下标更小的一位工人。
// 一位工人只能被选择一次。
// 返回雇佣恰好 k 位工人的总代价。



// 示例 1：

// 输入：costs = [17, 12, 10, 2, 7, 2, 11, 20, 8], k = 3, candidates = 4
// 输出：11
// 解释：我们总共雇佣 3 位工人。总代价一开始为 0 。
// - 第一轮雇佣，我们从[17, 12, 10, 2, 7, 2, 11, 20, 8] 中选择。最小代价是 2 ，有两位工人，我们选择下标更小的一位工人，即第 3 位工人。总代价是 0 + 2 = 2 。
// - 第二轮雇佣，我们从[17, 12, 10, 7, 2, 11, 20, 8] 中选择。最小代价是 2 ，下标为 4 ，总代价是 2 + 2 = 4 。
// - 第三轮雇佣，我们从[17, 12, 10, 7, 11, 20, 8] 中选择，最小代价是 7 ，下标为 3 ，总代价是 4 + 7 = 11 。注意下标为 3 的工人同时在最前面和最后面 4 位工人中。
// 总雇佣代价是 11 。
// 示例 2：

// 输入：costs = [1, 2, 4, 1], k = 3, candidates = 3
// 输出：4
// 解释：我们总共雇佣 3 位工人。总代价一开始为 0 。
// - 第一轮雇佣，我们从[1, 2, 4, 1] 中选择。最小代价为 1 ，有两位工人，我们选择下标更小的一位工人，即第 0 位工人，总代价是 0 + 1 = 1 。注意，下标为 1 和 2 的工人同时在最前面和最后面 3 位工人中。
// - 第二轮雇佣，我们从[2, 4, 1] 中选择。最小代价为 1 ，下标为 2 ，总代价是 1 + 1 = 2 。
// - 第三轮雇佣，少于 3 位工人，我们从剩余工人[2, 4] 中选择。最小代价是 2 ，下标为 0 。总代价为 2 + 2 = 4 。
// 总雇佣代价是 4 。


// 提示：

// 1 <= costs.length <= 10^5
// 1 <= costs[i] <= 10^5
// 1 <= k, candidates <= costs.length

/**
 * @param {number[]} costs
 * @param {number} k
 * @param {number} candidates
 * @return {number}
 */
var totalCost = function (costs, k, candidates) {
  const n = costs.length;
  const q = new PriorityQueue({
    compare: (e1, e2) => {
      if (e1[0] < e2[0] || (e1[0] == e2[0] && e1[1] < e2[1])) {
        return -1;
      }
      return 1;
    }
  });
  let left = candidates - 1, right = n - candidates;
  if (left + 1 < right) {
    for (let i = 0; i <= left; ++i) {
      q.enqueue([costs[i], i]);
    }
    for (let i = right; i < n; ++i) {
      q.enqueue([costs[i], i]);
    }
  } else {
    for (let i = 0; i < n; ++i) {
      q.enqueue([costs[i], i]);
    }
  }
  let ans = 0;
  for (let i = 0; i < k; ++i) {
    const [cost, id] = q.dequeue();
    ans += cost;
    if (left + 1 < right) {
      if (id <= left) {
        ++left;
        q.enqueue([costs[left], left]);
      } else {
        --right;
        q.enqueue([costs[right], right]);
      }
    }
  }
  return ans;
};