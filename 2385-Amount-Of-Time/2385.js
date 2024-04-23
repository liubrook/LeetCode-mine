// 2385. 感染二叉树需要的总时间
// 中等
// 相关标签
// 相关企业
// 提示
// 给你一棵二叉树的根节点 root ，二叉树中节点的值 互不相同 。另给你一个整数 start 。在第 0 分钟，感染 将会从值为 start 的节点开始爆发。

// 每分钟，如果节点满足以下全部条件，就会被感染：

// 节点此前还没有感染。
// 节点与一个已感染节点相邻。
// 返回感染整棵树需要的分钟数。



// 示例 1：

// https://assets.leetcode.com/uploads/2022/06/25/image-20220625231744-1.png
// 输入：root = [1, 5, 3, null, 4, 10, 6, 9, 2], start = 3
// 输出：4
// 解释：节点按以下过程被感染：
// - 第 0 分钟：节点 3
//   - 第 1 分钟：节点 1、10、6
//     - 第 2 分钟：节点5
//       - 第 3 分钟：节点 4
//         - 第 4 分钟：节点 9 和 2
// 感染整棵树需要 4 分钟，所以返回 4 。
// 示例 2：

// https://assets.leetcode.com/uploads/2022/06/25/image-20220625231812-2.png
// 输入：root = [1], start = 1
// 输出：0
// 解释：第 0 分钟，树中唯一一个节点处于感染状态，返回 0 。


// 提示：

// 树中节点的数目在范围[1, 10^5] 内
// 1 <= Node.val <= 10^5
// 每个节点的值 互不相同
// 树中必定存在值为 start 的节点

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} start
 * @return {number}
 */
var amountOfTime = function (root, start) {
  const graph = new Map();
  const dfs = (node) => {
    [node.left, node.right].forEach((child) => {
      if (child !== null) {
        graph.has(node.val) ? graph.get(node.val).push(child.val) : graph.set(node.val, [child.val]);
        graph.has(child.val) ? graph.get(child.val).push(node.val) : graph.set(child.val, [node.val]);
        dfs(child);
      }
    });
  };

  dfs(root);
  const q = [[start, 0]];
  visited = new Set([start]);
  let time = 0;
  while (q.length > 0) {
    const [nodeVal, currTime] = q.shift();
    time = currTime;
    if (graph.has(nodeVal)) {
      graph.get(nodeVal).forEach((childVal) => {
        if (!visited.has(childVal)) {
          q.push([childVal, time + 1]);
          visited.add(childVal);
        }
      });
    }
  }
  return time;
};