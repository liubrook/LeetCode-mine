// 145. 二叉树的后序遍历
// 简单
// 相关标签
// 相关企业
// 给你一棵二叉树的根节点 root ，返回其节点值的 后序遍历 。



// 示例 1：

// https://assets.leetcode.com/uploads/2020/08/28/pre1.jpg
// 输入：root = [1, null, 2, 3]
// 输出：[3, 2, 1]
// 示例 2：

// 输入：root = []
// 输出：[]
// 示例 3：

// 输入：root = [1]
// 输出：[1]


// 提示：

// 树中节点的数目在范围[0, 100] 内
//   - 100 <= Node.val <= 100


// 进阶：递归算法很简单，你可以通过迭代算法完成吗？

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
var postorderTraversal = function (root) {
  let res = [];
  const dfs = function (root) {
    if (root === null) {
      return;
    }
    dfs(root.left);
    dfs(root.right);
    res.push(root.val);
  }
  dfs(root);
  return res;
};