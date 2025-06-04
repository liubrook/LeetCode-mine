// 847. 访问所有节点的最短路径
// 存在一个由 n 个节点组成的无向连通图，图中的节点按从 0 到 n - 1 编号。

// 给你一个数组 graph 表示这个图。其中，graph[i] 是一个列表，由所有与节点 i 直接相连的节点组成。

// 返回能够访问所有节点的最短路径的长度。你可以在任一节点开始和停止，也可以多次重访节点，并且可以重用边。



// 示例 1：

// https://assets.leetcode.com/uploads/2021/05/12/shortest1-graph.jpg
// 输入：graph = [[1, 2, 3], [0], [0], [0]]
// 输出：4
// 解释：一种可能的路径为[1, 0, 2, 0, 3]
// 示例 2：

// https://assets.leetcode.com/uploads/2021/05/12/shortest2-graph.jpg

// 输入：graph = [[1], [0, 2, 4], [1, 3, 4], [2], [1, 2]]
// 输出：4
// 解释：一种可能的路径为[0, 1, 4, 2, 3]


// 提示：

// n == graph.length
// 1 <= n <= 12
// 0 <= graph[i].length < n
// graph[i] 不包含 i
// 如果 graph[a] 包含 b ，那么 graph[b] 也包含 a
// 输入的图总是连通图

/**
 * @param {number[][]} graph
 * @return {number}
 */
var shortestPathLength = function (graph) {
  const n = graph.length;
  const queue = [];
  const seen = new Array(n).fill(0).map(() => new Array(1 << n).fill(false));
  for (let i = 0; i < n; ++i) {
    queue.push([i, 1 << i, 0]);
    seen[i][1 << i] = true;
  }

  let ans = 0;
  while (queue.length) {
    const tuple = queue.shift();
    const u = tuple[0], mask = tuple[1], dist = tuple[2];
    if (mask === (1 << n) - 1) {
      ans = dist;
      break;
    }
    // 搜索相邻的节点
    for (const v of graph[u]) {
      // 将 mask 的第 v 位置为 1
      const maskV = mask | (1 << v);
      if (!seen[v][maskV]) {
        queue.push([v, maskV, dist + 1]);
        seen[v][maskV] = true;
      }
    }
  }
  return ans;
}