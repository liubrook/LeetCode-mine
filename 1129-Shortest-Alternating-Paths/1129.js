// 1129. 颜色交替的最短路径
// 在一个有向图中，节点分别标记为 0, 1, ..., n - 1。图中每条边为红色或者蓝色，且存在自环或平行边。

// red_edges 中的每一个[i, j] 对表示从节点 i 到节点 j 的红色有向边。类似地，blue_edges 中的每一个[i, j] 对表示从节点 i 到节点 j 的蓝色有向边。

// 返回长度为 n 的数组 answer，其中 answer[X] 是从节点 0 到节点 X 的红色边和蓝色边交替出现的最短路径的长度。如果不存在这样的路径，那么 answer[x] = -1。



// 示例 1：

// 输入：n = 3, red_edges = [[0, 1], [1, 2]], blue_edges = []
// 输出：[0, 1, -1]
// 示例 2：

// 输入：n = 3, red_edges = [[0, 1]], blue_edges = [[2, 1]]
// 输出：[0, 1, -1]
// 示例 3：

// 输入：n = 3, red_edges = [[1, 0]], blue_edges = [[2, 1]]
// 输出：[0, -1, -1]
// 示例 4：

// 输入：n = 3, red_edges = [[0, 1]], blue_edges = [[1, 2]]
// 输出：[0, 1, 2]
// 示例 5：

// 输入：n = 3, red_edges = [[0, 1], [0, 2]], blue_edges = [[1, 0]]
// 输出：[0, 1, 1]


// 提示：

// 1 <= n <= 100
// red_edges.length <= 400
// blue_edges.length <= 400
// red_edges[i].length == blue_edges[i].length == 2
// 0 <= red_edges[i][j], blue_edges[i][j] < n

/**
 * @param {number} n
 * @param {number[][]} redEdges
 * @param {number[][]} blueEdges
 * @return {number[]}
 */
var shortestAlternatingPaths = function (n, redEdges, blueEdges) {
  const next = new Array(2).fill(0).map(() => new Array(n).fill(0).map(() => new Array()));
  for (const edge of redEdges) {
    next[0][edge[0]].push(edge[1]);
  }
  for (const edge of blueEdges) {
    next[1][edge[0]].push(edge[1]);
  }
  const dist = new Array(2).fill(0).map(() => new Array(n).fill(Number.MAX_VALUE)); // 两种类型的颜色最短路径的长度
  const queue = [];
  dist[0][0] = 0;
  dist[1][0] = 0;
  queue.push([0, 0]);
  queue.push([0, 1]);
  while (queue.length) {
    const pair = queue.shift();
    let x = pair[0], t = pair[1];
    for (const y of next[1 - t][x]) {
      if (dist[1 - t][y] !== Number.MAX_VALUE) {
        continue;
      }
      dist[1 - t][y] = dist[t][x] + 1;
      queue.push([y, 1 - t]);
    }
  }
  const answer = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    answer[i] = Math.min(dist[0][i], dist[1][i]);
    if (answer[i] === Number.MAX_VALUE) {
      answer[i] = -1;
    }
  }
  return answer;
};