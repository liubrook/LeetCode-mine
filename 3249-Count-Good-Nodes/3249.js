// 3249. 统计好节点的数目
// 中等
// 相关标签
// 相关企业
// 提示
// 现有一棵 无向 树，树中包含 n 个节点，按从 0 到 n - 1 标记。树的根节点是节点 0 。给你一个长度为 n - 1 的二维整数数组 edges，其中 edges[i] = [ai, bi] 表示树中节点 ai 与节点 bi 之间存在一条边。

// 如果一个节点的所有子节点为根的
// 子树
// 包含的节点数相同，则认为该节点是一个 好节点。

// 返回给定树中 好节点 的数量。

// 子树 指的是一个节点以及它所有后代节点构成的一棵树。





// 示例 1：

// 输入：edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]]

// 输出：7

// 说明：
// https://assets.leetcode.com/uploads/2024/05/26/tree1.png

// 树的所有节点都是好节点。

// 示例 2：

// 输入：edges = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [1, 6], [2, 7], [3, 8]]

// 输出：6

// 说明：
// https://assets.leetcode.com/uploads/2024/06/03/screenshot-2024-06-03-193552.png

// 树中有 6 个好节点。上图中已将这些节点着色。

// 示例 3：

// 输入：edges = [[0, 1], [1, 2], [1, 3], [1, 4], [0, 5], [5, 6], [6, 7], [7, 8], [0, 9], [9, 10], [9, 12], [10, 11]]

// 输出：12

// 解释：
// https://assets.leetcode.com/uploads/2024/08/08/rob.jpg

// 除了节点 9 以外其他所有节点都是好节点。



// 提示：

// 2 <= n <= 10^5
// edges.length == n - 1
// edges[i].length == 2
// 0 <= ai, bi < n
// 输入确保 edges 总表示一棵有效的树。

/**
 * @param {number[][]} edges
 * @return {number}
 */
var countGoodNodes = function (edges) {
  const n = edges.length + 1;
  const g = Array.from({ length: n }, () => []);
  for (const [x, y] of edges) {
    g[x].push(y);
    g[y].push(x);
  }
  let res = 0;
  const dfs = (node, parent) => {
    let valid = true;
    let treeSize = 0;
    let subTreeSize = 0;
    for (const child of g[node]) {
      if (child !== parent) {
        const size = dfs(child, node);
        if (subTreeSize === 0) {
          subTreeSize = size;
        } else if (size !== subTreeSize) {
          valid = false;
        }
        treeSize += size;
      }
    }
    if (valid) {
      res++;
    }
    return treeSize + 1;
  };

  dfs(0, -1);
  return res;
};