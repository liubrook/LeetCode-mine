// 889. 根据前序和后序遍历构造二叉树
// 中等
// 相关标签
// 相关企业
// 给定两个整数数组，preorder 和 postorder ，其中 preorder 是一个具有 无重复 值的二叉树的前序遍历，postorder 是同一棵树的后序遍历，重构并返回二叉树。

// 如果存在多个答案，您可以返回其中 任何 一个。



// 示例 1：

// https://assets.leetcode.com/uploads/2021/07/24/lc-prepost.jpg

// 输入：preorder = [1, 2, 4, 5, 3, 6, 7], postorder = [4, 5, 2, 6, 7, 3, 1]
// 输出：[1, 2, 3, 4, 5, 6, 7]
// 示例 2:

// 输入: preorder = [1], postorder = [1]
// 输出: [1]


// 提示：

// 1 <= preorder.length <= 30
// 1 <= preorder[i] <= preorder.length
// preorder 中所有值都 不同
// postorder.length == preorder.length
// 1 <= postorder[i] <= postorder.length
// postorder 中所有值都 不同
// 保证 preorder 和 postorder 是同一棵二叉树的前序遍历和后序遍历

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var constructFromPrePost = function (preorder, postorder) {
  if (preorder.length == 0) {
    return null;
  };

  let tmp = preorder[0];
  let index = postorder.indexOf(preorder[1]);
  let root = new TreeNode(tmp);
  root.left = constructFromPrePost(preorder.slice(1, index + 2), postorder.slice(0, index + 1));
  root.right = constructFromPrePost(preorder.slice(index + 2), postorder.slice(index + 1, postorder.length - 1));
  return root;
};