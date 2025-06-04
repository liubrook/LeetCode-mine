// 882. 细分图中的可到达节点
// 给你一个无向图（原始图），图中有 n 个节点，编号从 0 到 n - 1 。你决定将图中的每条边 细分 为一条节点链，每条边之间的新节点数各不相同。

// 图用由边组成的二维数组 edges 表示，其中 edges[i] = [ui, vi, cnti] 表示原始图中节点 ui 和 vi 之间存在一条边，cnti 是将边 细分 后的新节点总数。注意，cnti == 0 表示边不可细分。

// 要 细分 边[ui, vi] ，需要将其替换为(cnti + 1) 条新边，和 cnti 个新节点。新节点为 x1, x2, ..., xcnti ，新边为[ui, x1], [x1, x2], [x2, x3], ..., [xcnti + 1, xcnti], [xcnti, vi] 。

// 现在得到一个 新的细分图 ，请你计算从节点 0 出发，可以到达多少个节点？如果节点间距离是 maxMoves 或更少，则视为 可以到达 。

// 给你原始图和 maxMoves ，返回 新的细分图中从节点 0 出发 可到达的节点数 。



// 示例 1：
// https://s3-lc-upload.s3.amazonaws.com/uploads/2018/08/01/origfinal.png

// 输入：edges = [[0, 1, 10], [0, 2, 1], [1, 2, 2]], maxMoves = 6, n = 3
// 输出：13
// 解释：边的细分情况如上图所示。
// 可以到达的节点已经用黄色标注出来。
// 示例 2：

// 输入：edges = [[0, 1, 4], [1, 2, 6], [0, 2, 8], [1, 3, 1]], maxMoves = 10, n = 4
// 输出：23
// 示例 3：

// 输入：edges = [[1, 2, 4], [1, 4, 5], [1, 3, 1], [2, 3, 4], [3, 4, 5]], maxMoves = 17, n = 5
// 输出：1
// 解释：节点 0 与图的其余部分没有连通，所以只有节点 0 可以到达。


// 提示：

// 0 <= edges.length <= min(n * (n - 1) / 2, 104)
// edges[i].length == 3
// 0 <= ui < vi < n
// 图中 不存在平行边
// 0 <= cnti <= 104
// 0 <= maxMoves <= 109
// 1 <= n <= 3000


/**
 * @param {number[][]} edges
 * @param {number} maxMoves
 * @param {number} n
 * @return {number}
 */
var reachableNodes = function (edges, maxMoves, n) {
  const distances = new Array(n).fill(+Infinity);
  const reached = new Array(n).fill(false);
  distances[0] = 0;

  // 建图
  const GRAPH = Array.from(new Array(n), () => new Array(n).fill(+Infinity));
  for (let [from, to, cost] of edges) {
    GRAPH[from][to] = cost + 1;
    GRAPH[to][from] = cost + 1;
  }

  // Dijkstra
  for (let i = 0; i < n; i++) {
    let x = -1;
    for (let y = 0; y < n; y++) {
      if (!reached[y] && (x === -1 || distances[x] > distances[y])) {
        x = y;
      }
    }
    reached[x] = true;
    for (let y = 0; y < n; y++) {
      distances[y] = Math.min(distances[y], distances[x] + GRAPH[x][y]);
    }
  }
  let res = 0;
  // 如果节点i的distances大于maxMoves，则其不可抵达，修改状态为false
  for (let i = 0; i < n; i++) {
    if (distances[i] > maxMoves) {
      reached[i] = false;
    } else {
      res++;
    }
  }

  // 根据可以抵达的大节点计算有多少个小节点可以抵达
  for (let [from, to, cost] of edges) {
    let sum = 0;
    sum += reached[from] ? maxMoves - distances[from] : 0;
    sum += reached[to] ? maxMoves - distances[to] : 0;
    res += Math.min(cost, sum);
  }
  return res;
};