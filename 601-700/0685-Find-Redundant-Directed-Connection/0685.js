// 685. 冗余连接 II
// 困难
// 相关标签
// 相关企业
// 在本问题中，有根树指满足以下条件的 有向 图。该树只有一个根节点，所有其他节点都是该根节点的后继。该树除了根节点之外的每一个节点都有且只有一个父节点，而根节点没有父节点。

// 输入一个有向图，该图由一个有着 n 个节点（节点值不重复，从 1 到 n）的树及一条附加的有向边构成。附加的边包含在 1 到 n 中的两个不同顶点间，这条附加的边不属于树中已存在的边。

// 结果图是一个以边组成的二维数组 edges 。 每个元素是一对[ui, vi]，用以表示 有向 图中连接顶点 ui 和顶点 vi 的边，其中 ui 是 vi 的一个父节点。

// 返回一条能删除的边，使得剩下的图是有 n 个节点的有根树。若有多个答案，返回最后出现在给定二维数组的答案。



// 示例 1：
// https://assets.leetcode.com/uploads/2020/12/20/graph1.jpg

// 输入：edges = [[1, 2], [1, 3], [2, 3]]
// 输出：[2, 3]
// 示例 2：
// https://assets.leetcode.com/uploads/2020/12/20/graph2.jpg

// 输入：edges = [[1, 2], [2, 3], [3, 4], [4, 1], [1, 5]]
// 输出：[4, 1]


// 提示：

// n == edges.length
// 3 <= n <= 1000
// edges[i].length == 2
// 1 <= ui, vi <= n

/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantDirectedConnection = function (edges) {
  const N = edges.length + 10;

  const indegrees = [];
  for (let [start, end] of edges) {
    indegrees[end] = (indegrees[end] || 0) + 1;
  }
  let endNode = null;
  let cand1 = null;
  let cand2 = null;
  for (let i = 0; i < indegrees.length; i++) {
    if (indegrees[i] === 2) {
      endNode = i;
      break;
    }
  }
  if (endNode) {
    for (let edge of edges) {
      const [start, end] = edge;
      if (end !== endNode) continue;
      if (cand1 === null) cand1 = [start, end];
      else cand2 = [start, end];
      edge[1] = null; // 为了让这两条边最后union
    }
  }

  class UF {
    constructor(size) {
      this.parent = new Array(size).fill(-1);
      this.size = new Array(size).fill(1);
    }
    findRoot(i) {
      while (this.parent[i] !== -1) i = this.parent[i];
      return i;
    }
    union(i, j) {
      const iRoot = this.findRoot(i);
      const jRoot = this.findRoot(j);
      if (iRoot === jRoot) return [i, j];
      if (this.size[iRoot] > this.size[jRoot]) {
        this.parent[jRoot] = iRoot;
        this.size[iRoot] += this.size[jRoot];
      } else {
        this.parent[iRoot] = jRoot;
        this.size[jRoot] += this.size[iRoot];
      }
    }
  }

  const uf = new UF(N);
  for (let [start, end] of edges) {
    if (end == null) continue;
    const t = uf.union(start, end);
    if (t) return t; // 情况2 会在这里输出
  }
  if (endNode) { // 情况1 会在这里输出
    const t1 = uf.union(cand1[0], cand1[1]);
    if (t1) return t1;
    const t2 = uf.union(cand2[0], cand2[1]);
    if (t2) return t2;
  }

  return cand2; // 情况3 会在这里输出
};