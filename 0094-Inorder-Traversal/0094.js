// 94. 二叉树的中序遍历
// 已解答
// 简单
// 相关标签
// 相关企业
// 给定一个二叉树的根节点 root ，返回 它的 中序 遍历 。



// 示例 1：

// https://assets.leetcode.com/uploads/2020/09/15/inorder_1.jpg
// 输入：root = [1, null, 2, 3]
// 输出：[1, 3, 2]
// 示例 2：

// 输入：root = []
// 输出：[]
// 示例 3：

// 输入：root = [1]
// 输出：[1]


// 提示：

// 树中节点数目在范围[0, 100] 内
//   - 100 <= Node.val <= 100


// 进阶: 递归算法很简单，你可以通过迭代算法完成吗？

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
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const res = [];
  const inorder = (root) => {
    if (!root) {
      return;
    }
    inorder(root.left);
    res.push(root.val);
    inorder(root.right);
  }
  inorder(root);
  return res;
};