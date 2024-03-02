// 2368. 受限条件下可到达节点的数目
// 中等
// 相关标签
// 相关企业
// 提示
// 现有一棵由 n 个节点组成的无向树，节点编号从 0 到 n - 1 ，共有 n - 1 条边。

// 给你一个二维整数数组 edges ，长度为 n - 1 ，其中 edges[i] = [ai, bi] 表示树中节点 ai 和 bi 之间存在一条边。另给你一个整数数组 restricted 表示 受限 节点。

// 在不访问受限节点的前提下，返回你可以从节点 0 到达的 最多 节点数目。

// 注意，节点 0 不 会标记为受限节点。



// 示例 1：
// https://assets.leetcode.com/uploads/2022/06/15/ex1drawio.png

// 输入：n = 7, edges = [[0, 1], [1, 2], [3, 1], [4, 0], [0, 5], [5, 6]], restricted = [4, 5]
// 输出：4
// 解释：上图所示正是这棵树。
// 在不访问受限节点的前提下，只有节点[0, 1, 2, 3] 可以从节点 0 到达。
// 示例 2：
// https://assets.leetcode.com/uploads/2022/06/15/ex2drawio.png

// 输入：n = 7, edges = [[0, 1], [0, 2], [0, 5], [0, 4], [3, 2], [6, 5]], restricted = [4, 2, 1]
// 输出：3
// 解释：上图所示正是这棵树。
// 在不访问受限节点的前提下，只有节点[0, 5, 6] 可以从节点 0 到达。


// 提示：

// 2 <= n <= 10^5
// edges.length == n - 1
// edges[i].length == 2
// 0 <= ai, bi < n
// ai != bi
// edges 表示一棵有效的树
// 1 <= restricted.length < n
// 1 <= restricted[i] < n
// restricted 中的所有值 互不相同

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} restricted
 * @return {number}
 */
var reachableNodes = function (n, edges, restricted) {
  const isRestricted = new Array(n).fill(0);
  for (const x of restricted) {
    isRestricted[x] = 1;
  }

  const g = new Array(n).fill(null).map(() => []);
  for (const [u, v] of edges) {
    g[u].push(v);
    g[v].push(u);
  }

  let cnt = 0;
  const dfs = (x, f) => {
    cnt++;
    for (const y of g[x]) {
      if (y !== f && !isRestricted[y]) {
        dfs(y, x);
      }
    }
  }
  dfs(0, -1);
  return cnt;
};