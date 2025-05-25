// 1857. 有向图中最大颜色值
// 困难
// 相关标签
// 相关企业
// 提示
// 给你一个 有向图 ，它含有 n 个节点和 m 条边。节点编号从 0 到 n - 1 。

// 给你一个字符串 colors ，其中 colors[i] 是小写英文字母，表示图中第 i 个节点的 颜色 （下标从 0 开始）。同时给你一个二维数组 edges ，其中 edges[j] = [aj, bj] 表示从节点 aj 到节点 bj 有一条 有向边 。

// 图中一条有效 路径 是一个点序列 x1 -> x2 -> x3 -> ... -> xk ，对于所有 1 <= i < k ，从 xi 到 xi + 1 在图中有一条有向边。路径的 颜色值 是路径中 出现次数最多 颜色的节点数目。

// 请你返回给定图中有效路径里面的 最大颜色值 。如果图中含有环，请返回 - 1 。



// 示例 1：

// https://assets.leetcode.com/uploads/2021/04/21/leet1.png

// 输入：colors = "abaca", edges = [[0, 1], [0, 2], [2, 3], [3, 4]]
// 输出：3
// 解释：路径 0 -> 2 -> 3 -> 4 含有 3 个颜色为 "a" 的节点（上图中的红色节点）。
// 示例 2：

// https://assets.leetcode.com/uploads/2021/04/21/leet2.png

// 输入：colors = "a", edges = [[0, 0]]
// 输出：-1
// 解释：从 0 到 0 有一个环。


// 提示：

// n == colors.length
// m == edges.length
// 1 <= n <= 10^5
// 0 <= m <= 10^5
// colors 只含有小写英文字母。
// 0 <= aj, bj < n

/**
 * @param {string} colors
 * @param {number[][]} edges
 * @return {number}
 */
var largestPathValue = function (colors, edges) {
  const n = colors.length;
  // 邻接表
  const g = Array.from({ length: n }, () => []);
  // 节点的入度统计，用于找出拓扑排序中最开始的节点
  const indeg = Array(n).fill(0);
  for (const [u, v] of edges) {
    indeg[v]++;
    g[u].push(v);
  }
  // 记录拓扑排序过程中遇到的节点个数
  // 如果最终 found 的值不为 n，说明图中存在环
  let found = 0;
  const f = Array.from({ length: n }, () => Array(26).fill(0));
  const q = [];
  for (let i = 0; i < n; i++) {
    if (indeg[i] === 0) {
      q.push(i);
    }
  }
  while (q.length > 0) {
    found++;
    const u = q.shift();
    // 将节点 u 对应的颜色增加 1
    f[u][colors.charCodeAt(u) - 'a'.charCodeAt(0)]++;
    // 枚举 u 的后继节点 v
    for (const v of g[u]) {
      indeg[v]--;
      // 将 f(v,c) 更新为其与 f(u,c) 的较大值
      for (let c = 0; c < 26; c++) {
        f[v][c] = Math.max(f[v][c], f[u][c]);
      }
      if (indeg[v] === 0) {
        q.push(v);
      }
    }
  }
  if (found !== n) {
    return -1;
  }
  let ans = 0;
  for (let i = 0; i < n; i++) {
    ans = Math.max(ans, ...f[i]);
  }
  return ans;
};