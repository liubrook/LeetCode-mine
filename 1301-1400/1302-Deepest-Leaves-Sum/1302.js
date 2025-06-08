// 1302. 层数最深叶子节点的和
// 给你一棵二叉树的根节点 root ，请你返回 层数最深的叶子节点的和 。



// 示例 1：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/12/28/1483_ex1.png

// 输入：root = [1, 2, 3, 4, 5, null, 6, 7, null, null, null, null, 8]
// 输出：15
// 示例 2：

// 输入：root = [6, 7, 8, 2, 7, 1, 3, 9, null, 1, 4, null, null, null, 5]
// 输出：19


// 提示：

// 树中节点数目在范围[1, 104] 之间。
// 1 <= Node.val <= 100

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
var deepestLeavesSum = function (root) {
  let maxLevel = -1;
  let sum = 0;
  const dfs = (node, level) => {
    if (!node) {
      return;
    }
    if (level > maxLevel) {
      maxLevel = level;
      sum = node.val;
    } else if (level === maxLevel) {
      sum += node.val;
    }
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  }
  dfs(root, 0);
  return sum;
};