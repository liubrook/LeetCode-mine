// 1782. 统计点对的数目
// 提示
// 困难
// 108
// 相关企业
// 给你一个无向图，无向图由整数 n  ，表示图中节点的数目，和 edges 组成，其中 edges[i] = [ui, vi] 表示 ui 和 vi 之间有一条无向边。同时给你一个代表查询的整数数组 queries 。

// 第 j 个查询的答案是满足如下条件的点对(a, b) 的数目：

// a < b
// cnt 是与 a 或者 b 相连的边的数目，且 cnt 严格大于 queries[j] 。
// 请你返回一个数组 answers ，其中 answers.length == queries.length 且 answers[j] 是第 j 个查询的答案。

// 请注意，图中可能会有 重复边 。



// 示例 1：

// https://pic.leetcode-cn.com/1614828447-GMnLVg-image.png
// 输入：n = 4, edges = [[1, 2], [2, 4], [1, 3], [2, 3], [2, 1]], queries = [2, 3]
// 输出：[6, 5]
// 解释：每个点对中，与至少一个点相连的边的数目如上图所示。
// answers[0] = 6。所有的点对(a, b)中边数和都大于2，故有6个；
// answers[1] = 5。所有的点对(a, b)中除了(3, 4)边数等于3，其它点对边数和都大于3，故有5个。
// 示例 2：

// 输入：n = 5, edges = [[1, 5], [1, 5], [3, 4], [2, 5], [1, 3], [5, 1], [2, 3], [2, 5]], queries = [1, 2, 3, 4, 5]
// 输出：[10, 10, 9, 8, 6]


// 提示：

// 2 <= n <= 2 * 10^4
// 1 <= edges.length <= 10^5
// 1 <= ui, vi <= n
// ui != vi
// 1 <= queries.length <= 20
// 0 <= queries[j] < edges.length

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} queries
 * @return {number[]}
 */
var countPairs = function (n, edges, queries) {
  const degree = new Array(n).fill(0);
  const cnt = new Map();
  for (var edge of edges) {
    let x = edge[0] - 1;
    let y = edge[1] - 1;
    if (x > y) {
      let tmp = x;
      x = y;
      y = tmp;
    }
    degree[x]++;
    degree[y]++;
    const key = x * n + y;
    cnt.set(key, cnt.has(key) ? cnt.get(key) + 1 : 1);
  }
  const arr = Array.from(degree);
  const ans = new Array(queries.length);
  arr.sort((a, b) => a - b);
  for (let k = 0; k < queries.length; k++) {
    const bound = queries[k];
    let total = 0;
    for (let i = 0, j = n - 1; i < n; i++) {
      while (j > i && arr[i] + arr[j] > bound) {
        j--;
      }
      total += n - 1 - Math.max(i, j);
    }
    for (var [val, freq] of cnt.entries()) {
      let x = Math.floor(val / n);
      let y = val % n;
      if (degree[x] + degree[y] > bound && degree[x] + degree[y] - freq <= bound) {
        total--;
      }
    }
    ans[k] = total;
  }
  return ans;
};