// 2360. 图中的最长环
// 困难
// 相关标签
// 相关企业
// 提示
// 给你一个 n 个节点的 有向图 ，节点编号为 0 到 n - 1 ，其中每个节点 至多 有一条出边。

// 图用一个大小为 n 下标从 0 开始的数组 edges 表示，节点 i 到节点 edges[i] 之间有一条有向边。如果节点 i 没有出边，那么 edges[i] == -1 。

// 请你返回图中的 最长 环，如果没有任何环，请返回 - 1 。

// 一个环指的是起点和终点是 同一个 节点的路径。



// 示例 1：

// https://assets.leetcode.com/uploads/2022/06/08/graph4drawio-5.png

// 输入：edges = [3, 3, 4, 2, 3]
// 输出去：3
// 解释：图中的最长环是：2 -> 4 -> 3 -> 2 。
// 这个环的长度为 3 ，所以返回 3 。
// 示例 2：

// https://assets.leetcode.com/uploads/2022/06/07/graph4drawio-1.png

// 输入：edges = [2, -1, 3, 1]
// 输出：-1
// 解释：图中没有任何环。


// 提示：

// n == edges.length
// 2 <= n <= 10^5
//   - 1 <= edges[i] < n
// edges[i] != i

/**
 * @param {number[]} edges
 * @return {number}
 */
var longestCycle = function (edges) {
  const n = edges.length;
  const label = new Array(n).fill(0);
  let current_label = 0, ans = -1;
  for (let i = 0; i < n; ++i) {
    if (label[i]) {
      continue;
    }
    let pos = i, start_label = current_label;
    while (pos !== -1) {
      ++current_label;
      // 如果遇到了已经遍历过的节点
      if (label[pos]) {
        // 如果该节点是这一次 i 循环中遍历的，说明找到了新的环，更新答案
        if (label[pos] > start_label) {
          ans = Math.max(ans, current_label - label[pos]);
        }
        break;
      }
      label[pos] = current_label;
      pos = edges[pos];
    }
  }
  return ans;
};