// 2192. 有向无环图中一个节点的所有祖先
// 中等
// 相关标签
// 相关企业
// 提示
// 给你一个正整数 n ，它表示一个 有向无环图 中节点的数目，节点编号为 0 到 n - 1 （包括两者）。

// 给你一个二维整数数组 edges ，其中 edges[i] = [fromi, toi] 表示图中一条从 fromi 到 toi 的单向边。

// 请你返回一个数组 answer，其中 answer[i]是第 i 个节点的所有 祖先 ，这些祖先节点 升序 排序。

// 如果 u 通过一系列边，能够到达 v ，那么我们称节点 u 是节点 v 的 祖先 节点。



// 示例 1：

// https://assets.leetcode.com/uploads/2019/12/12/e1.png

// 输入：n = 8, edgeList = [[0, 3], [0, 4], [1, 3], [2, 4], [2, 7], [3, 5], [3, 6], [3, 7], [4, 6]]
// 输出：[[], [], [], [0, 1], [0, 2], [0, 1, 3], [0, 1, 2, 3, 4], [0, 1, 2, 3]]
// 解释：
// 上图为输入所对应的图。
// - 节点 0 ，1 和 2 没有任何祖先。
// - 节点 3 有 2 个祖先 0 和 1 。
// - 节点 4 有 2 个祖先 0 和 2 。
// - 节点 5 有 3 个祖先 0 ，1 和 3 。
// - 节点 6 有 5 个祖先 0 ，1 ，2 ，3 和 4 。
// - 节点 7 有 4 个祖先 0 ，1 ，2 和 3 。
// 示例 2：

// https://assets.leetcode.com/uploads/2019/12/12/e2.png

// 输入：n = 5, edgeList = [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]
// 输出：[[], [0], [0, 1], [0, 1, 2], [0, 1, 2, 3]]
// 解释：
// 上图为输入所对应的图。
// - 节点 0 没有任何祖先。
// - 节点 1 有 1 个祖先 0 。
// - 节点 2 有 2 个祖先 0 和 1 。
// - 节点 3 有 3 个祖先 0 ，1 和 2 。
// - 节点 4 有 4 个祖先 0 ，1 ，2 和 3 。


// 提示：

// 1 <= n <= 1000
// 0 <= edges.length <= min(2000, n * (n - 1) / 2)
// edges[i].length == 2
// 0 <= fromi, toi <= n - 1
// fromi != toi
// 图中不会有重边。
// 图是 有向 且 无环 的。

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */
var getAncestors = function (n, edges) {
  // 存储每个节点的祖先节点的辅助数组
  const anc = Array(n).fill().map(() => new Set());
  // 邻接表
  const e = Array(n).fill().map(() => []);
  // 入度表
  const indeg = Array(n).fill(0);

  // 预处理
  for (const edge of edges) {
    e[edge[0]].push(edge[1]);
    indeg[edge[1]]++;
  }

  // 广度优先搜索求解拓扑排序
  const q = [];
  for (let i = 0; i < n; ++i) {
    if (!indeg[i]) {
      q.push(i);
    }
  }
  while (q.length) {
    const u = q.shift();
    for (const v of e[u]) {
      // 更新子节点的祖先节点集合
      anc[v].add(u);
      for (const i of anc[u]) {
        anc[v].add(i);
      }
      indeg[v]--;
      if (!indeg[v]) {
        q.push(v);
      }
    }
  }

  // 转化为答案数组
  const res = [];
  for (let i = 0; i < n; ++i) {
    res[i] = Array.from(anc[i]).sort((a, b) => a - b);
  }

  return res;
};