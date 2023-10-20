// 2316. 统计无向图中无法互相到达点对数
// 提示
// 中等
// 26
// 相关企业
// 给你一个整数 n ，表示一张 无向图 中有 n 个节点，编号为 0 到 n - 1 。同时给你一个二维整数数组 edges ，其中 edges[i] = [ai, bi] 表示节点 ai 和 bi 之间有一条 无向 边。

// 请你返回 无法互相到达 的不同 点对数目 。



// 示例 1：

// https://assets.leetcode.com/uploads/2022/05/05/tc-3.png

// 输入：n = 3, edges = [[0, 1], [0, 2], [1, 2]]
// 输出：0
// 解释：所有点都能互相到达，意味着没有点对无法互相到达，所以我们返回 0 。
// 示例 2：

// https://assets.leetcode.com/uploads/2022/05/05/tc-2.png

// 输入：n = 7, edges = [[0, 2], [0, 5], [2, 4], [1, 6], [5, 4]]
// 输出：14
// 解释：总共有 14 个点对互相无法到达：
// [[0, 1], [0, 3], [0, 6], [1, 2], [1, 3], [1, 4], [1, 5], [2, 3], [2, 6], [3, 4], [3, 5], [3, 6], [4, 6], [5, 6]]
// 所以我们返回 14 。


// 提示：

// 1 <= n <= 10^5
// 0 <= edges.length <= 2 * 10^5
// edges[i].length == 2
// 0 <= ai, bi < n
// ai != bi
// 不会有重复边。

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countPairs = function (n, edges) {
  const uf = new UnionFind(n);
  for (const edge of edges) {
    x = edge[0], y = edge[1];
    uf.union(x, y);
  }
  let res = 0;
  for (let i = 0; i < n; i++) {
    res += n - uf.getSize(uf.find(i));
  }
  return res / 2;
};

class UnionFind {
  constructor(n) {
    this.sizes = new Array(n).fill(1);
    this.parents = new Array(n).fill(0).map((ele, index) => index);
  }

  find(x) {
    if (this.parents[x] == x) {
      return x;
    } else {
      this.parents[x] = this.find(this.parents[x]);
      return this.parents[x];
    }
  }

  union(x, y) {
    const rx = this.find(x);
    const ry = this.find(y);
    if (rx != ry) {
      if (this.sizes[rx] > this.sizes[ry]) {
        this.parents[ry] = rx;
        this.sizes[rx] += this.sizes[ry];
      } else {
        this.parents[rx] = ry;
        this.sizes[ry] += this.sizes[rx];
      }
    }
  }

  getSize(x) {
    return this.sizes[x];
  }
}