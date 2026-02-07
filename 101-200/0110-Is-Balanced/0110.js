// 110. 平衡二叉树
// 简单
// 相关标签
// premium lock icon
// 相关企业
// 给定一个二叉树，判断它是否是 平衡二叉树

// 示例 1：
// https://assets.leetcode.com/uploads/2020/10/06/balance_1.jpg

// 输入：root = [3,9,20,null,null,15,7]
// 输出：true
// 示例 2：
// https://assets.leetcode.com/uploads/2020/10/06/balance_2.jpg

// 输入：root = [1,2,2,3,3,null,null,4,4]
// 输出：false
// 示例 3：

// 输入：root = []
// 输出：true

// 提示：

// 树中的节点数在范围 [0, 5000] 内
// -10^4 <= Node.val <= 10^4
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
 * @return {boolean}
 */
var isBalanced = function (root) {
  return getHeight(root) !== -1;
};

function getHeight(node) {
  if (node === null) {
    return 0;
  }
  const leftH = getHeight(node.left);
  const rightH = getHeight(node.right);
  if (leftH === -1 || rightH === -1 || Math.abs(leftH - rightH) > 1) {
    return -1;
  }
  return Math.max(leftH, rightH) + 1;
}
