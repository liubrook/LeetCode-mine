// 1026. 节点与其祖先之间的最大差值
// 给定二叉树的根节点 root，找出存在于 不同 节点 A 和 B 之间的最大值 V，其中 V = | A.val - B.val |，且 A 是 B 的祖先。

// （如果 A 的任何子节点之一为 B，或者 A 的任何子节点是 B 的祖先，那么我们认为 A 是 B 的祖先）



// 示例 1：

// https://assets.leetcode.com/uploads/2020/11/09/tmp-tree.jpg

// 输入：root = [8, 3, 10, 1, 6, null, 14, null, null, 4, 7, 13]
// 输出：7
// 解释：
// 我们有大量的节点与其祖先的差值，其中一些如下：
// | 8 - 3 | = 5
//   | 3 - 7 | = 4
//     | 8 - 1 | = 7
//       | 10 - 13 | = 3
// 在所有可能的差值中，最大值 7 由 | 8 - 1 | = 7 得出。
// 示例 2：
// https://assets.leetcode.com/uploads/2020/11/09/tmp-tree-1.jpg

// 输入：root = [1, null, 2, null, 0, 3]
// 输出：3


// 提示：

// 树中的节点数在 2 到 5000 之间。
// 0 <= Node.val <= 10^5

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
 * @return {number}
 */
var maxAncestorDiff = function (root) {
  return dfs(root, root.val, root.val);
};

function dfs(root, mi, ma) {
  if (root === null) {
    return 0;
  }
  var diff = Math.max(Math.abs(root.val - mi), Math.abs(root.val - ma));
  mi = Math.min(mi, root.val);
  ma = Math.max(ma, root.val);
  diff = Math.max(diff, dfs(root.left, mi, ma));
  diff = Math.max(diff, dfs(root.right, mi, ma));
  return diff;
}